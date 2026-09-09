import { useEffect, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { CONTACT, SUMMARY_FULLSTACK, ROLES } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Marquee from '@/components/Marquee'
import CustomCursor from '@/components/CustomCursor'

export default function Hero() {
  const containerRef = useRef(null)
  const meshRef = useRef(null)
  const roleRef = useRef(null)
  const prefersReduced = useReducedMotion()
  const roleIndex = useRef(0)
  const roleTimeout = useRef(null)

  // Gradient mesh parallax
  const onMouseMove = useCallback((e) => {
    if (prefersReduced || !meshRef.current) return
    const { clientX, clientY } = e
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    const dx = ((clientX - cx) / cx) * 18
    const dy = ((clientY - cy) / cy) * 12
    gsap.to(meshRef.current, { x: dx, y: dy, duration: 1.4, ease: 'power2.out' })
  }, [prefersReduced])

  useEffect(() => {
    const hero = containerRef.current
    if (!hero) return
    hero.addEventListener('mousemove', onMouseMove, { passive: true })
    return () => hero.removeEventListener('mousemove', onMouseMove)
  }, [onMouseMove])

  // Typewriter role rotation
  useEffect(() => {
    if (!roleRef.current) return
    if (prefersReduced) {
      roleRef.current.textContent = ROLES[0]
      return
    }
    roleRef.current.textContent = ROLES[0]

    const rotate = () => {
      const el = roleRef.current
      if (!el) return
      gsap.to(el, {
        opacity: 0, y: -12, duration: 0.3, ease: 'power2.in',
        onComplete: () => {
          roleIndex.current = (roleIndex.current + 1) % ROLES.length
          el.textContent = ROLES[roleIndex.current]
          gsap.fromTo(el,
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
          )
        },
      })
    }
    roleTimeout.current = setInterval(rotate, 2600)
    return () => clearInterval(roleTimeout.current)
  }, [prefersReduced])

  // Entrance animations
  useGSAP(() => {
    if (prefersReduced) return

    const tl = gsap.timeline({ delay: 0.1 })

    tl.from('#hero-eyebrow', { opacity: 0, y: 24, duration: 0.6, ease: 'power3.out' })
      .from('#hero-name', {
        opacity: 0, y: 40, duration: 0.8,
        ease: 'power3.out',
      }, '-=0.35')
      .from('#hero-tagline', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.5')
      .from('#hero-role-line', { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' }, '-=0.4')
      .from('#hero-summary', { opacity: 0, y: 18, duration: 0.55, ease: 'power2.out' }, '-=0.35')
      .from('.hero-pill', { opacity: 0, y: 10, scale: 0.85, stagger: 0.06, duration: 0.45, ease: 'back.out(1.5)' }, '-=0.3')
      .from('#hero-ctas > *', { opacity: 0, y: 16, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.2')
      .from('#hero-scroll-cue', { opacity: 0, duration: 0.5 }, '-=0.1')

    // Scroll cue bounce
    gsap.to('#hero-scroll-cue', {
      y: 8, repeat: -1, yoyo: true, duration: 1.4, ease: 'sine.inOut', delay: 1.5,
    })

    // Orbs float
    gsap.to('#hero-orb-1', { y: -18, repeat: -1, yoyo: true, duration: 4.5, ease: 'sine.inOut' })
    gsap.to('#hero-orb-2', { y: 14, repeat: -1, yoyo: true, duration: 3.8, ease: 'sine.inOut', delay: 1.2 })

    // Scroll-based parallax on mesh
    gsap.to(meshRef.current, {
      y: 100,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })
  }, { scope: containerRef, dependencies: [prefersReduced] })

  return (
    <>
      <CustomCursor />
      <section
      id="home"
      ref={containerRef}
      aria-labelledby="hero-name"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'var(--nav-h)',
      }}
    >
      {/* Gradient mesh backdrop */}
      <div
        ref={meshRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '-15%',
          background: 'var(--gradient-hero)',
          zIndex: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      />

      {/* Floating orbs */}
      <div id="hero-orb-1" aria-hidden="true" style={{
        position: 'absolute', top: '12%', right: '8%',
        width: 'clamp(220px, 34vw, 560px)', height: 'clamp(220px, 34vw, 560px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-1) 16%, transparent) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        filter: 'blur(50px)',
      }} />
      <div id="hero-orb-2" aria-hidden="true" style={{
        position: 'absolute', bottom: '15%', left: '3%',
        width: 'clamp(150px, 22vw, 380px)', height: 'clamp(150px, 22vw, 380px)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, color-mix(in srgb, var(--accent-2) 14%, transparent) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        filter: 'blur(50px)',
      }} />

      {/* Dot-grid texture */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle, color-mix(in srgb, var(--fg-primary) 6%, transparent) 1px, transparent 1px)`,
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
      }} />

      {/* Content */}
      <div className="container" style={{ position: 'relative', zIndex: 1, paddingTop: 'clamp(2rem, 6vw, 4rem)', paddingBottom: '5rem' }}>
        {/* Eyebrow */}
        <div id="hero-eyebrow" style={{ marginBottom: '1.25rem' }}>
          <span className="chip" style={{
            fontSize: '0.8rem',
            animation: 'pulse-ring 2.5s infinite',
            padding: '0.35rem 1rem',
          }}>
            <span aria-hidden="true">👋</span> Available for opportunities
          </span>
        </div>

        {/* Name */}
        <h1
          id="hero-name"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 8vw, 7rem)',
            fontWeight: 900,
            letterSpacing: '-0.035em',
            lineHeight: 1.0,
            marginBottom: '0.6rem',
          }}
        >
          Muchu Venkata
          <br />
          <span className="gradient-text" style={{
            background: 'linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 50%, var(--accent-3) 100%)',
            backgroundSize: '200% 200%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            animation: 'gradient-shift 4s ease infinite',
          }}>
            Karthik
          </span>
        </h1>


        {/* Rotating role line */}
        <div
          id="hero-role-line"
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}
        >
          <span style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', fontWeight: 600, color: 'var(--fg-muted)' }}>
            I'm a
          </span>
          <span
            ref={roleRef}
            aria-live="polite"
            aria-atomic="true"
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              fontWeight: 800,
              color: 'var(--accent-1)',
              minWidth: '17ch',
            }}
          >
            {ROLES[0]}
          </span>
        </div>

        {/* Summary */}
        <p
          id="hero-summary"
          style={{
            maxWidth: '58ch',
            fontSize: 'clamp(0.9375rem, 1.3vw, 1.05rem)',
            color: 'var(--fg-muted)',
            lineHeight: 1.75,
            marginBottom: '1.75rem',
          }}
        >
          {SUMMARY_FULLSTACK}
        </p>

        {/* ── Diagonal skill marquee (replaces static pills) ── */}
        <Marquee />

        {/* CTAs */}
        <div id="hero-ctas" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', alignItems: 'center' }}>
          <a
            href="#projects"
            id="hero-projects-btn"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.7rem 1.5rem' }}
          >
            View My Work ↓
          </a>
          <a
            href="/resume-fullstack.pdf"
            id="hero-resume-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Résumé
          </a>
          <a
            href={CONTACT.github}
            id="hero-github-btn"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.03-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>
            GitHub
          </a>
          <a href="#contact" id="hero-contact-btn" className="btn btn-ghost">
            Let's talk →
          </a>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        id="hero-scroll-cue"
        aria-hidden="true"
        style={{
          position: 'absolute', bottom: '2rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.3rem',
          color: 'var(--fg-muted)', zIndex: 1,
        }}
      >
        <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <svg width="16" height="26" viewBox="0 0 16 26" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="12" height="22" rx="6" />
          <circle cx="8" cy="8" r="2" fill="currentColor" stroke="none">
            <animate attributeName="cy" values="8;16;8" dur="1.8s" repeatCount="indefinite" />
          </circle>
        </svg>
      </div>

      {/* Wave divider */}
      <div aria-hidden="true" style={{ position: 'absolute', bottom: -1, left: 0, right: 0, lineHeight: 0, zIndex: 1 }}>
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ width: '100%', height: 'auto', display: 'block' }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,20 1440,30 L1440,60 L0,60 Z" fill="var(--bg-base)" />
        </svg>
      </div>
    </section>
    </>
  )
}
