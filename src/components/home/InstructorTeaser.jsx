import { Link } from 'react-router-dom'
import SectionLabel from '../ui/SectionLabel'
import PlaceholderImage from '../ui/PlaceholderImage'
import styles from './InstructorTeaser.module.css'

// TODO: Replace placeholder data with real instructor profiles
const INSTRUCTORS = [
  {
    name: '[Instructor Name]',
    specialty: 'Contemporary — Guitar & Production',
    bio: '[Instructor bio placeholder — background, credentials, teaching philosophy, 2-3 sentences.]',
    photoLabel: 'Instructor headshot — professional portrait',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Classical — Piano',
    bio: '[Instructor bio placeholder — background, credentials, teaching philosophy, 2-3 sentences.]',
    photoLabel: 'Instructor headshot — professional portrait',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Classical — Violin & Strings',
    bio: '[Instructor bio placeholder — background, credentials, teaching philosophy, 2-3 sentences.]',
    photoLabel: 'Instructor headshot — professional portrait',
  },
]

export default function InstructorTeaser() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.header} fade-up`}>
          <div>
            <SectionLabel>Meet Our Team</SectionLabel>
            <h2 className={styles.title}>World-class instructors</h2>
          </div>
          <Link to="/about" className={styles.headerLink}>
            View all instructors
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className={styles.grid}>
          {INSTRUCTORS.map((instructor, i) => (
            <div key={i} className={`${styles.card} fade-up`}>
              <div className={styles.photo}>
                {/* TODO: Replace with real instructor headshot */}
                <PlaceholderImage
                  label={instructor.photoLabel}
                  height="100%"
                />
              </div>
              <div className={styles.name}>{instructor.name}</div>
              <div className={styles.specialty}>{instructor.specialty}</div>
              <p className={styles.bio}>{instructor.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
