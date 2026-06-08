import { useAppStore } from '../store/useAppStore'
import SummaryCard from '../components/ui/SummaryCard'
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart'
import SpendingDonutChart from '../components/dashboard/SpendingDonutChart'
import MonthlyBarChart from '../components/dashboard/MonthlyBarChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import styles from './DashboardPage.module.css'

export default function DashboardPage() {
  const getSummary = useAppStore((s) => s.getSummary)
  const { income, expenses, balance } = getSummary()

  return (
    <div className={styles.page}>
      {/* Summary Cards */}
      <div className={styles.cards}>
        <SummaryCard
          label="Total Balance"
          value={balance}
          accentColor="var(--gold)"
          change="+12.4% vs last month"
          changeUp
          className="animate-slide-up stagger-1"
        />
        <SummaryCard
          label="Total Income"
          value={income}
          accentColor="var(--green)"
          change="+8.2% vs last month"
          changeUp
          className="animate-slide-up stagger-2"
        />
        <SummaryCard
          label="Total Expenses"
          value={expenses}
          accentColor="var(--red)"
          change="−3.1% vs last month"
          className="animate-slide-up stagger-3"
        />
      </div>

      {/* Charts Row */}
      <div className={styles.chartsRow}>
        <div className="animate-slide-up stagger-2">
          <BalanceTrendChart />
        </div>
        <div className="animate-slide-up stagger-3">
          <SpendingDonutChart />
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow}>
        <div className="animate-slide-up stagger-3">
          <MonthlyBarChart />
        </div>
        <div className="animate-slide-up stagger-4">
          <RecentTransactions />
        </div>
      </div>
    </div>
  )
}
