import sys, os
from app import A
from screens import SALES, BE, D, sgn

NAV=[("Overview","layout",[],None),("Crops","sprout",["Corn","Soybeans"],None),("Land","map-pin",["Fields","Map","Profitability"],None),
     ("Machinery","wrench",["Fleet","Operations","Loans","Capex planning"],None),("Finance","dollar",["Balance sheet","Banking and LOC","Planning"],None),("Reports","file",[],None)]

class CF(A):
    ICONS=A.ICONS+[("help",'<circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>'),
                   ("panel",'<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M9 3v18"/>'),
                   ("printer",'<path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect x="6" y="14" width="12" height="8" rx="1"/>'),
                   ("download",'<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>')]
    def hair(s, side="bottom"):
        return {"bottom":f"inset 0 -1px 0 {s.c('border')}","right":f"inset -1px 0 0 {s.c('border')}","all":f"inset 0 0 0 1px {s.c('border')}"}[side]
    # ---------- shell ----------
    def sidebar(s, group, sub):
        # Theme "Navigation menu": list gap xxs; trigger = medium, link = regular; both radius s, padding xs/s, fg neutral-10; selected link bg neutral-3
        def trigger(label, icon, open_):
            return (f'<div layer-name="Nav trigger / {label}" style="display:flex;align-items:center;gap:var(--space-xs);width:100%;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s)">'
                    f'{s.icon(icon,16,"text")}<div style="flex:1;{s.ty("ui","m","medium")}">{label}</div>{s.icon("chevron-down" if open_ else "chevron-right",16,"text-muted")}</div>')
        def link(label, icon=None, selected=False, indent=False):
            pad="var(--space-xs) var(--space-s) var(--space-xs) var(--space-xxl)" if indent else "var(--space-xs) var(--space-s)"
            return (f'<div layer-name="Nav link / {label}" style="display:flex;align-items:center;gap:var(--space-xs);width:100%;padding:{pad};border-radius:var(--radius-s);'
                    f'background:{"var(--navigation-active-background)" if selected else "transparent"}">{s.navicon(icon,selected) if icon else ""}<div style="flex:1;{s.navty(selected)}">{label}</div></div>')
        nav=""
        for label,icon,kids,_ in NAV:
            a = label==group
            if kids:
                nav+=trigger(label,icon,a)
                if a: nav+="".join(link(k,None,k==sub,True) for k in kids)
            else: nav+=link(label,icon,a)
        account=(f'<div layer-name="Account" style="display:flex;align-items:center;gap:var(--space-s);width:100%;padding:var(--space-xs) var(--space-s)">{s.mark(22)}'
                 f'<div style="flex:1;{s.ty("ui","m","medium")}">Sample Farm</div>{s.icon("updown",16,"text-muted")}</div>')
        search=(f'<div layer-name="Quick search" style="display:flex;align-items:center;gap:var(--space-xs);width:100%;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}">'
                f'{s.icon("search",16,"text-muted")}<div style="flex:1;{s.ty("ui","m","regular","text-subtle")}">Quick search</div><div style="{s.ty("data","xs","regular","text-muted")}">⌘K</div></div>')
        return (f'<div layer-name="Sidebar" style="display:flex;flex-direction:column;gap:var(--space-m);width:248px;flex-shrink:0;height:100%;padding:var(--space-m);box-shadow:{s.hair("right")}">'
                f'{account}{search}<div layer-name="Navigation menu" style="display:flex;flex-direction:column;gap:var(--space-xxs);width:100%">{nav}</div><div style="flex:1"></div>'
                f'<div style="display:flex;flex-direction:column;gap:var(--space-xxs);width:100%;padding-top:var(--space-s);box-shadow:inset 0 1px 0 {s.c("border")}">{link("Settings","sliders")}{link("Collapse","panel")}</div></div>')
    def topbar(s):
        return (f'<div layer-name="Top bar" style="display:flex;align-items:center;justify-content:flex-end;gap:var(--space-xs);width:100%;padding:var(--space-s) var(--space-xxl);box-shadow:{s.hair()}">'
                f'{s.btn("2026 season","ghost","rest","updown",trailing=True)}{s.btn("Add","ghost","rest","plus")}{s.btn("Support","ghost","rest","help")}{s.avatar()}</div>')
    def navty(s, selected):
        t=s.ty("ui","m","regular")
        return t.replace(f"color:{s.c('text')}","color:var(--navigation-active-foreground)") if selected else t
    def navicon(s, icon, selected):
        i=s.icon(icon,16,"text")
        return i.replace(f'stroke="{s.c("text")}"','stroke="var(--navigation-active-foreground)"') if selected else i
    def pagehead(s, title, right="", switch=False, meta=""):
        t=(f'<div style="display:flex;align-items:center;gap:var(--space-s)"><div style="{s.ty("brand","xl","medium")}">{title}</div>{s.btn("","ghost","rest","updown",True) if switch else ""}</div>')
        m=f'<div style="{s.ty("ui","m","regular","text-muted")}">{meta}</div>' if meta else ""
        return (f'<div layer-name="Page header" style="display:flex;align-items:flex-end;justify-content:space-between;width:100%"><div style="display:flex;flex-direction:column;gap:var(--space-xxs)">'
                f'{t}{m}</div><div style="display:flex;align-items:center;gap:var(--space-xs)">{right}</div></div>')
    def segtabs(s, items, sel, right=""):
        # Theme "Toolbar" geometry (radius s, padding xxs, gap xxs; control padding xs/s, medium, pressed bg neutral-3). By request: no group fill, solid edge, unpressed labels muted, for contrast.
        it=lambda t: (f'<div layer-name="Toolbar control / {t}" style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-highlight") if t==sel else "transparent"};{s.ty("ui","m","medium","text" if t==sel else "text-muted")}">{t}</div>')
        seg=(f'<div layer-name="Toolbar" style="display:flex;gap:var(--space-xxs);padding:var(--space-xxs);border-radius:var(--radius-s);box-shadow:inset 0 0 0 1px {s.c("border")}">{"".join(it(t) for t in items)}</div>')
        return f'<div layer-name="View row" style="display:flex;align-items:center;justify-content:space-between;width:100%">{seg}<div style="display:flex;align-items:center;gap:var(--space-xs)">{right}</div></div>'
    # ---------- cards ----------
    def card(s, name, body, title=None, count="", right=""):
        head=""
        if title:
            head=(f'<div layer-name="Card header" style="display:flex;align-items:center;justify-content:space-between;width:100%;padding:var(--space-xs) var(--space-xs) var(--space-xs) var(--space-l);box-shadow:{s.hair()}">'
                  f'<div style="display:flex;align-items:baseline;gap:var(--space-xs);padding:var(--space-xs) 0"><div style="{s.ty("ui","m","medium")}">{title}</div><div style="{s.ty("ui","m","regular","text-subtle")}">{count}</div></div>'
                  f'<div style="display:flex;align-items:center;gap:var(--space-xxs)">{right}</div></div>')
        return (f'<div layer-name="{name}" style="display:flex;flex-direction:column;width:100%;border-radius:var(--radius-m);box-shadow:{s.hair("all")};overflow:hidden">{head}{body}</div>')
    def metric(s, label, value=None, unit="", sub="", extra="", color="text", flex=1, last=False, ctrl=False):
        lab=(f'<div style="display:flex;align-items:center;gap:var(--space-xxs)"><div style="{s.ty("ui","m","regular","text-muted")}">{label}</div>{s.icon("chevron-down",16,"text-muted") if ctrl else ""}</div>')
        v=(f'<div style="display:flex;align-items:baseline;gap:var(--space-xxs)"><div style="{s.ty("brand","l","medium",color)}">{value}</div><div style="{s.ty("ui","m","regular","text-muted")}">{unit}</div></div>') if value is not None else ""
        sb=f'<div style="{s.ty("ui","s","regular","text-subtle")}">{sub}</div>' if sub else ""
        ex=f'<div style="display:flex;flex-direction:column;gap:var(--space-xs);width:100%;padding-top:var(--space-xs)">{extra}</div>' if (extra and value is None) else extra
        return (f'<div layer-name="Metric / {label}" style="display:flex;flex-direction:column;flex:{flex};min-width:0;gap:var(--space-xs);padding:var(--space-l);box-shadow:{"none" if last else s.hair("right")}">{lab}{v}{sb}{ex}</div>')
    def metrics(s, cells): return s.card("Metrics", f'<div style="display:flex;width:100%;align-items:stretch">{"".join(cells)}</div>')
    def spark(s, vals, w=150, h=30, color="accent"):
        lo,hi=min(vals),max(vals); rng=(hi-lo) or 1
        pts=[(i*w/(len(vals)-1), h-3-(v-lo)/rng*(h-6)) for i,v in enumerate(vals)]
        line=" ".join(f"{x:.1f},{y:.1f}" for x,y in pts)
        area=f"0,{h} "+line+f" {w},{h}"
        return (f'<svg layer-name="Sparkline" width="{w}" height="{h}" viewBox="0 0 {w} {h}" fill="none"><polygon points="{area}" fill="{s.c(color+"-muted")}"/>'
                f'<polyline points="{line}" stroke="{s.c(color)}" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"/></svg>')
    def minibar(s, segs, gap=True):
        inner="".join(f'<div style="flex:{f};border-radius:var(--radius-full);background:{c}"></div>' for f,c in segs)
        return f'<div style="display:flex;gap:{"var(--space-xxs)" if gap else "0"};width:100%;height:var(--space-xs);border-radius:var(--radius-full);overflow:hidden">{inner}</div>'
    def dots(s, items):
        return ('<div style="display:flex;gap:var(--space-s)">'+"".join(
            f'<div style="display:flex;align-items:center;gap:var(--space-xs)">{s.cdot(c)}<div style="{s.ty("ui","s","regular","text-muted")}">{t}</div></div>' for c,t in items)+'</div>')
    # ---------- table in card ----------
    def trow(s, lanes, cells, name, pad="s", last=False, bg="transparent", shadow=None):
        sh=shadow or ("none" if last else s.hair())
        return (f'<div layer-name="{name}" style="display:flex;align-items:center;gap:var(--space-l);width:100%;padding:var(--space-{pad}) var(--space-l);background:{bg};box-shadow:{sh}">'
                +"".join(s.cell(l,c) for l,c in zip(lanes,cells))+'</div>')
    def thead(s, lanes): return s.trow(lanes,[f'<div style="{s.ty("ui","s","medium","text-muted")}">{n}</div>' for n,_,_ in lanes],"Columns")

    # ================= screens =================
    def marketing(s):
        chron=sorted(SALES,key=lambda r:r[0]); prices=[r[7] for r in chron]
        cum=[]; t=0
        for r in chron: t+=r[3]*r[7]; cum.append(t)
        hd=s.pagehead("Corn",s.btn("Firm offers","outline")+s.btn("Add sale","primary","rest","plus"),True,"3,580 acres · 223.3 bu/ac expected")
        tabs=s.segtabs(["Budget","Marketing","Inputs"],"Marketing",s.btn("All corn","outline","rest","chevron-down",trailing=True))
        sold=s.minibar([(713,s.c("accent")),(20.6,s.c("accent-muted")),(66.4,s.c("bg-surface-muted"))],gap=False)
        m=s.metrics([s.metric("Sold","89.2%","","713k of 800k bu",sold,flex=1.3),s.metric("Unsold","86.1k","bu","91.7% projected"),
                     s.metric("Average price","$4.77","/bu","",s.spark(prices,130,26)),s.metric("Break-even","$4.43","/bu","Expected yield",ctrl=True),
                     s.metric("Margin","+$0.34","/bu",color="success"),s.metric("Revenue","$3.41M","","",s.spark(cum,130,26),last=True)])
        L=[("Date",78,"l"),("Variety",None,"l"),("Type",76,"l"),("Bushels",80,"r"),("Futures",64,"r"),("Basis",64,"r"),("Premium",72,"r"),("Final",72,"r"),("vs break-even",100,"r"),("Status",96,"l"),("",62,"r")]
        rows=[]
        vis=SALES[:11]
        for i,(d,var,typ,bu,fut,bas,prem,fin,st) in enumerate(vis):
            if d=="2026-03-18":
                cells=[s.inp(D(d).strftime("%b %d"),right=False),s.inp(var,"ui",chev=True,right=False),s.inp(typ,"ui",chev=True,right=False),s.inp(f"{bu:,}",focus=True),s.inp(f"{fut:.2f}"),s.inp(sgn(bas)),s.inp(sgn(prem)),
                       s.num(f"${fin:.2f}","medium"),s.num(sgn(fin-BE),"regular","success"),s.inp(st,"ui",chev=True,right=False),s.savecancel()]
                rows.append(s.trow(L,cells,f"Sale / {d} / editing","xxs"))
            else:
                z=lambda v: "text-subtle" if v==0 else "text"
                cells=[s.num(D(d).strftime("%b %d"),"regular","text-muted"),s.txt(var),s.txt(typ,"text-secondary"),s.num(f"{bu:,}"),s.num(f"{fut:.2f}"),s.num(sgn(bas),"regular",z(bas)),s.num(sgn(prem),"regular",z(prem)),
                       s.num(f"${fin:.2f}","medium"),s.num(sgn(fin-BE),"regular","success"),s.status(st),""]
                rows.append(s.trow(L,cells,f"Sale / {d}"))
        return dict(key="corn-marketing",name="Beam · Crops · Corn marketing",nav=("Crops","Corn"),parts=[hd,tabs,m],table="Sales",count="15",
                    tools=s.btn("Filter","ghost","rest","filter")+s.btn("Columns","ghost","rest","sliders"),thead=s.thead(L),rows=rows,height=900)

    def budget(s):
        cats=[("General expenses","7 items",493.21,2.24,109.6,591852,49.5,s.p(1)),("Nutrients","6 items",185.00,0.84,41.1,222000,18.6,s.p(3)),
              ("Field operations","9 items",163.79,0.74,36.4,196548,16.4,s.p(4)),("Chemicals","1 group, 3 items",99.00,0.45,22.0,118800,9.9,s.p(2)),("Grain handling","6 items",55.00,0.25,12.2,66000,5.5,s.c("border-strong"))]
        items=[("Land rent",311.26,1.41,69.2,373512,31.3,"Average from 11 fields"),("Seed",120.00,0.55,26.7,144000,12.0,""),("Crop insurance premium",21.00,0.10,4.7,25200,2.1,""),
               ("Operating interest",18.00,0.08,4.0,21600,1.8,""),("Farm insurance allocation",12.00,0.05,2.7,14400,1.2,""),("Property tax",6.50,0.03,1.4,7800,0.7,""),("Return to management",4.45,0.02,1.0,5340,0.4,"Allocated")]
        hd=s.pagehead("Corn",s.btn("Add category","outline")+s.btn("Add expense","primary","rest","plus"),True,"1,200 acres · 220 bu/ac expected")
        tabs=s.segtabs(["Budget","Marketing","Inputs"],"Budget",s.btn("Corn","outline","rest","chevron-down",trailing=True))
        split=s.minibar([(c[2],c[7]) for c in cats])+s.dots([(c[7],n) for c,n in zip(cats,["General","Nutrients","Field ops","Chemicals","Grain"])])
        m=s.metrics([s.metric("Cost per acre","$996.00"),s.metric("Cost per bushel","$4.52"),s.metric("Bushels to cover","221.3","/ac","At $4.50 per bushel"),
                     s.metric("Total","$1,195,200"),s.metric("By category",None,extra=split,flex=2.2,last=True)])
        L=[("",16,"l"),("Expense",None,"l"),("Per acre",84,"r"),("Per bushel",80,"r"),("Bu to cover",84,"r"),("Total",92,"r"),("Share of budget",118,"l"),("Notes",160,"l"),("",62,"r")]
        def cat(c, open_, last=False):
            n,cnt,ac,bu,cov,tot,sh,col=c
            name=f'<div style="display:flex;align-items:baseline;gap:var(--space-s)">{s.txt(n,"text","medium")}{s.txt(cnt,"text-subtle")}</div>'
            return s.trow(L,[s.chev(open_),name,s.num(f"${ac:,.2f}","medium"),s.num(f"${bu:.2f}","medium"),s.num(f"{cov:.1f}","medium"),s.num(f"${tot:,}","medium"),s.sharebar(sh,49.5,col),"",""],f"Category / {n}",last=last)
        rows=[cat(cats[0],True)]
        for n,ac,bu,cov,tot,sh,note in items:
            if n=="Seed":
                rows.append(s.trow(L,["",s.inp(n,"ui",right=False),s.inp(f"{ac:.2f}",focus=True),s.num(f"${bu:.2f}","regular","text-muted"),s.num(f"{cov:.1f}","regular","text-muted"),s.num(f"${tot:,}","regular","text-muted"),
                                     s.sharebar(sh,49.5,s.c("text-subtle")),s.inp("Add a note","ui",right=False,placeholder=True),s.savecancel()],f"Item / {n} / editing","xxs"))
            else:
                rows.append(s.trow(L,["",s.txt(n,"text-secondary"),s.num(f"${ac:,.2f}"),s.num(f"${bu:.2f}"),s.num(f"{cov:.1f}"),s.num(f"${tot:,}"),s.sharebar(sh,49.5,s.c("text-subtle")),s.txt(note,"text-muted"),""],f"Item / {n}"))
        rows+=[cat(c,False,i==3) for i,c in enumerate(cats[1:])]
        return dict(key="corn-budget",name="Beam · Crops · Corn budget",nav=("Crops","Corn"),parts=[hd,tabs,m],table="Expenses",count="5 categories",
                    tools=s.btn("Columns","ghost","rest","sliders"),thead=s.thead(L),rows=rows,height=960)

    def machinery(s):
        groups=[("Power units","11",2869000,286900,s.p(1)),("Implements","14",1038000,103800,s.p(3)),("Other equipment","10",1485000,148500,s.c("border-strong"))]
        units=[("Case IH 4450 Sprayer 1","2025",375000),("Case IH 4450 Sprayer 2","",375000),("Freightliner Tender Truck","",55000),("John Deere 6R 250","",160000),("John Deere 8R 280","",190000),("John Deere 8R 340","",250000),
               ("John Deere 8R 410","",330000),("John Deere 9R 540","",360000),("John Deere S780 Combine","",410000),("Kenworth T880","",185000),("Peterbilt 389","",179000)]
        hd=s.pagehead("Fleet",s.btn("Add equipment","primary","rest","plus"))
        split=s.minibar([(g[2],g[4]) for g in groups])+s.dots([(g[4],f"{n} ${g[2]/1e6:.2f}M") for g,n in zip(groups,["Power units","Implements","Other"])])
        m=s.metrics([s.metric("Fleet value","$5,392,000"),s.metric("Annual depreciation","$539,200"),s.metric("By group",None,extra=split,flex=2,last=True)])
        L=[("",16,"l"),("Equipment",None,"l"),("Year",60,"l"),("Ownership",92,"l"),("Value",96,"r"),("Useful life",84,"r"),("Annual cost",96,"r"),("Share of fleet",118,"l"),("",62,"r")]
        def grp(g, open_, last=False):
            n,cnt,val,ann,col=g
            name=f'<div style="display:flex;align-items:baseline;gap:var(--space-s)">{s.txt(n,"text","medium")}{s.txt(cnt,"text-subtle")}</div>'
            return s.trow(L,[s.chev(open_),name,"","",s.num(f"${val:,}","medium"),"",s.num(f"${ann:,}","medium"),s.sharebar(val/5392000*100,53.2,col),""],f"Group / {n}",last=last)
        rows=[grp(groups[0],True)]
        for n,yr,val in units:
            if n=="John Deere 8R 280":
                rows.append(s.trow(L,["",s.inp(n,"ui",right=False),s.inp("Year","data",focus=True,right=False,placeholder=True),s.inp("Owned","ui",chev=True,right=False),s.inp(f"{val:,}"),s.inp("10"),
                                     s.num(f"${val//10:,}","regular","text-muted"),s.sharebar(val/5392000*100,53.2,s.c("text-subtle")),s.savecancel()],f"Unit / {n} / editing","xxs"))
            else:
                rows.append(s.trow(L,["",s.txt(n,"text-secondary"),s.num(yr) if yr else s.num("—","regular","text-subtle"),s.txt("Owned","text-secondary"),s.num(f"${val:,}"),s.num("10 yr"),s.num(f"${val//10:,}"),
                                     s.sharebar(val/5392000*100,53.2,s.c("text-subtle")),""],f"Unit / {n}"))
        rows+=[grp(groups[1],False),grp(groups[2],False,True)]
        return dict(key="machinery-fleet",name="Beam · Machinery · Fleet",nav=("Machinery","Fleet"),parts=[hd,m],table="Equipment",count="35 pieces",
                    tools=s.btn("Filter","ghost","rest","filter")+s.btn("Columns","ghost","rest","sliders"),thead=s.thead(L),rows=rows,height=1000)

    def land(s):
        CR={"Non-GMO Corn":s.p(4),"Corn":s.p(1),"Soybeans":s.p(2)}
        fields=[("Sam's Dysart 160",160,"Non-GMO Corn","Crop share",252.68),("Mack's East 160",160,"Soybeans","Crop share",307.75),("North 80",80,"Non-GMO Corn","Crop share",308.11),
                ("South 80",80,"Soybeans","Cash rent",279.00),("South 40",40,"Non-GMO Corn","Crop share",415.28),("Home South",215,"Non-GMO Corn","Cash rent",282.00),
                ("Alissa's North",350,"Soybeans","Crop share",0.0),("Home West",450,"Non-GMO Corn","Cash rent",279.00),("Miller Quarter",160,"Corn","Cash rent",295.00),
                ("River Bottom",120,"Soybeans","Crop share",264.40),("Dysart West",240,"Corn","Cash rent",301.00)]
        hd=s.pagehead("Fields",s.btn("Import","outline")+s.btn("Add field","primary","rest","plus"))
        split=s.minibar([(2380,CR["Non-GMO Corn"]),(1200,CR["Corn"]),(1145,CR["Soybeans"])])+s.dots([(CR["Non-GMO Corn"],"Non-GMO corn 2,380"),(CR["Corn"],"Corn 1,200"),(CR["Soybeans"],"Soybeans 1,145")])
        m=s.metrics([s.metric("Total acres","4,725"),s.metric("Average land cost","$298.38","/ac"),s.metric("Missing a land cost","1","field","Alissa's North",color="warning"),
                     s.metric("Acres by crop",None,extra=split,flex=2,last=True)])
        L=[("Field",None,"l"),("Acres",64,"r"),("Crop",160,"l"),("Land type",130,"l"),("Land cost per acre",150,"r"),("",62,"r")]
        search=(f'<div layer-name="Search" style="display:flex;align-items:center;gap:var(--space-xs);width:220px;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}">'
                f'{s.icon("search",16,"text-muted")}<div style="flex:1;{s.ty("ui","m","regular","text-subtle")}">Search fields</div></div>')
        rows=[]
        for i,(n,ac,crop,lt,cost) in enumerate(fields):
            last = i==len(fields)-1
            if n=="South 80":
                rows.append(s.trow(L,[s.inp(n,"ui",right=False),s.inp(str(ac)),s.inp(crop,"ui",chev=True,right=False),s.inp(lt,"ui",chev=True,right=False),s.inp(f"{cost:.2f}",focus=True),s.savecancel()],f"Field / {n} / editing","xxs"))
            else:
                c=s.dotlabel(s.c("warning"),"Add a cost") if cost==0 else s.num(f"${cost:.2f}")
                rows.append(s.trow(L,[s.txt(n),s.num(f"{ac:,}"),s.dotlabel(CR[crop],crop,"text-secondary"),s.txt(lt,"text-secondary"),c,s.icon("chevron-right",16,"text-muted")],f"Field / {n}",last=last))
        return dict(key="land-fields",name="Beam · Land · Fields",nav=("Land","Fields"),parts=[hd,m],table="Fields",count="20",
                    tools=search+s.btn("All crops","ghost","rest","chevron-down",trailing=True)+s.btn("All land types","ghost","rest","chevron-down",trailing=True),thead=s.thead(L),rows=rows,height=900)

    def finance(s):
        R=[("Debt-to-equity","Total liabilities ÷ net worth","2.22",(0,3,2.22,0,0.43),"0.43 or below","1.79 over","Weak","danger","0","3.0"),
           ("Debt-to-asset","Total liabilities ÷ total assets","0.69",(0,1,0.69,0,0.30),"0.30 or below","0.39 over","Weak","danger","0","1.0"),
           ("Equity-to-asset","Net worth ÷ total assets","0.31",(0,1,0.31,0.70,1),"0.70 or above","0.39 under","Weak","danger","0","1.0"),
           ("Current ratio","Current assets ÷ current liabilities","1.04",(0,3,1.04,2.0,3),"2.0 or above","0.96 under","Fair","warning","0","3.0"),
           ("Working capital","Current assets − current liabilities","$388,446",(-500000,1000000,388446,0,1000000),"Above zero","Met","Strong","success","−$500k","$1M")]
        hd=s.pagehead("Balance sheet",s.btn("Banking and LOC","outline")+s.btn("Save ratios","outline"))
        tabs=s.segtabs(["Summary","Basic","Advanced","Financial health"],"Financial health")
        bar=lambda col,f: s.minibar([(f,s.c(col)),(5-f,s.c("bg-surface-muted"))],gap=False)
        m=s.metrics([s.metric("Weak","3","of 5","Debt-to-equity, debt-to-asset, equity-to-asset",bar("danger",3),flex=1.4),
                     s.metric("Fair","1","of 5","Current ratio",bar("warning",1)),s.metric("Strong","1","of 5","Working capital",bar("success",1),last=True)])
        L=[("Ratio",None,"l"),("Now",120,"r"),("Against the healthy range",300,"l"),("Healthy",120,"l"),("Gap",96,"r"),("Status",80,"l")]
        rows=[]
        for i,(n,f,v,g,target,gap,st,col,ll,lh) in enumerate(R):
            name=f'<div style="display:flex;flex-direction:column">{s.txt(n,"text","medium")}{s.txt(f,"text-muted")}</div>'
            rows.append(s.trow(L,[name,f'<div style="{s.ty("brand","l","medium")}">{v}</div>',s.gauge(*g,col,ll,lh,W=300),s.txt(target,"text-secondary"),
                                 s.num(gap,"regular","text-muted" if gap=="Met" else "text"),s.dotlabel(s.c(col),st)],f"Ratio / {n}","m",last=i==4))
        return dict(key="finance-health",name="Beam · Finance · Financial health",nav=("Finance","Balance sheet"),parts=[hd,tabs,m],table="Ratios",count="",tools="",thead=s.thead(L),rows=rows,height=900)

    # ---------- shared bits for card-based pages ----------
    def kv(s, label, value, color="text", last=False, dot=None):
        v=f'<div style="{s.ty("data","m","regular",color)}">{value}</div>'
        if dot: v=f'<div style="display:flex;align-items:center;gap:var(--space-s)">{v}{s.dotlabel(s.c(dot[0]),dot[1],"text-secondary")}</div>'
        return (f'<div layer-name="Row / {label}" style="display:flex;align-items:center;justify-content:space-between;gap:var(--space-l);width:100%;padding:var(--space-s) var(--space-l);box-shadow:{"none" if last else s.hair()}">'
                f'<div style="{s.ty("ui","m","regular","text-muted")}">{label}</div>{v}</div>')
    def go(s): return s.btn("","ghost","rest","chevron-right",True)

    def overview(s):
        hd=s.pagehead("Overview")
        sold=s.minibar([(713,s.c("accent")),(20.6,s.c("accent-muted")),(66.4,s.c("bg-surface-muted"))],gap=False)
        m=s.metrics([s.metric("Acres farmed","4,725"),s.metric("Corn sold","89.2%","","713k of 800k bu",sold,flex=1.3),s.metric("Corn margin","+$0.34","/bu",color="success"),
                     s.metric("Fleet value","$5,392,000"),s.metric("Working capital","$388,446",color="success",last=True)])
        LA=[("",6,"l"),("",None,"l"),("",150,"l"),("",16,"r")]
        def att(color,title,detail,where,last=False):
            body=f'<div style="display:flex;flex-direction:column">{s.txt(title,"text","medium")}{s.txt(detail,"text-muted")}</div>'
            return s.trow(LA,[s.cdot(s.c(color)),body,s.txt(where,"text-secondary"),s.icon("chevron-right",16,"text-muted")],f"Item / {title}","m",last=last)
        attention=s.card("Needs attention card",
            att("danger","3 of 5 financial ratios are weak","Debt-to-equity, debt-to-asset and equity-to-asset","Balance sheet")
           +att("warning","Alissa's North has no land cost","350 acres of soybeans, crop share","Fields")
           +att("warning","1 corn sale is still open","80,000 bu from March 18 at $4.80","Corn marketing")
           +att("warning","Most power units have no model year","Depreciation uses a 10 year life for each","Fleet",True),
            "Needs attention","4")
        CR=[("Non-GMO corn",2380,s.p(4)),("Corn",1200,s.p(1)),("Soybeans",1145,s.p(2))]
        LC=[("",None,"l"),("",72,"r"),("",118,"l")]
        crops=s.card("Crops card","".join(s.trow(LC,[s.dotlabel(c,n),s.num(f"{a:,} ac"),s.sharebar(a/4725*100,50.4,c)],f"Crop / {n}") for i,(n,a,c) in enumerate(CR))
                     +s.kv("Corn cost to grow","$996.00 /ac")+s.kv("Corn average price","$4.77 /bu",last=True),"Crops","",s.go())
        row1=f'<div layer-name="Row" style="display:flex;gap:var(--space-l);width:100%;align-items:flex-start"><div style="display:flex;flex:1.35;min-width:0">{attention}</div><div style="display:flex;flex:1;min-width:0">{crops}</div></div>'
        land=s.card("Land card",s.kv("Fields","20")+s.kv("Average land cost","$298.38 /ac")+s.kv("Fields with a crop","20 of 20",last=True),"Land","",s.go())
        mach=s.card("Machinery card",s.kv("Pieces","35")+s.kv("Power units","$2,869,000")+s.kv("Annual depreciation","$539,200",last=True),"Machinery","",s.go())
        fin=s.card("Finance card",s.kv("Current ratio","1.04",dot=("warning","Fair"))+s.kv("Debt-to-asset","0.69",dot=("danger","Weak"))+s.kv("Debt-to-equity","2.22",dot=("danger","Weak"),last=True),"Finance","",s.go())
        row2=f'<div layer-name="Row" style="display:flex;gap:var(--space-l);width:100%;align-items:flex-start">'+"".join(f'<div style="display:flex;flex:1;min-width:0">{c}</div>' for c in (land,mach,fin))+'</div>'
        return dict(key="overview",name="Beam · Overview",nav=("Overview",None),parts=[hd,m,row1,row2],table=None,height=900)

    def reports(s):
        R=[("Crop budget","Cost per acre and per bushel, by category","Crops","Corn, Non-GMO corn, Soybeans"),
           ("Marketing position","Sold, unsold and average price against break-even","Crops","Corn, Soybeans"),
           ("Sales ledger","Every sale with futures, basis, premium and final price","Crops","Corn, Soybeans"),
           ("Field list","Acres, crop, land type and land cost for each field","Land","20 fields"),
           ("Field profitability","Revenue and cost for each field","Land","20 fields"),
           ("Equipment list","Value, useful life and annual cost for each piece","Machinery","35 pieces"),
           ("Depreciation schedule","Annual depreciation by equipment group","Machinery","3 groups"),
           ("Balance sheet","Assets, liabilities and net worth","Finance","2026 season"),
           ("Financial health","Five ratios against their healthy range","Finance","2026 season")]
        hd=s.pagehead("Reports")
        search=(f'<div layer-name="Search" style="display:flex;align-items:center;gap:var(--space-xs);width:240px;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{s.c("bg-control")};box-shadow:0 0 0 1px {s.c("border-subtle")}">'
                f'{s.icon("search",16,"text-muted")}<div style="flex:1;{s.ty("ui","m","regular","text-subtle")}">Search reports</div></div>')
        tabs=s.segtabs(["All","Crops","Land","Machinery","Finance"],"All",search)
        L=[("Report",None,"l"),("Area",130,"l"),("Covers",260,"l"),("",62,"r")]
        rows=[]
        for i,(n,d,a,c) in enumerate(R):
            name=f'<div style="display:flex;flex-direction:column">{s.txt(n,"text","medium")}{s.txt(d,"text-muted")}</div>'
            acts=f'<div style="display:flex;gap:var(--space-xxs)">{s.btn("","ghost","rest","printer",True)}{s.btn("","ghost","rest","download",True)}</div>'
            rows.append(s.trow(L,[name,s.txt(a,"text-secondary"),s.txt(c,"text-secondary"),acts],f"Report / {n}","s",last=i==len(R)-1))
        return dict(key="reports",name="Beam · Reports",nav=("Reports",None),parts=[hd,tabs],table="Reports",card_title=None,count="",tools="",thead=s.thead(L),rows=rows,height=900)

    # ---------- state specimens for the screen-level patterns (design-system sheet) ----------
    def state_sections(s):
        W=200
        def link(state):
            sel = state=="selected"; dis = state=="disabled"
            bg="var(--navigation-active-background)" if sel else (s.c("bg-highlight") if state=="hover" else "transparent")
            t=s.ty("ui","m","regular","text-disabled" if dis else "text")
            if sel: t=t.replace(f"color:{s.c('text')}","color:var(--navigation-active-foreground)")
            sh=f"box-shadow:{s.ring()};" if state=="focus" else ""
            return (f'<div layer-name="Nav link / {state}" style="display:flex;width:{W}px;padding:var(--space-xs) var(--space-s) var(--space-xs) var(--space-xxl);border-radius:var(--radius-s);background:{bg};{sh}"><div style="{t}">Corn</div></div>')
        def trigger(state):
            dis = state=="disabled"; col="text-disabled" if dis else "text"
            bg=s.c("bg-highlight") if state=="hover" else "transparent"
            sh=f"box-shadow:{s.ring()};" if state=="focus" else ""
            return (f'<div layer-name="Nav trigger / {state}" style="display:flex;align-items:center;gap:var(--space-xs);width:{W}px;padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{bg};{sh}">'
                    f'{s.icon("sprout",16,col)}<div style="flex:1;{s.ty("ui","m","medium",col)}">Crops</div>{s.icon("chevron-down" if state=="selected" else "chevron-right",16,"text-disabled" if dis else "text-muted")}</div>')
        def tool(state):
            bg={"hover":s.c("bg-hover"),"selected":s.c("bg-highlight")}.get(state,"transparent")
            col={"rest":"text-muted","focus":"text-muted","hover":"text","selected":"text","disabled":"text-disabled"}[state]
            sh=f"box-shadow:{s.ring()};" if state=="focus" else ""
            return (f'<div style="display:flex;width:{W}px"><div layer-name="Toolbar control / {state}" style="padding:var(--space-xs) var(--space-s);border-radius:var(--radius-s);background:{bg};{sh}{s.ty("ui","m","medium",col)}">Marketing</div></div>')
        cap=lambda t,w: f'<div style="width:{w}px;flex-shrink:0;{s.ty("data","xs","regular","text-muted")}">{t}</div>'
        head=f'<div style="display:flex;align-items:center;gap:var(--space-l)">{cap("",190)}{cap("navigation link",W)}{cap("navigation group",W)}{cap("toolbar control",W)}</div>'
        rows="".join(f'<div layer-name="{st}" style="display:flex;align-items:center;gap:var(--space-l)">{cap(lab,190)}{link(st)}{trigger(st)}{tool(st)}</div>'
                     for st,lab in (("rest","rest"),("hover","hover"),("focus","focus"),("selected","selected · open · pressed"),("disabled","disabled")))
        nav=s.section("Navigation states","Navigation and toolbar states",head+rows,"display:flex;flex-direction:column;flex:1;gap:var(--space-m)")
        L=[("State",72,"l"),("Field",None,"l"),("Acres",64,"r"),("Crop",160,"l"),("Land type",130,"l"),("Land cost per acre",150,"r"),("",62,"r")]
        st=lambda t: f'<div style="{s.ty("data","xs","regular","text-muted")}">{t}</div>'
        def r(state, **kw):
            return s.trow(L,[st(state),s.txt("North 80"),s.num("80"),s.dotlabel(s.p(4),"Non-GMO Corn","text-secondary"),s.txt("Crop share","text-secondary"),s.num("$308.11"),s.icon("chevron-right",16,"text-muted")],f"Row / {state}",**kw)
        edit=s.trow(L,[st("editing"),s.inp("North 80","ui",right=False),s.inp("80"),s.inp("Non-GMO Corn","ui",chev=True,right=False),s.inp("Crop share","ui",chev=True,right=False),s.inp("308.11",focus=True),s.savecancel()],"Row / editing","xxs",last=True)
        focus_sh="inset 0 0 0 2px "+s.c("focus-ring")
        body=f'<div style="display:flex;flex-direction:column;width:100%">{s.thead(L)}{r("rest")}{r("hover",bg=s.c("bg-hover"))}{r("focus",shadow=focus_sh)}{edit}</div>'
        table=s.section("Table row states","Table row states",s.card("Row states card",body),"display:flex;flex:1")
        return [nav, table]

    def assemble(s, sc, rows=True):
        table=""
        if sc.get("table"):
            body=f'<div layer-name="Rows" style="display:flex;flex-direction:column;width:100%">{sc["thead"]}{"".join(sc["rows"]) if rows else ""}</div>'
            table=s.card(sc["table"]+" card", body, sc.get("card_title", sc["table"]), sc["count"], sc["tools"])
        main=(f'<div layer-name="Main" style="display:flex;flex-direction:column;flex:1;min-width:0;height:100%">{s.topbar()}'
              f'<div layer-name="Content" style="display:flex;flex-direction:column;gap:var(--space-l);width:100%;padding:var(--space-xl) var(--space-xxl) 0">{"".join(sc["parts"])}{table}</div></div>')
        return s.sidebar(*sc["nav"])+main

