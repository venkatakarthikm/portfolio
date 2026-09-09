import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { BEYOND } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Beyond() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const chips = sectionRef.current?.querySelectorAll('.beyond-chip')
    if (!chips?.length) return
    gsap.from([...chips], {
      opacity: 0,
      y: 30,
      stagger: 0.05,
      duration: 0.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
      },
    })
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      id="beyond"
      ref={sectionRef}
      aria-labelledby="beyond-heading"
      className="section"
    >
      <div className="container">
        <span className="section-label">Beyond Web Apps</span>
        <h2 id="beyond-heading" className="section-heading" style={{ marginBottom: '0.5rem' }}>
          Also in My Arsenal
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '2.5rem', maxWidth: '48ch' }}>
          Tools, platforms, and skills outside the typical web stack.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
          {BEYOND.map((item) => (
            <div
              key={item.id}
              id={`beyond-${item.id}`}
              className="beyond-chip card"
              title={item.desc}
              aria-label={`${item.label}: ${item.desc}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 1.25rem',
                borderRadius: 14,
                cursor: 'default',
                transition: 'transform 200ms, box-shadow 200ms, border-color 200ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
                e.currentTarget.style.borderColor = 'var(--accent-1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                e.currentTarget.style.borderColor = 'var(--border)'
              }}
            >
              <span style={{ fontSize: '1.5rem' }} aria-hidden="true">{item.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--fg-primary)' }}>{item.label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--fg-muted)' }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
