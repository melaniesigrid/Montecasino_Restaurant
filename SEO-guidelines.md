# SEO Guidelines for Web Projects

A practical reference for building sites that are discoverable, shareable, and understandable by both people and search engines. Covers on-page SEO, technical requirements, content strategy, accessibility, and social metadata.

---

## 1. Page-Level SEO

### Titles

- Use one unique `<title>` per page.
- Target 50–60 characters. Google renders approximately 580px of title width — longer titles are truncated. Character count is a proxy; pixel width is what actually matters.
- Put the most important keyword first, brand name last: `Page Topic – Brand Name`.
- Note: Google rewrites title tags in roughly 60% of cases when it determines the `<h1>`, anchor text from inbound links, or visible page headings are a better match. Write accurate, descriptive titles and Google will usually respect them.
- Duplicate titles across pages cause Google to guess which page to surface for a query, often indexing the wrong one.

### Meta descriptions

- Provide a unique `<meta name="description">` for every page.
- Target 140–155 characters. Google truncates longer descriptions and rewrites approximately 70% of all descriptions regardless — but a well-written description is still the best default and influences click-through rate even when rewritten.
- Summarise the page purpose and include a natural call to action.
- Do not repeat the title verbatim or stuff keywords.

### Headings

- Use exactly one `<h1>` per page. It should contain the page's primary topic and keyword.
- Use `<h2>` through `<h4>` to build a logical outline — never skip levels.
- Headings help Google understand page structure and topic hierarchy, and are sometimes used as the source for featured snippet titles. Write them as descriptive, user-readable labels.

### URLs

- Use clean, lowercase, hyphenated slugs: `/contact`, `/services/web-design`, `/about`.
- Choose permanent URLs. Changing a slug breaks inbound links and requires 301 redirects to preserve equity.
- URL parameters (`?sort=price&page=2`) are crawled by Googlebot, but create duplicate content. Use canonical tags, parameter handling in Google Search Console, or `noindex` to manage them.
- Fragment identifiers (`#section-id`) are stripped by browsers before the request is sent to the server — Googlebot never sees them. They cannot be used as crawl targets.
- Be consistent with trailing slashes: `/page/` and `/page` are two distinct URLs. Pick one and redirect the other.

### Pagination

- `rel="prev"` and `rel="next"` were deprecated by Google in 2019 and are no longer used.
- Each paginated page should have a self-referencing canonical pointing to itself (not to page 1).
- If the full dataset can be served on a single "view all" page without performance issues, that is the simplest SEO solution.
- For infinite scroll or load-more patterns, ensure each batch of content has a crawlable URL equivalent.

---

## 2. Technical SEO

### HTTPS

- HTTPS is a confirmed Google ranking signal, but it functions as a tiebreaker — not a significant ranking factor on its own. The primary SEO benefit is that HTTPS→HTTPS referrals preserve referral source data in analytics, while HTTPS→HTTP referrals are stripped to "direct."
- Ensure HTTP URLs 301-redirect to HTTPS — do not serve content on both protocols.
- Verify the SSL certificate covers all subdomains in use.

### `lang` attribute

- Set `lang` on the `<html>` element: `lang="en"`, `lang="es"`, `lang="pt-BR"`.
- This is primarily for assistive technologies (screen readers use it to select the correct voice and pronunciation). Google detects page language from the actual text content, independently of the `lang` attribute, so a mismatch does not reliably suppress a page in localised results — but it does break screen reader behaviour.

### Canonical tags

- Add a self-referencing canonical to every page, even if no duplicates exist:
  ```html
  <link rel="canonical" href="https://example.com/page/">
  ```
- Canonicals are **hints**, not directives. Google may override a canonical if it determines it is incorrect — for example, if the specified canonical returns a `noindex`, or if linking patterns strongly suggest a different URL is the primary version. Audit canonical tags whenever you see unexpected URL variants appearing in GSC.
- Canonicals consolidate link equity from duplicate or near-duplicate URLs (URL parameters, session IDs, www/non-www variants) onto the preferred URL.
- Choose one canonical domain form (www vs. non-www) and 301-redirect all others.

### Robots and indexing

**`robots.txt`**
- Use `robots.txt` to block crawling of internal-only paths: admin panels, staging environments, search result pages, and other URLs with no indexing value.
- Blocking a URL in `robots.txt` does **not** remove it from the index. If the URL has inbound links, Google can still index it as a URL-only result (no title, description, or snippet). To prevent indexing, use `noindex` instead.
- `robots.txt` has a maximum file size of 500KB. Lines beyond that limit are ignored.

