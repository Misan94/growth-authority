import { useState } from 'react'

export default function WhatYouGet() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  const categories = [
    {
      title: "Content & Resources",
      icon: "📚",
      color: "gradient-primary",
      benefits: [
        "Weekly insights on marketing strategy, AI, and performance",
        "Proven toolkits, templates, and dashboards - ready to use",
        "Playbooks for attribution, creative ops, team structure, and media mix",
        "Exclusive behind-the-scenes from premium growth strategies"
      ]
    },
    {
      title: "Community & Support", 
      icon: "🤝",
      color: "gradient-secondary",
      benefits: [
        "Access to a private member-only group",
        "Monthly live sessions, audits, and expert drop-ins",
        "Networking opportunities with marketing leaders",
        "1:1 Peer Matching for targeted mentorship"
      ]
    },
    {
      title: "Tools & Career Growth",
      icon: "🚀", 
      color: "gradient-primary",
      benefits: [
        "Early access to our SaaS tools + prompt libraries",
        "Job Listings for Marketing Leaders",
        "Extensive PR Exposure to build your personal brand",
        "Help CMOs advance careers or hire effectively"
      ]
    },
    {
      title: "Exclusive Experiences",
      icon: "👑",
      color: "gradient-secondary", 
      benefits: [
        "High-Impact Exclusive Events and CMO dinners",
        "Forums and visionaries' sessions",
        "Thought leadership opportunities",
        "Future trends and strategic insights"
      ]
    }
  ]

  return (
    <section id="benefits" className="what-you-get-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What You'll Get Inside</h2>
          <p className="section-subtitle">
            Inside Growth Authority, you get everything designed to save you time, boost your impact, and hit your KPIs:
          </p>
        </div>

        <div className="benefits-grid">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`benefit-category ${activeCategory === index ? 'active' : ''}`}
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.title}</h3>
              </div>
              <div className="benefits-list">
                {category.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="benefit-item">
                    <div className="benefit-check">✓</div>
                    <p className="benefit-text">{benefit}</p>
                  </div>
                ))}
              </div>
              <div className="category-overlay"></div>
            </div>
          ))}
        </div>

        <div className="bottom-cta">
          <div className="cta-content">
            <h3>Everything is designed to save you time, boost your impact, and hit your KPIs</h3>
            <button className="primary-cta-btn">Get Full Access Now</button>
          </div>
        </div>
      </div>
    </section>
  )
} 