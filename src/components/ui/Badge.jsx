import { CATEGORIES } from '../../data/mockData'
import styles from './Badge.module.css'

export function CategoryBadge({ category }) {
  const meta = CATEGORIES[category] || { color: '#888', icon: '•', bg: 'rgba(61, 9, 9, 0.1)' }
  return (
    <span
      className={styles.badge}
      style={{ background: meta.bg, color: meta.color }}
    >
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
