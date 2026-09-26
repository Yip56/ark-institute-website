import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { toPng } from 'html-to-image'
import SectionLabel from '../components/ui/SectionLabel'
import CTABanner from '../components/shared/CTABanner'
import FeesAuthGate from '../components/shared/FeesAuthGate'
import { useFeesAuth } from '../hooks/useFeesAuth'
import styles from './Pricing.module.css'
import feeStyles from './Fees.module.css'

// ── Fee data constants ────────────────────────────────────────────────────────
const INSTRUMENTS         = ['Piano', 'Drum', 'Guitar', 'Violin', 'Vocals', 'Flute']
const CLASSICAL_GRADES    = ['Beginner','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8']
const CONTEMPORARY_GRADES = ['Beginner','Intermediate','Advanced']
const FEES_API_URL         = import.meta.env.VITE_FEES_API_URL

// ── PDF colour palette ────────────────────────────────────────────────────────
const GOLD        = [212, 168, 83]
const BG          = [13,  13,  15]
const BG_CARD     = [26,  26,  30]
const BG_ELEVATED = [20,  20,  22]
const BG_ALT      = [22,  22,  26]
const BORDER      = [42,  42,  50]
const TEXT_PRI    = [240, 239, 232]
const TEXT_MUTED  = [90,  90,  98]

function makeBodyRows(gradeLabels, instrData) {
  return gradeLabels.map(grade => {
    const row = instrData?.[grade]
    return [grade, row?.['30'] ?? null, row?.['45'] ?? null, row?.['60'] ?? null]
  })
}

function makePriceCellHooks(doc) {
  return {
    willDrawCell(data) {
      if (data.section === 'body' && data.column.index > 0) data.cell.text = []
    },
    didDrawCell(data) {
      if (data.section === 'body' && data.column.index > 0) {
        const val = data.cell.raw
        const rx  = data.cell.x + data.cell.width - 5
        const cy  = data.cell.y + data.cell.height / 2 + 1.5
        if (val === null || val === undefined) {
          doc.setFontSize(10); doc.setTextColor(...TEXT_MUTED); doc.setFont('helvetica', 'normal')
          doc.text('—', rx, cy, { align: 'right' }); return
        }
        const amtStr = String(val)
        doc.setFontSize(13); doc.setFont('helvetica', 'bold')
        const amtW = doc.getTextWidth(amtStr)
        doc.setFontSize(7); doc.setTextColor(...TEXT_MUTED); doc.setFont('helvetica', 'normal')
        doc.text('RM', rx - amtW - 1.5, cy)
        doc.setFontSize(13); doc.setTextColor(...GOLD); doc.setFont('helvetica', 'bold')
        doc.text(amtStr, rx, cy, { align: 'right' }); doc.setFont('helvetica', 'normal')
      }
    },
    didDrawTable(tbl) {
      doc.setDrawColor(...BORDER); doc.setLineWidth(0.4)
      doc.roundedRect(14, tbl.table.startY, 182, tbl.finalY - tbl.table.startY, 2, 2, 'S')
    },
  }
}

const TABLE_BASE = {
  theme: 'plain', margin: { left: 14, right: 14 },
  head: [['LEVEL', '30 MIN / MO', '45 MIN / MO', '60 MIN / MO']],
  headStyles: { fillColor: BG_ELEVATED, textColor: TEXT_MUTED, fontStyle: 'bold', fontSize: 7, lineColor: BORDER, lineWidth: 0.25, cellPadding: { top: 4, right: 5, bottom: 4, left: 5 } },
  bodyStyles: { fillColor: BG_CARD, textColor: TEXT_PRI, fontSize: 10, lineColor: BORDER, lineWidth: 0.25, cellPadding: { top: 5, right: 5, bottom: 5, left: 5 }, minCellHeight: 13 },
  alternateRowStyles: { fillColor: BG_ALT },
  columnStyles: { 0: { cellWidth: 55 }, 1: { halign: 'right', cellWidth: 42 }, 2: { halign: 'right', cellWidth: 42 }, 3: { halign: 'right', cellWidth: 42 } },
}

function drawPageHeader(doc, title, subtitle) {
  doc.setFillColor(...BG); doc.rect(0, 0, 210, 297, 'F')
  doc.setFontSize(7.5); doc.setTextColor(...TEXT_MUTED); doc.setFont('helvetica', 'normal')
  doc.text('ARK MUSIC STUDIO', 14, 16)
  doc.setFontSize(18); doc.setTextColor(...TEXT_PRI); doc.setFont('helvetica', 'bold')
  doc.text(title, 14, 25)
  doc.setFontSize(9); doc.setTextColor(...GOLD); doc.setFont('helvetica', 'normal')
  doc.text(subtitle.toUpperCase(), 14, 31)
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.3); doc.line(14, 34, 196, 34)
}

