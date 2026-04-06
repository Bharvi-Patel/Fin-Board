import styles from './ChartCard.module.css'

export default function ChartCard({ title, subtitle, children, action, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action && <div className={styles.action}>{action}</div>}
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  )
}
