# Venkata Karthik - Portfolio Build Specification
**Owner:** Muchu Venkata Karthik · **Target Builder:** Antigravity (AI coding agent) · **Document Version:** 1.0 · **Date:** 2026-09-02

> **What this is:** A complete, implementable brief the builder can follow end-to-end without re-asking questions. It covers goals, information architecture, visual language (light + dark), component specs, GSAP motion choreography, the canonical project inventory (with the user's real data), SEO/AI/A11y budgets, performance targets, and the file/deliverable checklist. Paste-and-build.

> **What this is not:** The site itself. It does *not* ship HTML/CSS/JS - it is the contract the builder writes the site against.

---

## 0. Source-Data Provenance (read once, build from this)

### 0.1 Identity & contact (verbatim from `venkatakarthik_backend.pdf` / `venkatakarthik_fullstack.pdf`)
- **Name:** Muchu Venkata Karthik
- **Phone:** +91 6302389039
- **Email:** 2200030154cseh@gmail.com
- **LinkedIn:** linkedin.com/in/venkatakarthikm
- **GitHub:** github.com/venkatakarthikm
- **Portfolio (current):** mvkarthik.onrender.com

> Phone is intentionally **not published** on the public site. Show only: Email, LinkedIn, GitHub, Portfolio.

### 0.2 Two summaries - pick the right one per surface
| Resume variant | Summary to use |
|---|---|
| `venkatakarthik_backend.pdf` | "Backend-focused Software Engineer with hands-on production experience engineering scalable microservices, REST APIs, and database architectures using TypeScript, Node.js, and PostgreSQL." |
| `venkatakarthik_fullstack.pdf` | "Full-Stack Developer with hands-on experience building full-stack applications, having integrated 15+ third-party APIs and services across React, Node.js, PostgreSQL, MongoDB, and Supabase projects, with production fintech experience." |

> **Recommendation:** Lead with the *backend* summary on the hero (because your internship at Webileapps is a backend-heavy fintech role with 3–4 role-based user types), and use the *full-stack* summary on the About section. Builder should expose a `SUMMARY_BACKEND` and `SUMMARY_FULLSTACK` constant in `data/profile.js`.

### 0.3 Canonical Skills (unioned from both resumes, deduped)
- **Languages:** JavaScript (ES6+), TypeScript, SQL, Java, Python
- **Frontend:** React.js, Next.js, HTML5, CSS3, Tailwind CSS
- **Backend & Systems:** Node.js, Express.js, Microservices, RESTful APIs, WebSockets, Background Workers
- **Databases & Caching:** PostgreSQL, MongoDB, MySQL, Redis, Supabase
- **Tools & Architecture:** Git, GitHub Actions, Cloudflare (Workers, DNS, API Proxy), Postman, Winston, Zustand
- **Infrastructure & Growth:** Render, Netlify, Vercel, Google Analytics, SEO
- **Mobile:** Kotlin · Android Studio

### 0.4 Experience (verbatim from resumes)
- **Full-Stack Web Development Intern · Webileapps · Feb 2026 – Jul 2026 · Vijayawada, India**
  - Engineered backend microservices and full-stack modules using JS/TS/Node/React across 3 internal enterprise fintech platforms handling multi-role access control.
  - Designed/optimized schemas in PostgreSQL and MongoDB with transactional integrity.
  - Integrated Redis caching for permission schemas and session records (latency ↓).
  - Centralized audit logging with Winston + JWT auth with strict payload validation for financial data.

### 0.5 Education & Certifications
- **B.Tech CSE · Koneru Lakshmaiah Education Foundation · 2022 – 2026 · Guntur, AP** · CGPA **9.2 / 10.0**
- Coursework: DBMS · DSA · OS · Computer Networks
- **Certifications:** Wipro TalentNext Certified Java Developer · Automation Anywhere Essentials RPA Professional

### 0.6 GitHub trophy snapshot (from the uploaded trophy image)
`700 Total Contributions · 4 Current Streak (Aug 30 – Sep 2) · 42 Longest Streak (Sep 24, 2025 – Nov 4, 2025) · Followers 1 (Rank B) · Repositories 55 (Rank SS) · Stars 0 (Rank C) · Commits 598 (Rank AAA) · PRs 2 (Rank B) · Issues 0 (Rank C) · Reviews 0 (Rank C) · Experience 5 (Rank S)`

> The site should **embed the live `github-profile-trophy` widget** for the same metrics so the numbers stay current - not a hardcoded copy of these. (Verify the actual endpoint on the builder's first run.)

---

## 1. Project Goals & Non-Goals

### 1.1 Goals (in priority order)
1. **Conversion surface for recruiters/hiring managers** - clear path to resume, GitHub, email, and 3 anchored flagship products.
2. **Spotlight 7 flagship projects** at the top of the Projects section: **TrackWicket, API Coolie (apicoolie.stackinfi.in), Fourzdeals, selftaughtstack, stackinfi, ChatVK, Weather Flow** - full work below in §3.
3. **Demonstrate taste** - fluid scroll, dual-theme switcher (smooth light + dark), respected whitespace, premium typography, zero jank.
4. **SEO for AI and humans** - schema.org `Person` + per-project `SoftwareApplication` JSON-LD, `llms.txt`,`llms-full.txt`, `sitemap.xml`, OG/Twitter, canonical, `robots.txt`, `manifest.webmanifest`, Lighthouse 95+ across all four categories.

### 1.2 Non-Goals
- **No 3D / WebGL shaders** - keep the immersive feel through 2D motion only (parallax, transforms, SVG path-draw).
- **No CMS** - content is a structured `data/*.js` layer the builder can add to later.
- **No tracking beyond Google Analytics** (consent-gated).
- **No "Deep Ocean" theme.** User explicitly cancelled that direction. **Default theme is light** (clean, futuristic, paper-like), with a **smooth animated transition** into **dark** (deep navy/near-black, atmospheric - not pitch black). Both are first-class citizens, not afterthoughts.

### 1.3 Success Criteria
- Lighthouse mobile ≥ 95 on Performance, Accessibility, Best Practices, SEO.
- LCP ≤ 1.8 s on 4G/Moto G4 emulation.
- CLS ≤ 0.05; INP ≤ 200 ms.
- Works fully without JS for content (where reasonable) - `noscript` fallback on hero copy.

---

## 2. Information Architecture

### 2.1 Top-level navigation (sticky, blur-on-scroll)
`Home · Projects · About · Skills · GitHub · Contact` - anchors (`/#projects`, `/#about`, …) for both single-page *and* per-section hero pages.

### 2.2 Sections in scroll order

| # | Section | Purpose | Key behavior |
|---|---|---|---|
| 0 | **Nav + Theme Toggle** | Always-visible navbar with active-section highlight + smooth light↔dark swap (no FOUC) |
| 1 | **Hero** | Name, rotating role-line, primary CTAs (Resume · GitHub · Contact) | Animated role-line typewriter, parallax gradient mesh, scroll-cue arrow |
| 2 | **Selected Work / Featured Projects** | 7 flagship projects in a spotlight grid | Live-site preview-on-hover tile (see §6) |
| 3 | **All Projects** | Full secondary grid (15 entries, collapsible "more") | Filter chips by tag (Web · Realtime · Bots · Mobile · Tools) |
| 4 | **About** | Two-paragraph story (backend + fullstack summaries), internship card | Counter-up stats, profile photo placeholder (provably replaceable) |
| 5 | **Skills** | Visual skill map grouped by domain (Lang / Front / Back / DB / Infra) | Icon cloud + on-hover description card |
| 6 | **GitHub Activity** | Live contribution streak + language split + trophy strip | Embedded streak/langs/trophy SVGs, lazy-loaded |
| 7 | **Experience Timeline** | Webileapps internship, education, certifications | Pinned horizontal timeline with scrub control |
| 8 | **Beyond Web Apps** | Bots, automations, Android (Kotlin) | Icon-strip chips |
| 9 | **Contact / Footer** | Email, LinkedIn, GitHub, "Hire me" CTA, copyright | Form (mailto fallback if no backend), social row |

### 2.3 Spacing scale (Tailwind)
Use `4 / 8 / 16 / 24 / 32 / 48 / 64 / 96 / 128 / 192` px. Section vertical rhythm: `--gutter-y: clamp(96px, 12vw, 192px)` top/bottom. Container max-width: `76rem`.

---

## 3. Canonical Project Inventory

> **Reconciliation rule applied:** Your GitHub README cites TrackWicket, API Coolie, Fourzdeals. Your old projects array has 15 entries but several are duplicates or use placeholder GitHub URLs (`https://github.com/user/...`). Below is the **merged, de-duplicated** master list. **Every project's `repo` field points to the real URL Karthik provides - never invent a GitHub URL.** Flags below explicitly mark unknowns as TODO so the builder asks Karthik instead of fabricating.

### 3.1 Spotlight Tier (7 - full hero treatment)
Each Spotlight tile gets: hero screenshot, 1-sentence tagline, 2–3 bullet feature highlights, tech-stack chips, **Live preview-on-hover** (Live iframe with `loading="lazy"` + `sandbox` + a poster fallback), GitHub + Live links.

Copy source for each: from the GitHub README + the old projects array + the resume bullets. **Where my crawler could not load the live site this turn**, I noted `live_status_unverified: true` - the builder should still attempt the iframe and gracefully fall back to the screenshot.

| # | Title | Tagline | URL | Stack | Status flagged |
|---|---|---|---|---|---|
| **S1** | **TrackWicket** | Real-time cricket tracking - live scores, ICC rankings, and standings, aggregated from custom scrapers because the free APIs don't really exist. | https://trackwicket.tech/ | React · REST · Web Scraping · OneSignal | `live_status_unverified` |
| **S2** | **API Coolie (apicoolie)** | An API scheduler + code-execution platform for developers who need HTTP calls or scripts run on autopilot - no server babysitting. 40+ REST endpoints, dynamic payload builder, OpenRouter-powered failure diagnosis. | https://apicoolie.stackinfi.in/ | React · Node.js · MongoDB · Redis · OpenRouter · Cloudflare (DNS/proxy) | `live_status_unverified` |
| **S3** | **Fourzdeals** | Full-stack e-commerce with role-based auth - sellers manage inventory, consumers buy + image-verified reviews. Secure payments via gateway webhooks. | https://fourzdeals.netlify.app/ | MERN · Payment Gateway · Role-based Auth | `live_status_unverified` |
| **S4** | **selftaughtstack** | Self-taught learning resource collection / knowledge hub. | https://selftaughtstack.onrender.com/ | TBD - builder add from first-run crawl | `live_status_unverified` + `stack_unknown` |
| **S5** | **stackinfi** | Product/service platform that also hosts API Coolie and other tools. | https://stackinfi.in/ | TBD | `live_status_unverified` + `stack_unknown` |
| **S6** | **ChatVK (Chat Web VK)** | Real-time chat + peer-to-peer video calling over WebSockets. | https://chatwebvk.onrender.com | React · Node.js · MongoDB · Express · Sockets | `live_status_unverified` |
| **S7** | **Weather Flow** | Live weather updates with geolocation. | https://weatherflow.onrender.com | React · GeoLocation API · OpenWeather (or similar) | `live_status_unverified` |

### 3.2 Secondary Tier (8 - smaller cards, no live preview tile)

| Title | Description | URL | Stack | Repo known? |
|---|---|---|---|---|
| **Cric Web** | Cricket web app to track stats and matches. | https://frontend-tcpo.onrender.com/ | React · Node.js · MongoDB · Express | TODO - confirm with Karthik |
| **Streamy Film / Movie Player** | Movie player for seamless streaming. (Two entries in old array - treat as one; live link is `streamyfilm.vercel.app`.) | https://streamyfilm.vercel.app (primary) · https://moviezplayer.onrender.com (alt) | Streaming player | TODO - confirm with Karthik |
| **Video Downloader** | Download any video. | https://videodownloader-svk8.onrender.com | TBD | TODO |
| **Fourz Deals (alt URL)** | Same product as S3, alternate host. | https://fourzdealshop.vercel.app | MERN · PayPal · MongoDB · Express | TODO |
| **ECO LEARN** | Sustainability education platform. | https://jfsd-sustainability-education-orbm.onrender.com/ | TBD | TODO |
| **Rules App** | Approve/reject rules between users. | https://rulesfrontend.onrender.com | React · Spring | TODO |
| **CineDisco** | Movie news + collection tracker. | https://cinedisco.vercel.app/ | TBD | TODO |
| **Yt Transcript** | Transcription of YouTube videos. | https://yttranscript-psyo.onrender.com | TBD | TODO |
| **X Comments Checker** | Compare users in the comment section. | https://xcomments.onrender.com/ | TBD | TODO |
| **Verified Follower Counter** | Twitter (X) verified-follower checker. | https://twitter-verified-follower-counter.onrender.com/ | TBD | TODO |
| **Twitter Engagement Checker** | Engagement of an X profile. | https://mahesher-twitter-engagement-checker.onrender.com/ | TBD | TODO |

> Builder should show **15 secondary cards in two rows**, filter by chip, and tag `repo_unknown: true` on any card without a real GitHub link (instead of linking to a placeholder URL like `github.com/user/...` which damages trust).

### 3.3 Data file (`data/projects.js`) - schema

```js
{
  id: "trackwicket",            // slug, used in URL anchors & OG
  title: "TrackWicket",
  tier: "spotlight",            // "spotlight" | "secondary"
  tagline: "Real-time cricket tracking - live scores, ICC rankings…",   // ≤110 chars
  bullets: [                     // 2–3 short benefit bullets
    "Live scores with sub-second push updates via OneSignal webhooks.",
    "Custom background scrapers aggregate match + ranking data - no paid APIs.",
    "React state tuned for high-frequency updates; zero flicker."
  ],
  description: "Longer-form paragraph the builder renders on the project detail modal/page. Cite specific wins.",
  url: "https://trackwicket.tech/",         // live
  repo: "https://github.com/venkatakarthikm/<TODO>",   // TODO - leave null until Karthik confirms
  image: "/og/trackwicket.png",              // 1200×630 OG image
  poster: "/projects/trackwicket.webp",      // 1600×900 used while iframe loads
  tags: ["React", "REST API", "Web Scraping", "OneSignal"],
  featured: true,
  live_status: "unverified",                 // builder updates after first iframe probe
  schema: {                                   // JSON-LD SoftwareApplication
    "@type": "SoftwareApplication",
    "applicationCategory": "WebApplication",
    "operatingSystem": "Any"
  }
}
```

---

## 4. Visual System (dual light + dark, smooth animated swap)

### 4.1 Brand color tokens

| Token | Light (default) | Dark (deep navy atmospheric) | Usage |
|---|---|---|---|
| `--bg-base` | `#FAFAF7` (warm paper) | `#0B1020` (deep navy) | Page background |
| `--bg-elev-1` | `#FFFFFF` | `#11172E` | Cards, navbar |
| `--bg-elev-2` | `#F2F0EA` | `#161D38` | Hovered cards, modals |
| `--fg-primary` | `#0E141B` | `#E7ECF8` | Body text |
| `--fg-muted` | `#5B6470` | `#9AA7C2` | Captions |
| `--accent-1` | `#6D5BFF` (electric indigo) | `#7E72FF` | Primary CTA, links |
| `--accent-2` | `#16C9A7` (mint) | `#36E0BE` | Secondary highlights |
| `--accent-3` | `#FF7E5C` (warm coral) | `#FFA089` | Spotlight, badges |
| `--ring` | `rgba(109,91,255,0.35)` | `rgba(126,114,255,0.45)` | Focus rings |
| `--gradient-mesh` | indigo→mint→white | indigo→violet→navy | Hero backdrop |
| `--border` | `#E6E1D6` | `#1F2748` | Hairlines |
| `--shadow-sm` | `0 1px 2px rgba(15,20,30,0.06)` | `0 1px 2px rgba(0,0,0,0.4)` | - |
| `--shadow-md` | `0 8px 24px rgba(15,20,30,0.08)` | `0 10px 30px rgba(0,0,0,0.5)` | - |

### 4.2 Type scale (Tailwind + custom)
- **Display / hero:** Inter Display · 96 / 64 / 48 px, tracking -0.02em, line-height 1.05.
- **Heading:** Inter Display · 48 / 36 / 28, tracking -0.01em.
- **Body:** Inter · 18 / 16, line-height 1.65.
- **Caption:** Inter · 14, weight 500, color `--fg-muted`.
- **Mono (code/data):** JetBrains Mono · 14 for chips, code blocks.

> Fonts loaded via `next/font` (or `@font-face` woff2 with `font-display: swap`). Self-host - no external Google Fonts request.

### 4.3 Theme switching
- **Default:** `system` (respects `prefers-color-scheme` until user overrides).
- **Control:** sun/moon pill in navbar. Clicking flips `--bg-base`, `--fg-*`, `--accent-*` with a **450 ms cubic-bezier(.2,.8,.2,1) sync of `background-color`, `color`, `border-color`** on key elements (using `View Transitions API` if available, else `gsap.to(..., { backgroundColor, color, duration: 0.45 })`).
- **Persisted** to `localStorage` under key `vk-theme` (`"light" | "dark" | "system"`).
- **No-FOUC:** inline a tiny script in `<head>` that reads `localStorage` and sets `data-theme` on `<html>` before paint.

### 4.4 Iconography
- Skill icons - **self-host the SVG set** (skillicons-style) at `/public/icons/skills/*`. No third-party CDN on critical path.
- Technology logos - `simple-icons` rendered as inline SVG, colored via `currentColor`.
- Theme icons - inline SVG (no icon font).

### 4.5 Spacing & rhythm
- Section vertical: `clamp(96px, 12vw, 192px)`.
- Card padding: `clamp(20px, 2.4vw, 32px)`.
- Hero top offset (below fixed nav): `clamp(120px, 18vh, 180px)`.

---

## 5. Motion Choreography (GSAP + ScrollTrigger + Lenis)

### 5.1 Stack & global config
- **GSAP 3.13+** + **ScrollTrigger** + **ScrollToPlugin** + **SplitText** (club) via CDN `https://cdn.jsdelivr.net/npm/gsap@3.13.0/...` with **SRI hashes** and `defer`.
- **Lenis** for smooth scroll (`lenis@1.x`).
- Respect `prefers-reduced-motion`: when `matchMedia('(prefers-reduced-motion: reduce)').matches` is true, **disable all continuous scroll-triggered animations** and play reveal once at viewport entry only, ease `power2.out`, duration ≤ 0.4.
- Loader: pre-`gsap.matchMedia()` and pre-register plugins.

### 5.2 Per-section behaviors

| § | Section | Trigger | Animation |
|---|---|---|---|
| 1 | **Hero** | onLoad | Role-line typewriter (text scramble → reveal words); CTA buttons stagger 0.08 s; scroll-cue infinite ease |
| 1 | **Hero** | scroll | Background gradient mesh translates with cursor (rAF, capped at ±12 px) |
| 2 | **Featured Projects** | enter from bottom | Each spotlight tile: opacity 0→1, y +24→0, scale 0.98→1, stagger 0.12, scrubOnce |
| 2 | **Featured Projects** | hover | `gsap.to(tile, { y: -6, scale: 1.015, duration: 0.35 })`; live-preview iframe fades in inside the tile (200 ms), out on mouseleave |
| 3 | **All Projects** | scroll | Filters slide in chip-by-chip; cards stagger 0.06, with an Instagram-style masonry on desktop ≥1200 px |
| 4 | **About** | scroll | Counter-up numbers (700 commits · 55 repos · 598 cs · 9.2 CGPA) tween via `obj:{val:0→target}` over 1.6 s; on enter |
| 5 | **Skills** | scroll | Icon cloud: icons fade in cluster - Lang cluster → 200 ms → Frontend cluster → 200 ms → … ; on-hover, an inline description card flips in below |
| 6 | **GitHub Activity** | scroll | SVG `<path>` for the contribution graph draws from left to right using `stroke-dasharray/offset`, scrub linked to scroll |
| 7 | **Experience Timeline** | **Pinned for full pass** | Pin section at top for `≈1.4×viewportHeight` scroll length; as user scrubs, timeline eases horizontally and each role card swaps in/out; background year numerals scale 1 → 1.4 → 1 |
| 8 | **Beyond Web Apps** | scroll | Icon chips drop in from y+30 with stagger 0.05 |
| 9 | **Contact** | scroll | CTA card pulses stroke radius once; mailto opens with prefilled subject `Hello from your portfolio` |
| Theme | **Anywhere** | click | Background + text + border colors tween together over 450 ms (see §4.3) |

### 5.3 SVG path-draw recipe (use for hero wave divider + GitHub-activity underline)
```js
gsap.from("path.draw", {
  strokeDasharray: 2000,
  strokeDashoffset: 2000,
  scrollTrigger: { trigger: "path.draw", start: "top 85%", end: "bottom 60%", scrub: 1 }
});
```
Path must be authored with explicit, ordered anchor points so the left-to-right flow reads cleanly.

### 5.4 Pinned experience timeline (spec)
- Wrapper height = `≈4 × window.innerHeight` to provide scrub runway.
- Inside, position the timeline absolute; horizontal `xPercent: -100 * progress` tween, scrub 1, snap to nearest role every 25 %.
- On mobile (<768 px): **disable pin entirely** and show the timeline as a vertical list. The implementation must `gsap.matchMedia({ '(min-width:768px)': ..., '(max-width:767px)': ... })`.

### 5.5 Live-preview-on-hover component (see §6.2 for component spec)
- Hover mount the iframe; mouseleave unmount (or `display:none`) to keep cost zero when not in view.
- Disable on `prefers-reduced-motion: reduce` AND below 768 px AND on `connection.saveData === true`.

---

## 6. Component Specifications

### 6.1 Navbar
- Sticky, full-width, `--bg-elev-1` with `backdrop-filter: blur(12px) saturate(180%)` and 1 px bottom border.
- Right side: theme toggle (sun/moon pill), GitHub icon link, "Resume" pill (opens resume modal - builder must use **placeholder** resumes unless Karthik uploads new files; flag explicitly).
- Hamburger → slide-in drawer below 768 px.

### 6.2 Spotlight Project Tile (the centerpiece)
```
┌───────────────────────────────────────────────────────────────┐
│  [poster or live iframe fills 16:9]                          │
│  ┌────────────────────────────────────────┐                  │
│  │  #tag chip · #tag chip                 │   ← animated in  │
│  └────────────────────────────────────────┘                  │
│  Title  (display)                                              │
│  Tagline  (body)                                               │
│  • bullet 1                                                   │
│  • bullet 2                                                   │
│  • bullet 3                                                   │
│  [Live ↗]  [GitHub ↗]  [↗ Open]                               │
└───────────────────────────────────────────────────────────────┘
```
- Default poster is the project's `og:image`. On `pointerenter` (with `hover:hover`, not touch), fade poster out and a sandboxed iframe fades in (`sandbox="allow-scripts allow-same-origin"`, `loading="lazy"`, `referrerpolicy="no-referrer"`). Banner on top: "Live preview - click to enter" with a transparent overlay link to the actual site.
- If the iframe errors (404, cert problem, blocked), revert to poster + a `[Live ↗]` button.
- Reduce-motion + mobile + Save-Data: **always** poster-only (no iframe).

### 6.3 Skill Chip + Cluster
- Each skill = small icon (24 px) + tooltipped label.
- On focus/hover: a description card slides up below with 2 lines of context ("TypeScript - used in production APIs at Webileapps…").

### 6.4 GitHub Activity Strip
- Three lazy-loaded cards in a row:
  1. **Streak stats** - `<img src="https://streak-stats.demolab.com?user=venkatakarthikm&theme=…&hide_border=…"…>`
  2. **Language split** - `<img src="https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=venkatakarthikm&theme=…"…>` (verify endpoint on first run)
  3. **Trophies** - `<img src="https://github-profile-trophy.vercel.app/?username=venkatakarthikm&theme=…&no-frame=true"…>`
- All three should match the **site's** theme: builder keeps two sets (light & dark) and swaps `src` on theme change.

### 6.5 Counter-Up Stats (in About)
- Four counters: `700` contributions · `55` repos · `598` commits · `9.2` CGPA.
- Numbers are from the trophy image - but the builder must keep them in `data/profile.js` so Karthik can edit them. Add a comment "Refresh after updating GitHub stats."

### 6.6 Contact Card
- Mailto link (no server) prefilled: `mailto:2200030154cseh@gmail.com?subject=Hello%20from%20your%20portfolio`.
- LinkedIn, GitHub, Portfolio icons (lucide-style inline SVG).
- "Download Résumé" → opens `/resume.pdf` (builder provides placeholder, Karthik replaces with `venkatakarthik_backend.pdf` or `venkatakarthik_fullstack.pdf`).

### 6.7 Footer
- Single row: © 2026 Muchu Venkata Karthik · "Built with care. No tracking without consent." · tiny theme/contrast toggle blurbs.

---

## 7. SEO, AI/Agent Discovery, A11y, Performance

### 7.1 Meta & OG tags (per-page)
```html
<title>Venkata Karthik · Full-Stack + Backend Engineer</title>
<meta name="description" content="Full-stack and backend developer with 2+ years building production fintech apps, real-time platforms, and 50+ API integrations across React, Node.js, PostgreSQL, and MongoDB."/>
<link rel="canonical" href="https://mvkarthik.onrender.com/" />
<meta name="theme-color" content="#0B1020" media="(prefers-color-scheme: dark)"/>
<meta name="theme-color" content="#FAFAF7" media="(prefers-color-scheme: light)"/>
<meta property="og:title" content="Venkata Karthik · Full-Stack + Backend Engineer"/>
<meta property="og:description" content="…"/>
<meta property="og:image" content="https://mvkarthik.onrender.com/og/home.png"/>
<meta property="og:type" content="website"/>
<meta name="twitter:card" content="summary_large_image"/>
```

### 7.2 JSON-LD blocks

**Person block (every page):**
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Muchu Venkata Karthik",
  "url": "https://mvkarthik.onrender.com/",
  "email": "mailto:2200030154cseh@gmail.com",
  "sameAs": [
    "https://www.linkedin.com/in/venkatakarthikm/",
    "https://github.com/venkatakarthikm"
  ],
  "knowsAbout": ["Node.js","TypeScript","PostgreSQL","MongoDB","Redis","React","Next.js"]
}
```

**SoftwareApplication block (per spotlight project):** (rendered conditionally as Karthik opts in)

### 7.3 AI/LLM discoverability files
- **`/llms.txt` and `/llms-full.txt`** at root - concise structured summary site (per llmstxt.org draft): `# Venkata Karthik > Full-Stack + Backend Developer working in TypeScript, Node.js, PostgreSQL, MongoDB, Redis, React, and Next.js. Production fintech experience at Webileapps; built TrackWicket (real-time cricket), API Coolie (40+ endpoint scheduler), Fourzdeals (MERN e-commerce). Contact: 2200030154cseh@gmail.com`.
- **`/sitemap.xml`** - every project URL, priority boost on `/` and `/projects`.
- **`/robots.txt`** - `Allow: /`, point to sitemap.
- **`/manifest.webmanifest`** - name, short_name, theme_color (both), icons (192/512/maskable).
- **`/humans.txt`** - credits.
- **`/security.txt`** (`.well-known/security.txt`) - `mailto:2200030154cseh@gmail.com`.
- **`/.well-known/ai.txt`** - discovery token for AI crawlers if Karthik wants (commonly `User-agent: *` + allowed refs).

### 7.4 Accessibility budget (mandatory)
- WCAG AA contrast on all text in both themes (verify accent-3 on `--bg-base`: AA Large only - use a darker `--accent-3` shade for body).
- All interactive elements keyboard-reachable; visible focus ring (`--ring`) ≥ 2 px.
- All `<img>` have `alt`; decorative ones have `alt=""`.
- Animated SVG path: respect `prefers-reduced-motion`.
- Prefers-contrast / forced-colors: provide a fallback palette.
- `tabindex` on skip-link.

### 7.5 Performance budget
- **Total page weight (gzipped):** ≤ 180 KB JS · ≤ 60 KB CSS · ≤ 600 KB images (above-fold 200 KB max).
- **Hero fonts:** preload woff2 (≤ 50 KB), swap.
- **Iframes:** 0 unless hovered; `loading="lazy"` iframes in second-fold.
- **Images:** `avif`/`webp`, responsive `srcset`, width/height attributes, `decoding="async"`.
- **Lighthouse target:** P/Acc/BP/SEO ≥ 95 (mobile, 4G simulated).

---

## 8. Framework & Build Recommendation

> User mentioned MERN + Tailwind + GSAP. For a portfolio of this ambition, the builder has two viable paths:

| Approach | Pros | Cons | Recommendation |
|---|---|---|---|
| **Next.js 14 (App Router) + Tailwind + GSAP** | SSG = free Lighthouse wins; per-route metadata + JSON-LD clean; `next/font` self-hosting; sitemap/robots/llms.txt/llms-full.txt built-in; image optimization; route to `mvkarthik.onrender.com` | Slightly heavier dev setup | **Recommended** |
| **Vite + React + Tailwind + GSAP** | Fastest dev loop; minimal config | No built-in SEO files or SSG; manual sitemap; OG requires plugin | Acceptable fallback |

> **Use React 18 · Vite ≥ 5 OR Next 14. Tailwind 3.4+ · GSAP 3.13+ · Lenis 1.x.**

---

## 9. File / Folder Layout (target)

```
portfolio/
├─ public/
│  ├─ resume.pdf              ← Karthik replaces with one of the uploads
│  ├─ llms.txt
|   | llms-full.txt
│  ├─ sitemap.xml
│  ├─ robots.txt
│  ├─ manifest.webmanifest
│  ├─ humans.txt
│  ├─ .well-known/
│  │  ├─ security.txt
│  │  └─ ai.txt
│  └─ projects/              ← 16:9 WebP posters per project
├─ src/
│  ├─ data/
│  │  ├─ profile.js          ← summary constants, counters, contact
│  │  └─ projects.js         ← canonical entries from §3
│  ├─ components/
│  │  ├─ Nav.jsx
│  │  ├─ Hero.jsx
│  │  ├─ SpotlightGrid.jsx
│  │  ├─ ProjectTile.jsx     ← live-preview-on-hover
│  │  ├─ SecondaryGrid.jsx
│  │  ├─ About.jsx
│  │  ├─ SkillsCloud.jsx
│  │  ├─ GithubActivity.jsx
│  │  ├─ ExperienceTimeline.jsx
│  │  ├─ Beyond.jsx
│  │  ├─ Contact.jsx
│  │  └─ Footer.jsx
│  ├─ hooks/
│  │  ├─ useTheme.js
│  │  └─ useReducedMotion.js
│  ├─ motion/
│  │  └─ gsapConfig.js       ← ScrollTrigger registrations, matchMedia
│  └─ styles/
│     ├─ tokens.css          ← color/spacing/type variables (light + dark)
│     └─ tailwind.css
├─ index.html (or app/layout.tsx)
├─ tailwind.config.js
├─ package.json
└─ README.md
```

---

## 10. Deployment / CI Notes

- **Host:** Keep current `mvkarthik.onrender.com` OR move to Vercel/Cloudflare Pages (suggest Vercel - already have `vercel.app` projects). Builder should keep deployment-agnostic via `vite build` / `next build`.
- **CI/CD:** GitHub Actions: lint (`eslint`), build, lighthouse-ci (budget assertions), deploy on `main`.
- **Domain:** `mvkarthik.onrender.com` is the working URL - set as the canonical and OG base URL.
- **Analytics:** Umami self-hosted (privacy-friendly) **or** GA4 with cookie-banner. Default to a single cookie-consent banner; analytics are off until consent.
- **Hidden gems:** add `Cache-Control: public, max-age=31536000, immutable` for `/public/icons/*` SVGs and `stale-while-revalidate` for HTML.

---

## 11. Acceptance Checklist (the builder self-checks before "done")

- [ ] All 7 spotlight projects render with poster; live-iframe-on-hover works on desktop; mobile never iframes.
- [ ] Theme toggle animates smoothly between light and dark in ≤ 500 ms with **no flash on reload**.
- [ ] All counters, SVG paths, pinned timeline, and Lenis smooth-scroll work; with `prefers-reduced-motion: reduce`, animations degrade gracefully.
- [ ] Lighthouse mobile: **P/Acc/BP/SEO ≥ 95**.
- [ ] Keyboard-only navigation can reach every link, skip-link works, focus ring visible.
- [ ] `/llms.txt`, `llms-full.txt`,`/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, JSON-LD Person block are reachable.
- [ ] Every project card links to **real** GitHub repo or shows `repo_unknown` tag (no placeholder URLs).
- [ ] Image posters (WebP) load lazy with width/height set.
- [ ] Console has **zero** errors on Chrome/Safari/Firefox latest.

---

## 12. Open Questions for Karthik (resolve before/during build)

1. **Repos** - confirm or supply real GitHub URLs for `TrackWicket`, `API Coolie`, `Fourzdeals`, `selftaughtstack`, `stackinfi`, `ChatVK`, `Weather Flow`, and the secondary 8 (Cric Web, Streamy Film, Video Downloader, ECO LEARN, Rules App, CineDisco, Yt Transcript, X Comments Checker, Verified Follower Counter, Twitter Engagement Checker). Anything else goes `repo: null` with a "Repo coming soon" badge instead of a dead link.
2. **Resume file** - should the public site link both `venkatakarthik_backend.pdf` and `venkatakarthik_fullstack.pdf`, or pick one? Builder defaults to **both**, with the backend version featured first.
3. **Live-site previews** - hover-iframes are a taste call. If you want them off entirely, builder should still render posters + direct `[Live ↗]` buttons.
4. **OG image** - a personal photo at `/public/og/home.png` (1200×630) plus one per spotlight. If no photo yet, builder generates a typography-based placeholder.
5. **Domain choice** - keep `mvkarthik.onrender.com` or move primary to `venkatakarthikm.com`? (OG/canonical/sitemap targets must agree.)
6. **Real-time language/trophy SVGs** - keep using `github-profile-summary-cards` & `github-profile-trophy` (free, third-party), or self-host and refresh weekly?

---

## 13. Implementation Order (for Antigravity)

1. **Scaffold** - Vite or Next + Tailwind + tokens.css + llms.txt + llms-full.txt + sitemap.xml + robots.txt + manifest.webmanifest.
2. **Data layer** - copy `data/profile.js` and `data/projects.js` (placeholder repos marked null).
3. **Shell** - Nav + Footer + theme system + smooth scroll + reduced-motion hook.
4. **Hero** - animated role-line + gradient mesh + parallax.
5. **Spotlight grid** - ProjectTile with poster; layer live preview on hover *after* tiles are stable.
6. **Secondary grid** + filters.
7. **About + counters**.
8. **Skills cloud**.
9. **GitHub activity** (lazy iframes for streak/langs/trophies).
10. **Pinned experience timeline** + SVG path-draw on hero divider.
11. **Beyond + Contact**.
12. **SEO/A11y pass** - JSON-LD, OG, sitemap, manifest, lighthouse-ci, axe-core.
13. **Final QA** against Acceptance Checklist §11.

---
*End of brief. Every number, project title, URL, summary, and skill above is sourced from the two PDF resumes, the user's GitHub README, the user's old projects array, or the trophy-card image - except where explicitly flagged `live_status_unverified` (the 7 spotlight URLs not reachable by my crawler this turn) or `TODO` (repos Karthik should supply). The builder should not invent any URL, number, or claim not present in this brief.*
