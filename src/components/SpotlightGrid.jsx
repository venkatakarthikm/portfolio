/**
 * SpotlightGrid.jsx
 * 4 featured live-preview projects: TrackWicket, APICoolie, StackInfi, SelfTaughtStack
 */
import { useRef, useState, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { PROJECTS } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const LIVE_IDS = ['trackwicket', 'apicoolie', 'stackinfi', 'selftaughtstack']
const LIVE_PROJECTS = LIVE_IDS.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean)

const PROJECT_DATES = {
  trackwicket: { start: 'OCT 2025', end: 'MAR 2026' },
  apicoolie: { start: 'MAR 2026', end: 'JUN 2026' },
  stackinfi: { start: 'JUN 2026', end: 'Ongoing' },
  selftaughtstack: { start: 'JULY 2026', end: 'Ongoing' },
}

const PROJECT_NOTES = {
  stackinfi: 'Group project - built with a Friend',
}

const CARD_ACCENTS = ['#6D5BFF', '#36E0BE', '#FFA089', '#06D6A0']
const SPOTLIGHT_MAX_WIDTH = 1600

function TeamIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function LiveButton({ href, id }) {
  return (
    <a
      href={href}
      id={id}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal="cta"
      className="group relative flex-1 inline-flex items-center justify-center p-[1.5px] rounded-full font-semibold transition-all duration-300 ease-in-out hover:scale-[1.02] active:scale-95 no-underline shrink-0 bg-neutral-800"
      style={{ textDecoration: 'none' }}
    >
      {/* 1. Ambient bottom light projection */}
      <span
        aria-hidden="true"
        className="absolute -bottom-2 inset-x-2 h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-500 blur-xl opacity-0 group-hover:opacity-90 transition-opacity duration-500 -z-10 pointer-events-none"
      />

      {/* 2. Direct glowing gradient border */}
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
      />

      {/* 3. Dark inner container */}
      <span className="relative z-10 flex items-center justify-center gap-2.5 w-full h-10 px-5 rounded-full bg-neutral-950 transition-colors duration-300">
        <span className="text-sm sm:text-base font-semibold text-white group-hover:text-emerald-300 transition-all duration-300 tracking-wide whitespace-nowrap group-hover:translate-x-0.5">
          Live
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-5 h-5 text-white group-hover:text-emerald-300 transition-all duration-300 group-hover:translate-x-1 shrink-0"
        >
          <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" />
        </svg>
      </span>
    </a>
  )
}

