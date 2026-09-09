# AGENTS.md - Portfolio Project Context for AI Coding Agents

This file provides instructions and context for AI coding agents (Antigravity, Cursor, GitHub Copilot, etc.) working on this codebase.

---

## Project Overview

**What:** Portfolio website for Muchu Venkata Karthik - Full-Stack & Backend Engineer.
**Live URL:** https://muchukarthik.stackinfi.in
**Build spec:** `venkatakarthik-portfolio-buildspec.md` (root directory)

---

## Stack

| Layer | Technology |
|---|---|
| Build | Vite 5 + @vitejs/plugin-react |
| Framework | React 18 (JSX, hooks only - no class components) |
| Styling | Tailwind CSS v4 (`@tailwindcss/vite` plugin) + CSS custom properties in `src/styles/tokens.css` |
| Animation | GSAP 3.13+ + `@gsap/react` (useGSAP hook) + Lenis 1.x for smooth scroll |
| Data | Plain JS modules in `src/data/` - no CMS, no API |
| Icons | Inline SVG only - no icon fonts, no external CDN on critical path |
| Fonts | Inter + JetBrains Mono via Google Fonts (preconnect + preload) |

---

## Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Production build (output: dist/)
npm run build

# Preview production build locally
npm run preview

# Lint
npm run lint
```

---

## Project Structure

```
src/
  data/
    profile.js      ← Personal info, summaries, stats, skills, experience
    projects.js     ← All 7 spotlight + 11 secondary projects (update repo: fields here)
  components/
    Nav.jsx         ← Sticky navbar, theme toggle, active-section highlight
    Hero.jsx        ← Animated hero with rotating role line
    SpotlightGrid.jsx  ← 7 featured project tiles
    ProjectTile.jsx ← Reusable tile: poster, live iframe on hover, CTA buttons
    SecondaryGrid.jsx  ← 11 secondary cards with filter chips
    About.jsx       ← Bio, internship card, counter-up stats
    SkillsCloud.jsx ← Skill icons by domain cluster with tooltip
    GithubActivity.jsx ← Lazy-loaded GitHub stats widgets
    ExperienceTimeline.jsx ← Pinned horizontal timeline (desktop) / vertical (mobile)
    Beyond.jsx      ← Beyond-web-apps icon chips
    Contact.jsx     ← Mailto CTA, social links, résumé downloads
    Footer.jsx      ← Copyright + social row
  hooks/
    useTheme.js     ← localStorage + system preference theme hook
    useReducedMotion.js ← prefers-reduced-motion hook
  motion/
    gsapConfig.js   ← Plugin registration, Lenis init, utility functions
  styles/
    tokens.css      ← ALL CSS custom properties (light + dark tokens)
    tailwind.css    ← @import tailwindcss + @theme extension
public/
  llms.txt / llms-full.txt  ← LLM discovery files
  sitemap.xml / robots.txt   ← SEO
  manifest.webmanifest        ← PWA manifest
  .well-known/
    security.txt / ai.txt / tdmrep.json
```

---

## Architecture Conventions

### Data Layer
- All personal data lives in `src/data/profile.js` and `src/data/projects.js`
- **Never hardcode strings in components** - always import from data files
- `repo: null` means "no real GitHub URL yet" - the `ProjectTile` renders a "Repo coming soon" badge automatically

### Styling
- **Design tokens first**: Use CSS custom properties from `tokens.css` (e.g. `var(--accent-1)`, `var(--bg-elev-1)`)
- Use Tailwind only for layout utilities (`flex`, `gap`, `grid`) - not for colors/shadows/radii (those come from tokens)
- Both themes (light + dark) are defined in `tokens.css` using `[data-theme="dark"]` selector
- Theme is applied by setting `data-theme` on `<html>` - never toggle `dark` class on `<body>`

### Animations (GSAP)
- Always use `useGSAP` from `@gsap/react` inside React components (handles cleanup automatically)
- Always check `useReducedMotion()` before any animation - skip or shorten if true
- Use `gsap.matchMedia()` for desktop vs mobile animation variants
- All ScrollTrigger `once: true` for one-shot reveals; `scrub: 1` for timeline pin
- Import shared utilities from `@/motion/gsapConfig.js`: `staggerReveal`, `counterUp`, `pathDraw`

### Accessibility
- Every interactive element must have: `id`, `aria-label` (if icon-only), `tabIndex` where needed
- Focus ring: apply via `:focus-visible` with `var(--ring)` - already in `tokens.css`
- All `<img>` must have `alt`; decorative images use `alt=""`

### Performance
- Iframes: only mount on `pointerenter` + `hover: hover` media + `window.innerWidth >= 768` + `!navigator.connection.saveData`
- Images: `loading="lazy"`, `decoding="async"`, explicit `width` + `height`
- GitHub widgets: lazy-loaded via IntersectionObserver in `GithubActivity.jsx`

---

## Don'ts

- ❌ Do NOT invent GitHub repo URLs - set `repo: null` and the UI handles it gracefully
- ❌ Do NOT use `document.querySelector` inside render - use refs (`useRef`) or `useGSAP`
- ❌ Do NOT use `@apply` in CSS - write rules directly with CSS custom properties
- ❌ Do NOT add tracking scripts without updating the cookie consent mechanism
- ❌ Do NOT add `target="_blank"` without `rel="noopener noreferrer"`
- ❌ Do NOT pin the experience timeline on mobile (< 768px) - use vertical list instead
- ❌ Do NOT use the phone number (+91 6302389039) anywhere on the public site

---

## Key Variables to Update

When Karthik provides real data, update these:

| File | Field | What to update |
|---|---|---|
| `src/data/projects.js` | `repo` | Replace `null` with real GitHub URLs |
| `src/data/profile.js` | `GA4_MEASUREMENT_ID` | Replace with real Google Analytics ID |
| `src/data/profile.js` | `CANONICAL_URL` | If domain changes |
| `index.html` | `og:image`, canonical | If domain changes |
| `public/sitemap.xml` | All `<loc>` URLs | If domain changes |
| `public/llms.txt`, `llms-full.txt` | URLs | If domain changes |
| `public/` | `resume-backend.pdf`, `resume-fullstack.pdf` | Replace placeholder with real PDFs |

---

## Open Items (for Karthik to resolve)

1. **GitHub repo URLs** - provide real URLs for all 7 spotlight + 11 secondary projects
2. **Profile photo** - replace the emoji placeholder in `About.jsx` with a real `<img>` tag
3. **OG images** - add real `public/og/home.png` (1200×630)
4. **Project posters** - add `public/projects/*.webp` for each spotlight project
5. **Resume PDFs** - copy `venkatakarthik_backend.pdf` → `public/resume-backend.pdf` and `venkatakarthik_fullstack.pdf` → `public/resume-fullstack.pdf`
6. **GA4 ID** - update `GA4_MEASUREMENT_ID` in `src/data/profile.js`
