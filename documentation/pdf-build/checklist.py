# Builds the Round 1 feedback overview PDF for the client, in the site's own fonts and colours.
# (Round 1: the first build of her copy, plus our questions back to her. Not a final review.)
# Run from the project folder:
#   python3 documentation/pdf-build/checklist.py
# It writes documentation/Client Deliverables/By_The_Book_Round_1_Feedback_Overview.pdf
# (that folder is git-ignored, so the PDF stays on this Mac; this script is the record).
# To change the list, edit the ITEMS below and run it again.
import os, subprocess, html

P = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..'))
OUT = os.path.join(P, 'documentation', 'Client Deliverables', 'By_The_Book_Round_1_Feedback_Overview.pdf')
TMP = os.path.join(P, 'documentation', 'pdf-build', 'zz-checklist.html')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
SITE = 'https://mfebres0919.github.io/By-The-Book-Investigations/'
DATE = 'November 25, 2026'

# (title, explanation, where on the site or None)
NEED = [
    ("Investigation Capacity page wording",
     "This page (for the Investigation Capacity Retainer, with booking built in) is the one page still waiting on copy. Send the wording you would like, or say if you would prefer a draft based on your Services page text, for your approval.",
     None),
    ("Your Calendly booking link",
     "The Investigation Capacity page will let visitors book a time with you directly. Still needed: the link to the Calendly event you want them to book.",
     None),
    ("Investigation Readiness Assessment link",
     "“Take the Investigation Readiness Assessment” appears twice on the Services page and is not connected yet. Per your note, it will be switched on once the assessment and its results have been tested.",
     "Services page"),
    ("Where contact form messages should go",
     "Which email address should receive the messages people send through the contact form?",
     "Contact page"),
    ("Your Privacy Policy",
     "The contact form links to a Privacy Policy page, which every site that collects names and emails needs. Reuse the policy on your current site, or will you send updated text?",
     "Footer and Contact page"),
    ("A larger photo of Haya Abusway",
     "The current copy is very small (200 by 200 pixels), so it looks soft on sharper screens.",
     "About page, “Who is behind the work”"),
    ("Light versions of both logos",
     "White (or reversed) versions of the By-the-Book and INVEXTRA logos, ideally as SVG files, so they can sit on the navy and burgundy areas.",
     None),
]

CONFIRM = [
    ("Across the site", [
        ("The framework’s name",
         "Shown as “CLEAR By-the-Book™ Investigation Framework”. Is this the spelling you want, with the ™ after “By-the-Book”? Sentences that only say “CLEAR” were left as written.", None),
        ("INVEXTRA launch date",
         "Shown as “Early 2027” throughout. Your Services copy says “January 2027”. Which would you like, now that it is close?", "Homepage, Services, About"),
        ("Your contact details",
         "(888) 397-6352, hello@bythebookinvestigations.com, and 2591 Dallas Parkway, Suite 300, Frisco, TX 75034, taken from your current site. Are they current, and would you like the street address shown?", "Menu on phones, footer, Contact page"),
        ("The framework link in the menu",
         "“CLEAR By-the-Book™ Investigation Framework” in the menu takes visitors to the CLEAR section of the homepage. Is that right, or would you like the framework to have its own page in the future?", "Main menu"),
    ]),
    ("Homepage", [
        ("Testimonials",
         "Your own publication check: approval of each testimonial’s wording, and the names and titles of the people quoted.", None),
        ("Organizations you have worked with",
         "The ten logos (including Per Scholas, using the version you sent). Do you have each organization’s permission to show its logo, and is this the set you want?", None),
        ("The INVEXTRA section",
         "Your new paragraph is in place. The heading “Meet INVEXTRA™” and the line “Bringing CLEAR into the investigation as it happens.” were kept. Keep or remove?", None),
        ("The copper plumb line",
         "The photo beside the CLEAR heading shows a copper plumb weight. Your brand guide keeps copper for INVEXTRA. Are you happy with it there?", None),
        ("Motion at the top of the page",
         "The line drawing behind the headline moves gently, with a small pause button for visitors who prefer stillness (an accessibility requirement). Does it feel calm enough?", None),
        ("Highlighted words in headings",
         "A few words are set in burgundy italics for emphasis (for example “When” and “problem”). These were a design choice, not part of your copy. Are you happy with them?", None),
        ("The five CLEAR marks",
         "Would you like the five marks supplied as files for training materials or INVEXTRA?", None),
    ]),
    ("About page", [
        ("The founder story",
         "Your own publication check: is the anonymized story in “The experience that changed how we work” appropriate to publish?", None),
        ("Your team",
         "Haya Abusway, Yeo Ju Choi and Giovanni Pasquale are shown with photos and names only. Would you like the team on the site? If so, please confirm the spelling of each name and whether you would like roles shown. The small heading “The team” was added for the site and is not from your copy.", None),
        ("Your title",
         "Your photo is captioned “Dr. Marquita M. Booker, Esq.” with “Founder”. Is that the title you want?", None),
    ]),
    ("Contact page", [
        ("The page wording",
         "There was no Contact page copy, so the top of the page uses your own closing text from the Services page. Keep it, or send different wording?", None),
        ("The form’s wording",
         "The labels, the note asking people not to include names or confidential details, the error messages and the thank-you message were written for the site, not taken from your copy. Please read them and note anything to change.", None),
    ]),
]

