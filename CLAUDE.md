# By-the-Book Workplace Investigations: project guide and change log

This file is the memory for this client project. It records what the project is, what has been decided, and every change made to the site, so the work can continue even if a chat is lost.

The build standards are in the MigsFlow handbook (v2.1, HTML, CSS and JavaScript), loaded here:

@handbook/CLAUDE.md

---

## 1. How to work in this project

- **Log every change.** Before ending any reply in which the site, its files, its settings, its accounts or its content changed, add a dated entry to the change log (Section 10) and update the other sections if a fact, decision or open question changed.
- **Commit and push after every change** (Miguelle, 2026-11-18: "push and commit any changes you make moving forward automatically"). After logging, `git add -A`, commit with a short message saying what changed, and `git push` to `origin main` (github.com/mfebres0919/By-The-Book-Investigations). This is the code repository only; it does not cover Netlify, DNS or anything in the "Never change" rule below.
- **Read first.** At the start of a session, read this file, then `documentation/project-checklist.md`.
- **Follow the handbook** (`handbook/CLAUDE.md`). A one-off exception for this client is recorded in Section 6 here, not by editing the handbook. If Miguelle changes a standard for all sites, update the handbook and its change log (handbook Section 22).
- **Stack: plain HTML, CSS and JavaScript.** No frameworks, no Tailwind, no build step. (Decided 2026-11-16, see Section 6.)
- **Keep the checklist current:** `documentation/project-checklist.md`.
- **Never change** live DNS, the domain, Google accounts, Squarespace, Netlify settings or the production site unless Miguelle explicitly asks.
- **Content integrity matters more than usual here.** The client's buyers are attorneys, HR leaders and compliance officers. Never invent credentials, case results, client names, statistics or testimonials. Mark anything not yet supplied as `[PLACEHOLDER: …]`.

## 2. The client

| | |
|---|---|
| **Business** | By-the-Book Workplace Investigations (the brand guide also writes "By-The-Book"; the live site uses "By-the-Book") |
| **Main contact** | Marquita Booker (the live site shows "Marquita M. Booker") |
| **Tagline** | "Precision in Process. Integrity in Practice." |
| **What they do** | Impartial third-party workplace investigations (discrimination, harassment, retaliation), investigator training that builds a client's internal capacity, and AI-enhanced investigator support |
| **Who buys** | HR leaders, compliance officers, DEI executives, general counsel, civil rights investigators and senior executives. They often look at sites on a phone between meetings. |
| **Current site** | https://www.bythebookinvestigations.com/ on Squarespace. This is a **redesign** (handbook Section 18 applies). |
| **Contact details shown on the live site** | 2591 Dallas Parkway, Suite 300, Frisco, TX 75034 · Hello@BythebookInvestigations.com · (888) 397-6352. Confirm before reuse. |
| **Team named on the live About page** | Marquita M. Booker, Haya Abusway, Yeo Ju Choi, Giovanni Pasquale |
| **Related product** | INVEXTRA (invextra.ai), "Investigation expertise, amplified". It has its own logo and icon. |
| **Framework to feature** | CLEAR By-the-Book™: Capture, Launch, Evaluate, Analyze, Report (5 steps), shown as a visual element. The live site writes the steps as "Capture the Complaint, Launch the Strategy, Evaluate the Evidence, Analyze Impartially, Report with Clarity". |

Sources: `documentation/client-brief/design-questionnaire-2026-11-16.pdf`, `documentation/client-brief/brand-bible-working-draft-v2.pdf`, and the live site (all read on 2026-11-16).

## 3. Brand and design brief

### Colors

| Job | Name | Hex | Contrast on white | Notes |
|---|---|---|---|---|
| Authority, headers, emphasis | Burgundy / Bordeaux | `#4C0013` | 15.95:1 | |
| Structure, navigation, **body text on light backgrounds** | Deep Navy | `#0A1A33` | 17.38:1 | **Decided 2026-11-16: this is the navy.** The INVEXTRA logo keeps its own `#001E3D` untouched. |
| Dividers, borders, secondary; text on dark backgrounds | Silver / Cool Gray | `#8A8D8F` | 3.34:1 | Too light for text on white. 5.2:1 on navy and 4.77:1 on burgundy, so it works for text there. |
| Micro-accents only | Muted Copper | `#8C5A2B` | 5.81:1 | INVEXTRA and AI touches only. Never a large area. 2.99:1 on navy, so never for text on navy. |

- **Decided 2026-11-16:** body text on light backgrounds is navy, not the silver the brand guide assigns, because silver fails AA contrast. **Raise this with Marquita when showing her the homepage** (Section 8).
- The client's stated balance for the **website**: navy and silver carry the structure, burgundy is for authority and emphasis, lots of white space, copper stays tiny. (The brand guide's "60% Bordeaux" describes the brand overall; the questionnaire answer is about the site.)
- Avoid: bright or saturated colors, pastels, neon, teal, green.

### Type
- Sans-serif for body and most text: Inter, IBM Plex Sans or Source Sans 3.
- Serif for headlines and brand statements, used sparingly: Lora, Merriweather or Libre Baskerville.
- **Decided 2026-11-16: headings are Libre Baskerville, body text is Source Sans 3.** Both are on her brand guide's lists.
- Both are self-hosted in `fonts/` as Latin-subset WOFF2 (handbook Section 7), downloaded from Google Fonts' own font files. Each is a **variable font**: one file holds every weight, so there is one file per style instead of one per weight.

| File in `fonts/` | Style | Weights it covers | Size |
|---|---|---|---|
| `libre-baskerville-v24-latin-variable.woff2` | upright | 400–700 | 33 KB |
| `libre-baskerville-v24-latin-variable-italic.woff2` | italic | 400–700 | 31 KB |
| `source-sans-3-v20-latin-variable.woff2` | upright | 200–900 | 28 KB |
| `source-sans-3-v20-latin-variable-italic.woff2` | italic | 200–900 | 28 KB |

Both fonts are under the SIL Open Font License (free for commercial use, self-hosting allowed). The license texts are in `documentation/font-licenses/`.

**`@font-face` rules for the top of `css/global.css`** (paths are relative to the CSS file):

```css
@font-face {
  font-family: "Libre Baskerville";
  src: url("../fonts/libre-baskerville-v24-latin-variable.woff2") format("woff2");
  font-weight: 400 700;   /* a range, because the file is a variable font */
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Libre Baskerville";
  src: url("../fonts/libre-baskerville-v24-latin-variable-italic.woff2") format("woff2");
  font-weight: 400 700;
  font-style: italic;
  font-display: swap;
}
@font-face {
  font-family: "Source Sans 3";
  src: url("../fonts/source-sans-3-v20-latin-variable.woff2") format("woff2");
  font-weight: 200 900;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: "Source Sans 3";
  src: url("../fonts/source-sans-3-v20-latin-variable-italic.woff2") format("woff2");
  font-weight: 200 900;
  font-style: italic;
  font-display: swap;
}

:root {
  --font-heading: "Libre Baskerville", Georgia, "Times New Roman", serif;
  --font-body: "Source Sans 3", Arial, Helvetica, sans-serif;
}
```

- Preload only the files used above the fold, normally the two upright ones: `<link rel="preload" href="fonts/source-sans-3-v20-latin-variable.woff2" as="font" type="font/woff2" crossorigin>`.
- If the design never uses an italic of one family, delete that file and its rule so it is not shipped.
- Her brief asks for sans-serif dominance with the serif used sparingly, so Libre Baskerville is for headlines and brand statements only.

### Look and feel
- Wants visitors to feel: confident in the firm's expertise, trustworthy, elevated and polished, modern, authoritative. Style: refined and upscale.
- Sites she likes: kirkland.com/services (crisp, mostly monochrome, clean sans-serif, white space), brunswickgroup.com (editorial layout, a model for the CLEAR framework and any insights pages), bakermckenzie.com/en (deep navy, warm white, one accent, minimal navigation), centerviewpartners.com ("quiet luxury").
- Keep from the current site: the colors, the By-the-Book logo and the firm name treatment. Everything else is open.
- **Do not use:** stock imagery (especially smiling businesspeople, handshakes, gavels, scales of justice), clip-art icons, heavy gradients, drop shadows, sliders or carousels, anything cluttered, anything that looks like a generic law-firm theme or a sales landing page.
- Where there is no real photo, use abstract, textural or brand-driven graphics, never stock people.
- Typography and structure carry the design: clean grid, ample white space.
- **Animation: subtle, linear transitions only.**
- Mobile-first and fast. Meet AA contrast.
- **Two separate primary buttons:** "Schedule a Conversation" (services) and "Join the INVEXTRA Waitlist" (goes to invextra.ai). The INVEXTRA button is kept visually separate, so it reads as proof of depth and not a competing offer.

### Voice (for any copy written or edited)
- Authoritative, concise, evidence-based, calm. Plain language, no jargon, no fluff, never sales-driven or dramatic.
- Speak to the buyer's pressures directly: workload, scrutiny, legal exposure.
- Preferred verbs: protect, support, clarify, strengthen, verify, streamline.
- Never say "we care". Show it through command of the problem.

## 3a. Scope (from the final proposal, dated October 20, 2026)

Source: `documentation/client-brief/website-proposal-final-2026-10-20.pdf` (read 2026-11-16). This is the agreed scope.

