import { useState } from 'react'

export default function FloatButton() {
  const [open, setOpen] = useState(false)

  return (
    <div className="float-btn-wrap">
      <div className={`float-links ${open ? '' : 'hidden'}`}>
        <div className="float-links-header">
          <p className="float-links-title">I&apos;m here for you</p>
          <p className="float-links-subtitle">How can you contact me.</p>
        </div>
        <a href="tel:+85512706092" className="float-link-item">
          <div className="float-link-icon phone">
            <i className="fas fa-phone-alt" />
          </div>
          <div>
            <div className="float-link-label">Phone</div>
            <div className="float-link-desc">+85512706092</div>
          </div>
        </a>
        <a href="https://wa.me/+85512706092" target="_blank" rel="noopener noreferrer" className="float-link-item">
          <div className="float-link-icon whatsapp">
            <i className="fab fa-whatsapp" />
          </div>
          <div>
            <div className="float-link-label">Customer service</div>
            <div className="float-link-desc">Always online</div>
          </div>
        </a>
      </div>
      <button
        className="float-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Contact options"
      >
        {open ? <i className="fas fa-times" /> : <i className="fas fa-comment-dots" />}
      </button>
    </div>
  )
}
