import { useState } from 'react'

export default function Welcome() {
  const [videoPlayed, setVideoPlayed] = useState(false)

  const handleVideoClick = () => {
    setVideoPlayed(true)
  }

  return (
    <section className="welcome-section">
      <div className="container">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>Welcome to the community...</h2>
            <p>Our mission is simple: to elevate the role of growth marketing and redefine the way companies access education and scale. Join our VP of Community for a quick tour of the community.</p>
            <button 
              className="btn-primary"
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
              Join the community
            </button>
          </div>
          <div className="welcome-video">
            <div className="video-placeholder" onClick={handleVideoClick}>
              {videoPlayed ? (
                <div style={{ color: 'var(--primary-color)', fontSize: '1.2rem' }}>
                  Video would play here
                </div>
              ) : (
                <div className="play-button">▶</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 