import { useFilterStore } from '../../store/useAppStore'
import { CATEGORIES } from '../../data/mockData'
import { Input, Select } from '../ui/FormField'
import Button from '../ui/Button'
import styles from './TransactionFilters.module.css'

export default function TransactionFilters() {
  const { search, category, type, setSearch, setCategory, setType, resetFilters } = useFilterStore()
  const hasFilters = search || category !== 'all' || type !== 'all'

  return (
    <div className={styles.row}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <Input
          className={styles.searchInput}
          placeholder="Search by name or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Select
        className={styles.select}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        {Object.keys(CATEGORIES).map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </Select>

      <Select
        className={styles.select}
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </Select>

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={resetFilters}>
          Clear
        </Button>
      )}
    </div>
  )
}
