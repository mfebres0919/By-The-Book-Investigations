# By-the-Book Workplace Investigations: project guide and change log

This file is the memory for this client project. It records what the project is, what has been decided, and every change made to the site, so the work can continue even if a chat is lost.

The build standards are in the MigsFlow handbook (v2.1, HTML, CSS and JavaScript), loaded here:

@handbook/CLAUDE.md

---

## 1. How to work in this project

- **Log every change.** Before ending any reply in which the site, its files, its settings, its accounts or its content changed, add a dated entry to the change log (Section 10) and update the other sections if a fact, decision or open question changed.
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
| 2026-11-16 | Buttons: burgundy on white backgrounds, white on navy backgrounds (burgundy disappears against navy). All buttons fill from the bottom on hover. |
| 2026-11-16 | Motion is linear and short (0.25s), per her brief. The only staged animation so far is the phone menu. |
| 2026-11-16 | Logos live in `images/brand/` (the handbook's name for that folder) and team photos in `images/headshots/`. |

Project-specific exceptions to the handbook: none.

## 7. Current state and next steps

**State at the end of 2026-11-17 (where to pick up):** the homepage has its header and navigation, hero, and services section (three grouped cards). Nothing else is built. The folder is not a Git repository yet and nothing is deployed. The change log in Section 10 has the detail of each change; where it differs from the summary below, the change log is newer.

**Pick up here next session**
1. Miguelle is asking Marquita for her real list of services. When it arrives, update the service cards (they are a stand-in from her current site).
2. The **"Our process" (CLEAR framework) section is built** (2026-11-17, see the change log). Miguelle to review it.
3. The **About, proof and closing call-to-action sections are built** (2026-11-18). Next: the footer (her tagline belongs there). Miguelle was to write the footer themselves in the Next.js practice project only; on this client site Claude builds it unless told otherwise.
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
- No footer yet, and her tagline ("Precision in Process. Integrity in Practice.") is not on the page yet. It was left out of the hero on purpose to keep it quiet; it belongs in the next section or the footer.
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
- **The INVEXTRA waitlist address.** The button points at `https://invextra.ai/`, from her questionnaire. Confirm the exact page. Her current site also has its own `/invextra-waitlist` page.
- **Contact details in the phone menu:** (888) 397-6352, hello@bythebookinvestigations.com, and 2591 Dallas Parkway, Suite 300, Frisco, TX 75034. Copied from her current site; confirm they are current and that she wants the street address shown.
- Whether `IMG_1708.MOV` (in `documentation/source-images/`) belongs in this project.
- Whether the GitHub repo will be private. The client brief and original images are git-ignored either way, so they exist only on this Mac unless backed up elsewhere.

## 10. Change log

Newest first. One entry per working session or per significant change: what changed, which files, and anything left unverified.


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
