import { useState, useEffect } from 'react'

interface FormData {
  // About You section only
  firstName: string
  lastName: string
  workEmail: string
  phoneNumber: string
  linkedinProfile: string
}

export default function WaitlistForm() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    linkedinProfile: ''
  })
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')
  
  // Video background state
  const [videoCanPlay, setVideoCanPlay] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleVideoCanPlay = () => {
    setVideoCanPlay(true)
  }

  const handleVideoError = () => {
    console.log('Video failed to load, showing fallback background')
    setVideoCanPlay(false)
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Don't submit if already submitting
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)
      setSubmissionStatus('idle')
      
      console.log('Submitting form data:', formData)
      
      const response = await fetch('/api/submit-waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (result.success) {
        setSubmissionStatus('success')
        setStatusMessage(result.message)
        
        // Log Circle.so integration status
        if (result.circleIntegration?.success) {
          console.log('✅ Successfully added to Circle community')
        } else {
          console.log('⚠️ Circle integration status:', result.circleIntegration)
        }
        
        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            workEmail: '',
            phoneNumber: '',
            linkedinProfile: ''
          })
          setSubmissionStatus('idle')
          setStatusMessage('')
        }, 5000) // Reset after 5 seconds
        
      } else {
        setSubmissionStatus('error')
        setStatusMessage(result.message || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmissionStatus('error')
      setStatusMessage('Network error. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show success message if submission was successful
  if (submissionStatus === 'success') {
    return (
      <section id="waitlist" className="waitlist-form-section">
        {/* Video Background */}
        <div className="waitlist-video-container">
          <div className={`waitlist-fallback-bg ${!videoCanPlay || isMobile ? 'active' : ''}`}></div>
          
          <video 
            className={`waitlist-video ${videoCanPlay ? 'loaded' : ''}`}
            autoPlay={!isMobile}
            loop
            muted
            playsInline
            webkit-playsinline="true"
            preload={isMobile ? "none" : "metadata"}
            onCanPlay={handleVideoCanPlay}
            onError={handleVideoError}
            onLoadStart={() => !isMobile && setVideoCanPlay(true)}
          >
            <source src="https://cdn.midjourney.com/video/5f8f95c6-3cce-4bb0-bc29-f211a6ed1a78/0.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        
        <div className="container">
          <div className="form-header">
            <h2>Thank You!</h2>
            <div className="success-message">
              <div className="success-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M22 4L12 14.01l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>{statusMessage}</p>
              <p>You'll hear from us soon with next steps.</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (!isClient) return null

  return (
    <section id="waitlist" className="waitlist-form-section">
      {/* Video Background */}
      <div className="waitlist-video-container">
        <div className={`waitlist-fallback-bg ${!videoCanPlay || isMobile ? 'active' : ''}`}></div>
        
        <video 
          className={`waitlist-video ${videoCanPlay ? 'loaded' : ''}`}
          autoPlay={!isMobile}
          loop
          muted
          playsInline
          webkit-playsinline="true"
          preload={isMobile ? "none" : "metadata"}
          onCanPlay={handleVideoCanPlay}
          onError={handleVideoError}
          onLoadStart={() => !isMobile && setVideoCanPlay(true)}
        >
          <source src="https://cdn.midjourney.com/video/5f8f95c6-3cce-4bb0-bc29-f211a6ed1a78/0.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="container">
        <div className="form-header">
          <h2>Join the Growth Authority Waitlist</h2>
          <p>Enter your details below to join our exclusive community of marketing leaders.</p>
        </div>

        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-content">
            <div className="form-step">
              <h3>Tell Us About You</h3>
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="workEmail">Work Email *</label>
                  <input
                    type="email"
                    id="workEmail"
                    value={formData.workEmail}
                    onChange={(e) => handleInputChange('workEmail', e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="linkedinProfile">LinkedIn Profile</label>
                <input
                  type="url"
                  id="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>
            </div>
          </div>

          {/* Show error message if submission failed */}
          {submissionStatus === 'error' && (
            <div className="error-message">
              <div className="error-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M15 9l-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 9l6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p>{statusMessage}</p>
            </div>
          )}

          <div className="form-submit">
            <button 
              type="submit" 
              className="btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Joining...' : 'Join Waitlist'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
