import { useEffect, useState, useRef } from 'react'

export default function CustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const followerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }

    const animateFollower = () => {
      const dx = cursorPosition.x - followerRef.current.x
      const dy = cursorPosition.y - followerRef.current.y
      
      followerRef.current.x += dx * 0.1
      followerRef.current.y += dy * 0.1
      
      setFollowerPosition({
        x: followerRef.current.x,
        y: followerRef.current.y
      })
      
      animationRef.current = requestAnimationFrame(animateFollower)
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
        'a, button, input, textarea, select, [role="button"], .btn-primary, .btn-secondary, .btn-outline, .hamburger, .social-link, .tab-button, .who-card, .benefit-category, .challenge-card, .faq-item, .testimonial-card, .service-card'
      )
      
      setIsHovering(isInteractive)
    }

    document.addEventListener('mousemove', updateCursor)
    document.addEventListener('mousemove', handleElementHover)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)

    animationRef.current = requestAnimationFrame(animateFollower)

    return () => {
      document.removeEventListener('mousemove', updateCursor)
      document.removeEventListener('mousemove', handleElementHover)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [cursorPosition.x, cursorPosition.y, isVisible])

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`cursor-dot ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      />
      
      {/* Following circle */}
      <div
        className={`cursor-follower ${isVisible ? 'visible' : ''} ${isClicking ? 'clicking' : ''} ${isHovering ? 'hovering' : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
        }}
      />
    </>
  )
} 