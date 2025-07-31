import { useEffect, useState } from 'react'

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [videoCanPlay, setVideoCanPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  const words = ['Growth', 'Revenue', 'Retention']

  useEffect(() => {
    setIsClient(true)
    
    // Detect mobile devices
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      const isMobileDevice = mobileRegex.test(userAgent) || window.innerWidth <= 768
      setIsMobile(isMobileDevice)
      
      // On mobile, assume video might not autoplay
      if (isMobileDevice) {
        setVideoCanPlay(false)
      }
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!isClient) return

    const typeSpeed = 150
    const deleteSpeed = 100
    const pauseTime = 2000

    const type = () => {
      const currentWord = words[currentIndex]
      
      if (isDeleting) {
        setCurrentText(currentWord.substring(0, currentText.length - 1))
        
        if (currentText === '') {
          setIsDeleting(false)
          setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length)
        }
      } else {
        setCurrentText(currentWord.substring(0, currentText.length + 1))
        
        if (currentText === currentWord) {
          setTimeout(() => setIsDeleting(true), pauseTime)
          return
        }
      }
    }

    const timer = setTimeout(type, isDeleting ? deleteSpeed : typeSpeed)
    
    return () => clearTimeout(timer)
  }, [currentText, currentIndex, isDeleting, isClient, words])

  const handleWaitlistClick = () => {
    // Add loading state and waitlist functionality
    console.log('Waitlist signup clicked')
    // In a real app, this would handle the waitlist signup
  }

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // Image loaded successfully
    setVideoCanPlay(true) // Using same state name for consistency
  }
  
  const handleImageError = () => {
    // Image failed to load, use fallback
    console.log('Hero image failed to load, showing fallback background')
    setVideoCanPlay(false)
  }

  if (!isClient) return null

  return (
    <section className="hero">
      <div className="hero-video-container">
        {/* Fallback background - hidden by default since image loads reliably */}
        <div className={`hero-fallback-bg ${!videoCanPlay ? 'active' : ''}`}></div>
        
        {/* Image background - displays on all devices */}
        <img 
          className={`hero-image ${videoCanPlay ? 'loaded' : ''}`}
          src="https://cdn.midjourney.com/414ce1ca-d9b3-48e4-95ce-2136baeaac8a/0_0.png"
          alt="Growth Authority Hero Background"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            The <em>Private Membership</em> for CMOs and Marketing Leaders Who Drive{' '}
            <span className="typewriter-text">
              {currentText}
            </span>
          </h1>
          <p className="hero-subtitle">
            Join the private community of marketing leaders mastering AI, scaling performance, and turning marketing into a revenue engine.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={handleWaitlistClick}>
              Join the waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 