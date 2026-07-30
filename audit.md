# Portfolio Audit — hi.bolujxl.com
**Subject:** Boluwatife Jakobe — Product Designer & Frontend Engineer  
**Audited:** May 2026  
**Pages reviewed:** Index, Bio, Works  
**Dimensions:** 5 categories · 28 findings  

---

## Overall Score: 73 / 100

> Solid foundation, a few critical gaps. The site is clean, intentional, and well-positioned for this level of experience. The hero copy is genuinely differentiated, the meta tags are well-formed, and WebP image usage signals performance awareness. Key opportunities are in lead capture friction, an SEO canonicalization bug, one screen reader issue, and a lack of in-site case study depth.

| Category | Score | Status |
|---|---|---|
| Lead turnaround time | 62/100 | ⚠️ Needs work |
| Accessibility | 70/100 | ⚠️ Moderate |
| User experience | 80/100 | ✅ Good |
| SEO & standards | 72/100 | ⚠️ Moderate |
| Code quality | 82/100 | ✅ Good |

---

## 01 — Lead Turnaround Time
**Score: 62/100 · Needs work**

### ✅ Passes

- **CTA is above the fold** — "Book a call" is immediately visible in the hero with no scrolling required. Good placement for warm leads.
- **Multiple contact channels** — Email, GitHub, Behance, X, Medium, and a cal.com booking link all exist. Good coverage across different lead types.

### ⚠️ Warnings

- **Single CTA type repeated throughout** — Both the hero and the contact section use the identical "Book a call" CTA. A secondary softer CTA — "Tell me about your project" or "Send a message" — would capture undecided leads who aren't ready to schedule.
- **No availability signal** — There is no "currently available for work" or "open to projects from [date]" indicator anywhere. Recruiters and inbound clients can't tell if you're free, and may not reach out assuming you're busy.

### ❌ Failures

- **No low-friction contact form** — The only primary CTA is "Book a call." A cold lead who isn't ready to commit to a 30-minute meeting has no option except manually drafting an email. This is a major drop-off point. Most leads that could convert, won't.
- **cal.com is a cold-lead blocker** — Sending a brand-new visitor straight to a calendar scheduling interface without any prior message exchange is high friction. Most cold leads abandon the flow here. This CTA is best suited for leads that have already expressed interest.

### 💡 Recommended Fix
Add a simple contact form (name, email, project type, message) as the primary CTA inside the contact section. Keep "Book a call" as a secondary option for warmer leads. Add a small "Available for work" badge near your name or in the nav — one line, updated as your status changes.

---

## 02 — Accessibility
**Score: 70/100 · Moderate**

### ✅ Passes

- **Skip-to-content link implemented** — "Skip to main content" is present. A strong signal that accessibility was considered from the start. Many portfolios at this level skip this entirely.
- **Images have alt text** — Logo and profile image both carry descriptive alt attributes — good baseline practice.
- **Social icon links have alt text** — GitHub, Behance, X, and Medium icon links include alt attributes rather than being empty anchors.

### ⚠️ Warnings

- **No `lang` attribute confirmed** — The `<html>` tag should include `lang="en"`. Screen readers use this to select the correct voice profile and pronunciation rules. Without it, behaviour is browser-dependent.
- **Duplicate alt text on homepage** — Both the logo and the hero portrait use `alt="Boluwatife"`. A screen reader user hears the same description twice in the same viewport. Differentiate with "Boluwatife logo" vs "Boluwatife portrait".
- **Color contrast unverified** — Cannot assess from markup alone. Run WebAIM Contrast Checker or Lighthouse against your palette, especially muted secondary text colors.
- **External links don't warn users** — Links leaving to Behance, Vercel, etc. should signal this via `aria-label="Project name (opens in new tab)"`.

### ❌ Failures

- **"arrow_outward" leaks into link text — critical** — The Material Icons `arrow_outward` glyph is rendering as literal text inside every project link. Screen readers will announce "RSA Risk Management arrow outward" on every card. Add `aria-hidden="true"` to the icon element immediately.

### 💡 Recommended Fix
```html
<!-- Before -->
<a href="...">Project Name arrow_outward</a>

<!-- After -->
<a href="..." target="_blank" aria-label="Project Name (opens in new tab)">
  Project Name <span aria-hidden="true" class="material-icons">arrow_outward</span>
</a>
```

---

## 03 — User Experience
**Score: 80/100 · Good**

### ✅ Passes

- **Hero copy is strong and differentiated** — "Every interaction feels like someone cared" is memorable, specific, and tied to the dual skill set. Not generic.
- **Navigation is lean and clear** — Three-item nav (bio / my work / reach me) reduces cognitive load. Exactly right for a portfolio.
- **Project descriptions are specific** — Each card states the tech stack and context ("React rebuild", "HTML, CSS, and JS"). Engineers appreciate specificity.
- **Bio page shows personality and depth** — Tools section, writing section, and experience timeline are well-organized. The writing section adds credibility beyond the work itself.

### ⚠️ Warnings

