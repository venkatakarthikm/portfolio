/**
 * SecondaryGrid.jsx
 *
 * Section: Accordion list for secondary projects with alternating entrance.
 * Full Directory has been moved exclusively into the "Browse All" full-screen overlay.
 * Uses the Uiverse expanding green bubble button for "Live" links across both the accordion and overlay.
 */
import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { PROJECTS } from '@/data/projects'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// 6 secondary projects displayed directly in the accordion
const ACCORDION_IDS = ['fourzdeals', 'dhurandhar', 'weatherflow', 'chatvk', 'streamyfilm', 'cricweb']
const ACCORDION_PROJECTS = ACCORDION_IDS.map(id => PROJECTS.find(p => p.id === id)).filter(Boolean)

/* ── Live Button (Using the same expanding bubble button theme) ── */
function LiveButton({ href, label = 'Live' }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative z-10 w-28 sm:w-32 h-9 sm:h-10 bg-black border border-white/10 rounded-md font-bold cursor-pointer overflow-hidden group shrink-0 inline-flex items-center justify-center transition-all duration-300 no-underline"
      style={{ textDecoration: 'none' }}
    >
      <span className="relative z-10 text-xs sm:text-sm text-white tracking-wide transition-opacity duration-300 group-hover:opacity-0">
        {label}
      </span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom pointer-events-none" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom pointer-events-none" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom pointer-events-none" />
      <span className="opacity-0 group-hover:opacity-100 group-hover:duration-1000 duration-100 absolute inset-0 flex items-center justify-center z-10 text-xs sm:text-sm text-white font-bold tracking-wide pointer-events-none">
        Explore!
      </span>
    </a>
  )
}

/* ── Uiverse "See Detail" Button ── */
function DetailButton({ label = 'Details' }) {
  return (
    <div className="relative z-10 w-28 sm:w-32 h-9 sm:h-10 bg-black border border-white/10 rounded-md font-bold cursor-pointer overflow-hidden group shrink-0 flex items-center justify-center transition-all duration-300">
      <span className="relative z-10 text-xs sm:text-sm text-white tracking-wide transition-opacity duration-300 group-hover:opacity-0">
        {label}
      </span>
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-200 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-500 duration-1000 origin-bottom pointer-events-none" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-700 duration-700 origin-bottom pointer-events-none" />
      <span className="absolute w-36 h-32 -top-8 -left-2 bg-green-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform group-hover:duration-1000 duration-500 origin-bottom pointer-events-none" />
      <span className="opacity-0 group-hover:opacity-100 group-hover:duration-1000 duration-100 absolute inset-0 flex items-center justify-center z-10 text-xs sm:text-sm text-white font-bold tracking-wide pointer-events-none">
        Explore!
      </span>
    </div>
  )
}

/* ── Uiverse "Close" Button ── */
function CloseButton() {
  return (
    <div className="relative border-2 border-white/20 group hover:border-green-500 w-9 sm:w-10 h-9 sm:h-10 duration-500 overflow-hidden rounded-md shrink-0 bg-black">
      <p className="font-sans text-xl sm:text-2xl h-full w-full flex items-center justify-center text-white duration-500 relative z-10 group-hover:scale-0">
        ×
      </p>
      <span className="absolute w-full h-full bg-green-500 rotate-45 group-hover:top-6 sm:group-hover:top-7 duration-500 top-12 left-0 pointer-events-none" />
      <span className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:left-6 sm:group-hover:left-7 duration-500 left-12 pointer-events-none" />
      <span className="absolute w-full h-full bg-green-500 rotate-45 top-0 group-hover:right-6 sm:group-hover:right-7 duration-500 right-12 pointer-events-none" />
      <span className="absolute w-full h-full bg-green-500 rotate-45 group-hover:bottom-6 sm:group-hover:bottom-7 duration-500 bottom-12 right-0 pointer-events-none" />
    </div>
  )
}

