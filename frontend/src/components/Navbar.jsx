import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', to: '/' },
    { label: 'Studio', to: '/studio' },
    { label: 'Campaigns', to: '/campaigns' },
  ]

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-mark">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#g1)" />
              <path d="M2 17L12 22L22 17" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round"/>
              <path d="M2 12L12 17L22 12" stroke="url(#g2)" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
              <defs>
                <linearGradient id="g1" x1="2" y1="7" x2="22" y2="7" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="g2" x1="2" y1="17" x2="22" y2="17" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#7C3AED" /><stop offset="1" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__logo-text">
            Ad<span className="gradient-text">Vantage</span>Gen
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`navbar__link ${location.pathname === l.to ? 'navbar__link--active' : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="navbar__actions">
          <Link to="/studio" className="btn-primary" style={{ padding: '10px 22px', fontSize: '0.9rem' }}>
            ✦ Create Ad
          </Link>
          <button
            className="navbar__hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
            <span className={menuOpen ? 'open' : ''}></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="navbar__mobile">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`navbar__mobile-link ${location.pathname === l.to ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