**`robots` meta tag**
- Use `<meta name="robots" content="noindex">` to prevent indexing of thin, duplicate, or utility pages.
- Use `noindex, nofollow` only when you also want to prevent link equity flowing through the page — for example, login pages or internal search results.
- Pages marked `noindex` must be removed from `sitemap.xml`. Submitting `noindex` pages in a sitemap sends a contradictory signal.

**`sitemap.xml`**
- List only canonical, indexable pages. Exclude `noindex` pages, redirect URLs, and paginated duplicates.
- A single sitemap supports up to 50,000 URLs and 50MB uncompressed. Use a sitemap index for larger sites.
- Submit in Google Search Console and in Bing Webmaster Tools. Keep it current when pages are added, moved, or removed.

### JavaScript SEO

- Googlebot renders JavaScript using a deferred two-phase process. Critical content behind JavaScript may not be indexed on the first crawl — it enters a rendering queue and can take days to weeks to be processed.
- For SEO-critical content (main headings, body copy, internal links, structured data), render it server-side or as static HTML. Client-side-only rendering introduces indexing delays.
- Avoid hiding key content behind user interactions (clicks, scroll events, accordion opens) that only trigger in a browser. Googlebot does not simulate user interactions.
- Use Google Search Console's URL Inspection tool → "Test Live URL" to see what Googlebot actually renders for any given page.
- If migrating a site to a JS framework, test rendering output before launch. Soft launches on a staging domain with `noindex` are strongly recommended.

### HTTP status codes

- **200 OK** — indexed normally.
- **301 Moved Permanently** — passes the majority of link equity to the destination. Use for permanent redirects.
- **302 Found / 307 Temporary Redirect** — does not pass link equity reliably. Use only for genuinely temporary moves.
- **404 Not Found** — tells Google the page no longer exists. Google recrawls 404s before dropping them from the index; this typically takes weeks.
- **410 Gone** — explicitly tells Google the resource is permanently deleted. Google removes 410 pages from the index faster than 404s. Prefer 410 for intentionally deleted content.
- **Soft 404** — a page returns HTTP 200 but displays a "not found" or empty-results message. Google detects these and may drop them from the index. Verify with the URL Inspection tool.

### Redirects

- Use 301 redirects for all permanent URL changes (slug renaming, HTTPS migration, www consolidation).
- **Redirect chains** — `A → B → C` — waste crawl budget and dilute link equity. Flatten chains to direct `A → C` hops wherever possible.
- Redirect loops return errors and block Googlebot completely. Audit with a crawler (Screaming Frog, sitebulb) after any migration.
- After a redirect is in place, update internal links to point directly to the destination URL. This prevents unnecessary redirect hops on every page load.

### Crawl budget

- Crawl budget is the number of URLs Googlebot crawls on a site within a given time frame. For small sites (under a few hundred pages) it is rarely a concern. For large or frequently updated sites, it matters.
- Reduce crawl waste by removing or `noindex`-ing low-value pages: faceted navigation duplicates, thin tag/category pages, internal search result pages, legacy redirect targets.
- A fast server response (TTFB under 200ms) increases the crawl rate Googlebot allocates to the site.
- Monitor crawl activity in GSC under Settings → Crawl Stats.

### Core Web Vitals

Core Web Vitals are direct Google ranking signals measured from real-user field data (CrUX). The current metrics (as of March 2024, when INP replaced FID):

| Metric | What it measures | Good | Needs work | Poor |
|---|---|---|---|---|
| **LCP** — Largest Contentful Paint | Loading performance | ≤ 2.5s | 2.5s–4.0s | > 4.0s |
| **CLS** — Cumulative Layout Shift | Visual stability | ≤ 0.1 | 0.1–0.25 | > 0.25 |
| **INP** — Interaction to Next Paint | Responsiveness | ≤ 200ms | 200ms–500ms | > 500ms |

Common causes and fixes:

- **LCP**: large unoptimised hero images, render-blocking fonts, slow TTFB. Fix with `<link rel="preload">` for the LCP element, `fetchpriority="high"`, WebP/AVIF format, server-side CDN caching, and `font-display: swap`.
- **CLS**: images without explicit `width`/`height`, injected banners, font-swap layout shift. Fix by declaring all image dimensions in HTML, reserving space for dynamic content with CSS `aspect-ratio`, and using `font-display: optional` for non-critical fonts.
- **INP**: long JavaScript tasks (>50ms) on the main thread. Fix with code splitting, deferring non-critical scripts, and breaking long tasks with `scheduler.yield()` or `setTimeout`.

