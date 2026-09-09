/**
 * SkillsCloud.jsx - "My Stack" section
 *
 * Uses local asset images for Java, CSS3, Next.js, Render, and AWS,
 * while serving the rest via cdn.simpleicons.org.
 */
import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from '@/motion/gsapConfig'
import { SKILLS } from '@/data/profile'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// Local image assets
import javaImg from '/assets/skills/java-512px.png'
import css3Img from '/assets/skills/css3-512px.png'
import nextjsImg from '/assets/skills/nextdotjs-512px.png'
import renderImg from '/assets/skills/render-512px.png'
import awsImg from '/assets/skills/aws-512px.png'

/* Map skill IDs to either local asset images or SimpleIcons slugs + brand color */
const ICON_MAP = {
  // Languages
  javascript: { slug: 'javascript', color: '#F7DF1E' },
  typescript: { slug: 'typescript', color: '#3178C6' },
  sql: { slug: 'postgresql', color: '#4169E1', label: 'SQL / PostgreSQL' },
  java: { src: javaImg, color: '#E76F00', label: 'Java' },
  python: { slug: 'python', color: '#3776AB' },
  kotlin: { slug: 'kotlin', color: '#7F52FF' },

  // Frontend
  react: { slug: 'react', color: '#61DAFB' },
  nextjs: { src: nextjsImg, color: '#FFFFFF', label: 'Next.js' },
  html5: { slug: 'html5', color: '#E34F26' },
  css3: { src: css3Img, color: '#1572B6', label: 'CSS3' },
  tailwindcss: { slug: 'tailwindcss', color: '#06B6D4' },

  // Backend
  nodejs: { slug: 'nodedotjs', color: '#339933' },
  express: { slug: 'express', color: '#FFFFFF' },
  microservices: { slug: 'microdotblog', color: '#A855F7', label: 'Microservices' },
  websockets: { slug: 'socketdotio', color: '#010101', colorLight: '#FFFFFF', label: 'WebSockets' },
  restapi: { slug: 'openapiinitiative', color: '#6BA539', label: 'REST APIs' },

  // Databases
  postgresql: { slug: 'postgresql', color: '#4169E1' },
  mongodb: { slug: 'mongodb', color: '#47A248' },
  redis: { slug: 'redis', color: '#FF4438' },
  mysql: { slug: 'mysql', color: '#4479A1' },
  supabase: { slug: 'supabase', color: '#3ECF8E' },

  // Infrastructure
  git: { slug: 'git', color: '#F05032' },
  aws: { src: awsImg, color: '#FF9900', label: 'AWS' },
  cloudflare: { slug: 'cloudflare', color: '#F48120' },
  render: { src: renderImg, color: '#FFFFFF', label: 'Render' },
  vercel: { slug: 'vercel', color: '#FFFFFF' },
}

const CLUSTER_META = {
  Languages: { color: '#F7DF1E', desc: 'Core programming languages' },
  Frontend: { color: '#61DAFB', desc: 'UI frameworks & styling' },
  Backend: { color: '#68A063', desc: 'Server-side & APIs' },
  Databases: { color: '#4169E1', desc: 'Data storage & caching' },
  Infrastructure: { color: '#F48120', desc: 'DevOps, hosting & deployment' },
}

