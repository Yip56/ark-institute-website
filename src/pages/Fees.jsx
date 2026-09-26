import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { toPng } from 'html-to-image'
import styles from './Fees.module.css'
import CTABanner from '../components/shared/CTABanner'
import FeesAuthGate from '../components/shared/FeesAuthGate'
import { useFeesAuth } from '../hooks/useFeesAuth'

const INSTRUMENTS         = ['Piano', 'Drum', 'Guitar', 'Violin', 'Vocals', 'Flute']
const CLASSICAL_GRADES    = ['Beginner','Grade 1','Grade 2','Grade 3','Grade 4','Grade 5','Grade 6','Grade 7','Grade 8']
const CONTEMPORARY_GRADES = ['Beginner','Intermediate','Advanced']
const FEES_API_URL         = import.meta.env.VITE_FEES_API_URL

// ── PDF colour palette (mirrors CSS design tokens) ────────────────────────────
const GOLD        = [212, 168, 83]    // #D4A853 --color-accent
const BG          = [13,  13,  15]    // #0D0D0F --color-bg
const BG_CARD     = [26,  26,  30]    // #1A1A1E --color-bg-card
const BG_ELEVATED = [20,  20,  22]    // #141416 --color-bg-elevated
const BG_ALT      = [22,  22,  26]    // alternate row (between card and elevated)
const BORDER      = [42,  42,  50]    // #2A2A32 --color-border
const TEXT_PRI    = [240, 239, 232]   // #F0EFE8 --color-text-primary
const TEXT_MUTED  = [90,  90,  98]    // #5A5A62 --color-text-muted

// ── Build table body rows (raw numbers so custom drawing can split RM + amount)
function makeBodyRows(gradeLabels, instrData) {
  return gradeLabels.map(grade => {
    const row = instrData?.[grade]
    return [grade, row?.['30'] ?? null, row?.['45'] ?? null, row?.['60'] ?? null]
  })
}

// ── jsPDF-autotable hooks — replicate the website's price cell style ──────────
// Each price cell draws a small muted "RM" prefix followed by a large gold amount,
// exactly matching the .rm + .amount elements in FeeTable.
function makePriceCellHooks(doc) {
  return {
    willDrawCell(data) {
      // Suppress autotable's default text for price columns so we can draw manually
      if (data.section === 'body' && data.column.index > 0) {
        data.cell.text = []
      }
    },
    didDrawCell(data) {
      if (data.section === 'body' && data.column.index > 0) {
        const val  = data.cell.raw
        const rx   = data.cell.x + data.cell.width - 5          // right edge (5 mm padding)
        const cy   = data.cell.y + data.cell.height / 2 + 1.5   // vertical centre

        if (val === null || val === undefined) {
          doc.setFontSize(10)
          doc.setTextColor(...TEXT_MUTED)
          doc.setFont('helvetica', 'normal')
          doc.text('—', rx, cy, { align: 'right' })
          return
        }

        const amtStr = String(val)
        // Measure amount width at target font size to position "RM" flush before it
        doc.setFontSize(13)
        doc.setFont('helvetica', 'bold')
        const amtW = doc.getTextWidth(amtStr)

        // "RM" — small, muted
        doc.setFontSize(7)
        doc.setTextColor(...TEXT_MUTED)
        doc.setFont('helvetica', 'normal')
        doc.text('RM', rx - amtW - 1.5, cy)

        // Amount — larger, gold, bold
        doc.setFontSize(13)
        doc.setTextColor(...GOLD)
        doc.setFont('helvetica', 'bold')
        doc.text(amtStr, rx, cy, { align: 'right' })
        doc.setFont('helvetica', 'normal')
      }
    },
    didDrawTable(tbl) {
      // Draw the card's rounded border on top, matching .tableCard border-radius
      doc.setDrawColor(...BORDER)
      doc.setLineWidth(0.4)
      doc.roundedRect(14, tbl.table.startY, 182, tbl.finalY - tbl.table.startY, 2, 2, 'S')
    },
  }
}

