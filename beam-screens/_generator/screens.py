import sys, math, datetime as dt
from pmcp import call
from ds import DS, write
from comps import C

import os
PHOTO=os.environ.get("BEAM_PHOTO","https://app.paper.design/file-assets/01M4TWW9MBYA86T09KS7D2FT08/3GXFBE2S3ZQ8AZGWXYH4PCE0PX.jpg")
BE=4.43
# date, variety, type, bushels, futures, basis, premium, final, status
SALES=[("2026-06-02","Non-GMO Corn","HTA",1000,5.50,0.10,0.10,5.70,"Filled"),
 ("2026-05-29","Non-GMO Corn","Cash",15000,4.75,0.10,0.14,4.99,"Filled"),
 ("2026-05-26","Non-GMO Corn","Cash",7000,5.45,0.00,0.00,5.45,"Filled"),
 ("2026-05-23","Non-GMO Corn","HTA",7000,5.35,0.00,0.00,5.35,"Filled"),
 ("2026-04-21","Non-GMO Corn","Cash",23423,4.75,0.10,0.01,4.86,"Filled"),
 ("2026-03-28","Corn","Hedge",10000,4.60,-0.10,0.05,4.55,"Filled"),
 ("2026-03-24","Non-GMO Corn","Other",70000,4.97,-0.16,0.02,4.83,"Filled"),
 ("2026-03-18","Corn","Cash",80000,4.55,0.15,0.10,4.80,"Open"),
 ("2026-03-10","Non-GMO Corn","Cash",60000,4.74,-0.06,0.01,4.69,"Filled"),
 ("2026-03-02","Corn","Other",50000,4.88,-0.12,0.05,4.81,"Filled"),
 ("2026-02-24","Non-GMO Corn","Basis",90000,5.03,-0.08,0.15,5.10,"Filled"),
 ("2026-02-11","Corn","Cash",70000,4.82,0.06,0.12,5.00,"Filled"),
 ("2026-02-03","Non-GMO Corn","Other",90000,4.95,-0.11,0.08,4.92,"Filled"),
 ("2026-01-27","Corn","HTA",79577,4.71,0.00,0.05,4.76,"Filled"),
 ("2026-01-12","Corn","Cash",60000,4.52,0.04,0.02,4.58,"Filled")]
def D(s): return dt.date.fromisoformat(s)
def sgn(v): return ("+" if v>0 else "−" if v<0 else "")+f"{abs(v):.2f}"

