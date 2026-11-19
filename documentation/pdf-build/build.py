# Builds the client preview PDF from the two full-page captures made by capture.py.
import sys,json,os,subprocess
from PIL import Image
P,S,OUT=sys.argv[1],sys.argv[2],sys.argv[3]; C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
L=json.load(open(S+'/layout.json')); D=Image.open(S+'/desktop.png').convert('RGB'); PH=Image.open(S+'/phone.png').convert('RGB')
NAMES={'hero':'1. Hero','stats':'2. Stat strip','when':'3. When would you bring us in?','standard':"4. An outside investigation shouldn't become another problem to manage",'ways':'5. Two ways to get the work moving','process':'6. The CLEAR Investigation Framework™','intensive':'7. Investigation Readiness Intensive','invextra':'8. Meet INVEXTRA™','independence':'9. An outside investigator protects the finding','about':'10. Built by someone who has carried the caseload','proof':'11. Proof: testimonials','orgs':"11. Proof: organizations we've served",'start':'12. How it starts','faq':'13. Questions we get asked','cta':'14. Closing call to action','site-footer':'Footer'}
# ---- desktop: one picture per section (the menu bar stays with the hero)
desk=[]; secs=L['desktop']['s']
for i,(n,top,h) in enumerate(secs):
    if n=='site-header': continue
    y0=0 if n=='hero' else top; y1=top+h if i<len(secs)-1 else D.height
    f='d-%s.jpg'%n; D.crop((0,y0,1440,min(y1,D.height))).save(S+'/'+f,'JPEG',quality=88,optimize=True); desk.append((NAMES[n],f,y1-y0))
D.crop((0,0,1440,secs[1][1]+secs[1][2])).save(S+'/cover.jpg','JPEG',quality=90,optimize=True)
# ---- phone: cut the long page into columns no taller than MAXH, at section boundaries where possible
MAXH=1540; cuts=[0]; bounds=[t for n,t,h in L['phone']['s'][2:]]+[PH.height]   # tops of sections after the hero, plus the end
y=0
while y<PH.height:
    cand=[b for b in bounds if y+500<b<=y+MAXH]          # the last section boundary that still fits (but not a tiny column)
    ny=max(cand) if cand else min(y+MAXH,PH.height)
    if PH.height-ny<200: ny=PH.height
    cuts.append(ny); y=ny
cols=[]
for i in range(len(cuts)-1):
    f='p-%02d.jpg'%i; PH.crop((0,cuts[i],390,cuts[i+1])).save(S+'/'+f,'JPEG',quality=88,optimize=True); cols.append((f,cuts[i+1]-cuts[i]))
