import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const cursor = cursorRef.current
    if (!cursor) return

    const xSet = gsap.quickSetter(cursor, 'x', 'px')
    const ySet = gsap.quickSetter(cursor, 'y', 'px')

    const onMove = (e) => {
      xSet(e.clientX)
      ySet(e.clientY)
    }

    const onPointerDown = () => gsap.to(cursor, { scale: 0.85, duration: 0.15 })
    const onPointerUp = () => gsap.to(cursor, { scale: 1, duration: 0.2 })

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 99999,
        // offset to map SVG tip to the exact cursor target point
        marginLeft: '-1px', marginTop: '-1px',
        filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.4))'
      }}
    >
      <svg width="24" height="28" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 2.5L20.5 10.5L12 13L9 24L2.5 2.5Z" fill="#FFFFFF" stroke="#111111" strokeWidth="2" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}
