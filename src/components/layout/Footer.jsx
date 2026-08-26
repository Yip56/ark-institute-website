import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        {/* Footer CTA — every page ends with this */}
        <div className={styles.ctaBanner}>
          <h2 className={styles.ctaTitle}>Ready to begin your journey?</h2>
          <p className={styles.ctaSubtitle}>
            Your first lesson is on us — no commitment required.
          </p>
          <Link to="/free-trial" className={styles.ctaBtn}>
            Book a Free Trial Class
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={styles.brand}>
            <div className={styles.logoName}>Ark Music Studio</div>
            <div className={styles.tagline}>Where Talents Are Built</div>
            <p className={styles.desc}>
              A premier music studio dedicated to nurturing every student — from first notes to concert stages.
            </p>
          </div>

          <div>
            <div className={styles.colTitle}>Programs</div>
            <div className={styles.colLinks}>
              <Link to="/contemporary-music">Contemporary Music</Link>
              <Link to="/classical-music">Classical Music</Link>
              <Link to="/pricing">Pricing</Link>
              <Link to="/free-trial">Free Trial Class</Link>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Studio</div>
            <div className={styles.colLinks}>
              <Link to="/about">About Us</Link>
              <Link to="/about">Our Instructors</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <div className={styles.colTitle}>Contact</div>
            <div className={styles.colLinks}>
              {/* TODO: Replace with real address */}
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                [Studio Address Placeholder]
              </span>
              {/* TODO: Replace with real phone */}
              <span style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-sm)' }}>
                [Phone Number Placeholder]
              </span>
              {/* TODO: Replace with real email */}
              <a href="mailto:hello@arkinstitute.com">hello@arkinstitute.com</a>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} Ark Music Studio<span className={styles.accentDot}>.</span> All rights reserved.
          </span>
          <span className={styles.copy}>
            Where Talents Are Built<span className={styles.accentDot}>.</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