/* ── Accordion row ── */
function AccordionRow({ project, index, isOpen, onToggle }) {
  const bodyRef = useRef(null)

  useEffect(() => {
    const el = bodyRef.current
    if (!el) return
    if (isOpen) {
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.opacity = '1'
    } else {
      el.style.maxHeight = '0px'
      el.style.opacity = '0'
    }
  }, [isOpen])

  return (
    <div
      data-accordion-row
      data-direction={index % 2 === 0 ? 'left' : 'right'}
      style={{
        borderBottom: '1px solid var(--border)',
        transition: 'background 200ms, border-color 200ms',
        background: isOpen ? 'var(--bg-elev-1)' : 'transparent',
        borderRadius: isOpen ? 16 : 0,
        marginBottom: isOpen ? 8 : 0,
        overflow: 'hidden',
      }}
    >
      {/* Row header */}
      <button
        id={`accordion-${project.id}`}
        onClick={() => onToggle(project.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${project.id}`}
        style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '56px 1fr auto',
          alignItems: 'center',
          gap: '1rem',
          padding: '1.25rem 1.25rem',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'padding-left 250ms cubic-bezier(.2,.8,.2,1)',
        }}
        onMouseEnter={e => {
          if (!isOpen) e.currentTarget.style.paddingLeft = '1.65rem'
        }}
        onMouseLeave={e => {
          if (!isOpen) e.currentTarget.style.paddingLeft = '1.25rem'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.4rem',
            fontWeight: 900,
            color: isOpen ? 'var(--accent-1)' : 'rgba(255,255,255,0.2)',
            letterSpacing: '-0.04em',
            transition: 'color 250ms',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <span
          style={{
            fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
            fontWeight: 700,
            color: isOpen ? 'var(--fg-primary)' : 'var(--fg-muted)',
            transition: 'color 250ms',
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </span>

        <div>{isOpen ? <CloseButton /> : <DetailButton label="Details" />}</div>
      </button>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        id={`accordion-body-${project.id}`}
        role="region"
        aria-labelledby={`accordion-${project.id}`}
        style={{
          maxHeight: 0,
          opacity: 0,
          overflow: 'hidden',
          transition: 'max-height 480ms cubic-bezier(.4,0,.2,1), opacity 380ms ease',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            padding: '0 1.5rem 2rem',
          }}
        >
          {/* Image preview */}
          <div style={{ borderRadius: 16, overflow: 'hidden', background: 'var(--bg-elev-2)', aspectRatio: '16/9' }}>
            <img
              src={project.poster}
              alt={`${project.title} preview`}
              loading="lazy"
              decoding="async"
              onError={e => {
                e.currentTarget.src = `https://placehold.co/800x450/11172E/6D5BFF?text=${encodeURIComponent(project.title)}`
              }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <p style={{ color: 'var(--fg-muted)', lineHeight: 1.7, fontSize: '0.93rem' }}>
              {project.description || project.tagline}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {project.tags.map(t => (
                <span
                  key={t}
                  style={{
                    padding: '0.2rem 0.6rem',
                    borderRadius: 99,
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 600,
                    background: 'var(--bg-elev-2)',
                    border: '1px solid var(--border)',
                    color: 'var(--fg-muted)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Live CTA */}
            <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: 'auto' }}>
              {project.url && <LiveButton href={project.url} label="Live Site" />}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 640px) {
            #accordion-body-${project.id} > div {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </div>
  )
}

/* ── All Projects Full-Screen Overlay ── */
function AllProjectsOverlay({ open, onClose }) {
  const [filter, setFilter] = useState('All')
  const allCats = ['All', ...new Set(PROJECTS.flatMap(p => p.category || []))]
  const filtered = filter === 'All' ? PROJECTS : PROJECTS.filter(p => p.category?.includes(filter))

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const h = e => {
      if (e.key === 'Escape') onClose()
    }
    if (open) window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div role="dialog" aria-modal="true" aria-label="All projects" style={{ position: 'fixed', inset: 0, zIndex: 20000 }}>
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
        aria-hidden="true"
      />
      <div
        data-lenis-prevent="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'var(--bg-base)',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          animation: 'slideUpPanel 0.45s cubic-bezier(.2,.8,.2,1)',
        }}
      >
        <style>{`@keyframes slideUpPanel{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}`}</style>
        <div
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 10,
            background: 'color-mix(in srgb, var(--bg-base) 90%, transparent)',
            backdropFilter: 'blur(16px)',
            borderBottom: '1px solid var(--border)',
            padding: '1.25rem clamp(1rem,5vw,3rem)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(1.4rem,3vw,2rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
              All <span className="gradient-text">Projects</span>
            </h2>
            <p style={{ color: 'var(--fg-muted)', fontSize: '0.85rem', marginTop: '0.2rem' }}>
              {PROJECTS.length} projects - click to visit
            </p>
          </div>
          <button
            id="close-all-projects"
            onClick={onClose}
            aria-label="Close all projects"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1px solid var(--border)',
              background: 'var(--bg-elev-1)',
              color: 'var(--fg-primary)',
              cursor: 'pointer',
              fontSize: '1.2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '2rem clamp(1rem,5vw,3rem) 4rem' }}>
          {/* Categories */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '2rem' }}>
            {allCats.map(f => (
              <button
                key={f}
                id={`overlay-filter-${f.toLowerCase()}`}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.32rem 0.8rem',
                  borderRadius: 99,
                  border: `1px solid ${filter === f ? 'var(--accent-1)' : 'var(--border)'}`,
                  background: filter === f ? 'color-mix(in srgb, var(--accent-1) 10%, transparent)' : 'transparent',
                  color: filter === f ? 'var(--accent-1)' : 'var(--fg-muted)',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Projects List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {filtered.map(p => (
              <div
                key={p.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  padding: '0.95rem 1.2rem',
                  borderRadius: 14,
                  border: '1px solid var(--border)',
                  background: 'var(--bg-elev-1)',
                  color: 'inherit',
                  transition: 'border-color 180ms, background 180ms',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'var(--accent-1)'
                  e.currentTarget.style.background = 'var(--bg-elev-2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'var(--border)'
                  e.currentTarget.style.background = 'var(--bg-elev-1)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.2rem' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{p.title}</span>
                    {p.tier === 'spotlight' && (
                      <span
                        style={{
                          fontSize: '0.6rem',
                          padding: '0.1rem 0.4rem',
                          borderRadius: 99,
                          background: 'color-mix(in srgb,var(--accent-1) 14%,transparent)',
                          color: 'var(--accent-1)',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                        }}
                      >
                        FEATURED
                      </span>
                    )}
                    {p.tags.slice(0, 3).map(t => (
                      <span
                        key={t}
                        style={{
                          padding: '0.08rem 0.42rem',
                          borderRadius: 99,
                          fontSize: '0.6rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 600,
                          background: 'var(--bg-elev-2)',
                          border: '1px solid var(--border)',
                          color: 'var(--fg-muted)',
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--fg-muted)', lineHeight: 1.5, margin: 0 }}>
                    {p.tagline}
                  </p>
                </div>
                {p.url && (
                  <div style={{ flexShrink: 0 }}>
                    <LiveButton href={p.url} label="Live" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

/* ── Main export ── */
export default function SecondaryGrid() {
  const [openId, setOpenId] = useState(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const containerRef = useRef(null)
  const prefersReduced = useReducedMotion()

  const toggle = id => setOpenId(prev => (prev === id ? null : id))
  const openOverlay = useCallback(() => setOverlayOpen(true), [])
  const closeOverlay = useCallback(() => setOverlayOpen(false), [])

  // Bidirectional alternating scroll reveal (Left vs Right)
  useGSAP(() => {
    if (prefersReduced || !containerRef.current) return

    const rows = containerRef.current.querySelectorAll('[data-accordion-row]')

    rows.forEach(row => {
      const fromLeft = row.dataset.direction === 'left'
      const startX = fromLeft ? -60 : 60

      gsap.fromTo(
        row,
        {
          x: startX,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row,
            start: 'top 90%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse',
          },
        }
      )
    })
  }, { scope: containerRef, dependencies: [prefersReduced] })

  return (
    <section id="all-projects" aria-labelledby="secondary-heading" className="section" ref={containerRef} style={{ overflowX: 'hidden' }}>
      <div className="container">
        <span className="section-label">More Work</span>
        <h2 id="secondary-heading" style={{ marginBottom: '0.5rem' }}>
          More <span className="gradient-text">Projects</span>
        </h2>
        <p style={{ color: 'var(--fg-muted)', marginBottom: '2.5rem', maxWidth: '52ch', fontSize: '0.97rem', lineHeight: 1.7 }}>
          Click any project to expand details, view a screenshot, and visit the live site.
        </p>

        {/* Accordion List */}
        <div style={{ borderTop: '1px solid var(--border)' }}>
          {ACCORDION_PROJECTS.map((project, i) => (
            <AccordionRow
              key={project.id}
              project={project}
              index={i}
              isOpen={openId === project.id}
              onToggle={toggle}
            />
          ))}

          {/* Last item: View All Projects (Triggers Overlay) */}
          <div
            data-accordion-row
            data-direction={ACCORDION_PROJECTS.length % 2 === 0 ? 'left' : 'right'}
            style={{ borderBottom: '1px solid var(--border)' }}
          >
            <button
              id="view-all-projects-accordion"
              onClick={openOverlay}
              aria-haspopup="dialog"
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '56px 1fr auto',
                alignItems: 'center',
                gap: '1rem',
                padding: '1.25rem 1.25rem',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'padding-left 250ms cubic-bezier(.2,.8,.2,1)',
              }}
              onMouseEnter={e => (e.currentTarget.style.paddingLeft = '1.65rem')}
              onMouseLeave={e => (e.currentTarget.style.paddingLeft = '1.25rem')}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.4rem',
                  fontWeight: 900,
                  color: 'color-mix(in srgb, var(--accent-1) 60%, transparent)',
                  letterSpacing: '-0.04em',
                }}
              >
                {String(ACCORDION_PROJECTS.length + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 'clamp(1rem, 2.2vw, 1.35rem)', fontWeight: 700, color: 'var(--fg-muted)' }}>
                View All {PROJECTS.length} Projects →
              </span>
              <div>
                <DetailButton label="Browse All" />
              </div>
            </button>
          </div>
        </div>
      </div>

      <AllProjectsOverlay open={overlayOpen} onClose={closeOverlay} />
    </section>
  )
}