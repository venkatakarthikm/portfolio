import { useState, useRef, useCallback, useEffect } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ExternalIcon() {
  return <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
}
function GitHubIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.03-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" /></svg>
}

// Friendly little blob mascot that rides along the preview panel.
// Pure SVG, no external assets, animated with GSAP (idle float + blink).
function Mascot({ mascotRef, eyeRef, mood = 'curious' }) {
  const mouths = {
    curious: 'M 20 30 Q 26 34 32 30',
    excited: 'M 18 28 Q 26 38 34 28',
    wink: 'M 20 30 Q 26 33 32 30',
  }
  return (
    <svg ref={mascotRef} width="52" height="52" viewBox="0 0 52 52" aria-hidden="true">
      <ellipse cx="26" cy="27" rx="22" ry="20" fill="var(--accent-1)" opacity="0.95" />
      <ellipse cx="26" cy="47" rx="14" ry="4" fill="black" opacity="0.12" />
      <g ref={eyeRef}>
        <circle cx="18" cy="24" r="3.2" fill="var(--bg-elev-1)" />
        <circle cx="34" cy="24" r="3.2" fill="var(--bg-elev-1)" />
      </g>
      <path d={mouths[mood] || mouths.curious} stroke="var(--bg-elev-1)" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="13" cy="30" rx="3" ry="2" fill="black" opacity="0.08" />
      <ellipse cx="39" cy="30" rx="3" ry="2" fill="black" opacity="0.08" />
    </svg>
  )
}

const MASCOT_MESSAGES = {
  poster: ["Ooh, wake me up! 👋", "Psst, hover here!", "There's more to see..."],
  loading: ["Warming up the pixels...", "Almost there!", "Loading my little world..."],
  live: ["Go on, poke around! 🖱️", "Try scrolling in here!", "It's real, I promise ✨", "Click something, see what happens!"],
  error: ["Whoops, I tripped.", "Can't peek from here — try the link!"],
}

/**
 * ProjectTile - Wide horizontal layout with an interactive iframe preview
 * and a small animated mascot that narrates the preview state.
 * Text content lands in and gracefully retreats as the tile enters/leaves view.
 */
