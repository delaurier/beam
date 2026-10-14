"""Canvas-side audit: read the real styles of every layer on each artboard from Paper and flag anything not bound to a token."""
import re, json, sys
from pmcp import call
ID=re.compile(r'^(\s*)(\w+) "(.*?)" \(([0-9A-Za-z]+-\d+)\)')
def walk(root):
    nodes=[]; pending=[root]; seen=set()
    while pending:
        nid=pending.pop()
        lines=call("get_tree_summary", nodeId=nid, depth=10)[-1]["summary"].splitlines()
        last=None
        for ln in lines:
            m=ID.match(ln)
            if m:
                last=m.group(4)
                if last not in seen: seen.add(last); nodes.append((last,m.group(2),m.group(3)))
            elif "children" in ln and last: pending.append(last)
    return nodes
THEMED=("color","backgroundColor","fontFamily","fontSize","lineHeight","letterSpacing","fontWeight","paddingBlock","paddingInline","padding","paddingTop","paddingBottom","paddingLeft","paddingRight","gap","rowGap","columnGap","borderRadius","boxShadow","fill","stroke")
LIT=re.compile(r"#[0-9a-fA-F]{3,8}\b|rgba?\(|okl(?:ab|ch)\(|hsla?\(")
def audit(ab, name):
    nodes=walk(ab); ids=[n[0] for n in nodes]; kinds={}
    for _,k,_ in nodes: kinds[k]=kinds.get(k,0)+1
    styles={}
    for i in range(0,len(ids),150):
        styles.update(call("get_computed_styles", nodeIds=ids[i:i+150])[-1]["styles"])
    lit=[]; raw=[]; borders=[]; tok=0; fonts=set()
    label={n[0]:f"{n[1]} '{n[2][:24]}'" for n in nodes}
    for nid,st in styles.items():
        for k,v in st.items():
            v=str(v)
            if "var(--" in v: tok+=1
            if k=="fontFamily": fonts.add(v)
            if k in ("color","backgroundColor","boxShadow","fill","stroke","backgroundImage","borderColor") and LIT.search(re.sub(r"var\([^)]*\)","",v)): lit.append((label[nid],k,v[:60]))
            if k in THEMED and k not in ("color","backgroundColor","boxShadow","fill","stroke") and "var(--" not in v and v not in ("0","0px","transparent","none","normal"): raw.append((label[nid],k,v[:40]))
            if k.startswith("border") and k.endswith("Width") and v not in ("0","0px"): borders.append((label[nid],k,v))
    print(f"{name:34s} layers={len(nodes):5d} styled={len(styles):5d} token_bindings={tok:6d} literal_colours={len(lit):3d} non_token_values={len(raw):3d} native_borders={len(borders)} fonts={sorted(fonts)} kinds={kinds}")
    for x in (lit[:6]+raw[:8]+borders[:3]): print("     ", x)
    return nodes
if __name__=="__main__":
    ch=call("get_children", nodeId="root_node_p-1-0")[-1]["children"]
    for c in ch:
        if "Moodboard" in c["name"]: continue
        if len(sys.argv)>1 and sys.argv[1] not in c["name"]: continue
        audit(c["id"], c["name"][7:])
