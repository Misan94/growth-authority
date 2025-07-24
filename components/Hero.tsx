import { useEffect, useState } from 'react'

export default function Hero() {
  const [isClient, setIsClient] = useState(false)
  const [currentText, setCurrentText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const words = ['Growth', 'Revenue', 'Acquisition', 'Retention']

  useEffect(() => {
    setIsClient(true)
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
    // Fade in the video once it's ready to play
    e.currentTarget.style.opacity = '1'
  }

  if (!isClient) return null

  return (
    <section className="hero">
      <div className="hero-video-container">
        <video 
          className="hero-video"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onCanPlay={handleVideoLoad}
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