| Page | Purpose | Planned address |
|---|---|---|
| Home | First impression: who they are, what they do, clear next steps | `/` |
| About | The firm, its expertise, what builds trust | `about/` |
| Services | Service cards covering everything offered. **Each service links to its own detail page** (included at no extra charge). | `services/` and `services/<service-name>/` |
| The Investigation Capacity | Dedicated landing page for this service, with **Calendly booking built in** (Calendly's own follow-up emails included) | `investigation-capacity/` |
| Contact | **Two forms switched with tabs:** a general contact form and a consultation request form. She gets an email for every submission. | `contact/` |

- **Not included:** an automatic reply to the person who submits the contact form (optional extra, $80). A client portal (on hold; a separate phase and quote).
- **No blog or articles are in scope.** The current site has about 48 posts, so every one needs a redirect or retire decision (Section 4 and Section 9).
- Calendly runs on her own account; MigsFlow builds and connects it. Use a facade so it doesn't load until needed (handbook Section 8).
- Price: $1,250 lump sum, 50% upfront and 50% at launch. Timeline: 2–5 weeks, depending on content and feedback.
- The planned addresses above are working names used in the navigation. They are **not final** (Section 9).
- The service list (which services get cards and detail pages) is not in the proposal. It comes from her content.

## 4. The current site (first look, 2026-11-16)

This is a first look, not the full audit that handbook Section 18 requires.

**What it is**
- Squarespace. Menu: Home, About, Services (Fair Housing Workshops, Service Plans), Blog, Resources (Workplace Investigations Guide), Contact, and a button "Schedule a Needs Assessment Call!".
- The homepage opens with a full-screen stock video of a meeting, then the tagline on navy, then sections such as "It starts with one mishandled investigation", "You've been burned before", "Why organizations get investigations wrong", "Who we've worked with", "The By-the-Book Effect", testimonials and a closing call to action.
- A "Download your free guide: 5 Steps to Defensible Findings" pop-up appears on load.
- The meta description is just the business name.

**How it lines up with what she said**
- "Templated and generic": a stock video hero, stock photos of smiling teams, all-caps condensed headings and a load-time pop-up. All four are on her own "avoid" list or against the handbook.
- "The colors and logo work": confirmed. Burgundy headings, navy bands and the cube logo are the recognisable parts.
- The copy is strong and already matches the brand voice. Much of it can carry over.

**What matters for structure**
- The sitemap lists about 95 URLs. Many are leftovers from an earlier business, Course Correction Consulting (paths starting `cci-`, DEI articles, masterminds, a shop), plus Squarespace placeholders (`/blog-3-1/blog-post-title-one…`), old drafts (`/old-home`, `/home-in-progress`) and duplicates (`/about` and `/about-us`, `/contact` and `/contact-us`).
- Two blogs exist: `/articles` (29 older posts, mostly DEI topics) and `/cci-blog` (about 19 investigation posts, several duplicated).
- Pages that reflect the current business: `/third-party-investigations` (the fullest page, including the CLEAR framework), `/fair-housing-workshops`, `/service-plans`, `/investigation-readiness-intensive`, `/investigations-guide`, `/invextra-waitlist`, `/about-us`, `/contact-us`, `/schedulecall`, `/privacy-policy`.
- Two testimonials on the homepage name "Course Correction Consulting", not By-the-Book. Ask which testimonials to keep.
- **Every one of these URLs needs a decision** (keep, redirect or retire) in the URL map before launch. The proposal has no blog, so the posts are redirected or retired unless she asks otherwise.

## 5. Files in this folder

| Path | What it is |
|---|---|
| `CLAUDE.md` | This file |
| `handbook/CLAUDE.md` | MigsFlow handbook v2.1 (HTML, CSS, JS), with its change log in Section 22 |
| `handbook/project-checklist-template.md` | The blank project checklist |
| `documentation/project-checklist.md` | This project's checklist |
| `documentation/client-brief/` | Her design questionnaire, brand guide and the final proposal (git-ignored) |
| `documentation/source-images/` | Original files exactly as she sent them (git-ignored). Never edit these; make web versions from them. |
| `documentation/private/` | For the proposal, agreement and anything personal (git-ignored) |
| `index.html` | Homepage. So far: header and navigation, hero. |
| `css/global.css` | Fonts, design tokens, reset, buttons, header and navigation, back-to-top. Shared by every page. |
| `css/styles.css` | Homepage only (the hero so far) |
| `css/no-js.css` | Loaded only when JavaScript is off, so the phone menu still shows |
| `javascript/global.js` | Phone menu and back-to-top button |
| `images/backgrounds/` | Web-ready background images (originals are in `documentation/source-images/backgrounds/`) |
| `fonts/` | The four self-hosted font files (table in Section 3) |
| `documentation/font-licenses/` | License texts for the two fonts |
| `images/brand/` | Web-ready logos |
| `images/headshots/` | Web-ready team photos |
| `.gitignore` | Keeps the three folders above, `.DS_Store` and `node_modules/` out of Git |

### Web-ready images (made 2026-11-16)

| File (each has `.webp` plus a fallback) | Size | Weight (WebP / fallback) | Notes |
|---|---|---|---|
| `images/brand/by-the-book-logo` (.png) | 480×363 | 36 KB / 72 KB | Made from the vector PDF, transparent background, edges trimmed. **Dark-colored only: it disappears on navy or burgundy.** |
| `images/brand/invextra-logo` (.png) | 498×125 | 3 KB / 6 KB | Transparent background, edges trimmed. Dark-colored only. |
| `images/brand/invextra-icon` (.jpg) | 467×467 | 3 KB / 7 KB | The file she sent is a picture of the icon on a white card with a shadow, not a clean square icon. |
| `images/headshots/headshot-name-needed` (.jpg) | 1000×1333 | 57 KB / 127 KB | Source file was just "Headshot.png". Rename once we know who it is. |
| `images/headshots/headshot-name-needed-m` (.jpg) | 600×800 | 23 KB / 48 KB | Mobile size |
| `images/headshots/giovanni-pasquale-headshot` (.jpg) | 1000×916 | 103 KB / 153 KB | Source "Gio Headshot (2).jpg"; full name taken from the live About page |
| `images/headshots/giovanni-pasquale-headshot-m` (.jpg) | 600×550 | 46 KB / 62 KB | Mobile size |
| `images/headshots/haya-abusway-headshot` (.jpg) | 200×200 | 3 KB / 5 KB | Source is only 200×200 and slightly tilted. Usable only as a small thumbnail. |

- Logos stay PNG with a WebP copy, not JPG, because JPG has no transparency and would put a white box behind them.
- Headshots are uncropped. Once the design sets the team-photo shape (for example square or 4:5), re-crop all of them to match from `documentation/source-images/`, at 2× the displayed size (handbook Section 6).
- The logo can become an SVG later (the source PDF is vector, made in Illustrator). No converter is installed on this Mac; an SVG export from the client's designer would be the cleanest route.

### Background images (made 2026-11-16, supplied by Miguelle)

| File in `images/backgrounds/` (`.webp` + `.jpg`) | Size | WebP weight | Used |
|---|---|---|---|
| `hero` | 1672×941 | 39 KB | Homepage hero, tablets and up |
| `hero-m` | 720×1210 | 22 KB | Homepage hero on phones. A tall crop of the same image, placed so the burgundy line sits low, under the text. |
| `silver-navy-diagonal` | 1671×941 | 132 KB | Not yet. Over the handbook's 100 KB limit for backgrounds; recompress or resize when it is used. |
| `navy-silver-staircase` | 1672×941 | 51 KB | Not yet |
| `layered-paper-edges` | 1671×941 | 86 KB | Not yet |

Also added: `images/brand/by-the-book-logo-sm` (280×212, 19 KB WebP), the small logo used in the header.

### Still in `documentation/source-images/` and not used
- `IMG_1708.MOV` (9 seconds, 17.7 MB, vertical phone video, dated earlier than the other files). It does not look like client material. Miguelle to confirm whether it belongs here.
- `by-the-book-logo-from-pdf-3335px.png`: a large transparent render of the logo PDF, for making other sizes.

### Not in this folder
The signed agreement (`By-the-Book-Website-Development-Agreement.docx` in `~/Downloads`) has not been read. Earlier proposal drafts in `~/Downloads` are superseded by the final proposal above.

## 6. Decisions

| Date | Decision |
|---|---|
| 2026-11-16 | **Built in plain HTML, CSS and JavaScript** under handbook v2.1, hosted on Netlify. Next.js + Tailwind was considered and dropped for this site: it is a brochure site, the client asked for fast mobile loading, and Miguelle does not want to deliver client work in a stack still being learned. The Next.js handbook (v3.0) is kept for app-like builds at `New Web Design Folder/MigsFlow Handbook/v3.0-nextjs-tailwind/`. |
| 2026-11-16 | Navy is `#0A1A33` everywhere on the site. The INVEXTRA logo is used as supplied. |
| 2026-11-16 | Body text on light backgrounds is navy `#0A1A33`. Silver `#8A8D8F` is for dividers, borders and text on dark backgrounds. |
| 2026-11-16 | Fonts: Libre Baskerville for headings, Source Sans 3 for body text. |
| 2026-11-16 | The header and navigation stay **white** so the dark logo shows. Navy starts at the hero. |
| 2026-11-16 | Hero uses `images/backgrounds/hero` (navy texture with a burgundy diagonal line). |
| 2026-11-22 | **Hero background is an animated line drawing made in code** (scattered lines settle into one level line), replacing the conference-room photo, after her round-two feedback asked for a more ownable hero. First draft, awaiting Miguelle's and then her review. |
| 2026-11-16 | Buttons: burgundy on white backgrounds, white on navy backgrounds (burgundy disappears against navy). All buttons fill from the bottom on hover. |
| 2026-11-16 | Motion is linear and short (0.25s), per her brief. The only staged animation so far is the phone menu. |
| 2026-11-16 | Logos live in `images/brand/` (the handbook's name for that folder) and team photos in `images/headshots/`. |

Project-specific exceptions to the handbook: none.

## 7. Current state and next steps

**State at the end of 2026-11-17 (where to pick up):** the homepage has its header and navigation, hero, and services section (three grouped cards). Nothing else is built. The folder is not a Git repository yet and nothing is deployed. The change log in Section 10 has the detail of each change; where it differs from the summary below, the change log is newer.

**Pick up here next session**
1. **Her final copy is in** (`documentation/client-brief/`: `Services Page (Final).docx`, `Homepage and About Us.docx`). The homepage services cards use it; **the rest of the homepage does not yet** (see the 2026-11-18 change log entry for the full comparison). Decide with Miguelle whether to realign the homepage to her 14 sections before building the inner pages.
2. The **"Our process" (CLEAR framework) section is built** (2026-11-17, see the change log). Miguelle to review it.
3. **Every homepage section and the footer are built** (2026-11-18), with entrance and scroll animations. Next: Miguelle's review of the whole page, then the inner pages (Services and its detail pages, About, Investigation Capacity, Contact, Privacy Policy).
4. Still to do before launch: full audit of the current site and the URL map, the inner pages, the launch files (favicons, manifest, `og:image`, schema, `robots.txt`, `sitemap.xml`, `404.html`), `git init`, and a Netlify preview.

**How the site is being built:** section by section. Miguelle reviews each section before the next one starts, and sometimes edits the CSS directly, so read the current files before changing them.

**What exists on the homepage**
- **Header:** white, sticky, logo left. On phones a two-bar menu button; from 992px (62rem) a row of links plus a burgundy "Schedule a Conversation" button.
- **Phone menu:** a white panel that fades and slides in under the header and fills the screen. The links, then the button, then the contact details fade in one after another (70ms apart). It closes with the button, Escape or a link tap, and the page behind doesn't scroll while it is open. It holds the five links, the "Schedule a Conversation" button, and her phone, email and address.
- **Hero:** the `h1`, a supporting sentence and a white "Schedule a Conversation" button over the hero background. Below it, in its own band, "INVEXTRA: Investigation expertise, amplified." with an outline "Join the INVEXTRA Waitlist" button.
- **Services:** three grouped cards and a navy "View all services" button (stand-in service list).
- **Our process:** navy section over the staircase photo; heading, paragraph and button, plus five numbered step cards that open and close.
- **Back-to-top button:** in place (it appears once there is enough page to scroll).

**Checked on 2026-11-16:** screenshots at 320, 360, 390, 768, 1024 and 1440 pixels wide, plus the open menu at 320 and 390. No overflow or clipped text. `global.js` passes a syntax check.
**Not yet checked:** the menu animation in a real browser (only its open and closed end states were screenshotted), real phones, Safari and Firefox, keyboard and screen reader passes, PageSpeed (needs a deployed URL).

**Known gaps on the page (deliberate, to finish later)**
- The nav links and buttons point at pages that don't exist yet (`about/`, `services/`, `investigation-capacity/`, `contact/`), so they give "not found" for now.
- No `og:image`, schema, `robots.txt`, `sitemap.xml` or `404.html` yet (the favicon set and `site.webmanifest` were added on 2026-11-18).
- The footer was added on 2026-11-18 with her tagline. (Older note follows.) It was left out of the hero on purpose to keep it quiet; it belongs in the next section or the footer.
- Title and meta description are drafts.

**To preview the page:** open the project folder in VS Code, right-click `index.html` and choose "Open with Live Server".

**Next steps**
1. Miguelle reviews the header and hero.
2. Next homepage section (Miguelle to say which).
3. Full audit of the current site and the URL map (handbook Section 18, checklist Sections 3 and 4).

## 8. To raise with Marquita

**When showing her the homepage**
1. **Body text is navy, not silver.** Her brand guide assigns silver `#8A8D8F` to body text, but on white it measures 3.34:1 and the AA standard she asked for needs 4.5:1. Navy passes easily. Silver is still used for dividers, borders and text on dark backgrounds.
2. **Navy is `#0A1A33`**, as in her brand guide. Her INVEXTRA logo keeps its own slightly different navy, which answers the question she asked in the questionnaire.

3. **Hero wording is a draft.** The headline "Workplace investigations that hold up to scrutiny." and the sentence under it were written from her own mission statement and site copy. She should approve or replace them.

4. **Process section wording is a draft.** The five CLEAR steps and their text were condensed from her current Third-Party Investigations page. She should approve or replace them.

5. **About section:** confirm the photo sent as "Headshot.png" is her, how her name and title should read ("Marquita M. Booker, Founder and Chief Legal Officer" is used), and approve the wording, which is assembled from her current site.

6. **Proof section:** confirm the three testimonials used (Maedgen, Chrispin, Levingston), the people's current titles and their permission; and send the names and logo files for "Who we've worked with", with each organisation's agreement to be shown.

7. **Closing call to action:** the fire wording appears in two neighbouring sections; confirm "30 minutes" and the button wording ("Schedule a Conversation" or her current "Get Your Investigation Strategy Audit").

**Follow-ups on images**
3. A larger copy of the **Haya Abusway** headshot. The one sent is 200×200.
4. The two photos listed in her questionnaire that did not arrive: `Professional_Photo_5` and `YJC_headshot` (probably Yeo Ju Choi).
5. Who is in `Headshot.png`, and each team member's name as it should appear, title and bio.
6. A **light (white or reversed) version of both logos** for dark backgrounds. The ones supplied are dark and vanish on navy or burgundy. An SVG of each logo would be ideal.
7. A clean square INVEXTRA icon, if the icon is to be used on the site.

**Other open questions**
8. Fonts were chosen by Miguelle from her brand guide's lists (Libre Baskerville and Source Sans 3). Mention it at the homepage review.
9. Imagery: her brand guide says "real professionals in real settings" and she wants no stock. Only headshots have arrived. Will she supply more photos, or do brand graphics carry the hero and sections?
10. "Schedule a Conversation": where it goes (a booking tool, a form or email), and where form submissions go.
11. Which testimonials to keep. Two on the current homepage refer to Course Correction Consulting.
12. Which blog posts and old pages come across (Section 4).
13. Domain and access: registrar, DNS, email host, and whether GA4, Search Console and a Google Business Profile exist (checklist Section 2).
14. Legal: disclaimers, license numbers, and the privacy policy. Contact forms on this site should tell visitors not to include confidential case details.

## 9. To confirm before launch

**Page addresses (decide later; do not launch without this)**
- **What address should each link use: the ones she has now, or new ones?** For example, her current site uses `/about-us`, `/contact-us`, `/third-party-investigations` and `/schedulecall`, while the new navigation currently points at `about/`, `contact/`, `services/` and `investigation-capacity/`.
- Keeping an existing address means no redirect and no risk to that page's search ranking. Changing it means a 301 redirect from the old address (handbook Sections 12 and 18).
- Whatever is decided, every one of the roughly 95 old addresses needs a row in the URL map: keep, redirect or retire.
- When decided, update the links in the header (and later the footer), the canonical tags and the sitemap.

**Other things to confirm**
- **The list of services** and the wording for each (Miguelle is asking her). The homepage list is a stand-in from her current site.
- **The "Our Process" menu name** for the CLEAR framework section.
- **The framework's name is settled for now: "CLEAR By-the-Book™"**, from her questionnaire (Miguelle's decision, 2026-11-17). Her live site says "CLEAR Investigation Framework™"; mention the difference when she reviews.
- **The name of the fourth page.** The proposal calls it "The Investigation Capacity"; the menu currently says "Investigation Capacity". Her live site has an "Investigation Readiness Intensive" page, which may be the same service.
- **Where "Schedule a Conversation" goes.** It points at `contact/` for now. It could instead open the consultation tab of the contact form, or Calendly.
- ~~The INVEXTRA waitlist address.~~ **Settled 2026-11-18: the button goes to `https://invextra.ai/`.** Her questionnaire says so in her own words ("Join the INVEXTRA Waitlist" (routes to invextra.ai)). Do not ask her again.
- **Contact details in the phone menu:** (888) 397-6352, hello@bythebookinvestigations.com, and 2591 Dallas Parkway, Suite 300, Frisco, TX 75034. Copied from her current site; confirm they are current and that she wants the street address shown.
- Whether `IMG_1708.MOV` (in `documentation/source-images/`) belongs in this project.
- Whether the GitHub repo will be private. The client brief and original images are git-ignored either way, so they exist only on this Mac unless backed up elsewhere.

## 10. Change log

Newest first. One entry per working session or per significant change: what changed, which files, and anything left unverified.











### 2026-11-24 (later): numerals filled in; questions section restyled
- **Miguelle did not like the hollow (outline-only) numerals.** "101." in section 7 and "01 / 02 / 03" in "How it starts" are now **solid burgundy**, same size and position as before. The `-webkit-text-stroke` / `paint-order` rules are removed from `css/styles.css`. (The entry below describes them as hollow; this replaces that.)
- **"Questions we get asked"** (`css/styles.css`, heading in `index.html`): each question is now its own white card with a navy left edge and a small gap between cards; the **open card turns navy** with white text, so it is clear which answer is being read; a closed card's edge turns burgundy on hover; the questions are set larger; the heading is larger with "Questions" as the emphasised word (`.accent`). The accordion script (global.js, section 7) is unchanged. Without JavaScript the browser's own `open` attribute gives the navy state.
- **Checked** by automated browser at 390 and 1440 wide: clicking a question opens it and turns it navy; screenshots of the three sections. Not checked: real phones, Safari, Firefox, keyboard focus on the navy card.
- **Noticed, not changed:** two answers in this section still say "matter" ("your specific matter", "a sensitive matter"). Her copy corrections ask for "case"; that pass has not been done yet.
- Committed, not pushed.

### 2026-11-24: lines that trace in (section 4); sections 7, 9, 11 and 12 reworked
All at Miguelle's request. Miguelle will review; nothing has been shown to Marquita. Committed, not pushed.
- **New in `javascript/global.js` (section 4, part d): `data-draw`.** A tripwire for lines that draw themselves. When an element with `data-draw` scrolls into view it gets the class `is-drawn` for good; `data-draw=".standard"` puts the class on the nearest ancestor matching that selector instead. The CSS does the drawing. Pattern used everywhere: the "hidden" rule starts with `html.js` and `:not(.is-drawn)`, and the `transition` is attached to `.is-drawn`, so hiding at page load is instant and only the drawing animates.
- **Section 4 ("rigor and humanity").** The joining lines are now two overlapping SVGs (`.standard__join-line`), uncovered from the top down with `clip-path`: the left line, then the right, then the navy part of the straight line grows down, then its white part inside the band. Triggered when "Neither gives an organization what it needs." scrolls into view. About 2.25 seconds in all.
- **Section 7 (Readiness Intensive): the navy two-half panel is gone** (Miguelle: it sat directly under the navy CLEAR section). Now a white section: the section name as a small burgundy label (still the `h2`), then "Not Investigations" large and solid with "**101.**" as hollow outlined numerals and a level line that draws from it to the screen edge. On phones "101." drops to its own line, larger. Below: her second sentence and the navy button on the left, her three paragraphs on the right, with the four gaps two by two. Her tagline is now two `<p>` elements (`.intensive__big`, `.intensive__sub`). Wording unchanged. The copper tint is no longer used.
  - Hollow numerals: text filled with the background colour, a thick burgundy `-webkit-text-stroke`, and `paint-order: stroke fill`. Browsers without those get solid burgundy digits.
- **Section 9 ("An outside investigator protects the finding").** The contour photo is replaced by a vector drawing, `images/illustrations/contours.svg` (17 KB, generated: six groups of nested rings), set as a CSS background at **16% opacity** (`.independence__bg`; the old photo was far stronger). Angled dividers added top (pale grey, the INVEXTRA section above) and bottom (white). No longer used, still in the folder: `images/backgrounds/navy-contours*`.
- **"Organizations we've served"** is now a compact pale grey strip: heading on the left and the logo table on the right on desktop, stacked on phones, with less padding. The divider at the foot of the testimonials section (`.proof__divider`) is filled pale grey to match.
- **Section 12 ("How it starts")**: white with angled pale grey edges top and bottom; heading larger and centred on desktop; each step has a large hollow numeral; the timeline line is one element (`.steps::before`) that draws in, down the left on phones and across to the right screen edge on desktop.
  - A burgundy version was considered and dropped: the closing call to action just below is already burgundy.
- **Checked** by automated browser at 390 and 1440 wide: every section in screenshots; the section 4 tracing measured at four moments and it runs in order; `is-drawn` lands on all three targets; no sideways scrolling; no script errors. **Not checked:** real phones, Safari and Firefox (the hollow numerals and `clip-path` tracing are the parts most worth seeing there), tablet widths.

### 2026-11-23 (night): Per Scholas added to "Organizations we've served" (her point 5)
- Her point 5 was cut off in the feedback document ("Clients: Add"). **Resolved:** Miguelle says she asked for Per Scholas to be added, and pasted the logo she wants (lime green wordmark on a dark background).
- **New file: `images/logos/per-scholas.svg`** (7 KB). The picture Miguelle pasted was only 140 pixels wide, too small to use, so the file was built from the wordmark drawing in the header of perscholas.org (their own vector artwork, lime `#E5FE77`), set on the dark background colour sampled from her picture (`#232428`). It is an SVG, so it needs no WebP version and no `<picture>`.
- `index.html`: a tenth `<li>` in the logo list, alt text "Per Scholas". `css/styles.css`: ten logos no longer fit a 3 x 3 table, so the table is now **two across on phones (five rows) and five across from 48rem up (two rows)**; `.orgs__logo--boxed` fits a logo that has no `<picture>` around it.
- Like the others it is grey until pointed at, then shows its own colours. Its dark box is heavier than the white-background logos beside it (Skyers Law Group is the only other dark one).
- Checked in screenshots at 390, 768 and 1440 wide, at rest and on hover. Committed, not pushed.
- **To confirm with her** (already on the list in Section 9 for the other nine): that Per Scholas may be shown, and that this is the version of their logo she wants.

### 2026-11-23 (evening): emphasised words in two headings; Readiness Intensive rebuilt as a two-half panel (her point 4)
- **Miguelle's reading of her point 4:** she is not asking for more decoration; she wants visual hierarchy and deliberate variation in layout from section to section. One tool for that: emphasise a key word in a heading.
- **New global class `.accent`** (`css/global.css`): `<em class="accent">word</em>` makes one word of a heading burgundy and italic. For headings on white or pale grey only. Used so far: "**When** would you bring us in?" and "An outside investigation shouldn't become another **problem** to manage" ("problem" was Miguelle's choice; "When" was Claude's, change freely). Candidates for the other headings as each section is reworked.
- **Investigation Readiness Intensive** rebuilt after Miguelle's mock-up ("Option 2, dark statement panel"). `index.html`, `css/styles.css`: one panel in two halves. Navy half: the section name as a small capitals label (still the `h2`), "Not Investigations 101." very large with "101." on its own line in light copper, the second sentence of her tagline, and the button. Pale grey half: her first sentence slightly larger and bold, the four gaps, and her two remaining paragraphs. Phones: navy half on top. Desktop (62rem up): side by side. The old sticky left column is gone, and the heading no longer uses the word-by-word reveal.
- **Differences from the mock-up, on purpose:**
  - **Her wording is kept in full.** The mock-up shortened the four gaps and cut the last paragraphs; the content-integrity rule (Section 1) says not to reword her copy. Shortening would need her sign-off.
  - "101." is `#B98A5E`, a lighter tint of the brand copper, because `#8C5A2B` is too dark to read on navy (2.99:1; the tint is 5.7:1). Copper is reserved for INVEXTRA touches in her brand guide, so **raise this with Marquita**.
  - The button is the filled white one (`btn--light`), not an outline: the page's rule is that every "Schedule a Conversation" button is filled and only the INVEXTRA button is an outline.
- **Checked:** screenshots at 390 and 1440; the word "Investigations" measured against its panel at ten widths from 320 to 1920 and fits at all of them; no sideways scrolling. **Not checked:** real phones, Safari, Firefox.
- The "Not Investigations 101." sketch in `documentation/previews/human-and-rhythm.html` is superseded by this.
- Committed, not pushed.

### 2026-11-23 (later still): "rigor and humanity" section: centred heading on larger screens, angled dividers on the burgundy band
- Miguelle's requests. `css/styles.css`: from 48rem up, `.standard__title` and `.standard__lead` are centred (phones stay left-aligned).
- `index.html` + `css/styles.css`: the burgundy band now has the page's angled divider shape at its top and bottom (`.standard__band-divider`, white fill; the bottom one is the same shape rotated). The centre line was adjusted to meet the angled edge exactly: `--edge` on `.standard__drop` is how far down the divider the edge sits in the middle of the screen (36% of `--divider-h`), so the navy part ends and the white part starts on the edge.
- Also at Miguelle's request: the "When would you bring us in?" heading (`.when__title`) is centred from 48rem up.
- Checked in screenshots at 390 and 1440 wide; no sideways scrolling. Committed, not pushed.

### 2026-11-23 (later): sideways fade on the reasons; "rigor and humanity" section rebuilt, same look on phones
- **"When would you bring us in?"**: Miguelle asked for the reasons to fade in from the side their line starts on. Each situation's words (and the two italic "Sometimes" lines) now sit in a `<span class="when__words">`, which fades in sideways: left to right for the ones on the left, right to left for the ones on the right. Done with a sliding CSS mask (`css/styles.css`, "The words fade in sideways"), so the text itself is never set to see-through. This is on top of the small slide they already had.
- **"An outside investigation shouldn't become another problem to manage"** rebuilt from sketch 2 (`index.html`, `css/styles.css`), wording unchanged:
  - The two "We have seen..." sentences are **side by side at every size, phones included** (Miguelle wanted the same look on phones), each with a rule under it. An SVG line drops from the middle of each and the two join above "Neither gives an organization what it needs.", centred.
  - One line carries on into a **full-width burgundy band**. Her third paragraph is still one `<p>`, with each sentence in its own span: "You should not have to choose between rigor and humanity." very large (`.standard__statement`, "rigor" and "humanity" in `<em>` italics), then "A sound investigation needs both.", then the rest.
  - Her closing line sits centred on white below the band. The old desktop two-column grid for this section is gone.
- **Deleted:** `documentation/previews/when-scroll.html` (the rejected scroll-pile sketch).
- **Checked** by automated browser at 320, 390 and 1440 wide: everything ends up visible, no sideways scrolling, no script errors; the sideways fade was caught mid-way in a screenshot. **Not checked:** real phones, Safari, Firefox.
- **Still a sketch only:** the large "Not Investigations 101." line (`documentation/previews/human-and-rhythm.html`, sketch 3).
- Committed, not pushed.

### 2026-11-23: "When would you bring us in?" rebuilt with alternating lines (her point 3); scroll-pile idea dropped
- **Decision (Miguelle):** the scroll-pile sketch (`documentation/previews/when-scroll.html`) is rejected: "never mind, I don't like it". Do not build it. The file is still in the folder and can be deleted.
- **Built into the site, this section only:** the alternating-lines design from sketch 1, second version.
  - `index.html`: wording and order unchanged. The situations have `data-reveal="left"` / `"right"` alternately; the list and the "Sometimes..." paragraph each carry the new `data-reveal-together`; the three "Sometimes" sentences got the classes `when__line--left`, `--right` and `--both`.
  - `css/styles.css`: the section's rules were rewritten. The grid of cells and the navy "Sometimes..." panel are gone. Situations are in the heading font with a thin burgundy line running in from the left screen edge, then the right (text right-aligned), alternating, on phones and large screens. "More capacity" comes from the left and "distance" from the right (italic, navy lines); "Sometimes you need both." is centred, larger and burgundy with a line from each edge.
  - `javascript/global.js`, section 4: new **`data-reveal-together`**. Put it on a parent and everything inside with `data-reveal` arrives at the same moment when the parent scrolls into view (Miguelle asked for "everything coming in at one time"). Documented in the comment above the reveal rules in `css/global.css`. Here there are two groups: the five situations together, then the three "Sometimes" lines together when they are reached.
- **Checked** by automated browser at 390 and 1440 wide: every item ends up visible, no sideways scrolling, no script errors; the lines are all burgundy `#4C0013` (an earlier screenshot had made the left ones look darker; measured, they are not). **Not checked:** real phones, Safari, Firefox, tablet width.
- **Still sketches only (not built):** the burgundy "rigor and humanity" band and the large "Not Investigations 101." line, both in `documentation/previews/human-and-rhythm.html`, which Miguelle liked. Next section to take is Miguelle's choice.
- Committed, not pushed.

### 2026-11-22 (late night): working scroll sketch of "When would you bring us in?" (Miguelle's pile idea)
- Miguelle's idea: the five situations fall in one by one as the visitor scrolls and pile up (the feeling of problems stacking), then straighten into one column on phones or one row on large screens, and then the "Sometimes..." lines arrive, with "both" fading up between them.
- **New file: `documentation/previews/when-scroll.html`**, a working sketch (its CSS and JavaScript are inside the file; on the real site they would move to `styles.css` and `global.js`). How it works: the section has a tall track; the heading and cards stick to the screen while the visitor scrolls its length (ordinary scrolling, nothing is frozen), and the script places each card from how far along the track the visitor is. It runs backwards when scrolling up. Each situation is a white slip with a burgundy top edge. The "Sometimes..." lines keep the left / right / both treatment and animate in when reached.
- Safety nets: with "reduce motion" on, with JavaScript off, or if the heading and cards do not fit the screen, there is no pile: the tidy cards are simply shown.
- Settings at the top of the script: tilt and offsets of each card, when each falls, when the pile straightens, how smoothly it follows the scroll; the scroll length is the `190vh` in the CSS.
- **Checked** by automated browser at 390 x 844, 375 x 667 and 1440 x 900, at several scroll positions; no script errors. **Not checked:** a real phone (touch scrolling and the browser's moving address bar are where this kind of effect most often misbehaves), Safari, Firefox.
- To adapt for the real site: the stage must stick below the site header (`top: var(--header-h)`), not at the top of the screen.
- **Waiting on:** Miguelle's verdict after trying it on a phone. The homepage section is unchanged. Committed, not pushed.

### 2026-11-22 (night, later): sketch 1 ("When would you bring us in?") redrawn after Miguelle's review
- Miguelle's verdict on the three sketches: likes all three on large screens, but sketch 1 looked plain and lost its character on phones (one column of dashes), and the navy "Sometimes..." box felt dropped in. **Most visitors will be on phones, so every treatment must carry over to phones.** Sketches 2 and 3 were not changed.
- `documentation/previews/human-and-rhythm.html`, sketch 1, second version: the situations alternate, a line from the left screen edge, then one from the right (text right-aligned), on phones and large screens alike. The navy box is gone: "more capacity" comes from the left, "distance" from the right, and "Sometimes you need both." sits centred, larger and burgundy, with a line reaching it from each edge.
- Seen in screenshots at 390 and 1440 wide. Still a sketch: the homepage section is unchanged. Committed, not pushed.

### 2026-11-22 (night): sketches for her points 3 (human element) and 4 (visual rhythm); nothing built on the site
- **New file: `documentation/previews/human-and-rhythm.html`.** A sketch sheet (not part of the website, not linked; borrows `css/global.css`, the rest of its CSS is inside the file). Three homepage sections redrawn, her wording and order unchanged, no animation:
  1. **"When would you bring us in?"**: the five situations as large serif lines, staggered left and right, each with a thin line running in from the screen edge (plain stack on phones). In "Sometimes...", two lines join into one beside "Sometimes you need both."
  2. **"Rigor and humanity"**: a line drops from each "We have seen..." sentence, the two join at "Neither gives an organization what it needs.", and one line continues into a full-width **burgundy band** where "You should not have to choose between rigor and humanity." is set very large ("rigor" and "humanity" in italics), followed by the rest of her paragraph. Her closing line sits below on white.
  3. **"Not Investigations 101."**: the largest type in the Readiness Intensive section, in burgundy, with a level line running off to the right edge; the section name becomes a small label above it (still the `h2`).
- Seen in screenshots at 390 and 1440 wide. Weakest part: the small joining lines beside "Sometimes..." look cramped.
- **Waiting on:** Miguelle's decision on each of the three before anything is built into `index.html`. Committed, not pushed.

### 2026-11-22 (evening, later): CLEAR section: staircase photo replaced by the plumb-line photo
- Miguelle asked to remove the staircase photo and use one of the new pictures from `documentation/source-images/`. Chosen: "Copper Plumb Bob on Navy Wall" (the two linework pictures would have put more lines behind the line-drawn marks).
- It is **not a full background**. At full size the weight landed behind the fourth and fifth columns of text, so it is placed in the empty top right corner beside the heading, fading out to the left and bottom, with the picture's burgundy band down the right edge. **Desktop only (62rem and up)**; phones and tablets get plain navy and do not download it.
- New files: `images/backgrounds/plumb-line.webp` (28 KB) and `.jpg` (75 KB), cropped from the source (right-hand 936 x 1024 pixels). `index.html`: the `<picture>` became an empty `<div class="process__bg">`. `css/styles.css`: the picture and its fade ("mask") are set in the desktop media query; the navy sheet over the old photo (`.process::before`) is gone.
- No longer used, still in the folder: `images/backgrounds/navy-silver-staircase*`.
- Note: the weight is copper, which the brand guide keeps for INVEXTRA touches. Raise with Marquita when she reviews.
- Checked in screenshots at 1024 and 1440 wide. Committed, not pushed.
- **Next:** her points 3 (human element) and 4 (visual rhythm). Ideas given to Miguelle; nothing built yet.

### 2026-11-22 (evening): CLEAR section rebuilt around the five marks, with animation (her point 2)
- Miguelle approved direction 1 ("five states of the line") and asked for it to be built with animation.
- `index.html`: the five rows (`.clear__row`) became five phases (`.clear__step`), each with an inline SVG mark (`.clear__mark`: five thin `.clear__line` paths plus a heavier `.clear__accent` or `.clear__point`), the big letter, the name and her description. Wording unchanged. The marks are complete drawings in the HTML, so they show with JavaScript off.
- `css/styles.css`: the CLEAR rules were rewritten. Phones and tablets: a column, mark on the left, a thin line running down from each mark to the next. Desktop (62rem and up): five columns, the line running across from mark to mark. The row borders are gone.
- `javascript/global.js`, new section 9 "CLEAR marks": each mark draws itself once when it scrolls into view (its lines start loose and settle into shape in about a second, then the accent fades in); marks on screen together go one after another; the joining line grows when a mark finishes. No continuous movement, so no pause button is needed here. With "reduce motion" on the script does nothing and the finished marks show. Settings at the top of the section: `LENGTH`, `GAP`, `LOOSE`.
- Compared with the sketch: every mark now has exactly five thin lines (A gained a thin centre line under its accent; in R the five lines lie on top of each other as one).
- `documentation/previews/clear-marks.html`: added a simpler three-line Capture (`mark-c-small`) for sizes under about 32 pixels, because the five-line one filled in at 24. The website does not use the small version. **The marks do not exist yet as separate files** for her training materials or INVEXTRA; export them when she approves the direction.
- The staircase photo is still behind the section. Its diagonal streaks sit close to the marks; consider removing it or fading it further (Miguelle to decide).
- **Checked:** screenshots at 390 and 1440 wide, mid-animation and finished; all five marks finish and no script errors. **Not checked:** Safari, Firefox, real phones, tablet width, reduce-motion in a real browser.
- Committed, **not pushed** (same reason as the hero: Miguelle reviews first).

### 2026-11-22 (later still): CLEAR visual system, sketch only (her point 2)
- Her point 2 asks for "a recognizable visual system" for the five CLEAR phases, reusable in training materials and INVEXTRA. Four directions were discussed; Miguelle asked to see direction 1, "five states of the line": one small mark per phase, drawn from the same thin lines as the new hero (C: crossing lines held in brackets; L: five lines setting off from one point; E: lines side by side with one crossing circled; A: lines balanced around a level line; R: one line and a full stop).
- **New file: `documentation/previews/clear-marks.html`.** A sketch sheet, not part of the website and not linked from it (its CSS is inside the file on purpose). It shows the marks in a mock of the section on navy, on white, at 64/40/24 pixels in one colour, and on a mock training slide. **The CLEAR section on the homepage is unchanged.**
- Seen in screenshots at 390 and 1440 wide. Finding: at 24 pixels the C mark fills in and is hard to read; the other four hold.
- **Waiting on:** Miguelle's verdict on the marks before anything is built into `index.html`. Committed, not pushed.

### 2026-11-22 (later): hero lines keep swaying at rest; pause button added
- Miguelle asked for the resting tangle to keep moving slowly so the hero does not feel static. `javascript/global.js` section 8: after the opening animation the loose ends at the left sway continuously (each wave slides sideways very slowly; the `SWAY` setting controls the speed, 0 turns it off). The straight line does not move.
- Because the movement no longer ends, a **pause button** was added (handbook: auto-playing motion longer than 5 seconds has a pause button; WCAG 2.2.2). `index.html`: `<button class="hero__pause">` inside `.hero__stage`, hidden until the script shows it. `css/styles.css`: `.hero__pause` rules (40px outlined square, bottom right of the stage, above the level line). Its label switches between "Pause background animation" and "Play background animation".
- The drawing also stops by itself while the hero is scrolled off the screen, and with "reduce motion" on nothing moves and the button stays hidden.
- **Checked** with an automated browser at 1440 wide: lines move at rest, hold still when paused, resume, and reduce-motion shows the resting picture with the button hidden. Screenshots at 390 and 1440. Not checked: Safari, Firefox, real phones.
- Committed, **still not pushed** (waiting for Miguelle's go-ahead, see the entry below).

### 2026-11-22: round-two feedback arrived; hero photo replaced by an animated line drawing (first draft, for Miguelle's review)
- **Her feedback** is in `documentation/client-brief/By-the-Book Homepage Design Feedback Brief.docx` (round two: five creative-direction points and a list of copy corrections). Miguelle is going through it one point at a time. **Only point 1 (hero) has been worked on.** Points 2 to 5 and all the copy corrections (title "Founder" only, "CLEAR By-the-Book™ Investigation Framework" everywhere, "case" instead of "matter", new INVEXTRA wording and "Early 2027", whether the retainer nav link is needed) are **not done yet**. Her point 5 ("Clients: Add") is cut off in the document: ask her what it was meant to say.
- **Hero (her point 1: "keep the headline... a more ownable visual treatment... connected to impartial investigative work").** Miguelle's idea: scattered lines that animate into one straight line (gathering, reviewing and analysing the facts until there is a clear finding). Built as a drawing made in code (SVG), not a picture:
  - `index.html`: the `<picture>` background is gone. A new `.hero__stage` wraps the drawing (`.hero__bg` with an `<svg class="hero__lines">`) and the text. The two hero image preloads were removed. Headline and all wording unchanged.
  - `javascript/global.js`, new section 8 "Hero lines": 18 thin silver lines start scattered across the hero, gather into a bundle, are combed straight from right to left, then one bright white line is drawn along them. About 4.5 seconds, plays once, then rests as a small tangle at the left edge feeding one level line. The arrangement is the same on every visit (fixed seed). The settings at the top of the section (count, seed, timings) are safe to change. With "reduce motion" on it shows the resting picture with no movement. Without JavaScript the hero is plain navy.
  - `css/styles.css`: photo rules and the navy sheet removed; rules for `.hero__stage`, `.hero__lines`, `.hero__thread`, `.hero__finding` added; deeper bottom padding on `.hero__inner` so the lines have a clear band under the button.
  - The movement starts and stops gently (no bounce) instead of at one constant speed, because a constant-speed stop looked abrupt. Her brief says "linear" transitions; this is the one place that bends it. Change `ease()` in section 8 to `return clamp(n);` for strictly constant speed.
  - No copper in the drawing (copper is reserved for INVEXTRA touches); the finding line is white.
- **Kept as a fallback:** `images/backgrounds/hero*.jpg/.webp` (conference room) are still in the folder but no longer used. Miguelle's generated alternatives are in `documentation/source-images/` (plumb bob, copper linework).
- **Checked:** screenshots at 390, 768 and 1440 wide, at the start, middle and end of the animation; no script errors. **Not checked:** Safari and Firefox, real phones, reduce-motion mode in a real browser.
- **Committed but NOT pushed**, on purpose: pushing updates the GitHub Pages preview Marquita has seen, and Miguelle has not reviewed this draft yet. Push when Miguelle says so.
- **To do if this hero is kept:** remake the social preview image (`og:image`), which still shows the conference-room hero.

### 2026-11-18: notes and questions removed from the PDF cover
- Miguelle: the questions for Marquita go in the email, not the PDF. The cover's bullet list was removed entirely (the "homepage only" note, the testimonials note and the three questions). The cover now has only: title, one-line introduction, the hero picture at full width, the live link with one sentence about what the link shows that a PDF cannot, and the "Prepared for" line. Still 17 pages. `documentation/pdf-build/build.py` updated to match.
- **For future client PDFs: keep questions and caveats out of the PDF; they belong in the covering email.**
- The email draft (in the chat, not saved to a file) carries the three questions: founder photo and title, the nine logos, and where "Schedule a Conversation" leads.

### 2026-11-18: INVEXTRA questions dropped from the list for Marquita
- Miguelle asked why the draft message asked her about the INVEXTRA launch date and where the waitlist button should go. Neither needs asking:
  - **Where the button goes:** her questionnaire already says "routes to invextra.ai". The question was a leftover from an early note about a `/invextra-waitlist` page on her old site. Section 9 now marks it settled.
  - **Launch date:** "Planned launch: January 2027" is her wording. Re-confirming it before go-live is part of her own final publication check, not a question from MigsFlow.
- The PDF cover does not ask either question (it only mentions the launch timing as part of her own check), so the PDF was not changed.
- **Open point about scope:** Miguelle said the proposal includes remaking her **invextra.ai landing page**. The proposal on file (`documentation/client-brief/website-proposal-final-2026-10-20.pdf`, searched 2026-11-18) does not mention INVEXTRA or invextra.ai at all: its one landing page is "The Investigation Capacity", and the price covers "5 pages, service details, landing page". If an invextra.ai page was agreed somewhere else (a later proposal, an email, a call), add that document to `documentation/client-brief/` and record it in Section 3a. Until then, Section 3a stays as it is and no invextra.ai work is planned. **Resolved the same day: Miguelle confirmed the landing page in the proposal is the Investigation Capacity page, not invextra.ai.** The two are different things: the Investigation Capacity page is for her retainer service (with Calendly booking) and is in scope; INVEXTRA is her separate AI product on its own site, invextra.ai, which this project only links to.

### 2026-11-18: PDF cover reworded: testimonials are not "missing"
- Miguelle asked why the PDF said testimonials still needed confirming when they are in her document. **Miguelle is right: the four testimonials, names and titles are in her homepage document and are on the page exactly as she wrote them.** The line came from the last sentence of her own document ("Final publication check: Obtain approval for testimonial wording, titles, and client logos; confirm the anonymized founder story is appropriate to publish; and re-confirm the INVEXTRA launch timing before go-live."). That is **her** checklist to complete before go-live, not something MigsFlow is waiting on, and the old wording read as if content were missing.
- The cover now says: the testimonials appear exactly as written and her final publication check is hers to complete; and lists only the **three things actually needed from her**: whether the founder photo and title are right (the photo arrived as "Headshot.png" with no name, and her new copy gives no title), whether the nine logos taken from her current site are the set she wants, and where "Schedule a Conversation" should lead. The cover picture was made slightly smaller so the cover still fits one page (17 pages total).
- **Correction for the notes above and Section 8:** treat the testimonials as supplied and final. Do not ask her to "confirm" them again; at most, remind her of her own publication check.

### 2026-11-18: handbook v2.2; preview image remade to the Open Graph rules; client preview PDF
- **Handbook updated to v2.2** (Miguelle's request), in the master (`New Web Design Folder/MigsFlow Handbook/CLAUDE.md`) and in this project's copy (`handbook/CLAUDE.md`):
  - every site's link preview image is a picture of the **homepage hero** (`images/social/og-home.jpg`), with the Open Graph requirements written out (1200 x 630, under 300 KB, important content inside the middle 630 x 630, full `https://` addresses, preview address during review and live domain at launch, the full tag list, remake when the hero changes, check with an inspector);
  - **favicons are generated from the logo automatically** when the client supplies none;
  - touched Sections 0 (rule 11), 12 (head example, Site files), 19 (checklist), 21 (AI agents) and the change log (Section 22, which the master did not have before). **Not done:** the handbook's PDF edition was not re-exported; handbook copies in other client projects still say 2.1; the v3.0 Next.js edition was not changed.
- **This site's preview image remade to those rules** (`images/social/og-home.jpg`, 1200 x 630, 92 KB). The first version was a shrunken full-width desktop hero: small text, and the headline ran 920px wide, so a square crop (some apps do this) would cut it. Now it is rendered at 1200 x 630 with the headline on three lines and the paragraph narrowed, so the eyebrow, headline, paragraph and button all sit inside the middle 630 x 630. Same file name and address, so the tags did not change. Social sites cache previews; a link already shared may show the old picture until the cache refreshes.
- **Client preview PDF made:** `documentation/Client Deliverables/By_The_Book_Homepage_Preview.pdf` (17 letter pages, 3.6 MB; the folder is in `.gitignore`, so it is **not** in the public repo). In the style of Miguelle's earlier redesign preview PDFs: a cover (title, hero picture, the live link, what to confirm, "Prepared for Dr. Marquita M. Booker, Esq."), then **Part one, On a computer** (every section at 1440 wide, captioned with her section numbers) and **Part two, On a phone** (the whole page at 390 wide in 15 columns, three per page). The page is captured **finished**: no animations, everything revealed, numbers at their final values, first question open.
  - To rebuild after changes: `python3 documentation/pdf-build/capture.py "<project folder>" "<work folder>"`, crop `phone-raw.png` to 390 wide as `phone.png`, then `python3 documentation/pdf-build/build.py "<project folder>" "<work folder>" "<output.pdf>"`. Needs Google Chrome and Python with Pillow.
  - Checked: all 17 pages rendered and looked over as thumbnails (cover fits on one page, sections line up with their captions). Not checked: the PDF opened in Preview or Acrobat at full size, or printed.

### 2026-11-18: sideways (horizontal) overflow fixed
- Miguelle noticed a slight overflow in the x direction. Two causes found, three fixes made:
  1. **Slide-in elements on phones.** Anything marked `data-reveal="right"` waits 2rem (32px) to the right before it appears. The phone side margin is 1.25rem (20px), so those elements stuck out about 12px past the right edge until they had scrolled into view, which lets the page scroll sideways. Now the sideways distance is **1rem on phones and 2rem from 768px up** (`css/global.css`, section 10). This one was reasoned from the CSS, not caught by the measurement (in the headless test every element had already been revealed).
  2. **Stat strip on very narrow phones** (about 320px and under): the two columns could not shrink below their longest words, measured 5px too wide. The columns now use `minmax(0, 1fr)` and long words may wrap (`css/styles.css`, Stat strip).
  3. **Safety net:** `main` and `.site-footer` have `overflow-x: clip`, so anything that sticks out sideways is cut off instead of widening the page. `clip`, not `hidden`, because `hidden` would stop the sticky headings (sections 7 and 13) from sticking.
- **Measured after the fixes:** page width equals screen width, with no element past the right edge, at 285, 305, 320, 360, 375, 415, 485 and 685px wide (measured by script in headless Chrome). Not checked on a real phone; `overflow-x: clip` needs Safari 16 or newer (older Safari simply ignores it, and fixes 1 and 2 still apply).

### 2026-11-18: logos become their own section; smooth accordion; footer phone columns and MigsFlow credit
- **"Organizations we've served" is now its own section** (Miguelle: the heading should be as bold as the other headings, centred on large screens, with the SVG divider above; the old strip "is a bit lazy").
  - `section.orgs` after the proof section (`index.html`; "Organizations we've served" in `css/styles.css`). The heading is a real `h2` at the same size as every other section heading, **centred from 992px up**, left-aligned on phones like the rest of the page. The 3 x 3 table now spans the full page width with taller cells and larger logos.
  - **Angled divider** at the foot of the navy proof section (`svg.proof__divider`, the usual shape turned upside down and filled white), so the white logo section cuts up into the navy. The proof section got its bottom padding back, plus room for the divider.
  - **Hover:** logos are grey until you point at a cell, then that logo shows its own colours (0.25s, linear).
- **Smooth accordion** (Miguelle: drop-downs feel "a little bit jumpy", opening and closing). The Questions section still uses `<details>`, but the answers now **slide open and shut over 0.3s and fade**, and the plus sign turns at the same time.
  - How: each answer is wrapped in `.faq__panel` > `.faq__panel-inner`; the CSS animates `grid-template-rows` from `0fr` to `1fr` (styles.css, "Smooth open and close"); `javascript/global.js` **part 7** adds or removes the class `is-open` and only sets `open = false` after the slide up has finished. Without JavaScript, or with "reduce motion" on, the browser's own instant open and close is used.
  - Other things that open or scroll were checked in the code: the phone menu already fades in with staggered items, and the back-to-top button already scrolls smoothly (`scroll-behavior: smooth` in `global.css`). The Questions accordion is the only accordion on the site.
  - Tested with scripted clicks: after opening question 2 and closing question 1, the end state is right (answer 2 shown, answer 1 hidden, signs correct). **The slide itself cannot be seen in a still screenshot: Miguelle to confirm it feels smooth.**
- **Footer on phones: two columns** where the content fits. Logo, Services and Contact stay full width (their lines are too long for half a phone screen); **Company and INVEXTRA sit side by side**; Contact follows them (`--wide` and `--contact` modifier classes, `css/global.css` section 9). Tablets and desktop unchanged.
- **Footer credit added:** "Site made by MigsFlow", linking to `https://migsflow.com/` in a new tab, in the bottom bar beside the copyright and Privacy Policy. Written as one word, "MigsFlow", the way the business name appears on Miguelle's own site.
- Checked: logo section at 390 and 1440 wide; footer at 390, 700 and 1440; `global.js` passes a syntax check. Not checked: the accordion's motion, the logo hover, real devices.

### 2026-11-18: preview image address pointed at the GitHub Pages preview
- The inspector then reported "Image is invalid: Failed to fetch image: Not Found", as expected: the tags pointed at the live domain, where the file does not exist yet.
- **The site has a public preview on GitHub Pages: `https://mfebres0919.github.io/By-The-Book-Investigations/`** (found through GitHub's deployments list; it redeploys on every push to `main`). `og:image` and `twitter:image` now point at `…github.io/By-The-Book-Investigations/images/social/og-home.jpg`.
- **AT LAUNCH: change both image addresses back to `https://www.bythebookinvestigations.com/images/social/og-home.jpg`** (a comment in the `<head>` says the same). The canonical link and `og:url` were left on the live domain on purpose, so search engines treat the preview as a copy of the real site, not a second site.
- The preview is public: anyone with the link can see the draft, including the unapproved testimonials and logos.

### 2026-11-18: social preview image and missing meta tags
- Miguelle ran a meta-tag inspector: `og:image` and `twitter:image` missing (errors), `og:site_name` missing (warning). **All three added** to the `<head>` of `index.html`, plus `og:locale`, the image's type, width, height and alt text, and `twitter:title`, `twitter:description`, `twitter:image:alt`.
- **The preview image is a picture of the hero section**: `images/social/og-home.jpg`, 1200 x 630, 80 KB (conference room under navy, eyebrow, headline, paragraph, button and link; no menu bar or trust strip). Made by rendering the page at 1440 x 756 with everything except the hero hidden, then resizing. **Remake it whenever the hero's image or wording changes.**
- **The image address uses the live domain** (`https://www.bythebookinvestigations.com/images/social/og-home.jpg`), like the canonical and `og:url` already did, because social sites require a full address. Consequences: the tags are present, so the inspector's checks pass, but **the picture itself will not load in a preview until the new site is live on that domain** (today that address is her Squarespace site, which has no such file). To test real previews on a staging address first, temporarily point the two image tags at the staging domain. After launch, check with LinkedIn's Post Inspector and Facebook's Sharing Debugger.
- Not checked: the inspector was not re-run here (it is Miguelle's tool); the tags were added to match its three findings.

### 2026-11-18: phone version of the hero image
- Miguelle supplied a portrait version of the conference room for phones (1086 x 1448; source: `documentation/source-images/backgrounds/hero-conference-room-mobile.png`). It replaces the tall crop of the wide image: `images/backgrounds/hero-m.webp` / `.jpg` (720 x 1210, 50 / 102 KB). Same file names and size, so no HTML or CSS changed.
- **Correction to the entry below:** it said the room was "barely visible" on phones. That was a fault in the screenshot method (the phone view is captured inside an iframe, and the hero image had not loaded when the picture was taken). A direct capture at 500px wide shows the room clearly behind the text: ducts, lamp, table and chairs. **For the hero, capture the page directly at a narrow window instead of using `shot.py`'s phone view.**
- Checked: direct screenshot at 500 wide. Not checked: a true 390-wide phone (headless Chrome will not go narrower than about 500), real devices, measured contrast.

### 2026-11-18: new hero image (conference room); logo block redesigned
- **Hero image replaced.** Miguelle generated a conference room image to follow her design note 6 (calm, modern conference room, no people): navy wall, a burgundy panel, black table, grey chairs, glass partition. Source: `documentation/source-images/backgrounds/hero-conference-room.png` (1536 x 1024); the previous texture's source was renamed `hero-old-navy-texture.png`. Web files keep the same names, so the HTML and the preload links did not change: `images/backgrounds/hero.webp` / `.jpg` (1536 x 943, 75 / 154 KB) and `hero-m.webp` / `.jpg` (720 x 1210 tall crop around the table, 43 / 94 KB).
  - A **76% navy layer** now sits over the photo (`.hero__bg::after` in `css/styles.css`; the number is commented) so the white text reads everywhere; the soft patch behind the text on tablets and up was lightened to suit. Text stays centred, as Miguelle chose earlier.
  - **To tell Marquita:** the image is AI-generated, not a photograph of a real room; her note asks for an "approved" image. It replaces the photo on her current site that was too small to use (564 x 846).
  - On phones the hero is short and the layer is dark, so the room is barely visible there; on desktop the table, chairs and glass show clearly behind the text. Lower the 0.76 to show more.
- **Logo block redesigned** (Miguelle: the row "looks clustered and not right"; a carousel would suit but her brief rules carousels out). Now a **3 x 3 table of equal cells** with thin lines between them, each logo centred and fitted into the same invisible box (so seals and wide wordmarks carry equal weight), still grey. Desktop: the heading "Organizations we've served" on the left in the heading font, the table on the right. Phones and tablets: heading above, the same 3 x 3 table. Nine logos is what makes 3 x 3 work; **if she adds or removes one, the grid needs rethinking** (8 would be 4 x 2, 10 would be 5 x 2).
- Checked: hero and logo block at 390 and 1440 wide. Not checked: tablet width, hero text contrast measured (judged by eye), real devices, page-speed effect of the larger hero file (the old texture was 40 KB WebP, the new one 75 KB).

### 2026-11-18: client logo row added; menu term fixed; check against her nine design notes
- **"Organizations we've served" logo row** (her section 11: "logo row, unchanged from current site"). Miguelle asked for the logos to be taken from her current homepage ("Who we've worked with"). Nine found and used, in her order: TCU, City of Dallas, The University of New Mexico, SAFE, New Mexico State University, Skyers Law Group, The Idea Inc., Austin Area Urban League, South Carolina Combat Veterans Group. Originals in `documentation/source-images/client-logos/` (not in Git); trimmed web copies in `images/logos/` (WebP + JPG, 3 to 10 KB each).
  - Shown as a **white strip at the foot of the navy proof section** (`.orgs…` in `index.html` and `css/styles.css`), because the files have white backgrounds. Grid: 2 across on phones, 3 on tablets, 5 on desktop. **Shown in grey** (CSS `filter: grayscale(1)`, 80% opacity) so nine brand colours do not fight her palette; remove that one line to show them in colour. Alt text is each organisation's name, read from the logo itself.
  - **To confirm with her:** that all nine may still be shown (her note says logos need her approval), and whether grey is acceptable. The files are small web copies from her site (some under 300px wide); ask her for better originals if any look soft.
- **Main menu:** "Investigation Capacity" is now **"Investigation Capacity Retainer"** (her exact term, design note 4). Still on one line at 1000, 1100 and 1280 wide.
- **Check against the nine design notes at the end of her homepage document:**
  1. Two button actions only: **met.** Six "Schedule a Conversation" buttons and one "Join the INVEXTRA waitlist"; every other link is a text link.
  2. One primary button in the hero, secondary text link to the engagement section: **met** ("How the work is structured" jumps to the two ways).
  3. Sequence problem, approach, two ways: **met** (sections 3, 4, 5, in her order).
  4. Terminology in nav, footer and links: **met after today's fixes.** Her own heading in section 6 says "CLEAR By-the-Book™ Investigation Framework", which is her wording and was left as written.
  5 and 6. Hero video or image: **partly met.** The hero uses an abstract navy texture, which is a "neutral non-stock alternative", but it is not the conference room she points to. See below.
  7. Figures credited to the founder's career: **met** (the stat strip's first label and the line under the strip).
  8. No unsupported operational promises, no "Most chosen" badge: **met** (none on the page; all copy is hers).
  9. INVEXTRA pre-launch language and separate waitlist destination: **met** (own section, "being developed", "Planned launch: January 2027", button goes to invextra.ai, not the contact page). The launch date still needs her confirmation before publishing.
- **The conference room photo.** Her note refers to "the capacity page's calm, modern conference room shot". The matching photo on her current site is on `/third-party-investigations`: an empty, bright conference room. Saved as `documentation/source-images/conference-room-from-current-site.jpg`, but the copy her site serves is only **564 x 846 pixels, portrait**, far too small for a full-width hero. Not used. Options given to Miguelle: ask her for the original file (best), or generate a similar empty room. An empty room has no people, so it does not break her "no stock people" rule; an AI-generated room should be disclosed to her and approved, since her note asks for an "approved" image.
- Checked: logo row at 390 and 1440 wide; menu at 1000, 1100 and 1280. Not checked: tablet width, real devices.

### 2026-11-18: footer revised to her exact terms
- Her design notes ask for these exact terms in the nav, footer and links: "Investigation Capacity Retainer", "Single-Case Investigation", "CLEAR Investigation Framework™", "Investigation Readiness Intensive", "INVEXTRA™". **The footer now uses all five.**
- Columns (`index.html` footer; `css/global.css` section 9): logo and tagline | **Services** (Investigation Capacity Retainer, Single-Case Investigation, Investigation Readiness Intensive, CLEAR Investigation Framework™) | **Company** (About, Contact) | **Contact** (phone, email, address) | **INVEXTRA™** (her logo line and "Join the INVEXTRA waitlist", her exact button wording). The old "Explore" column is gone.
- The four Services links jump to sections of the homepage (`#services`, `#services`, `#readiness`, `#process`). **When the Services page is built, point them at that page**, and remember that footers on inner pages need paths that work from a subfolder.
- Layout: one row of five from 1200px; from 992px the logo takes its own row with the four columns beneath; two columns on tablets; stacked on phones.
- **Not changed, to decide with Miguelle:** the main menu still says "Investigation Capacity" (a page link) where her term is "Investigation Capacity Retainer". The menu is already tight on small desktops, and that item came from the proposal's page list, so it was left alone.
- **Question from Miguelle about "logos" in the proof section:** her copy for section 11 ends with "Organizations we've served: [logo row, unchanged from current site]", meaning the row of client organisation logos on her current website. We have none of those image files, and her own note says she must approve logos before publishing, so the row is not built.
- Checked: footer screenshots at 390, 1040 and 1440 wide. Not checked: the links by clicking, hover, real devices.

### 2026-11-18: homepage realignment, step 14: closing call to action. **All 14 sections are now built.**
- The closing section (`section.cta`) now uses her section 14 word for word: heading "Tell us what's on your desk.", her paragraph, and one button, "Schedule a Conversation" (white on burgundy, to `contact/`).
- **Removed** (not in her copy): the old heading and sentence ("Ready to stop putting out fires..."), the "In 30 minutes, you'll get a clear picture of" list, and the "or call (888) 397-6352" link. The phone number is still in the footer and the phone menu.
- Layout: centred from 768px up, the same as the hero, so the page opens and closes the same way; left-aligned on phones. The heading is the largest on the page after the hero's. The triangle divider stays at the top (pale grey, matching section 13).
- Background: the **Burgundy Embossed Grid** texture (`images/backgrounds/burgundy-grid`, WebP and JPG plus `-m`; 38 to 97 KB) under a 50% burgundy layer. It replaces the layered-paper photo. `images/backgrounds/layered-paper-edges*` is now **unused** on the homepage; the files are kept in case an inner page wants them.
- Checked: screenshots at 390 and 1440 wide. Not checked: the button's hover, tablet width, the motion, real devices.
- **What is left on the homepage:** a pass over the nav and footer for her exact terms (the footer heading still says "INVEXTRA" without the ™; the hero link "How the work is structured" already lands on section 5); the logo row in section 11 (needs her logo files); her approvals (Section 8); a full top-to-bottom review in a real browser, since every section has only been checked on its own in still screenshots.

### 2026-11-18: section 13 texture removed
- Miguelle on the grid-dots background: "I don't like the background, it's too much." **Removed.** Section 13 is now plain pale grey (`--color-wash`) with the white accordion block on it; the `grid-dots` image files were deleted from `images/backgrounds/` (the original PNG is still in `documentation/source-images/backgrounds/`), and the off-white `#FCF9F4` is no longer used anywhere. The closing section's triangle is pale grey again to match.
- **Lesson on graphics so far:** rejected: the line drawings (section 7) and the light grid texture (section 13). Kept so far: the dark navy textures (contours in section 9, paper fold in section 11). Light sections should stay plain; textures belong on the dark sections, and quietly.
- Checked: screenshot at 390 and 1440 wide.

### 2026-11-18: homepage realignment, step 13: "Questions we get asked"
- New `section.faq` between "How it starts" and the closing section (`index.html`; "Questions we get asked" in `css/styles.css`). Her five questions and answers, word for word.
- **Accordion**, built with the browser's own `<details>` / `<summary>` (no JavaScript; keyboard and screen readers work as standard). The first question starts open. A burgundy plus sign turns into a minus when a question is open (linear, 0.25s). More than one can be open at once. Reason for an accordion here and nowhere else: Miguelle finds the page text-heavy, and visitors only need the answers they came for.
- Layout: heading on the left on desktop (stays in view), the list on the right on a white block with a navy rule on top; phones stack them.
- Background: the **Minimalist Burgundy Grid Dots** texture (`images/backgrounds/grid-dots`, WebP and JPG plus `-m`; 4 to 31 KB). Its paper colour is `#FCF9F4`, a warm off-white that is not a brand token; it is written as a hex in `.faq` and in `.cta__divider`. The list sits on white so the grid lines never cross the words.
- **The triangle at the top of the closing section is now `#FCF9F4`** to match this section. Seen in the screenshot: clean join.
- Not done: FAQ structured data (schema) for search engines. Add it with the rest of the schema before launch.
- Checked: screenshots at 390 and 1440 wide with the first answer open. Not checked: opening and closing by click, keyboard use, tablet width, real devices.

### 2026-11-18: homepage realignment, step 12: "How it starts"
- New `section.start` between Proof and the closing section (`index.html`; "How it starts" in `css/styles.css`). White, no graphic. Her three steps word for word, as a **timeline**: one continuous navy line with a small burgundy square where each step begins, then a large burgundy "01" / "02" / "03", the step's title and its text. The line runs across the top on desktop (three columns with no gap, so their top edges join) and down the left side on phones and tablets.
- The numbers are kept because this is a real sequence (and her copy numbers them). It is an ordered list; the big digits are hidden from screen readers since the list already numbers the steps.
- No button in this section: her copy has none, and the closing section's button follows two sections later.
- On desktop the step titles are slightly smaller (1.4375rem) so "Tell us what's on your desk." fits on one line like the other two.
- The closing section's triangle is now filled white to match this section above it (`.cta__divider`), which removes the navy seam noted in the entry below. **Change the fill again when section 13 is built** (to section 13's background).
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, the motion, real devices.

### 2026-11-18: section 7 drawing removed; homepage realignment, step 11: Proof
- **Section 7: the architecture drawing is gone** (Miguelle: "get rid of the architecture drawing"). The section is plain white again. `modern-civic-building-navy.svg` deleted; the four original drawings remain in `images/illustrations/`, unused. **Do not put the line drawings back into sections without asking.**
- **Section 11** replaces the old proof section (`section.proof#testimonials`; "Proof: testimonials" in `css/styles.css`). Heading: "Trusted by teams who could not afford to get it wrong." Her **four reworded testimonials, word for word and in her order**: Maedgen, Chrispin and Levingston side by side under thin rules (stacked on phones); Dr. Leonard Moore's, the most direct, set large in the heading font across the full width, with his name to the right on desktop. No slider, no cards.
- Background: the **Navy Paper Fold** texture (`images/backgrounds/navy-paper-fold` in WebP and JPG, plus `-m`; 55 to 194 KB) under a 45% navy layer. Quotation marks are silver, because burgundy cannot be seen on navy.
- **Names and titles only, as her copy gives them.** The organisations shown before (UT Austin, Nova Southeastern, Tarrant County College) came from her old site and are not in her final copy, so they were removed. Ask her whether she wants them shown.
- **Removed:** the old heading and line ("The By-the-Book Effect"), and the "Who we work with" sector row (not in her copy).
- **Not built: her "Organizations we've served" logo row.** There are no logo files. Needs the logos and her approval (her note covers testimonial wording, titles and logos).
- **Temporary:** the triangle at the top of the closing section is filled navy while this navy section sits directly above it (`.cta__divider`). The flat navy does not quite match the texture, so a faint seam shows. It goes away once sections 12 and 13 sit between them; set the fill to section 13's background then.
- Checked: screenshots at 390 and 1440 wide, including the large fourth quote. Not checked: tablet width, the motion, real devices; contrast over the texture judged by eye.

### 2026-11-18: section 7 drawing moved to the background; homepage realignment, step 10: founder
- **Section 7 (Miguelle: "over the entire background, low opacity so it's barely visible but it's there"):** the facade drawing under the button is gone. The civic building line drawing (`images/illustrations/modern-civic-building-navy.svg`, a navy copy of the supplied file) now covers the whole section at 7% opacity (`img.intensive__bg`; the number is commented in `css/styles.css`). `modern-building-facade-navy.svg` was deleted as unused; the original black drawings are all still in `images/illustrations/`.
- **Miguelle approved the suggested homes for the other graphics** (listed in the entry below), so use them as the remaining sections are built. The civic building is now taken by section 7; the glass tower and the facade are still free.
- **Section 10** replaces the old About section (`section.about#about`; the "Founder" block in `css/styles.css`). Her copy word for word: heading "Built by someone who has carried the caseload", her two paragraphs (the first a step larger), and "Read why we started" as a **text link** to `about/` with a burgundy underline (her notes: internal links need not be buttons). Photo on the left with the tinted block, text on the right; phones show the text first. No added graphic here: the photo is the picture.
- **Removed from the homepage:** the three-pillar tabs and their draft copy, and the `.tabs…` rules in `css/styles.css`. The tabs code in `javascript/global.js` (part 3) is left in place, unused, in case the About page wants it.
- Caption under the photo now reads "Dr. Marquita M. Booker, Esq." (her copy's form of the name) with "Founder and Chief Legal Officer" (from her current About page; her new copy gives no title). **Still to confirm with her: that the photo is her, and the title.**
- Checked: screenshots of sections 7 and 10 at 390 and 1440 wide. Not checked: tablet width, the link's hover, the motion, real devices.

### 2026-11-18: Miguelle's new graphics arrived; first two placed (sections 7 and 9)
- **Files received (14) and where they went.** They were loose in `images/`, which the handbook does not allow, so:
  - Four line drawings, already SVG (Miguelle converted them): now in **`images/illustrations/`** as `modern-building-facade.svg`, `glass-office-tower.svg`, `modern-civic-building.svg`, `interior-staircase.svg` (the `01-` to `04-` prefixes were dropped). They are drawn with `currentColor`, which shows as black inside an `<img>`; to use one in a brand colour, save a copy with the colour written in (done for `modern-building-facade-navy.svg`, `#0A1A33`).
  - Ten textures (PNG, 1 to 3 MB each): originals moved to `documentation/source-images/backgrounds/` (not in Git). Web copies are made only when one is used. Names: Burgundy Embossed Grid Texture, Graphite Curve on Handmade Paper, Layered Navy and Gray Paper Strata, Minimal Constellation on Navy, Minimalist Burgundy Grid Dots, Navy Paper Fold Texture, Navy Slate with Vertical Seam, Navy Topographic Contours with Burgundy Accent, Navy and Gray Panel Harmony, Soft Blinds Shadows on Textured Wall.
- **Section 9 (navy):** background is now the contour-line texture (`images/backgrounds/navy-contours` in WebP and JPG, plus a tall `-m` phone crop; 13 to 69 KB) under a 62% navy layer (`.independence__bg`, `.independence::before`). The log entry below that calls this section "plain navy, no photo" is superseded.
- **Section 7 (white):** the building facade line drawing sits under the button in the left column (`img.intensive__art`, navy lines at 70% opacity; 33 KB). On phones it sits between the button and the text. Reason for this drawing here: the Intensive is about the structure behind the work.
- **Not used yet, with a suggested home for each** (to agree with Miguelle): Constellation on Navy (has a copper dot) for the INVEXTRA section; civic building or glass tower drawing for the founder section (10) or "How it starts" (12); Grid Dots (cream) behind the Questions section (13); Paper Fold or Slate behind the proof section (11); Burgundy Embossed Grid for the closing section (14) in place of the paper-edges photo. Probably leave out: Soft Blinds Shadows (reads as a stock photo), Graphite Curve and Paper Strata (cream and brown tones outside her palette), interior staircase drawing (the CLEAR section already has a staircase).
- Checked: screenshots of sections 7 and 9 at 390 and 1440 wide. Not checked: tablet width, real devices; text over the contour lines was judged by eye only, not measured for contrast (the lines are thin and behind a navy layer).

### 2026-11-18: hero text widened on desktop; images to come; commits now automatic
- Miguelle: on larger screens the hero text "feels a little clumped together". Changes in `css/styles.css` (end of the Hero block):
  - the paragraph under the headline may run wider: 52rem from 992px, 60rem and slightly larger type (1.3125rem) from 1200px (it was 40rem at every width);
  - from 1280px each sentence of the headline stays on one line (`.hero__line { white-space: nowrap }`) at 3.5rem, so the headline is two long lines instead of three short stacked ones. It was 4rem, but at that size the first sentence cannot fit on one line. Below 1280px nothing changed.
- Checked: screenshots at 1280, 1440 and 1920 wide (first sentence fits with room to spare at 1280). Not checked: real devices, the entrance animation in motion.
- **Direction from Miguelle: the page is "too much text" right now. Lean on her brief's "abstract, textural or brand-driven graphics".** Miguelle is generating more background images; when they arrive, place them in `images/backgrounds/` (WebP + JPG, with `-m` phone crops) and use them in the text-heavy sections (candidates: 7 Intensive, 9 Independence, and sections 10 to 13 as they are built). Still no stock people, no image added only to fill a column.
- **Standing instruction: commit and push after every change** (added to Section 1).

### 2026-11-18: homepage realignment, step 9: "An outside investigator protects the finding"
- New `section.independence` after Meet INVEXTRA™ (`index.html`; styles in `css/styles.css`). **Plain navy, no photo and no divider** (the CLEAR section is navy over a photo; this one is flat so the two differ, and it breaks the run of light sections 7 and 8). Her copy word for word.
- Layout: phones, heading, paragraph, then her line "Independent in process. Clear in findings." under a thin rule. From 992px, heading and paragraph on the left (7 of 12 columns) and the line set large on the right like a pull quote, one sentence per block, with a thin vertical rule between the two sides. The second sentence is a shade quieter (mist) so the two read as a pair.
- Animation: heading word by word, paragraph fades, the two sentences arrive from the right one after the other.
- **Dividers (Miguelle, 2026-11-18): agreed to keep them occasional**, "with some sections every so often", not at every boundary.
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, the motion, real devices.

### 2026-11-18: second divider shape (triangle) added
- Miguelle supplied a second divider, `triangle-divider.svg` (path `M0 0v4l500 96 500-96V0H0z`, a wide triangle pointing down to the centre), and asked for both dividers to be on the site.
- **Where each one is used now:** the angled (asymmetrical) divider stays where it was: top of section 4, and top and foot of the CLEAR section. The **triangle** is at the top of the burgundy closing section (`svg.cta__divider` in `index.html`; `.cta__divider` and `--divider-h` in `css/styles.css`), where the pale grey above comes to a point in the middle, towards the final call to action. One placement only, so dividers stay occasional (her brief: minimal).
- Its fill is pale grey to match the section above (currently the old proof section). **When sections 11 to 14 are rebuilt, set the fill to whatever section ends up directly above the closing section.**
- Checked: screenshots at 390 and 1440 wide.

### 2026-11-18: homepage realignment, step 8: Meet INVEXTRA™
- New `section.invextra#invextra` after the Investigation Readiness Intensive (`index.html`; styles in `css/styles.css` under "Meet INVEXTRA™"). Her copy word for word: heading "Meet INVEXTRA™", her bold line "Bringing CLEAR into the investigation as it happens." in the heading font, her two paragraphs, "Planned launch: January 2027", and the button "Join the INVEXTRA waitlist" (opens `https://invextra.ai/` in a new tab; address still to confirm, Section 9).
- **How it is kept separate from the services (her note: "proof of depth, not a competing offer"):** it is the only single framed panel on the page (pale grey section, one white box with a thin rule and a 2px copper line on top); it shows INVEXTRA's own logo (`images/brand/invextra-logo`, used as supplied); the launch date has the small copper square; and its button is the **outline** style (`btn--outline`), while every "Schedule a Conversation" button is filled. Copper appears only as the top line and the square, as her brand guide asks.
- Layout: phones, logo and launch date on top, text below; from 992px, logo and date on the left (4 of 12 columns), text and button on the right, a thin rule between.
- Animation: logo fades in, heading word by word, then the bold line, paragraphs and button fade in turn.
- Miguelle's instruction for the remaining sections: keep to all of her design considerations while making each section look different.
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, hover on the button, the motion, real devices. On phones the heading wraps onto two lines ("Meet" / "INVEXTRA™").

### 2026-11-18: menu label changed to her term; homepage realignment, step 7: Investigation Readiness Intensive
- **Menu and footer label:** "Our Process" is now **"CLEAR Investigation Framework™"**, her exact term (Miguelle: "just so we can say we've done exactly what she's asked for"). Because the label is long, the desktop menu between 992px and 1200px uses slightly smaller text, tighter gaps and no wrapping (`css/global.css`, just above the back-to-top block). Checked on one line at 1000, 1100 and 1440 wide.
- **Section 7** (`section.intensive#readiness`, after the CLEAR section; styles in `css/styles.css`). White background. Left: the name, her bold opening line ("Not Investigations 101...") with a burgundy bar, and a navy "Schedule a Conversation" button; on desktop this column stays in view while the right side scrolls. Right: her three paragraphs, word for word; the four gaps named in her first paragraph are each a sentence, so they are shown as four short lines with small burgundy squares.
- Miguelle on section 6 (CLEAR rows): "I think this section looks great."
- **Screenshot method from now on:** `scratchpad/shot.py` makes a temporary copy of the page with only one section showing and captures it at 1440 and 390 wide (the temporary files are deleted straight after). Cropping sections out of full-page screenshots kept failing.
- **Question from Miguelle: do her documents rule out SVG or vector backgrounds?** No. Her questionnaire's avoid list (recorded in Section 3) is: stock imagery, clip-art icons, heavy gradients, drop shadows, sliders, clutter, a generic law-firm look. It also says that where there is no real photo, "abstract, textural or brand-driven graphics" should be used. The two Word documents add only the hero image direction (a calm conference room or an approved spokesperson video, not a stock business person). This answer is from the notes taken when the PDFs were first read, not a fresh re-read.
- Checked: section 7 at 390 and 1440 wide. Not checked: the sticky left column while scrolling, tablet width, real devices.

### 2026-11-18: homepage realignment, step 6: CLEAR
- The process section (`section.process#process`) now uses her section 6 word for word: heading "Every case follows the CLEAR By-the-Book™ Investigation Framework", her three-sentence intro, the five steps with **her** one-line description each, and her closing line "CLEAR is also the foundation for how we help internal teams strengthen their own work." The earlier step text (condensed from her old site), the numbers 1 to 5 and the "Schedule a Conversation" button are gone; her copy has no button in this section.
- **No cards** (the section above has cards). The steps are full-width rows separated by thin rules, each led by a large letter, so the letters spell C, L, E, A, R down the page. Desktop: letter, name and description on one line per step. Phones: letter beside the name, description under it. Styles: `.clear…` in `css/styles.css`; the `.step-card…` rules were removed.
- Kept: the staircase photo under navy, the pale grey divider on top, the white divider at the foot. Heading and intro are left-aligned again (they were centred when the section held a card grid).
- Her design note asks for the label "CLEAR Investigation Framework™" in the nav, footer and links; her heading here says "CLEAR By-the-Book™ Investigation Framework". The menu still says "Our Process". **Decide the menu and footer labels when the nav is revised at the end of the realignment** (and ask her which short form she wants).
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, the motion, real devices.

### 2026-11-18: homepage realignment, step 5: "Two ways to get the work moving"
- **Replaces the old services section** (`section.ways`, still `id="services"` so the hero link "How the work is structured" lands on it; styles in `css/styles.css`). The `.services…` and `.service-card…` rules are gone.
- Pale grey background, two white cards side by side from 992px (stacked below), each with a navy rule on top: her "01" and "02", the service name, her tagline in italic, her text, and a navy "Schedule a Conversation" button pinned to the bottom so the two buttons line up. The retainer card also has "A retainer can include:" with her four items under thin rules. All wording is hers.
- **Changed the same day (Miguelle: "should we maybe have the cards sitting over one of our bg images?"):** the heading now sits on a dark band (the `silver-navy-diagonal` image under a 62% navy layer, with a new phone crop `silver-navy-diagonal-m`), and the two cards start on the band and hang down over its lower edge onto the pale grey (`.ways__band`, `--overlap`). The whole section is not on an image, because the CLEAR section that follows already is; **section 6 (CLEAR) should therefore be rebuilt without cards over a photo**, so the two neighbours differ. Checked at 390 and 1440 wide.
- Both buttons read "Schedule a Conversation"; each carries hidden text naming its service, so screen-reader users can tell them apart.
- The Investigation Readiness Intensive is no longer in this section; it gets its own section 7, as in her copy.
- **The angled divider above the CLEAR section is now pale grey** (it takes the colour of the section above it); the one at the foot of that section stays white.
- Miguelle on section 4's widened layout: "I love the layout you have! I think it just needed to spread out a bit."
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, hover, the motion, real devices.

### 2026-11-18: homepage realignment, step 4: "An outside investigation shouldn't become another problem to manage"
- New `section.standard` after "When would you bring us in?" (`index.html`; styles in `css/styles.css`). White background.
- ~~Layout from a reference Miguelle shared: text left, a brand texture on the right, a burgundy card over its corner.~~ **Replaced the same day:** Miguelle found the picture "not adding anything meaningful". Lesson: do not add an image only to fill a column; without real photography from the client, sections must carry themselves with type and structure.
- **Layout now: one reading column in the middle of the page** (about 46rem), like a short letter, so it differs from the grids around it. Her four paragraphs word for word and in order: (1) the opening paragraph slightly larger; (2) her second paragraph's two failure cases side by side under thin rules, with its third sentence, "Neither gives an organization what it needs.", in italic under a burgundy rule spanning both; (3) the third paragraph as ordinary text; (4) her closing line as the largest text in the section.
- **Desktop widened the same day:** Miguelle found the single column "condensed" with too much white space either side. From 992px the section now uses the full page width: heading across the top, then a two-by-two grid in reading order (opening paragraph | the two cases and "Neither..."; third paragraph | her closing line). Phones and tablets keep the single column. Lesson: on wide screens a narrow centred column reads as unfinished here; "white space" in her brief means room around things, not unused halves of the screen. Checked at 820 and 1440 wide.
- **Divider added at Miguelle's request:** the same SVG shape at the top of this section, filled with the grey of section 3 (`.standard__divider`).
- Animation: heading word by word, opening paragraph fades, the two cases come in from the left and the right, "Neither..." rises, then the rest.
- **How sections are kept from looking alike within her rules (agreed approach, 2026-11-18):** vary the *structure*, not the decoration. Tools in use: background rhythm (navy, white, pale grey, one burgundy); column structure (centred hero, four-across strip, cell grid, single reading column, cards, split); one emphasised element per section in the heading font (a panel, a large closing line); the angled divider at a few boundaries only; shaping the layout from the content itself (five situations became five cells, two failure cases became a pair). Avoid repeating the same structure in neighbouring sections.
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, the motion, real devices.

### 2026-11-18: homepage realignment, step 3: "When would you bring us in?"
- New `section.when` after the stat strip (`index.html`; styles in `css/styles.css`). Pale grey background. Her three paragraphs, word for word:
  - the five situations in her first paragraph are shown one per line, each sentence unchanged, under thin rules;
  - "Sometimes you need more capacity. Sometimes you need distance from the people involved. Sometimes you need both." is set larger in the heading font, one sentence per line, with a burgundy bar beside it;
  - "And yes, you may need another full-time hire..." follows as ordinary text.
- ~~Desktop: the heading sits on the left and stays in view while the right-hand column scrolls.~~ **Replaced the same day: Miguelle said the desktop layout "looks pretty bad"** (a near-empty left column beside a plain list). Lesson: avoid a lone heading in its own column with a long list beside it.
- **Layout now:** full-width heading; the five situations as a grid of cells under thin navy rules (three in the first row and two wider ones in the second on desktop; two columns with the long fifth across the full width on tablets; a simple list on phones); then the "Sometimes..." statement on a **navy panel**, its three sentences side by side from 768px up (stacked on phones), each under a short pale rule; then the closing paragraph. The cells and the panel rise in turn as they scroll into view.
- Animation: heading word by word, the five lines arrive from the right one after another, the statement rises, the last paragraph fades.
- Checked: screenshots at 390 and 1440 wide (taken mid-animation; layout is right). Not checked: the sticky heading while scrolling, the motion, tablet width, real devices.

### 2026-11-18: homepage realignment, step 2: stat strip
- New `section.stats` between the hero and the services section (`index.html`; styles in `css/styles.css` under "Stat strip"). Her four items, word for word: "2,000+ Protected-class investigations conducted, led, or reviewed by our founder", "15+ Years in investigation practice", "250+ Investigators trained", and the statement "Independent, attorney-led fact-finding". Two by two on phones, four across from 992px, each under a thin navy rule; figures in burgundy.
- **Decision (Miguelle, 2026-11-18): keep the attribution line**, and tell her it is there because of her own note about crediting the figures to her career.
- **Attribution line under the strip:** "Experience of our founder, Dr. Marquita M. Booker, Esq., across her career." It is her wording from the Services page; her homepage copy does not include it, but her design note says the figures must be credited to her career. Confirm she wants it on the homepage.
- **The three numbers count up once** when they scroll into view (`javascript/global.js` part 6, any `data-count` span; 1.2s, linear). The finished figure is in the HTML, so it shows without JavaScript and with "reduce motion" on; screen readers read the finished figure.
- Checked: screenshots at 390 and 1440 wide, taken while the numbers were still counting (so the counting works; the layout is right). Not checked: the final figures on screen after the count, the motion itself, real devices.

### 2026-11-18: homepage realignment to her 14 sections, step 1: hero
Miguelle approved realigning the whole homepage to `documentation/client-brief/Homepage and About Us.docx`, **one section at a time, reviewed as we go**. Progress: **all 14 sections done (2026-11-18)**: Hero, Stat strip, When would you bring us in?, An outside investigation..., Two ways to get the work moving, CLEAR, Investigation Readiness Intensive, Meet INVEXTRA™, An outside investigator protects the finding, Founder, Proof, How it starts, Questions we get asked, Closing. Nothing from the earlier draft homepage remains. Next: nav and footer terms pass, a full-page review in a browser, then the inner pages.
- **Hero now uses her final copy word for word:** small line "Third-party protected-class investigations" (with the copper marker), H1 "Some investigations can't stay in-house. Others can't wait." (one sentence per line), her subhead, one button ("Schedule a Conversation"), a text link "How the work is structured" that jumps to `#services` (it should point at the "Two ways" section once that is rebuilt), and her trust line in the strip at the foot of the hero.
- **INVEXTRA is no longer in the hero** (the strip is gone; her copy gives INVEXTRA its own section 8). It now has its own section 8 (built 2026-11-18) plus the footer column.
- **Centred from 768px up** (Miguelle's call, since nothing sits beside the text); phones stay left-aligned like the rest of the page. A soft navy patch that fades to nothing sits behind the centred text so the burgundy line in the background never runs through the words (`.hero__inner::before`). Checked at 820 and 1440 wide before the patch was widened; not re-checked after.
- Entrance animation updated: small line fades, the headline's words rise in turn with a pause between the two sentences, then subhead, button row and trust line fade in. The last piece now arrives about 2.6s after load.
- Meta description and `og:description` rewritten from her hero wording (still drafts until the SEO pass).
- **Her hero image note is not met yet:** she suggests a calm, modern conference room photo or an approved spokesperson video. The current background is the navy texture Miguelle supplied. Ask her for the conference room photo she mentions ("the capacity page's" shot).
- Checked: screenshots at 320, 390, 820 and 1440 wide. Not checked: the animation in motion, real devices, other browsers.

### 2026-11-18: her final copy arrived; services updated; hero INVEXTRA button became a text link
**Two new documents from Marquita are in `documentation/client-brief/`** (dated 2026-11-17). They are her final copy and include notes addressed to the designer:
- `Services Page (Final).docx`: the whole Services page (hero with three figures, Third-Party Protected-Class Investigations with the Investigation Capacity Retainer and the Single-Case Investigation, the Investigation Readiness Intensive, how CLEAR fits, INVEXTRA, a closing step) plus build notes.
- `Homepage and About Us.docx`: the whole homepage in 14 numbered sections, the whole About page, and design notes.

**Done today**
- **Services section on the homepage now uses her final list.** Two cards (her notes: "Two consulting services only"): *Third-Party Protected-Class Investigations*, with links to *Investigation Capacity Retainer* and *Single-Case Investigation* (retainer first, as her notes ask), and *Investigation Readiness Intensive*. Heading and sentences are from her Services page. **INVEXTRA is no longer a service card** (her notes: "a separate AI-enhanced support tool, not a third consulting engagement"). The links point at sections of the Services page (`services/#capacity-retainer`, `#single-case`, `#readiness-intensive`), which is not built yet. Desktop layout changed from three columns to two; the unused copper-marker rule was removed.
- **Hero INVEXTRA strip:** Miguelle chose option 1. The outline button is now a plain underlined text link ("Join the INVEXTRA waitlist", `.hero__invextra-link`), so the hero has one button.
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, hover, real devices.

**Not done: the rest of the homepage does not match her final copy yet.** What was built before these documents were read uses draft wording from her old site. Her homepage document differs in wording, in order, and in which sections exist. Miguelle to decide whether to realign the whole homepage (Claude recommends doing so, keeping the design system and components already built). The differences:

| Her section | What we have now |
|---|---|
| 1. Hero: eyebrow "Third-party protected-class investigations", H1 "Some investigations can't stay in-house. Others can't wait.", a subhead, one button, a text link "How the work is structured", and a trust line. No INVEXTRA in the hero. | Different headline and sentence; INVEXTRA strip in the hero |
| 2. Stat strip: 2,000+, 15+, 250+, "Independent, attorney-led fact-finding" | Not built |
| 3. "When would you bring us in?" | Not built |
| 4. "An outside investigation shouldn't become another problem to manage" | Not built |
| 5. "Two ways to get the work moving": retainer and single case, each with its own text and button | Partly: the services cards (updated today from the Services page) |
| 6. CLEAR, with her own one-line text per step and letters C, L, E, A, R | Built with different step text and numbers 1 to 5 |
| 7. Investigation Readiness Intensive | A card only |
| 8. "Meet INVEXTRA™" as its own section with a waitlist button, planned launch January 2027 | Hero strip and footer column only |
| 9. "An outside investigator protects the finding" | Not built |
| 10. "Built by someone who has carried the caseload" (founder), button "Read why we started" | About section with different wording and the three-pillar tabs, which are not in her new copy |
| 11. Proof: H2 "Trusted by teams who could not afford to get it wrong.", three reworded testimonials plus a fourth (Dr. Leonard Moore), logo row | Different heading; old wording; three testimonials; sectors row that is not in her copy |
| 12. "How it starts" (three steps) | Not built |
| 13. "Questions we get asked" (five) | Not built |
| 14. Closing: "Tell us what's on your desk." | Different heading and a "30 minutes" list that is not in her copy |

**Her design notes that affect what is already built**
- Use these exact terms in the nav, footer and links: "Investigation Capacity Retainer", "Single-Case Investigation", "CLEAR Investigation Framework™", "Investigation Readiness Intensive", "INVEXTRA™". Her body copy also writes "CLEAR By-the-Book™ Investigation Framework"; ask which is the short label.
- One primary button in the hero; internal links need not look like buttons. Only two button actions on the site: "Schedule a Conversation" and "Join the INVEXTRA waitlist".
- Her name and title are written "Dr. Marquita M. Booker, Esq." (the About caption currently says "Marquita M. Booker, Founder and Chief Legal Officer").
- The figures (2,000+, 15+, 250+) must be credited to her career, not to the firm.
- No operational promises (guaranteed start dates, fixed completion times, absolute costs).
- Hero image direction: a calm, modern conference room, or an approved spokesperson video; not a stock business person.
- Before publishing: approval of the reworded testimonials, titles and client logos; confirmation that the founder story may be published; INVEXTRA launch date re-confirmed. The assessment link is a placeholder ("[ASSESSMENT URL TO BE ADDED]") and stays off until the assessment is tested.
- Services page: do not repeat the founder story, testimonials or the full CLEAR explanation there.

### 2026-11-18 (end of session): INVEXTRA placement to decide
- Miguelle re-read her questionnaire: **"Keep the Invextra call to action visually separate so it reads as proof of depth, not a competing offer."**
- Where INVEXTRA is now: a strip at the foot of the hero with an outline button ("Join the INVEXTRA Waitlist"); the AI Solutions service card; a footer column with a text link. The card and the footer fit her instruction. The hero strip is separate and quieter than the main button, but it is still a second button on the first screen.
- **Open decision for Miguelle (nothing changed yet):** (1) keep the hero strip but make the button a plain text link (Claude's recommendation), or (2) move the strip out of the hero, for example to below the proof section.
- Miguelle is checking the rest of the questionnaire against the build; expect more alignment notes next session.

### 2026-11-18: footer built; entrance and scroll animations added across the page
**Footer** (`footer.site-footer` in `index.html`, styles in `css/global.css` part 9 because every page shares it)
- White with a navy rule on top, so her logo shows (we only have the dark logo). Under the logo: her tagline, "Precision in Process. Integrity in Practice." Columns: Explore (the five menu links), Contact (phone, email, address, same as the phone menu), INVEXTRA ("Investigation expertise, amplified." and a waitlist link). Bottom bar: copyright line and a Privacy Policy link (`privacy-policy/`, not built yet).
- The year is kept current by `global.js` (part 5). One column on phones, two from 576px, four from 992px.

**Animations** (Miguelle asked for fade-ins on every section, with variety: some from the top, some from the side, some words or letters one at a time)
- **Hero, on page load (CSS only, in `css/styles.css`):** the headline's words rise in one after another, then the sentence, the button and the INVEXTRA band fade in. The words are wrapped in `span.hero__word` in the HTML.
- **Everything below, as it scrolls into view** (`css/global.css` part 10, `javascript/global.js` part 4): elements carry `data-reveal="up|down|left|right|fade"`; `data-delay` or a parent `data-reveal-group` makes them arrive in turn. Headings carry `data-split="words"` (services, process, about, closing) or `data-split="letters"` (only "The By-the-Book Effect").
  - Services: heading by word, cards rise one after another. Process: same, five cards in turn. About: photo from the left, text and tabs fade in turn. Proof: heading by letter, sentence from the right, quotes rise in turn, sectors appear one by one. Closing: heading by word, the three list lines from the right. Footer: columns fade in turn.
- **Kept inside her brief ("subtle, linear transitions only"):** linear timing, short distances (24 to 32px), 0.5 to 0.6s, each thing animates once. Raise with her at the review; if she finds it too much, the letter-by-letter heading and the sideways moves are the first to remove.
- **Safeguards:** nothing is hidden unless JavaScript is running and the browser can watch scrolling (every hiding rule starts with `html.js`); split headings keep their full text in `aria-label`; visitors with "reduce motion" turned on get everything immediately; after an element has appeared its reveal attribute is removed so hover effects (the step cards) are unaffected.
- Checked: full-page screenshots at 390 and 1440 wide after the animations finish (everything visible, footer correct); a screenshot 0.45s after load shows the hero text still hidden, as intended; `global.js` passes a syntax check. **Not checked: the animations in motion** (a screenshot cannot show them), scroll behaviour on a real phone, other browsers, the no-JavaScript view, and the effect on PageSpeed (the hero text now appears about a second after load; measure LCP once the site is on a preview URL).

### 2026-11-18: favicon set and web manifest
- Made from the cube mark at the top of her logo (cropped from `documentation/source-images/by-the-book-logo-from-pdf-3335px.png`), without the "Workplace Investigations" wording, which is unreadable at icon size.
- Files at the site root: `favicon.ico` (16, 32 and 48 px, white rounded square behind the mark so it shows on dark browser tabs), `favicon.svg`, `apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png`, `site.webmanifest` (name, short name, the two PNG icons, theme colour `#0A1A33`). Linked from the `<head>` of `index.html`; every later page needs the same four lines, with `../` in front of each path for pages in folders.
- **`favicon.svg` is not a true vector:** no SVG of the logo has been supplied and this Mac has no PDF-to-SVG tool, so it is an SVG wrapper round a 128px picture of the mark. Replace it if she sends an SVG logo (already on the list in Section 8).
- A favicon is not a ranking factor. It is what Google shows beside the site's name in mobile results and what appears in tabs and bookmarks, so it helps recognition and clicks.
- Checked: the icons viewed at 16, 32, 48 and 512 px. Not checked: in a real browser tab, on a phone home screen, or in Google results (needs the live site).
- Still to add before launch: `og:image`, LocalBusiness schema, `robots.txt`, `sitemap.xml`, `404.html`.

### 2026-11-18: closing call to action built
- **Section:** `section.cta` in `index.html`, styles at the end of `css/styles.css` (`.cta…`). It is the page's one large burgundy area: the `layered-paper-edges` photo under a 90% burgundy layer. Made a phone crop, `images/backgrounds/layered-paper-edges-m` (720×1210, JPG and WebP).
- **Layout:** heading, one sentence, a white "Schedule a Conversation" button and an "or call (888) 397-6352" link; beside it on desktop (below it on smaller screens) "In 30 minutes, you'll get a clear picture of:" with three lines under thin rules.
- **Copy is hers,** from the closing block of her current homepage: the heading "Ready to Stop Putting Out Fires and Start Preventing Them?" (set in sentence case), the sentence "Let's look at your investigative system...", and the three list items. Only the button differs: her current site says "Get Your Investigation Strategy Audit"; the new site uses "Schedule a Conversation" throughout.
- In this section the white button fills with navy on hover (its usual burgundy fill would vanish on burgundy), and the keyboard focus ring is white.
- **To raise with her:** the proof section's line ("stop firefighting and start preventing fires") and this heading ("stop putting out fires and start preventing them") use the same image one section apart. Both are hers; she may want to change one. Also confirm "30 minutes" still describes the call, and which button wording she wants.
- Checked: screenshots at 390 and 1440 wide. Not checked: hover and focus states, tablet width, real devices, other browsers.

### 2026-11-18: proof section built (testimonials and sectors)
- **Section:** `section.proof#testimonials` in `index.html`, styles at the end of `css/styles.css` (`.proof…`, `.quote…`). Pale grey background (new token `--color-wash: #F3F4F6` in `css/global.css`) so it reads as its own block after the white About section. New helper `.nowrap` in `global.css` keeps "By-the-Book" on one line in the heading.
- **Heading and lead are hers:** "The By-the-Book Effect" and "When you work with us, you stop firefighting and start preventing fires." (both from her current homepage).
- **Three testimonials, copied unedited from her current homepage:** Dr. Jennifer Maedgen (The University of Texas at Austin), Gilbert Chrispin, SPHR (Nova Southeastern University), Kory Levingston (Tarrant County College). Side by side on desktop, stacked below 992px, names lined up along the bottom. No slider (her brief rules carousels out) and no cards: each sits under a thin navy rule with a burgundy quotation mark.
- **Left out:** her two other testimonials (Ebonni Chrispin, Karen Skyers), because both name her earlier business, Course Correction Consulting.
- **"Who we work with":** the seven sectors listed on her homepage, as a plain row.
- **Not included: client logos.** Her site shows about nine under "Who we've worked with", but we have no logo files, and only four can be named from their file names (City of Dallas, University of New Mexico, probably New Mexico State University, and "SAFE"). Ask her for the list of names and the logo files, and whether each organisation has agreed to be shown (Section 8).
- **To confirm with her:** which testimonials to keep, that each person is happy to be quoted on the new site, and the exact titles (Section 8).
- Checked: screenshots at 390 and 1440 wide (before the one-line heading fix). Not checked: tablet width, real devices, other browsers.

### 2026-11-18 (later still): the three pillars became tabs beside her photo
- Miguelle shared a reference (a heading, a row of tab names, one description showing at a time) and asked for the pillars to work like that, next to her image. The row of three pillars under the section was removed; they are now **tabs inside the text column**: Precision in Process, Integrity in Practice, Actionable Outcomes.
- **Styled for her brief, not like the reference's filled buttons:** plain text tab names on a thin rule, the open one marked by a burgundy underline that draws in (on phones the names stack and the marker is a burgundy bar at the left). The text fades between tabs with the site's linear timing. All panels share one grid cell, so the area keeps the height of the longest and the button below does not jump.
- **Accessibility:** proper `tablist` / `tab` / `tabpanel` roles, arrow keys, Home and End. **Without JavaScript all three pillars show one after another with their headings**; `javascript/global.js` (new part 3, "Tabs", works for any `data-tabs` block) reveals the tab row and adds `is-ready`.
- The two intro paragraphs were merged into one to make room. Each tab's text is longer than the old one-liners: her exact opening sentence plus a sentence condensed from her homepage. Draft for her approval.
- Files: `index.html`, `css/styles.css` (`.tabs…`, in the About block), `javascript/global.js`.
- Checked: screenshots at 390 and 1440 wide, first tab open; a second desktop screenshot with the second tab clicked by script (it switched correctly); `global.js` passes a syntax check. Not checked: keyboard use, a screen reader, the no-JavaScript view, tablet width, real devices, other browsers.

### 2026-11-18 (later): About section filled out; text first on phones
- Miguelle found the section "too plain and too basic" but wants to respect her brief. Two quiet additions, no cards or shadows:
  1. **Her three pillars in a row under the photo and text** (`ul.about__pillars`, `.pillar`): Precision in Process, Integrity in Practice, Actionable Outcomes, each under a thin navy rule with a line from her current homepage. The first sentence of each is her exact wording; the second sentence of "Integrity in Practice" and "Actionable Outcomes" is condensed from her page. Draft for her approval. The first two pillar names are also her tagline, so the tagline now appears on the page.
  2. **A flat tinted block behind the photo** (`.about__frame::before`, the mist colour), offset down and left so an L-shaped edge shows. It is a flat shape, not a shadow.
- **Phone order changed at Miguelle's request:** text first, then the photo. The text is now first in the HTML; from 768px up the CSS moves the photo to the left column (`order: -1`).
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width after this change, real devices, other browsers.

### 2026-11-18: About section built, with a divider leading into it
- **Layout (Miguelle's brief):** white background; her photo on the left with her name and title under it; on the right a heading, two short paragraphs and one button. On phones the photo comes first, then the text. Kept plain to match her brief (clean, minimal, professional, human-led): no cards, shadows or decoration beyond a thin burgundy rule above her name.
- **Section:** `section.about#about` in `index.html`, styles at the end of `css/styles.css` (`.about…`). The button "About the firm" goes to `about/` (not built yet).
- **Divider:** the same SVG shape now also sits at the foot of the process section (`.process__divider--bottom`), turned 180 degrees, so the white of the About section cuts up into the navy at an angle. The process section's bottom padding was increased to make room.
- **Copy is a draft made only of her own sentences** (read from her live site on 2026-11-18): the heading "By-the-Book investigates like we have to live with the outcome." is from her homepage; the paragraphs join phrases from her About page ("a team of dedicated professionals with a deep commitment to fairness, integrity, and the well-being of your organization"; "We stand apart by combining deep legal expertise with a compassionate, trauma-informed approach"; "we not only uncover the facts but also help your organization heal and grow"). Her title on the live site is "Founder/Chief Legal Officer", shown here as "Founder and Chief Legal Officer". Her live site has no bio or credentials for her, so none are stated.
- **Photo not confirmed:** the section uses `images/headshots/headshot-name-needed` (sent as "Headshot.png") and labels it Marquita M. Booker. **Confirm with her that this is her photo before anyone else sees the page** (Section 8). It is shown cropped to 4:5 by CSS; the file itself is unchanged.
- Checked: screenshots at 390, 800 and 1440 wide. Not checked: real devices, other browsers, hover on the button.

### 2026-11-17 (afternoon): hover effect on the process cards
- At Miguelle's request each step card now reacts to the mouse: it lifts 6px, its burgundy top rule thickens and its title turns burgundy, all with the site's 0.25s linear timing. No shadow (her brief rules shadows out). It only applies on devices with a mouse or trackpad (`@media (hover: hover)`). Rules are in `css/styles.css` just above `.step-card__number`.
- Not viewed in a browser: a hover can't be captured in a still screenshot, so Miguelle needs to check it by hand.

### 2026-11-17 (afternoon): process cards always open
- At Miguelle's request the five step cards no longer open and close. Each card now shows its number, title and text all the time, so the rows in the grid are even. The `<details>`/`<summary>` markup and the plus/minus icon were removed from `index.html`; the matching rules (`.step-card__details`, `.step-card__summary`, `.step-card__icon`) were removed from `css/styles.css`.
- Checked: screenshots at 390, 800 and 1440 wide. Not checked: real devices, other browsers.

### 2026-11-17 (afternoon): process section changed to a centred intro and a card grid
- Miguelle did not like the left-text, right-cards layout. **New layout:** the heading, paragraph and button are centred above the cards from 768px up (left-aligned on phones, like the rest of the page). The cards are a grid: one column on phones, two from 768px (fifth card centred on its own row), three from 992px (fourth and fifth centred on the second row). The sticky left column and the left-to-right navy fade are gone; the navy layer over the photo is now an even 86%.
- **Decisions from Miguelle:** the framework is called **"CLEAR By-the-Book™"**, as in her questionnaire (Miguelle changed the text in `index.html`). The cards keep opening in place; no separate "read more" pages.
- Known effect: because only the open card grows, the row with the open card has empty space beside or under it. Raised with Miguelle; the alternative is to show every card's text all the time.
- Files: `css/styles.css` (the two media queries at the end), a comment in `index.html`.
- Checked: screenshots at 800 and 1440 wide. Not checked: phone width after this change, clicking the cards, real devices, other browsers.

### 2026-11-17 (afternoon): angled divider between services and process
- Miguelle supplied `triangle-asymmetrical-divider-inverse.svg` and asked for it between the services and process sections. It is placed inline at the top of `section.process` in `index.html` (`.process__divider`), filled white to match the services section above, so the white appears to cut into the navy at an angle. It stretches to any width; its height is the `--divider-h` value on `.process` in `css/styles.css` (40px on phones up to 104px on wide screens). The section's top padding was increased so the text and cards clear it.
- If the services section's background ever changes from white, the divider's fill must change to match.
- Checked: screenshots at 390 and 1440 wide. Not checked: tablet width, real devices, other browsers.

### 2026-11-17 (afternoon): "Our process" section (CLEAR framework) built
- Built to Miguelle's layout: a section with a background image, a heading, paragraph and "Schedule a Conversation" button, and five numbered step cards. On desktop (992px up) the text is on the left and stays in view while the cards sit on the right; on phones and tablets the text is on top and the cards stack below.
- **Section:** `section.process#process` in `index.html`, so the "Our Process" menu link now lands on it. Styles are at the end of `css/styles.css` (`.process…`, `.step-card…`).
- **Cards open and close.** Each card is a `<details>` element (no JavaScript). The number is top left, the title under it, a plus/minus sign on the right. Clicking a card shows its text; opening one closes the others (they share `name="clear-steps"`); the first starts open. In older browsers that don't support the shared name, more than one card can be open at once, which is harmless.
- **Background:** `navy-silver-staircase` with a see-through navy layer over it (88% on phones; on desktop it is solid on the left and thinner on the right so the staircase shows behind the cards). Made a phone crop, `images/backgrounds/navy-silver-staircase-m` (720×1210, JPG and WebP).
- **Copy is a draft.** The heading "Our investigation process", the five step names and their text come from the "Our Investigation Process" part of her current `/third-party-investigations` page, trimmed. The opening sentence of steps 1 to 4 is her wording; the rest is condensed from her page and should be checked against it, then approved by her (Section 8).
- **Name of the framework:** her live site calls it the "CLEAR Investigation Framework™"; her questionnaire calls it "CLEAR By-the-Book™". The page uses the live-site name for now (Section 9).
- Checked: screenshots at 390 and 1440 wide with the first card open. Not checked: opening and closing the cards by click or keyboard, the sticky text while scrolling, tablet width, real devices, other browsers.

### 2026-11-17: "View all services" button made solid navy
- At Miguelle's request the "View all services" button changed from a navy outline to **solid navy with white text** (burgundy fill on hover). Added `.btn--navy` to `css/global.css`; the button in `index.html` now uses it. `.btn--outline` is still in the stylesheet but currently unused.
- Not viewed in a browser after the change.

### 2026-11-17 (later): services rebuilt as three grouped cards
- Miguelle asked whether cards, grouped and laid out horizontally, would be better than the row list, and left the choice to Claude. **Decision: three flat cards, one per practice area** (Investigations, Training & Capacity Building, AI Solutions). Each card has one sentence about the area (her wording) and its services as links to their detail pages. All five services still appear.
- **Why not a horizontal swipe row on phones:** that is a carousel, which is on her "avoid" list. Cards sit side by side from 992px up, stack on phones, and from 768px to 991px each card puts its text on the left and its links on the right.
- No shadows or gradients: a thin border with a navy rule across the top of each card. The copper marker is on the AI card title.
- The row-list version (classes `.service`, `.services__list`) was replaced. New classes: `.services__cards`, `.service-card` and its parts, in `css/styles.css`.
- The visible `[PLACEHOLDER]` for Overflow Investigation Support is gone, because individual services no longer carry their own description on the homepage.
- This layout assumes her services fit three areas. Revisit it when her real list arrives.
- Checked: screenshots at 320, 390, 768, 1024 and 1440 wide. Not checked: hover states, real devices, other browsers.

### 2026-11-17: services section, tighter phone hero, navigation reordered
- **Services section added** to `index.html` (`id="services"`), styled in `css/styles.css`. It is a list of rows divided by hairlines, not boxed cards: practice area, service name, one or two sentences, and an arrow. The whole row is a link.
- **The service list is temporary**, taken from her current site because the proposal doesn't name the services. Miguelle is asking her for the real list. Current rows: Third-Party Investigations, Overflow Investigation Support, Investigation Readiness Intensive, Fair Housing Investigation Advancement Program, INVEXTRA. The wording is hers, lightly trimmed. **Overflow Investigation Support shows a visible `[PLACEHOLDER]`** because her site lists it by name only. The intro sentence is also her wording.
- Each row links to a detail page that doesn't exist yet (`services/third-party-investigations/`, `services/overflow-investigation-support/`, `services/investigation-readiness-intensive/`, `services/fair-housing-investigation-program/`, `services/invextra/`). These addresses fall under the page-address question in Section 9.
- **Hero on phones:** removed the full-screen height, so the hero is now only as tall as its text plus 3.5rem of padding above and below (Miguelle found the empty space too large). Tablets and up keep their height. Miguelle's own change, centring the hero text vertically, is kept. The `align-items: center` Miguelle had tried on `.hero` was removed at their request, and the INVEXTRA band now has `width: 100%`.
- **Navigation reordered to follow the homepage sections:** Services, Our Process, About, Investigation Capacity, Contact. "Home" was dropped (the logo is the home link). **"Our Process" is the menu name for the CLEAR framework section**, chosen because "CLEAR" means nothing to a first-time visitor; her current site also introduces it under "Our Investigation Process". It links to `#process` on the homepage, so the CLEAR section must be given `id="process"` when it is built. The other links still go to their own pages.
- Added to `css/global.css`: the `--space-section` token (space above and below sections) and the `.btn--outline` button for white backgrounds.
- Planned homepage order from here: CLEAR framework, then About and proof (firm intro, who they've worked with, testimonials), then a closing call to action, then the footer.
- Checked: screenshots at 320, 390, 768 and 1440 wide. Not checked: hover states, real devices, other browsers.
- Note: during this session an edit to `index.html` was overwritten once, when the file was saved from the editor with older contents. If a section goes missing, check for that first.

### 2026-11-17: logo link warning cleared
- VS Code's "web accessibility" checker warned "Provide a descriptive text in between the tags" on the logo link in `index.html`. The link was already named by the logo's alt text, but the checker only counts text written inside the link. Added a visually hidden "Home:" before the logo, so the link now reads "Home: By-the-Book Workplace Investigations". The Problems panel shows no warnings for the file. Use the same pattern for any other link that contains only an image.

### 2026-11-16 (first build): header, navigation and hero
- **Read the final proposal** and recorded the scope (Section 3a). Renamed it to `documentation/client-brief/website-proposal-final-2026-10-20.pdf` and removed the identical second copy from `documentation/`.
- **Backgrounds:** the four images Miguelle added to `images/backgrounds/` were converted to JPG and WebP with clean names; the PNG originals moved to `documentation/source-images/backgrounds/`. Made a phone crop of the hero (`hero-m`). Made a small header logo (`by-the-book-logo-sm`).
- **Created** `index.html`, `css/global.css`, `css/styles.css`, `css/no-js.css` and `javascript/global.js`: white sticky header, phone menu with staggered fade-in, hero with the INVEXTRA band, back-to-top button. Details and what was checked are in Section 7.
- **Logged for later:** the page-address question and other launch confirmations (Section 9); the hero wording as a draft for her approval (Section 8).
- Not done or not verified: see "Not yet checked" and "Known gaps" in Section 7.

### 2026-11-16 (fonts)
- Miguelle chose the fonts: Libre Baskerville (headings) and Source Sans 3 (body).
- Added `fonts/` with four Latin-subset variable WOFF2 files (table and `@font-face` rules in Section 3). Each file was opened and checked: correct family, style and weight range.
- Added `documentation/font-licenses/` with both SIL Open Font License texts.
- Not done: `css/global.css` does not exist yet, so the `@font-face` rules are recorded in Section 3 but not yet in a stylesheet. The fonts have not been viewed rendered on a page.

### 2026-11-16 (later): switched to HTML, brief reviewed, files organised
- **Stack changed to HTML, CSS and JavaScript.** Replaced `handbook/CLAUDE.md` and `handbook/project-checklist-template.md` with the v2.1 editions (handbook copied unchanged from the master, plus a note at the top and a change log as Section 22). Rebuilt `documentation/project-checklist.md` from the v2.1 template. The Next.js handbook v3.0 moved to `New Web Design Folder/MigsFlow Handbook/v3.0-nextjs-tailwind/`.
- **Reviewed** the brand guide, the questionnaire, the image files and the live site (homepage on desktop and phone, the sitemap, and the headings of five inner pages). Findings are in Sections 2–4.
- **Documents organised:** brand guide and questionnaire renamed and moved to `documentation/client-brief/`.
- **Images organised:** originals moved untouched to `documentation/source-images/`. Web versions created in `images/brand/` and `images/headshots/` (table in Section 5): headshots as JPG then WebP with `-m` mobile sizes; logos as trimmed transparent PNG plus WebP, the main logo rendered from the vector PDF.
- Added `.gitignore`.
- **Decisions from Miguelle:** navy `#0A1A33`; navy body text on light backgrounds, to be explained to Marquita at the homepage review; image follow-ups logged (Section 8).
- Not done: no site code, no Git repository, no Netlify site. Proposal and agreement not read. Full URL audit not done. Headshots not yet cropped to a final shape.

### 2026-11-16: folder prepared
- Folder already held `images/` and `documentation/` with the client's files, added by Miguelle.
- Added the handbook (at that point the Next.js v3.0 edition, since replaced), the project checklist and this file.
