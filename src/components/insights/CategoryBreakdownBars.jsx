import { useAppStore } from '../../store/useAppStore'
import { CATEGORIES } from '../../data/mockData'
import { fmt, pct } from '../../utils/helpers'
import ChartCard from '../ui/ChartCard'
import styles from './CategoryBreakdownBars.module.css'

export default function CategoryBreakdownBars() {
  const getSpendByCategory = useAppStore((s) => s.getSpendByCategory)
  const data  = getSpendByCategory()
  const total = data.reduce((s, d) => s + d.value, 0)

  if (!data.length) return null

  const max = data[0].value

  return (
    <ChartCard title="Category Breakdown" subtitle="Relative spending per category">
      <div className={styles.list}>
        {data.map(({ name, value }) => {
          const cat   = CATEGORIES[name] || {}
          const share = pct(value, total)
          const barW  = pct(value, max)
          return (
            <div key={name} className={styles.item}>
              <div className={styles.meta}>
                <span className={styles.catLabel}>
                  <span>{cat.icon}</span> {name}
                </span>
                <div className={styles.right}>
                  <span className={styles.amount}>{fmt(value)}</span>
                  <span className={styles.pct}>{share}%</span>
                </div>
              </div>
              <div className={styles.track}>
                <div
                  className={styles.bar}
                  style={{ width: `${barW}%`, background: cat.color || '#888' }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}
