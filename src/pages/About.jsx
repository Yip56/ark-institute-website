import SectionLabel from '../components/ui/SectionLabel'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import CTABanner from '../components/shared/CTABanner'
import styles from './About.module.css'

// TODO: Replace placeholder instructors with real profiles (name, specialty, bio, photo)
const INSTRUCTORS = [
  {
    name: '[Instructor Name]',
    specialty: 'Contemporary — Guitar & Production',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Classical — Piano',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Classical — Violin & Strings',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Contemporary — Vocals',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Contemporary — Drums & Percussion',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
  {
    name: '[Instructor Name]',
    specialty: 'Classical — Flute & Wind',
    bio: '[Instructor bio — background, credentials, years of teaching, musical background. 3-4 sentences. What makes them exceptional?]',
    photoLabel: 'Instructor professional headshot',
  },
]

const VALUES = [
  {
    icon: '🎯',
    title: 'Structured progress',
    desc: 'Clear milestones at every level. Students always know where they are and where they\'re headed.',
  },
  {
    icon: '🤝',
    title: 'Instructor-student fit',
    desc: 'We carefully match each student to the right instructor based on goals, personality, and learning style.',
  },
  {
    icon: '🌊',
    title: 'Patient, unhurried learning',
    desc: 'Great music isn\'t rushed. We value depth over speed, and celebrate incremental growth.',
  },
]

// TODO: Replace placeholder stats with real data
const STATS = [
  { value: '[X]+', label: 'Students taught' },
  { value: '[X]', label: 'Expert instructors' },
  { value: '[X]+', label: 'Years of teaching' },
]

export default function About() {
  return (
    <>
      {/* Hero / Story */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className="fade-up">
              <div className={styles.eyebrow}>Our Story</div>
              <h1 className={styles.headline}>Built for the love of music</h1>
              <div className={styles.body}>
                {/* TODO: Replace with the real studio founding story */}
                <p>
                  [Studio founding story placeholder — how Ark Music Studio started, who founded it, and what drove them to build a music school. What gap in music education did you set out to fill?]
                </p>
                <p>
                  [Second paragraph — the philosophy behind the name "Ark Music Studio" and the sailboat-treble-clef mark. What does the ark symbolize? The tagline "Where Talents Are Built" — what does that mean to the founders?]
                </p>
                <p>
                  [Third paragraph — where the studio is today: growth, community, what you're most proud of.]
                </p>
              </div>
              <div className={styles.stats}>
                {STATS.map(s => (
                  <div key={s.label} className={styles.stat}>
                    <div className={styles.value}>{s.value}</div>
                    <div className={styles.label}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="fade-in">
              {/* TODO: Replace with a studio interior or founder photo */}
              <PlaceholderImage
                label="Studio interior or founder photo — warm, inviting, professional"
                height={540}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instructors */}
      <section className={styles.instructorsSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>The Team</SectionLabel>
            <h2 className={styles.sectionTitle}>Meet our instructors</h2>
            <p className={styles.sectionSub}>
              Every instructor at Ark Music Studio is a practising musician who brings real-world performance experience into the studio.
            </p>
          </div>
          <div className={styles.instructorsGrid}>
            {INSTRUCTORS.map((instructor, i) => (
              <div key={i} className={`${styles.instructorCard} fade-up`}>
                <div className={styles.photo}>
                  {/* TODO: Replace with real instructor headshot photo */}
                  <PlaceholderImage label={instructor.photoLabel} height="100%" />
                </div>
                <div className={styles.name}>{instructor.name}</div>
                <div className={styles.specialty}>{instructor.specialty}</div>
                <p className={styles.bio}>{instructor.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className={styles.valuesSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>Our Values</SectionLabel>
            <h2 className={styles.sectionTitle}>How we teach</h2>
          </div>
          <div className={styles.valuesGrid}>
            {VALUES.map(v => (
              <div key={v.title} className={`${styles.valueCard} fade-up`}>
                <span className={styles.valueIcon}>{v.icon}</span>
                <div className={styles.valueTitle}>{v.title}</div>
                <p className={styles.valueDesc}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Ready to meet us?"
        title="Book your free trial class"
        subtitle="Come in, meet your instructor, and experience Ark Music Studio first-hand."
      />
    </>
  )
}
