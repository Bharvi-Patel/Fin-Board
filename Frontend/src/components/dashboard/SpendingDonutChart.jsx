import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useAppStore } from '../../store/useAppStore'
import { CATEGORIES } from '../../data/mockData'
import { fmtShort, pct } from '../../utils/helpers'
import ChartCard from '../ui/ChartCard'
import styles from './SpendingDonutChart.module.css'

export default function SpendingDonutChart() {
  const getSpendByCategory = useAppStore((s) => s.getSpendByCategory)
  const data = getSpendByCategory()
  const total = data.reduce((s, d) => s + d.value, 0)

  return (
    <ChartCard title="Spendings" subtitle="By category this period">
      <ResponsiveContainer width="100%" height={170}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={48}
            outerRadius={75}
            dataKey="value"
            paddingAngle={2}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell
                key={i}
                fill={CATEGORIES[entry.name]?.color || '#888'}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(v) => fmtShort(v)}
            contentStyle={{
              background: 'var(--surface2)',
              border: '1px solid var(--border2)',
              borderRadius: '8px',
              fontSize: '12px',
              color: 'var(--text)',
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className={styles.legend}>
        {data.slice(0, 6).map((cat) => (
          <div key={cat.name} className={styles.legendItem}>
            <div
              className={styles.dot}
              style={{ background: CATEGORIES[cat.name]?.color || '#888' }}
            />
            <span className={styles.catName}>{cat.name}</span>
            <span className={styles.catPct}>{pct(cat.value, total)}%</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
