import { useState, useEffect, useRef } from 'react'

export default function WhoItsFor() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isScrollPaused, setIsScrollPaused] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const whoItsFor = [
    {
      title: "Revenue Accountability",
      text: "You're the marketing leader who gets the call when revenue misses or hits.",
      image: "/revenue-accountability.png",
      category: "Leadership"
    },
    {
      title: "Performance Ownership",
      text: "You own pipeline, targets, and team performance, not just \"brand awareness.\"",
      image: "/performance-ownership.png",
      category: "Results"
    },
    {
      title: "Proven Systems",
      text: "You're done with vague \"thought leadership\" and need clear, proven systems that work.",
      image: "/proven-systems.png",
      category: "Strategy"
    },
    {
      title: "AI & Analytics Focus",
      text: "You're looking to use AI, analytics, and creatives in ways that drive business results.",
      image: "/AI-and-Analytics-Focused.png",
      category: "Technology"
    },
    {
      title: "Quality Community",
      text: "You value honest community, speed, and clarity over recycled advice and empty noise.",
      image: "/Quality-community.png",
      category: "Community"
    }
  ]

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Auto-scroll functionality for mobile
  useEffect(() => {
    if (!isMobile || !scrollContainerRef.current || isScrollPaused) return

    const container = scrollContainerRef.current
    const cardWidth = 276 // Card width (260px) + gap (16px)
    const originalSetWidth = cardWidth * whoItsFor.length
    let scrollPosition = container.scrollLeft
    
    const autoScroll = () => {
      if (isScrollPaused) return
      
      scrollPosition += 0.5 // Slower, smoother scrolling
      
      // When we've scrolled past the original set, reset seamlessly
      if (scrollPosition >= originalSetWidth) {
        container.scrollLeft = 0
        scrollPosition = 0
      } else {
        container.scrollLeft = scrollPosition
      }
    }

    const interval = setInterval(autoScroll, 20) // 20ms for very smooth scrolling
    
    return () => clearInterval(interval)
  }, [isMobile, whoItsFor.length, isScrollPaused])

  return (
    <section id="membership" className="who-its-for-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Is Growth Authority Right for You?</h2>
          <p className="section-subtitle">
            We're built for serious marketing leaders who drive results, not just impressions.
          </p>
        </div>

        <div 
          ref={scrollContainerRef}
          className={`who-cards-grid ${isMobile ? 'mobile-scroll' : ''}`}
          onTouchStart={() => isMobile && setIsScrollPaused(true)}
          onTouchEnd={() => isMobile && setTimeout(() => setIsScrollPaused(false), 3000)}
          onMouseEnter={() => isMobile && setIsScrollPaused(true)}
          onMouseLeave={() => isMobile && setIsScrollPaused(false)}
        >
          {(isMobile ? [...whoItsFor, ...whoItsFor] : whoItsFor).map((item, index) => (
            <div 
              key={isMobile ? `${index}-${index >= whoItsFor.length ? 'duplicate' : 'original'}` : index}
              className={`who-card ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => !isMobile && setHoveredCard(index)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              style={{ '--delay': `${index * 0.15}s` } as React.CSSProperties}
            >
              <div className="card-image-container">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="card-image"
                />
                <div className="image-overlay">
                  <span className="category-badge">{item.category}</span>
        </div>
                <div className="card-hover-effect"></div>
              </div>
              
              <div className="card-content">
                <h3 className="card-title">{item.title}</h3>
                <p className="card-description">{item.text}</p>
                
                <div className="card-footer">
                  <div className="check-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <span className="perfect-fit-text">Perfect fit</span>
                </div>
              </div>
              
                    <div className="card-glow"></div>
                  </div>
                ))}
        </div>

        <div className="bottom-cta">
          <div className="cta-content">
            <h3>Ready to join serious marketing leaders?</h3>
            <p>If you nodded along to these descriptions, you'll fit right in.</p>
            <button 
              className="primary-cta-btn" 
              onClick={() => {
                const waitlistElement = document.getElementById('waitlist')
                if (waitlistElement) {
                  waitlistElement.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  })
                }
              }}
            >
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 