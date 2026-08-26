import styles from './PlaceholderVideo.module.css'

// TODO: Replace this component with a real <video> element or YouTube/Vimeo embed.
// When real footage is available, drop it into the hero with autoplay + muted + loop.
export default function PlaceholderVideo({ label = 'Studio video', height = 500 }) {
  return (
    <div className={styles.placeholder} style={{ height }}>
      <div className={styles.badge}>Video Placeholder</div>
      <div className={styles.playCircle}>
        <svg className={styles.playIcon} width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
      <p className={styles.label}>{label}</p>
    </div>
  )
}
