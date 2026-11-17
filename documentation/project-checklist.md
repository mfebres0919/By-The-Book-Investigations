# Project Checklist: By-the-Book Workplace Investigations

*MigsFlow project checklist, from handbook v2.1. Copied from `handbook/project-checklist-template.md` on 2026-11-16. Keep it current until the 30-day check-in.*

| | |
|---|---|
| **Client** | By-the-Book Workplace Investigations |
| **Main contact** | Marquita Booker |
| **Project type** | ☐ New build ☑ Redesign / migration (current site: www.bythebookinvestigations.com, on Squarespace) |
| **Plan** | ☐ Monthly ☐ Lump Sum ☐ Enterprise |
| **Live domain** | www.bythebookinvestigations.com |
| **Preview URL** | |
| **GitHub repo** | |
| **Start date** | 2026-11-16 (folder prepared) |
| **Target launch** | |
| **Launched on** | |

**How to use it:**
- Tick items as they're done.
- Items tagged *(Redesign)* only apply to redesigns and migrations. On a new build, write N/A instead of deleting them.
- Anything still open at launch gets a note explaining why.
- The handbook section with the details is in brackets, e.g. [§18].

---

## 1. Discovery [§17]

- [x] Business name and main contact confirmed (from the design questionnaire)
- [ ] The site's main job agreed (leads, bookings, information, sales)
- [ ] Scope confirmed in writing: pages, features, integrations (matches the proposal)
- [ ] Brand assets received: logo, colors, fonts, photos, written content
- [ ] Form destination email confirmed: ______________________
- [ ] Legal and industry needs identified (privacy policy, disclaimers, license numbers, SMS consent)

## 2. Current setup and access [§17]

- [ ] Domain registrar: ______________ Owner and controller: ______________
- [ ] DNS managed at: ______________
- [ ] Email hosted at: ______________
- [x] Current website platform and host: Squarespace *(Redesign)*
- [ ] GA4: ☐ exists ☐ none. Access granted.
- [ ] Search Console: ☐ exists ☐ none. Access granted.
- [ ] Google Business Profile: ☐ exists ☐ none. Access granted.
- [ ] Existing forms, booking tools, CRM, pixels and marketing tools listed
- [ ] Access received through invitations or delegated access, **not passwords**

## 3. Old site audit *(Redesign)* [§18]

- [ ] Every URL listed, including pages not in the menu (sitemap + Search Console + crawler)
- [ ] Client confirmed which hidden or old pages to keep
- [ ] Titles, meta descriptions, headings and main keywords recorded
- [ ] Existing redirects, canonicals, `robots.txt`, sitemap and schema noted
- [ ] Every form and its destination noted
- [ ] Tracking noted: GA4 ID __________, GTM ☐ yes ☐ no, ad pixels, conversion events
- [ ] Old site backed up (content, images, key page copies)
- [ ] Anything the new stack can't reproduce flagged and a solution agreed

## 4. URL map and redirects *(Redesign)* [§12, §18]

| Old URL | New URL | Keep / 301 / Retire | Tested |
|---|---|---|---|
| | | | ☐ |
| | | | ☐ |
| | | | ☐ |

- [ ] Every old URL has a row
- [ ] Redirects go to the closest matching page, never to the homepage by default
- [ ] `_redirects` written: no chains, no loops
- [ ] Internal links point straight at the new URLs

## 5. Build and pre-launch QA [§19]

