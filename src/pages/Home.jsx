import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import FloatButton from '../components/FloatButton'
import Publications from '../components/Publications'

const BASE = import.meta.env.BASE_URL

const education = [
  {
    title: 'Diplome de Formation Medicale Specialisee (D.F.M.S)',
    detail: 'Lyon, France (2018-2019)',
  },
  {
    title: 'Urologic Surgery Residency, Hopital Edouard Herriot',
    detail: 'Lyon, France (2018-2019)',
  },
  {
    title: 'Residency in Department of Urology',
    detail: 'Preah Kossamak Hospital, Phnom Penh, Cambodia (2018-2019)',
  },
  {
    title: 'Residency in Department of Pediatric Surgery',
    detail: 'Kantha Bopha Hospital, Phnom Penh (2016-2017)',
  },
  {
    title: 'Specialized Doctor in Uro-Surgery',
    detail: 'University of Health Sciences, Phnom Penh, Cambodia (2015-2019)',
  },
  {
    title: 'Bachelor of Education (B.Ed)',
    detail: 'Institute of Foreign Languages, Royal University of Phnom Penh (2010-2014)',
  },
  {
    title: 'Bachelor of Medical Sciences',
    detail: 'University of Health Sciences, Phnom Penh, Cambodia (2009-2015)',
  },
  {
    title: 'General Education Program',
    detail: 'Ministry of Education, Sonthormok High School, Phnom Penh (1997-2009)',
  },
]

const skills = [
  'Urological Diagnosis & Treatment',
  'Kidney & Bladder Stone Management',
  'Prostate Health',
  'URO-ONCOLOGY & URINARY TRACT CANCER MANAGEMENT',
  'MINIMALLY INVASIVE UROLOGICAL SURGERY (LAPAROSCOPY, RIRS, URS)',
]

const experience = [
  {
    years: '2021-Present',
    org: 'Preah Kossamak Hospital',
    role: 'Vice Director, Urology and Kidney Transplant Department',
    desc: "Oversee the department's operations, contribute to the advancement of kidney transplant programs, and lead clinical and surgical activities.",
  },
  {
    years: '2021-Present',
    org: 'University of Health Sciences (UHS)',
    role: 'Thesis Director & Lecturer',
    desc: 'Guide medical students in thesis research and deliver lectures in urology and related fields.',
  },
  {
    years: '2021-Present',
    org: 'Royal Phnom Penh Hospital',
    role: 'Part-time Urologist',
    desc: 'Provide specialized urological care and surgical consultations on a part-time basis.',
  },
  {
    years: '2019-Present',
    org: 'Preah Kossamak Hospital',
    role: 'Urologist',
    desc: 'Diagnose and treat a wide range of urological conditions, with involvement in both outpatient and surgical services.',
  },
  {
    years: '2017-2018',
    org: 'Khema Clinic',
    role: 'Consultant Urologist & Surgical Assistant',
    desc: 'Assisted in surgeries and provided expert consultations in urology.',
  },
  {
    years: '2017-2018',
    org: 'Cambodia Urological Clinic',
    role: 'Surgical Assistant',
    desc: 'Supported surgical teams in urological procedures and patient care.',
  },
  {
    years: '2015-2018',
    org: 'Arunreah Clinic',
    role: 'Consultant Urologist & Surgical Assistant',
    desc: 'Delivered urology consultations and assisted in a range of surgical interventions.',
  },
]

const testimonials = [
  {
    text: 'I had been struggling with kidney stones for years until I visited Cambodia Urology Center. The doctors provided a clear diagnosis and an effective treatment plan. Now, I am pain-free and grateful for their care!',
    name: 'Sokha P.',
    location: 'Phnom Penh',
  },
  {
    text: 'After suffering from frequent urinary tract infections, I finally found the right specialists. Their approach to treatment was thorough and effective. I feel healthier and more confident!',
    name: 'Chan R.',
    location: 'Siem Reap',
  },
  {
    text: 'From consultation to surgery, the team at Cambodia Urology Center made me feel comfortable and well cared for. The advanced technology they use truly sets them apart!',
    name: 'Sreyneang L.',
    location: 'Phnom Penh',
  },
  {
    text: 'I was nervous about my bladder health issues, but the doctors here reassured me and provided a great treatment plan. Now, I am symptom-free. Thank you for your kindness!',
    name: 'Piseth M.',
    location: 'Kampong Cham',
  },
  {
    text: 'I would not go anywhere else for urological care. The doctors are knowledgeable, the staff is welcoming, and the results speak for themselves. Best decision I ever made!',
    name: 'Vuthy S.',
    location: 'Takeo',
  },
]

