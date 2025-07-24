import { useState } from 'react'

interface FormData {
  // Section 1: About You
  firstName: string
  lastName: string
  workEmail: string
  phoneNumber: string
  linkedinProfile: string
  
  // Section 2: About Your Company
  jobTitle: string
  companyName: string
  companyWebsite: string
  companySize: string
  marketingTeamSize: string
  
  // Section 3: Role & Responsibility
  revenueResponsible: string
  budgetInvolvement: string
  
  // Section 4: Challenges & Priorities
  marketingChallenges: string[]
  priorities: string[]
  
  // Section 5: Personalization & Proof
  biggestAchievement: string
  hopeToGain: string
}

export default function WaitlistForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    linkedinProfile: '',
    jobTitle: '',
    companyName: '',
    companyWebsite: '',
    companySize: '',
    marketingTeamSize: '',
    revenueResponsible: '',
    budgetInvolvement: '',
    marketingChallenges: [],
    priorities: [],
    biggestAchievement: '',
    hopeToGain: ''
  })

  const totalSteps = 5

  const challengeOptions = [
    'Proving marketing ROI',
    'Sales & C-suite alignment',
    'MarTech complexity',
    'AI adoption & integration',
    'Team development/retention',
    'Budget constraints',
    'Brand building',
    'Lead generation',
    'Balancing short-term vs. long-term growth',
    'Burnout / wellness',
    'Other (please specify)'
  ]

  const priorityOptions = [
    'Revenue growth & pipeline',
    'Optimizing MarTech stack',
    'AI/automation in marketing',
    'Expanding into new markets',
    'Customer retention & advocacy',
    'Content/Thought leadership',
    'Team upskilling',
    'Proving ROI to the C-suite',
    'Brand repositioning',
    'Building community/advocacy',
    'Other (please specify)'
  ]

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleMultiSelect = (field: 'marketingChallenges' | 'priorities', option: string) => {
    const currentValues = formData[field]
    if (currentValues.includes(option)) {
      handleInputChange(field, currentValues.filter(item => item !== option))
    } else if (currentValues.length < 3) {
      handleInputChange(field, [...currentValues, option])
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="form-step">
            <h3>About You</h3>
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
              <div className="form-group full-width">
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
                <label htmlFor="phoneNumber">Phone Number *</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="linkedinProfile">LinkedIn Profile *</label>
                <input
                  type="url"
                  id="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  placeholder="https://linkedin.com/in/yourprofile"
                  required
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="form-step">
            <h3>About Your Company</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="jobTitle">Current Job Title *</label>
                <input
                  type="text"
                  id="jobTitle"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  placeholder="e.g., CMO, VP Marketing"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="companyName">Company Name *</label>
                <input
                  type="text"
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  required
                />
              </div>
              <div className="form-group full-width">
                <label htmlFor="companyWebsite">Company Website *</label>
                <input
                  type="url"
                  id="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                  placeholder="https://yourcompany.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="companySize">Company Size *</label>
                <select
                  id="companySize"
                  value={formData.companySize}
                  onChange={(e) => handleInputChange('companySize', e.target.value)}
                  required
                >
                  <option value="">Select size</option>
                  <option value="1-10">1–10</option>
                  <option value="11-50">11–50</option>
                  <option value="51-200">51–200</option>
                  <option value="201-500">201–500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="marketingTeamSize">Marketing Team Size *</label>
                <select
                  id="marketingTeamSize"
                  value={formData.marketingTeamSize}
                  onChange={(e) => handleInputChange('marketingTeamSize', e.target.value)}
                  required
                >
                  <option value="">Select size</option>
                  <option value="Solo">Solo</option>
                  <option value="2-5">2–5</option>
                  <option value="6-15">6–15</option>
                  <option value="16-30">16–30</option>
                  <option value="30+">30+</option>
                </select>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="form-step">
            <h3>Role & Responsibility</h3>
            <div className="form-group">
              <label>Are you directly responsible for revenue or pipeline targets? *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="revenueResponsible"
                    value="Yes"
                    checked={formData.revenueResponsible === 'Yes'}
                    onChange={(e) => handleInputChange('revenueResponsible', e.target.value)}
                    required
                  />
                  <span>Yes</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="revenueResponsible"
                    value="No"
                    checked={formData.revenueResponsible === 'No'}
                    onChange={(e) => handleInputChange('revenueResponsible', e.target.value)}
                    required
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label>What is your budget involvement? *</label>
              <div className="radio-group">
                <label className="radio-option">
                  <input
                    type="radio"
                    name="budgetInvolvement"
                    value="Primary decision maker"
                    checked={formData.budgetInvolvement === 'Primary decision maker'}
                    onChange={(e) => handleInputChange('budgetInvolvement', e.target.value)}
                    required
                  />
                  <span>Primary decision maker</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="budgetInvolvement"
                    value="Influencer"
                    checked={formData.budgetInvolvement === 'Influencer'}
                    onChange={(e) => handleInputChange('budgetInvolvement', e.target.value)}
                    required
                  />
                  <span>Influencer</span>
                </label>
                <label className="radio-option">
                  <input
                    type="radio"
                    name="budgetInvolvement"
                    value="Not involved"
                    checked={formData.budgetInvolvement === 'Not involved'}
                    onChange={(e) => handleInputChange('budgetInvolvement', e.target.value)}
                    required
                  />
                  <span>Not involved</span>
                </label>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="form-step">
            <h3>Challenges & Priorities</h3>
            <div className="form-group">
              <label>What are your three biggest marketing challenges right now? (Choose up to 3) *</label>
              <div className="checkbox-grid">
                {challengeOptions.map((option, index) => (
                  <label key={index} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.marketingChallenges.includes(option)}
                      onChange={() => handleMultiSelect('marketingChallenges', option)}
                      disabled={!formData.marketingChallenges.includes(option) && formData.marketingChallenges.length >= 3}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <p className="selection-count">{formData.marketingChallenges.length}/3 selected</p>
            </div>
            <div className="form-group">
              <label>What are your top three priorities for the next 12 months? (Choose up to 3) *</label>
              <div className="checkbox-grid">
                {priorityOptions.map((option, index) => (
                  <label key={index} className="checkbox-option">
                    <input
                      type="checkbox"
                      checked={formData.priorities.includes(option)}
                      onChange={() => handleMultiSelect('priorities', option)}
                      disabled={!formData.priorities.includes(option) && formData.priorities.length >= 3}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              <p className="selection-count">{formData.priorities.length}/3 selected</p>
            </div>
          </div>
        )

      case 5:
        return (
          <div className="form-step">
            <h3>Personalization & Proof</h3>
            <div className="form-group">
              <label htmlFor="biggestAchievement">What's the biggest achievement you (or your team) delivered in the last 12 months? *</label>
              <textarea
                id="biggestAchievement"
                value={formData.biggestAchievement}
                onChange={(e) => handleInputChange('biggestAchievement', e.target.value)}
                rows={4}
                placeholder="Tell us about your most significant accomplishment..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="hopeToGain">What do you hope to gain from Growth Authority? *</label>
              <textarea
                id="hopeToGain"
                value={formData.hopeToGain}
                onChange={(e) => handleInputChange('hopeToGain', e.target.value)}
                rows={4}
                placeholder="e.g., peer learning, playbooks, AI workflows, leadership support, etc."
                required
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section className="waitlist-form-section">
      <div className="container">
        <div className="form-header">
          <h2>Growth Authority Waitlist Application</h2>
          <p>Please take 2 minutes to complete this. We use your answers to ensure every member is a real peer and that you get maximum value from joining.</p>
        </div>

        <div className="progress-bar">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
          <div className="step-indicators">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div 
                key={i} 
                className={`step-indicator ${i + 1 <= currentStep ? 'active' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="waitlist-form">
          <div className="form-content">
            {renderStep()}
          </div>

          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={prevStep} className="btn-secondary">
                Previous
              </button>
            )}
            {currentStep < totalSteps ? (
              <button type="button" onClick={nextStep} className="btn-primary">
                Next Step
              </button>
            ) : (
              <button type="submit" className="btn-primary submit-btn">
                Apply for Waitlist
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
} 