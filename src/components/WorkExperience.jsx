import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { EXPERIENCE } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function WorkExperience() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const cards = sectionRef.current?.querySelectorAll('.exp-card')
    if (!cards?.length) return
    gsap.from([...cards], {
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  const work = EXPERIENCE.filter(e => e.type === 'work')

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="section"
      style={{ background: 'var(--bg-elev-1)' }}
    >
      <div className="container">
        <span className="section-label">Career</span>
        <h2 id="experience-heading" style={{ marginBottom: '3rem' }}>
          Work <span className="gradient-text">Experience</span>
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {work.map((item, i) => (
            <article
              key={item.id}
              className="exp-card card"
              style={{
                borderLeft: '3px solid var(--accent-1)',
                borderRadius: 18,
                padding: 'clamp(1.25rem, 3vw, 2rem)',
              }}
            >
              {/* Header row */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginBottom: '1rem',
                alignItems: 'flex-start',
              }}>
                <div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.2rem 0.75rem',
                    borderRadius: 99,
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    background: 'color-mix(in srgb, var(--accent-1) 12%, transparent)',
                    color: 'var(--accent-1)',
                    marginBottom: '0.6rem',
                  }}>
                    💼 Work
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                    {item.role}
                  </h3>
                  <p style={{ color: 'var(--accent-1)', fontWeight: 600, fontSize: '1rem' }}>
                    {item.company}
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{
                    fontSize: '0.8rem',
                    color: 'var(--fg-muted)',
                    fontFamily: 'var(--font-mono)',
                    background: 'var(--bg-elev-2)',
                    padding: '0.35rem 0.75rem',
                    borderRadius: 8,
                    border: '1px solid var(--border)',
                    marginBottom: '0.25rem',
                  }}>
                    {item.period}
                  </div>
                  {item.location && (
                    <div style={{ fontSize: '0.78rem', color: 'var(--fg-muted)' }}>
                      📍 {item.location}
                    </div>
                  )}
                </div>
              </div>

              {/* Bullets */}
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {item.bullets.map((b, bi) => (
                  <li key={bi} style={{
                    fontSize: '0.9375rem',
                    color: 'var(--fg-muted)',
                    display: 'flex',
                    gap: '0.6rem',
                    lineHeight: 1.6,
                  }}>
                    <span style={{ color: 'var(--accent-2)', flexShrink: 0, marginTop: '0.1em', fontWeight: 700 }}>▸</span>
                    {b}
                  </li>
                ))}
              </ul>
            </article>
          ))}

          {/* Placeholder for future roles */}
          <div style={{
            padding: '1.5rem',
            borderRadius: 18,
            border: '1.5px dashed var(--border)',
            textAlign: 'center',
            color: 'var(--fg-muted)',
            fontSize: '0.9rem',
          }}>
            <span aria-hidden="true" style={{ fontSize: '1.5rem', display: 'block', marginBottom: '0.5rem' }}>✨</span>
            <strong>More roles coming soon</strong>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem' }}>
              Currently exploring full-time opportunities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
