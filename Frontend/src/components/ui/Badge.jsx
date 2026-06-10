import { CATEGORIES } from '../../data/mockData'
import styles from './Badge.module.css'

export function CategoryBadge({ category }) {
  const meta = CATEGORIES[category] || { icon: '•' }
  return (
    <span className={`${styles.badge} ${styles.category}`}>
      <span>{meta.icon}</span>
      <span>{category}</span>
    </span>
  )
}

export function TypeBadge({ type }) {
  return (
    <span className={`${styles.badge} ${type === 'income' ? styles.income : styles.expense}`}>
      <span>{type === 'income' ? '↑' : '↓'}</span>
      <span>{type}</span>
    </span>
  )
}