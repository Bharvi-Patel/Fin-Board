import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import { CATEGORIES } from '../../data/mockData'
import { fmt, fmtDateShort } from '../../utils/helpers'
import ChartCard from '../ui/ChartCard'
import Button from '../ui/Button'
import styles from './RecentTransactions.module.css'

export default function RecentTransactions() {
  const transactions = useAppStore((s) => s.transactions)
  const navigate = useNavigate()
  const recent = transactions.slice(0, 6)

  return (
    <ChartCard
      title="Recent Transactions"
      subtitle="Latest activity"
      action={
        <Button size="sm" onClick={() => navigate('/transactions')}>
          View all →
        </Button>
      }
    >
      <div className={styles.list}>
        {recent.map((txn) => {
          const cat = CATEGORIES[txn.category] || {}
          return (
            <div key={txn.id} className={styles.item}>
              <div className={styles.iconWrap} style={{ background: cat.bg }}>
                <span>{cat.icon}</span>
              </div>
              <div className={styles.info}>
                <p className={styles.name}>{txn.name}</p>
                <p className={styles.meta}>{txn.category} · {fmtDateShort(txn.date)}</p>
              </div>
              <p
                className={styles.amount}
                style={{ color: txn.type === 'income' ? 'var(--green)' : 'var(--text)' }}
              >
                {txn.type === 'income' ? '+' : '-'}{fmt(txn.amount)}
              </p>
            </div>
          )
        })}
      </div>
    </ChartCard>
  )
}
