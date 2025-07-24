import { useEffect, useState } from 'react'

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [videoCanPlay, setVideoCanPlay] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  const words = ['Growth', 'Revenue', 'Acquisition', 'Retention']

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

  const handleVideoLoad = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    
    // Try to play the video
    const playPromise = video.play()
    
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Video started playing successfully
          setVideoCanPlay(true)
          video.style.opacity = '1'
        })
        .catch((error) => {
          // Auto-play was prevented, use fallback
          console.log('Video autoplay prevented:', error)
          setVideoCanPlay(false)
          video.style.display = 'none'
        })
    }
  }
  
  const handleVideoError = () => {
    // Video failed to load, use fallback
    setVideoCanPlay(false)
  }
  
  const handleVideoCanPlay = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget
    
    // For mobile devices, don't auto-fade in the video
    if (!isMobile) {
      handleVideoLoad(e)
    } else {
      // On mobile, try to play but expect it might fail
      const playPromise = video.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setVideoCanPlay(false)
          video.style.display = 'none'
        })
      }
    }
  }

  const handleHeroClick = () => {
    if (isMobile && !videoCanPlay) {
      const video = document.querySelector('.hero-video') as HTMLVideoElement
      if (video) {
        video.style.display = 'block'
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setVideoCanPlay(true)
              video.style.opacity = '1'
            })
            .catch(() => {
              video.style.display = 'none'
            })
        }
      }
    }
  }

  if (!isClient) return null

  return (
    <section className="hero" onClick={handleHeroClick}>
      <div className="hero-video-container">
        {/* Fallback background for mobile/when video fails */}
        <div className={`hero-fallback-bg ${!videoCanPlay || isMobile ? 'active' : ''}`}></div>
        
        {/* Video background - optimized for mobile */}
        <video 
          className="hero-video"
          autoPlay={!isMobile}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload={isMobile ? "none" : "metadata"}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          onLoadStart={() => !isMobile && setVideoCanPlay(true)}
        >
          <source src="https://cdn.midjourney.com/video/fb2bc20f-5561-4917-b02d-021627ee4e56/1.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            The <em>Private Membership</em> for CMOs and Leaders Who Drive{' '}
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