import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { EXPERIENCE, CERTIFICATIONS } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Education entries — Inter (Sri Basara) & 10th (Lorvens) added from profile data
const EDUCATION_ENTRIES = [
  ...EXPERIENCE.filter(e => e.type === 'education'),
  {
    id: 'inter',
    type: 'education',
    company: 'Sri Basara Educational Institutions',
    role: 'Intermediate (MPC)',
    board: 'Board Of Intermediate Education',
    period: '2022',
    score: '91%',
    bullets: ['Board of Intermediate Education', 'Percentage: 91%'],
  },
  {
    id: 'tenth',
    type: 'education',
    company: 'Lorvens School',
    role: '10th Grade (SSC)',
    board: 'Board Of Secondary Education',
    period: '2020',
    score: '87%',
    bullets: ['Board of Secondary Education', 'Percentage: 87%'],
  },
]

export default function Education() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const cards = sectionRef.current?.querySelectorAll('.edu-card')
    if (!cards?.length) return
    gsap.from([...cards], {
      opacity: 0,
      y: 34,
      stagger: 0.12,
      duration: 0.65,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
      },
    })
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      id="education"
      ref={sectionRef}
      aria-labelledby="education-heading"
      className="section relative overflow-hidden"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 left-[-4rem] h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ background: 'var(--accent-2)' }}
      />

      <div className="container relative">
        <span className="section-label">Academic</span>
        <h2 id="education-heading" className="mb-12">
          Education &amp; <span className="gradient-text">Certifications</span>
        </h2>

        {/* Education cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {EDUCATION_ENTRIES.map((edu) => (
            <article
              key={edu.id}
              className="edu-card card group relative flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
              style={{
                borderRadius: 18,
                padding: 'clamp(1.25rem, 3vw, 1.75rem)',
                borderTop: '3px solid var(--accent-2)',
              }}
            >
              {/* Score badge */}
              {edu.score && (
                <div
                  className="absolute right-4 top-4 flex h-14 w-14 flex-col items-center justify-center rounded-full border-2"
                  style={{
                    borderColor: 'var(--accent-2)',
                    background: 'color-mix(in srgb, var(--accent-2) 10%, transparent)',
                  }}
                >
                  <span className="text-sm font-bold" style={{ color: 'var(--accent-2)' }}>{edu.score}</span>
                  <span className="text-[0.55rem] uppercase tracking-wide text-[var(--fg-muted)]">Score</span>
                </div>
              )}

              <span
                className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[0.72rem] font-bold uppercase tracking-[0.08em]"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'color-mix(in srgb, var(--accent-2) 12%, transparent)',
                  color: 'var(--accent-2)',
                }}
              >
                🎓 Education
              </span>

              <h3 className="mb-1 text-lg font-bold">{edu.role}</h3>
              <p className="mb-1 text-sm font-semibold" style={{ color: 'var(--accent-2)' }}>
                {edu.company}
              </p>
              {edu.board && <p className="mb-3 text-xs text-[var(--fg-muted)]">{edu.board}</p>}

              <div className="mb-3 flex flex-wrap gap-2">
                <span
                  className="rounded-md border px-2 py-1 text-xs text-[var(--fg-muted)]"
                  style={{ fontFamily: 'var(--font-mono)', borderColor: 'var(--border)', background: 'var(--bg-elev-2)' }}
                >
                  📅 {edu.period}
                </span>
              </div>

              {edu.bullets?.length > 0 && (
                <ul className="mt-auto flex list-none flex-col gap-1.5 p-0">
                  {edu.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm text-[var(--fg-muted)]">
                      <span className="shrink-0" style={{ color: 'var(--accent-2)' }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Certifications */}
        <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.05em] text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
          Certifications
        </h3>
        <div className="flex flex-wrap gap-3">
          {CERTIFICATIONS.map(cert => (
            <div
              key={cert.id}
              className="edu-card card group flex items-center gap-3 rounded-2xl border px-5 py-3.5 transition-all duration-300 hover:-translate-y-1"
              style={{ borderColor: 'var(--border)' }}
            >
              <span aria-hidden="true" className="text-xl transition-transform duration-300 group-hover:scale-125">🏆</span>
              <div>
                <div className="text-sm font-semibold text-[var(--fg-primary)]">{cert.title}</div>
                <div className="text-xs text-[var(--fg-muted)]" style={{ fontFamily: 'var(--font-mono)' }}>
                  {cert.issuer} · {cert.year}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
