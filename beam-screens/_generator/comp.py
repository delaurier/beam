import json,re,sys
src=open("/Users/pauldelaurier/Documents/CLAUDE CODE/BEAM/beam-theme/gui/themes/beam-components.md").read()
want=sys.argv[1].split(",") if len(sys.argv)>1 else None
modes=sys.argv[2].split(",") if len(sys.argv)>2 else ["light","dark"]
comp=None;mode=None;rest={}
keys=["background","foreground","borderColor","borderWidth","radius","paddingTop","paddingBottom","paddingX","gap","textSize","font","weight","controlSize","shadow","lineHeight","letterSpacing","backgroundOpacity","opacity","backdropBlur"]
for line in src.splitlines():
    if line.startswith("## "): comp=line[3:].strip(); continue
    if line.startswith("### "): mode=line[4:].strip(); rest={}; 
    if not line.startswith("| ") or line.startswith("| ---") or line.startswith("| Variant"): 
        if line.startswith("### ") and (not want or comp in want) and mode in modes: print(f"\n== {comp} / {mode}")
        continue
    if want and comp not in want: continue
    if mode not in modes: continue
    cells=[c.strip() for c in line.strip().strip("|").split(" | ")]
    var,part,state=cells[0],cells[1],cells[2]
    tok=json.loads(cells[3]); app=json.loads(cells[4])
    d={k:tok[k] for k in keys if k in tok}
    d["edge"]=("in " if app.get("borderInset") else "out ")+str(app.get("borderWidth"))+" "+str(app.get("borderColor"))
    extra={k:v for k,v in tok.items() if k not in keys and k!="shadows"}
    d.update(extra)
    key=(var,part)
    if state=="rest" or key not in rest:
        rest[key]=d
        print(f"{var}|{part}|{state}: "+" ".join(f"{k}={v}" for k,v in d.items()))
    else:
        diff={k:v for k,v in d.items() if rest[key].get(k)!=v}
        if diff: print(f"   {state}: "+" ".join(f"{k}={v}" for k,v in diff.items()))
