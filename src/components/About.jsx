import { useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/* ------------------------------------------------------------------ */
/*  Accents                                                             */
/* ------------------------------------------------------------------ */

const CYAN = '#4fd1e8'
const MINT = '#3fd9a4'
const AMBER = '#dca15e'
const BLUE = '#5b9dfd'
const GREEN = '#34d399'

/* ------------------------------------------------------------------ */
/*  Inline SVG icons (no icon package dependency)                      */
/* ------------------------------------------------------------------ */

const ip = { fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' }

const CodeIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}><path d="m8 6-6 6 6 6" /><path d="m16 6 6 6-6 6" /></svg>
)
const BracesIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M8 3a2 2 0 0 0-2 2v3a2 2 0 0 1-2 2 2 2 0 0 1 2 2v3a2 2 0 0 0 2 2" />
    <path d="M16 3a2 2 0 0 1 2 2v3a2 2 0 0 0 2 2 2 2 0 0 0-2 2v3a2 2 0 0 1-2 2" />
  </svg>
)
const HubIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <circle cx="12" cy="12" r="2.4" />
    <circle cx="5" cy="5" r="1.8" /><circle cx="19" cy="5" r="1.8" />
    <circle cx="5" cy="19" r="1.8" /><circle cx="19" cy="19" r="1.8" />
    <path d="M9.7 10.3 6.3 6.9M14.3 10.3l3.4-3.4M9.7 13.7l-3.4 3.4M14.3 13.7l3.4 3.4" />
  </svg>
)
const RocketIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </svg>
)
const SearchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
)
const LayersIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
    <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
    <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
  </svg>
)
const GitBranchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <line x1="6" y1="3" x2="6" y2="15" /><circle cx="18" cy="6" r="3" /><circle cx="6" cy="18" r="3" />
    <path d="M18 9a9 9 0 0 1-9 9" />
  </svg>
)
const RepeatIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="m17 2 4 4-4 4" /><path d="M3 11v-1a4 4 0 0 1 4-4h14" />
    <path d="m7 22-4-4 4-4" /><path d="M21 13v1a4 4 0 0 1-4 4H3" />
  </svg>
)
const ShieldCheckIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
)
const GraduationCapIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M22 10 12 5 2 10l10 5 10-5Z" /><path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
  </svg>
)
const CpuIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" /><rect x="9" y="9" width="6" height="6" />
    <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
  </svg>
)
const DatabaseIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <ellipse cx="12" cy="5" rx="8" ry="3" />
    <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
    <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
  </svg>
)
const WrenchIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M14.7 6.3a4 4 0 0 0-5.6 5.2L3 17.6V21h3.4l6.1-6.1a4 4 0 0 0 5.2-5.6l-2.8 2.8-2-2z" />
  </svg>
)
const SparklesIcon = (p) => (
  <svg viewBox="0 0 24 24" {...ip} {...p}>
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
    <circle cx="12" cy="12" r="2.5" />
  </svg>
)

/* ------------------------------------------------------------------ */
/*  Content                                                             */
/* ------------------------------------------------------------------ */

const JOURNEY = [
  {
    step: '01', date: 'Late 2023', icon: CodeIcon, accent: CYAN,
    title: 'Web foundations', sub: 'HTML, CSS & JavaScript',
    body: "Built small projects to understand how the web works and fell in love with the browser's instant feedback loop.",
  },
  {
    step: '02', date: '2024 — 2025', icon: BracesIcon, accent: MINT,
    title: 'Full-stack MERN', sub: 'Products with real users',
    body: 'Built Fourzdeals, ChatVK and TrackWicket while learning async systems, REST design, authentication and databases.',
  },
  {
    step: '03', date: 'Feb — Jul 2026', icon: HubIcon, accent: AMBER,
    title: 'Fintech at Webileapps', sub: 'Production microservices',
    body: 'Engineered TypeScript microservices for three internal platforms with PostgreSQL, Redis, structured logging and strict JWT validation.',
  },
  {
    step: '04', date: '2026 →', icon: RocketIcon, accent: BLUE,
    title: 'Independent platforms', sub: 'stackinfi & Coolie',
    body: 'Designed a multi-tool platform with Cloudflare DNS routing, 40+ REST endpoints, Redis queues and AI-assisted diagnosis.',
  },
]

