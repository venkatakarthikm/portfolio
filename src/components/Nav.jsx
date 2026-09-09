import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useTheme } from '@/hooks/useTheme'
import { CONTACT } from '@/data/profile'

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#projects', label: 'Projects' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#experience', label: 'Experience' },
  { href: '#contact', label: 'Contact' },
]

function GitHubIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.03-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

export default function Nav({ revealed = false }) {
  const { resolvedTheme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const logoRef = useRef(null)
  const capsuleWrapRef = useRef(null)
  const shimmerRef = useRef(null)
  const hasAnimatedRef = useRef(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map(l => document.querySelector(l.href)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    )
    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!revealed || hasAnimatedRef.current) return
    hasAnimatedRef.current = true

    const logo = logoRef.current
    const wrap = capsuleWrapRef.current
    const shimmer = shimmerRef.current
    if (!logo || !wrap) return

    // Immediately present logo underneath proxy
    gsap.set(logo, { opacity: 1, scale: 1 })
    gsap.set('.nav-link, #nav-github, #nav-resume, #theme-toggle, #nav-hamburger', {
      opacity: 0,
      x: -12,
    })

    const tl = gsap.timeline()

    // Smooth, deliberate horizontal expansion (1.8s)[cite: 1]
    tl.fromTo(wrap,
      { flexGrow: 0, opacity: 0 },
      { flexGrow: 1, opacity: 1, duration: 1.8, ease: 'power2.out' }
    )

    if (shimmer) {
      tl.fromTo(shimmer,
        { xPercent: -100 },
        { xPercent: 200, duration: 1.8, ease: 'power2.inOut' },
        '<0.1'
      )
    }

    // Links reveal gracefully as the boundary rolls open
    tl.to('.nav-link', {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    }, 0.35)

    tl.to(['#nav-github', '#nav-resume', '#theme-toggle', '#nav-hamburger'], {
      opacity: 1,
      x: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    }, 0.75)
  }, [revealed])

  return (
    <header
      id="nav"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        height: 'var(--nav-h, 70px)',
        display: 'flex',
        alignItems: 'center',
        background: scrolled
          ? 'color-mix(in srgb, var(--bg-elev-1) 85%, transparent)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background 400ms ease, border-color 400ms ease, backdrop-filter 400ms ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', height: '100%', gap: '2rem' }}>
        {/* Real Logo in Fixed Navbar Position */}
        <a
          ref={logoRef}
          href="#home"
          id="nav-logo"
          style={{
            fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
            fontWeight: 900,
            fontSize: '1.25rem',
            letterSpacing: '-0.05em',
            lineHeight: 1,
            flexShrink: 0,
            background: 'linear-gradient(135deg, var(--accent-1) 0%, var(--accent-2) 60%, var(--accent-3) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            opacity: 0,
          }}
          aria-label="Venkata Karthik - Home"
        >
          MVK
        </a>

        {/* Smooth Horizontal Capsule Wrapper */}
        <div
          ref={capsuleWrapRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            overflow: 'hidden',
            position: 'relative',
            minWidth: 0,
            flexBasis: '0%',
            flexShrink: 1,
            flexGrow: 0,
            opacity: 0,
          }}
        >
          <nav
            aria-label="Main navigation"
            className="desktop-nav"
            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', flex: 1 }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                id={`nav-link-${label.toLowerCase()}`}
                className="nav-link"
                aria-current={activeSection === href.slice(1) ? 'true' : undefined}
                style={{
                  padding: '0.4rem 0.875rem',
                  borderRadius: '9999px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: activeSection === href.slice(1) ? 'var(--accent-1)' : 'var(--fg-muted)',
                  background: activeSection === href.slice(1)
                    ? 'color-mix(in srgb, var(--accent-1) 10%, transparent)'
                    : 'transparent',
                  transition: 'color 200ms, background 200ms',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-1)' }}
                onMouseLeave={e => {
                  e.currentTarget.style.color =
                    activeSection === href.slice(1) ? 'var(--accent-1)' : 'var(--fg-muted)'
                }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto', flexShrink: 0 }}>
            <a
              href={CONTACT.github}
              id="nav-github"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="desktop-only"
              style={{ color: 'var(--fg-muted)', display: 'flex', alignItems: 'center', transition: 'color 200ms' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--fg-primary)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
            >
              <GitHubIcon />
            </a>

            <a
              href="/resume-fullstack.pdf"
              id="nav-resume"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary desktop-only"
              style={{ padding: '0.45rem 1rem', fontSize: '0.85rem' }}
            >
              Résumé
            </a>

            <button
              id="theme-toggle"
              onClick={toggleTheme}
              aria-label={resolvedTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '9999px',
                border: '1.5px solid var(--border)',
                background: 'var(--bg-elev-2)',
                color: 'var(--fg-primary)',
                cursor: 'pointer',
                transition: 'background 200ms, border-color 200ms, transform 200ms',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
            >
              {resolvedTheme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>

            <button
              id="nav-hamburger"
              className="mobile-only"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen(o => !o)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 5,
                width: 36,
                height: 36,
                alignItems: 'center',
                justifyContent: 'center',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                color: 'var(--fg-primary)',
                padding: '0.25rem',
              }}
            >
              <span style={{
                display: 'block', width: 22, height: 2,
                background: 'currentColor', borderRadius: 2,
                transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
                transition: 'transform 250ms ease',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: 'currentColor', borderRadius: 2,
                opacity: menuOpen ? 0 : 1,
                transition: 'opacity 200ms ease',
              }} />
              <span style={{
                display: 'block', width: 22, height: 2,
                background: 'currentColor', borderRadius: 2,
                transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
                transition: 'transform 250ms ease',
              }} />
            </button>
          </div>

          <div
            ref={shimmerRef}
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(100deg, transparent 30%, color-mix(in srgb, var(--fg-primary) 10%, transparent) 50%, transparent 70%)',
              transform: 'translateX(-100%)',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-menu"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--bg-elev-1)',
            borderBottom: '1px solid var(--border)',
            padding: '1.25rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              id={`mobile-nav-${label.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: 10,
                fontSize: '1rem',
                fontWeight: 500,
                color: activeSection === href.slice(1) ? 'var(--accent-1)' : 'var(--fg-primary)',
                background: activeSection === href.slice(1)
                  ? 'color-mix(in srgb, var(--accent-1) 8%, transparent)'
                  : 'transparent',
                transition: 'color 200ms, background 200ms',
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem' }}>
            <a
              href={CONTACT.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              GitHub
            </a>
            <a
              href="/resume-backend.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
            >
              Résumé
            </a>
          </div>
        </div>
      )}

      <style>{`
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav, .desktop-only { display: none !important; } }
      `}</style>
    </header>
  )
}