LATER = [
    ("Page addresses", "Whether to keep your current page addresses (for example /about-us) or use the new ones, and which of your current pages and blog posts should carry over, be redirected or retire."),
    ("Domain and accounts", "Access to your domain, DNS and email host, and whether you already have Google Analytics, Search Console and a Google Business Profile."),
    ("Legal details", "Any disclaimers or license numbers you would like shown on the site."),
]

FYI = [
    "Body text is navy rather than silver, so it stays easy to read and meets the accessibility standard you asked for. Silver is still used for lines and accents.",
    "The fonts are Libre Baskerville for headings and Source Sans 3 for text, chosen from the options in your brand guide.",
    "The retainer link was removed from the top menu, as you suggested. It is still listed in the footer.",
]

def e(x):
    return html.escape(x).replace('By-the-Book', '<span class="nw">By-the-Book</span>')
def box(t, d, w=None):
    return ('<li class="item"><span class="tick"></span><div><p class="t">%s</p><p class="d">%s</p>%s</div></li>'
            % (e(t), e(d), ('<p class="w">Where: %s</p>' % e(w)) if w else ''))

F = P + '/fonts'
css = '''
@font-face{font-family:"LB";src:url("file://%(f)s/libre-baskerville-v24-latin-variable.woff2") format("woff2");font-weight:400 700}
@font-face{font-family:"LB";src:url("file://%(f)s/libre-baskerville-v24-latin-variable-italic.woff2") format("woff2");font-weight:400 700;font-style:italic}
@font-face{font-family:"SS";src:url("file://%(f)s/source-sans-3-v20-latin-variable.woff2") format("woff2");font-weight:200 900}
@page{size:8.5in 11in;margin:0.6in 0.65in 0.65in}
@page:first{margin:0}
*{box-sizing:border-box}
body{margin:0;font-family:"SS",Arial,sans-serif;color:#0A1A33;font-size:10.5pt;line-height:1.5;-webkit-print-color-adjust:exact;print-color-adjust:exact}
h1,h2,h3{font-family:"LB",Georgia,serif;font-weight:400;margin:0}
p{margin:0}
/* cover */
.cover{height:11in;display:flex;flex-direction:column;break-after:page}
.cover__top{padding:0.7in 0.75in 0.45in}
.cover__logo{width:1.35in}
.cover__band{flex:1;background:#0A1A33;color:#fff;padding:0.85in 0.75in 0.7in;position:relative;overflow:hidden}
.cover__band svg{position:absolute;right:0;bottom:0.95in;width:100%%;height:1.6in;opacity:.4}
.eyebrow{display:flex;align-items:center;gap:8pt;font-size:8.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase}
.eyebrow::before{content:"";width:6pt;height:6pt;background:#8C5A2B}
.cover h1{font-size:34pt;line-height:1.1;margin-top:16pt;max-width:5.6in}
.cover h1 em{color:#D9DCE0}
.cover .lead{font-size:12pt;color:#D9DCE0;max-width:5.4in;margin-top:16pt}
.cover .lbl{font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#D9DCE0;margin-top:30pt}
.cover a{color:#fff;font-size:12pt;font-weight:600;text-decoration:none;border-bottom:1px solid rgba(217,220,224,.5)}
.howto{margin-top:30pt;padding-top:14pt;border-top:1px solid rgba(217,220,224,.28);display:grid;grid-template-columns:repeat(3,1fr);gap:16pt;font-size:9.5pt;color:#D9DCE0}
.howto b{display:block;color:#fff;font-family:"LB",Georgia,serif;font-weight:400;font-size:12pt;margin-bottom:3pt}
.nw{white-space:nowrap}
.prepared{position:absolute;left:0.75in;bottom:0.45in;font-size:8pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#D9DCE0}
/* parts */
.part{break-before:page}
.part:first-of-type{break-before:auto}
.part__head{border-top:2pt solid #0A1A33;padding-top:10pt;margin-bottom:14pt}
.part__num{font-size:8.5pt;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#4C0013}
.part h2{font-size:22pt;margin-top:4pt}
.part h2 em{color:#4C0013}
.part .sub{margin-top:6pt;max-width:6.2in}
h3{font-size:13pt;margin:16pt 0 6pt;padding-bottom:4pt;border-bottom:1px solid #D9DCE0}
ul{list-style:none;margin:0;padding:0}
.item{display:grid;grid-template-columns:16pt 1fr;gap:9pt;padding:8pt 0;border-bottom:1px solid #EEF0F2;break-inside:avoid}
.tick{width:11pt;height:11pt;border:1.25pt solid #0A1A33;margin-top:3pt}
.t{font-weight:700}
.d{margin-top:1pt}
.w{margin-top:2pt;font-size:8.5pt;font-weight:600;letter-spacing:.04em;color:#4C0013}
.need .item{grid-template-columns:22pt 1fr}
.need .num{font-family:"LB",Georgia,serif;font-size:15pt;line-height:1;color:#4C0013}
.later .item{grid-template-columns:1fr}
.fyi{margin-top:22pt;padding:12pt 14pt;background:#F3F4F6;border-left:3pt solid #4C0013;break-inside:avoid}
.fyi p.h{font-family:"LB",Georgia,serif;font-size:12pt;margin-bottom:4pt}
.fyi li{padding-left:12pt;position:relative;margin-top:3pt}
.fyi li::before{content:"";position:absolute;left:0;top:6pt;width:5pt;height:5pt;background:#0A1A33}
.end{margin-top:22pt;font-family:"LB",Georgia,serif;font-style:italic;font-size:12pt}
''' % {'f': F}

