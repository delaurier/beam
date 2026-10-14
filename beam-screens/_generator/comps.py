import sys
from pmcp import call
from ds import DS, write, artboard

class C(DS):
    def sh(s, *layers): return "box-shadow:" + ", ".join(layers)
    def cap(s, t): return f'<div style="{s.ty("data","xs","regular","text-muted")}">{t}</div>'
    def ring(s): return f"0 0 0 2px {s.c('focus-ring')}"
    def ic(s, name, size=16, color="text"): return s.icon(name, size, color)

    # ---- button ----
    def btn(s, label, variant="primary", state="rest", icon=None, icon_only=False, trailing=False):
        sub=s.c("border-subtle"); bg="transparent"; fg="text"; edge=None
        if variant=="primary":   bg=s.c("accent"); fg="text-on-accent"; edge=f"inset 0 0 0 1px {sub}"
        if variant=="danger":    bg=s.c("danger"); fg="text-on-accent"; edge=f"inset 0 0 0 1px {sub}"
        if variant=="secondary": bg=s.c("accent-muted"); edge=f"0 0 0 1px {sub}"
        if variant=="outline":   edge=f"inset 0 0 0 1px {s.c('border')}"
        if state=="hover":
            if variant=="secondary": bg=s.c("bg-hover-strong")
            if variant in ("outline","ghost"): bg=s.c("bg-hover")
        if state=="disabled":
            fg="text-disabled"
            if variant in ("primary","danger","secondary"): bg=s.c("bg-disabled")
            if variant=="outline": edge=f"inset 0 0 0 1px {s.c('border-disabled')}"
        layers=[]
        if state=="focus":
            if variant=="outline": edge=f"inset 0 0 0 1px {s.c('accent-muted')}"
            if variant=="ghost": edge=f"inset 0 0 0 1px {sub}"
            if variant=="secondary": edge=None
            layers=[l for l in (edge, s.ring()) if l]
        elif edge: layers=[edge]
        shadow=(s.sh(*layers)+";") if layers else ""
        pad="var(--space-xs)" if icon_only else "var(--space-xs) var(--space-m)"
        i=f'<div style="display:flex;align-items:center;height:var(--line-m)">{s.ic(icon,16,fg)}</div>' if icon else ""
        t="" if icon_only else f'<div style="{s.ty("ui","m","medium",fg)}">{label}</div>'
        inner=(t+i) if trailing else (i+t)
        return (f'<div layer-name="Button / {variant} / {state}" style="display:flex;align-items:center;justify-content:center;gap:var(--space-xs);'
                f'padding:{pad};border-radius:var(--radius-s);background:{bg};{shadow}">{inner}</div>')
    def buttons(s):
        labels=[("primary","Add sensor","plus"),("secondary","Export",None),("outline","View map","map-pin"),("ghost","Skip",None),("danger","Remove",None)]
        head='<div style="display:flex;align-items:center;gap:var(--space-l)"><div style="width:72px;flex-shrink:0"></div>'+"".join(
            f'<div style="width:160px;flex-shrink:0;{s.ty("data","xs","regular","text-muted")}">{v}</div>' for v,_,_ in labels)+'</div>'
        rows=""
        for st in ("rest","hover","focus","disabled"):
            rows+=(f'<div layer-name="{st}" style="display:flex;align-items:center;gap:var(--space-l)"><div style="width:72px;flex-shrink:0;{s.ty("data","xs","regular","text-muted")}">{st}</div>'
                   +"".join(f'<div style="display:flex;width:160px;flex-shrink:0">{s.btn(l,v,st,i)}</div>' for v,l,i in labels)+'</div>')
        return s.section("Button","Button",head+rows,"display:flex;flex-direction:column;flex:1;gap:var(--space-l)")

    # ---- fields ----
    def control(s, value, state="rest", placeholder=False, trailing=None):
        bg=s.c("bg-control"); fg="text-subtle" if placeholder else "text"; edge=f"0 0 0 1px {s.c('border-subtle')}"
        if state=="focus": edge=s.ring()
        if state=="invalid": edge=f"0 0 0 1px {s.c('danger')}"
        if state=="valid": edge=f"0 0 0 1px {s.c('success')}"
        if state=="disabled": bg=s.c("bg-disabled"); fg="text-disabled"
        t=s.ic(trailing,16,"text-muted" if state!="disabled" else "text-disabled") if trailing else ""
        return (f'<div layer-name="Control / {state}" style="display:flex;align-items:center;gap:var(--space-xs);padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);'
                f'background:{bg};box-shadow:{edge}"><div style="flex:1;{s.ty("ui","m","regular",fg)}">{value}</div>{t}</div>')
    def field(s, label, value, state="rest", desc=None, err=None, placeholder=False, trailing=None):
        lf="text-disabled" if state=="disabled" else "text"
        extra=""
        if err: extra=f'<div style="{s.ty("ui","m","regular","danger")}">{err}</div>'
        elif desc: extra=f'<div style="{s.ty("ui","m","regular","text-muted" if state!="disabled" else "text-disabled")}">{desc}</div>'
        return (f'<div layer-name="Field / {state}" style="display:flex;flex-direction:column;flex:1;gap:var(--space-xs)">'
                f'<div style="{s.ty("ui","m","medium",lf)}">{label}</div>{s.control(value,state,placeholder,trailing)}{extra}</div>')
    def fields(s):
        items=(s.spec("rest", s.field("Field name","North block","rest",desc="Shown on the map and in alerts."))
              +s.spec("focus", s.field("Irrigation threshold","28%","focus",desc="Alert when moisture drops below this."))
              +s.spec("invalid", s.field("Sensor ID","BM-20","invalid",err="Enter a 7-character sensor ID."))
              +s.spec("disabled", s.field("Region","Waikato","disabled",desc="Set by your organisation.")))
        return s.section("Text field","Text field",items,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")
    def spec(s, caption, inner, flex="flex:1"):
        return f'<div style="display:flex;flex-direction:column;{flex};gap:var(--space-m)">{s.cap(caption)}{inner}</div>'

    # ---- select + menu ----
    def popover(s, inner, pad="xxs", radius="s", gap="xxs", extra=""):
        return (f'<div layer-name="Popover" style="display:flex;flex-direction:column;gap:var(--space-{gap});padding:var(--space-{pad});border-radius:var(--radius-{radius});'
                f'background:{s.c("bg-popover")};box-shadow:0 0 0 1px {s.c("border-subtle")};{extra}">{inner}</div>')
    def option(s, label, state="rest", check=False, color="text"):
        bg={"rest":"transparent","highlighted":s.c("bg-highlight"),"selected":s.c("bg-surface")}.get(state,"transparent")
        fg="text-disabled" if state=="disabled" else color
        return (f'<div layer-name="Option / {state}" style="display:flex;align-items:center;gap:var(--space-xs);padding:var(--space-xxs) var(--space-xs);border-radius:var(--radius-xs);background:{bg}">'
                f'<div style="flex:1;{s.ty("ui","m","regular",fg)}">{label}</div>{s.ic("check",16,"text") if check else ""}</div>')
    def selects(s):
        closed=s.spec("closed", s.field("Crop","Winter wheat","rest",trailing="chevron-down"))
        opened=s.spec("open", f'<div style="display:flex;flex-direction:column;gap:var(--space-xs)">{s.field("Crop","Winter wheat","focus",trailing="chevron-down")}'
               + s.popover(s.option("Winter wheat","selected",check=True)+s.option("Barley","highlighted")+s.option("Canola")+s.option("Lucerne","disabled"))+'</div>')
        menu=s.spec("menu", f'<div style="display:flex;flex-direction:column;align-items:flex-start;gap:var(--space-xs)">{s.btn("Field actions","outline","rest","chevron-down",trailing=True)}'
               + s.popover(f'<div style="padding:var(--space-xxs) var(--space-xs);{s.ty("ui","m","medium","text-subtle")}">North block</div>'
                 + s.option("Rename")+s.option("Duplicate","highlighted")
                 + f'<div style="width:100%;height:var(--border-s);background:{s.c("border")}"></div>'+s.option("Archive"), radius="m", extra="width:200px")+'</div>')
        return s.section("Select and menu","Select and menu",closed+opened+menu,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

    # ---- selection controls ----
    def row(s, ctrl, label, disabled=False, weight="regular"):
        return (f'<div style="display:flex;align-items:center;gap:var(--space-s)">{ctrl}'
                f'<div style="{s.ty("ui","m",weight,"text-disabled" if disabled else "text")}">{label}</div></div>')
    def checkbox(s, state):
        bg=s.c("bg-control"); inner=""
        if state in ("checked","indeterminate"):
            bg=s.c("accent")
            p='<path d="M20 6 9 17l-5-5"/>' if state=="checked" else '<path d="M5 12h14"/>'
            inner=(f'<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="{s.c("text-on-accent")}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">{p}</svg>')
        if state=="disabled": bg=s.c("bg-disabled")
        return (f'<div layer-name="Checkbox / {state}" style="display:flex;align-items:center;justify-content:center;width:var(--space-l);height:var(--space-l);flex-shrink:0;'
                f'border-radius:var(--radius-xs);background:{bg};box-shadow:inset 0 0 0 1px {s.c("border-subtle")}">{inner}</div>')
    def radio(s, state):
        bg=s.c("bg-disabled") if state=="disabled" else s.c("bg-control")
        dot=f'<div style="width:var(--space-s);height:var(--space-s);border-radius:var(--radius-full);background:{s.c("accent")}"></div>' if state=="checked" else ""
        return (f'<div layer-name="Radio / {state}" style="display:flex;align-items:center;justify-content:center;width:var(--space-l);height:var(--space-l);flex-shrink:0;'
                f'border-radius:var(--radius-full);background:{bg};box-shadow:0 0 0 1px {s.c("border-subtle")}">{dot}</div>')
    def switch(s, state):
        on = state=="on"
        track=s.c("accent") if on else (s.c("bg-disabled") if state=="disabled" else s.c("bg-track"))
        thumb=s.c("text-disabled") if state=="disabled" else s.c("bg-thumb")
        return (f'<div layer-name="Switch / {state}" style="display:flex;justify-content:{"flex-end" if on else "flex-start"};width:40px;height:var(--space-xl);flex-shrink:0;padding:var(--space-xxs);'
                f'border-radius:var(--radius-s);background:{track}"><div style="width:var(--space-l);height:var(--space-l);border-radius:var(--radius-xs);background:{thumb};'
                f'box-shadow:0 0 0 1px {s.c("border-subtle")}"></div></div>')
    def selection(s):
        col=lambda cap,inner: f'<div style="display:flex;flex-direction:column;flex:1;gap:var(--space-m)">{s.cap(cap)}{inner}</div>'
        cb=col("checkbox", s.row(s.checkbox("rest"),"Frost alerts")+s.row(s.checkbox("checked"),"Daily summary")
               +s.row(s.checkbox("indeterminate"),"All blocks")+s.row(s.checkbox("disabled"),"Weather station",True))
        rd=col("radio", s.row(s.radio("checked"),"Celsius")+s.row(s.radio("rest"),"Fahrenheit")+s.row(s.radio("disabled"),"Kelvin",True))
        sw=col("switch", s.row(s.switch("on"),"Auto-irrigate",weight="medium")+s.row(s.switch("off"),"Night readings",weight="medium")
               +s.row(s.switch("disabled"),"Remote valve",True,"medium"))
        return s.section("Selection","Checkbox, radio, switch",cb+rd+sw,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

    # ---- tabs / toggle ----
    def tabs(s):
        tr=lambda t,c: f'<div style="padding:var(--space-xs) 0;{s.ty("ui","m","regular",c)}">{t}</div>'
        tabs=(f'<div layer-name="Tabs" style="display:flex;flex-direction:column;gap:var(--space-xs)">'
              f'<div style="display:flex;gap:var(--space-l);box-shadow:inset 0 -1px 0 {s.c("border")}">{tr("Overview","text-selected")}{tr("Moisture","text-subtle")}{tr("Canopy","text-subtle")}{tr("Alerts","text-subtle")}</div>'
              f'<div style="{s.ty("ui","m","regular","text-secondary")}">14 sensors reporting across 42 hectares.</div></div>')
        tg=lambda t,p: (f'<div style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if p else "transparent"};'
                        f'{s.ty("ui","m","medium")}">{t}</div>')
        toggle=f'<div layer-name="Toggle group" style="display:flex;gap:var(--space-xxs)">{tg("Day",False)}{tg("Week",True)}{tg("Season",False)}</div>'
        av=lambda t: (f'<div layer-name="Avatar" style="display:flex;align-items:center;justify-content:center;width:var(--space-xxl);height:var(--space-xxl);border-radius:var(--radius-full);'
                      f'background:{s.c("bg-surface-muted")}"><div style="{s.ty("ui","m","medium","text-secondary")}">{t}</div></div>')
        avatars=f'<div style="display:flex;gap:var(--space-xs)">{av("PD")}{av("MK")}{av("AR")}</div>'
        inner=s.spec("tabs",tabs,"flex:2")+s.spec("toggle group",f'<div style="display:flex">{toggle}</div>')+s.spec("avatar",avatars)
        return s.section("Tabs","Tabs, toggle group, avatar",inner,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

    # ---- navigation menu + toolbar ----
    def navtool(s):
        trig=lambda t,ic,o: (f'<div layer-name="Nav trigger / {t}" style="display:flex;align-items:center;gap:var(--space-xs);width:100%;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s)">'
                             f'{s.ic(ic,16,"text")}<div style="flex:1;{s.ty("ui","m","medium")}">{t}</div>{s.ic("chevron-down" if o else "chevron-right",16,"text-muted")}</div>')
        link=lambda t,sel,ind=True: (f'<div layer-name="Nav link / {t}" style="display:flex;width:100%;padding:var(--space-xs) var(--space-s) var(--space-xs) {"var(--space-xxl)" if ind else "var(--space-s)"};border-radius:var(--radius-s);'
                                     f'background:{"var(--navigation-active-background)" if sel else "transparent"}"><div style="{s.ty("ui","m","regular").replace("color:"+s.c("text"),"color:var(--navigation-active-foreground)") if sel else s.ty("ui","m","regular")}">{t}</div></div>')
        nav=(f'<div layer-name="Navigation menu" style="display:flex;flex-direction:column;gap:var(--space-xxs);width:220px">{trig("Crops","sprout",True)}{link("Corn",True)}{link("Soybeans",False)}{trig("Land","map-pin",False)}</div>')
        tc=lambda t,p: (f'<div layer-name="Toolbar control / {t}" style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if p else "transparent"};{s.ty("ui","m","medium","text" if p else "text-muted")}">{t}</div>')
        tb=(f'<div style="display:flex"><div layer-name="Toolbar" style="display:flex;gap:var(--space-xxs);padding:var(--space-xxs);border-radius:var(--radius-s);box-shadow:inset 0 0 0 1px {s.c("border")}">'
            f'{tc("Budget",False)}{tc("Marketing",True)}{tc("Inputs",False)}</div></div>')
        return s.section("Navigation","Navigation menu, toolbar",s.spec("navigation menu",nav)+s.spec("toolbar",tb)+'<div style="flex:1"></div>',"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

    # ---- slider / progress / meter ----
    def bar(s, label, value, pct, color="accent", thumb=False):
        head=(f'<div style="display:flex;justify-content:space-between;gap:var(--space-s)"><div style="{s.ty("ui","m","medium")}">{label}</div>'
              f'<div style="{s.ty("ui","m","regular","text-muted")}">{value}</div></div>')
        seg=lambda fl,col: f'<div style="flex:{fl};height:var(--space-xs);border-radius:var(--radius-full);background:{col}"></div>'
        if thumb:
            t=(f'<div style="width:var(--space-l);height:var(--space-l);flex-shrink:0;border-radius:var(--radius-full);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}"></div>')
            track=f'<div style="display:flex;align-items:center;height:var(--space-l)">{seg(pct,s.c(color))}{t}{seg(100-pct,s.c("bg-surface-muted"))}</div>'
        else:
            track=(f'<div style="display:flex;height:var(--space-xs);border-radius:var(--radius-full);background:{s.c("bg-surface-muted")};overflow:hidden">'
                   f'<div style="flex:{pct};border-radius:var(--radius-full);background:{s.c(color)}"></div><div style="flex:{100-pct}"></div></div>')
        return f'<div style="display:flex;flex-direction:column;gap:var(--space-s)">{head}{track}</div>'
    def meters(s):
        inner=(s.spec("slider", s.bar("Irrigation threshold","28%",28,thumb=True))
              +s.spec("progress", s.bar("Syncing 14 sensors","62%",62))
              +s.spec("meter", f'<div style="display:flex;flex-direction:column;gap:var(--space-l)">{s.bar("Soil moisture","31%",31)}{s.bar("Battery","18% · low",18,"warning")}{s.bar("Salinity","92% · high",92,"danger")}</div>'))
        return s.section("Slider","Slider, progress, meter",inner,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

    # ---- overlays ----
    def overlays(s):
        tip=(f'<div style="display:flex"><div layer-name="Tooltip" style="padding:var(--space-xxs) var(--space-xs);border-radius:var(--radius-s);background:{s.c("bg-inverse")};'
             f'{s.ty("ui","m","medium","text-inverse")}">Last reading 4 min ago</div></div>')
        toast=s.popover(
            f'<div style="display:flex;align-items:center;gap:var(--space-m)"><div style="display:flex;flex-direction:column;flex:1;gap:var(--space-xs)">'
            f'<div style="{s.ty("ui","m","medium")}">Sensor BM-2041 is back online</div><div style="{s.ty("ui","m","regular","text-muted")}">North block, row 14</div></div>'
            f'{s.btn("View","secondary")}{s.btn("","ghost","rest","x",True)}</div>', pad="m", radius="m", gap="xs")
        dialog=(f'<div layer-name="Backdrop" style="display:flex;justify-content:center;padding:var(--space-xl);border-radius:var(--radius-m);background:{s.c("bg-backdrop")}">'
                + s.popover(f'<div style="{s.ty("ui","m","medium")}">Archive North block?</div>'
                  f'<div style="{s.ty("ui","m","regular","text-muted")}">Its 14 sensors stop reporting. Readings already collected stay available.</div>'
                  f'<div style="display:flex;justify-content:flex-end;gap:var(--space-xs);padding-top:var(--space-s)">{s.btn("Cancel","ghost")}{s.btn("Archive","primary")}</div>',
                  pad="l", radius="m", gap="s", extra="flex:1")+'</div>')
        inner=s.spec("tooltip",tip,"flex:0.7")+s.spec("toast",toast,"flex:1.3")+s.spec("dialog",dialog,"flex:1.2")
        return s.section("Overlays","Tooltip, toast, dialog",inner,"display:flex;flex:1;gap:var(--space-xl);align-items:flex-start")

def components(mode, ab):
    d=C(mode)
    for part in (d.header("Components"), d.buttons(), d.fields(), d.selects(), d.selection(), d.tabs(), d.navtool(), d.meters(), d.overlays()):
        n=write(ab, part); print(mode, n[0]["name"] if n else "??", len(n))
    call("update_styles", updates=[{"nodeIds":[ab],"styles":{"height":"fit-content"}}])

if __name__=="__main__":
    mode=sys.argv[1]
    ab=sys.argv[2] if len(sys.argv)>2 else artboard(f"Beam · Components · {mode.capitalize()}", mode)
    print("artboard", ab); components(mode, ab)