// ── Base autotable config shared by all tables ────────────────────────────────
const TABLE_BASE = {
  theme: 'plain',
  margin: { left: 14, right: 14 },
  head: [['LEVEL', '30 MIN / MO', '45 MIN / MO', '60 MIN / MO']],
  headStyles: {
    fillColor: BG_ELEVATED,
    textColor: TEXT_MUTED,
    fontStyle: 'bold',
    fontSize: 7,
    lineColor: BORDER,
    lineWidth: 0.25,
    cellPadding: { top: 4, right: 5, bottom: 4, left: 5 },
  },
  bodyStyles: {
    fillColor: BG_CARD,
    textColor: TEXT_PRI,
    fontSize: 10,
    lineColor: BORDER,
    lineWidth: 0.25,
    cellPadding: { top: 5, right: 5, bottom: 5, left: 5 },
    minCellHeight: 13,
  },
  alternateRowStyles: { fillColor: BG_ALT },
  columnStyles: {
    0: { cellWidth: 55 },
    1: { halign: 'right', cellWidth: 42 },
    2: { halign: 'right', cellWidth: 42 },
    3: { halign: 'right', cellWidth: 42 },
  },
}

// ── Minimal page header ───────────────────────────────────────────────────────
function drawPageHeader(doc, title, subtitle) {
  doc.setFillColor(...BG)
  doc.rect(0, 0, 210, 297, 'F')

  doc.setFontSize(7.5)
  doc.setTextColor(...TEXT_MUTED)
  doc.setFont('helvetica', 'normal')
  doc.text('ARK MUSIC STUDIO', 14, 16)

  doc.setFontSize(18)
  doc.setTextColor(...TEXT_PRI)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 14, 25)

  doc.setFontSize(9)
  doc.setTextColor(...GOLD)
  doc.setFont('helvetica', 'normal')
  doc.text(subtitle.toUpperCase(), 14, 31)

  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.3)
  doc.line(14, 34, 196, 34)
}

// ── Section label (CLASSICAL / CONTEMPORARY) between tables ──────────────────
function drawSectionLabel(doc, label, y) {
  doc.setFontSize(7)
  doc.setTextColor(...TEXT_MUTED)
  doc.setFont('helvetica', 'bold')
  doc.text(label, 14, y)
}

// ── Footer ────────────────────────────────────────────────────────────────────
function drawFooter(doc) {
  doc.setFillColor(...BG)
  doc.rect(0, 282, 210, 15, 'F')
  doc.setDrawColor(...BORDER)
  doc.setLineWidth(0.3)
  doc.line(14, 283, 196, 283)
  doc.setFontSize(7)
  doc.setTextColor(...TEXT_MUTED)
  doc.setFont('helvetica', 'normal')
  const date = new Date().toLocaleDateString('en-MY', { year: 'numeric', month: 'long', day: 'numeric' })
  doc.text(`${date}  ·  Prices subject to change — confirm with the studio before enrolling.`, 14, 288)
}