- **No case study depth on the main site** — The works page is a list of links to external sites or Behance. There are no in-site case study pages showing your design process. This is the biggest UX gap for hiring managers, who want to see how you think, not just what you shipped.
- **No work categorization or filter** — 10 projects with no distinction between design-only, dev-only, and full-stack. A product design recruiter and a frontend hiring manager have very different goals — let them self-select.
- **Writing/blog is buried in the bio page** — Three strong articles exist on Medium. They'd generate organic traffic and credibility if surfaced more prominently. Even a "Writing" link in the nav would help.

### ❌ Failures

- **Unstable Vercel preview URL in works** — The Axtract project link appears to contain a deploy preview hash in the URL. Preview URLs expire when redeployed. Always map portfolio projects to a stable custom domain or subdomain.

### 💡 Recommended Fix
Build at least 2 in-site case study pages. They don't need to be long — a problem statement, your approach, key decisions, and the outcome is enough. This is the single highest-leverage change for hiring outcomes.

---

## 04 — SEO & Standards
**Score: 72/100 · Moderate**

### ✅ Passes

- **Meta descriptions present** — All three pages have unique, well-written meta descriptions. Above average for a personal portfolio.
- **Open Graph tags complete** — `og:title`, `og:description`, `og:image` (with dimensions), `og:type`, `og:url` — all present. Link previews will render correctly on social and Slack.
- **robots: index, follow** — Pages are correctly set to be crawled and indexed.

### ⚠️ Warnings

- **No sitemap.xml** — A sitemap helps search engines discover all pages reliably. With only 3 pages it's lower priority, but it's good practice and takes 10 minutes.
- **OG image is a personal photo** — The `og:image` is the portrait. A branded social card (name, title, tagline on a clean background) performs better as a preview and looks more intentional.

### ❌ Failures

- **Canonical URL mismatch — critical SEO bug** — Every page has `canonical: bolujxl.com` but the live site serves from `hi.bolujxl.com`. Google treats these as duplicate content pointing to a non-serving URL. Fix: either redirect `hi.bolujxl.com → bolujxl.com` and serve from the root domain, or update all canonical tags to match `hi.bolujxl.com`. Pick one URL and commit.
- **No structured data (JSON-LD)** — A `Person` schema with name, job title, social profiles, and `sameAs` links would significantly improve search appearance and entity recognition.

### 💡 Recommended Fix: JSON-LD to add to `<head>`
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Boluwatife Jakobe",
  "jobTitle": "Product Designer & Frontend Engineer",
  "url": "https://bolujxl.com",
  "sameAs": [
    "https://github.com/Bolujxl",
    "https://www.behance.net/boluJxl",
    "https://x.com/Bolujxl",
    "https://medium.com/@bolulawal99"
  ]
}
```

---

## 05 — Code Quality & Engineering
**Score: 82/100 · Good**

### ✅ Passes

- **WebP images used throughout** — All images use the `.webp` format. Modern, compressed, and well-supported. Shows performance awareness.
- **Semantic HTML structure** — Heading hierarchy (h1 → h2 → h3 on bio) is correct across pages. Clean use of anchor elements for navigation.
- **Responsive viewport meta tag** — `width=device-width, initial-scale=1.0` is correctly set on all pages.
- **Clean URL structure** — `bio.html` and `works.html` are readable and predictable. No query string complexity.

### ⚠️ Warnings

- **Unstable Vercel preview URL** — The Axtract project link contains a deploy hash. This will break when redeployed. Map it to a stable subdomain (e.g. `axtract.bolujxlstudio.com`).
- **No custom 404 page checked** — A custom 404 with navigation back to the portfolio is standard practice and keeps lost visitors in the site rather than hitting a dead end.
- **No Lighthouse scores surfaced** — Can't verify performance scores from markup alone. Run Lighthouse, target 90+ across Performance, Accessibility, Best Practices, and SEO. Displaying those scores on your bio page is a concrete credibility signal for a frontend role.

---

## Priority Action List

These are ordered by impact. Do them in this sequence.

**1. Fix the canonical URL mismatch**  
Every page declares `canonical: bolujxl.com` but serves from `hi.bolujxl.com`. This is actively hurting your SEO. Set up a redirect or fix the canonicals — takes under an hour.

**2. Fix the `arrow_outward` screen reader leak**  
Add `aria-hidden="true"` to every instance of the icon. This is a one-line fix per element and it's currently making every project card read incorrectly to screen readers.

**3. Add a contact form**  
Replace the sole "Book a call" CTA with a simple embedded form. Keep the cal.com link as a secondary option. This is the highest-impact change for converting cold leads.

**4. Build 2 in-site case study pages**  
Problem → approach → decisions → outcome. Doesn't need to be long. This is what separates portfolios that get people hired from portfolios that get scrolled past.

**5. Add JSON-LD Person schema**  
Copy the snippet above into your `<head>`. Helps Google understand who you are and surface you for relevant queries.

**6. Add an availability signal**  
One line near your name or nav: "Available for work" or "Open to freelance from July 2026". Update it as your situation changes.

---

*Audit produced by Claude (Anthropic) · May 2026*  
*Site reviewed: https://hi.bolujxl.com — Index, Bio, Works pages*