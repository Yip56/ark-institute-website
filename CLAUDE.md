# Ark Institute Website — Project Documentation

> **This file is the single source of truth for any developer or Claude Code session picking up this project.**
> Read it fully before making changes.

---

## Project Purpose

Lead-generation marketing website for **Ark Institute**, a music studio.

- **Brand:** Sailboat + treble-clef logo, tagline "Where Talents Are Built"
- **Goal:** Drive prospective students to book a free trial class
- **Primary CTA everywhere:** "Book a Free Trial Class" — appears in header, hero, footer CTA banner, and each page's bottom section
- **This project is standalone** — not integrated with StudioOS or Firebase. Deploy as a static site.

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | React 18 + Vite |
| Routing | React Router v6 (`<BrowserRouter>` + nested `<Outlet>`) |
| Styling | **CSS Modules** (one `.module.css` per component/page) |
| Fonts | Inter (sans-serif) + DM Serif Display (serif headings) via Google Fonts |
| Icons | Inline SVGs (no icon library) |
| Build | `npm run dev` / `npm run build` |

---

## Chosen Accent Color

**Amber Gold — `#D4A853`**

**Why this color:** Amber gold evokes warmth, artistry, and premium quality. It contrasts beautifully against the near-black base (`#0D0D0F`) and pairs naturally with the nautical/musical brand identity. It also reads as confident and aspirational without being aggressive.

Two alternatives considered and rejected:
- Electric Indigo (`#6366F1`) — too tech-startup, doesn't suit a music studio
- Teal (`#14B8A6`) — refreshing but too casual for the premium positioning

---

## Design Tokens

All tokens live in `src/styles/global.css` under `:root {}`.

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#0D0D0F` | Base background |
| `--color-bg-elevated` | `#141416` | Slightly lifted surfaces |
| `--color-bg-card` | `#1A1A1E` | Card backgrounds |
| `--color-accent` | `#D4A853` | Primary accent (Amber Gold) |
| `--color-accent-light` | `#E8C27A` | Hover states |
| `--color-accent-dark` | `#A8832E` | Pressed / deep states |
| `--color-accent-muted` | `rgba(212,168,83,0.12)` | Subtle accent fills |
| `--color-text-primary` | `#F0EFE8` | Headlines, body text |
| `--color-text-secondary` | `#9A9898` | Supporting copy |
| `--color-text-muted` | `#5A5A62` | Captions, disabled |
| `--font-sans` | `'Inter'` | Body and UI text |
| `--font-serif` | `'DM Serif Display'` | Headlines, display text |
| `--header-height` | `72px` | Fixed header offset |

---

## Folder & File Structure

