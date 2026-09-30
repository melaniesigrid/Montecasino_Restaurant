# Montecasino Website — Project Tracker

## Fixed (accessibility + contrast pass)
- [x] `.feature-item p` contrast: raised from 3.88:1 (fail) to 4.9:1 (pass) by using `color: rgba(50,51,55,0.78)` instead of `opacity: 0.65`
- [x] Menu category nav label font-size: 9px → 11px (below legibility floor)
- [x] Menu category nav inactive opacity: 0.5 → 0.62 (improves contrast at small size)
- [x] Skip-to-content link on all 7 pages (keyboard navigation)
- [x] `<nav aria-label="Navegación principal">` on all 7 pages
- [x] `<main id="main-content">` on all 7 pages (skip link target)
- [x] Hamburger and close buttons: `<div>` → `<button>` with `aria-label` on all 7 pages
- [x] `aria-expanded` on menu toggle, focus management after open/close
- [x] `aria-hidden="true"` on all decorative icons (footer, info section, value icons)
- [x] `aria-label` on social media icon links across all 7 pages
- [x] `:focus-visible` outline styles (keyboard navigation ring)
- [x] Hamburger breakpoint: 1500px → 1024px (was showing on 1280px–1440px desktops)
- [x] Intermediate compact nav at 1380px (smaller margins before hamburger kicks in)
- [x] Fixed `<div class="div icon menu-btn">` class typo (extra "div" class)

## Fixed (this session)
- [x] Completed menu page — category nav, all 11 sections (Desayunos → Licores), fixed price formatting
- [x] Created Nuestra Historia page with photo blocks and values section
- [x] Created Contacto page with contact form, info, and map
- [x] Created Reservaciones page with full booking form
- [x] Created Hostal coming-soon page (`hostal.html`) with 6 feature teasers and CTA
- [x] Created Catering & Degustaciones coming-soon page (`catering.html`) with 6 feature teasers and CTA
- [x] Fixed all nav links across all 7 pages — no more dead `#` links except social media
- [x] Fixed dark-on-dark: Iconografia-03/04 (black icons on dark bg) → replaced with Font Awesome
- [x] Fixed overly broad `transition: all` → specific properties only (performance)
- [x] Added `scroll-padding-top: 80px` so anchor links don't hide under fixed navbar
- [x] Fixed menu nav hover border flicker
- [x] Increased plate description contrast (0.65 → 0.80 opacity)
- [x] Added meta descriptions to all 7 pages (SEO)

---

## High Priority

### Content — needs your input
- [ ] **Update placeholder menu** — all dishes/prices in Pastas, Pizzas, Carnes, Postres, and Bebidas sections are placeholder. Review and update with real items.
- [ ] **Replace placeholder menu** — Ensalada de Arúgula e Prosciutto description is a copy-paste from Omelette Al Gusto. Update.
- [ ] **Add real social media URLs** — Facebook, WhatsApp, and Instagram links are all `#`. Update in footer of all 5 pages.
- [ ] **Google Maps embed** — `contacto.html` has an approximate map pin. Replace the Maps embed URL with the exact pin for Km. 34 Carretera de Antigua.
- [ ] **Contact email** — `info@montecasino.gt` and `reservaciones@montecasino.gt` are placeholders. Update or wire up a real form service (see below).

