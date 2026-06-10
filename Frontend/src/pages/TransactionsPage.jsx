import { useState } from 'react'
import { useAppStore } from '../store/useAppStore'
import { useFilterStore } from '../store/useAppStore'
import TransactionFilters from '../components/transactions/TransactionFilters'
import TransactionTable from '../components/transactions/TransactionTable'
import AddTransactionModal from '../components/transactions/AddTransactionModal'
import Button from '../components/ui/Button'
import { exportToCSV } from '../utils/helpers'
import styles from './TransactionsPage.module.css'

export default function TransactionsPage() {
  const [showModal, setShowModal] = useState(false)
  const role        = useAppStore((s) => s.role)
  const transactions = useAppStore((s) => s.transactions)
  const { search, category, type } = useFilterStore()

  const handleExport = () => {
    // Export currently filtered transactions
    let data = [...transactions]
    if (search)        data = data.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase()))
    if (category !== 'all') data = data.filter((t) => t.category === category)
    if (type !== 'all')     data = data.filter((t) => t.type === type)
    exportToCSV(data)
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleExport}>
            ⬇ Export CSV
          </Button>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            + Add Transaction
          </Button>
        </div>
      </div>

      <TransactionFilters />
      <TransactionTable />

      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} />}
    </div>
  )
}