class S(C):
    ICONS=DS.ICONS+[
      ("layout",'<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>'),
      ("wrench",'<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>'),
      ("dollar",'<line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>'),
      ("file",'<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>'),
      ("sliders",'<line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/>'),
      ("filter",'<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>'),
      ("pencil",'<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>'),
      ("updown",'<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>')]
    def mark(s, size=24):
        return (f'<svg layer-name="Beam mark" width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" style="flex-shrink:0">'
                f'<path d="M12 1.5v21M1.5 12h21M4.9 4.9l14.2 14.2M19.1 4.9L4.9 19.1" stroke="{s.c("text")}" stroke-width="1.4"/>'
                f'<circle cx="12" cy="12" r="2.6" fill="{s.c("accent")}"/></svg>')
    def avatar(s, t="PD"):
        return (f'<div layer-name="Avatar" style="display:flex;align-items:center;justify-content:center;width:var(--space-xxl);height:var(--space-xxl);flex-shrink:0;border-radius:var(--radius-full);'
                f'background:{s.c("bg-surface-muted")}"><div style="{s.ty("ui","m","medium","text-secondary")}">{t}</div></div>')
    def tabs_row(s, right=""):
        tr=lambda t,c: f'<div style="padding:var(--space-xs) 0;{s.ty("ui","m","regular",c)}">{t}</div>'
        return (f'<div layer-name="Tabs" style="display:flex;align-items:center;justify-content:space-between;width:100%;box-shadow:inset 0 -1px 0 {s.c("border")}">'
                f'<div style="display:flex;gap:var(--space-l)">{tr("Budget","text-subtle")}{tr("Marketing","text-selected")}{tr("Inputs","text-subtle")}</div>{right}</div>')
    def variety_toggle(s):
        tg=lambda t,p: (f'<div style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if p else "transparent"};{s.ty("ui","m","medium")}">{t}</div>')
        return f'<div layer-name="Variety" style="display:flex;gap:var(--space-xxs)">{tg("All corn",True)}{tg("Corn",False)}{tg("Non-GMO",False)}</div>'
    def dot(s, color): return f'<div style="width:var(--space-xs);height:var(--space-xs);flex-shrink:0;border-radius:var(--radius-full);background:{s.c(color)}"></div>'
    def status(s, st):
        return f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.dot("success" if st=="Filled" else "warning")}<div style="{s.ty("ui","m","regular")}">{st}</div></div>'

    # ================= Direction A =================
    LA=[("Date",84,"l"),("Variety",None,"l"),("Type",96,"l"),("Bushels",96,"r"),("Futures",80,"r"),("Basis",80,"r"),("Premium",80,"r"),("Final",88,"r"),("vs break-even",110,"r"),("Status",104,"l"),("",62,"r")]
    def lane(s, i, inner, pad_left=False):
        _,w,al=s.LA[i]
        wst=f"width:{w}px;flex-shrink:0" if w else "flex:1;min-width:0"
        j="flex-end" if al=="r" else "flex-start"
        return f'<div style="display:flex;justify-content:{j};{wst}">{inner}</div>'
    def a_rail(s):
        def item(icon,label,active=False):
            col="text" if active else "text-muted"
            return (f'<div layer-name="Nav / {label}" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-xxs);width:100%;padding:var(--space-s) 0;border-radius:var(--radius-m);'
                    f'background:{s.c("bg-highlight") if active else "transparent"}">{s.icon(icon,20,col)}<div style="{s.ty("ui","s","medium" if active else "regular",col)}">{label}</div></div>')
        return (f'<div layer-name="Rail" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-xxs);width:84px;flex-shrink:0;height:100%;padding:var(--space-l) var(--space-s);box-shadow:inset -1px 0 0 {s.c("border")}">'
                f'<div style="display:flex;padding-bottom:var(--space-l)">{s.mark(26)}</div>'
                f'{item("layout","Overview")}{item("sprout","Crops",True)}{item("map-pin","Land")}{item("wrench","Machinery")}{item("dollar","Finance")}{item("file","Reports")}'
                f'<div style="flex:1"></div>{item("sliders","Settings")}<div style="display:flex;padding-top:var(--space-s)">{s.avatar()}</div></div>')
    def switcher(s, label, weight="medium"):
        return (f'<div layer-name="Switcher / {label}" style="display:flex;align-items:center;gap:var(--space-xs);padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s)">'
                f'<div style="{s.ty("ui","m",weight)}">{label}</div>{s.icon("updown",16,"text-muted")}</div>')
    def a_topbar(s):
        search=(f'<div layer-name="Search" style="display:flex;align-items:center;gap:var(--space-xs);width:340px;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}">'
                f'{s.icon("search",16,"text-muted")}<div style="flex:1;{s.ty("ui","m","regular","text-subtle")}">Search or jump to a field, sale, or report</div>'
                f'<div style="padding:0 var(--space-xs);border-radius:var(--radius-xs);background:{s.c("bg-surface-muted")};{s.ty("data","xs","regular","text-muted")}">⌘K</div></div>')
        return (f'<div layer-name="Top bar" style="display:flex;align-items:center;gap:var(--space-s);width:100%;padding:var(--space-m) var(--space-xxl) var(--space-m) var(--space-xl);box-shadow:inset 0 -1px 0 {s.c("border")}">'
                f'{s.switcher("Sample Farm")}<div style="{s.ty("ui","m","regular","text-subtle")}">/</div>{s.switcher("2026 season")}<div style="flex:1"></div>{search}{s.btn("New","primary","rest","plus")}</div>')
    def a_header(s):
        title=(f'<div layer-name="Crop switcher" style="display:flex;align-items:center;gap:var(--space-s)"><div style="{s.ty("brand","xl","heavy")}">Corn</div>{s.btn("","ghost","rest","chevron-down",True)}'
               f'<div style="padding-left:var(--space-s);{s.ty("ui","m","regular","text-muted")}">3,580 acres · 223.3 bu/ac expected</div></div>')
        return (f'<div layer-name="Header" style="display:flex;flex-direction:column;gap:var(--space-m);width:100%">'
                f'<div style="display:flex;align-items:center;justify-content:space-between">{title}{s.variety_toggle()}</div>{s.tabs_row()}</div>')
    def a_position(s):
        tot=800.0; con=713.0; proj=0.917*tot
        bar=(f'<div layer-name="Position bar" style="display:flex;width:100%;height:var(--space-m);border-radius:var(--radius-full);overflow:hidden;background:{s.c("bg-surface-muted")}">'
             f'<div style="flex:{con};background:{s.c("accent")}"></div><div style="flex:{proj-con:.1f};background:{s.c("accent-muted")}"></div><div style="flex:{tot-proj:.1f}"></div></div>')
        leg=lambda col,t,v: f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.dot(col)}<div style="{s.ty("ui","m","regular","text-muted")}">{t}</div><div style="{s.ty("data","m","medium")}">{v}</div></div>'
        left=(f'<div layer-name="Marketed" style="display:flex;flex-direction:column;flex:1;gap:var(--space-m)">'
              f'<div style="display:flex;align-items:baseline;gap:var(--space-s)"><div style="{s.ty("brand","xxl","heavy")}">89.2%</div><div style="{s.ty("brand","l","medium","text-muted")}">of 800k bu sold</div></div>'
              f'{bar}<div style="display:flex;gap:var(--space-xl)">{leg("accent","Contracted","713k bu")}{leg("accent-muted","Projected","91.7%")}{leg("bg-track","Unsold","86.1k bu")}</div></div>')
        def stat(label, value, unit="", color="text", ctrl=False):
            lab=(f'<div style="display:flex;align-items:center;gap:var(--space-xxs)"><div style="{s.ty("ui","m","regular","text-muted")}">{label}</div>{s.icon("chevron-down",14,"text-muted") if ctrl else ""}</div>')
            return (f'<div layer-name="Stat / {label}" style="display:flex;flex-direction:column;flex-shrink:0;gap:var(--space-xs);padding:0 var(--space-xl) 0 var(--space-l);box-shadow:inset 1px 0 0 {s.c("border")}">{lab}'
                    f'<div style="display:flex;align-items:baseline;gap:var(--space-xxs)"><div style="{s.ty("brand","xl","heavy",color)}">{value}</div><div style="{s.ty("ui","m","regular","text-muted")}">{unit}</div></div></div>')
        right=(f'<div layer-name="Stats" style="display:flex;flex-shrink:0;align-items:flex-end">{stat("Average price","$4.77","/bu")}'
               f'{stat("Break-even, expected","$4.43","/bu",ctrl=True)}{stat("Margin","+$0.34","/bu","success")}{stat("Revenue","$3.41M")}</div>')
        return f'<div layer-name="Position" style="display:flex;align-items:flex-end;gap:var(--space-xxl);width:100%">{left}{right}</div>'
    def a_row(s, r):
        d,var,typ,bu,fut,bas,prem,fin,st=r
        num=lambda v,w="regular",c="text": f'<div style="{s.ty("data","m",w,c)}">{v}</div>'
        txt=lambda v,c="text": f'<div style="{s.ty("ui","m","regular",c)}">{v}</div>'
        cells=[num(D(d).strftime("%b %d"),"regular","text-muted"),txt(var),txt(typ),num(f"{bu:,}"),num(f"{fut:.2f}"),
               num(sgn(bas),"regular","text-muted" if bas==0 else "text"),num(sgn(prem),"regular","text-muted" if prem==0 else "text"),
               num(f"${fin:.2f}","medium"),num(sgn(fin-BE),"regular","success"),s.status(st),""]
        return (f'<div layer-name="Sale / {d}" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-s) 0;box-shadow:inset 0 -1px 0 {s.c("border")}">'
                +"".join(s.lane(i,c) for i,c in enumerate(cells))+'</div>')
    def a_edit_row(s, r):
        d,var,typ,bu,fut,bas,prem,fin,st=r
        def inp(v, font="data", focus=False, chev=False, right=True):
            edge=s.ring() if focus else f"0 0 0 1px {s.c('border-subtle')}"
            return (f'<div style="display:flex;align-items:center;gap:var(--space-xxs);width:100%;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:{edge}">'
                    f'<div style="flex:1;text-align:{"right" if right else "left"};{s.ty(font,"m","regular")}">{v}</div>{s.icon("chevron-down",14,"text-muted") if chev else ""}</div>')
        num=lambda v,w="regular",c="text": f'<div style="{s.ty("data","m",w,c)}">{v}</div>'
        cells=[inp(D(d).strftime("%b %d"),right=False),inp(var,"ui",chev=True,right=False),inp(typ,"ui",chev=True,right=False),inp(f"{bu:,}",focus=True),inp(f"{fut:.2f}"),inp(sgn(bas)),inp(sgn(prem)),
               num(f"${fin:.2f}","medium"),num(sgn(fin-BE),"regular","success"),inp(st,"ui",chev=True,right=False),
               f'<div style="display:flex;gap:var(--space-xxs)">{s.btn("","primary","rest","check",True)}{s.btn("","ghost","rest","x",True)}</div>']
        return (f'<div layer-name="Sale / {d} / editing" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-xxs) 0;box-shadow:inset 0 -1px 0 {s.c("border")}">'
                +"".join(s.lane(i,c) for i,c in enumerate(cells))+'</div>')
    def a_sales_head(s):
        tools=f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.btn("Filter","ghost","rest","filter")}{s.btn("Columns","ghost","rest","sliders")}{s.btn("Firm offers","outline")}{s.btn("Add sale","primary","rest","plus")}</div>'
        head=(f'<div style="display:flex;align-items:center;justify-content:space-between;width:100%"><div style="display:flex;align-items:baseline;gap:var(--space-xs)">'
              f'<div style="{s.ty("brand","l","medium")}">Sales</div><div style="{s.ty("brand","l","medium","text-subtle")}">15</div></div>{tools}</div>')
        cols=(f'<div layer-name="Columns" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-s) 0;box-shadow:inset 0 -1px 0 {s.c("border")}">'
              +"".join(s.lane(i,f'<div style="{s.ty("ui","s","medium","text-muted")}">{n}</div>') for i,(n,_,_) in enumerate(s.LA))+'</div>')
        return f'<div layer-name="Sales header" style="display:flex;flex-direction:column;gap:var(--space-m);width:100%">{head}{cols}</div>'

    # ================= Direction B =================
    LB=[("Day",44,"l"),("Variety",None,"l"),("Type",90,"l"),("Bushels",96,"r"),("Final",84,"r"),("vs break-even",110,"r"),("Status",92,"l")]
    def b_hero(s):
        link=lambda t,a=False: f'<div style="{s.ty("ui","m","medium","text" if a else "text-secondary")}">{t}</div>'
        nav=(f'<div layer-name="Nav" style="display:flex;align-items:center;gap:var(--space-xxl);width:100%">'
             f'<div style="display:flex;align-items:center;gap:var(--space-s)">{s.mark(24)}<div style="{s.ty("brand","l","medium")}">Beam</div></div>'
             f'<div style="display:flex;gap:var(--space-xl);flex:1">{link("Overview")}{link("Crops",True)}{link("Land")}{link("Machinery")}{link("Finance")}{link("Reports")}</div>'
             f'<div style="display:flex;align-items:center;gap:var(--space-s)">{s.switcher("Sample Farm · 2026")}{s.btn("","ghost","rest","search",True)}{s.avatar()}</div></div>')
        def stat(label,value,color="text"):
            return (f'<div layer-name="Stat / {label}" style="display:flex;flex-direction:column;gap:var(--space-xxs);padding-left:var(--space-l);box-shadow:inset 1px 0 0 {s.c("border-strong")}">'
                    f'<div style="{s.ty("ui","m","regular","text-secondary")}">{label}</div><div style="{s.ty("brand","l","medium",color)}">{value}</div></div>')
        title=(f'<div layer-name="Title" style="display:flex;flex-direction:column;gap:var(--space-xs);flex:1"><div style="display:flex;align-items:center;gap:var(--space-s)">'
               f'<div style="{s.ty("brand","xxl","heavy")}">Corn</div>{s.btn("","ghost","rest","chevron-down",True)}</div>'
               f'<div style="{s.ty("brand","l","medium","text-secondary")}">89.2% sold at $4.77, 34¢ over break-even</div></div>')
        stats=f'<div layer-name="Stats" style="display:flex;gap:var(--space-l)">{stat("Contracted","713k bu")}{stat("Unsold","86.1k bu")}{stat("Revenue","$3.41M")}{stat("Break-even","$4.43")}</div>'
        return (f'<div layer-name="Hero" style="position:relative;display:flex;flex-direction:column;justify-content:space-between;width:100%;height:290px;flex-shrink:0;padding:var(--space-l) var(--space-xxl) var(--space-xl);overflow:hidden">'
                f'<div layer-name="Photo" style="position:absolute;left:0;top:0;width:1440px;height:290px;background-image:url({PHOTO});background-size:cover;background-position:50% 62%;filter:brightness(62%) saturate(90%)"></div>'
                f'<div layer-name="Scrim" style="position:absolute;left:0;top:0;width:1440px;height:290px;background-image:linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 34%, rgba(0,0,0,0.25) 62%, #000000 100%)"></div>'
                f'<div style="position:relative;display:flex;width:100%">{nav}</div>'
                f'<div style="position:relative;display:flex;align-items:flex-end;gap:var(--space-xxl);width:100%">{title}{stats}</div></div>')
    def b_chart(s, W=969, H=170):
        L,R,T,B=40,12,10,8
        x0=dt.date(2026,1,1).toordinal(); x1=dt.date(2026,6,15).toordinal(); y0,y1=4.3,5.8
        X=lambda d: L+(D(d).toordinal()-x0)/(x1-x0)*(W-L-R)
        Y=lambda v: T+(y1-v)/(y1-y0)*(H-T-B)
        g="".join(f'<line x1="{L}" x2="{W-R}" y1="{Y(v):.1f}" y2="{Y(v):.1f}" stroke="{s.c("border")}" stroke-width="1"/>' for v in (4.5,5.0,5.5))
        be=f'<line x1="{L}" x2="{W-R}" y1="{Y(BE):.1f}" y2="{Y(BE):.1f}" stroke="{s.c("text-muted")}" stroke-width="1.5" stroke-dasharray="5 5"/>'
        dots=""
        for d,var,typ,bu,fut,bas,prem,fin,st in sorted(SALES,key=lambda r:-r[3]):
            r=3.5+math.sqrt(bu/90000)*9
            if d=="2026-03-18":
                dots+=f'<circle cx="{X(d):.1f}" cy="{Y(fin):.1f}" r="{r+4:.1f}" fill="none" stroke="{s.c("text")}" stroke-width="1.5"/>'
                dots+=f'<circle cx="{X(d):.1f}" cy="{Y(fin):.1f}" r="{r:.1f}" fill="{s.c("warning")}"/>'
            else:
                dots+=f'<circle cx="{X(d):.1f}" cy="{Y(fin):.1f}" r="{r:.1f}" fill="{s.c("accent")}" fill-opacity="0.78"/>'
        svg=f'<svg layer-name="Plot" width="{W}" height="{H}" viewBox="0 0 {W} {H}" fill="none" style="position:absolute;left:0;top:0">{g}{be}{dots}</svg>'
        ylab="".join(f'<div style="position:absolute;left:0;top:{Y(v)-7:.0f}px;{s.ty("data","xs","regular","text-muted")}">{v:.2f}</div>' for v in (4.5,5.0,5.5))
        belab=f'<div style="position:absolute;right:{R}px;top:{Y(BE)-21:.0f}px;{s.ty("data","xs","regular","text-muted")}">break-even 4.43</div>'
        months="".join(f'<div style="position:absolute;left:{X(f"2026-{m:02d}-01"):.0f}px;top:{H+4}px;{s.ty("data","xs","regular","text-muted")}">{n}</div>' for m,n in ((1,"Jan"),(2,"Feb"),(3,"Mar"),(4,"Apr"),(5,"May"),(6,"Jun")))
        head=(f'<div style="display:flex;align-items:center;justify-content:space-between;width:100%"><div style="{s.ty("ui","m","medium")}">Final price per bushel, sized by volume</div>'
              f'<div style="display:flex;align-items:center;gap:var(--space-l)"><div style="display:flex;align-items:center;gap:var(--space-xs)">{s.dot("accent")}<div style="{s.ty("ui","m","regular","text-muted")}">Filled</div></div>'
              f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.dot("warning")}<div style="{s.ty("ui","m","regular","text-muted")}">Open</div></div></div></div>')
        return (f'<div layer-name="Chart" style="display:flex;flex-direction:column;gap:var(--space-m);width:100%">{head}'
                f'<div style="position:relative;width:{W}px;height:{H+22}px;flex-shrink:0">{svg}{ylab}{belab}{months}</div></div>')
    def b_lane(s,i,inner):
        _,w,al=s.LB[i]; wst=f"width:{w}px;flex-shrink:0" if w else "flex:1;min-width:0"
        return f'<div style="display:flex;justify-content:{"flex-end" if al=="r" else "flex-start"};{wst}">{inner}</div>'
    def b_group(s, month):
        rows=[r for r in SALES if D(r[0]).month==month]
        bu=sum(r[3] for r in rows); avg=sum(r[3]*r[7] for r in rows)/bu
        head=(f'<div style="display:flex;align-items:baseline;justify-content:space-between;width:100%;padding:var(--space-s) var(--space-s);box-shadow:inset 0 -1px 0 {s.c("border")}">'
              f'<div style="{s.ty("ui","m","medium")}">{dt.date(2026,month,1).strftime("%B")}</div>'
              f'<div style="{s.ty("data","s","regular","text-muted")}">{bu:,} bu · avg ${avg:.2f}</div></div>')
        out=""
        for d,var,typ,b,fut,bas,prem,fin,st in rows:
            sel = d=="2026-03-18"
            num=lambda v,w="regular",c="text": f'<div style="{s.ty("data","m",w,c)}">{v}</div>'
            txt=lambda v,c="text": f'<div style="{s.ty("ui","m","regular",c)}">{v}</div>'
            cells=[num(D(d).strftime("%d"),"regular","text-muted"),txt(var),txt(typ,"text-secondary"),num(f"{b:,}"),num(f"${fin:.2f}","medium"),num(sgn(fin-BE),"regular","success"),s.status(st)]
            out+=(f'<div layer-name="Sale / {d}" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-s) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if sel else "transparent"}">'
                  +"".join(s.b_lane(i,c) for i,c in enumerate(cells))+'</div>')
        return f'<div layer-name="{dt.date(2026,month,1).strftime("%B")}" style="display:flex;flex-direction:column;width:100%">{head}{out}</div>'
    def b_inspector(s):
        def kv(k,v,color="text",font="data"):
            return (f'<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-s) 0;box-shadow:inset 0 -1px 0 {s.c("border")}">'
                    f'<div style="{s.ty("ui","m","regular","text-muted")}">{k}</div><div style="{s.ty(font,"m","regular",color)}">{v}</div></div>')
        rows=(kv("Variety","Corn",font="ui")+kv("Type","Cash",font="ui")+kv("Futures","4.55")+kv("Basis","+0.15")+kv("Premium","+0.10")
              +kv("Final price","$4.80")+kv("vs break-even","+0.37","success")+kv("Sale value","$384,000"))
        st=(f'<div style="display:flex;justify-content:space-between;align-items:center;padding:var(--space-s) 0"><div style="{s.ty("ui","m","regular","text-muted")}">Status</div>{s.status("Open")}</div>')
        return (f'<div layer-name="Inspector" style="display:flex;flex-direction:column;gap:var(--space-l);width:380px;flex-shrink:0;padding:var(--space-l);border-radius:var(--radius-l);background:{s.c("bg-surface")}">'
                f'<div style="display:flex;align-items:center;justify-content:space-between"><div style="{s.ty("ui","m","regular","text-muted")}">Sale on March 18</div>{s.btn("","ghost","rest","x",True)}</div>'
                f'<div style="display:flex;align-items:baseline;gap:var(--space-xs)"><div style="{s.ty("brand","xl","heavy")}">80,000</div><div style="{s.ty("brand","l","medium","text-muted")}">bu</div></div>'
                f'<div style="display:flex;flex-direction:column">{rows}{st}</div>'
                f'<div style="display:flex;gap:var(--space-xs)"><div style="display:flex;flex:1">{s.btn("Edit sale","outline","rest","pencil")}</div>{s.btn("Mark as filled","primary","rest","check")}</div></div>')