lines = ''.join('<path d="M0 %d H200 C330 %d 380 120 520 120 H1000" />' % (y, y) for y in (40, 80, 120, 160, 200))
h = '<!doctype html><html lang="en"><head><meta charset="utf-8"><title>By-the-Book Round 1 Feedback Overview</title><style>' + css + '</style></head><body>'
h += '''<section class="cover">
<div class="cover__top"><img class="cover__logo" src="file://%(p)s/images/brand/by-the-book-logo.png" alt="By-the-Book Workplace Investigations"></div>
<div class="cover__band">
<svg viewBox="0 0 1000 240" preserveAspectRatio="none" fill="none" stroke="#D9DCE0" stroke-width="1" vector-effect="non-scaling-stroke">%(lines)s</svg>
<p class="eyebrow">Round 1 feedback overview</p>
<h1>Round one: your copy, built, <em>and questions back to you.</em></h1>
<p class="lead">This is the first round of your new site. The Homepage, Services, About and Contact pages are built from the copy you sent, so you can see it in place. This overview gathers the things that are still needed and the points to look at before round two.</p>
<p class="lbl">See round one</p>
<a href="%(site)s">%(site)s</a>
<div class="howto">
<div><b>1. Still needed</b>Items only you can provide, to finish the last pages.</div>
<div><b>2. Things to confirm</b>A yes, or what you would like changed. Page by page.</div>
<div><b>3. Later, before launch</b>Larger decisions to walk through together.</div>
</div>
<p class="prepared">Prepared for Dr. Marquita M. Booker, Esq. &middot; %(date)s &middot; MigsFlow</p>
</div></section>''' % {'p': P, 'site': SITE, 'date': DATE, 'lines': lines}

h += '<section class="part need"><div class="part__head"><p class="part__num">Part one</p><h2>Things that are <em>still needed</em></h2><p class="sub">These are the only things holding back the last two pages (Investigation Capacity and Privacy Policy) and a few finishing touches.</p></div><ul>'
for i, (t, d, w) in enumerate(NEED, 1):
    h += ('<li class="item"><span class="num">%d</span><div><p class="t">%s</p><p class="d">%s</p>%s</div></li>'
          % (i, e(t), e(d), ('<p class="w">Where: %s</p>' % e(w)) if w else ''))
h += '</ul></section>'

h += '<section class="part"><div class="part__head"><p class="part__num">Part two</p><h2>Things to <em>confirm</em></h2><p class="sub">Tick each one once you are happy with it, or note what you would like changed. Open the site alongside this list.</p></div>'
for group, items in CONFIRM:
    h += '<h3>%s</h3><ul>' % e(group) + ''.join(box(*it) for it in items) + '</ul>'
h += '</section>'

h += '<section class="part later"><div class="part__head"><p class="part__num">Part three</p><h2>Before launch, <em>together</em></h2><p class="sub">Nothing to do yet. These are for closer to launch.</p></div><ul>'
h += ''.join('<li class="item"><div><p class="t">%s</p><p class="d">%s</p></div></li>' % (e(t), e(d)) for t, d in LATER) + '</ul>'
h += '<div class="fyi"><p class="h">For your information</p><ul>' + ''.join('<li>%s</li>' % e(x) for x in FYI) + '</ul></div>'
h += '<p class="end">Thank you. Reply to the email with your answers, or mark up this PDF, whichever is easier. Your feedback shapes round two.</p></section></body></html>'

open(TMP, 'w', encoding='utf-8').write(h)
os.makedirs(os.path.dirname(OUT), exist_ok=True)
subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--allow-file-access-from-files',
                '--virtual-time-budget=8000', '--print-to-pdf=' + OUT, 'file://' + TMP], capture_output=True)
os.remove(TMP)
print(OUT, os.path.getsize(OUT))
