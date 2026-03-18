import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const BASE = import.meta.env.BASE_URL
const LOGO = `${BASE}wp-content/uploads/2025/04/logo-300x106.png`

export default function Navbar({ transparent = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close drawer on route change
  useEffect(() => { setDrawerOpen(false) }, [location])

  const navClass = `vlt-navbar ${!transparent || scrolled ? 'scrolled' : 'transparent'}`

  const links = [
    { href: `${BASE}#home`,         label: 'Home' },
    { href: `${BASE}#about`,        label: 'About' },
    { href: `${BASE}#experience`,   label: 'Experience' },
    { href: `${BASE}#testimonials`, label: 'Testimonials' },
    { href: `${BASE}#news`,         label: 'Publications' },
    { href: `${BASE}#contact`,      label: 'Contact' },
  ]

  return (
    <>
      <nav className={navClass}>
        <div className="container">
          <div className="vlt-navbar-inner">
            <Link to="/" className="vlt-navbar-logo">
              <img src={LOGO} alt="Cambodia Urology Center" />
            </Link>

            <div className="vlt-nav-links">
              {links.map(l => (
                <a key={l.href} href={l.href}>{l.label}</a>
              ))}
            </div>

            <a href="tel:+85517706092" className="nav-phone">
              <i className="fas fa-phone-alt" style={{ fontSize: '0.75rem' }} />
              +855 17 706 092
            </a>

            <button
              className="menu-burger"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close">X</button>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setDrawerOpen(false)}>{l.label}</a>
        ))}
        <a href="tel:+85517706092" style={{ fontSize: '1rem', color: 'var(--p1)' }}>
          <i className="fas fa-phone-alt" style={{ marginRight: 8 }} />
          +855 17 706 092
        </a>
      </div>
    </>
  )
}
