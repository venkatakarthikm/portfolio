import { useRef, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap, ScrollTrigger } from '@/motion/gsapConfig'
import { EXPERIENCE, CERTIFICATIONS } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const TIMELINE_ITEMS = [
  {
    type: 'work',
    year: '2026',
    period: 'Feb – Jul 2026',
    title: 'Full-Stack Web Development Intern',
    org: 'Webileapps',
    location: 'Vijayawada, India',
    color: 'var(--accent-1)',
    bullets: EXPERIENCE[0].bullets,
  },
  {
    type: 'education',
    year: '2022 – 2026',
    period: '2022 – 2026',
    title: 'B.Tech Computer Science & Engineering',
    org: 'K L University (KLEF)',
    location: 'Guntur, Andhra Pradesh',
    color: 'var(--accent-2)',
    bullets: ['CGPA: 9.2 / 10.0', 'Coursework: DBMS · DSA · OS · Computer Networks'],
  },
  {
    type: 'cert',
    year: '2024',
    period: '2024',
    title: 'Wipro TalentNext Certified Java Developer',
    org: 'Wipro',
    location: '',
    color: 'var(--accent-3)',
    bullets: [],
  },
  {
    type: 'cert',
    year: '2024',
    period: '2024',
    title: 'Automation Anywhere Essentials RPA Professional',
    org: 'Automation Anywhere',
    location: '',
    color: 'var(--accent-3)',
    bullets: [],
  },
]

export default function ExperienceTimeline() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    const mm = gsap.matchMedia()

    mm.add('(min-width: 768px)', () => {
      if (prefersReduced) return
      const track = trackRef.current
      if (!track) return

      const cards = track.querySelectorAll('.timeline-card')
      const totalWidth = track.scrollWidth - track.offsetWidth

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${sectionRef.current.offsetHeight * 0.8}`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (TIMELINE_ITEMS.length - 1),
            duration: { min: 0.3, max: 0.6 },
            ease: 'power2.out',
          },
        },
      })

      tl.to(track, {
        x: -totalWidth,
        ease: 'none',
      })

      // Year numerals scale animation
      cards.forEach(card => {
        const year = card.querySelector('.timeline-year')
        if (!year) return
        gsap.to(year, {
          scale: 1.4,
          scrollTrigger: {
            trigger: card,
            containerAnimation: tl,
            start: 'left center',
            end: 'right center',
            scrub: true,
          },
        })
      })
    })

    mm.add('(max-width: 767px)', () => {
      // Mobile: simple stagger reveal on vertical list
      const cards = sectionRef.current?.querySelectorAll('.timeline-card')
      if (!cards?.length || prefersReduced) return
      gsap.from([...cards], {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    })

    return () => mm.revert()
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-labelledby="experience-heading"
      className="section"
      style={{
        background: 'var(--bg-elev-1)',
        overflow: 'hidden',
      }}
    >
      <div className="container" style={{ overflowX: 'hidden' }}>
        <span className="section-label">Journey</span>
        <h2 id="experience-heading" className="section-heading" style={{ marginBottom: '3rem' }}>
          Experience & Education
        </h2>

        {/* Desktop: horizontal scrolling track */}
        <div
          className="desktop-timeline"
          style={{ position: 'relative' }}
        >
          <div
            ref={trackRef}
            style={{
              display: 'flex',
              gap: '2rem',
              width: 'max-content',
              alignItems: 'flex-start',
              paddingBottom: '1rem',
            }}
          >
            {TIMELINE_ITEMS.map((item, i) => (
              <article
                key={i}
                className="timeline-card card"
                style={{
                  width: 'clamp(280px, 32vw, 400px)',
                  flexShrink: 0,
                  borderLeft: `3px solid ${item.color}`,
                  borderRadius: 16,
                  position: 'relative',
                }}
              >
                {/* Year numeral */}
                <div
                  className="timeline-year"
                  aria-hidden="true"
                  style={{
                    fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                    fontWeight: 900,
                    letterSpacing: '-0.05em',
                    color: item.color,
                    opacity: 0.15,
                    lineHeight: 1,
                    marginBottom: '0.5rem',
                    fontFamily: 'var(--font-display)',
                    transformOrigin: 'left center',
                  }}
                >
                  {item.year}
                </div>

                {/* Type badge */}
                <span style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.625rem',
                  borderRadius: 99,
                  fontSize: '0.7rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  background: `color-mix(in srgb, ${item.color} 15%, transparent)`,
                  color: item.color,
                  marginBottom: '0.75rem',
                }}>
                  {item.type === 'work' ? '💼 Work' : item.type === 'education' ? '🎓 Education' : '🏆 Certification'}
                </span>

                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.25rem' }}>
                  {item.title}
                </h3>
                <p style={{ color: item.color, fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.15rem' }}>
                  {item.org}
                </p>
                <p style={{ color: 'var(--fg-muted)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '1rem' }}>
                  {item.period}{item.location ? ` · ${item.location}` : ''}
                </p>

                {item.bullets.length > 0 && (
                  <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                    {item.bullets.map((b, bi) => (
                      <li key={bi} style={{ fontSize: '0.85rem', color: 'var(--fg-muted)', display: 'flex', gap: '0.5rem' }}>
                        <span style={{ color: item.color, flexShrink: 0 }}>▸</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {/* Scroll hint */}
          <p className="desktop-only" aria-hidden="true" style={{
            fontSize: '0.75rem',
            color: 'var(--fg-muted)',
            fontFamily: 'var(--font-mono)',
            marginTop: '1.5rem',
            textAlign: 'center',
            letterSpacing: '0.08em',
          }}>
            ← scroll to explore →
          </p>
        </div>
      </div>

      <style>{`
        @media (min-width: 769px) { .desktop-only { display: block; } }
        @media (max-width: 768px) {
          .desktop-only { display: none !important; }
          .desktop-timeline > div {
            flex-direction: column !important;
            width: 100% !important;
          }
          .timeline-card { width: 100% !important; }
        }
      `}</style>
    </section>
  )
}
