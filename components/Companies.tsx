export default function Companies() {
  const companies = [
    'LinkedIn', 'Google', 'Meta', 'Shopify', 'Microsoft',
    'Amazon', 'Salesforce', 'Netflix', 'Adobe'
  ]

  return (
    <section className="companies-section">
      <div className="container">
        <p className="companies-intro">Join marketers from world-class companies like:</p>
        <div className="companies-grid">
          {companies.map((company, index) => (
            <div key={index} className="company-logo">
              {company}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 