Sites without enough real-user data in CrUX fall back to lab data for the ranking signal. Test with [PageSpeed Insights](https://pagespeed.web.dev) (field + lab) and Chrome DevTools Performance panel.

### Mobile and page experience

- Google uses **mobile-first indexing** — the mobile version of a page is what Google crawls, indexes, and uses for ranking. Ensure all content, links, and structured data present on desktop are also present on mobile.
- Every page must include `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- **Intrusive interstitials** (full-screen popups that block content on page load or scroll) are a negative ranking signal, particularly on mobile. Cookie banners and legally required notices are exempt.
- Tap targets should be at least 48×48px with 8px spacing to avoid mis-taps, which contributes to poor INP.
- Test mobile usability in GSC under Experience → Mobile Usability.

### Structured data

Add JSON-LD structured data to help search engines surface rich results. Common types:

- `Organization` — name, logo, social profiles, contact, `sameAs` links to authoritative external profiles
- `LocalBusiness` — address, hours, price range, geo coordinates, menu URL
- `BreadcrumbList` — navigation hierarchy, eligible for breadcrumb display in SERPs
- `WebSite` — enables the Sitelinks search box for branded queries
- `Event` — event details, eligible for rich results in Google Events
- `FAQPage` — FAQ sections, though Google has restricted FAQ rich results to a smaller set of sites since August 2023
- `Article` / `BlogPosting` — article metadata for news and blog content
- `Product` / `Review` / `AggregateRating` — product pages eligible for rich snippets

Place all JSON-LD in the `<head>` or at the end of `<body>`. Do not mark up content that is not visible on the page.

Validate with the [Google Rich Results Test](https://search.google.com/test/rich-results) and [Schema.org Validator](https://validator.schema.org).

### Hreflang (multilingual sites)

- If content is available in multiple languages or regional variants, add `hreflang` link elements to every version of every page.
- Include a self-referencing hreflang and an `x-default` fallback.
- Every hreflang tag must have a reciprocal tag on the target page. Missing reciprocals cause the entire cluster to be ignored.
- Wrong locale codes (e.g., `en-uk` instead of `en-gb`) silently break hreflang. Use BCP 47 format.

---

## 3. Image SEO

### File naming and alt text

- Name files descriptively before uploading: `oak-dining-table.jpg`, not `IMG_3821.jpg`.
- Write meaningful `alt` text for content images. It is a WCAG accessibility requirement and an image search ranking signal.
- Use `alt=""` on purely decorative images. This is the correct HTML signal that the image carries no informational value — not omitting `alt` entirely (which triggers a screen reader to read the filename).

### Dimensions and format

- Always declare `width` and `height` on `<img>` elements. This lets the browser reserve layout space before the image loads, preventing CLS:
  ```html
  <img src="photo.webp" alt="Description" width="800" height="600" loading="lazy">
  ```
- Use **WebP** (30–35% smaller than JPEG at equivalent quality, broad browser support) or **AVIF** (50% smaller than JPEG, improving support) with a `<picture>` fallback for older browsers.
- Compress images before publishing. Suggested targets: hero images under 200KB, content images under 100KB. Use tools like Squoosh or `sharp` in a build pipeline.

### Lazy loading and priority

- Add `loading="lazy"` to all images below the fold to defer their download.
- Do **not** add `loading="lazy"` to the above-the-fold hero image — it delays LCP.
- Add `fetchpriority="high"` to the LCP image to signal early download priority to the browser.
- Preload the LCP image in the `<head>`:
  ```html
  <link rel="preload" as="image" href="hero.webp" fetchpriority="high">
  ```

### Image sitemaps

- For sites where images are core content (portfolios, galleries, menus), include `<image:image>` entries in the sitemap. This improves image indexation for content that may not be easily discoverable via HTML links alone.

---

## 4. Content Quality

### E-E-A-T

Experience, Expertise, Authoritativeness, and Trustworthiness (E-E-A-T) is the framework Google's Quality Raters use to evaluate content quality. It is not a direct algorithmic signal, but Quality Rater feedback shapes the algorithm updates that are.

- **Experience**: first-hand experience with the subject. Product reviews, travel guides, and how-to content should reflect real use.
- **Expertise**: demonstrated knowledge of the topic. Credentials, depth of explanation, and accuracy matter.
- **Authoritativeness**: being a recognised source in the topic area. This is built through backlinks from authoritative sites, mentions in trusted publications, and a consistent, linked-to online presence.
- **Trustworthiness**: the most important factor. Accurate contact information, privacy policy, clear authorship, HTTPS, no deceptive patterns.

E-E-A-T signals to build:
- Author bylines with linked author profiles
- Accurate business information (address, phone, registration details)
- `sameAs` links in structured data pointing to Google Business Profile, LinkedIn, Wikipedia, or other authoritative profiles
- Regular content updates with visible "last updated" dates
- External links to credible sources

### Google's Helpful Content system

Since March 2024, the Helpful Content system is integrated into Google's core ranking systems and applies a **sitewide signal**. Content produced primarily to rank in search engines — rather than to genuinely help people — drags down the entire domain.

Indicators of unhelpful content:
- Content that summarises what other sources say without adding original insight
- Content that assumes search intent without direct experience of the topic
- Excessive use of AI-generated text without editorial review and fact-checking
- Pages that exist to capture long-tail keyword traffic but offer no real value to the visitor

The signal is sitewide: a large volume of thin or SEO-first content can suppress rankings for otherwise good pages on the same domain.

### User intent first

- Search engines surface content that satisfies user intent. Classify the intent of each page: informational (what/why/how), navigational (find a specific site), transactional (buy/book/sign up), or local (near me, specific location).
- A page targeting one intent clearly will outrank a page trying to serve multiple conflicting intents.
- Analyse the top-ranking pages for your target keyword before writing — their format (list, guide, video, product page) signals what Google has determined satisfies that query's intent.

### Topical authority and content clusters

Ranking for a primary topic is easier when a site covers the topic comprehensively, not just in one page.

- Build **content clusters**: a pillar page covering the broad topic, supported by deeper pages on each subtopic, all cross-linked.
- Topical depth signals expertise. A site with ten well-developed pages on interior design will outrank a site with one general page, assuming similar link profiles.
- Each supporting page should have a clear individual focus (one primary keyword, one user intent) and link back to the pillar page.

### Keyword focus

- Target one primary keyword per page, plus closely related secondary keywords (semantic variants, related entities, common questions).
- Use the primary keyword naturally in: the `<title>`, `<h1>`, first paragraph, at least one `<h2>`, and the meta description.
- Modern ranking systems use semantic relevance, not keyword density. Exact-match repetition is less important than thorough coverage of the topic.

### Content depth and freshness

- Pages with sufficient explanatory text consistently outrank thin pages for competitive queries. Depth is not about word count — it is about answering the query completely.
- Use headings, short paragraphs, and lists to improve readability and scannability. Well-structured content is more likely to be selected for featured snippets and AI Overviews.
- Outdated information degrades E-E-A-T signals, especially in fast-moving topics (health, finance, technology, legal). Add visible "last updated" dates and refresh content when information changes.

### Internal linking and link equity

- Link between related pages using descriptive anchor text. Avoid `click here` or `read more`.
- Internal links pass link equity (PageRank) through the site. Pages that receive more internal links from high-authority pages rank better.
- Every important page should be reachable within two or three clicks from the homepage.
- Apply `rel` attributes to manage how equity flows through external links:
  - `rel="nofollow"` — link is not endorsed (user-generated content, untrusted sources)
  - `rel="sponsored"` — paid or affiliate link (required by Google)
  - `rel="ugc"` — user-generated content (comments, forum posts)
  - Omitting a `rel` attribute signals editorial endorsement; ensure this is intentional for all outbound links.
- Broken internal links waste crawl budget. Audit with Screaming Frog after structural changes.

---

## 5. Accessibility and SEO

Accessibility and SEO share the same foundation: structured, well-labelled, navigable content. The overlap is real, though the relationship is sometimes overstated.

### Semantic HTML

- Use elements for their intended purpose: `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` give search engines structural context.
- Use `<a href="...">` for navigation — Googlebot follows `href` links. `<a>` without an `href`, and all `<button>`, `<div onclick>`, or `<span>` interactive elements, are **not** crawled as links. If a navigation item is a `<button>` or JS-driven element, Googlebot will not discover the pages it leads to.
- Correct heading hierarchy is both an accessibility requirement and an SEO relevance signal. Skipped or out-of-order headings reduce the clarity of the page outline for both crawlers and users.

### ARIA and accessible names

- Icon buttons, image links, and social icons without visible text require an `aria-label` or `aria-labelledby`. Without them, screen readers cannot convey the element's purpose. Note: ARIA labels are not a ranking signal for search engines — their benefit is user accessibility, not SEO.
- Add `aria-hidden="true"` to decorative icons. This keeps the accessible text layer clean for screen readers.
- A skip-to-content link (`<a href="#main">Skip to content</a>`, visually hidden, visible on focus) is a WCAG 2.1 Level A requirement and improves keyboard navigation.

### Navigation

- `<nav aria-label="Main navigation">` distinguishes the primary nav from footer and breadcrumb navs for screen reader users.
- Navigation links must point to real, crawlable URLs. `href="#"` is a dead end for both screen readers and Googlebot.

### Core Web Vitals as accessibility metrics

- **CLS** directly harms users with motor impairments who are about to click a target that shifts. Good CLS is both an SEO ranking requirement and a pointer to accessible design.
- **INP** affects users with cognitive or motor disabilities who rely on predictable, fast responses.
- Poor Core Web Vitals often indicate design patterns that are equally harmful for usability and accessibility.

### Contrast and readability

- Text contrast below WCAG AA (4.5:1 for body text, 3:1 for large text and UI components) is not a confirmed direct ranking factor. However, content that is difficult to read increases bounce rate and reduces time on page — both indirect engagement signals.
- Readable font sizes and sufficient line height contribute to lower bounce rates on mobile, which is Google's primary indexing context.

---

## 6. Social Metadata

### Open Graph

Open Graph controls how pages appear when shared on Facebook, LinkedIn, Slack, WhatsApp, and most social platforms. It does not affect search engine rankings but directly affects click-through from shared links.

```html
<meta property="og:title" content="Page Title">
<meta property="og:description" content="Page description, 2–3 sentences.">
<meta property="og:image" content="https://example.com/images/og-image.jpg">
<meta property="og:image:alt" content="Description of the image for screen readers">
<meta property="og:url" content="https://example.com/page/">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Brand Name">
<meta property="og:locale" content="en_US">
```

Image requirements:
- **1200×630px minimum** (1.91:1 aspect ratio). Images below 600×315px may not display as large previews.
- Under **8MB**. JPEG or PNG are most reliable across platforms.
- `og:image:alt` is an accessibility requirement and surfaced by some platforms when rendering in low-bandwidth or no-image modes.

### X (Twitter) Cards

X will fall back to Open Graph tags if Twitter Card tags are absent, but explicit Twitter Card tags give more control over presentation:

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Page Title">
<meta name="twitter:description" content="Page description.">
<meta name="twitter:image" content="https://example.com/images/og-image.jpg">
<meta name="twitter:image:alt" content="Description of the image">
```

- `summary_large_image` shows a banner-style image. Preferred for most pages over `summary`.
- The same 1200×630px image used for OG works for X.
- Validate with the [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) and the [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/). The Twitter Card Validator has been unreliable since X's platform changes.

---

## 7. Monitoring and Tools

### Google Search Console

Google Search Console (GSC) is the primary feedback loop for SEO. Set up immediately after launch.

- **Performance** — query and page impression/click data, average position, CTR.
- **Coverage / Indexing** — which URLs are indexed, which are excluded and why.
- **Core Web Vitals** — real-user CWV field data from the CrUX dataset.
- **URL Inspection** — check the indexed version of any URL, see what Googlebot rendered.
- **Manual Actions** — Google penalties applied to the site.
- **Links** — top linked pages and external linking domains.
- **Crawl Stats** (Settings → Crawl Stats) — Googlebot activity and response codes.

Submit the sitemap in GSC after launch. Revisit Coverage regularly — newly added pages should appear as "Valid" within days to weeks.

### Bing Webmaster Tools

Bing Webmaster Tools is frequently overlooked. Bing has approximately 10% of global search market share (higher in some markets and demographics) and powers Yahoo Search. Submit your sitemap, verify the site, and monitor for crawl errors. The interface is comparable to GSC.

### PageSpeed Insights

[pagespeed.web.dev](https://pagespeed.web.dev) — field data from CrUX plus Lighthouse lab data. Run on every key page template after launch, after design changes, and after adding significant JS or media. The URL Inspection tool in GSC provides similar field data and is more convenient for bulk monitoring.

### Other tools

| Tool | Purpose |
|---|---|
| [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) | Site crawl: broken links, redirect chains, missing metadata, duplicate content |
| [Sitebulb](https://sitebulb.com) | Site crawl with visual reporting; better for JavaScript-heavy sites |
| [Ahrefs](https://ahrefs.com) / [Semrush](https://semrush.com) | Keyword research, backlink analysis, rank tracking, competitor analysis |
| [Google Rich Results Test](https://search.google.com/test/rich-results) | Validate structured data for rich snippet eligibility |
| [Schema.org Validator](https://validator.schema.org) | General JSON-LD validation |
| [GTmetrix](https://gtmetrix.com) | Performance waterfall charts, CWV trend tracking |
| [Chrome UX Report (CrUX)](https://developer.chrome.com/docs/crux/) | Raw field data powering PageSpeed Insights and GSC CWV reports |

**Log file analysis** — for large or complex sites, analysing actual web server logs reveals exactly which URLs Googlebot visited, how often, and with what response codes. This is the ground truth for crawl behaviour, more accurate than any third-party crawler. Tools: Screaming Frog Log File Analyser, custom scripts against raw logs.

---

## 8. Project SEO Checklist

### Before launch — every page

- [ ] Unique `<title>` (50–60 characters, primary keyword first)
- [ ] Unique `<meta name="description">` (140–155 characters)
- [ ] `lang` attribute set correctly on `<html>`
- [ ] Self-referencing `<link rel="canonical">` with absolute URL
- [ ] Single `<h1>` containing the primary keyword; logical `h2`→`h3` hierarchy, no skipped levels
- [ ] Meaningful `alt` text on content images; `alt=""` on decorative images (not omitted `alt`)
- [ ] `width` and `height` declared on all `<img>` elements
- [ ] `loading="lazy"` on below-fold images; `fetchpriority="high"` + `<link rel="preload">` on LCP image
- [ ] All navigation uses `<a href="...">` (not `<button>` or JS-only) for crawlable links
- [ ] Navigation links point to real, indexable URLs (no `href="#"` placeholders)
- [ ] Internal links use descriptive anchor text; `rel` attributes applied to sponsored/ugc links
- [ ] JSON-LD structured data for the relevant content type, validated with Rich Results Test
- [ ] Open Graph tags with a valid 1200×630px image and `og:image:alt`
- [ ] X (Twitter) Card tags

### Before launch — site-wide

- [ ] HTTPS in place; HTTP → HTTPS 301 redirect active
- [ ] Canonical domain chosen (www vs. non-www) and all variants redirected
- [ ] No redirect chains longer than one hop
- [ ] `robots.txt` in place; staging/admin/thin paths blocked; no pages blocked that should be indexed
- [ ] `sitemap.xml` generated, excludes `noindex` and redirect URLs, submitted in GSC and Bing Webmaster Tools
- [ ] `<meta name="viewport" content="width=device-width, initial-scale=1">` on every page
- [ ] No intrusive interstitials blocking content on page load (except legally required notices)
- [ ] Core Web Vitals tested with PageSpeed Insights (target: all "Good")
- [ ] JS-rendered content verified via GSC URL Inspection → Test Live URL
- [ ] Lighthouse a11y score ≥ 90 on key page templates
- [ ] Structured data validated with Google Rich Results Test
- [ ] Site registered in Google Search Console and Bing Webmaster Tools

### Ongoing

- [ ] Monitor GSC Coverage after publishing new pages; investigate "Excluded" URLs
- [ ] Monitor GSC Core Web Vitals after design or performance changes
- [ ] Monitor GSC Performance for click-through rate drops (may indicate title/description issues)
- [ ] Update sitemap when pages are added, moved, or removed
- [ ] Verify no redirect chains after URL changes; update internal links to point to final destinations
- [ ] Re-audit a11y and performance after significant feature additions
- [ ] Review and refresh content with declining rankings or high bounce rates

---

## Reference thresholds

| Metric | Target |
|---|---|
| `<title>` length | 50–60 characters (~580px) |
| `<meta description>` length | 140–155 characters |
| OG image size | 1200×630px, 1.91:1, < 8MB |
| LCP | ≤ 2.5s |
| CLS | ≤ 0.1 |
| INP | ≤ 200ms |
| TTFB (Time to First Byte) | ≤ 800ms (Good); aim for ≤ 200ms |
| Redirect chain max length | 1 hop (A → B, not A → B → C) |
| `sitemap.xml` URL limit | 50,000 URLs per sitemap file |
| `robots.txt` file size limit | 500KB |
| Body text contrast (WCAG AA) | ≥ 4.5:1 |
| Large text contrast (WCAG AA) | ≥ 3:1 |
| Minimum body font size | 16px |
| Minimum tap target size | 48×48px with 8px spacing |
