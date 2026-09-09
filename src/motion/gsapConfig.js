/**
 * motion/gsapConfig.js
 * Central GSAP setup: plugin registration, Lenis sync, matchMedia helpers.
 * Import this ONCE in App.jsx / main.jsx.
 */
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'

// Register all plugins synchronously
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

// SplitText placeholder - loaded lazily if needed
export let SplitText = null

export async function loadSplitText() {
  if (SplitText) return SplitText
  try {
    const mod = await import('gsap/SplitText')
    SplitText = mod.SplitText
    gsap.registerPlugin(SplitText)
  } catch {
    // SplitText not available - graceful fallback
  }
  return SplitText
}

/**
 * Initialize Lenis smooth scroll + sync with GSAP ScrollTrigger RAF.
 * Call once after DOM is ready.
 */
export async function initLenis() {
  const { default: Lenis } = await import('lenis')
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lenis = new Lenis({
    lerp: prefersReduced ? 1 : 0.1,
    duration: prefersReduced ? 0 : 1.5,
    smoothWheel: !prefersReduced,
    infinite: false,
  })

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000)
  })

  // Disable gsap's lagSmoothing so Lenis time controls scroll
  gsap.ticker.lagSmoothing(0)

  // Update ScrollTrigger on Lenis scroll
  lenis.on('scroll', ScrollTrigger.update)

  // Expose velocity as a CSS custom property for marquee speed
  lenis.on('scroll', ({ velocity }) => {
    document.documentElement.style.setProperty('--lenis-velocity', velocity.toFixed(3))
  })

  return lenis
}

/**
 * Global ScrollTrigger defaults
 */
ScrollTrigger.defaults({
  markers: false,
})

/**
 * Utility: stagger-reveal a list of elements on scroll entry.
 * Respects prefers-reduced-motion.
 */
export function staggerReveal(elements, options = {}) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const {
    trigger = elements[0],
    start = 'top 85%',
    y = prefersReduced ? 0 : 24,
    stagger = prefersReduced ? 0 : 0.12,
    duration = prefersReduced ? 0.4 : 0.7,
    delay = 0,
  } = options

  return gsap.fromTo(
    elements,
    { opacity: 0, y, scale: prefersReduced ? 1 : 0.98 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration,
      stagger,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger,
        start,
        once: true,
      },
    }
  )
}

/**
 * Utility: counter-up tween for a numeric display element.
 */
export function counterUp(element, target, duration = 1.6) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const obj = { val: 0 }
  const isDecimal = !Number.isInteger(target)

  return gsap.to(obj, {
    val: target,
    duration: prefersReduced ? 0.4 : duration,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      once: true,
    },
    onUpdate() {
      element.textContent = isDecimal
        ? obj.val.toFixed(1)
        : Math.round(obj.val).toLocaleString()
    },
  })
}

/**
 * Utility: SVG path draw animation.
 */
export function pathDraw(pathEl, options = {}) {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const { trigger = pathEl, start = 'top 85%', end = 'bottom 60%', scrub = 1 } = options

  return gsap.from(pathEl, {
    strokeDasharray: 2000,
    strokeDashoffset: 2000,
    ease: 'none',
    scrollTrigger: {
      trigger,
      start,
      end,
      scrub: prefersReduced ? false : scrub,
      once: prefersReduced,
    },
  })
}

export { gsap, ScrollTrigger }
