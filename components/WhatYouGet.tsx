import { useState, useEffect } from 'react'

export default function WhatYouGet() {
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const benefits = [
    {
      number: "01",
      title: "Content & Resources",
      description: "Weekly insights, proven toolkits, playbooks for attribution and team structure, plus exclusive behind-the-scenes growth strategies.",
      features: [
        "Weekly growth insights & case studies",
        "Proven marketing toolkits & frameworks", 
        "Attribution & team structure playbooks",
        "Behind-the-scenes growth strategies"
      ],
      imagePlaceholder: "content-resources-visual.jpg"
    },
    {
      number: "02", 
      title: "Community & Support",
      description: "Private member group, monthly live sessions with experts, networking with marketing leaders, and 1:1 peer matching.",
      features: [
        "Private CMO community access",
        "Monthly expert-led live sessions",
        "Marketing leader networking events", 
        "1:1 peer matching program"
      ],
      imagePlaceholder: "community-support-visual.jpg"
    },
    {
      number: "03",
      title: "Tools & Career Growth", 
      description: "Early access to SaaS tools, job listings for marketing leaders, PR exposure opportunities, and career advancement support.",
      features: [
        "Early access to cutting-edge SaaS tools",
        "Exclusive marketing leadership job board",
        "PR exposure & thought leadership opportunities",
        "Career advancement mentorship"
      ],
      imagePlaceholder: "tools-career-visual.jpg"
    },
    {
      number: "04",
      title: "Exclusive Experiences",
      description: "High-impact events, CMO dinners, visionary forums, thought leadership opportunities, and strategic insights.",
      features: [
        "High-impact industry events",
        "Intimate CMO dinner experiences", 
        "Visionary leadership forums",
        "Strategic partnership opportunities"
      ],
      imagePlaceholder: "exclusive-experiences-visual.jpg"
    }
  ]

  // Auto-loop functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => 
        prevIndex === benefits.length - 1 ? 0 : prevIndex + 1
      )
    }, 10000) // 10 seconds

    return () => clearInterval(interval)
  }, [benefits.length])

  return (
    <section id="benefits" className="what-you-get-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What You'll Get Inside</h2>
          <p className="section-subtitle">
            Inside Growth Authority, you get everything designed to save you time, boost your impact, and hit your KPIs:
          </p>
        </div>

        <div className="showcase-container">
          {/* Main Showcase Area */}
          <div className="showcase-main">
            <div className="showcase-image">
              {activeIndex === 0 ? (
                <img 
                  src="/content-and-resources.png" 
                  alt="Content & Resources"
                  className="benefit-showcase-img"
                />
              ) : activeIndex === 1 ? (
                <img 
                  src="/community.png" 
                  alt="Community & Support"
                  className="benefit-showcase-img"
                />
              ) : activeIndex === 2 ? (
                <img 
                  src="/career-growth.png" 
                  alt="Tools & Career Growth"
                  className="benefit-showcase-img"
                />
              ) : activeIndex === 3 ? (
                <img 
                  src="/events.png" 
                  alt="Exclusive Experiences"
                  className="benefit-showcase-img"
                />
              ) : (
                <div className="image-placeholder">
                  <span className="placeholder-text">📸 {benefits[activeIndex].imagePlaceholder}</span>
                  <div className="placeholder-overlay">
                    <span className="placeholder-icon">🖼️</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="showcase-content">
              <div className="showcase-number">{benefits[activeIndex].number}</div>
              <h3 className="showcase-title">{benefits[activeIndex].title}</h3>
              <p className="showcase-description">{benefits[activeIndex].description}</p>
              
              <ul className="showcase-features">
                {benefits[activeIndex].features.map((feature, index) => (
                  <li key={index} className="feature-item">
                    <span className="feature-icon">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Interactive Menu List */}
          <div className="showcase-menu">
            <h4 className="menu-title">Benefits Overview</h4>
            <div className="menu-list">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className={`menu-item ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="menu-number">{benefit.number}</div>
                  <div className="menu-content">
                    <h5 className="menu-item-title">{benefit.title}</h5>
                    <div className="menu-indicator">
                      <span className="indicator-arrow">→</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-cta">
          <div className="cta-content">
            <h3>Everything is designed to save you time, boost your impact, and hit your KPIs</h3>
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
              Get Full Access Now
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 