export default function Home() {
  const progressRef = useRef(null)
  const [barsAnimated, setBarsAnimated] = useState(false)
  const [tIdx, setTIdx] = useState(0)
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    const el = progressRef.current
    if (!el) return

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setBarsAnimated(true)
        io.disconnect()
      }
    }, { threshold: 0.3 })

    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.fade-up')
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, { threshold: 0.1 })

    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setTIdx((idx) => (idx + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  const handleForm = (e) => {
    e.preventDefault()
    setFormSent(true)
  }

  return (
    <>
      <Helmet>
        <title>Home - Cambodia Urology Center</title>
        <meta
          name="description"
          content="UROLOGY Specialist. Providing Expert Care for Urinary & Reproductive Health. Trust Your Urological Health to Experts - Dr. Ouk Reaksmey."
        />
        <link rel="canonical" href="https://cambodiaurologycenter.com/" />
        <meta property="og:title" content="Home - Cambodia Urology Center" />
        <meta property="og:description" content="UROLOGY Specialist. Providing Expert Care for Urinary & Reproductive Health." />
        <meta property="og:image" content={`${BASE}uploads/2025/04/dr-ouk-reaksmey.jpg`} />
      </Helmet>

      <Navbar transparent />

      <section
        id="home"
        className="hero-masthead"
        style={{ backgroundImage: `url(${BASE}uploads/2025/04/dr-ouk-reaksmey.jpg)` }}
      >
        <div className="container">
          <div className="hero-content hero-content-animated">
            <h1>
              <span className="hero-line hero-line-top">UROLOGY</span> <br />
              <span className="mark hero-line hero-line-mark"><span>Specialist.</span></span>
            </h1>
            <p className="hero-copy">
              <span className="hero-copy-line">Providing Expert Care for Urinary</span>
              <span className="hero-copy-line">Reproductive Health</span>
            </p>
          </div>
        </div>
      </section>

      <section id="about" className="about-section section-pad">
        <div className="container">
          <div className="about-intro fade-up">
            <h2>Trust Your Urological Health to Experts.</h2>
            <p>
              Introduce <strong>Dr. Ouk Reaksmey</strong> as the leading urologist at Cambodia Urology Center,
              highlighting his extensive education and professional background.
            </p>
          </div>

          <div className="icon-boxes-grid">
            {education.map((item, i) => (
              <div className="icon-box fade-up" key={i}>
                <div className="icon-box__icon">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                    <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 48c110.532 0 200 89.451 200 200 0 110.532-89.451 200-200 200-110.532 0-200-89.451-200-200 0-110.532 89.451-200 200-200m140.204 130.267l-22.536-22.718c-4.667-4.705-12.265-4.736-16.97-.068L215.346 303.697l-59.792-60.277c-4.667-4.705-12.265-4.736-16.97-.069l-22.719 22.536c-4.705 4.667-4.736 12.265-.068 16.971l90.781 91.516c4.667 4.705 12.265 4.736 16.97.068l172.589-171.204c4.704-4.668 4.734-12.266.067-16.971z" />
                  </svg>
                </div>
                <h4>{item.title}</h4>
                <div className="icon-box__content">
                  <p dangerouslySetInnerHTML={{ __html: item.detail.replace(/, /g, ',<br/>') }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="expertise-section">
        <div
          className="expertise-image"
          style={{ backgroundImage: `url(${BASE}uploads/2025/04/image-2.png)` }}
          role="img"
          aria-label="Dr. Ouk Reaksmey expertise"
        />
        <div className="expertise-content" ref={progressRef}>
          <h2>Expertise.</h2>
          {skills.map((skill, i) => (
            <div className="progress-item" key={i}>
              <h6>{skill}</h6>
              <div className="progress-track">
                <div className={`progress-bar ${barsAnimated ? 'animate' : ''}`} style={{ transitionDelay: `${i * 0.15}s` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className="resume-section section-pad">
        <div className="container">
          <div className="fade-up" style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2>My Expertise.</h2>
          </div>
          <div>
            {experience.map((item, i) => (
              <div className="resume-row fade-up" key={i}>
                <div>
                  <div className="resume-years">{item.years}</div>
                  <div className="resume-org" style={{ marginTop: 8 }}>{item.org}</div>
                </div>
                <div>
                  <div className="resume-role">{item.role}</div>
                </div>
                <div>
                  <p className="resume-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section section-pad">
        <div className="container">
          <div className="fade-up" style={{ marginBottom: 40, textAlign: 'center' }}>
            <h2>Trusted by Our Patients</h2>
          </div>
          <div className="testi-carousel">
            <div className="testi-track" style={{ transform: `translateX(-${tIdx * 100}%)` }}>
              {testimonials.map((t, i) => (
                <div className="testi-item" key={i}>
                  <div className="testi-quote">"</div>
                  <p className="testi-text">{t.text}</p>
                  <div className="testi-name">
                    <strong>{t.name}</strong> - {t.location}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="testi-dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testi-dot ${i === tIdx ? 'active' : ''}`}
                onClick={() => setTIdx(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="partners-section section-pad">
        <div className="container">
          <div className="partners-list">
            {[1, 2, 3, 4].map((n) => (
              <img
                key={n}
                src={`${BASE}uploads/2020/05/${n}.png`}
                alt={`Partner ${n}`}
                loading="lazy"
              />
            ))}
          </div>
        </div>
      </section>

      <Publications />

      <section className="contact-form-section section-pad">
        <div className="container">
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2>Let&apos;s Talk About Your Urological Health!</h2>
            <p style={{ maxWidth: 750, margin: '20px auto 0' }}>
              Have a question about your kidney, bladder, or prostate health? Our specialists are here to help.
              Fill out the form below, and we&apos;ll get back to you as soon as possible.
            </p>
          </div>
          <div className="form-card fade-up">
            {formSent ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <i className="fas fa-check-circle" style={{ fontSize: '3rem', color: 'var(--p1)', display: 'block', marginBottom: 16 }} />
                <h3 style={{ color: 'var(--text)', marginBottom: 8 }}>Message Sent!</h3>
                <p>Thank you for contacting us. We&apos;ll get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleForm}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="E-mail"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    required
                  />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <button type="submit" className="btn btn-primary">Send Message</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
      <FloatButton />
    </>
  )
}
