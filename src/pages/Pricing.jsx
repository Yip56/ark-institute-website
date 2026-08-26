import { Link } from 'react-router-dom'
import SectionLabel from '../components/ui/SectionLabel'
import CTABanner from '../components/shared/CTABanner'
import styles from './Pricing.module.css'

// TODO: Replace all price placeholders with final pricing once confirmed
// All prices below are clearly marked as placeholders and must not be published as-is

const CONTEMPORARY_ROWS = [
  {
    tier: 'Foundation (Tier 1)',
    duration: '30 min',
    price: 'Contact for pricing',
    note: 'Placeholder — pending final pricing decision',
  },
  {
    tier: 'Foundation (Tier 1)',
    duration: '45 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Foundation (Tier 1)',
    duration: '60 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Development (Tier 2)',
    duration: '30 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Development (Tier 2)',
    duration: '45 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Development (Tier 2)',
    duration: '60 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Mastery (Tier 3)',
    duration: '30 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Mastery (Tier 3)',
    duration: '45 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
  {
    tier: 'Mastery (Tier 3)',
    duration: '60 min',
    price: 'Contact for pricing',
    note: 'Placeholder',
  },
]

const CLASSICAL_ROWS = [
  { grade: 'No Grade', price: 'Contact for pricing', note: 'Placeholder' },
  { grade: 'Grade 1 – 2', price: 'Contact for pricing', note: 'Placeholder' },
  { grade: 'Grade 3 – 4', price: 'Contact for pricing', note: 'Placeholder' },
  { grade: 'Grade 5 – 6', price: 'Contact for pricing', note: 'Placeholder' },
  { grade: 'Grade 7 – 8', price: 'Contact for pricing', note: 'Placeholder' },
  { grade: 'Debut', price: 'Contact for pricing', note: 'Placeholder' },
]

const FAQS = [
  {
    q: 'Is there a registration or enrollment fee?',
    a: '[Placeholder — describe any registration fees, material fees, or recurring charges. To be confirmed.]',
  },
  {
    q: 'Are there discounts for multiple lessons per week or siblings?',
    a: '[Placeholder — describe any multi-lesson or family discount policies. To be confirmed.]',
  },
  {
    q: 'What is the cancellation and rescheduling policy?',
    a: '[Placeholder — describe the notice period required, any make-up lesson policies, and what happens with late cancellations. To be confirmed.]',
  },
  {
    q: 'Do you offer trial lessons before committing?',
    a: 'Yes — your first lesson is free, with no commitment required. Book a free trial class to meet your instructor and experience the program first-hand.',
  },
]

export default function Pricing() {
  return (
    <>
      <section className={styles.hero}>
        <div className="container">
          <div className="fade-up">
            <div className={styles.eyebrow}>Pricing</div>
            <h1 className={styles.headline}>Transparent pricing, both tracks</h1>
            <p className={styles.desc}>
              We believe great music education should be accessible. Pricing is structured by program, level, and session length.
            </p>
            <div className={styles.disclaimer}>
              ⚠️ Pricing is currently under review — "Contact for pricing" will be replaced with final figures soon.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.tracksSection}>
        <div className="container">
          {/* Contemporary Pricing */}
          <div className={`${styles.trackBlock} fade-up`}>
            <div className={styles.trackHeader}>
              <div>
                <div className={styles.trackTag}>Track 01</div>
                <h2 className={styles.trackTitle}>Contemporary Music</h2>
              </div>
              <Link to="/contemporary-music" className={styles.trackCtaSmall}>
                About this track
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <table className={styles.pricingTable}>
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Session Length</th>
                  <th>Per Session</th>
                </tr>
              </thead>
              <tbody>
                {CONTEMPORARY_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.tier}</td>
                    <td>{row.duration}</td>
                    <td>
                      {/* TODO: Replace with real price e.g. <span className={styles.price}>$XX</span> */}
                      <span className={styles.placeholderPrice}>{row.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Classical Pricing */}
          <div className={`${styles.trackBlock} fade-up`}>
            <div className={styles.trackHeader}>
              <div>
                <div className={styles.trackTag}>Track 02</div>
                <h2 className={styles.trackTitle}>Classical Music</h2>
              </div>
              <Link to="/classical-music" className={styles.trackCtaSmall}>
                About this track
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            <table className={styles.pricingTable}>
              <thead>
                <tr>
                  <th>Grade Range</th>
                  <th>Notes</th>
                  <th>Per Session</th>
                </tr>
              </thead>
              <tbody>
                {CLASSICAL_ROWS.map((row, i) => (
                  <tr key={i}>
                    <td>{row.grade}</td>
                    <td style={{ color: 'var(--color-text-muted)', fontSize: 'var(--text-xs)' }}>
                      {/* TODO: Add notes about what's included at each grade range */}
                      [Session length TBD]
                    </td>
                    <td>
                      <span className={styles.placeholderPrice}>{row.price}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={`${styles.contactPricing} fade-up`}>
              <div className={styles.contactText}>
                <h3>Not sure which level you are?</h3>
                <p>Start with a free trial class. We'll assess your level and recommend the right fit.</p>
              </div>
              <Link to="/free-trial" className={styles.contactBtn}>
                Book Free Trial →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(var(--text-2xl), 4vw, var(--text-4xl))', fontWeight: 'var(--weight-regular)', color: 'var(--color-text-primary)' }}>
              Common questions
            </h2>
          </div>
          <div className={styles.faqGrid}>
            {FAQS.map((faq, i) => (
              <div key={i} className={`${styles.faqItem} fade-up`}>
                <div className={styles.faqQ}>{faq.q}</div>
                <p className={styles.faqA}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="First Lesson Free"
        title="Try before you commit"
        subtitle="Your free trial class includes a level assessment, a lesson preview, and a pricing consultation."
      />
    </>
  )
}