### Forms
- [ ] **Wire up forms** — Contact and reservation forms currently use `mailto:` which opens the user's email client. For a professional site, replace with a real form backend:
  - Free option: [Formspree](https://formspree.io) — add `action="https://formspree.io/f/YOUR_ID"` and `method="POST"`.
  - Other options: Netlify Forms, EmailJS, or a custom backend.

---

## Medium Priority

### Missing pages
- [ ] **Catering & Degustaciones** — nav link currently goes to `#`. Create a page describing event packages, capacity, and catering services. Use existing photos in `images/fotografia/`.
- [ ] **Hostal** — nav shows "Muy pronto..." — when ready, build out the hostal section.

### Design polish
- [ ] **Homepage hero** — `.invitation-container { max-width: 20vw }` forces the headline text to wrap tightly. Consider widening to `30vw` or adjusting `font-size` at different breakpoints.
- [ ] **Homepage presentation section** — second grid row (`#jardines-color-block`) has `font-size: 90px !important` on the container. This cascades down and makes `.cabin-text` and other text huge. Scope it to only the heading.
- [ ] **Navbar active state** — the `.selected` class is manually set on each page. Consider using JS to auto-highlight the active page based on `location.pathname`.
- [ ] **Mobile menu** — hamburger menu appears at `max-width: 1500px` (very wide). Consider lowering breakpoint to `1100px` or `900px`.
- [ ] **Footer responsive** — on screens < 480px the footer logo and text stack but the logo can overflow. Add `max-width: 100%` to `.footer-image`.

### Imagery
- [ ] **Restaurant photo** — `images/fotografia/restaurant-square.jpg` is used for the homepage grid. Verify this is the best photo for that position.
- [ ] **Historia hero** — currently uses `DSC_0013 copia.jpg`. File has spaces in name; works in modern browsers but worth renaming to `historia-hero.jpg` to be safe.
- [ ] **Add gallery or photo section** — the `images/fotografia/` folder has 10+ good photos (DSC series, cabana, jardin, plate, powder-room) that aren't used yet. Consider a photo gallery on the homepage or historia page.

---

## Low Priority / Nice to Have

### Performance
- [ ] **Image optimization** — convert JPGs and PNGs to WebP format. The restaurant photos are large. Use `<picture>` tags with WebP + JPG fallbacks.
- [ ] **Lazy loading** — add `loading="lazy"` to all `<img>` tags that are below the fold.
- [ ] **Font preload** — add `<link rel="preload" as="font">` for `ArticulatCF-Medium.otf` to eliminate FOUT (flash of unstyled text).

### SEO / Discoverability
- [ ] **Open Graph tags** — add `og:title`, `og:description`, `og:image`, `og:url` to all pages for social sharing previews.
- [ ] **Structured data** — add `application/ld+json` schema markup for `Restaurant` type (name, address, phone, hours, menu URL). Helps Google show rich results.
- [ ] **sitemap.xml** — create a sitemap once the site has a real domain.
- [ ] **robots.txt** — add a basic robots.txt.

### Accessibility
- [ ] **`lang` attribute** — all pages already have `lang="es"`. ✅
- [ ] **Form labels** — all form inputs are labeled. ✅
- [ ] **Image alt text** — review all `alt` attributes. Several logo images have `alt="Logo Montecasino"` which is fine, but decorative photos should have empty `alt=""`.
- [ ] **Color contrast audit** — run an axe or Lighthouse accessibility audit after final colors are confirmed.
- [ ] **Focus styles** — add visible `:focus-visible` styles for keyboard navigation.

### Infrastructure
- [ ] **Domain + hosting** — deploy to GitHub Pages (already configured at `melaniesigrid.github.io/Montecasino_Restaurant`) or migrate to Netlify/Vercel for form support.
- [ ] **HTTPS** — ensure the live domain uses HTTPS (GitHub Pages does this automatically).
- [ ] **Analytics** — add Google Analytics 4 or Plausible for traffic tracking.
- [ ] **Cookie banner** — if analytics are added, a GDPR/privacy notice may be needed.

---

## Notes
- The site is pure HTML/CSS/JS — no build step, no dependencies. SCSS source files exist (`styles.scss`, `menu-style.scss`, `footer-style.scss`) but the `.css` files are what the browser reads. Edit the `.css` files directly.
- `ArticulatCF` font is loaded locally from `fonts/ArticulatCF/`. Only the Medium weight is currently loaded — add ExtraLight, ExtraBold, or Heavy if needed for design variety.
- Phone: +(502) 4614-9855 | Address: Km. 34 Carretera de Antigua a Ciudad Guatemala, Santa Lucía Milpas Altas