SCREENS=["overview","marketing","budget","land","machinery","finance","reports"]
OUT="/Users/pauldelaurier/Documents/CLAUDE CODE/BEAM/beam-screens"
def local(names):
    import local as LC
    a=CF("dark")
    for n in names:
        sc=getattr(a,n)(); h=sc["height"]
        body=(f'<div style="display:flex;width:1440px;height:{h}px;overflow:hidden;background:var(--dark-bg-canvas);font-family:var(--font-ui)">{a.assemble(sc)}</div>')
        hp=os.path.join(OUT,sc["key"]+".html"); open(hp,"w").write(LC.page(body,sc["name"]))
        pp=os.path.join(OUT,sc["key"]+".png"); LC.shoot(hp,pp,1440,h,2); print(pp, len(body))
def push(names, x0, y0, cols=3):
    from pmcp import call
    a=CF("dark"); out={}
    for i,n in enumerate(names):
        sc=getattr(a,n)(); x=x0+(i%cols)*1520; y=y0+(i//cols)*1120
        ab=call("create_artboard", pageId="p-1-0", name=sc["name"], styles={"width":"1440px","height":f'{sc["height"]}px',"display":"flex","flexDirection":"row",
            "backgroundColor":"var(--dark-bg-canvas)","fontFamily":"var(--font-ui)","overflow":"hidden"})[-1]["id"]
        call("update_styles", updates=[{"nodeIds":[ab],"styles":{"left":f"{x}px","top":f"{y}px"}}])
        r=call("write_html", targetNodeId=ab, mode="insert-children", html=a.assemble(sc, rows=False))[-1]["createdNodes"]
        if sc.get("table"):
            tid=[c["id"] for c in r if c["name"]=="Rows" and c["component"]=="Frame"][0]
            rows=sc["rows"]; k=7
            for j in range(0,len(rows),k): call("write_html", targetNodeId=tid, mode="insert-children", html="".join(rows[j:j+k]))
        out[n]=ab; print(n, ab, x, y, flush=True)
    return out
if __name__=="__main__":
    local(sys.argv[1:] or SCREENS)
