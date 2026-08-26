import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import styles from './Header.module.css'
import ArkLogo from '../ui/ArkLogo'

const NAV_LINKS = [
  { to: '/contemporary-music', label: 'Contemporary' },
  { to: '/classical-music', label: 'Classical' },
  { to: '/about', label: 'About' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <ArkLogo className={styles.logoMark} />
          <div className={styles.logoText}>
            <span className={styles.logoName}>Ark Music Studio</span>
            <span className={styles.logoTagline}>Where Talents Are Built</span>
          </div>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `${styles.navLink} ${isActive ? styles.active : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <Link to="/free-trial" className={styles.ctaBtn}>
            Book Free Trial
          </Link>
        </nav>

        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.open : ''}`}>
        {NAV_LINKS.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            className={styles.mobileNavLink}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
        <Link to="/free-trial" className={styles.mobileCta} onClick={closeMenu}>
          Book a Free Trial Class
        </Link>
      </div>
    </header>
  )
}
