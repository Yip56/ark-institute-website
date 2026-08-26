import { Link } from 'react-router-dom'
import styles from './Button.module.css'

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ...rest
}) {
  const cls = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`

  if (to) {
    return <Link to={to} className={cls} {...rest}>{children}</Link>
  }
  if (href) {
    return <a href={href} className={cls} {...rest}>{children}</a>
  }
  return (
    <button type={type} className={cls} onClick={onClick} {...rest}>
      {children}
    </button>
  )
}
