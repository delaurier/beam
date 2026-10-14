"""Canvas-side check of every SVG layer: stroke and fill must be 'none' or a token; report stroke widths."""
import re
from pmcp import call
import canvas_audit as ca
ch=call("get_children", nodeId="root_node_p-1-0")[-1]["children"]
tot=0; bad=[]; fails=0; widths={}; paints={}
for c in ch:
    if "Moodboard" in c["name"]: continue
    svgs=[n for n in ca.walk(c["id"]) if n[1]=="SVG"]; nb=0; nf=0
    for nid,_,nm in svgs:
        try:
            r=call("get_jsx", nodeId=nid)[-1]; j=r if isinstance(r,str) else (r.get("jsx") or str(r))
        except Exception as e:
            nf+=1; continue
        for attr,val in re.findall(r'\b(stroke|fill)="([^"]*)"', j):
            paints[val]=paints.get(val,0)+1
            if val!="none" and not val.startswith("var(--"): bad.append((c["name"][7:],nm,attr,val)); nb+=1
        for w in re.findall(r'strokeWidth="([^"]*)"', j): widths[(nm if nm in ("Beam mark","Sparkline","Plot") else "icon",w)]=widths.get((nm if nm in ("Beam mark","Sparkline","Plot") else "icon",w),0)+1
    tot+=len(svgs); fails+=nf
    print(f"{c['name'][7:]:32s} svgs={len(svgs):3d} non_token_paint={nb} export_failed={nf}", flush=True)
print("total svgs:", tot, "| export failures:", fails, "| non-token paints:", bad[:10])
print("paint values:", dict(sorted(paints.items(), key=lambda kv:-kv[1])))
print("stroke widths:", widths)
