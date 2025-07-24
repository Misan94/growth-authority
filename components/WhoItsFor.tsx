import { useState } from 'react'

export default function WhoItsFor() {
  const [activeTab, setActiveTab] = useState<'for' | 'not-for'>('for')

  const whoItsFor = [
    {
      text: "You're the marketing leader who gets the call when revenue misses or hits.",
      icon: "📞",
      color: "var(--primary-color)"
    },
    {
      text: "You own pipeline, targets, and team performance, not just \"brand awareness.\"",
      icon: "🎯",
      color: "var(--secondary-color)"
    },
    {
      text: "You're done with vague \"thought leadership\" and need clear, proven systems that work.",
      icon: "⚡",
      color: "var(--primary-color)"
    },
    {
      text: "You're looking to use AI, analytics, and creatives in ways that drive business results.",
      icon: "🤖",
      color: "var(--secondary-color)"
    },
    {
      text: "You value honest community, speed, and clarity over recycled advice and empty noise.",
      icon: "💎",
      color: "var(--primary-color)"
    }
  ]

  const whoItsNotFor = [
    {
      text: "Marketers looking for entry-level tips or basic tutorials",
      icon: "🚫",
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Anyone chasing vanity metrics, viral trends, or industry buzzwords",
      icon: "📈",
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Theory-obsessed strategists who never get their hands dirty",
      icon: "📚",
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Passive lurkers: This is an active, high-signal space",
      icon: "👁️",
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "People who prefer to learn in isolation, or aren't open to honest peer feedback",
      icon: "🔒",
      color: "rgba(239, 68, 68, 0.8)"
    }
  ]

  return (
    <section id="membership" className="who-its-for-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Is Growth Authority Right for You?</h2>
          <p className="section-subtitle">
            We're built for serious marketing leaders who drive results, not just impressions.
          </p>
        </div>

        <div className="tab-switcher">
          <button 
            className={`tab-button ${activeTab === 'for' ? 'active' : ''}`}
            onClick={() => setActiveTab('for')}
          >
            <span className="tab-icon">✅</span>
            <span className="tab-text">Who It's For</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'not-for' ? 'active' : ''}`}
            onClick={() => setActiveTab('not-for')}
          >
            <span className="tab-icon">❌</span>
            <span className="tab-text">Who It's Not For</span>
          </button>
        </div>

        <div className="content-container">
          {activeTab === 'for' && (
            <div className="content-panel for-panel">
              <div className="panel-header">
                <h3>Growth Authority is for you if:</h3>
              </div>
              <div className="criteria-grid">
                {whoItsFor.map((item, index) => (
                  <div 
                    key={index} 
                    className="criteria-card positive"
                    style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="card-icon" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <p className="card-text">{item.text}</p>
                    <div className="card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'not-for' && (
            <div className="content-panel not-for-panel">
              <div className="panel-header">
                <h3>Growth Authority is not for...</h3>
              </div>
              <div className="criteria-grid">
                {whoItsNotFor.map((item, index) => (
                  <div 
                    key={index} 
                    className="criteria-card negative"
                    style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                  >
                    <div className="card-icon" style={{ color: item.color }}>
                      {item.icon}
                    </div>
                    <p className="card-text">{item.text}</p>
                    <div className="card-glow"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="bottom-cta">
          <div className="cta-content">
            <h3>Ready to join serious marketing leaders?</h3>
            <p>If you nodded along to the "Who It's For" section, you'll fit right in.</p>
            <button className="primary-cta-btn">
              Join the Waitlist
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 