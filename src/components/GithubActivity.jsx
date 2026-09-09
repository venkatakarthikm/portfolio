import { useRef, useState, useEffect } from 'react'
import { useTheme } from '@/hooks/useTheme'

const GITHUB_USERNAME = 'venkatakarthikm'

function GithubCard({ id, title, lightSrc, darkSrc, alt }) {
  const { resolvedTheme } = useTheme()
  const [loaded, setLoaded] = useState(false)
  const [visible, setVisible] = useState(false)
  const imgRef = useRef(null)

  // Lazy load via IntersectionObserver
  useEffect(() => {
    const el = imgRef.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { rootMargin: '200px' })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const src = visible
    ? (resolvedTheme === 'dark' ? darkSrc : lightSrc)
    : null

  return (
    <div
      id={id}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1.25rem',
        flex: 1,
        minWidth: 0,
      }}
    >
      <h3 style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--fg-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {title}
      </h3>
      <div
        ref={imgRef}
        style={{
          width: '100%',
          minHeight: 120,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: loaded ? 'transparent' : 'var(--bg-elev-2)',
          borderRadius: 8,
          transition: 'background 300ms',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: 8,
              opacity: loaded ? 1 : 0,
              transition: 'opacity 400ms ease',
            }}
          />
        ) : (
          <span style={{ color: 'var(--fg-muted)', fontSize: '0.8rem' }}>Loading…</span>
        )}
      </div>
    </div>
  )
}

export default function GithubActivity() {
  const THEME_DARK = 'dark&hide_border=true&background=0B1020&ring=7E72FF&fire=36E0BE&sideNums=E7ECF8&sideLabels=9AA7C2&dates=9AA7C2&currStreakLabel=7E72FF'
  const THEME_LIGHT = 'default&hide_border=true'

  return (
    <section
      id="github"
      aria-labelledby="github-heading"
      className="section"
    >
      <div className="container">
        <span className="section-label">GitHub Activity</span>
        <h2 id="github-heading" className="section-heading" style={{ marginBottom: '0.5rem' }}>
          Contribution Stats
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '2.5rem', maxWidth: '48ch' }}>
          Live GitHub stats - updated dynamically. Visit{' '}
          <a href={`https://github.com/${GITHUB_USERNAME}`} target="_blank" rel="noopener noreferrer">
            github.com/{GITHUB_USERNAME}
          </a>{' '}
          for full activity.
        </p>

        {/* Row: Streak + Languages */}
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <GithubCard
            id="github-streak"
            title="Contribution Streak"
            lightSrc={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=${THEME_LIGHT}`}
            darkSrc={`https://streak-stats.demolab.com/?user=${GITHUB_USERNAME}&theme=${THEME_DARK}`}
            alt={`GitHub streak stats for ${GITHUB_USERNAME}`}
          />
          <GithubCard
            id="github-languages"
            title="Top Languages"
            lightSrc={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${GITHUB_USERNAME}&theme=default`}
            darkSrc={`https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=${GITHUB_USERNAME}&theme=2077`}
            alt={`Top languages used by ${GITHUB_USERNAME} on GitHub`}
          />
        </div>

        {/* Quick stats row */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginTop: '1.5rem', justifyContent: 'center' }}>
          {[
            { label: '700+', sub: 'Total Contributions' },
            { label: '55+', sub: 'Repositories (SS Rank)' },
            { label: '598+', sub: 'Commits (AAA Rank)' },
            { label: '42+', sub: 'Longest Streak (days)' },
          ].map(({ label, sub }) => (
            <div key={sub} style={{
              textAlign: 'center',
              padding: '0.875rem 1.25rem',
              background: 'var(--bg-elev-1)',
              border: '1px solid var(--border)',
              borderRadius: 12,
              minWidth: 120,
              flex: '1 1 120px',
              maxWidth: 180,
            }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-1)', letterSpacing: '-0.03em' }}>{label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--fg-muted)', marginTop: '0.2rem' }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
