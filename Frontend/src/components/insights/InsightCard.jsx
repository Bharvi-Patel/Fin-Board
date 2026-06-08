import styles from './InsightCard.module.css'

export default function InsightCard({ icon, label, value, valueColor, description, className = '' }) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.label}>{label}</p>
      <p className={styles.value} style={{ color: valueColor }}>{value}</p>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  )
}
