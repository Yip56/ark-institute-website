import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import CTABanner from '../components/shared/CTABanner'
import styles from './ContemporaryMusic.module.css'

const TIERS = [
  {
    tier: 'Tier 1',
    title: 'Foundation',
    desc: 'Perfect for beginners with no prior experience. Build core technique, music theory basics, and confidence through guided play.',
    features: ['Posture & technique', 'Basic music theory', 'Simple repertoire', 'Ear training fundamentals'],
    featured: false,
  },
  {
    tier: 'Tier 2',
    title: 'Development',
    desc: 'For students who know the fundamentals and are ready to expand their sound, repertoire, and creative vocabulary.',
    features: ['Intermediate theory', 'Genre exploration', 'Improvisation intro', 'Performance skills'],
    featured: true,
  },
  {
    tier: 'Tier 3',
    title: 'Mastery',
    desc: 'Advanced players refining their voice, exploring complex musicality, and preparing for professional or performance goals.',
    features: ['Advanced technique', 'Composition & arrangement', 'Recording studio skills', 'Performance coaching'],
    featured: false,
  },
]

const SESSIONS = [
  {
    minutes: 30,
    desc: 'Ideal for younger students or tight schedules. Focused, efficient, and structured for rapid progress in single-skill sessions.',
  },
  {
    minutes: 45,
    desc: 'The most popular format — enough time to warm up, work through technique, and explore repertoire within a single session.',
  },
  {
    minutes: 60,
    desc: 'For serious students who want the full experience: extended practice, deeper feedback, and room to experiment.',
  },
]

const INSTRUMENTS = [
  { name: 'Guitar', icon: '🎸' },
  { name: 'Bass', icon: '🎸' },
  { name: 'Keyboard', icon: '🎹' },
  { name: 'Drums', icon: '🥁' },
  { name: 'Vocals', icon: '🎤' },
  { name: 'Ukulele', icon: '🪗' },
  { name: 'Music Production', icon: '🎚️' },
  { name: 'Songwriting', icon: '🎵' },
]

export default function ContemporaryMusic() {
  return (
    <>
      {/* Page Hero */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className="fade-up">
              <div className={styles.eyebrow}>Contemporary Music</div>
              <h1 className={styles.headline}>Modern music, your way</h1>
              <p className={styles.desc}>
                Three skill tiers, flexible session lengths, and a breadth of genres — from pop and rock to R&B, jazz, and beyond. Wherever you are, we meet you there.
              </p>
              <Link to="/free-trial" className={styles.ctaBtn}>
                Book a Free Trial Class
              </Link>
            </div>
            <div className="fade-in">
              {/* TODO: Replace with contemporary program photography */}
              <PlaceholderImage
                label="Contemporary music program — student in lesson, guitar or modern instrument, bright dynamic energy"
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Skill Tiers */}
      <section className={styles.tiersSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>Skill Tiers</SectionLabel>
            <h2 className={styles.sectionTitle}>Structured for every level</h2>
            <p className={styles.sectionSub}>
              We place every student into the right tier through a brief intake conversation — no auditions, no judgment.
            </p>
          </div>
          <div className={styles.tiersGrid}>
            {TIERS.map(t => (
              <div key={t.tier} className={`${styles.tierCard} ${t.featured ? styles.featured : ''} fade-up`}>
                {t.featured && <div className={styles.featuredBadge}>Most Popular</div>}
                <div className={styles.tierName}>{t.tier}</div>
                <div className={styles.tierTitle}>{t.title}</div>
                <p className={styles.tierDesc}>{t.desc}</p>
                <ul className={styles.tierFeatures}>
                  {t.features.map(f => (
                    <li key={f} className={styles.tierFeature}>
                      <span className={styles.checkmark}>✦</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Session Lengths */}
          <div className="fade-up">
            <SectionLabel>Session Format</SectionLabel>
            <h2 className={styles.sectionTitle}>Choose your session length</h2>
            <p className={styles.sectionSub}>All session lengths are available across all three tiers.</p>
          </div>
          <div className={styles.sessionsGrid}>
            {SESSIONS.map(s => (
              <div key={s.minutes} className={`${styles.sessionCard} fade-up`}>
                <div className={styles.sessionMinutes}>{s.minutes}</div>
                <div className={styles.sessionUnit}>minutes</div>
                <p className={styles.sessionDesc}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Instruments */}
      <section className={styles.instrumentsSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>Instruments & Disciplines</SectionLabel>
            <h2 className={styles.sectionTitle}>What you can learn</h2>
            <p className={styles.sectionSub}>
              Our contemporary program covers the full modern palette.
            </p>
          </div>
          <div className={styles.instrumentsGrid}>
            {INSTRUMENTS.map(inst => (
              <div key={inst.name} className={`${styles.instrumentCard} fade-up`}>
                <span className={styles.instrumentIcon}>{inst.icon}</span>
                <span className={styles.instrumentName}>{inst.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Contemporary Track"
        title="Your first lesson is free"
        subtitle="Book a free trial class and find out which tier and session format fits you best."
      />
    </>
  )
}
