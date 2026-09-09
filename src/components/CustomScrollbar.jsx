import { useEffect, useRef, useState } from 'react'

export default function CustomScrollbar() {
  const thumbRef = useRef(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    // Hide on touch screens
    if (window.matchMedia('(pointer: coarse)').matches) return
    setShow(true)

    const updateScroll = () => {
      if (!thumbRef.current) return
      const scrollY = window.scrollY || document.documentElement.scrollTop
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0
      
      // Update transform (scaleY) for performance
      thumbRef.current.style.transform = `scaleY(${progress})`
    }

    // Sync via native scroll or Lenis
    window.addEventListener('scroll', updateScroll, { passive: true })
    
    // Check if lenis is active globally
    const onLenisScroll = () => updateScroll()
    if (window.lenis) {
      window.lenis.on('scroll', onLenisScroll)
    } else {
      // Fallback check if it mounts slightly after
      setTimeout(() => {
        if (window.lenis) window.lenis.on('scroll', onLenisScroll)
      }, 500)
    }

    // Initial call
    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
      if (window.lenis) window.lenis.off('scroll', onLenisScroll)
    }
  }, [])

  if (!show) return null

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        right: '12px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '4px',
        height: '35vh',
        background: 'color-mix(in srgb, var(--bg-elev-2) 60%, transparent)',
        borderRadius: '99px',
        zIndex: 9998,
        overflow: 'hidden',
      }}
    >
      <div
        ref={thumbRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'var(--accent-2)', // Using mint green like the image
          transformOrigin: 'top',
          transform: 'scaleY(0)',
          willChange: 'transform',
        }}
      />
    </div>
  )
}
