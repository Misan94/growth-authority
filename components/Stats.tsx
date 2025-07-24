import { useEffect, useRef, useState } from 'react'

interface StatItemProps {
  target: number
  suffix: string
  label: string
}

function StatItem({ target, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          const duration = 2000
          const steps = 60
          const stepValue = target / steps
          const stepDuration = duration / steps
          
          let currentStep = 0
          const timer = setInterval(() => {
            currentStep++
            setCount(Math.floor(stepValue * currentStep))
            
            if (currentStep >= steps) {
              setCount(target)
              clearInterval(timer)
            }
          }, stepDuration)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target, hasAnimated])

  return (
    <div className="stat-item" ref={ref}>
      <h3>{count}{suffix}</h3>
      <p>{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <StatItem target={300} suffix="k+" label="Community members" />
          <StatItem target={40} suffix="+" label="Certifications" />
          <StatItem target={5} suffix="k+" label="Event attendees" />
        </div>
      </div>
    </section>
  )
} 