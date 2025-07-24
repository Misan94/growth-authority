import { useState } from 'react'

export default function FAQ() {
  const [openQuestion, setOpenQuestion] = useState<number | null>(null)

  const faqs = [
    {
      question: "Can I expense my Growth Authority membership as professional development?",
      answer: "Yes, typically memberships like this qualify as professional development. When we launch, we'll happily provide you with a formal invoice and business justification template you can share internally."
    },
    {
      question: "What happens when Growth Authority officially launches?",
      answer: "Once we open in September, you'll immediately receive your invite to join the private community, access exclusive toolkits and playbooks, and get priority invites to our first live sessions. You'll be fully equipped to start leveraging everything from day one."
    },
    {
      question: "Is Growth Authority mainly a content library?",
      answer: "Definitely not. While we provide valuable playbooks, templates, and tools, Growth Authority's real power is in live events, accountability sessions, real-time problem-solving, and peer-to-peer strategy exchange. Think action, not just reading."
    },
    {
      question: "Is this right for me if I'm already part of another community?",
      answer: "Absolutely. Growth Authority is designed to complement, not replace, other groups. If you want a focused, action-driven space built specifically for senior marketing leaders who are serious about results, you'll feel right at home here."
    },
    {
      question: "If I join the waitlist, am I committed to anything now?",
      answer: "No commitment yet. Joining the waitlist ensures you're first in line for limited founding member seats and that you receive early details. Once we launch, you'll get all the details and decide if it's right for you."
    },
    {
      question: "Can I leave anytime?",
      answer: "Yes. No long-term contracts or hidden commitments. If you're not getting value, you can leave with one click, no questions asked."
    }
  ]

  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index)
  }

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="faq-header">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about Growth Authority membership
          </p>
        </div>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${openQuestion === index ? 'active' : ''}`}
            >
              <button
                className="faq-question"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openQuestion === index}
              >
                <span className="question-text">{faq.question}</span>
                <div className="question-icon">
                  <span className="icon-plus">+</span>
                  <span className="icon-minus">−</span>
                </div>
              </button>
              
              <div className="faq-answer">
                <div className="answer-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 