const SIGNALS = [
  { value: '23+', label: 'Projects', sub: 'production deployed' },
  { value: '55+', label: 'Repositories', sub: 'published on GitHub' },
  { value: '15+', label: 'Integrations', sub: 'third-party APIs' },
]

const CREDENTIALS = [
  { icon: GraduationCapIcon, title: 'Wipro TalentNext', sub: 'Java Developer Certified', accent: AMBER },
  { icon: CpuIcon, title: 'Automation Anywhere', sub: 'RPA Professional Certified', accent: MINT },
]

const METHOD_STEPS = [
  {
    step: '01', title: 'Understand', icon: SearchIcon, accent: CYAN,
    body: 'Frame the real problem, its users, success criteria and constraints before touching code.',
    tags: 'INTERVIEWS · SCOPE · CONSTRAINTS',
  },
  {
    step: '02', title: 'Decompose', icon: HubIcon, accent: MINT,
    body: 'Map data, state, APIs and independent parts so the system has clear boundaries.',
    tags: 'ENTITIES · CONTRACTS · BOUNDARIES',
  },
  {
    step: '03', title: 'Architect', icon: GitBranchIcon, accent: AMBER,
    body: 'Choose proven tools from the requirements — not trends — and document the trade-offs.',
    tags: 'TRADE-OFFS · CAP · BUILD / BUY',
  },
  {
    step: '04', title: 'Iterate', icon: LayersIcon, accent: BLUE,
    body: 'Ship a vertical slice, gather feedback early, then layer in capability and edge cases.',
    tags: 'MVP · FLAGS · ENHANCEMENT',
  },
  {
    step: '05', title: 'Harden', icon: ShieldCheckIcon, accent: GREEN,
    body: 'Measure first, then add caching, validation, logging, rate limits and query tuning.',
    tags: 'REDIS · LOGS · LOAD TESTS',
  },
]

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Eyebrow({ index, children, color = CYAN }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.6rem',
      fontFamily: "'JetBrains Mono', ui-monospace, monospace", fontSize: '0.78rem',
      letterSpacing: '0.14em', color: '#8b95ab',
    }}>
      <span style={{ color }}>{index}</span>
      <span style={{ opacity: 0.4 }}>·</span>
      <span>{children}</span>
    </div>
  )
}

