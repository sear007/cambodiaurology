import { useState } from 'react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setEmail('')
    }
  }

  return (
    <>
      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-col">
              <h6>Phone:</h6>
              <a href="tel:+85512706092">+85512706092</a>
            </div>
            <div className="contact-col">
              <h6>Email:</h6>
              <a href="mailto:info@cambodiaurologycenter.com">info@cambodiaurologycenter.com</a>
            </div>
            <div className="contact-col">
              <h6>Follow Me:</h6>
              <div className="social-icons">
                <a href="#" className="social-icon" aria-label="Facebook">
                  <i className="fab fa-facebook-f" />
                </a>
                <a href="#" className="social-icon" aria-label="Twitter">
                  <i className="fab fa-twitter" />
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="#" className="social-icon" aria-label="Instagram">
                  <i className="fab fa-instagram" />
                </a>
              </div>
            </div>
            <div className="contact-col">
              <h6>Subscribe:</h6>
              {sent ? (
                <p style={{ color: 'var(--p1)', fontSize: '0.875rem' }}>Thank you for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe}>
                  <div className="subscribe-row">
                    <input
                      type="email"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <button type="submit">Go</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="vlt-footer">
        <div className="container">
          <p>&copy; Copyright {new Date().getFullYear()} Cambodia Urology Center. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  )
}