- [ ] Built and reviewed on a preview. Client approved the preview.
- [ ] Preview kept out of search. Canonicals and sitemap use the production domain.
- [ ] All pages and content migrated, with no placeholders left
- [ ] Menus, dropdowns and every link work. No broken links.
- [ ] Responsive from 320px to 1920px, with no sideways scrolling
- [ ] Accessibility: WCAG 2.2 AA, axe/WAVE zero errors, keyboard and VoiceOver pass
- [ ] PageSpeed mobile on every page: Performance 98+, other categories 100 (scores saved)
- [ ] Tested in Chrome, Safari, Firefox and on a real phone
- [ ] SEO basics: unique titles (≤50 characters), descriptions, one `h1`, alt text, schema, favicon set, OG image, `robots.txt`, `sitemap.xml`, `404.html`
- [ ] Every form submitted for real and received in the right inbox (spam folder checked)
- [ ] Form validation, success and error messages, and any auto-reply emails work
- [ ] Form events show up in GA4
- [ ] Privacy policy, disclaimers and SMS consent in place where needed. No unnecessary sensitive data collected.
- [ ] No secrets in the code. Integrations documented.

## 6. Google and integrations [§18]

- [ ] GA4: existing property reused (or new one created for a new build). No duplicate tags.
- [ ] GA4 key events (form submits, consultations) set up and confirmed in Realtime or DebugView
- [ ] Search Console property kept or verified
- [ ] Google Business Profile website link correct. Name, address and phone match the site.
- [ ] Google Ads landing pages and conversion tracking tested *(if the client runs ads)*
- [ ] CRM, booking and email-marketing connections tested
- [ ] Cookie or consent needs checked for the client's audience

## 7. Domain, DNS and hosting [§14]

**DNS log (record everything before changing anything):**

| Type | Name | Value | TTL | Used for | Changed? |
|---|---|---|---|---|---|
| A | @ | | | website | |
| CNAME | www | | | website | |
| MX | @ | | | email (don't touch) | |
| TXT | @ | | | SPF / verification (don't touch) | |
| | | | | | |

- [ ] All existing records exported or screenshotted into the log above
- [ ] Email records identified, and left untouched
- [ ] Netlify site connected to the GitHub repo, with the production domain added
- [ ] TTL on the website records lowered to 300 the day before launch
- [ ] Nameservers stay where they are *(or, if moving: email records recreated first)*
- [ ] Old site stays live until the new one is verified

## 8. Launch day [§20]

- [ ] Client's written approval to launch
- [ ] Final backup of the old site *(Redesign)*
- [ ] Production deployed, and the preview `noindex` removed
- [ ] Website DNS records updated (website records only)
- [ ] Domain resolves to the new site. HTTPS works on `www` and the bare domain.
- [ ] Every page and menu link clicked
- [ ] Every form submitted and received
- [ ] Redirects from the URL map tested *(Redesign)*
- [ ] Nothing blocked from search (`noindex`, `robots.txt`)
- [ ] GA4 Realtime shows visits
- [ ] Sitemap submitted in Search Console
- [ ] Google Business Profile link checked
- [ ] Business email sends and receives
- [ ] Checked on desktop and a phone
- [ ] Client told the site is live

## 9. After launch [§20]

**First 24–72 hours**
- [ ] Site up, HTTPS valid
- [ ] Forms arriving in the right inbox
- [ ] Analytics recording visits and events
- [ ] Important old URLs return the right page, never a 404
- [ ] No DNS or email issues

**First 30 days**
- [ ] Search Console indexing and crawl errors reviewed
- [ ] Impressions and clicks show no unexplained drop
- [ ] Conversions still recording
- [ ] Migration bugs fixed within the support period
- [ ] Client check-in done and the client is happy
- [ ] Old hosting cancelled, only after all of the above *(Redesign)*

## 10. Handoff [§20]

- [ ] Live URL and care guide sent to the client
- [ ] Domain, DNS, hosting and email explained: who renews what, and when
- [ ] Ownership and access confirmed for the client's plan
- [ ] Recurring hosting or maintenance charges confirmed
- [ ] How to request updates, and the support period, explained
- [ ] Third-party services listed with account owners and costs

---

## Change log

Record anything significant: DNS edits, redirects, accounts connected, pages retired, launch.

| Date | Change | By |
|---|---|---|
| 2026-11-16 | Project folder prepared: handbook v2.1, this checklist and the project `CLAUDE.md` added. Client images optimised into `images/brand/` and `images/headshots/`. No site code yet. | Claude |
| | | |
