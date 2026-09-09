import { CONTACT } from '@/data/profile'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      id="footer"
      style={{
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        background: 'var(--bg-elev-1)',
      }}
      role="contentinfo"
    >
      <div className="container" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--fg-muted)', margin: 0 }}>
          © {year}{' '}
          <a href="#home" style={{ color: 'var(--fg-primary)', fontWeight: 600 }}>
            Muchu Venkata Karthik
          </a>
          {' '} · Built with care. No tracking without consent.
        </p>

        <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
          <a
            href={CONTACT.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-linkedin"
            aria-label="LinkedIn"
            style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', transition: 'color 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            LinkedIn
          </a>
          <a
            href={CONTACT.github}
            target="_blank"
            rel="noopener noreferrer"
            id="footer-github"
            aria-label="GitHub"
            style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', transition: 'color 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            GitHub
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            id="footer-email"
            aria-label="Email"
            style={{ color: 'var(--fg-muted)', fontSize: '0.875rem', transition: 'color 200ms' }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--accent-1)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--fg-muted)' }}
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  )
}
