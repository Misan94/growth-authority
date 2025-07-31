import { useState } from 'react'

export default function WhoItsFor() {
  const [activeTab, setActiveTab] = useState<'for' | 'not-for'>('for')

  const whoItsFor = [
    {
      text: "You're the marketing leader who gets the call when revenue misses or hits.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "var(--primary-color)"
    },
    {
      text: "You own pipeline, targets, and team performance, not just \"brand awareness.\"",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "var(--secondary-color)"
    },
    {
      text: "You're done with vague \"thought leadership\" and need clear, proven systems that work.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "var(--primary-color)"
    },
    {
      text: "You're looking to use AI, analytics, and creatives in ways that drive business results.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 7v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 16l1-1 1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 16l-1-1-1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "var(--secondary-color)"
    },
    {
      text: "You value honest community, speed, and clarity over recycled advice and empty noise.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 3h12l4 6-10 13L2 9l4-6z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M11 3L8 9l4 13 4-13-3-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "var(--primary-color)"
    }
  ]

  const whoItsNotFor = [
    {
      text: "Marketers looking for entry-level tips or basic tutorials",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Anyone chasing vanity metrics, viral trends, or industry buzzwords",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3v18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M9 9l3 3l5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 13l2 2l4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Theory-obsessed strategists who never get their hands dirty",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 7h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 11h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "Passive lurkers: This is an active, high-signal space",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 15L21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      color: "rgba(239, 68, 68, 0.8)"
    },
    {
      text: "People who prefer to learn in isolation, or aren't open to honest peer feedback",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="12" cy="16" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
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
            <span className="tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="tab-text">Who It's For</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'not-for' ? 'active' : ''}`}
            onClick={() => setActiveTab('not-for')}
          >
            <span className="tab-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
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