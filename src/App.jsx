import { useEffect, useState } from 'react'
import { useGSAP as useGSAPHook } from '@gsap/react'
import gsap from 'gsap'
import { initLenis } from '@/motion/gsapConfig'
import LoadingScreen from '@/components/LoadingScreen'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import SpotlightGrid from '@/components/SpotlightGrid'
import SecondaryGrid from '@/components/SecondaryGrid'
import About from '@/components/About'
import SkillsCloud from '@/components/SkillsCloud'
import GithubActivity from '@/components/GithubActivity'
import WorkExperience from '@/components/WorkExperience'
import Education from '@/components/Education'
import Beyond from '@/components/Beyond'
import Contact from '@/components/Contact'
import CustomCursor from '@/components/CustomCursor'
import CustomScrollbar from '@/components/CustomScrollbar'
import Footer from '@/components/Footer'

gsap.registerPlugin(useGSAPHook)

export default function App() {
  const [navRevealed, setNavRevealed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    let lenis = null
    if (loaded) {
      initLenis().then(l => { 
        lenis = l
        // Bind to window for easy access
        window.lenis = l 
      })
    }
    return () => { 
      if (lenis) {
        lenis.destroy()
        window.lenis = null
      }
    }
  }, [loaded])

  useEffect(() => {
    if (!loaded) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [loaded])

  return (
    <>
      <CustomCursor />
      <CustomScrollbar />
      <Nav revealed={navRevealed} />

      {!loaded && (
        <LoadingScreen
          onReachNav={() => setNavRevealed(true)}
          onDone={() => setLoaded(true)}
        />
      )}

      {/* Main Home Page content is permanently mounted underneath */}
      <div style={{ opacity: 1, visibility: 'visible' }}>
        <a href="#home" className="skip-link">Skip to main content</a>
        <main id="main-content">
          <Hero />
          <SpotlightGrid />
          <SecondaryGrid />
          <SkillsCloud />
          <About />
          <GithubActivity />
          <WorkExperience />
          <Education />
          <Beyond />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}