export default function ProjectTile({ project, index = 0 }) {
  const prefersReduced = useReducedMotion()
  const [iframeState, setIframeState] = useState('poster') // 'poster' | 'loading' | 'live' | 'error'
  const [interactMode, setInteractMode] = useState(false)
  const [messageIdx, setMessageIdx] = useState(0)
  const tileRef = useRef(null)
  const iframeRef = useRef(null)
  const mascotRef = useRef(null)
  const eyeRef = useRef(null)
  const bubbleRef = useRef(null)

  const canIframe = useCallback(() => {
    if (prefersReduced) return false
    if (window.innerWidth < 768) return false
    if (navigator.connection?.saveData) return false
    return window.matchMedia('(hover: hover)').matches
  }, [prefersReduced])

  const loadIframe = useCallback(() => {
    if (!canIframe() || iframeState === 'live' || iframeState === 'loading' || !project.url) return
    setIframeState('loading')
  }, [canIframe, iframeState, project.url])

  const isEven = index % 2 === 0
  const messages = MASCOT_MESSAGES[iframeState] || MASCOT_MESSAGES.poster

  // Cycle the mascot's line every few seconds while it has something to say.
  useEffect(() => {
    setMessageIdx(0)
    if (prefersReduced || messages.length < 2) return
    const id = setInterval(() => {
      setMessageIdx(i => (i + 1) % messages.length)
    }, 3200)
    return () => clearInterval(id)
  }, [iframeState, prefersReduced]) // eslint-disable-line react-hooks/exhaustive-deps

  useGSAP(() => {
    if (prefersReduced) return
    const el = tileRef.current
    if (!el) return

    const title = el.querySelector('[data-reveal="title"]')
    const tagline = el.querySelector('[data-reveal="tagline"]')
    const bullets = el.querySelectorAll('[data-reveal="bullet"]')
    const tags = el.querySelectorAll('[data-reveal="tag"]')
    const ctas = el.querySelectorAll('[data-reveal="cta"]')
    const preview = el.querySelector('[data-reveal="preview"]')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play reverse play reverse',
      },
      defaults: { ease: 'power3.out' },
    })

    tl.from(preview, { opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.out' }, 0)
      .from(title, { opacity: 0, y: 28, duration: 0.55 }, 0.08)
      .from(tagline, { opacity: 0, y: 20, duration: 0.5 }, 0.16)
      .from(bullets, { opacity: 0, y: 14, duration: 0.4, stagger: 0.08 }, 0.22)
      .from(tags, { opacity: 0, y: 8, duration: 0.35, stagger: 0.035 }, 0.32)
      .from(ctas, { opacity: 0, y: 12, duration: 0.4, stagger: 0.06 }, 0.4)

    return () => tl.scrollTrigger?.kill()
  }, { scope: tileRef, dependencies: [prefersReduced] })

  // Mascot idle bob + blink loop, independent of scroll reveal.
  useGSAP(() => {
    if (prefersReduced || !mascotRef.current) return
    const float = gsap.to(mascotRef.current, {
      y: -6,
      rotation: -3,
      duration: 1.6,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })
    const blink = gsap.to(eyeRef.current, {
      scaleY: 0.1,
      transformOrigin: 'center',
      duration: 0.08,
      repeat: -1,
      repeatDelay: 2.4,
      yoyo: true,
    })
    return () => { float.kill(); blink.kill() }
  }, { scope: tileRef, dependencies: [prefersReduced] })

  // Pop the mascot in whenever its message changes.
  useGSAP(() => {
    if (prefersReduced || !bubbleRef.current) return
    gsap.fromTo(bubbleRef.current,
      { opacity: 0, y: 6, scale: 0.9 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(2)' }
    )
  }, { dependencies: [messageIdx, iframeState], scope: tileRef })

  return (
    <article
      ref={tileRef}
      id={`project-${project.id}`}
      aria-label={`${project.title} - ${project.tagline}`}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
        gridTemplateAreas: isEven ? "'info preview'" : "'preview info'",
        gap: '0',
        background: 'var(--bg-elev-1)',
        border: '1px solid var(--border)',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'box-shadow 350ms ease, transform 350ms ease',
        minHeight: 480,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
        e.currentTarget.style.transform = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
        e.currentTarget.style.transform = 'translateY(0)'
        setInteractMode(false)
      }}
    >
      {/* ── Info Panel ────────────────────────────────── */}
      <div style={{
        gridArea: 'info',
        padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0',
        borderRight: isEven ? '1px solid var(--border)' : 'none',
        borderLeft: !isEven ? '1px solid var(--border)' : 'none',
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '0.72rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--accent-1)',
            fontWeight: 700,
            letterSpacing: '0.12em',
          }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <h3 data-reveal="title" style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.6rem)', fontWeight: 800, letterSpacing: '-0.02em' }}>
            {project.title}
          </h3>
        </div>

        <p data-reveal="tagline" style={{
          fontSize: '0.9375rem',
          color: 'var(--fg-muted)',
          lineHeight: 1.65,
          marginBottom: '1.25rem',
        }}>
          {project.tagline}
        </p>

        {project.bullets?.length > 0 && (
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
            {project.bullets.map((b, i) => (
              <li key={i} data-reveal="bullet" style={{
                fontSize: '0.875rem',
                color: 'var(--fg-muted)',
                display: 'flex',
                gap: '0.625rem',
                lineHeight: 1.55,
              }}>
                <span style={{ color: 'var(--accent-2)', flexShrink: 0, marginTop: '0.12em', fontWeight: 700 }}>▸</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
          {project.tags.map(tag => (
            <span key={tag} data-reveal="tag" className="chip" style={{ fontSize: '0.72rem' }}>{tag}</span>
          ))}
        </div>

        {project.repo === null && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.75rem',
            color: 'var(--fg-muted)',
            fontFamily: 'var(--font-mono)',
            marginBottom: '1.25rem',
            padding: '0.4rem 0.75rem',
            background: 'var(--bg-elev-2)',
            borderRadius: 8,
            width: 'fit-content',
          }}>
            🔒 Repo coming soon
          </div>
        )}

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'auto' }}>
          {project.url && (
            <a
              href={project.url}
              id={`project-live-${project.id}`}
              data-reveal="cta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1.125rem' }}
            >
              Live Site <ExternalIcon />
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              id={`project-repo-${project.id}`}
              data-reveal="cta"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ fontSize: '0.875rem', padding: '0.5rem 1.125rem' }}
            >
              <GitHubIcon /> GitHub
            </a>
          )}
        </div>
      </div>

      {/* ── Preview Panel (wider stage) ───────────────── */}
      <div
        data-reveal="preview"
        style={{
          gridArea: 'preview',
          position: 'relative',
          background: 'var(--bg-elev-2)',
          minHeight: 460,
          overflow: 'hidden',
          cursor: iframeState === 'live' && !interactMode ? 'pointer' : 'default',
        }}
        onMouseEnter={loadIframe}
      >
        <img
          src={project.poster}
          alt={`${project.title} screenshot`}
          loading="lazy"
          decoding="async"
          width={1280}
          height={720}
          onError={e => {
            e.currentTarget.src = `https://placehold.co/1280x720/11172E/7E72FF?text=${encodeURIComponent(project.title)}`
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: iframeState === 'live' ? 0 : 1,
            transition: 'opacity 400ms ease',
          }}
        />

        {iframeState === 'loading' && (
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, var(--bg-elev-2) 25%, var(--bg-elev-1) 50%, var(--bg-elev-2) 75%)',
            backgroundSize: '200% 100%',
            animation: 'shimmer 1.4s infinite',
            zIndex: 2,
          }} aria-label="Loading preview" />
        )}

        {(iframeState === 'loading' || iframeState === 'live') && !prefersReduced && (
          <iframe
            ref={iframeRef}
            src={project.url}
            title={`Live preview of ${project.title}`}
            loading="lazy"
            referrerPolicy="no-referrer"
            allow="fullscreen"
            onLoad={() => setIframeState('live')}
            onError={() => setIframeState('error')}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              border: 'none',
              opacity: iframeState === 'live' ? 1 : 0,
              transition: 'opacity 400ms ease',
              pointerEvents: 'all',
              zIndex: 3,
            }}
          />
        )}

        {iframeState === 'live' && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(8px)',
            padding: '0.45rem 0.875rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.5rem',
            zIndex: 10,
            fontSize: '0.78rem',
            color: 'rgba(255,255,255,0.85)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#2ecc71', flexShrink: 0,
                boxShadow: '0 0 6px #2ecc71',
              }} aria-hidden="true" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', opacity: 0.7 }}>
                {project.url?.replace(/^https?:\/\//, '')}
              </span>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.72rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.3rem',
                textDecoration: 'none',
              }}
            >
              Open <ExternalIcon />
            </a>
          </div>
        )}

        {iframeState === 'error' && (
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            background: 'var(--bg-elev-2)',
            gap: '0.75rem',
            zIndex: 5,
          }}>
            <span aria-hidden="true" style={{ fontSize: '2rem' }}>🌐</span>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', textAlign: 'center' }}>
              Live preview unavailable
            </p>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ fontSize: '0.8rem', padding: '0.4rem 1rem' }}
            >
              Open site <ExternalIcon />
            </a>
          </div>
        )}

        {/* Mascot + speech bubble, tucked in the corner, narrating the preview state */}
        {project.url && iframeState !== 'error' && (
          <div style={{
            position: 'absolute',
            bottom: '0.9rem',
            left: '0.9rem',
            display: 'flex',
            alignItems: 'flex-end',
            gap: '0.5rem',
            zIndex: 6,
            pointerEvents: 'none',
          }}>
            <Mascot
              mascotRef={mascotRef}
              eyeRef={eyeRef}
              mood={iframeState === 'live' ? 'excited' : iframeState === 'loading' ? 'wink' : 'curious'}
            />
            <div ref={bubbleRef} style={{
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(8px)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.4rem 0.75rem',
              borderRadius: 12,
              borderBottomLeftRadius: 4,
              whiteSpace: 'nowrap',
              maxWidth: 220,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}>
              {messages[messageIdx % messages.length]}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @media (max-width: 768px) {
          #project-${project.id} {
            grid-template-columns: 1fr !important;
            grid-template-areas: 'preview' 'info' !important;
          }
        }
      `}</style>
    </article>
  )
}