```
ark-institute-website/
├── public/
│   └── favicon.svg                   # SVG favicon (Ark logo mark)
│
├── src/
│   ├── styles/
│   │   └── global.css                # Design tokens + reset + utility classes
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Layout.jsx            # Route wrapper: Header + <Outlet> + Footer
│   │   │   ├── Layout.module.css
│   │   │   ├── Header.jsx            # Fixed header, nav, mobile menu, CTA button
│   │   │   ├── Header.module.css
│   │   │   ├── Footer.jsx            # Footer CTA banner + nav links + brand
│   │   │   └── Footer.module.css
│   │   │
│   │   ├── ui/
│   │   │   ├── ArkLogo.jsx           # SVG logo mark (placeholder — replace with real asset)
│   │   │   ├── Button.jsx            # Shared button component (primary / outline / ghost)
│   │   │   ├── Button.module.css
│   │   │   ├── PlaceholderImage.jsx  # Dashed-border image slot with label badge
│   │   │   ├── PlaceholderImage.module.css
│   │   │   ├── PlaceholderVideo.jsx  # Video placeholder slot with play icon
│   │   │   ├── PlaceholderVideo.module.css
│   │   │   ├── SectionLabel.jsx      # Small uppercase eyebrow label with accent line
│   │   │   └── SectionLabel.module.css
│   │   │
│   │   ├── home/
│   │   │   ├── Hero.jsx              # Full-viewport hero: video slot + headline + CTA
│   │   │   ├── Hero.module.css
│   │   │   ├── ProgramCards.jsx      # 2-card grid: Contemporary vs Classical
│   │   │   ├── ProgramCards.module.css
│   │   │   ├── InstructorTeaser.jsx  # 3-card instructor preview
│   │   │   ├── InstructorTeaser.module.css
│   │   │   ├── Testimonials.jsx      # 3-card testimonial section
│   │   │   └── Testimonials.module.css
│   │   │
│   │   └── shared/
│   │       ├── CTABanner.jsx         # Reusable full-width CTA section (used on every page)
│   │       └── CTABanner.module.css
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Homepage: Hero + ProgramCards + Instructors + Testimonials + CTA
│   │   ├── ContemporaryMusic.jsx     # 3 skill tiers + 3 session lengths + instruments grid
│   │   ├── ContemporaryMusic.module.css
│   │   ├── ClassicalMusic.jsx        # 10 grade cards + journey steps + instruments grid
│   │   ├── ClassicalMusic.module.css
│   │   ├── About.jsx                 # Studio story + 6-instructor grid + values
│   │   ├── About.module.css
│   │   ├── Pricing.jsx               # Comparison tables for both tracks + FAQ
│   │   ├── Pricing.module.css
│   │   ├── FreeTrial.jsx             # Booking form (front-end only) + value prop
│   │   ├── FreeTrial.module.css
│   │   ├── Contact.jsx               # Contact form + info + map placeholder
│   │   └── Contact.module.css
│   │
│   ├── App.jsx                       # BrowserRouter + route tree
│   └── main.jsx                      # ReactDOM.createRoot entry point
│
├── index.html                        # Vite HTML shell (Google Fonts link here)
├── vite.config.js
├── package.json
└── CLAUDE.md                         # ← You are here
```

---

## Routing Structure

| Path | Page | Component |
|---|---|---|
| `/` | Homepage | `pages/Home.jsx` |
| `/contemporary-music` | Contemporary Music | `pages/ContemporaryMusic.jsx` |
| `/classical-music` | Classical Music | `pages/ClassicalMusic.jsx` |
| `/about` | About & Instructors | `pages/About.jsx` |
| `/pricing` | Pricing | `pages/Pricing.jsx` |
| `/free-trial` | Free Trial Booking | `pages/FreeTrial.jsx` |
| `/contact` | Contact | `pages/Contact.jsx` |

All routes are nested under `Layout` (which renders Header + Footer around `<Outlet>`).

---

## Scroll Animation System

Two utility classes in `global.css`:
- `.fade-up` — elements start offset 28px down + opacity 0, animate in when visible
- `.fade-in` — opacity fade only

Applied via `className` on JSX elements. The `IntersectionObserver` is wired in `Layout.jsx` — it runs on every route change (`useEffect` watching `pathname`).

---

## Placeholder Content Locations

Search for `TODO:` or `[Placeholder` to find every slot that needs real content.

### Images — `PlaceholderImage` components
All instances of `<PlaceholderImage>` need real photography. Key locations:

| File | Label / Purpose |
|---|---|
| `components/home/Hero.jsx` | Hero background video/image (cinematic studio reel) |
| `components/home/ProgramCards.jsx` | Contemporary card photo, Classical card photo |
| `components/home/InstructorTeaser.jsx` | 3× instructor headshots |
| `pages/About.jsx` | Studio interior/founder photo + 6× instructor headshots |
| `pages/ContemporaryMusic.jsx` | Contemporary program hero photo |
| `pages/ClassicalMusic.jsx` | Classical program hero photo |

### Video — `PlaceholderVideo` component
| File | Purpose |
|---|---|
| `components/home/Hero.jsx` | Full-viewport hero reel (15-20s, webm + mp4, autoplay muted loop) |

