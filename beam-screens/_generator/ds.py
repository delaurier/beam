import sys, json
from pmcp import call

NEUTRALS={"light":["#ffffff","#fafaf9","#f2f0ec","#e1ddd5","#cbc5b9","#9b968a","#716c61","#4a453b","#29241b","#000000"],
          "dark":["#0f0f0f","#2e2d2a","#383735","#454441","#5c5a57","#817f7b","#aaa8a5","#cbc9c6","#e7e7e5","#ffffff"]}
PALETTE=[("color-1","#ff6363"),("color-2","#76ef6b"),("color-3","#009ff0"),("color-4","#e864ff"),("success","#76ef6b"),("warning","#ffa344"),("error","#ff5263")]

class DS:
    def __init__(s, mode): s.m=mode
    def c(s, role): return f"var(--{s.m}-{role})"
    def ty(s, font, size, weight="regular", color="text"):
        return (f"font-family:var(--font-{font});font-size:var(--size-{size});line-height:var(--line-{size});"
                f"letter-spacing:var(--letter-spacing-{size});font-weight:var(--weight-{font}-{weight});color:{s.c(color)}")
    def section(s, name, title, inner, inner_style="display:flex;flex:1;gap:var(--space-xs)", note=None):
        n = f'<div style="{s.ty("data","xs","regular","text-muted")}">{note}</div>' if note else ''
        return (f'<div layer-name="{name}" style="display:flex;width:100%;gap:var(--space-xxl);padding-top:var(--space-xl);box-shadow:inset 0 1px 0 {s.c("border")}">'
                f'<div style="display:flex;flex-direction:column;gap:var(--space-xxs);width:220px;flex-shrink:0">'
                f'<div style="{s.ty("brand","l","medium")}">{title}</div>{n}</div>'
                f'<div layer-name="Content" style="{inner_style}">{inner}</div></div>')
    def label2(s, a, b):
        return (f'<div style="display:flex;flex-direction:column"><div style="{s.ty("data","xs","medium")}">{a}</div>'
                f'<div style="{s.ty("data","xs","regular","text-muted")}">{b}</div></div>')
    def edge(s): return f"box-shadow:inset 0 0 0 1px {s.c('border')}"

    # ---------- Foundations ----------
    def header(s, title):
        return (f'<div layer-name="Header" style="display:flex;justify-content:space-between;align-items:flex-end;width:100%">'
                f'<div style="{s.ty("brand","xxl","heavy")}">{title}</div>'
                f'<div style="{s.ty("data","s","regular","text-muted")}">Beam · {s.m.capitalize()}</div></div>')
    def neutrals(s):
        items="".join(
            f'<div layer-name="neutral-{i+1}" style="display:flex;flex-direction:column;flex:1;gap:var(--space-xs)">'
            f'<div style="height:68px;border-radius:var(--radius-s);background:var(--neutral-{s.m}-{i+1});{s.edge()}"></div>'
            f'{s.label2(f"neutral-{i+1}",h)}</div>' for i,h in enumerate(NEUTRALS[s.m]))
        return s.section("Neutrals","Neutrals",items)
    def palette(s):
        items="".join(
            f'<div layer-name="{n}" style="display:flex;flex-direction:column;flex:1;gap:var(--space-xs)">'
            f'<div style="display:flex;height:68px;border-radius:var(--radius-s);overflow:hidden">'
            f'<div style="flex:2;background:var(--{n})"></div><div style="flex:1;background:var(--{n}-transparent)"></div></div>'
            f'{s.label2(n,h+" · 20%")}</div>' for n,h in PALETTE)
        return s.section("Palette","Palette and status",items)
    def semantic(s):
        d = s.m=="dark"
        cols=[("Background",[("bg-canvas","neutral-1"),("bg-surface","neutral-2"),("bg-surface-muted","neutral-3"),
                ("bg-control","neutral-2" if d else "neutral-1"),("bg-popover","neutral-2" if d else "neutral-1"),
                ("bg-hover","neutral-3 · 20%"),("bg-hover-strong","neutral-4 · 20%"),("bg-highlight","neutral-3"),("bg-disabled","neutral-3"),("bg-track","neutral-4"),("bg-thumb","neutral-1"),
                ("bg-inverse","neutral-10"),("bg-backdrop","neutral-1 · 20%" if d else "neutral-10 · 20%")]),
              ("Text",[("text","neutral-10"),("text-secondary","neutral-8"),("text-muted","neutral-7"),("text-subtle","neutral-6"),
                ("text-disabled","neutral-6"),("text-on-accent","neutral-1"),("text-inverse","neutral-1"),("text-selected","color-1" if d else "neutral-10")]),
              ("Border",[("border","neutral-4"),("border-strong","neutral-5"),("border-subtle","neutral-10 · 20%" if d else "black · 10%"),
                ("border-disabled","neutral-4 · 20%"),("focus-ring","neutral-10 · 50%")]),
              ("Accent and status",[("accent","color-1"),("accent-muted","color-1 · 20%"),("success","success"),("success-muted","success · 20%"),
                ("warning","warning"),("warning-muted","warning · 20%"),("danger","error"),("danger-muted","error · 20%"),
                ("navigation-active-background",""),("navigation-active-foreground","")])]
        out=""
        for title,rows in cols:
            r="".join(
                f'<div layer-name="{role}" style="display:flex;align-items:center;gap:var(--space-s);padding:var(--space-xs) 0;box-shadow:inset 0 1px 0 {s.c("border")}">'
                f'<div style="width:var(--space-xl);height:var(--space-xl);flex-shrink:0;border-radius:var(--radius-s);background:{f"var(--{role})" if role.startswith("navigation") else s.c(role)};{s.edge()}"></div>'
                f'<div style="flex:1;{s.ty("data","s")}">{role}</div>'
                f'<div style="{s.ty("data","xs","regular","text-muted")}">{alias}</div></div>' for role,alias in rows)
            out+=(f'<div layer-name="{title}" style="display:flex;flex-direction:column;flex:1">'
                  f'<div style="padding-bottom:var(--space-s);{s.ty("ui","m","medium")}">{title}</div>{r}</div>')
        return s.section("Semantic","Semantic roles",out,"display:flex;flex:1;gap:var(--space-xxl);align-items:flex-start")
    def type_scale(s):
        steps=[("xxl","43 / 46","−0.02em","heavy"),("xl","32 / 35","−0.01em","heavy"),("l","21 / 28","−0.01em","medium"),
               ("m","14 / 21","0em","regular"),("s","12 / 18","+0.01em","regular"),("xs","11 / 14","+0.01em","regular"),("xxs","9 / 12","+0.02em","regular")]
        rows="".join(
            f'<div layer-name="{k}" style="display:flex;align-items:baseline;gap:var(--space-l);padding:var(--space-m) 0;box-shadow:inset 0 1px 0 {s.c("border")}">'
            f'<div style="width:40px;flex-shrink:0;{s.ty("data","s","medium")}">{k}</div>'
            f'<div style="flex:1;{s.ty("brand",k,w)}">Canopy cover reached 84% this week</div>'
            f'<div style="width:150px;flex-shrink:0;text-align:right;{s.ty("data","xs","regular","text-muted")}">{sz} · {tr}</div></div>'
            for k,sz,tr,w in steps)
        return s.section("Type scale","Type scale",rows,"display:flex;flex-direction:column;flex:1")
    def fonts(s):
        def fam(name, roles, font, sample):
            ws="".join(f'<div style="display:flex;align-items:baseline;gap:var(--space-l);padding:var(--space-s) 0;box-shadow:inset 0 1px 0 {s.c("border")}">'
                       f'<div style="flex:1;{s.ty(font,"l",w)}">{sample}</div>'
                       f'<div style="{s.ty("data","xs","regular","text-muted")}">{w} · {n}</div></div>'
                       for w,n in (("regular",500),("medium",600),("heavy",800)))
            return (f'<div layer-name="{name}" style="display:flex;flex-direction:column;flex:1">'
                    f'<div style="display:flex;justify-content:space-between;align-items:baseline;padding-bottom:var(--space-s)">'
                    f'<div style="{s.ty("ui","m","medium")}">{name}</div>'
                    f'<div style="{s.ty("data","xs","regular","text-muted")}">{roles}</div></div>{ws}</div>')
        inner=fam("Geist","ui · brand · editorial","ui","North block, row 14")+fam("Geist Mono","data","data","31.4% VWC  18.2°C")
        return s.section("Fonts","Fonts and weights",inner,"display:flex;flex:1;gap:var(--space-xxl)")
    def spacing(s):
        sp=[("xxs",3),("xs",6),("s",9),("m",11),("l",17),("xl",23),("xxl",34)]
        items="".join(
            f'<div layer-name="space-{k}" style="display:flex;flex-direction:column;gap:var(--space-xs);width:96px">'
            f'<div style="display:flex;align-items:flex-end;height:34px"><div style="width:var(--space-{k});height:var(--space-{k});background:{s.c("accent")}"></div></div>'
            f'{s.label2("space-"+k,f"{v}px")}</div>' for k,v in sp)
        return s.section("Spacing","Spacing",items,"display:flex;flex:1;gap:var(--space-xl)")
    def radius(s):
        rs=[("zero","0"),("xs","2px"),("s","4px"),("m","6px"),("l","12px"),("xl","18px"),("full","9999px")]
        items="".join(
            f'<div layer-name="radius-{k}" style="display:flex;flex-direction:column;gap:var(--space-xs);width:96px">'
            f'<div style="width:68px;height:68px;border-radius:var(--radius-{k});background:{s.c("bg-surface-muted")};{s.edge()}"></div>'
            f'{s.label2("radius-"+k,v)}</div>' for k,v in rs)
        return s.section("Radius","Radius",items,"display:flex;flex:1;gap:var(--space-xl)")
    def edges(s):
        es=[("border-s","1px · border",f"inset 0 0 0 1px {s.c('border')}"),
            ("border-m","1px · border-strong",f"inset 0 0 0 1px {s.c('border-strong')}"),
            ("border-l","2px · border",f"inset 0 0 0 2px {s.c('border')}"),
            ("focus-ring","2px outline",f"0 0 0 2px {s.c('focus-ring')}"),
            ("shadow s · m · l","0% opacity, flat","0 0 0 0 transparent")]
        items="".join(
            f'<div layer-name="{k}" style="display:flex;flex-direction:column;gap:var(--space-s);width:150px">'
            f'<div style="width:120px;height:68px;border-radius:var(--radius-s);background:{s.c("bg-surface")};box-shadow:{sh}"></div>'
            f'{s.label2(k,v)}</div>' for k,v,sh in es)
        return s.section("Edges","Edges and elevation",items,"display:flex;flex:1;gap:var(--space-xl)",note="Edges are box-shadows, not borders")
    ICONS=[("sprout",'<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>'),
        ("droplet",'<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>'),
        ("thermometer",'<path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"/>'),
        ("wind",'<path d="M12.8 19.6A2 2 0 1 0 14 16H2"/><path d="M17.5 8a2.5 2.5 0 1 1 2 4H2"/><path d="M9.8 4.4A2 2 0 1 1 11 8H2"/>'),
        ("sun",'<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>'),
        ("map-pin",'<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>'),
        ("activity",'<path d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"/>'),
        ("bell",'<path d="M10.268 21a2 2 0 0 0 3.464 0"/><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>'),
        ("search",'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>'),
        ("plus",'<path d="M5 12h14"/><path d="M12 5v14"/>'),
        ("check",'<path d="M20 6 9 17l-5-5"/>'),
        ("chevron-down",'<path d="m6 9 6 6 6-6"/>'),
        ("chevron-right",'<path d="m9 18 6-6-6-6"/>'),
        ("arrow-right",'<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'),
        ("x",'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>')]
    def icon(s, name, size=24, color="text"):
        p=dict(s.ICONS)[name]
        return (f'<svg layer-name="{name}" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="{s.c(color)}" stroke-width="2.5" '
                f'stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0">{p}</svg>')
    def icons(s):
        items="".join(f'<div style="display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-s);flex:1">{s.icon(n)}'
                      f'<div style="white-space:nowrap;{s.ty("data","xs","regular","text-muted")}">{n}</div></div>' for n,_ in s.ICONS if n not in ('sun','activity','wind','arrow-right'))
        return s.section("Icons","Icons",items,"display:flex;flex:1",note="Lucide · outlined · 2.5 stroke")

