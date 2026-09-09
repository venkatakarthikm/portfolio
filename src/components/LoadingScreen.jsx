import { useEffect, useRef, useState, useCallback } from 'react'
import gsap from 'gsap'

function buildWavePolygon(baseline, amp, phase, periods = 2.5, samples = 48) {
  const points = []

  for (let i = 0; i <= samples; i += 1) {
    const progress = i / samples
    const x = progress * 100
    const y = baseline + amp * Math.sin(2 * Math.PI * periods * progress + phase)
    points.push(`${x.toFixed(2)}% ${y.toFixed(2)}%`)
  }

  points.push('100% 100%', '0% 100%')
  return `polygon(${points.join(', ')})`
}

export default function LoadingScreen({ onReachNav, onDone }) {
  const overlayRef = useRef(null)
  const topCoverRef = useRef(null)
  const curtainRef = useRef(null)
  const masterWrapperRef = useRef(null)
  const counterRef = useRef(null)

  const baseNameRef = useRef(null)
  const fullNameRef = useRef(null)
  const whiteRowRef = useRef(null)
  const gradientLayerRef = useRef(null)
  const gradientRowRef = useRef(null)

  const whiteMRef = useRef(null)
  const whiteMSlotRef = useRef(null)
  const whiteTailVRef = useRef(null)
  const whiteSpaceRef = useRef(null)
  const whiteTailKRef = useRef(null)

  const gradientMRef = useRef(null)
  const gradientMSlotRef = useRef(null)
  const gradientTailVRef = useRef(null)
  const gradientSpaceRef = useRef(null)
  const gradientTailKRef = useRef(null)

  const waterWave = useRef({ p: 0, amp: 0, phase: 0 })
  const oceanSweep = useRef({ p: 0, phase: 0 })
  const waterTween = useRef(null)
  const oceanTween = useRef(null)
  const timelineRef = useRef(null)
  const ranOnceRef = useRef(false)
  const [show, setShow] = useState(true)
  const [isMobile, setIsMobile] = useState(() => (
    typeof window !== 'undefined' && window.innerWidth <= 640
  ))

  const updateWaterClip = useCallback(() => {
    if (!fullNameRef.current) return

    const { p, amp, phase } = waterWave.current
    fullNameRef.current.style.clipPath = buildWavePolygon(
      100 - p * 100,
      amp,
      phase,
      2.5,
      48,
    )
  }, [])

  const updateOceanClip = useCallback(() => {
    if (!curtainRef.current) return

    const { p, phase } = oceanSweep.current
    const baseline = p * 100
    const amp = Math.sin(p * Math.PI) * 4.5

    curtainRef.current.style.clipPath = buildWavePolygon(
      baseline,
      amp,
      phase,
      2,
      48,
    )
  }, [])

  const runSequence = useCallback(() => {
    if (!overlayRef.current || timelineRef.current) return

    const tl = gsap.timeline()
    timelineRef.current = tl

    // 1. Liquid fill of the full name.
    tl.add(() => {
      waterTween.current = gsap.to(waterWave.current, {
        phase: '+=6.283',
        duration: 1.15,
        repeat: -1,
        ease: 'none',
        onUpdate: updateWaterClip,
      })
    }, 0)

    tl.to(
      waterWave.current,
      {
        p: 1,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: updateWaterClip,
      },
      0,
    )

    tl.to(
      waterWave.current,
      {
        keyframes: [
          { amp: 6, duration: 0.6, ease: 'power1.out' },
          { amp: 6, duration: 1.5, ease: 'none' },
          { amp: 0, duration: 0.7, ease: 'power1.in' },
        ],
        onUpdate: updateWaterClip,
      },
      0,
    )

    const counter = { value: 0 }

    tl.to(
      counter,
      {
        value: 100,
        duration: 2.8,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = `loading... ${Math.round(counter.value)} %`
          }
        },
      },
      0,
    )

    tl.add(() => waterTween.current?.kill(), 2.8)
    tl.to(counterRef.current, { opacity: 0, duration: 0.25 }, 2.85)
    tl.to(baseNameRef.current, { opacity: 0, duration: 0.35 }, 2.85)

    tl.add(() => {
      if (fullNameRef.current) {
        fullNameRef.current.style.clipPath = 'none'
      }
    }, 2.95)

    if (isMobile) {
      // On small screens the full name is intentionally skipped. MVK starts
      // centered, then only its white-to-gradient color transition runs.
      tl.to(whiteRowRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 2.95)

      tl.to(gradientLayerRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: 'power1.inOut',
      }, 2.95)

      tl.addLabel('flyStart', '+=0.2')
    } else {
      // Desktop morph: ENKATA contracts toward V, ARTHIK contracts toward K,
      // and M travels in from the left into the slot directly before V.
      tl.addLabel('morphStart', '+=0.15')

      tl.to(
        [
          whiteTailVRef.current,
          whiteTailKRef.current,
          gradientTailVRef.current,
          gradientTailKRef.current,
        ],
        {
          width: 0,
          scaleX: 0,
          opacity: 0,
          transformOrigin: 'left center',
          duration: 1.8,
          ease: 'power2.inOut',
        },
        'morphStart',
      )

      tl.to(
        [whiteSpaceRef.current, gradientSpaceRef.current],
        {
          width: 0,
          duration: 1.8,
          ease: 'power2.inOut',
        },
        'morphStart',
      )

      const animateMFromLeft = (mRef, mSlotRef) => {
        const mWidth = () => mRef.current?.getBoundingClientRect().width || 0
        const leftEdgeStart = () => {
          const slot = mSlotRef.current
          const width = mWidth()
          if (!slot) return -(width + 48)

          // Start beyond the left edge of the viewport, then land in the
          // reserved slot directly before V.
          return -(slot.getBoundingClientRect().left + width + 48)
        }

        tl.to(
          mSlotRef.current,
          {
            width: mWidth,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          'morphStart',
        )

        tl.fromTo(
          mRef.current,
          {
            x: leftEdgeStart,
            opacity: 1,
          },
          {
            x: 0,
            duration: 1.8,
            ease: 'power2.inOut',
          },
          'morphStart',
        )
      }

      animateMFromLeft(whiteMRef, whiteMSlotRef)
      animateMFromLeft(gradientMRef, gradientMSlotRef)

      // Both constructions use the same geometry, so this is only a color
      // crossfade and never a full fade-out/fade-in of the logo.
      tl.to(whiteRowRef.current, {
        opacity: 0,
        duration: 0.85,
        ease: 'power1.inOut',
      }, 'morphStart+=1.35')

      tl.to(gradientLayerRef.current, {
        opacity: 1,
        duration: 0.85,
        ease: 'power1.inOut',
      }, 'morphStart+=1.35')

      tl.addLabel('flyStart', 'morphStart+=2.45')
    }

    // Fly the finished MVK row to the navbar.
    tl.to(
      gradientRowRef.current,
      {
        scale: () => {
          const navLogo = document.getElementById('nav-logo')
          const glyph = gradientRowRef.current

          if (!navLogo || !glyph) return 0.2
          const h = glyph.getBoundingClientRect().height
          if (h === 0) return 0.2
          return navLogo.getBoundingClientRect().height / h
        },
        x: () => {
          const navLogo = document.getElementById('nav-logo')
          const glyph = gradientRowRef.current

          if (!navLogo || !glyph) return 40
          return navLogo.getBoundingClientRect().left - glyph.getBoundingClientRect().left
        },
        y: () => {
          const navLogo = document.getElementById('nav-logo')
          const glyph = gradientRowRef.current

          if (!navLogo || !glyph) return 20
          return navLogo.getBoundingClientRect().top - glyph.getBoundingClientRect().top
        },
        transformOrigin: 'top left',
        duration: 1.45,
        ease: 'power3.inOut',
        onComplete: () => {
          onReachNav?.()
        },
      },
      'flyStart',
    )

    tl.to(topCoverRef.current, { opacity: 0, duration: 0.18 }, 'flyStart+=1.4')
    tl.to(masterWrapperRef.current, { opacity: 0, duration: 0.1 }, 'flyStart+=1.58')

    // 5. Recede the black curtain below the navbar.
    tl.add(() => {
      oceanTween.current = gsap.to(oceanSweep.current, {
        phase: '+=6.283',
        duration: 0.85,
        repeat: -1,
        ease: 'none',
        onUpdate: updateOceanClip,
      })
    }, 'flyStart+=2.2')

    tl.to(
      oceanSweep.current,
      {
        p: 1,
        duration: 1.45,
        ease: 'power2.inOut',
        onUpdate: updateOceanClip,
        onComplete: () => {
          oceanTween.current?.kill()
          setShow(false)
          onDone?.()
        },
      },
      'flyStart+=2.2',
    )
  }, [isMobile, onReachNav, onDone, updateOceanClip, updateWaterClip])

  useEffect(() => {
    const updateViewportMode = () => {
      setIsMobile(window.innerWidth <= 640)
    }

    window.addEventListener('resize', updateViewportMode)
    return () => window.removeEventListener('resize', updateViewportMode)
  }, [])

  // Absolute fallback: Ensure the loading screen NEVER traps the user forever.
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShow(false)
      onReachNav?.()
      onDone?.()
    }, 12000)

    return () => clearTimeout(fallbackTimer)
  }, [onReachNav, onDone])

  useEffect(() => {
    if (ranOnceRef.current) return
    ranOnceRef.current = true

    if (document.fonts && document.fonts.ready) {
      let isFired = false
      const fire = () => {
        if (!isFired) {
          isFired = true
          runSequence()
        }
      }
      document.fonts.ready.then(fire)
      setTimeout(fire, 500) // Fallback to start animation anyway after 500ms
    } else {
      setTimeout(runSequence, 200)
    }

    return () => {
      timelineRef.current?.kill()
      timelineRef.current = null
      waterTween.current?.kill()
      oceanTween.current?.kill()
    }
  }, [runSequence])

  if (!show) return null

  const fontStyle = {
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
    fontWeight: 900,
    letterSpacing: '-0.06em',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }

  const fullNameStyle = {
    ...fontStyle,
    // The old 4rem minimum made the 16-character name wider than a phone.
    // This scales with the viewport while retaining a large desktop maximum.
    fontSize: 'clamp(1.35rem, 9.5vw, 10rem)',
    display: 'inline-block',
  }

  const morphRowStyle = {
    ...fullNameStyle,
    display: 'inline-flex',
    alignItems: 'center',
    position: 'relative',
  }

  const tailStyle = {
    display: 'inline-block',
    overflow: 'hidden',
    flexShrink: 0,
  }

  const mSlotStyle = {
    display: 'inline-block',
    width: 0,
    height: '1em',
    overflow: 'visible',
    flexShrink: 0,
  }

  const mStyle = {
    display: 'inline-block',
    opacity: 0,
    willChange: 'transform',
  }

  const gradientTextStyle = {
    color: 'transparent',
    backgroundImage:
      'linear-gradient(135deg, var(--accent-1, #6D5BFF) 0%, var(--accent-2, #36E0BE) 60%, var(--accent-3, #FFA089) 100%)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
  }

  return (
    <div
      ref={overlayRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9990,
        pointerEvents: 'none',
      }}
    >
      <div
        ref={topCoverRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 'var(--nav-h, 70px)',
          background: '#000000',
          zIndex: 1,
        }}
      />

      <div
        ref={curtainRef}
        style={{
          position: 'absolute',
          top: 'var(--nav-h, 70px)',
          left: 0,
          right: 0,
          bottom: 0,
          background: '#000000',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          zIndex: 1,
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2,
        }}
      >
        <div
          ref={masterWrapperRef}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Dim backing keeps the loading word readable before the liquid arrives. */}
          <span
            ref={baseNameRef}
            style={{
              ...fullNameStyle,
              color: 'rgba(255, 255, 255, 0.18)',
            }}
          >
              {isMobile ? 'MVK' : 'VENKATA KARTHIK'}
          </span>

          {/* Liquid-filled full name. The individual spans are what contract into VK. */}
          <span
            ref={fullNameRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              clipPath: buildWavePolygon(100, 0, 0),
              willChange: 'clip-path',
            }}
          >
            {isMobile ? (
              <span ref={whiteRowRef} style={morphRowStyle}>MVK</span>
            ) : (
              <span ref={whiteRowRef} style={morphRowStyle}>
                <span ref={whiteMSlotRef} style={mSlotStyle}>
                  <span ref={whiteMRef} style={mStyle}>M</span>
                </span>
                <span style={{ flexShrink: 0 }}>V</span>
                <span ref={whiteTailVRef} style={{ ...tailStyle, transformOrigin: 'left center' }}>ENKATA</span>
                <span ref={whiteSpaceRef} style={tailStyle}>&nbsp;</span>
                <span style={{ flexShrink: 0 }}>K</span>
                <span ref={whiteTailKRef} style={{ ...tailStyle, transformOrigin: 'left center' }}>ARTHIK</span>
              </span>
            )}
          </span>

          {/* Identical letter geometry underneath. It only supplies the smooth color change. */}
          <span
            ref={gradientLayerRef}
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0,
            }}
          >
            {isMobile ? (
              <span
                ref={gradientRowRef}
                style={{ ...morphRowStyle, ...gradientTextStyle }}
              >
                MVK
              </span>
            ) : (
              <span ref={gradientRowRef} style={morphRowStyle}>
                <span ref={gradientMSlotRef} style={mSlotStyle}>
                  <span ref={gradientMRef} style={{ ...mStyle, ...gradientTextStyle }}>M</span>
                </span>
                <span style={gradientTextStyle}>V</span>
                <span ref={gradientTailVRef} style={{ ...tailStyle, ...gradientTextStyle, transformOrigin: 'left center' }}>ENKATA</span>
                <span ref={gradientSpaceRef} style={tailStyle}>&nbsp;</span>
                <span style={gradientTextStyle}>K</span>
                <span ref={gradientTailKRef} style={{ ...tailStyle, ...gradientTextStyle, transformOrigin: 'left center' }}>ARTHIK</span>
              </span>
            )}
          </span>
        </div>

        <p
          ref={counterRef}
          style={{
            position: 'absolute',
            bottom: '10%',
            right: '8%',
            margin: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(0.85rem, 1.5vw, 1rem)',
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.12em',
          }}
        >
          loading... 0 %
        </p>
      </div>
    </div>
  )
}