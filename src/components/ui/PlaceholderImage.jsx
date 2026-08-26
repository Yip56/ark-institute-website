import styles from './PlaceholderImage.module.css'

// TODO: Replace each PlaceholderImage with a real <img> or <picture> element.
// The `label` prop describes what photo should go here.
export default function PlaceholderImage({ label = 'Photo', width = '100%', height = 320, style = {} }) {
  return (
    <div
      className={styles.placeholder}
      style={{ width, height, ...style }}
      aria-label={`Placeholder: ${label}`}
    >
      <div className={styles.badge}>Placeholder</div>
      <svg className={styles.icon} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
