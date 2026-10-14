import json, urllib.request
URL="http://127.0.0.1:29979/mcp"
FILE="01M4TWW9MBYA86T09KS7D2FT08"
_sid=None; _id=0
def _post(body, notify=False):
    global _sid
    h={"Content-Type":"application/json","Accept":"application/json, text/event-stream"}
    if _sid: h["Mcp-Session-Id"]=_sid
    r=urllib.request.urlopen(urllib.request.Request(URL,data=json.dumps(body).encode(),headers=h),timeout=120)
    if r.headers.get("Mcp-Session-Id"): _sid=r.headers["Mcp-Session-Id"]
    raw=r.read().decode()
    if notify or not raw.strip(): return None
    if raw.lstrip().startswith("{"): return json.loads(raw)
    out=None
    for line in raw.splitlines():
        if line.startswith("data:"):
            try: out=json.loads(line[5:].strip())
            except Exception: pass
    return out
def init():
    global _id; _id+=1
    r=_post({"jsonrpc":"2.0","id":_id,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"beam-ds","version":"1"}}})
    _post({"jsonrpc":"2.0","method":"notifications/initialized"},notify=True)
    return r
def call_once(_tool, **args):
    global _id; _id+=1
    if _sid is None: init()
    args.setdefault("fileId",FILE)
    r=_post({"jsonrpc":"2.0","id":_id,"method":"tools/call","params":{"name":_tool,"arguments":args}})
    if r is None: return None
    if "error" in r: raise RuntimeError(r["error"])
    res=r["result"]; outs=[]
    for c in res.get("content",[]):
        if c.get("type")=="text":
            try: outs.append(json.loads(c["text"]))
            except Exception: outs.append(c["text"])
        else: outs.append(c)
    if res.get("isError"): raise RuntimeError(outs)
    return outs
def call(_tool, **args):
    import time
    for attempt in range(12):
        try: return call_once(_tool, **args)
        except RuntimeError as e:
            if "disconnected" in str(e) and attempt<11: time.sleep(6); continue
            raise
if __name__=="__main__":
    print(json.dumps(init())[:300])
    o=call("get_basic_info")
    print(json.dumps(o)[:600])
