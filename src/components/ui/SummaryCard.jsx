import styles from './SummaryCard.module.css'
import { fmt } from '../../utils/helpers'

export default function SummaryCard({
  label,
  value,
  accentColor,
  change,
  changeUp,
  className = '',
}) {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.accent} style={{ background: accentColor }} />
      <p className={styles.label}>{label}</p>
      <p className={styles.value} style={{ color: accentColor }}>
        {fmt(value)}
      </p>
      {change && (
        <p className={`${styles.change} ${changeUp ? styles.up : styles.down}`}>
          <span className={styles.arrow}>{changeUp ? '↑' : '↓'}</span>
          {change}
        </p>
      )}
    </div>
  )
}
