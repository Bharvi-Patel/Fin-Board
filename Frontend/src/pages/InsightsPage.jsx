import { useMemo } from 'react'
import { useAppStore } from '../store/useAppStore'
import { CATEGORIES } from '../data/mockData'
import { fmt, pct } from '../utils/helpers'
import InsightCard from '../components/insights/InsightCard'
import CategoryBreakdownBars from '../components/insights/CategoryBreakdownBars'
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart'
import styles from './InsightsPage.module.css'

export default function InsightsPage() {
  const getSummary          = useAppStore((s) => s.getSummary)
  const getSpendByCategory  = useAppStore((s) => s.getSpendByCategory)
  const transactions        = useAppStore((s) => s.transactions)

  const { income, expenses, balance } = getSummary()
  const catSpend = getSpendByCategory()

  const topCat = catSpend[0]

  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : 0
  const savingsGood = parseFloat(savingsRate) >= 20

  const expenseTxns = transactions.filter((t) => t.type === 'expense')
  const avgExpense  = expenseTxns.length ? Math.round(expenses / expenseTxns.length) : 0

  const mostFreqCat = useMemo(() => {
    const map = {}
    expenseTxns.forEach((t) => { map[t.category] = (map[t.category] || 0) + 1 })
    const sorted = Object.entries(map).sort((a, b) => b[1] - a[1])
    return sorted[0]
  }, [expenseTxns])

  const incomeSources = useMemo(
    () => [...new Set(transactions.filter((t) => t.type === 'income').map((t) => t.category))].length,
    [transactions]
  )

  const topCatColor = topCat ? CATEGORIES[topCat.name]?.color : 'var(--text)'

  return (
    <div className={styles.page}>
      {/* KPI Cards */}
      <div className={styles.grid}>
        <InsightCard
          icon="🏆"
          label="Top Spending Category"
          value={topCat ? topCat.name : '—'}
          valueColor={topCatColor}
          description={
            topCat
              ? `${fmt(topCat.value)} spent — ${pct(topCat.value, expenses)}% of total expenses`
              : 'No expense data yet'
          }
          className="animate-slide-up stagger-1"
        />
        <InsightCard
          icon="💰"
          label="Savings Rate"
          value={`${savingsRate}%`}
          valueColor={savingsGood ? 'var(--green)' : 'var(--red)'}
          description={
            savingsGood
              ? 'Great! You\'re saving above the recommended 20% benchmark.'
              : 'Aim to save at least 20% of your income each month.'
          }
          className="animate-slide-up stagger-2"
        />
        <InsightCard
          icon="📊"
          label="Avg Transaction"
          value={fmt(avgExpense)}
          description="Average amount per expense transaction this period"
          className="animate-slide-up stagger-3"
        />
        <InsightCard
          icon="🔁"
          label="Most Frequent Category"
          value={mostFreqCat ? mostFreqCat[0] : '—'}
          valueColor={mostFreqCat ? CATEGORIES[mostFreqCat[0]]?.color : 'var(--text)'}
          description={mostFreqCat ? `${mostFreqCat[1]} transactions in this category` : 'No data yet'}
          className="animate-slide-up stagger-1"
        />
        <InsightCard
          icon="📅"
          label="Month-over-Month"
          value="+12.4%"
          valueColor="var(--gold)"
          description="Balance grew 12.4% compared to last month — best month in 6 months"
          className="animate-slide-up stagger-2"
        />
        <InsightCard
          icon="⚡"
          label="Income Sources"
          value={`${incomeSources} source${incomeSources !== 1 ? 's' : ''}`}
          valueColor="var(--blue)"
          description="Diversified income streams reduce financial risk and volatility"
          className="animate-slide-up stagger-3"
        />
      </div>

      {/* Charts */}
      <div className={styles.chartsRow}>
        <div className="animate-slide-up stagger-2">
          <CategoryBreakdownBars />
        </div>
        <div className="animate-slide-up stagger-3">
          <MonthlyBarChart />
        </div>
      </div>
    </div>
  )
}
