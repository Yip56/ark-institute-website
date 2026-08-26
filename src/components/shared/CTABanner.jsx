import { Link } from 'react-router-dom'
import styles from './CTABanner.module.css'

export default function CTABanner({
  eyebrow = 'Get Started',
  title = 'Begin your musical journey',
  subtitle = 'Your first lesson is on us — no commitment required.',
  btnLabel = 'Book a Free Trial Class',
}) {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.inner} fade-up`}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
          <Link to="/free-trial" className={styles.btn}>{btnLabel}</Link>
        </div>
      </div>
    </section>
  )
}