### Instructor Profiles
Placeholder data arrays in:
- `components/home/InstructorTeaser.jsx` — 3 instructors
- `pages/About.jsx` — 6 instructors

Each needs: real name, specialty, bio text (3-4 sentences), headshot photo.

### Testimonials
- `components/home/Testimonials.jsx` — 3 testimonials, each needs: real quote, name, role, avatar photo

### Studio Info (Footer + Contact page)
- Studio address
- Phone number
- Email address (currently `hello@arkinstitute.com` — confirm this)
- Studio hours
- Google Maps embed

### Pricing
- `pages/Pricing.jsx` — All prices are "Contact for pricing" placeholders. Replace when final pricing is decided.

### Studio Story
- `pages/About.jsx` — 3-paragraph founding story placeholder

### Stats
- `pages/About.jsx` — `[X]+` placeholders for student count, instructor count, years of teaching

### Booking Form Backend
- `pages/FreeTrial.jsx` — Form is front-end only. See `TODO` comment with integration instructions.
- `pages/Contact.jsx` — Same — contact form is front-end only.

---

## ArkLogo Component

`src/components/ui/ArkLogo.jsx` renders an inline SVG approximation of the sailboat + treble-clef concept. **Replace this with the actual brand SVG or PNG** once the logo file is finalized. The component accepts a `className` prop for sizing.

---

## Next Steps (in priority order)

### Before launch (blocking)
1. **Real photography/video** — Studio interior, instructor headshots, program action shots, hero reel
2. **Final pricing numbers** — Replace all "Contact for pricing" cells in `pages/Pricing.jsx`
3. **Real studio info** — Address, phone, hours (update Footer, Contact page, About stats)
4. **Instructor profiles** — Names, bios, headshots (update `InstructorTeaser.jsx` + `About.jsx`)
5. **Student testimonials** — Real quotes, names, roles, avatars (`Testimonials.jsx`)
6. **Studio story copy** — Founding narrative for `About.jsx`
7. **Brand logo file** — Replace `ArkLogo.jsx` SVG with the actual mark
8. **Form backend** — Wire `FreeTrial.jsx` and `Contact.jsx` forms to a real submission endpoint (Formspree, EmailJS, Firebase Functions, or custom API)

### Before launch (non-blocking but important)
9. **Domain** — Purchase and configure domain (arkinstitute.com or equivalent)
10. **Hosting** — Deploy to Vercel, Netlify, or similar (static site, no server needed pre-backend)
11. **SEO** — Add per-page `<meta>` descriptions and `<title>` tags (currently only index.html has these)
12. **Google Maps embed** — Paste the real embed iframe into `Contact.jsx`
13. **Social links** — Add Instagram/Facebook/YouTube to footer once accounts are set up
14. **Google Analytics or Plausible** — Add tracking script to `index.html`

### Post-launch
15. **StudioOS integration** — Connect the booking form to the StudioOS scheduling system when ready
16. **Firebase integration** — For form data persistence if needed
17. **Blog/content section** — Optional: add a news or blog route for SEO
18. **A/B test CTAs** — Test different headline copy and CTA button copy for conversion rate

---

## Running the Project

```bash
cd ark-institute-website
npm install
npm run dev
```

Dev server: http://localhost:5173

```bash
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
```

---

## Design Philosophy Notes

- **Mobile-first:** all layouts use single-column base with grid breakpoints at 768px and 900px
- **No animation libraries** — all motion is pure CSS transitions and `IntersectionObserver`
- **No stock photos baked in** — every image is a clearly-labeled `PlaceholderImage` or `PlaceholderVideo` slot
- **Pricing never invented** — all pricing cells say "Contact for pricing" with a visible disclaimer banner
- **Testimonials clearly marked** — each testimonial card has a "Placeholder" badge in the corner
