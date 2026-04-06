import { useMemo } from 'react'
import { useAppStore, useFilterStore } from '../../store/useAppStore'
import { CategoryBadge, TypeBadge } from '../ui/Badge'
import EmptyState from '../ui/EmptyState'
import { fmt, fmtDate } from '../../utils/helpers'
import styles from './TransactionTable.module.css'

const PER_PAGE = 8

export default function TransactionTable() {
  const transactions   = useAppStore((s) => s.transactions)
  const deleteTransaction = useAppStore((s) => s.deleteTransaction)
  const role           = useAppStore((s) => s.role)
  const { search, category, type, sortBy, sortDir, page, toggleSort, setPage } = useFilterStore()

  const filtered = useMemo(() => {
    let data = [...transactions]

    if (search)
      data = data.filter(
        (t) =>
          t.name.toLowerCase().includes(search.toLowerCase()) ||
          t.category.toLowerCase().includes(search.toLowerCase())
      )
    if (category !== 'all') data = data.filter((t) => t.category === category)
    if (type !== 'all')     data = data.filter((t) => t.type === type)

    data.sort((a, b) => {
      const va = sortBy === 'date'   ? new Date(a.date)
               : sortBy === 'amount' ? a.amount
               : a.name.toLowerCase()
      const vb = sortBy === 'date'   ? new Date(b.date)
               : sortBy === 'amount' ? b.amount
               : b.name.toLowerCase()
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1)
    })

    return data
  }, [transactions, search, category, type, sortBy, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE))
  const currentPage = Math.min(page, totalPages)
  const paged = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE)

  const SortIcon = ({ col }) => {
    if (sortBy !== col) return <span className={styles.sortNeutral}>↕</span>
    return <span className={styles.sortActive}>{sortDir === 'asc' ? '↑' : '↓'}</span>
  }

  const pageNums = () => {
    const pages = []
    const total = totalPages
    if (total <= 5) {
      for (let i = 1; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push('…')
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(total - 1, currentPage + 1); i++) pages.push(i)
      if (currentPage < total - 2) pages.push('…')
      pages.push(total)
    }
    return pages
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => toggleSort('date')} className={styles.sortable}>
                Date <SortIcon col="date" />
              </th>
              <th onClick={() => toggleSort('name')} className={styles.sortable}>
                Name <SortIcon col="name" />
              </th>
              <th>Category</th>
              <th>Type</th>
              <th onClick={() => toggleSort('amount')} className={`${styles.sortable} ${styles.right}`}>
                Amount <SortIcon col="amount" />
              </th>
              {role === 'admin' && <th className={styles.center}></th>}
            </tr>
          </thead>
          <tbody>
            {paged.length === 0 ? (
              <tr>
                <td colSpan={role === 'admin' ? 6 : 5}>
                  <EmptyState
                    icon="🔍"
                    title="No transactions found"
                    description="Try adjusting your search or filters."
                  />
                </td>
              </tr>
            ) : (
              paged.map((txn) => (
                <tr key={txn.id} className={styles.row}>
                  <td className={styles.dateCell}>{fmtDate(txn.date)}</td>
                  <td>
                    <div className={styles.txnName}>{txn.name}</div>
                    {txn.note && <div className={styles.txnNote}>{txn.note}</div>}
                  </td>
                  <td><CategoryBadge category={txn.category} /></td>
                  <td><TypeBadge type={txn.type} /></td>
                  <td className={`${styles.amountCell} ${txn.type === 'income' ? styles.income : ''}`}>
                    {txn.type === 'income' ? '+' : '−'}{fmt(txn.amount)}
                  </td>
                  {role === 'admin' && (
                    <td className={styles.center}>
                      <button
                        className={styles.deleteBtn}
                        onClick={() => deleteTransaction(txn.id)}
                        title="Delete transaction"
                      >
                        ✕
                      </button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className={styles.pagination}>
        <span className={styles.paginInfo}>
          {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
        </span>
        <div className={styles.pageButtons}>
          <button
            className={styles.pageBtn}
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
          >‹</button>
          {pageNums().map((p, i) =>
            p === '…'
              ? <span key={`ellipsis-${i}`} className={styles.ellipsis}>…</span>
              : (
                <button
                  key={p}
                  className={`${styles.pageBtn} ${currentPage === p ? styles.active : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )
          )}
          <button
            className={styles.pageBtn}
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >›</button>
        </div>
      </div>
    </div>
  )
}
