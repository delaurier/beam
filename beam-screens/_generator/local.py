import os, sys, subprocess, itertools
os.environ["BEAM_PHOTO"]="../beam-assets/hero-dusk-silhouette.jpg"
import screens
OUT="/Users/pauldelaurier/Documents/CLAUDE CODE/BEAM/beam-screens"
os.makedirs(OUT, exist_ok=True)
NL=["#ffffff","#fafaf9","#f2f0ec","#e1ddd5","#cbc5b9","#9b968a","#716c61","#4a453b","#29241b","#000000"]
ND=["#0f0f0f","#2e2d2a","#383735","#454441","#5c5a57","#817f7b","#aaa8a5","#cbc9c6","#e7e7e5","#ffffff"]
def tokens():
    t={}
    for m,ramp in (("light",NL),("dark",ND)):
        for i,h in enumerate(ramp): t[f"--neutral-{m}-{i+1}"]=h
        for i in (3,4): t[f"--neutral-{m}-{i}-transparent"]=ramp[i-1]+"33"
    t["--neutral-light-10-transparent"]="#00000033"; t["--neutral-dark-1-transparent"]="#0f0f0f33"
    for n,h in (("color-1","#ff6363"),("color-2","#76ef6b"),("color-3","#009ff0"),("color-4","#e864ff"),("success","#76ef6b"),("warning","#ffa344"),("error","#ff5263")):
        t[f"--{n}"]=h; t[f"--{n}-transparent"]=h+"33"
    t["--border-default-color"]="rgb(0 0 0 / 0.1)"
    sem={"bg-canvas":(1,1),"bg-surface":(2,2),"bg-surface-muted":(3,3),"bg-control":(1,2),"bg-popover":(1,2),"bg-hover":("3-transparent","3-transparent"),
         "bg-hover-strong":("4-transparent","4-transparent"),"bg-highlight":(3,3),"bg-disabled":(3,3),"bg-track":(4,4),"bg-thumb":(1,1),"bg-inverse":(10,10),
         "bg-backdrop":("10-transparent","1-transparent"),"text":(10,10),"text-secondary":(8,8),"text-muted":(7,7),"text-subtle":(6,6),"text-disabled":(6,6),
         "text-on-accent":(1,1),"text-inverse":(1,1),"border":(4,4),"border-strong":(5,5),"border-disabled":("4-transparent","4-transparent")}
    for m,idx in (("light",0),("dark",1)):
        for k,v in sem.items(): t[f"--{m}-{k}"]=f"var(--neutral-{m}-{v[idx]})"
        t[f"--{m}-border-subtle"]="var(--border-default-color)"
        t[f"--{m}-accent"]="var(--color-1)"; t[f"--{m}-accent-muted"]="var(--color-1-transparent)"
        for a,b in (("success","success"),("warning","warning"),("danger","error")):
            t[f"--{m}-{a}"]=f"var(--{b})"; t[f"--{m}-{a}-muted"]=f"var(--{b}-transparent)"
    t["--light-focus-ring"]="#00000080"; t["--dark-focus-ring"]="#ffffff80"
    t["--neutral-dark-10-transparent"]="#ffffff33"; t["--dark-border-subtle"]="var(--neutral-dark-10-transparent)"
    t["--navigation-active-background"]="var(--color-1)"; t["--navigation-active-foreground"]="#000000"
    t["--light-text-selected"]="var(--neutral-light-10)"; t["--dark-text-selected"]="var(--color-1)"
    for k in ("ui","brand","editorial"): t[f"--font-{k}"]='"Geist", sans-serif'
    t["--font-data"]='"Geist Mono", monospace'
    for r in ("ui","brand","editorial","data"): t.update({f"--weight-{r}-regular":"500",f"--weight-{r}-medium":"600",f"--weight-{r}-heavy":"800"})
    for k,(sz,lh) in {"xxs":(9,12),"xs":(11,14),"s":(12,18),"m":(14,21),"l":(21,28),"xl":(32,35),"xxl":(43,46)}.items(): t[f"--size-{k}"]=f"{sz}px"; t[f"--line-{k}"]=f"{lh}px"
    for k,v in {"xs":-0.02,"s":-0.01,"m":0,"l":0.01,"xl":0.02}.items(): t[f"--tracking-{k}"]=f"{v}em"
    for k,v in {"xxs":"xl","xs":"l","s":"l","m":"m","l":"s","xl":"s","xxl":"xs"}.items(): t[f"--letter-spacing-{k}"]=f"var(--tracking-{v})"
    for k,v in {"zero":0,"xxs":3,"xs":6,"s":9,"m":11,"l":17,"xl":23,"xxl":34}.items(): t[f"--space-{k}"]=f"{v}px"
    for k,v in {"zero":0,"xs":2,"s":4,"m":6,"l":12,"xl":18,"full":9999}.items(): t[f"--radius-{k}"]=f"{v}px"
    return ":root{\n"+"\n".join(f"  {k}: {v};" for k,v in t.items())+"\n}\n"
open(os.path.join(OUT,"beam-tokens.css"),"w").write(tokens())

class Doc:
    def __init__(s): s.nodes={}; s.ctr=itertools.count(1); s.roots=[]
    def board(s, name, x, y, direction="row"):
        i=f"n{next(s.ctr)}"
        s.nodes[i]={"html":f'<div data-artboard="{name}" style="display:flex;flex-direction:{direction};width:1440px;height:900px;overflow:hidden;background:var(--dark-bg-canvas);font-family:var(--font-ui)"></div>',"kids":[]}
        s.roots.append((i,name)); return i
    def W(s, target, html):
        i=f"n{next(s.ctr)}"; s.nodes[i]={"html":html,"kids":[]}; s.nodes[target]["kids"].append(i); return i
    def render(s, i):
        n=s.nodes[i]; h=n["html"]
        if not n["kids"]: return h
        k=h.rstrip().rfind("</div>")
        return h[:k]+"".join(s.render(c) for c in n["kids"])+h[k:]
def page(body, title):
    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8"><title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Geist:wght@500;600;800&family=Geist+Mono:wght@500;600;800&display=swap" rel="stylesheet">
<link rel="stylesheet" href="beam-tokens.css">
<style>*{{box-sizing:border-box;margin:0;padding:0}}html,body{{background:#0f0f0f}}body{{-webkit-font-smoothing:antialiased;text-wrap:pretty}}div{{white-space:nowrap}}svg{{display:block}}</style></head><body>{body}</body></html>'''
CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
def shoot(html_path, png_path, w=1440, h=900, scale=2):
    subprocess.run([CHROME,"--headless=new","--disable-gpu","--hide-scrollbars",f"--window-size={w},{h}",f"--force-device-scale-factor={scale}",
                    "--virtual-time-budget=6000",f"--screenshot={png_path}","file://"+html_path.replace(" ","%20")],check=True,capture_output=True,timeout=90)
def build(which):
    d=Doc(); screens.board=d.board; screens.W=lambda t,h,name=None: d.W(t,h)
    ab = screens.build_a(0,0) if which=="a" else screens.build_b(0,0)
    name={"a":"corn-marketing-a-ledger","b":"corn-marketing-b-field-view"}[which]
    hp=os.path.join(OUT,name+".html"); open(hp,"w").write(page(d.render(ab), d.roots[0][1]))
    pp=os.path.join(OUT,name+".png"); shoot(hp,pp); print(pp)
if __name__=="__main__":
    for w in sys.argv[1:]: build(w)
