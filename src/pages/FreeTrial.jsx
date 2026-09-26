import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.js'
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

// Replace with the studio's WhatsApp number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = '60189844279'

const PROGRAM_LABELS = {
  contemporary: 'Contemporary Music',
  classical: 'Classical Music',
  unsure: 'Not sure yet',
}

const EXPERIENCE_LABELS = {
  none: 'Complete beginner',
  some: 'Some experience',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const AGE_LABELS = {
  child: 'Child (under 12)',
  teen: 'Teen (12–17)',
  adult: 'Adult (18+)',
}

export default function FreeTrial() {
  const [submitted, setSubmitted] = useState(false)
  const [sending,   setSending]   = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSending(true)
    const d = Object.fromEntries(new FormData(e.target))

    const programLabel    = PROGRAM_LABELS[d.program]    ?? d.program    ?? '—'
    const experienceLabel = EXPERIENCE_LABELS[d.experience] ?? d.experience ?? '—'
    const ageLabel        = AGE_LABELS[d.age]            ?? d.age         ?? '—'
    const fullName        = `${d.firstName} ${d.lastName}`

    // 1. Open WhatsApp with pre-filled message
    const waLines = [
      `Hi Ark Music Studio! I'd like to book a free trial class. 🎵`,
      ``,
      `*Name:* ${fullName}`,
      `*Email:* ${d.email}`,
      d.phone      ? `*Phone:* ${d.phone}`                  : null,
      d.program    ? `*Program:* ${programLabel}`           : null,
      d.instrument ? `*Instrument:* ${d.instrument}`        : null,
      d.experience ? `*Experience:* ${experienceLabel}`     : null,
      d.age        ? `*Age Group:* ${ageLabel}`             : null,
      d.message    ? `\n*Additional info:*\n${d.message}`   : null,
    ].filter(Boolean).join('\n')
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waLines)}`, '_blank')

    // 2. Send email via EmailJS
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:   fullName,
          from_email:  d.email,
          phone:       d.phone       || '—',
          program:     programLabel,
          instrument:  d.instrument  || '—',
          experience:  experienceLabel,
          age_group:   ageLabel,
          message:     d.message     || '—',
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      )
    } catch (err) {
      console.warn('EmailJS failed:', err)
    }

    // 3. Write notification to StudioOS Firestore (visible to all admins)
    try {
      await addDoc(collection(db, 'notifications'), {
        type:       'trial_booking',
        toRole:     'admin',
        status:     'pending',
        name:       fullName,
        email:      d.email,
        phone:      d.phone       || '',
        program:    programLabel,
        instrument: d.instrument  || '',
        experience: experienceLabel,
        ageGroup:   ageLabel,
        message:    d.message     || '',
        createdAt:  serverTimestamp(),
      })
    } catch (err) {
      console.warn('Firestore notification failed:', err)
    }

    setSending(false)
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
                    Almost there!
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    Your details are pre-filled in WhatsApp — just hit <strong style={{ color: 'var(--color-text-primary)' }}>Send</strong> to complete your booking request. We'll confirm your session time shortly.
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

                    <button type="submit" className={styles.submitBtn} disabled={sending}>
                      {sending ? 'Sending…' : 'Send via WhatsApp'}
                      {!sending && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      )}
                    </button>
                  </form>

                  <p className={styles.formNote}>
                    Tapping the button opens WhatsApp with your details pre-filled — just hit send.
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