def write(target, html):
    r=call("write_html", targetNodeId=target, mode="insert-children", html=html)
    n=r[-1].get("createdNodes",[]) if isinstance(r[-1],dict) else []
    return n
def artboard(name, mode, height=900):
    r=call("create_artboard", pageId="p-1-0", name=name, styles={"width":"1440px","height":f"{height}px","display":"flex","flexDirection":"column",
        "backgroundColor":f"var(--{mode}-bg-canvas)","padding":"var(--space-xxl)","gap":"var(--space-xxl)","fontFamily":"var(--font-ui)"})
    return r[-1]["id"]
def foundations(mode, ab):
    d=DS(mode)
    for part in (d.header("Foundations"), d.neutrals(), d.palette(), d.semantic(), d.type_scale(), d.fonts(), d.spacing(), d.radius(), d.edges(), d.icons()):
        n=write(ab, part); print(mode, n[0]["name"] if n else "??", len(n))
    call("update_styles", updates=[{"nodeIds":[ab],"styles":{"height":"fit-content"}}])
if __name__=="__main__":
    cmd=sys.argv[1]
    if cmd=="foundations":
        mode=sys.argv[2]; ab=sys.argv[3] if len(sys.argv)>3 else artboard(f"Beam · Foundations · {mode.capitalize()}", mode)
        print("artboard", ab); foundations(mode, ab)
