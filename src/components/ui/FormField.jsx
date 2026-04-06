import styles from './FormField.module.css'

export function FormField({ label, children, error }) {
  return (
    <div className={styles.group}>
      {label && <label className={styles.label}>{label}</label>}
      {children}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export function Input({ className = '', ...props }) {
  return <input className={`${styles.input} ${className}`} {...props} />
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={`${styles.input} ${styles.select} ${className}`} {...props}>
      {children}
    </select>
  )
}