function SkillBadge({ skill }) {
  const [hovered, setHovered] = useState(false)
  const iconMeta = ICON_MAP[skill.id]

  // If a local image is defined in iconMeta, use it; otherwise, fall back to SimpleIcons CDN
  const iconUrl = iconMeta?.src
    ? iconMeta.src
    : iconMeta?.slug
    ? `https://cdn.simpleicons.org/${iconMeta.slug}/${iconMeta.color.replace('#', '')}`
    : null

  const badgeColor = iconMeta?.color || 'var(--accent-1)'

  return (
    <div
      style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.55rem' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        id={`skill-${skill.id}`}
        aria-label={skill.label}
        tabIndex={0}
        style={{
          width: 72,
          height: 72,
          padding: 14,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          border: `1.5px solid ${hovered ? badgeColor : 'var(--border)'}`,
          background: hovered
            ? `color-mix(in srgb, ${badgeColor} 10%, var(--bg-elev-1))`
            : 'var(--bg-elev-1)',
          cursor: 'default',
          outline: 'none',
          transition: 'transform 300ms cubic-bezier(.2,.8,.2,1), border-color 280ms, background 280ms, box-shadow 280ms',
          transform: hovered ? 'translateY(-7px) scale(1.12)' : 'none',
          boxShadow: hovered
            ? `0 14px 36px color-mix(in srgb, ${badgeColor} 25%, transparent), 0 0 0 1px color-mix(in srgb, ${badgeColor} 30%, transparent)`
            : 'var(--shadow-sm)',
        }}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
      >
        {iconUrl ? (
          <img
            src={iconUrl}
            alt={skill.label}
            width={42}
            height={42}
            loading="lazy"
            decoding="async"
            style={{
              width: 42,
              height: 42,
              objectFit: 'contain',
              // Inverts pure black local icons (like Render) to crisp white for dark themes
              filter:
                skill.id === 'render'
                  ? 'invert(1)'
                  : iconMeta?.color === '#FFFFFF'
                  ? hovered
                    ? 'none'
                    : 'brightness(0.75)'
                  : 'none',
              transition: 'filter 280ms',
            }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.parentElement.innerHTML = `<span style="font-size:1.1rem;font-weight:900;color:${badgeColor};font-family:monospace">${skill.label.slice(0, 2).toUpperCase()}</span>`
            }}
          />
        ) : (
          <span style={{ fontSize: '1.1rem', fontWeight: 900, color: badgeColor, fontFamily: 'monospace' }}>
            {skill.label.slice(0, 2).toUpperCase()}
          </span>
        )}
      </button>

      {/* Label */}
      <span
        style={{
          fontSize: '0.7rem',
          color: hovered ? 'var(--fg-primary)' : 'var(--fg-muted)',
          fontWeight: hovered ? 700 : 500,
          fontFamily: 'var(--font-mono)',
          textAlign: 'center',
          maxWidth: 80,
          lineHeight: 1.2,
          transition: 'color 220ms',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {(iconMeta?.label || skill.label).split(' ')[0]}
      </span>

      {/* Tooltip */}
      {hovered && (
        <div
          role="tooltip"
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 10px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--bg-elev-2)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '0.7rem 1rem',
            fontSize: '0.8rem',
            color: 'var(--fg-primary)',
            width: 230,
            zIndex: 60,
            boxShadow: 'var(--shadow-lg)',
            lineHeight: 1.6,
            pointerEvents: 'none',
            animation: 'tooltipPop 180ms cubic-bezier(.2,.8,.2,1)',
            whiteSpace: 'normal',
            textAlign: 'left',
          }}
        >
          <strong style={{ color: badgeColor, display: 'block', marginBottom: '0.2rem', fontSize: '0.87rem' }}>
            {skill.label}
          </strong>
          {skill.desc}
        </div>
      )}
    </div>
  )
}

export default function SkillsCloud() {
  const sectionRef = useRef(null)
  const prefersReduced = useReducedMotion()

  useGSAP(() => {
    if (prefersReduced) return
    const clusters = sectionRef.current?.querySelectorAll('.skill-cluster')
    clusters?.forEach(cluster => {
      const header = cluster.querySelector('.cluster-header-inner')
      if (header) {
        gsap.fromTo(
          header,
          { opacity: 0, x: -24 },
          {
            opacity: 1,
            x: 0,
            duration: 0.55,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cluster,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      const badges = [...cluster.querySelectorAll('[id^="skill-"]')]
      badges.forEach((badge, i) => {
        gsap.fromTo(
          badge.parentElement,
          { opacity: 0, y: 28, scale: 0.75 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.6)',
            delay: i * 0.045,
            scrollTrigger: {
              trigger: cluster,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })
    })
  }, { scope: sectionRef, dependencies: [prefersReduced] })

  return (
    <section
      id="skills"
      ref={sectionRef}
      aria-labelledby="skills-heading"
      className="section"
      style={{ background: 'var(--bg-elev-1)' }}
    >
      <div className="container">
        {/* Centred header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-label">Technical Skills</span>
          <h2 id="skills-heading" style={{ marginBottom: '0.75rem' }}>
            My <span className="gradient-text">Stack</span>
          </h2>
          <p style={{ color: 'var(--fg-muted)', maxWidth: '44ch', margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
            Tools I reach for in production. Hover any icon for context.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {Object.entries(SKILLS).map(([cluster, skills]) => {
            const meta = CLUSTER_META[cluster] || { color: 'var(--accent-1)', desc: '' }
            return (
              <div key={cluster} className="skill-cluster">
                {/* Cluster header */}
                <div
                  className="cluster-header-inner"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.875rem',
                    marginBottom: '2rem',
                    paddingBottom: '1rem',
                    borderBottom: `1px solid color-mix(in srgb, ${meta.color} 20%, var(--border))`,
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      flexShrink: 0,
                      background: `color-mix(in srgb, ${meta.color} 12%, transparent)`,
                      border: `1.5px solid color-mix(in srgb, ${meta.color} 26%, transparent)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1rem',
                    }}
                    aria-hidden="true"
                  >
                    {{ Languages: '{}', Frontend: '◈', Backend: '⚙', Databases: '🗄', Infrastructure: '☁' }[cluster] || '◇'}
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: meta.color,
                        lineHeight: 1,
                        marginBottom: '0.25rem',
                      }}
                    >
                      {cluster}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--fg-muted)' }}>{meta.desc}</div>
                  </div>
                </div>

                {/* Centred icon grid */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '1.5rem 1.75rem',
                    justifyContent: 'center',
                  }}
                >
                  {skills.map(skill => (
                    <SkillBadge key={skill.id} skill={skill} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes tooltipPop {
          from { opacity:0; transform: translateX(-50%) translateY(6px) scale(0.93); }
          to   { opacity:1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>
    </section>
  )
}