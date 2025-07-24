import { useState } from 'react'

export default function WhyExists() {
  const [activeChallenge, setActiveChallenge] = useState<number | null>(null)

  const challenges = [
    {
      title: "Drive pipeline and hit revenue targets",
      icon: "📈",
      description: "Every quarter, the pressure mounts to deliver measurable results that directly impact the bottom line."
    },
    {
      title: "Stay ahead of AI and MarTech shifts", 
      icon: "🤖",
      description: "The technology landscape evolves daily, and staying current while implementing effectively is crucial."
    },
    {
      title: "Build high-performing teams with lean budgets",
      icon: "👥", 
      description: "Do more with less while maintaining quality and keeping your team motivated and engaged."
    },
    {
      title: "Justify every dollar to a CFO who doesn't speak marketing",
      icon: "💰",
      description: "Translate marketing impact into financial language that resonates with executive leadership."
    }
  ]

  return (
    <section id="about" className="why-exists-section">
      <div className="container">
        <div className="why-exists-content">
          <div className="section-intro">
            <h2 className="section-title">Why Growth Authority Exists</h2>
            <div className="problem-statement">
              <p className="lead-text">Marketing has changed, and CMOs are under pressure.</p>
              <div className="pressure-points">
                <span className="pressure-point">The AI curve.</span>
                <span className="pressure-point">The attribution challenge.</span>
                <span className="pressure-point">The ROI pressure.</span>
              </div>
            </div>
          </div>

          <div className="challenges-section">
            <h3 className="challenges-title">You're expected to:</h3>
            <div className="challenges-grid">
              {challenges.map((challenge, index) => (
                <div
                  key={index}
                  className={`challenge-card ${activeChallenge === index ? 'active' : ''}`}
                  onMouseEnter={() => setActiveChallenge(index)}
                  onMouseLeave={() => setActiveChallenge(null)}
                >
                  <div className="challenge-icon">{challenge.icon}</div>
                  <h4 className="challenge-title">{challenge.title}</h4>
                  <p className="challenge-description">{challenge.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="solution-section">
            <div className="solution-content">
              <h3 className="solution-title">We built Growth Authority because there was no place for ambitious marketing leaders to learn what works and get the tools to execute it quickly.</h3>
              <div className="choice-statement">
                <p>You can try to figure it out alone</p>
                <div className="or-divider">
                  <span>or</span>
                </div>
                <p className="highlighted-choice">Build alongside peers, doing the work, sharing the systems, and growing with you.</p>
              </div>
              <button className="cta-button">Join Growth Authority</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 