function drawSectionLabel(doc, label, y) {
  doc.setFontSize(7); doc.setTextColor(...TEXT_MUTED); doc.setFont('helvetica', 'bold')
  doc.text(label, 14, y)
}

function drawFooter(doc) {
  doc.setFillColor(...BG); doc.rect(0, 282, 210, 15, 'F')
  doc.setDrawColor(...BORDER); doc.setLineWidth(0.3); doc.line(14, 283, 196, 283)
  doc.setFontSize(7); doc.setTextColor(...TEXT_MUTED); doc.setFont('helvetica', 'normal')
  const date = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.text(`${date}  ·  Prices subject to change — confirm with the studio before enrolling.`, 14, 288)
}

// ── Inline fee table (rendered to screen) ────────────────────────────────────
function FeeTable({ gradeLabels, tableData }) {
  return (
    <table className={feeStyles.feeTable}>
      <thead>
        <tr>
          <th className={feeStyles.colLevel}>Level</th>
          <th className={feeStyles.colPrice}>30 min / mo</th>
          <th className={feeStyles.colPrice}>45 min / mo</th>
          <th className={feeStyles.colPrice}>60 min / mo</th>
        </tr>
      </thead>
      <tbody>
        {gradeLabels.map(grade => {
          const row = tableData?.[grade]
          return (
            <tr key={grade}>
              <td className={feeStyles.tdLevel}>{grade}</td>
              <td className={feeStyles.tdPrice}>{row ? <><span className={feeStyles.rm}>RM</span><span className={feeStyles.amount}>{row['30']}</span></> : '—'}</td>
              <td className={feeStyles.tdPrice}>{row ? <><span className={feeStyles.rm}>RM</span><span className={feeStyles.amount}>{row['45']}</span></> : '—'}</td>
              <td className={feeStyles.tdPrice}>{row ? <><span className={feeStyles.rm}>RM</span><span className={feeStyles.amount}>{row['60']}</span></> : '—'}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ── Track content data ────────────────────────────────────────────────────────
const CONTEMPORARY_LEVELS = [
  { name: 'Beginner', desc: 'Just starting out. Learn chords, basic rhythm, and start playing real songs from your very first sessions.' },
  { name: 'Intermediate', desc: 'Building depth. More complex songs, improvisation basics, and developing your own playing style.' },
  { name: 'Advanced', desc: 'Performance-ready. Polished technique, advanced arrangements, and the confidence to own a stage.' },
]

const CONTEMPORARY_MILESTONES = [
  'Chord vocabulary & progressions', 'Rhythm, timing & groove',
  'Ear training & transcription', 'Practical music theory',
  'Improvisation & expression', 'Performance & stage skills',
]

const CLASSICAL_MILESTONES = [
  'Scales, arpeggios & technical exercises', 'Pieces & repertoire from formal syllabus',
  'Sight-reading', 'Aural training & dictation',
  'Integrated music theory', 'Grade examinations (ABRSM / Trinity)',
]

const FAQS = [
  {
    q: 'How many lessons are there per month?',
    a: '4 lessons per month. When a calendar month has 5 weeks, the 5th week is a studio holiday — so your monthly fee stays consistent year-round with no pro-rating needed.',
  },
  {
    q: 'What session length should I choose?',
    a: '45 or 60 minutes gives the best learning pace for most students. 30 minutes works well for young beginners (ages 5–7) who have shorter attention spans. Your teacher will advise during the free trial.',
  },
  {
    q: 'Is there a registration or enrollment fee?',
    a: '[Placeholder — confirm any registration, material, or one-time fees before publishing.]',
  },
  {
    q: 'Can I switch between Contemporary and Classical?',
    a: 'Yes — though we recommend committing to one track for at least 3 months to build real momentum. Talk to your teacher if you\'re considering a switch.',
  },
  {
    q: 'What is the cancellation and rescheduling policy?',
    a: '[Placeholder — describe notice period, make-up lesson policy, and late-cancellation rules before publishing.]',
  },
  {
    q: 'Do you offer trial lessons before committing?',
    a: 'Yes — your first lesson is completely free with no commitment required. Book a free trial to meet your instructor, get a level assessment, and experience the program first-hand.',
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Pricing() {
  const auth = useFeesAuth()

  const [data,        setData]        = useState(null)
  const [loading,     setLoading]     = useState(true)
  const [error,       setError]       = useState(null)
  const [instrument,  setInstrument]  = useState('Piano')
  const [syllabus,    setSyllabus]    = useState('classical')
  const [downloading, setDownloading] = useState(false)

  const cardRef = useRef(null)

  useEffect(() => {
    if (!FEES_API_URL) {
      setError('Fee data is not yet available.'); setLoading(false); return
    }
    fetch(FEES_API_URL)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(json => { setData(json); setLoading(false) })
      .catch(() => { setError('Unable to load fees right now.'); setLoading(false) })
  }, [])

  const grades    = syllabus === 'classical' ? CLASSICAL_GRADES : CONTEMPORARY_GRADES
  const tableData = data?.[syllabus]?.[instrument] ?? null
  const busy      = loading || !!error || downloading

  async function downloadPNG() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const syllabusLabel = syllabus === 'classical' ? 'Classical' : 'Contemporary'
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true })
      const link = document.createElement('a')
      link.download = `Ark-Fees-${instrument}-${syllabusLabel}.png`
      link.href = dataUrl; link.click()
    } finally { setDownloading(false) }
  }

  function downloadAllFees() {
    if (!data) return
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
    INSTRUMENTS.forEach((inst, idx) => {
      if (idx > 0) doc.addPage()
      drawPageHeader(doc, inst, 'Complete Fee Schedule')
      let y = 39
      drawSectionLabel(doc, 'CLASSICAL', y); y += 4
      autoTable(doc, { ...TABLE_BASE, body: makeBodyRows(CLASSICAL_GRADES, data.classical?.[inst]), startY: y, ...makePriceCellHooks(doc) })
      y = doc.lastAutoTable.finalY + 8
      drawSectionLabel(doc, 'CONTEMPORARY', y); y += 4
      autoTable(doc, { ...TABLE_BASE, body: makeBodyRows(CONTEMPORARY_GRADES, data.contemporary?.[inst]), startY: y, ...makePriceCellHooks(doc) })
      drawFooter(doc)
    })
    doc.save('Ark-Music-Complete-Fee-Schedule.pdf')
  }

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="container">
          <div className="fade-up">
            <div className={styles.eyebrow}>Pricing</div>
            <h1 className={styles.headline}>Structured programs,<br /><em>clear pricing</em></h1>
            <p className={styles.desc}>
              Two tracks, six instruments, three session lengths. Fees are set per month based on weekly lessons — no hidden charges.
            </p>
          </div>
        </div>
      </section>

      {/* ── Track sections ───────────────────────────────────────────── */}
      <section className={styles.tracksSection}>
        <div className="container">

          {/* Contemporary */}
          <div className={`${styles.trackBlock} fade-up`}>
            <div className={styles.trackHeader}>
              <div>
                <div className={styles.trackTag}>Contemporary Music</div>
                <h2 className={styles.trackTitle}>Play the music <em>you love</em></h2>
              </div>
              <Link to="/contemporary-music" className={styles.trackCtaSmall}>
                About this track
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className={styles.trackDesc}>
              You pick the songs — we build everything else around them. Contemporary is about learning through music that actually excites you. While the repertoire is student-led, every lesson follows a structured plan covering technique, theory, ear training, and performance skills. You'll always know exactly where you're headed and what you've achieved.
            </p>

            <div className={styles.levelCards}>
              {CONTEMPORARY_LEVELS.map(lv => (
                <div key={lv.name} className={styles.levelCard}>
                  <div className={styles.levelName}>{lv.name}</div>
                  <p className={styles.levelDesc}>{lv.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.sessionRow}>
              <span className={styles.sessionLabel}>Session lengths</span>
              {['30 min', '45 min', '60 min'].map(d => <span key={d} className={styles.sessionPill}>{d}</span>)}
            </div>

            <div className={styles.milestonesGrid}>
              {CONTEMPORARY_MILESTONES.map(m => (
                <div key={m} className={styles.milestone}><CheckIcon />{m}</div>
              ))}
            </div>
          </div>

          {/* Classical */}
          <div className={`${styles.trackBlock} fade-up`}>
            <div className={styles.trackHeader}>
              <div>
                <div className={styles.trackTag}>Classical Music</div>
                <h2 className={styles.trackTitle}>A graded <em>journey</em></h2>
              </div>
              <Link to="/classical-music" className={styles.trackCtaSmall}>
                About this track
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </Link>
            </div>

            <p className={styles.trackDesc}>
              Classical follows an internationally recognised graded syllabus — from Beginner all the way through Grade 8. Each grade introduces new pieces, technical studies, scales, sight-reading, and aural skills, building into a complete musical foundation. Students can sit for formal grade examinations at any level, earning internationally recognised certificates.
            </p>

            <div className={styles.gradeRow}>
              {CLASSICAL_GRADES.map(g => <span key={g} className={styles.gradeChip}>{g}</span>)}
            </div>

            <div className={styles.sessionRow}>
              <span className={styles.sessionLabel}>Session lengths</span>
              {['30 min', '45 min', '60 min'].map(d => <span key={d} className={styles.sessionPill}>{d}</span>)}
            </div>

            <div className={styles.milestonesGrid}>
              {CLASSICAL_MILESTONES.map(m => (
                <div key={m} className={styles.milestone}><CheckIcon />{m}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How lessons are structured ───────────────────────────────── */}
      <section className={styles.scheduleSection}>
        <div className="container">
          <div className={`${styles.scheduleCard} fade-up`}>
            <div className={styles.scheduleItems}>
              <div className={styles.scheduleItem}>
                <div className={styles.scheduleIcon}>4</div>
                <div>
                  <div className={styles.scheduleItemTitle}>Lessons per month</div>
                  <div className={styles.scheduleItemDesc}>One lesson per week, billed monthly at a fixed rate.</div>
                </div>
              </div>
              <div className={styles.scheduleDivider} />
              <div className={styles.scheduleItem}>
                <div className={styles.scheduleIcon}>⏱</div>
                <div>
                  <div className={styles.scheduleItemTitle}>30 · 45 · 60 min</div>
                  <div className={styles.scheduleItemDesc}>Choose the session length that fits your age and goals.</div>
                </div>
              </div>
              <div className={styles.scheduleDivider} />
              <div className={styles.scheduleItem}>
                <div className={styles.scheduleIcon}>🌿</div>
                <div>
                  <div className={styles.scheduleItemTitle}>5-week months</div>
                  <div className={styles.scheduleItemDesc}>When a month has 5 weeks, the 5th lesson is a studio holiday. Fees stay consistent year-round.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Live fee schedule (staff-gated) ──────────────────────────── */}
      <section className={styles.feeSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>Live Fee Schedule</SectionLabel>
            <h2 className={styles.feeSectionTitle}>Exact fees by instrument &amp; level</h2>
            <p className={styles.feeSectionDesc}>
              Sign in with your Ark Music Studio staff account to view detailed pricing.
            </p>
          </div>

          <FeesAuthGate {...auth} inline>

            {/* Instrument selector */}
            <div className={`${feeStyles.instrumentBar} fade-up`}>
              {INSTRUMENTS.map(inst => (
                <button key={inst}
                  className={`${feeStyles.instBtn} ${instrument === inst ? feeStyles.instBtnActive : ''}`}
                  onClick={() => setInstrument(inst)}
                >{inst}</button>
              ))}
            </div>

            {/* Syllabus + download row */}
            <div className={`${feeStyles.actionRow} fade-up`}>
              <div className={feeStyles.syllabusToggle}>
                <button className={`${feeStyles.syllabusBtn} ${syllabus === 'classical'    ? feeStyles.syllabusBtnActive : ''}`} onClick={() => setSyllabus('classical')}>Classical</button>
                <button className={`${feeStyles.syllabusBtn} ${syllabus === 'contemporary' ? feeStyles.syllabusBtnActive : ''}`} onClick={() => setSyllabus('contemporary')}>Contemporary</button>
              </div>
              <div className={feeStyles.downloadBtns}>
                <button className={feeStyles.dlBtn} onClick={downloadPNG} disabled={busy}>
                  <DownloadIcon />{downloading ? 'Capturing…' : 'Download PNG'}
                </button>
                <button className={`${feeStyles.dlBtn} ${feeStyles.dlBtnAll}`} onClick={downloadAllFees} disabled={busy}>
                  <DownloadIcon />Download All Fees
                </button>
              </div>
            </div>

            {/* Table card */}
            <div ref={cardRef} className={`${feeStyles.tableCard} fade-up`}>
              <div key={instrument} className={feeStyles.instrumentBg}
                style={{ backgroundImage: `url('/images/instruments/${instrument.toLowerCase()}.webp'), url('/images/instruments/${instrument.toLowerCase()}.png')` }}
              />
              {loading && (
                <div className={feeStyles.loadingState}>
                  <div className={feeStyles.skeleton} style={{ width: '100%', height: 44 }} />
                  {[...Array(5)].map((_, i) => <div key={i} className={feeStyles.skeleton} style={{ width: '100%', height: 52, marginTop: 2 }} />)}
                </div>
              )}
              {error && !loading && (
                <div className={feeStyles.errorState}>
                  <p>{error}</p>
                  <Link to="/contact" className={feeStyles.errorLink}>Contact us for pricing →</Link>
                </div>
              )}
              {!loading && !error && <FeeTable gradeLabels={grades} tableData={tableData} />}
            </div>

            <p className={`${feeStyles.footnote} fade-up`}>
              Fees shown are monthly for weekly lessons. Session length is per lesson. Prices are subject to change — confirm with the studio before enrolling.
            </p>

          </FeesAuthGate>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className={styles.faqSection}>
        <div className="container">
          <div className="fade-up">
            <SectionLabel>FAQ</SectionLabel>
            <h2 className={styles.faqHeading}>Common questions</h2>
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

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: 'var(--color-accent)' }}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
