# Integrations

Every outside service the site sends data to (handbook Section 13). Update this file whenever one is added or changed.

## Contact form → Netlify Forms

| | |
|---|---|
| **Where** | `contact/index.html`, the form named `contact` (section 02) |
| **Service** | Netlify Forms, part of the site's Netlify hosting |
| **Account owner** | To confirm: whoever owns the Netlify site (MigsFlow or Marquita) |
| **Where submissions go** | The Netlify dashboard (Forms > contact), plus an email for each one. The email address is set in Netlify: Site configuration > Forms > Form notifications > Add notification > Email. **To confirm:** which inbox (probably hello@bythebookinvestigations.com). |
| **Cost** | The free plan includes 100 submissions a month. Check the current Netlify pricing before launch. |
| **Fields sent** | name, email, phone (optional), organization (optional), topic (General question / Third-Party Protected-Class Investigations / Investigation Readiness Intensive), message |
| **Spam** | Honeypot field `bot-field` (`netlify-honeypot="bot-field"`). Netlify's own spam filter is also on by default. |
| **Keys or secrets** | None. Netlify finds the form in the HTML when the site is deployed (`data-netlify="true"`). |
| **Script** | `javascript/global.js` part 10: checks the fields, posts them to Netlify in the background, shows the thank-you message. Without JavaScript the form posts normally and Netlify shows its own thank-you page. |
| **Topic chosen by a link** | `contact/?topic=investigations` or `contact/?topic=readiness` (or `general`) ticks that topic in advance. |
| **Tracking** | When GA4 is added, the script sends a `generate_lead` event on each successful send. Mark it as a key event in GA4. |

### Before launch
1. Deploy to Netlify, then check that "contact" appears under Forms in the dashboard. If it does not, check that form detection is on (Forms > Enable form detection) and redeploy.
2. Add the email notification (above).
3. Send a real test message from the live site and confirm it arrives in the inbox (handbook: "a real test submission before launch").
4. Build the Privacy Policy page: the form links to `privacy-policy/`.