function GitHubStarButton({ href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal="cta"
      className="group relative flex-1 inline-flex items-center justify-center p-px rounded-full font-medium text-white transition-transform duration-200 hover:scale-[1.02] active:scale-95 animate-rainbow cursor-pointer shrink-0"
      style={{
        textDecoration: 'none',
        background: `
          linear-gradient(#0c101d, #0c101d) padding-box,
          linear-gradient(90deg, hsl(0,100%,65%), hsl(90,100%,65%), hsl(210,100%,65%), hsl(280,100%,65%)) border-box
        `,
        border: '1.5px solid transparent',
        backgroundSize: '200% 100%',
        boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute -bottom-2 inset-x-2 h-full rounded-full bg-[linear-gradient(90deg,hsl(0,100%,65%),hsl(90,100%,65%),hsl(210,100%,65%),hsl(280,100%,65%))] blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500 -z-10 pointer-events-none"
      />

      <div className="relative z-10 flex items-center justify-center gap-2 w-full h-10 px-5">
        <svg className="size-5 fill-white shrink-0" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        <span className="text-sm sm:text-base font-semibold tracking-tight text-white whitespace-nowrap">
          GitHub
        </span>
        <svg
          className="size-4 text-gray-400 group-hover:text-yellow-300 transition-colors duration-200 fill-current shrink-0"
          viewBox="0 0 24 24"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      </div>
    </a>
  )
}

/* ── Single project card ── */
function SpotlightCard({ project, index }) {
  const accent = CARD_ACCENTS[index % CARD_ACCENTS.length]
  const dates = PROJECT_DATES[project.id] || {}
  const teamNote = PROJECT_NOTES[project.id]
  const [iframeState, setIframeState] = useState('poster')
  const [hovered, setHovered] = useState(false)
  const prefersReduced = useReducedMotion()
  const wrapperRef = useRef(null)
  const timerRef = useRef(null)

  useGSAP(() => {
    if (prefersReduced || !wrapperRef.current) return
    const el = wrapperRef.current
    const card = el.querySelector('[data-reveal="card"]')
    const eyebrow = el.querySelector('[data-reveal="eyebrow"]')
    const title = el.querySelector('[data-reveal="title"]')
    const teamNoteEl = el.querySelector('[data-reveal="team-note"]')
    const tagline = el.querySelector('[data-reveal="tagline"]')
    const bullets = el.querySelectorAll('[data-reveal="bullet"]')
    const tags = el.querySelectorAll('[data-reveal="tag"]')
    const ctas = el.querySelectorAll('[data-reveal="cta"]')
    const preview = el.querySelector('[data-reveal="preview"]')

    const tl = gsap.timeline({
      defaults: { ease: 'power2.out' },
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        end: 'bottom 25%',
        toggleActions: 'play reverse play reverse',
      },
    })

    tl.fromTo(card, { opacity: 0, y: 48 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0)
      .fromTo(preview, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.8, ease: 'power2.out' }, 0.05)
      .fromTo(eyebrow, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.15)
      .fromTo(title, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.55 }, 0.2)

    if (teamNoteEl) {
      tl.fromTo(teamNoteEl, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.4 }, 0.26)
    }

    tl.fromTo(tagline, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3)
      .fromTo(bullets, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 }, 0.34)
      .fromTo(tags, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.03 }, 0.44)
      .fromTo(ctas, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, stagger: 0.06 }, 0.5)

    return () => tl.scrollTrigger?.kill()
  }, { scope: wrapperRef, dependencies: [prefersReduced] })

  const canIframe = useCallback(() =>
    window.innerWidth >= 900 && !navigator.connection?.saveData && window.matchMedia('(hover: hover)').matches, [])

  const handleEnter = () => {
    setHovered(true)
    if (canIframe() && project.url && iframeState === 'poster')
      timerRef.current = setTimeout(() => setIframeState('loading'), 350)
  }
  const handleLeave = () => {
    setHovered(false)
    clearTimeout(timerRef.current)
  }

  return (
    <div ref={wrapperRef} style={{ position: 'relative' }}>
      <article
        data-reveal="card"
        id={`project-${project.id}`}
        aria-label={`${project.title} - ${project.tagline}`}
        style={{
          display: 'grid',
          gridTemplateColumns: '32fr 68fr',
          minHeight: 620,
          background: 'var(--bg-elev-1)',
          border: '1px solid var(--border)',
          borderRadius: 24,
          overflow: 'hidden',
          boxShadow: `0 0 0 0 ${accent}`,
          transition: 'box-shadow 350ms ease',
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 20px 60px color-mix(in srgb, ${accent} 14%, transparent)` }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 0 0 transparent' }}
      >
        {/* ── INFO PANEL ── */}
        <div style={{
          padding: 'clamp(2rem, 3.5vw, 3rem)',
          display: 'flex', flexDirection: 'column',
          borderRight: '1px solid var(--border)',
          position: 'relative', overflow: 'hidden', minWidth: 0,
        }}>
          {/* Accent glow */}
          <div aria-hidden="true" style={{
            position: 'absolute', top: -70, left: -70,
            width: 260, height: 260, borderRadius: '50%', pointerEvents: 'none',
            background: `radial-gradient(circle, color-mix(in srgb, ${accent} 16%, transparent), transparent 68%)`,
          }} />

          {/* Counter + dates */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
            <div data-reveal="eyebrow" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div style={{ width: 9, height: 9, borderRadius: '50%', background: accent, boxShadow: `0 0 10px ${accent}` }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--fg-muted)', letterSpacing: '0.14em', fontWeight: 700 }}>
                {String(index + 1).padStart(2, '0')} / {String(LIVE_PROJECTS.length).padStart(2, '0')}
              </span>
            </div>
            {dates.start && (
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.68rem', fontWeight: 600,
                color: accent, padding: '0.18rem 0.65rem', borderRadius: 99,
                background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
                letterSpacing: '0.04em',
              }}>
                {dates.start} → {dates.end}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 data-reveal="title" style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '0.75rem' }}>
            {project.title}
          </h3>

          {/* Team note */}
          {teamNote && (
            <div data-reveal="team-note" style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontSize: '0.75rem', color: 'var(--fg-muted)',
              marginBottom: '1rem', width: 'fit-content',
              padding: '0.3rem 0.7rem', borderRadius: 99,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
              border: `1px solid color-mix(in srgb, ${accent} 20%, transparent)`,
            }}>
              <TeamIcon /> {teamNote}
            </div>
          )}

          {/* Tagline */}
          <p data-reveal="tagline" style={{ fontSize: 'clamp(0.875rem, 1.2vw, 1rem)', color: 'var(--fg-muted)', lineHeight: 1.7, marginBottom: '1.25rem' }}>
            {project.tagline}
          </p>

          {/* Bullets */}
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {project.bullets?.slice(0, 3).map((b, i) => (
              <li key={i} data-reveal="bullet" style={{ display: 'flex', gap: '0.55rem', fontSize: '0.875rem', color: 'var(--fg-muted)', lineHeight: 1.55 }}>
                <span style={{ color: accent, flexShrink: 0, fontWeight: 700 }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          {/* Tech tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginBottom: '1.5rem' }}>
            {project.tags.map(t => (
              <span key={t} data-reveal="tag" style={{
                padding: '0.22rem 0.65rem', borderRadius: 99,
                fontSize: '0.68rem', fontFamily: 'var(--font-mono)', fontWeight: 600,
                background: `color-mix(in srgb, ${accent} 10%, transparent)`,
                border: `1px solid color-mix(in srgb, ${accent} 25%, transparent)`,
                color: accent,
              }}>{t}</span>
            ))}
          </div>

          {/* CTAs: Equal width, full row span, matching height */}
          <div style={{ display: 'flex', gap: '0.75rem', width: '100%', alignItems: 'center', marginTop: 'auto' }}>
            {project.url && (
              <LiveButton href={project.url} id={`live-${project.id}`} />
            )}

            {project.repo ? (
              <GitHubStarButton href={project.repo} />
            ) : (
              <span data-reveal="cta" style={{ flex: 1, textAlign: 'center', fontSize: '0.75rem', color: 'var(--fg-muted)', fontFamily: 'var(--font-mono)' }}>
                🔒 Repo coming soon
              </span>
            )}
          </div>
        </div>

        {/* ── PREVIEW PANEL ── */}
        <div
          data-reveal="preview"
          style={{ position: 'relative', background: 'var(--bg-elev-2)', overflow: 'hidden' }}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          <img src={project.poster} alt={`${project.title} screenshot`}
            loading="lazy" decoding="async"
            onError={e => { e.currentTarget.src = `https://placehold.co/1200x800/${accent.replace('#', '')}20/6D5BFF?text=${encodeURIComponent(project.title)}` }}
            style={{
              position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover',
              opacity: iframeState === 'live' ? 0 : 1,
              transition: 'opacity 600ms ease',
            }}
          />

          {iframeState === 'loading' && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 2,
              background: 'linear-gradient(90deg, var(--bg-elev-2) 25%, var(--bg-elev-1) 50%, var(--bg-elev-2) 75%)',
              backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite',
            }} />
          )}

          {(iframeState === 'loading' || iframeState === 'live') && project.url && (
            <iframe src={project.url} title={`Live preview: ${project.title}`}
              loading="lazy" referrerPolicy="no-referrer" allow="fullscreen"
              onLoad={() => setIframeState('live')}
              onError={() => setIframeState('error')}
              style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none',
                opacity: iframeState === 'live' ? 1 : 0,
                transition: 'opacity 600ms ease', pointerEvents: 'auto', zIndex: 3,
              }}
            />
          )}

          {iframeState === 'live' && (
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, zIndex: 15,
              background: 'rgba(8,11,20,0.75)', backdropFilter: 'blur(12px)',
              padding: '0.4rem 0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              pointerEvents: 'none',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#2ecc71', boxShadow: '0 0 6px #2ecc71' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'rgba(255,255,255,0.55)' }}>
                  {project.url.replace(/^https?:\/\//, '')}
                </span>
              </div>
              <a href={project.url} target="_blank" rel="noopener noreferrer"
                style={{ pointerEvents: 'auto', display: 'flex', alignItems: 'center', gap: 4, color: 'rgba(255,255,255,0.45)', fontSize: '0.65rem', textDecoration: 'none' }}>
                Open ↗
              </a>
            </div>
          )}

          <div aria-hidden="true" style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: '28%', zIndex: 1,
            background: `linear-gradient(to top, color-mix(in srgb, ${accent} 10%, transparent), transparent)`,
            pointerEvents: 'none',
          }} />

          {iframeState === 'poster' && project.url && (
            <div style={{
              position: 'absolute',
              bottom: '1.1rem', left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(8,11,20,0.65)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.9)',
              fontSize: '0.78rem',
              padding: '0.4rem 0.95rem',
              borderRadius: 99,
              pointerEvents: 'none',
              fontFamily: 'var(--font-mono)',
              whiteSpace: 'nowrap',
              zIndex: 6,
              opacity: hovered ? 0 : 1,
              transition: 'opacity 250ms ease',
            }}>
              Hover to view live preview ↑
            </div>
          )}

          <style>{`
            @media (max-width:900px) {
              #project-${project.id} { grid-template-columns:1fr !important; min-height:auto !important; }
              #project-${project.id}>div:last-child { height:280px; }
            }
          `}</style>
        </div>
      </article>
    </div>
  )
}

export default function SpotlightGrid() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    gsap.fromTo('#spotlight-heading, #spotlight-heading + p',
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      }
    )
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section id="projects" aria-labelledby="spotlight-heading" ref={sectionRef}
      style={{ padding: 'clamp(3rem, 6vw, 5rem) 0' }}>
      <div className="container" style={{ marginBottom: '2.5rem', maxWidth: SPOTLIGHT_MAX_WIDTH }}>
        <span className="section-label">Featured Work</span>
        <h2 id="spotlight-heading">
          Featured Engineering Projects: <span className="gradient-text">Track Wicket, API Coolie & Stackinfi</span>
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginTop: '0.75rem', maxWidth: '60ch', fontSize: '1.05rem', lineHeight: 1.7 }}>
          Four production projects with live interactive previews - hover the right panel to load the real site.
        </p>
      </div>

      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '3rem', maxWidth: SPOTLIGHT_MAX_WIDTH }}>
        {LIVE_PROJECTS.map((project, i) => (
          <SpotlightCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}