import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { CONTACT } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function LinkedInIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.38.6.11.82-.26.82-.58 0-.28-.01-1.03-.02-2.03-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58C20.56 21.79 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

export default function Contact() {
  const sectionRef = useRef(null)
  const cardRef = useRef(null)
  const prefersReduced = useReducedMotion()

  // Pulsing stroke animation on enter
  useGSAP(() => {
    if (prefersReduced || !cardRef.current) return
    const ring = cardRef.current.querySelector('.contact-ring')
    if (!ring) return

    gsap.fromTo(ring,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    )

    // Pulse effect
    gsap.to(ring, {
      boxShadow: '0 0 0 16px color-mix(in srgb, var(--accent-1) 0%, transparent)',
      repeat: -1,
      yoyo: false,
      duration: 2,
      ease: 'power2.out',
    })
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  const mailtoHref = `mailto:${CONTACT.email}?subject=Hello%20from%20your%20portfolio`

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="section"
      style={{ background: 'var(--bg-elev-1)' }}
    >
      <div className="container" style={{ maxWidth: '640px' }}>
        <span className="section-label">Get In Touch</span>
        <h2 id="contact-heading" className="section-heading" style={{ marginBottom: '1rem' }}>
          Let's Build Something
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '2.5rem', fontSize: '1.0625rem', lineHeight: 1.7 }}>
          I'm actively looking for backend and full-stack roles. Whether you have a role in mind, a project idea, or just want to say hello - my inbox is open.
        </p>

        {/* CTA Card */}
        <div
          ref={cardRef}
          className="contact-ring"
          style={{
            background: 'var(--bg-base)',
            border: '1.5px solid var(--accent-1)',
            borderRadius: 24,
            padding: 'clamp(1.5rem, 4vw, 2.5rem)',
            textAlign: 'center',
            boxShadow: '0 0 0 0 color-mix(in srgb, var(--accent-1) 20%, transparent)',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            border: '2px solid color-mix(in srgb, var(--accent-1) 30%, transparent)',
          }}>
            <MailIcon />
          </div>

          <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>Hire Me</h3>
          <p style={{ color: 'var(--fg-muted)', fontSize: '0.9375rem', marginBottom: '1.5rem' }}>
            {CONTACT.email}
          </p>

          <a
            href={mailtoHref}
            id="contact-email-btn"
            className="btn btn-primary"
            style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}
          >
            <MailIcon />
            Send a Message
          </a>
        </div>

        {/* Social row */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <a
            href={CONTACT.linkedin}
            id="contact-linkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="LinkedIn profile"
          >
            <LinkedInIcon /> LinkedIn
          </a>
          <a
            href={CONTACT.github}
            id="contact-github"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            aria-label="GitHub profile"
          >
            <GitHubIcon /> GitHub
          </a>
          <a
            href={CONTACT.portfolio}
            id="contact-portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
          >
            🌐 Portfolio
          </a>
        </div>

        {/* Résumé downloads */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <a href="/resume-backend.pdf" id="contact-resume-backend" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
            ↓ Backend Résumé
          </a>
          <a href="/resume-fullstack.pdf" id="contact-resume-fullstack" target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ fontSize: '0.875rem' }}>
            ↓ Full-Stack Résumé
          </a>
        </div>
      </div>
    </section>
  )
}
