import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  // TODO: Wire up form submission to backend (e.g. Formspree, EmailJS, or custom API)
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <div className={`${styles.hero} fade-up`}>
          <div className={styles.eyebrow}>Contact</div>
          <h1 className={styles.headline}>Get in touch</h1>
          <p className={styles.desc}>
            Have a question about programs, scheduling, or pricing? We'd love to hear from you.
          </p>
        </div>

        <div className={styles.grid}>
          {/* Contact info + map */}
          <div className={`${styles.infoCol} fade-up`}>
            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📍</div>
              <div>
                <div className={styles.infoLabel}>Studio Address</div>
                {/* TODO: Replace with real studio address */}
                <div className={styles.infoValue}>
                  [Street Address Placeholder]<br />
                  [City, State/Province, Postal Code]
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>📞</div>
              <div>
                <div className={styles.infoLabel}>Phone</div>
                {/* TODO: Replace with real phone number */}
                <div className={styles.infoValue}>
                  <a href="tel:+10000000000">[Phone Number Placeholder]</a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>✉️</div>
              <div>
                <div className={styles.infoLabel}>Email</div>
                {/* TODO: Replace with real contact email */}
                <div className={styles.infoValue}>
                  <a href="mailto:hello@arkinstitute.com">hello@arkinstitute.com</a>
                </div>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>🕐</div>
              <div>
                <div className={styles.infoLabel}>Studio Hours</div>
                {/* TODO: Replace with real studio hours */}
                <div className={styles.infoValue}>
                  [Hours Placeholder — e.g. Mon–Fri 10am–8pm, Sat 9am–5pm]
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            {/* TODO: Replace with an embedded Google Map or Mapbox embed using the real studio address */}
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapBadge}>Map Placeholder</div>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.2" opacity="0.4">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p className={styles.mapText}>
                Embedded map will appear here once the studio address is confirmed.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="fade-up">
            <div className={styles.formCard}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: 'var(--space-8) 0' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 'var(--space-4)' }}>✦</div>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-2xl)', color: 'var(--color-text-primary)', marginBottom: 'var(--space-3)' }}>
                    Message sent.
                  </h2>
                  <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-relaxed)' }}>
                    We'll get back to you within one business day.
                  </p>
                </div>
              ) : (
                <>
                  <div className={styles.formTitle}>Send us a message</div>
                  <div className={styles.formSubtitle}>
                    We typically respond within one business day.
                  </div>

                  {/* TODO: Connect to backend before launch */}
                  <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.fieldGroup}>
                      <div className={styles.field}>
                        <label htmlFor="contactFirst">First Name</label>
                        <input id="contactFirst" name="firstName" type="text" placeholder="Jane" required />
                      </div>
                      <div className={styles.field}>
                        <label htmlFor="contactLast">Last Name</label>
                        <input id="contactLast" name="lastName" type="text" placeholder="Smith" required />
                      </div>
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contactEmail">Email Address</label>
                      <input id="contactEmail" name="email" type="email" placeholder="jane@example.com" required />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contactSubject">Subject</label>
                      <input id="contactSubject" name="subject" type="text" placeholder="e.g. Program enquiry, scheduling question…" />
                    </div>

                    <div className={styles.field}>
                      <label htmlFor="contactMessage">Message</label>
                      <textarea
                        id="contactMessage"
                        name="message"
                        placeholder="Tell us what you'd like to know…"
                        required
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Send Message
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                      </svg>
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