// ─── Reusable table rendered in the page ─────────────────────────────────────
function FeeTable({ gradeLabels, tableData }) {
  return (
    <table className={styles.feeTable}>
      <thead>
        <tr>
          <th className={styles.colLevel}>Level</th>
          <th className={styles.colPrice}>30 min / mo</th>
          <th className={styles.colPrice}>45 min / mo</th>
          <th className={styles.colPrice}>60 min / mo</th>
        </tr>
      </thead>
      <tbody>
        {gradeLabels.map(grade => {
          const row = tableData?.[grade]
          return (
            <tr key={grade}>
              <td className={styles.tdLevel}>{grade}</td>
              <td className={styles.tdPrice}>
                {row ? <><span className={styles.rm}>RM</span><span className={styles.amount}>{row['30']}</span></> : '—'}
              </td>
              <td className={styles.tdPrice}>
                {row ? <><span className={styles.rm}>RM</span><span className={styles.amount}>{row['45']}</span></> : '—'}
              </td>
              <td className={styles.tdPrice}>
                {row ? <><span className={styles.rm}>RM</span><span className={styles.amount}>{row['60']}</span></> : '—'}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

// ─── Page component ───────────────────────────────────────────────────────────
export default function Fees() {
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
      setError('Fee data is not yet available. Please contact us for pricing information.')
      setLoading(false)
      return
    }
    fetch(FEES_API_URL)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json() })
      .then(json => { setData(json); setLoading(false) })
      .catch(() => {
        setError('Unable to load fees right now. Please try again or contact us directly.')
        setLoading(false)
      })
  }, [])

  const grades    = syllabus === 'classical' ? CLASSICAL_GRADES : CONTEMPORARY_GRADES
  const tableData = data?.[syllabus]?.[instrument] ?? null

  async function downloadPNG() {
    if (!cardRef.current) return
    setDownloading(true)
    try {
      const syllabusLabel = syllabus === 'classical' ? 'Classical' : 'Contemporary'
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true })
      const link = document.createElement('a')
      link.download = `Ark-Fees-${instrument}-${syllabusLabel}.png`
      link.href = dataUrl
      link.click()
    } finally {
      setDownloading(false)
    }
  }

  function downloadAllFees() {
    if (!data) return
    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

    INSTRUMENTS.forEach((inst, idx) => {
      if (idx > 0) doc.addPage()

      drawPageHeader(doc, inst, 'Complete Fee Schedule')

      let y = 39

      drawSectionLabel(doc, 'CLASSICAL', y)
      y += 4
      autoTable(doc, {
        ...TABLE_BASE,
        body: makeBodyRows(CLASSICAL_GRADES, data.classical?.[inst]),
        startY: y,
        ...makePriceCellHooks(doc),
      })

      y = doc.lastAutoTable.finalY + 8

      drawSectionLabel(doc, 'CONTEMPORARY', y)
      y += 4
      autoTable(doc, {
        ...TABLE_BASE,
        body: makeBodyRows(CONTEMPORARY_GRADES, data.contemporary?.[inst]),
        startY: y,
        ...makePriceCellHooks(doc),
      })

      drawFooter(doc)
    })

    doc.save('Ark-Music-Complete-Fee-Schedule.pdf')
  }

  const busy = loading || !!error || downloading

  return (
    <FeesAuthGate {...auth}>
    <div className={styles.root}>
      <section className={styles.hero}>
        <div className="container">
          <div className={`${styles.eyebrow} fade-in`}><span />Fees &amp; Pricing<span /></div>
          <h1 className={`${styles.headline} fade-up`}>Transparent pricing,<br /><em>no surprises</em></h1>
          <p className={`${styles.desc} fade-up`}>
            Monthly fees by instrument, level, and lesson length. All prices in Malaysian Ringgit (RM) for weekly lessons.
          </p>
        </div>
      </section>

      <section className={styles.tableSection}>
        <div className="container">

          {/* Instrument selector */}
          <div className={`${styles.instrumentBar} fade-up`}>
            {INSTRUMENTS.map(inst => (
              <button key={inst}
                className={`${styles.instBtn} ${instrument === inst ? styles.instBtnActive : ''}`}
                onClick={() => setInstrument(inst)}
              >{inst}</button>
            ))}
          </div>

          {/* Syllabus + download row */}
          <div className={`${styles.actionRow} fade-up`}>
            <div className={styles.syllabusToggle}>
              <button className={`${styles.syllabusBtn} ${syllabus === 'classical'    ? styles.syllabusBtnActive : ''}`} onClick={() => setSyllabus('classical')}>Classical</button>
              <button className={`${styles.syllabusBtn} ${syllabus === 'contemporary' ? styles.syllabusBtnActive : ''}`} onClick={() => setSyllabus('contemporary')}>Contemporary</button>
            </div>

            <div className={styles.downloadBtns}>
              <button className={styles.dlBtn} onClick={downloadPNG} disabled={busy}>
                <DownloadIcon />{downloading ? 'Capturing…' : 'Download PNG'}
              </button>
              <button className={`${styles.dlBtn} ${styles.dlBtnAll}`} onClick={downloadAllFees} disabled={busy}>
                <DownloadIcon />Download All Fees
              </button>
            </div>
          </div>

          {/* Table card with instrument background */}
          <div ref={cardRef} className={`${styles.tableCard} fade-up`}>
            <div key={instrument} className={styles.instrumentBg}
              style={{ backgroundImage: `url('/images/instruments/${instrument.toLowerCase()}.webp'), url('/images/instruments/${instrument.toLowerCase()}.png')` }}
            />

            {loading && (
              <div className={styles.loadingState}>
                <div className={styles.skeleton} style={{ width: '100%', height: 44 }} />
                {[...Array(5)].map((_, i) => <div key={i} className={styles.skeleton} style={{ width: '100%', height: 52, marginTop: 2 }} />)}
              </div>
            )}
            {error && !loading && (
              <div className={styles.errorState}>
                <p>{error}</p>
                <Link to="/contact" className={styles.errorLink}>Contact us for pricing →</Link>
              </div>
            )}
            {!loading && !error && <FeeTable gradeLabels={grades} tableData={tableData} />}
          </div>

          <p className={`${styles.footnote} fade-up`}>
            Fees shown are monthly for weekly lessons. Session length is per lesson.
            Prices are subject to change — confirm with the studio before enrolling.
          </p>
        </div>
      </section>

      <CTABanner />
    </div>
    </FeesAuthGate>
  )
}

function DownloadIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
