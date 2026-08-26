import { Link } from 'react-router-dom'
import PlaceholderVideo from '../ui/PlaceholderVideo'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section className={styles.hero}>
      {/* TODO: Replace PlaceholderVideo with a real <video autoPlay muted loop playsInline> tag.
          Recommended: a 15-20s cinematic reel showing studio sessions, instruments, and students.
          File should be webm + mp4 for broad support. */}
      <div className={styles.videoWrap}>
        <PlaceholderVideo
          label="Hero video — cinematic studio reel (15-20s, students playing, instruments, studio atmosphere)"
          height="100%"
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <div className="container">
          <div className={styles.eyebrow}>Premier Music Education</div>
          <h1 className={styles.headline}>
            Where <em>talents</em>{'\n'}are built.
          </h1>
          <p className={styles.subheadline}>
            Contemporary and Classical programs for adults, teens, and children.
            Structured learning, world-class instruction, lasting results.
          </p>
          <div className={styles.actions}>
            <Link to="/free-trial" className={styles.primaryBtn}>
              Book a Free Trial Class
            </Link>
            <Link to="/contemporary-music" className={styles.secondaryBtn}>
              Explore Programs
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollHint}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  )
}