function IconBadge({ Icon, color, size = 48 }) {
  return (
    <span style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      height: size, width: size, borderRadius: '50%',
      border: `1px solid ${color}77`, background: '#0d1420',
      color, flexShrink: 0, position: 'relative', zIndex: 1,
    }}>
      <Icon width={size * 0.42} height={size * 0.42} stroke="currentColor" strokeWidth={1.6} />
    </span>
  )
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export default function About() {
  const root = useRef(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(
      { reduced: '(prefers-reduced-motion: reduce)', full: '(prefers-reduced-motion: no-preference)' },
      (ctx) => {
        if (ctx.conditions.reduced) {
          gsap.set('[data-reveal]', { opacity: 1, y: 0 })
          return
        }
        gsap.utils.toArray('[data-reveal-group]').forEach((group) => {
          const items = group.querySelectorAll('[data-reveal]')
          gsap.fromTo(items, { opacity: 0, y: 16 }, {
            opacity: 1, y: 0, duration: 0.65, ease: 'power3.out', stagger: 0.07,
            scrollTrigger: { trigger: group, start: 'top 85%', once: true },
          })
        })
        root.current.querySelectorAll('[data-line]').forEach((line) => {
          gsap.fromTo(line, { scaleX: 0 }, {
            scaleX: 1, transformOrigin: 'left center', duration: 1, ease: 'power2.inOut',
            scrollTrigger: { trigger: line, start: 'top 85%', once: true },
          })
        })
      }
    )
    return () => mm.revert()
  }, { scope: root })

  return (
    <section id="about" aria-labelledby="about-heading" className="section" ref={root}>
      <div className="about-container">
        <div className="frame">

          {/* ============================================================ */}
          {/* Identity bento                                                */}
          {/* ============================================================ */}
          <div className="identity-card" data-reveal-group>
            {/* Story column */}
            <div className="story-col" data-reveal>
              <Eyebrow index="01">MY STORY</Eyebrow>
              <h1 id="about-heading" className="story-heading">
                Muchu Venkata Karthik - Full-Stack Developer & System Builder
              </h1>
              <img 
                src="/muchu-venkata-karthik.jpeg" 
                alt="Muchu Venkata Karthik - Full-Stack Developer" 
                style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '1px solid #ffffff17' }}
              />
              <p className="story-p">
                Full-Stack Developer and System Builder specializing in scalable web systems and modern APIs. I build full-stack web applications — from the database schema to the interface someone actually clicks on.
              </p>
              <p className="story-p">
                I started teaching myself to code in late 2023, and by early 2026 I was interning at Webileapps, working on production fintech microservices in TypeScript. That internship taught me the parts side projects don't: structured logging, real deployment pipelines, and building things other people actually depend on.
              </p>
              <p className="story-p">
                Beyond React and Node, I enjoy the plumbing others often
                neglect — DNS routing, API proxying, SDK integrations and
                scripting away repetitive work. Today I'm building stackinfi,
                a focused toolkit for developers.
              </p>
              <div className="edu-tag">
                B.TECH · COMPUTER SCIENCE&nbsp;&nbsp;&nbsp;&nbsp;KL UNIVERSITY
              </div>
            </div>

            {/* Right side */}
            <div className="right-col">
              {/* Journey row */}
              <div className="journey-row" data-reveal>
                <div className="row-header">
                  <Eyebrow index="02">THE FOUR-STAGE JOURNEY</Eyebrow>
                  <span className="loop-badge">
                    <RepeatIcon width={15} height={15} stroke="currentColor" strokeWidth={1.7} />
                  </span>
                </div>

                <div className="journey-track">
                  <div className="track-line" data-line />
                  {JOURNEY.map((j) => (
                    <div key={j.step} className="journey-node">
                      <IconBadge Icon={j.icon} color={j.accent} size={46} />
                      <p className="node-date">{j.step} / {j.date}</p>
                      <h3 className="node-title" style={{ color: j.accent }}>{j.title}</h3>
                      <p className="node-sub">{j.sub}</p>
                      <p className="node-body">{j.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Signals + Credentials */}
              <div className="stats-row">
                <div className="signals-col" data-reveal>
                  <Eyebrow index="03">ACHIEVEMENT SIGNALS</Eyebrow>
                  <div className="signals-grid">
                    {SIGNALS.map((s, i) => (
                      <div key={s.label} className="signal" style={{ borderLeft: i === 0 ? 'none' : '1px solid #ffffff17' }}>
                        <p className="signal-value">{s.value}</p>
                        <p className="signal-label">{s.label}</p>
                        <p className="signal-sub">{s.sub}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="credentials-col" data-reveal>
                  <Eyebrow index="04">CREDENTIALS</Eyebrow>
                  <div className="cred-list">
                    {CREDENTIALS.map((c) => {
                      const Icon = c.icon
                      return (
                        <div key={c.title} className="cred-item">
                          <span className="cred-icon" style={{ color: c.accent, background: `${c.accent}1a` }}>
                            <Icon width={19} height={19} stroke="currentColor" strokeWidth={1.6} />
                          </span>
                          <div>
                            <p className="cred-title">{c.title}</p>
                            <p className="cred-sub">{c.sub}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Process & methodology                                        */}
          {/* ============================================================ */}
          <div className="process-card" data-reveal-group>
            <div className="process-header" data-reveal>
              <div>
                <Eyebrow index="05">PROCESS & METHODOLOGY</Eyebrow>
                <h2 className="process-heading">How I approach problems</h2>
              </div>
              <span className="loop-label">A CLOSED LOOP, NOT A LINE</span>
            </div>

            <div className="method-track">
              <div className="track-line" data-line />
              {METHOD_STEPS.map((m) => {
                const Icon = m.icon
                return (
                  <div key={m.step} className="method-node" data-reveal>
                    <IconBadge Icon={Icon} color={m.accent} size={50} />
                    <p className="method-step" style={{ color: m.accent }}>STEP {m.step}</p>
                    <h3 className="method-title">{m.title}</h3>
                    <p className="method-body">{m.body}</p>
                    <p className="method-tags">{m.tags}</p>
                  </div>
                )
              })}
            </div>

            <div className="loop-banner" data-reveal>
              <RepeatIcon width={15} height={15} stroke={GREEN} strokeWidth={1.8} />
              <span>MEASURE &nbsp;→&nbsp; LEARN &nbsp;→&nbsp; RETURN TO THE PROBLEM WITH BETTER INFORMATION</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* Quote                                                        */}
          {/* ============================================================ */}
          <div className="quote-card" data-reveal-group>
            <div data-reveal>
              <Eyebrow index="06">WORKING PRINCIPLE</Eyebrow>
              <blockquote className="quote-text">
                "I build systems that are easy to debug at 2 AM, easy to
                extend in six months, and easy for the next developer to
                understand."
              </blockquote>
              <div className="quote-footer">
                <span className="quote-attr">— Venkata Karthik, Full-Stack Developer</span>
                <div className="quote-icons">
                  {[DatabaseIcon, WrenchIcon, ShieldCheckIcon, SparklesIcon].map((Icon, i) => (
                    <span key={i} className="quote-icon"><Icon width={16} height={16} stroke="currentColor" strokeWidth={1.6} /></span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .about-container {
          width: 100%;
          max-width: 1400px !important;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .frame {
          position: relative;
          background: #060a12;
          border-radius: 6px;
          padding: 0.5rem 0 1rem;
        }

        .identity-card, .process-card, .quote-card {
          border: 1px solid #ffffff17;
          border-radius: 14px;
          background: #0b0f1a;
          margin-bottom: 1.75rem;
          overflow: hidden;
        }
        .quote-card { margin-bottom: 0; }

        .identity-card { display: grid; grid-template-columns: 1fr; }
        .story-col { padding: 3rem 2.75rem; }
        .right-col { border-top: 1px solid #ffffff17; }

        .story-heading {
          font-family: 'Georgia', 'Fraunces', serif; font-weight: 500;
          font-size: clamp(2.2rem, 4.4vw, 3.1rem); line-height: 1.15;
          margin: 1.4rem 0 1.5rem; color: #f2f4f8;
        }
        .story-p {
          color: #a7b0c2; font-size: 1.02rem; line-height: 1.75; max-width: 48ch;
          margin: 0 0 1.15rem;
        }
        .edu-tag {
          margin-top: 1.75rem; font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem;
          letter-spacing: 0.08em; color: #8b95ab; padding-top: 1.25rem;
          border-top: 1px dashed #ffffff17;
        }

        .journey-row { padding: 2.25rem 2.5rem; border-bottom: 1px solid #ffffff17; }
        .row-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 2.25rem; }
        .loop-badge {
          display: flex; align-items: center; justify-content: center;
          height: 32px; width: 32px; border-radius: 50%; border: 1px solid ${CYAN}55; color: ${CYAN};
        }

        .journey-track { position: relative; display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.75rem; }
        .method-track { position: relative; display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.5rem; margin-top: 2.5rem; }
        .track-line {
          position: absolute; left: 23px; right: 23px; top: 23px; height: 1px;
          background-image: linear-gradient(to right, #ffffff2a 50%, transparent 0%);
          background-size: 8px 1px; background-repeat: repeat-x; z-index: 0;
        }
        .journey-node, .method-node { position: relative; z-index: 1; }
        .node-date, .method-step {
          font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem; letter-spacing: 0.06em;
          color: #8b95ab; margin: 0.9rem 0 0.4rem;
        }
        .node-title {
          font-family: 'Georgia', 'Fraunces', serif; font-size: 1.2rem; font-weight: 500; margin: 0 0 0.3rem;
        }
        .node-sub { font-size: 0.86rem; font-weight: 600; color: #f2f4f8; margin: 0 0 0.6rem; }
        .node-body { font-size: 0.86rem; line-height: 1.6; color: #8b95ab; margin: 0; }

        .stats-row { display: grid; grid-template-columns: 1fr; }
        .signals-col { padding: 2rem 2.5rem; border-bottom: 1px solid #ffffff17; }
        .credentials-col { padding: 2rem 2.5rem; }

        .signals-grid { display: grid; grid-template-columns: repeat(3, 1fr); margin-top: 1.5rem; }
        .signal { padding: 0 1.25rem; }
        .signal:first-child { padding-left: 0; }
        .signal-value { font-family: 'Georgia', 'Fraunces', serif; font-size: 2rem; margin: 0; color: #f2f4f8; }
        .signal-label { font-size: 0.92rem; color: #f2f4f8; margin: 0.3rem 0 0; }
        .signal-sub { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.7rem; color: #8b95ab; margin: 0.2rem 0 0; }

        .cred-list { margin-top: 1.5rem; display: flex; flex-direction: column; gap: 0.9rem; }
        .cred-item { display: flex; align-items: center; gap: 0.9rem; border: 1px solid #ffffff17; border-radius: 12px; padding: 0.9rem 1.1rem; background: #0d1220; }
        .cred-icon {
          height: 38px; width: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;
          border-radius: 9px;
        }
        .cred-title { font-size: 0.95rem; color: #f2f4f8; margin: 0; font-weight: 600; }
        .cred-sub { font-size: 0.8rem; color: #8b95ab; margin: 0.15rem 0 0; }

        .process-card { padding: 2.5rem 2.75rem; }
        .process-header { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 0.5rem; }
        .process-heading {
          font-family: 'Georgia', 'Fraunces', serif; font-weight: 500;
          font-size: 2rem; margin: 0.9rem 0 0; color: #f2f4f8;
        }
        .loop-label { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem; letter-spacing: 0.1em; color: #8b95ab; }

        .method-title { font-size: 1.05rem; color: #f2f4f8; margin: 0.4rem 0 0.6rem; font-weight: 600; }
        .method-body { font-size: 0.86rem; line-height: 1.6; color: #a7b0c2; margin: 0 0 0.7rem; max-width: 24ch; }
        .method-tags { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.66rem; letter-spacing: 0.04em; color: #8b95ab; opacity: 0.8; margin: 0; }

        .loop-banner {
          display: flex; align-items: center; justify-content: center; gap: 0.7rem;
          margin-top: 2.5rem; padding-top: 1.75rem; border-top: 1px dashed #ffffff17;
          font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.75rem; letter-spacing: 0.08em; color: #8b95ab;
          text-align: center; flex-wrap: wrap;
        }

        .quote-card { padding: 2.5rem 2.75rem; }
        .quote-text {
          font-family: 'Georgia', 'Fraunces', serif; font-size: 1.85rem; line-height: 1.45;
          font-weight: 500; color: #f2f4f8; margin: 1.5rem 0 1.75rem; max-width: 36ch;
        }
        .quote-footer { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem; }
        .quote-attr { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 0.8rem; color: #8b95ab; }
        .quote-icons { display: flex; gap: 0.6rem; }
        .quote-icon {
          height: 32px; width: 32px; display: flex; align-items: center; justify-content: center;
          border-radius: 50%; border: 1px solid #ffffff17; color: #8b95ab;
        }

        @media (min-width: 900px) {
          .identity-card { grid-template-columns: 42% 58%; }
          .right-col { border-top: none; border-left: 1px solid #ffffff17; }
          .stats-row { grid-template-columns: 1fr 1fr; }
          .signals-col { border-bottom: none; border-right: 1px solid #ffffff17; }
        }
        @media (max-width: 899px) {
          .journey-track { grid-template-columns: repeat(2, 1fr); row-gap: 2.25rem; }
          .method-track { grid-template-columns: repeat(2, 1fr); row-gap: 2.25rem; }
          .track-line { display: none; }
          .story-col, .journey-row, .signals-col, .credentials-col, .process-card, .quote-card { padding: 2rem 1.5rem; }
        }
        @media (max-width: 560px) {
          .journey-track, .method-track { grid-template-columns: 1fr; }
          .signals-grid { grid-template-columns: 1fr; row-gap: 1.25rem; }
          .signal { border-left: none !important; padding-left: 0; }
          .quote-footer { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </section>
  )
}