print('desktop pictures',len(desk),'phone columns',len(cols),[h for f,h in cols])
fonts=P+'/fonts'
css='''
@font-face{font-family:"LB";src:url("file://%(f)s/libre-baskerville-v24-latin-variable.woff2") format("woff2");font-weight:400 700;font-style:normal}
@font-face{font-family:"LB";src:url("file://%(f)s/libre-baskerville-v24-latin-variable-italic.woff2") format("woff2");font-weight:400 700;font-style:italic}
@font-face{font-family:"SS";src:url("file://%(f)s/source-sans-3-v20-latin-variable.woff2") format("woff2");font-weight:200 900}
@page{size:8.5in 11in;margin:0.55in 0.5in 0.6in}
*{box-sizing:border-box}
body{margin:0;font-family:"SS",Arial,sans-serif;color:#0A1A33;font-size:10.5pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2{font-family:"LB",Georgia,serif;font-weight:400;margin:0}
.eyebrow{font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#4C0013;margin:0 0 10pt}
.cover h1{font-size:27pt;line-height:1.12;max-width:6.4in}
.cover h1 em{color:#4C0013}
.cover .lead{font-size:11.5pt;max-width:6.2in;margin:10pt 0 14pt}
.shot{display:block;width:100%%;border:1px solid #D9DCE0}
.cover .shot{width:84%%}
.cover .label{font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin:14pt 0 2pt}
.cover a{font-size:13pt;font-weight:600;color:#4C0013;text-decoration:none}
.cover .note{max-width:6.6in;margin:6pt 0 0}
.cover ul{margin:6pt 0 0;padding-left:14pt;max-width:6.6in}
.cover li{margin-bottom:3pt}
.cover .prepared{font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;margin-top:12pt}
.part{break-before:page}
.part h2{font-size:22pt;margin-bottom:4pt}
.part .sub{margin:0 0 14pt;max-width:6.4in}
.sec{break-inside:avoid;margin:0 0 16pt}
.cap{font-size:8.5pt;font-weight:700;letter-spacing:.06em;color:#0A1A33;margin:0 0 5pt;padding-top:5pt;border-top:1.5pt solid #0A1A33}
.phones{display:grid;grid-template-columns:repeat(3,2.25in);justify-content:space-between;align-items:start;break-inside:avoid;margin-bottom:0}
.phones+.phones{break-before:page}
.phones img{display:block;width:2.25in;border:1px solid #D9DCE0}
.pcap{font-size:8pt;font-weight:700;letter-spacing:.06em;margin:0 0 4pt}
'''%{'f':fonts}
h='<!doctype html><html lang="en"><head><meta charset="utf-8"><title>By-the-Book Workplace Investigations · Homepage Preview</title><style>'+css+'</style></head><body>'
h+='''<section class="cover">
<p class="eyebrow">Homepage preview</p>
<h1>By-the-Book Workplace Investigations, <em>the new homepage.</em></h1>
<p class="lead">Your final homepage copy, built section by section and word for word, following your design notes: clean, minimal, professional and human-led.</p>
<img class="shot" src="file://%s/cover.jpg" alt="">
<p class="label">See it live</p>
<a href="https://mfebres0919.github.io/By-The-Book-Investigations/">https://mfebres0919.github.io/By-The-Book-Investigations/</a>
<p class="note">Open the link to see what a PDF cannot show: the headline arriving word by word, sections fading in as you scroll, the numbers counting up and the questions sliding open. The pages that follow show every section of the finished homepage, first on a computer, then on a phone.</p>
<ul>
<li>This preview is the homepage only. Links to other pages (Contact, Services, About) are not built yet.</li>
<li>The four testimonials, names and titles appear exactly as written in your homepage document. Your document's final publication check (approval of testimonial wording, titles and client logos, and the INVEXTRA launch timing) is yours to complete before go-live.</li>
<li>Three things I need from you: whether the photo and title in the founder section are right, whether the nine organization logos (taken from your current site) are the set you want, and where “Schedule a Conversation” should lead.</li>
</ul>
<p class="prepared">Prepared for Dr. Marquita M. Booker, Esq. · November 18, 2026 · MigsFlow</p>
</section>'''%S
h+='<section class="part"><p class="eyebrow">Part one</p><h2>On a computer</h2><p class="sub">Each section of the homepage as it appears on a laptop or desktop screen, in order from top to bottom.</p>'
for name,f,hh in desk: h+='<div class="sec"><p class="cap">%s</p><img class="shot" src="file://%s/%s" alt=""></div>'%(name,S,f)
h+='</section><section class="part"><p class="eyebrow">Part two</p><h2>On a phone</h2><p class="sub">The same page on a phone, top to bottom. Read each row left to right; each column continues where the one before it ends.</p>'
for i in range(0,len(cols),3):
    h+='<div class="phones">'
    for j,(f,hh) in enumerate(cols[i:i+3]): h+='<div><p class="pcap">%d of %d</p><img src="file://%s/%s" alt=""></div>'%(i+j+1,len(cols),S,f)
    h+='</div>'
h+='</section></body></html>'
open(S+'/preview.html','w',encoding='utf-8').write(h)
os.makedirs(os.path.dirname(OUT),exist_ok=True)
subprocess.run([C,'--headless=new','--disable-gpu','--no-pdf-header-footer','--virtual-time-budget=10000','--print-to-pdf='+OUT,'file://'+S+'/preview.html'],capture_output=True)
print(os.path.getsize(OUT))
