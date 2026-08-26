import { useState } from 'react'
import styles from './FreeTrial.module.css'

const PERKS = [
  {
    icon: '🎵',
    title: 'A real lesson — not a sales call',
    desc: 'Your free trial is a genuine 30-minute lesson with one of our instructors.',
  },
  {
    icon: '🎯',
    title: 'Level assessment included',
    desc: 'We\'ll identify exactly where you are and which program and tier fits you best.',
  },
  {
    icon: '💬',
    title: 'No pressure follow-up',
    desc: 'We\'ll share our recommendation after the trial. The decision is entirely yours.',
  },
  {
    icon: '📅',
    title: 'Flexible scheduling',
    desc: 'We\'ll find a time that works for you — weekdays and weekends available.',
  },
]

export default function FreeTrial() {
  const [submitted, setSubmitted] = useState(false)

  // TODO: Integrate form submission with backend or form service (e.g. Formspree, SendGrid, Firebase Functions)
  // Currently front-end only — this handler just simulates a submission
  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Replace this with a real API call. Example:
    // const data = Object.fromEntries(new FormData(e.target))
    // await fetch('/api/book-trial', { method: 'POST', body: JSON.stringify(data) })
    setSubmitted(true)
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={styles.inner}>
          {/* Left: value prop */}
          <div className="fade-up">
            <div className={styles.eyebrow}>Free Trial Class</div>
            <h1 className={styles.headline}>
              Your first lesson is on us
            </h1>
            <p className={styles.desc}>
              No commitment, no pressure. Come meet your instructor, play some music, and discover which program is right for you.
            </p>
            <div className={styles.perks}>
              {PERKS.map(p => (
                <div key={p.title} className={styles.perk}>
                  <div className={styles.perkIcon}>{p.icon}</div>
                  <div className={styles.perkText}>
                    <strong>{p.title}</strong>
                    <span>{p.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: form */}
          <div className="fade-up">
            <div className={styles.formCard}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-4)' }}>✦</div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                    We'll be in touch shortly.
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    Thank you for booking a free trial class. One of our team members will contact you within 24 hours to confirm your session time.
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.formTitle}>Book your free trial</div>
                  <div className={styles.formSubtitle}>
                    Fill in the form and we'll reach out within 24 hours to confirm your session.
                  </div>

                  {/* TODO: Connect this form to your booking backend before launch */}
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fieldGroup}>
                      <div className={styles.field}>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" placeholder="Jane" required />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="email">Email Address</label>
                      <input id="email" name="email" type="email" placeholder="jane@example.com" required />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" placeholder="+1 (555) 000-0000" />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="program">Interested Program</label>
                      <select id="program" name="program" required>
                        <option value="">Select a program…</option>
                        <option value="contemporary">Contemporary Music</option>
                        <option value="classical">Classical Music</option>
                        <option value="unsure">Not sure yet</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="instrument">Instrument / Discipline</label>
                      <input id="instrument" name="instrument" type="text" placeholder="e.g. Guitar, Piano, Vocals…" />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="experience">Your Experience Level</label>
                      <select id="experience" name="experience">
                        <option value="">Select…</option>
                        <option value="none">Complete beginner</option>
                        <option value="some">Some experience (self-taught or previous lessons)</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="advanced">Advanced</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="age">Age Group (Student)</label>
                      <select id="age" name="age">
                        <option value="">Select…</option>
                        <option value="child">Child (under 12)</option>
                        <option value="teen">Teen (12–17)</option>
                        <option value="adult">Adult (18+)</option>
                      </select>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="message">Anything else we should know?</label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Goals, schedule preferences, questions…"
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Request Free Trial Class
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </button>
                  </form>

                  <p className={styles.formNote}>
                    We'll reach out within 24 hours. No spam, ever.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
