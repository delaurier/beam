"""Regenerate the four design-system artboards in few Paper calls."""
from pmcp import call
from ds import DS
from comps import C
def chunks(parts, limit=42000):
    out=[]; cur=""
    for p in parts:
        if cur and len(cur)+len(p)>limit: out.append(cur); cur=""
        cur+=p
    if cur: out.append(cur)
    return out
def parts(kind, mode):
    if kind=="Foundations":
        d=DS(mode); return [d.header("Foundations"), d.neutrals(), d.palette(), d.semantic(), d.type_scale(), d.fonts(), d.spacing(), d.radius(), d.edges(), d.icons()]
    from cf import CF
    d=C(mode); return [d.header("Components"), d.buttons(), d.fields(), d.selects(), d.selection(), d.tabs(), d.navtool()]+CF(mode).state_sections()+[d.meters(), d.overlays()]
POS={("Foundations","light"):(800,-417),("Foundations","dark"):(2320,-417),("Components","light"):(800,1807),("Components","dark"):(2320,1807)}
def push_all(only=None):
    ids=[]
    for (kind,mode),(x,y) in POS.items():
        if only and (kind,mode) not in only: continue
        ab=call("create_artboard", pageId="p-1-0", name=f"Beam · {kind} · {mode.capitalize()}", styles={"width":"1440px","height":"900px","display":"flex","flexDirection":"column",
            "backgroundColor":f"var(--{mode}-bg-canvas)","padding":"var(--space-xxl)","gap":"var(--space-xxl)","fontFamily":"var(--font-ui)"})[-1]["id"]
        call("update_styles", updates=[{"nodeIds":[ab],"styles":{"left":f"{x}px","top":f"{y}px"}}])
        cs=chunks(parts(kind,mode))
        for c in cs: call("write_html", targetNodeId=ab, mode="insert-children", html=c)
        ids.append(ab); print(kind, mode, ab, len(cs), flush=True)
    call("update_styles", updates=[{"nodeIds":ids,"styles":{"height":"fit-content"}}])
    return ids
if __name__=="__main__":
    for k in POS: print(k, [len(c) for c in chunks(parts(*k))])