def board(name, x, y, direction="row"):
    r=call("create_artboard", pageId="p-1-0", name=name, styles={"width":"1440px","height":"900px","display":"flex","flexDirection":direction,
        "backgroundColor":"var(--dark-bg-canvas)","fontFamily":"var(--font-ui)","overflow":"hidden"})
    ab=r[-1]["id"]; call("update_styles", updates=[{"nodeIds":[ab],"styles":{"left":f"{x}px","top":f"{y}px"}}]); return ab
def W(t,h,name=None):
    n=write(t,h); return n[0]["id"]

def build_a(x,y):
    s=S("dark"); ab=board("Beam · Corn marketing · A · Ledger",x,y)
    W(ab, s.a_rail())
    main=W(ab, '<div layer-name="Main" style="display:flex;flex-direction:column;flex:1;min-width:0;height:100%"></div>')
    W(main, s.a_topbar())
    content=W(main, '<div layer-name="Content" style="display:flex;flex-direction:column;gap:var(--space-xl);width:100%;padding:var(--space-xl) var(--space-xxl) 0 var(--space-xl)"></div>')
    W(content, s.a_header()); W(content, s.a_position())
    sales=W(content, '<div layer-name="Sales" style="display:flex;flex-direction:column;width:100%;padding-top:var(--space-s)"></div>')
    W(sales, s.a_sales_head())
    for r in SALES[:12]:
        W(sales, s.a_edit_row(r) if r[0]=="2026-03-18" else s.a_row(r))
    return ab
def build_b(x,y):
    s=S("dark"); ab=board("Beam · Corn marketing · B · Field view",x,y,"column")
    W(ab, s.b_hero())
    body=W(ab, '<div layer-name="Body" style="display:flex;gap:var(--space-xl);width:100%;padding:0 var(--space-xxl)"></div>')
    main=W(body, '<div layer-name="Main" style="display:flex;flex-direction:column;gap:var(--space-l);flex:1;min-width:0"></div>')
    tools=f'<div style="display:flex;align-items:center;gap:var(--space-xs);padding-bottom:var(--space-xs)">{s.variety_toggle()}{s.btn("Filter","ghost","rest","filter")}{s.btn("Add sale","primary","rest","plus")}</div>'
    W(main, s.tabs_row(tools)); W(main, s.b_chart())
    lst=W(main, '<div layer-name="Sales by month" style="display:flex;flex-direction:column;gap:var(--space-s);width:100%"></div>')
    for m in (6,5,4,3): W(lst, s.b_group(m))
    W(body, s.b_inspector())
    return ab
if __name__=="__main__":
    which=sys.argv[1]
    if which in ("a","both"): print("A", build_a(800,3562))
    if which in ("b","both"): print("B", build_b(2320,3562))
