/**
 * Marquee.jsx - diagonal infinite skill marquee for the Hero section.
 *
 * Sits in Hero between the summary text and CTA buttons.
 * - Slightly rotated (-3.5deg) strip bleeding past viewport edges
 * - Two rows scrolling opposite directions
 * - Uses pure CSS infinite animation for 100% smooth, constant speed (no scroll jank)
 */

const ROW_1 = [
  'React', 'Node.js', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis',
  'Next.js', 'Supabase', 'Express', 'REST API', 'WebSockets', 'Tailwind',
  'Microservices', 'Git', 'Cloudflare', 'Vercel', 'Kotlin', 'Python',
]

const ROW_2 = [
  'Full-Stack', 'Backend', 'API Design', 'Auth & JWT', 'Real-Time', 'Caching',
  'CI/CD', 'SQL Schemas', 'React Hooks', 'Zustand', 'Winston', 'Android',
  'RPA', 'OpenRouter', 'OneSignal', 'Fintech', 'Web Scraping', 'GSAP',
]

function MarqueeTrack({ items, reverse = false, duration = '50s', accent }) {
  const doubled = [...items, ...items]

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          willChange: 'transform',
          animation: `${reverse ? 'mvk-scroll-rev' : 'mvk-scroll'} ${duration} linear infinite`,
        }}
      >
        {doubled.map((item, i) => {
          const highlighted = i % 5 === 0
          return (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.38rem 0.95rem',
                marginRight: '0.55rem',
                borderRadius: 99,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.7rem, 1.2vw, 0.82rem)',
                fontWeight: highlighted ? 700 : 500,
                letterSpacing: '0.04em',
                background: highlighted
                  ? `color-mix(in srgb, ${accent} 13%, transparent)`
                  : 'rgba(255,255,255,0.03)',
                border: `1px solid ${highlighted
                  ? `color-mix(in srgb, ${accent} 28%, transparent)`
                  : 'rgba(255,255,255,0.06)'}`,
                color: highlighted ? accent : 'rgba(180,195,220,0.5)',
              }}
            >
              <span aria-hidden="true" style={{ fontSize: '0.52em', opacity: 0.55 }}>◆</span>
              {item}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function Marquee() {
  return (
    <section
      aria-label="Technology skills - scrolling marquee"
      style={{
        position: 'relative',
        transform: 'rotate(-3.5deg) scaleX(1.1)',
        transformOrigin: 'center center',
        margin: '2rem 0 2.5rem',
        width: 'calc(100% + 10vw)',
        left: '-5vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      {/* Edge fade masks */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        inset: '-6px 0',
        zIndex: 2,
        pointerEvents: 'none',
        background: 'linear-gradient(to right, var(--bg-base) 0%, transparent 8%, transparent 92%, var(--bg-base) 100%)',
      }} />

      <MarqueeTrack items={ROW_1} reverse={false} duration="55s" accent="var(--accent-1)" />
      <MarqueeTrack items={ROW_2} reverse={true} duration="45s" accent="var(--accent-2)" />

      <style>{`
        @keyframes mvk-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes mvk-scroll-rev {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="animation"] { animation: none !important; }
        }
      `}</style>
    </section>
  )
}
