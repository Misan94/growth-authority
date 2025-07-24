import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isTextHover, setIsTextHover] = useState(false)

  useEffect(() => {
    let animationId: number

    const updateCursor = (e: MouseEvent) => {
      animationId = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        if (!isVisible) setIsVisible(true)
      })
    }

    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Handle hover states for interactive elements
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      // Check for interactive elements
      const isInteractive = target.matches(
        'a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, .btn-outline, .hamburger, .social-link, .tab-button, .criteria-card, .benefit-category, .challenge-card, .faq-item, .testimonial-card, .service-card'
      )
      
      // Check for text elements
      const isText = target.matches(
        'h1, h2, h3, h4, h5, h6, p, span, div, .hero-title, .section-title, .brand-name, .typewriter-text'
      )
      
      setIsHovering(isInteractive)
      setIsTextHover(isText && !isInteractive)
    }

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [isVisible])

  return (
    <>
      <div
        className={`custom-cursor ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''} ${isTextHover ? 'text-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-dot"></div>
      </div>
      <div
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''} ${isTextHover ? 'text-hover' : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div className="cursor-ring"></div>
      </div>
    </>
  )
} 