# Captures the whole homepage, finished (no animations, everything revealed), at 1440 and 390 wide,
# and records where each section starts and ends so the pictures can be cut per section.
import sys,subprocess,os,re,json,html as H
P,S=sys.argv[1],sys.argv[2]; C="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
t=open(P+'/index.html',encoding='utf-8').read()
t=re.sub(r'\sdata-count="[^"]*"','',t)                       # numbers stay at their final value
t=t.replace(' loading="lazy"','').replace(' decoding="async"','')
t=re.sub(r'<script src="javascript/global.js" defer></script>','',t)   # no reveal script: nothing starts hidden
css='''<style>
*,*::before,*::after{animation:none!important;transition:none!important}
[data-reveal],.split__part,.hero__word,.hero__eyebrow,.hero__lead,.hero__actions,.hero__trust-text{opacity:1!important;transform:none!important}
.back-to-top{display:none!important}
.site-header{position:static!important}
.intensive__head,.faq__title{position:static!important}
html{scroll-behavior:auto!important}
@media (min-width:48rem){.hero{min-height:50rem!important}}   /* a fixed hero height, so the measuring pass and the photo agree */
</style>'''
probe='''<script>window.addEventListener('load',function(){setTimeout(function(){
var out={h:document.documentElement.scrollHeight,w:document.documentElement.clientWidth,s:[]};
var els=[document.querySelector('.site-header')].concat([].slice.call(document.querySelectorAll('main > section')),[document.querySelector('.site-footer')]);
els.forEach(function(el){var r=el.getBoundingClientRect();out.s.push([el.className.split(' ')[0],Math.round(r.top+window.scrollY),Math.round(r.height)]);});
var msg=JSON.stringify(out); if(parent!==window){parent.postMessage(msg,'*');} var d=document.createElement('pre');d.id='zzout';d.textContent=msg;document.body.appendChild(d);},500)});</script>'''
open(P+'/zz-full.html','w',encoding='utf-8').write(t.replace('</head>',css+'</head>').replace('</body>',probe+'</body>'))
open(P+'/zz-shot.html','w',encoding='utf-8').write(t.replace('</head>',css+'</head>'))
def run(args): return subprocess.run([C,'--headless=new','--disable-gpu','--hide-scrollbars']+args,capture_output=True,text=True).stdout
try:
    # desktop: measure, then photograph at the full height
    d=run(['--virtual-time-budget=6000','--window-size=1440,1000','--dump-dom','file://%s/zz-full.html'%P])
    desk=json.loads(H.unescape(re.search(r'<pre id="zzout">(.*?)</pre>',d,re.S).group(1)))
    run(['--virtual-time-budget=15000','--window-size=1440,%d'%desk['h'],'--screenshot=%s/desktop.png'%S,'file://%s/zz-shot.html'%P])
    # phone: the page inside a 390-wide frame
    wrap="<!doctype html><body style='margin:0;background:#fff'><iframe src='%s' style='width:390px;height:%dpx;border:0;display:block'></iframe><script>window.addEventListener('message',function(e){var d=document.createElement('pre');d.id='zzout';d.textContent=e.data;document.body.appendChild(d);});</script></body>"
    open(P+'/zz-wrap.html','w').write(wrap%('zz-full.html',3000))
    d=run(['--virtual-time-budget=6000','--window-size=600,1000','--dump-dom','file://%s/zz-wrap.html'%P])
    ph=json.loads(H.unescape(re.search(r'<pre id="zzout">(.*?)</pre>',d,re.S).group(1)))
    open(P+'/zz-wrap.html','w').write(wrap%('zz-shot.html',ph['h']))
    run(['--virtual-time-budget=20000','--window-size=600,%d'%ph['h'],'--screenshot=%s/phone-raw.png'%S,'file://%s/zz-wrap.html'%P])
    json.dump({'desktop':desk,'phone':ph},open(S+'/layout.json','w'))
    print('desktop',desk['h'],desk['w'],len(desk['s']),'| phone',ph['h'],ph['w'])
finally:
    for f in ('zz-full.html','zz-shot.html','zz-wrap.html'):
        if os.path.exists(P+'/'+f): os.remove(P+'/'+f)
