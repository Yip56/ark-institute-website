import SectionLabel from '../ui/SectionLabel'
import styles from './Testimonials.module.css'

// TODO: Replace with real student/parent testimonials.
// Collect written or video testimonials; for video, use PlaceholderVideo slots.
const TESTIMONIALS = [
  {
    quote: '"[Placeholder testimonial — real student or parent quote about their experience, progress, or the quality of instruction at Ark Music Studio. 2-3 sentences.]"',
    name: '[Student / Parent Name]',
    role: '[Program, e.g. Contemporary — Guitar, Adult]',
  },
  {
    quote: '"[Placeholder testimonial — real student or parent quote about their experience, progress, or the quality of instruction at Ark Music Studio. 2-3 sentences.]"',
    name: '[Student / Parent Name]',
    role: '[Program, e.g. Classical — Grade 5, Teen]',
  },
  {
    quote: '"[Placeholder testimonial — real student or parent quote about their experience, progress, or the quality of instruction at Ark Music Studio. 2-3 sentences.]"',
    name: '[Student / Parent Name]',
    role: '[Program, e.g. Contemporary — Vocals, Adult]',
  },
]

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={`${styles.header} fade-up`}>
          <SectionLabel>Student Stories</SectionLabel>
          <h2 className={styles.title}>What our students say</h2>
        </div>

        <div className={styles.grid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={`${styles.card} fade-up`}>
              <div className={styles.placeholderBadge}>Placeholder</div>
              <div className={styles.stars}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} className={styles.star}>★</span>
                ))}
              </div>
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                {/* TODO: Replace with real avatar photo */}
                <div className={styles.avatar} />
                <div className={styles.authorInfo}>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
