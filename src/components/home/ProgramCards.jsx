import { Link } from 'react-router-dom'
import SectionLabel from '../ui/SectionLabel'
import PlaceholderImage from '../ui/PlaceholderImage'
import styles from './ProgramCards.module.css'

const PROGRAMS = [
  {
    tag: 'Contemporary Music',
    title: 'Contemporary Track',
    desc: 'Master modern genres across three skill tiers. Sessions in 30, 45, or 60-minute formats designed to fit your schedule and accelerate your growth.',
    features: ['Beginner', 'Intermediate', 'Advanced', '30 / 45 / 60 min'],
    to: '/contemporary-music',
    imagelabel: 'Contemporary music session — student with instructor, modern studio setting',
  },
  {
    tag: 'Classical Music',
    title: 'Classical Track',
    desc: 'A rigorous 10-grade journey from first notes to debut performance. Structured progression, repertoire development, and examination preparation.',
    features: ['No Grade → Debut', '10 Grade Levels', 'Exam Prep', 'Recital Ready'],
    to: '/classical-music',
    imagelabel: 'Classical music lesson — piano or violin instruction, formal setting',
  },
]

export default function ProgramCards() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.header} fade-up`}>
          <SectionLabel>Our Programs</SectionLabel>
          <h2 className={styles.title}>Two distinct paths to mastery</h2>
          <p className={styles.subtitle}>
            Whether you gravitate toward contemporary expression or classical tradition, we have a program shaped around your goals.
          </p>
        </div>

        <div className={styles.grid}>
          {PROGRAMS.map(({ tag, title, desc, features, to, imagelabel }) => (
            <Link key={to} to={to} className={`${styles.card} fade-up`}>
              <div className={styles.cardImage}>
                {/* TODO: Replace with real program photography */}
                <PlaceholderImage label={imagelabel} height="100%" />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTag}>{tag}</div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.cardDesc}>{desc}</p>
                <div className={styles.cardFeatures}>
                  {features.map(f => (
                    <span key={f} className={styles.feature}>{f}</span>
                  ))}
                </div>
                <span className={styles.cardLink}>
                  Learn more
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
