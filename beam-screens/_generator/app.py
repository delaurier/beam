import sys, os, subprocess
from screens import S, SALES, BE, D, sgn

class A(S):
    ICONS=S.ICONS+[("chevron-right",'<path d="m9 18 6-6-6-6"/>')]
    def p(s, n): return f"var(--color-{n})"
    # ---------- shell ----------
    def rail(s, active):
        def item(icon,label):
            a = label==active; col="text" if a else "text-muted"
            return (f'<div layer-name="Nav / {label}" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-xxs);width:100%;padding:var(--space-s) 0;border-radius:var(--radius-m);'
                    f'background:{s.c("bg-highlight") if a else "transparent"}">{s.icon(icon,20,col)}<div style="{s.ty("ui","s","medium" if a else "regular",col)}">{label}</div></div>')
        return (f'<div layer-name="Rail" style="display:flex;flex-direction:column;align-items:center;gap:var(--space-xxs);width:84px;flex-shrink:0;height:100%;padding:var(--space-l) var(--space-s);box-shadow:inset -1px 0 0 {s.c("border")}">'
                f'<div style="display:flex;padding-bottom:var(--space-l)">{s.mark(26)}</div>'
                f'{item("layout","Overview")}{item("sprout","Crops")}{item("map-pin","Land")}{item("wrench","Machinery")}{item("dollar","Finance")}{item("file","Reports")}'
                f'<div style="flex:1"></div>{item("sliders","Settings")}<div style="display:flex;padding-top:var(--space-s)">{s.avatar()}</div></div>')
    def tabs(s, items, sel, right=""):
        tr=lambda t: f'<div style="padding:var(--space-xs) 0;{s.ty("ui","m","regular","text-selected" if t==sel else "text-subtle")}">{t}</div>'
        return (f'<div layer-name="Tabs" style="display:flex;align-items:center;justify-content:space-between;width:100%;box-shadow:inset 0 -1px 0 {s.c("border")}">'
                f'<div style="display:flex;gap:var(--space-l)">{"".join(tr(t) for t in items)}</div>{right}</div>')
    def header(s, title, tabs, sel, meta="", right="", switch=False):
        t=(f'<div layer-name="Title" style="display:flex;align-items:center;gap:var(--space-s)"><div style="{s.ty("brand","xl","heavy")}">{title}</div>'
           +(s.btn("","ghost","rest","chevron-down",True) if switch else "")
           +(f'<div style="padding-left:var(--space-s);{s.ty("ui","m","regular","text-muted")}">{meta}</div>' if meta else "")+'</div>')
        return (f'<div layer-name="Header" style="display:flex;flex-direction:column;gap:var(--space-m);width:100%">'
                f'<div style="display:flex;align-items:center;justify-content:space-between;min-height:35px">{t}<div style="display:flex;align-items:center;gap:var(--space-xs)">{right}</div></div>{s.tabs(tabs,sel)}</div>')
    def toggle(s, items, sel):
        tg=lambda t: (f'<div style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if t==sel else "transparent"};{s.ty("ui","m","medium")}">{t}</div>')
        return f'<div layer-name="Toggle" style="display:flex;gap:var(--space-xxs)">{"".join(tg(t) for t in items)}</div>'
    # ---------- summary ----------
    def headline(s, big, rest): 
        return (f'<div style="display:flex;align-items:baseline;gap:var(--space-s)"><div style="{s.ty("brand","xxl","heavy")}">{big}</div><div style="{s.ty("brand","l","medium","text-muted")}">{rest}</div></div>')
    def segbar(s, segs, gap=False):
        g="gap:var(--space-xxs);" if gap else ""
        inner="".join(f'<div style="flex:{f};{"border-radius:var(--radius-full);" if gap else ""}background:{c}"></div>' for f,c in segs)
        return (f'<div layer-name="Bar" style="display:flex;{g}width:100%;height:var(--space-m);border-radius:var(--radius-full);overflow:hidden;background:{"transparent" if gap else s.c("bg-surface-muted")}">{inner}</div>')
    def cdot(s, color): return f'<div style="width:var(--space-xs);height:var(--space-xs);flex-shrink:0;border-radius:var(--radius-full);background:{color}"></div>'
    def legend(s, items):
        return ('<div style="display:flex;gap:var(--space-xl)">'+"".join(
            f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.cdot(c)}<div style="{s.ty("ui","m","regular","text-muted")}">{t}</div><div style="{s.ty("data","m","medium")}">{v}</div></div>' for c,t,v in items)+'</div>')
    def stat(s, label, value, unit="", color="text", ctrl=False):
        lab=(f'<div style="display:flex;align-items:center;gap:var(--space-xxs)"><div style="{s.ty("ui","m","regular","text-muted")}">{label}</div>{s.icon("chevron-down",14,"text-muted") if ctrl else ""}</div>')
        return (f'<div layer-name="Stat / {label}" style="display:flex;flex-direction:column;flex-shrink:0;gap:var(--space-xs);padding:0 var(--space-xl) 0 var(--space-l);box-shadow:inset 1px 0 0 {s.c("border")}">{lab}'
                f'<div style="display:flex;align-items:baseline;gap:var(--space-xxs)"><div style="{s.ty("brand","xl","heavy",color)}">{value}</div><div style="{s.ty("ui","m","regular","text-muted")}">{unit}</div></div></div>')
    def summary(s, head, bar, legend, stats):
        left=f'<div layer-name="Lead" style="display:flex;flex-direction:column;flex:1;min-width:0;gap:var(--space-m)">{head}{bar}{legend}</div>'
        right=f'<div layer-name="Stats" style="display:flex;flex-shrink:0;align-items:flex-end">{"".join(stats)}</div>' if stats else ""
        return f'<div layer-name="Summary" style="display:flex;align-items:flex-end;gap:var(--space-xxl);width:100%">{left}{right}</div>'
    # ---------- table ----------
    def cell(s, lane, inner):
        _,w,al=lane; wst=f"width:{w}px;flex-shrink:0" if w else "flex:1;min-width:0"
        return f'<div style="display:flex;align-items:center;justify-content:{"flex-end" if al=="r" else "flex-start"};{wst}">{inner}</div>'
    def row(s, lanes, cells, name, pad="s", bg="transparent"):
        return (f'<div layer-name="{name}" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-{pad}) 0;background:{bg};box-shadow:inset 0 -1px 0 {s.c("border")}">'
                +"".join(s.cell(l,c) for l,c in zip(lanes,cells))+'</div>')
    def thead(s, lanes):
        return s.row(lanes,[f'<div style="{s.ty("ui","s","medium","text-muted")}">{n}</div>' for n,_,_ in lanes],"Columns")
    def num(s, v, w="regular", c="text"): return f'<div style="{s.ty("data","m",w,c)}">{v}</div>'
    def txt(s, v, c="text", w="regular"): return f'<div style="{s.ty("ui","m",w,c)}">{v}</div>'
    def inp(s, v, font="data", focus=False, chev=False, right=True, placeholder=False):
        edge=s.ring() if focus else f"0 0 0 1px {s.c('border-subtle')}"
        return (f'<div layer-name="Input" style="display:flex;align-items:center;gap:var(--space-xxs);width:100%;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:{edge}">'
                f'<div style="flex:1;white-space:nowrap;text-align:{"right" if right else "left"};{s.ty(font,"m","regular","text-subtle" if placeholder else "text")}">{v}</div>{s.icon("chevron-down",16,"text-muted") if chev else ""}</div>')
    def savecancel(s): return f'<div style="display:flex;gap:var(--space-xxs)">{s.btn("","primary","rest","check",True)}{s.btn("","ghost","rest","x",True)}</div>'
    def tools(s, title, count, right):
        return (f'<div layer-name="Tools" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding-bottom:var(--space-xs)"><div style="display:flex;align-items:baseline;gap:var(--space-xs)">'
                f'<div style="{s.ty("brand","l","medium")}">{title}</div><div style="{s.ty("brand","l","medium","text-subtle")}">{count}</div></div>'
                f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{right}</div></div>')
    def sharebar(s, pct, mx, color):
        return (f'<div style="display:flex;align-items:center;gap:var(--space-s)"><div style="display:flex;width:64px;height:var(--space-xs);border-radius:var(--radius-full);overflow:hidden;background:{s.c("bg-surface-muted")}">'
                f'<div style="flex:{pct};border-radius:var(--radius-full);background:{color}"></div><div style="flex:{max(mx-pct,0.01):.2f}"></div></div><div style="width:44px;text-align:right;{s.ty("data","m","regular","text-muted")}">{pct:.1f}%</div></div>')
    def chev(s, open_): return s.icon("chevron-down" if open_ else "chevron-right",16,"text-muted")
    def dotlabel(s, color, label, c="text"): return f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.cdot(color)}<div style="{s.ty("ui","m","regular",c)}">{label}</div></div>'

    # ================= screens: each returns (active, [content parts], table_head or None, [rows], height) =================
    def marketing(s):
        hd=s.header("Corn",["Budget","Marketing","Inputs"],"Marketing","3,580 acres · 223.3 bu/ac expected",s.toggle(["All corn","Corn","Non-GMO"],"All corn"),True)
        sm=s.summary(s.headline("89.2%","of 800k bu sold"),
            s.segbar([(713,s.c("accent")),(20.6,s.c("accent-muted")),(66.4,"transparent")]),
            s.legend([(s.c("accent"),"Contracted","713k bu"),(s.c("accent-muted"),"Projected","91.7%"),(s.c("bg-track"),"Unsold","86.1k bu")]),
            [s.stat("Average price","$4.77","/bu"),s.stat("Break-even, expected","$4.43","/bu",ctrl=True),s.stat("Margin","+$0.34","/bu","success"),s.stat("Revenue","$3.41M")])
        L=[("Date",84,"l"),("Variety",None,"l"),("Type",96,"l"),("Bushels",96,"r"),("Futures",80,"r"),("Basis",80,"r"),("Premium",80,"r"),("Final",88,"r"),("vs break-even",110,"r"),("Status",104,"l"),("",62,"r")]
        tl=s.tools("Sales","15",s.btn("Filter","ghost","rest","filter")+s.btn("Columns","ghost","rest","sliders")+s.btn("Firm offers","outline")+s.btn("Add sale","primary","rest","plus"))
        rows=[]
        for d,var,typ,bu,fut,bas,prem,fin,st in SALES[:12]:
            if d=="2026-03-18":
                cells=[s.inp(D(d).strftime("%b %d"),right=False),s.inp(var,"ui",chev=True,right=False),s.inp(typ,"ui",chev=True,right=False),s.inp(f"{bu:,}",focus=True),s.inp(f"{fut:.2f}"),s.inp(sgn(bas)),s.inp(sgn(prem)),
                       s.num(f"${fin:.2f}","medium"),s.num(sgn(fin-BE),"regular","success"),s.inp(st,"ui",chev=True,right=False),s.savecancel()]
                rows.append(s.row(L,cells,f"Sale / {d} / editing","xxs"))
            else:
                z=lambda v: "text-muted" if v==0 else "text"
                cells=[s.num(D(d).strftime("%b %d"),"regular","text-muted"),s.txt(var),s.txt(typ),s.num(f"{bu:,}"),s.num(f"{fut:.2f}"),s.num(sgn(bas),"regular",z(bas)),s.num(sgn(prem),"regular",z(prem)),
                       s.num(f"${fin:.2f}","medium"),s.num(sgn(fin-BE),"regular","success"),s.status(st),""]
                rows.append(s.row(L,cells,f"Sale / {d}"))
        return dict(key="corn-marketing",name="Beam · Crops · Corn marketing",active="Crops",parts=[hd,sm],table="Sales",thead=tl+s.thead(L),rows=rows,height=900)

    def budget(s):
        cats=[("General expenses","7 items",493.21,2.24,109.6,591852,49.5,s.p(1)),("Nutrients","6 items",185.00,0.84,41.1,222000,18.6,s.p(3)),
              ("Field operations","9 items",163.79,0.74,36.4,196548,16.4,s.p(4)),("Chemicals","1 group, 3 items",99.00,0.45,22.0,118800,9.9,s.p(2)),("Grain handling","6 items",55.00,0.25,12.2,66000,5.5,s.c("border-strong"))]
        items=[("Land rent",311.26,1.41,69.2,373512,31.3,"Average from 11 fields"),("Seed",120.00,0.55,26.7,144000,12.0,""),("Crop insurance premium",21.00,0.10,4.7,25200,2.1,""),
               ("Operating interest",18.00,0.08,4.0,21600,1.8,""),("Farm insurance allocation",12.00,0.05,2.7,14400,1.2,""),("Property tax",6.50,0.03,1.4,7800,0.7,""),("Return to management",4.45,0.02,1.0,5340,0.4,"Allocated")]
        hd=s.header("Corn",["Budget","Marketing","Inputs"],"Budget","1,200 acres · 220 bu/ac expected",s.toggle(["Corn","Non-GMO","Soybeans"],"Corn"),True)
        sm=s.summary(s.headline("$996","per acre to grow"),
            s.segbar([(c[2],c[7]) for c in cats],gap=True),
            s.legend([(c[7],c[0].replace(" expenses",""),f"{c[2]:,.0f}") for c in cats]),
            [s.stat("Cost per bushel","$4.52","/bu"),s.stat("To cover at $4.50","221.3","bu/ac"),s.stat("Total","$1.20M")])
        L=[("",16,"l"),("Expense",None,"l"),("Per acre",96,"r"),("Per bushel",88,"r"),("Bu to cover",96,"r"),("Total",110,"r"),("Share of budget",118,"l"),("Notes",190,"l"),("",62,"r")]
        tl=s.tools("Expenses","5 categories",s.btn("Columns","ghost","rest","sliders")+s.btn("Add category","outline")+s.btn("Add expense","primary","rest","plus"))
        def cat(c, open_):
            n,cnt,ac,bu,cov,tot,sh,col=c
            name=f'<div style="display:flex;align-items:baseline;gap:var(--space-s)">{s.txt(n,"text","medium")}{s.txt(cnt,"text-subtle")}</div>'
            return s.row(L,[s.chev(open_),name,s.num(f"${ac:,.2f}","medium"),s.num(f"${bu:.2f}","medium"),s.num(f"{cov:.1f}","medium"),s.num(f"${tot:,}","medium"),s.sharebar(sh,49.5,col),"",""],f"Category / {n}")
        rows=[cat(cats[0],True)]
        for n,ac,bu,cov,tot,sh,note in items:
            if n=="Seed":
                rows.append(s.row(L,["",s.inp(n,"ui",right=False),s.inp(f"{ac:.2f}",focus=True),s.num(f"${bu:.2f}","regular","text-muted"),s.num(f"{cov:.1f}","regular","text-muted"),s.num(f"${tot:,}","regular","text-muted"),
                                     s.sharebar(sh,49.5,s.c("text-subtle")),s.inp("Add a note","ui",right=False,placeholder=True),s.savecancel()],f"Item / {n} / editing","xxs"))
            else:
                rows.append(s.row(L,["",s.txt(n),s.num(f"${ac:,.2f}"),s.num(f"${bu:.2f}"),s.num(f"{cov:.1f}"),s.num(f"${tot:,}"),s.sharebar(sh,49.5,s.c("text-subtle")),s.txt(note,"text-muted"),""],f"Item / {n}"))
        rows+=[cat(c,False) for c in cats[1:]]
        return dict(key="corn-budget",name="Beam · Crops · Corn budget",active="Crops",parts=[hd,sm],table="Expenses",thead=tl+s.thead(L),rows=rows,height=900)

    def machinery(s):
        groups=[("Power units","11",2869000,286900,s.p(1)),("Implements","14",1038000,103800,s.p(3)),("Other equipment","10",1485000,148500,s.c("border-strong"))]
        units=[("Case IH 4450 Sprayer 1","2025",375000),("Case IH 4450 Sprayer 2","",375000),("Freightliner Tender Truck","",55000),("John Deere 6R 250","",160000),("John Deere 8R 280","",190000),("John Deere 8R 340","",250000),
               ("John Deere 8R 410","",330000),("John Deere 9R 540","",360000),("John Deere S780 Combine","",410000),("Kenworth T880","",185000),("Peterbilt 389","",179000)]
        hd=s.header("Machinery",["Fleet","Operations","Loans","Capex planning"],"Fleet")
        sm=s.summary(s.headline("$5.39M","across 35 pieces"),
            s.segbar([(g[2],g[4]) for g in groups],gap=True),
            s.legend([(g[4],g[0],f"${g[2]/1e6:.2f}M") for g in groups]),
            [s.stat("Annual depreciation","$539,200"),s.stat("Typical useful life","10","years")])
        L=[("",16,"l"),("Equipment",None,"l"),("Year",80,"l"),("Ownership",110,"l"),("Value",120,"r"),("Useful life",100,"r"),("Annual cost",120,"r"),("Share of fleet",118,"l"),("",62,"r")]
        tl=s.tools("Fleet","35 pieces",s.btn("Filter","ghost","rest","filter")+s.btn("Columns","ghost","rest","sliders")+s.btn("Add equipment","primary","rest","plus"))
        def grp(g, open_):
            n,cnt,val,ann,col=g
            name=f'<div style="display:flex;align-items:baseline;gap:var(--space-s)">{s.txt(n,"text","medium")}{s.txt(cnt,"text-subtle")}</div>'
            return s.row(L,[s.chev(open_),name,"","",s.num(f"${val:,}","medium"),"",s.num(f"${ann:,}","medium"),s.sharebar(val/5392000*100,53.2,col),""],f"Group / {n}")
        rows=[grp(groups[0],True)]
        for n,yr,val in units:
            if n=="John Deere 8R 280":
                rows.append(s.row(L,["",s.inp(n,"ui",right=False),s.inp("Year","data",focus=True,right=False,placeholder=True),s.inp("Owned","ui",chev=True,right=False),s.inp(f"{val:,}"),s.inp("10"),
                                     s.num(f"${val//10:,}","regular","text-muted"),s.sharebar(val/5392000*100,53.2,s.c("text-subtle")),s.savecancel()],f"Unit / {n} / editing","xxs"))
            else:
                rows.append(s.row(L,["",s.txt(n),s.num(yr) if yr else s.num("—","regular","text-subtle"),s.txt("Owned","text-secondary"),s.num(f"${val:,}"),s.num("10 yr"),s.num(f"${val//10:,}"),
                                     s.sharebar(val/5392000*100,53.2,s.c("text-subtle")),""],f"Unit / {n}"))
        rows+=[grp(g,False) for g in groups[1:]]
        return dict(key="machinery-fleet",name="Beam · Machinery · Fleet",active="Machinery",parts=[hd,sm],table="Fleet",thead=tl+s.thead(L),rows=rows,height=1010)

    def land(s):
        CR={"Non-GMO Corn":s.p(4),"Corn":s.p(1),"Soybeans":s.p(2)}
        fields=[("Sam's Dysart 160",160,"Non-GMO Corn","Crop share",252.68),("Mack's East 160",160,"Soybeans","Crop share",307.75),("North 80",80,"Non-GMO Corn","Crop share",308.11),
                ("South 80",80,"Soybeans","Cash rent",279.00),("South 40",40,"Non-GMO Corn","Crop share",415.28),("Home South",215,"Non-GMO Corn","Cash rent",282.00),
                ("Alissa's North",350,"Soybeans","Crop share",0.0),("Home West",450,"Non-GMO Corn","Cash rent",279.00),("Miller Quarter",160,"Corn","Cash rent",295.00),
                ("River Bottom",120,"Soybeans","Crop share",264.40),("Dysart West",240,"Corn","Cash rent",301.00)]
        hd=s.header("Land",["Fields","Map","Profitability"],"Fields")
        sm=s.summary(s.headline("4,725 acres","in 20 fields"),
            s.segbar([(2380,CR["Non-GMO Corn"]),(1200,CR["Corn"]),(1145,CR["Soybeans"])],gap=True),
            s.legend([(CR["Non-GMO Corn"],"Non-GMO corn","2,380 ac"),(CR["Corn"],"Corn","1,200 ac"),(CR["Soybeans"],"Soybeans","1,145 ac")]),
            [s.stat("Average land cost","$298.38","/ac"),s.stat("Fields without a crop","0"),s.stat("Missing a land cost","1","field","warning")])
        L=[("Field",None,"l"),("Acres",80,"r"),("Crop",170,"l"),("Land type",130,"l"),("Land cost per acre",150,"r"),("Map",110,"l"),("",62,"r")]
        search=(f'<div layer-name="Search" style="display:flex;align-items:center;gap:var(--space-xs);width:240px;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}">'
                f'{s.icon("search",16,"text-muted")}<div style="flex:1;{s.ty("ui","m","regular","text-subtle")}">Search fields</div></div>')
        tl=s.tools("Fields","20",search+s.btn("All crops","outline","rest","chevron-down",trailing=True)+s.btn("All land types","outline","rest","chevron-down",trailing=True)+s.btn("Import","ghost")+s.btn("Add field","primary","rest","plus"))
        rows=[]
        for n,ac,crop,lt,cost in fields:
            if n=="South 80":
                rows.append(s.row(L,[s.inp(n,"ui",right=False),s.inp(str(ac)),s.inp(crop,"ui",chev=True,right=False),s.inp(lt,"ui",chev=True,right=False),s.inp(f"{cost:.2f}",focus=True),
                                     s.dotlabel(s.c("success"),"Mapped","text-secondary"),s.savecancel()],f"Field / {n} / editing","xxs"))
            else:
                c=s.dotlabel(s.c("warning"),"Add a cost") if cost==0 else s.num(f"${cost:.2f}")
                rows.append(s.row(L,[s.txt(n),s.num(f"{ac:,}"),s.dotlabel(CR[crop],crop),s.txt(lt,"text-secondary"),c,s.dotlabel(s.c("success"),"Mapped","text-secondary"),s.icon("chevron-right",16,"text-muted")],f"Field / {n}"))
        return dict(key="land-fields",name="Beam · Land · Fields",active="Land",parts=[hd,sm],table="Fields",thead=tl+s.thead(L),rows=rows,height=900)

    def gauge(s, lo, hi, val, zlo, zhi, color, lab_lo, lab_hi, W=400):
        X=lambda v: (v-lo)/(hi-lo)*W
        tick=X(zlo if zlo>lo else zhi)
        return (f'<div layer-name="Gauge" style="position:relative;width:{W}px;height:38px;flex-shrink:0">'
                f'<div style="position:absolute;left:0;top:8px;width:{W}px;height:var(--space-xs);border-radius:var(--radius-full);background:{s.c("bg-surface-muted")}"></div>'
                f'<div style="position:absolute;left:{X(zlo):.0f}px;top:8px;width:{X(zhi)-X(zlo):.0f}px;height:var(--space-xs);border-radius:var(--radius-full);background:{s.c("success-muted")}"></div>'
                f'<div style="position:absolute;left:{tick:.0f}px;top:3px;width:var(--border-s);height:var(--space-l);background:{s.c("success")}"></div>'
                f'<div style="position:absolute;left:{X(val)-5.5:.0f}px;top:6px;width:var(--space-m);height:var(--space-m);border-radius:var(--radius-full);background:{s.c(color)};box-shadow:0 0 0 3px {s.c("bg-canvas")}"></div>'
                f'<div style="position:absolute;left:0;top:24px;{s.ty("data","xs","regular","text-subtle")}">{lab_lo}</div>'
                f'<div style="position:absolute;right:0;top:24px;{s.ty("data","xs","regular","text-subtle")}">{lab_hi}</div></div>')
    def finance(s):
        R=[("Debt-to-equity","Total liabilities ÷ net worth","2.22",(0,3,2.22,0,0.43),"0.43 or below","1.79 over","Weak","danger","0","3.0"),
           ("Debt-to-asset","Total liabilities ÷ total assets","0.69",(0,1,0.69,0,0.30),"0.30 or below","0.39 over","Weak","danger","0","1.0"),
           ("Equity-to-asset","Net worth ÷ total assets","0.31",(0,1,0.31,0.70,1),"0.70 or above","0.39 under","Weak","danger","0","1.0"),
           ("Current ratio","Current assets ÷ current liabilities","1.04",(0,3,1.04,2.0,3),"2.0 or above","0.96 under","Fair","warning","0","3.0"),
           ("Working capital","Current assets − current liabilities","$388,446",(-500000,1000000,388446,0,1000000),"Above zero","Met","Strong","success","−$500k","$1M")]
        hd=s.header("Balance sheet",["Summary","Basic","Advanced","Financial health"],"Financial health","",s.btn("Banking and LOC","outline")+s.btn("Save ratios","outline"))
        seg=("<div layer-name='Index' style='display:flex;gap:var(--space-xs);width:100%'>"+"".join(
            f'<div style="display:flex;flex-direction:column;flex:1;gap:var(--space-s)"><div style="height:var(--space-m);border-radius:var(--radius-full);background:{s.c(r[7])}"></div>'
            f'<div style="display:flex;align-items:baseline;gap:var(--space-xs)"><div style="{s.ty("ui","m","medium")}">{r[0]}</div><div style="{s.ty("ui","m","regular","text-muted")}">{r[6]}</div></div></div>' for r in R)+"</div>")
        sm=(f'<div layer-name="Summary" style="display:flex;flex-direction:column;gap:var(--space-m);width:100%">{s.headline("3 of 5","ratios are weak, all three from debt")}{seg}</div>')
        L=[("Ratio",None,"l"),("Now",150,"r"),("Against the healthy range",400,"l"),("Healthy",140,"l"),("Gap",110,"r"),("Status",90,"l")]
        rows=[]
        for n,f,v,g,target,gap,st,col,ll,lh in R:
            name=f'<div style="display:flex;flex-direction:column">{s.txt(n,"text","medium")}{s.txt(f,"text-muted")}</div>'
            rows.append(s.row(L,[name,f'<div style="{s.ty("brand","l","medium")}">{v}</div>',s.gauge(*g,col,ll,lh),s.txt(target,"text-secondary"),
                                 s.num(gap,"regular","text-muted" if gap=="Met" else "text"),s.dotlabel(s.c(col),st)],f"Ratio / {n}","l"))
        return dict(key="finance-health",name="Beam · Finance · Financial health",active="Finance",parts=[hd,sm],table="Ratios",thead=s.thead(L),rows=rows,height=900)

    def assemble(s, sc, rows=True):
        table=(f'<div layer-name="{sc["table"]}" style="display:flex;flex-direction:column;width:100%;padding-top:var(--space-s)">{sc["thead"]}{"".join(sc["rows"]) if rows else ""}</div>')
        main=(f'<div layer-name="Main" style="display:flex;flex-direction:column;flex:1;min-width:0;height:100%">{s.a_topbar()}'
              f'<div layer-name="Content" style="display:flex;flex-direction:column;gap:var(--space-xl);width:100%;padding:var(--space-xl) var(--space-xxl) 0 var(--space-xl)">{"".join(sc["parts"])}{table}</div></div>')
        return s.rail(sc["active"])+main

SCREENS=["marketing","budget","machinery","land","finance"]
OUT="/Users/pauldelaurier/Documents/CLAUDE CODE/BEAM/beam-screens"
def local(names, tall=False):
    import local as LC
    a=A("dark")
    for n in names:
        sc=getattr(a,n)(); h=1300 if tall else sc["height"]
        body=(f'<div style="display:flex;width:1440px;height:{h}px;overflow:hidden;background:var(--dark-bg-canvas);font-family:var(--font-ui)">{a.assemble(sc)}</div>')
        hp=os.path.join(OUT,sc["key"]+".html"); open(hp,"w").write(LC.page(body,sc["name"]))
        pp=os.path.join(OUT,sc["key"]+".png"); LC.shoot(hp,pp,1440,h,2); print(pp, len(body))
def push(names, x0, y0, cols=3):
    from pmcp import call
    a=A("dark"); out={}
    for i,n in enumerate(names):
        sc=getattr(a,n)(); x=x0+(i%cols)*1520; y=y0+(i//cols)*1120
        ab=call("create_artboard", pageId="p-1-0", name=sc["name"], styles={"width":"1440px","height":f'{sc["height"]}px',"display":"flex","flexDirection":"row",
            "backgroundColor":"var(--dark-bg-canvas)","fontFamily":"var(--font-ui)","overflow":"hidden","left":f"{x}px","top":f"{y}px"})[-1]["id"]
        r=call("write_html", targetNodeId=ab, mode="insert-children", html=a.assemble(sc, rows=False))[-1]["createdNodes"]
        tid=[c["id"] for c in r if c["name"]==sc["table"] and c["component"]=="Frame"][0]
        rows=sc["rows"]; k=6
        for j in range(0,len(rows),k): call("write_html", targetNodeId=tid, mode="insert-children", html="".join(rows[j:j+k]))
        out[n]=ab; print(n, ab, x, y, flush=True)
    return out
if __name__=="__main__":
    cmd=sys.argv[1]; names=sys.argv[2:] or SCREENS
    if cmd=="local": local(names)
    if cmd=="tall": local(names, True)
