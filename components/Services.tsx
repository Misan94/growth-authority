export default function Services() {
  const companies = [
    'LinkedIn', 'Google', 'Meta', 'Shopify', 'Microsoft',
    'Amazon', 'Salesforce', 'Netflix', 'Adobe', 'HubSpot',
    'Slack', 'Zoom', 'Stripe', 'Airbnb', 'Uber'
  ]

  return (
    <section className="companies-section">
      <div className="container">
        <h2 className="companies-title">Join marketers from world-class companies like:</h2>
        <div className="companies-scroll-container">
          <div className="companies-scroll">
            {[...companies, ...companies].map((company, index) => (
              <div key={index} className="company-logo">
                <span>{company}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 