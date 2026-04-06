import { fmtShort } from '../../utils/helpers'
import styles from './ChartTooltip.module.css'

export default function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className={styles.tooltip}>
      <p className={styles.label}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className={styles.row}>
          <span className={styles.dot} style={{ background: p.color }} />
          <span className={styles.name}>{p.name}</span>
          <span className={styles.value}>{fmtShort(p.value)}</span>
        </div>
      ))}
    </div>
  )
}
