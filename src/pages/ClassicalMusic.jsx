import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import PlaceholderImage from '../components/ui/PlaceholderImage'
import CTABanner from '../components/shared/CTABanner'
import styles from './ClassicalMusic.module.css'

const GRADES = [
  { num: '—', name: 'No Grade', desc: 'Absolute beginners, first notes and posture' },
  { num: '1', name: 'Grade 1', desc: 'Foundational scales, simple pieces' },
  { num: '2', name: 'Grade 2', desc: 'Expanding technique and repertoire' },
  { num: '3', name: 'Grade 3', desc: 'Coordination, dynamics, expression' },
  { num: '4', name: 'Grade 4', desc: 'Intermediate repertoire, sight-reading' },
  { num: '5', name: 'Grade 5', desc: 'Theory integration, longer works' },
  { num: '6', name: 'Grade 6', desc: 'Advanced technique, musical analysis' },
  { num: '7', name: 'Grade 7', desc: 'Performance-level repertoire, exam prep' },
  { num: '8', name: 'Grade 8', desc: 'Near-concert standard, complex works' },
  { num: '✦', name: 'Debut', desc: 'Concert-ready: recitals, competitions, auditions', debut: true },
]

const JOURNEY_STEPS = [
  {
    title: 'Intake Assessment',
    desc: 'A brief conversation and/or playing assessment places you at the correct grade level — ensuring you\'re neither bored nor overwhelmed.',
  },
  {
    title: 'Structured Curriculum',
    desc: 'Each grade follows a rigorous curriculum covering technique, scales, sight-reading, and a curated repertoire of period-appropriate works.',
  },
  {
    title: 'Grade Examinations',
    desc: 'Students can sit recognized grade examinations at each level. We prepare you thoroughly — the exam is optional, the preparation is built in.',
  },
  {
    title: 'Recital Opportunities',
    desc: 'Ark Music Studio hosts regular student recitals. Performance experience is woven into the program from the earliest grades.',
  },
  {
    title: 'Debut',
    desc: 'The pinnacle of the classical track — a full public performance showcasing the student\'s mastery of the concert repertoire.',
  },
]

const INSTRUMENTS = [
  { name: 'Piano', icon: '🎹' },
  { name: 'Violin', icon: '🎻' },
  { name: 'Cello', icon: '🎻' },
  { name: 'Classical Guitar', icon: '🎸' },
  { name: 'Flute', icon: '🎵' },
  { name: 'Clarinet', icon: '🎵' },
  { name: 'Voice (Classical)', icon: '🎤' },
  { name: 'Music Theory', icon: '📖' },
]

export default function ClassicalMusic() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroInner}>
            <div className="fade-up">
              <div className={styles.eyebrow}>Classical Music</div>
              <h1 className={styles.headline}>The tradition of mastery</h1>
              <p className={styles.desc}>
                Ten grades from first notes to debut performance. A structured, proven curriculum grounded in centuries of classical tradition — delivered by instructors who know what it takes.
              </p>
              <Link to="/free-trial" className={styles.ctaBtn}>
                Book a Free Trial Class
              </Link>
            </div>
            <div className="fade-in">
              {/* TODO: Replace with classical program photography */}
              <PlaceholderImage
                label="Classical music program — student at piano or with string instrument, formal elegant setting"
                height={420}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grade Structure */}
      <section className={styles.gradesSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>Grade Structure</SectionLabel>
            <h2 className={styles.sectionTitle}>Ten levels. One destination.</h2>
            <p className={styles.sectionSub}>
              Our grade structure provides clear milestones at every stage — so students, parents, and instructors always know where they stand and what comes next.
            </p>
          </div>
          <div className={styles.gradesGrid}>
            {GRADES.map(g => (
              <div key={g.num} className={`${styles.gradeCard} ${g.debut ? styles.debut : ''} fade-up`}>
                <div className={styles.gradeNum}>{g.num}</div>
                <div className={styles.gradeName}>{g.name}</div>
                <div className={styles.gradeDesc}>{g.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className={styles.journeySection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>How It Works</SectionLabel>
            <h2 className={styles.sectionTitle}>Your classical journey</h2>
            <p className={styles.sectionSub}>
              Every student follows the same rigorous path — paced by ability, not by time.
            </p>
          </div>
          <div className={styles.steps}>
            {JOURNEY_STEPS.map((step, i) => (
              <div key={i} className={`${styles.step} fade-up`}>
                <div className={styles.stepNum}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <div className={styles.stepTitle}>{step.title}</div>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
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
        eyebrow="Classical Track"
        title="Begin at any grade"
        subtitle="Whether you're a complete beginner or picking up where you left off, we'll find your level."
      />
    </>
  )
}
