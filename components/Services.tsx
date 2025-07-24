export default function Services() {
  const services = [
    {
      title: 'Community',
      description: 'Access marketing experts, insights, community, networking, courses, and more. For free.',
      cta: 'Get certified'
    },
    {
      title: 'Certifications', 
      description: 'Learn today & apply tomorrow. Community-led education designed to fast-track your career.',
      cta: 'Become a member'
    },
    {
      title: 'Resources',
      description: 'Develop your knowledge with ideas and resources you can apply to everyday projects.',
      cta: 'Attend an event'
    }
  ]

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="btn-outline">{service.cta}</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 