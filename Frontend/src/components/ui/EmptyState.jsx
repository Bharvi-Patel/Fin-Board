import styles from './EmptyState.module.css'

export default function EmptyState({ icon = '📭', title = 'Nothing here', description = '' }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>{icon}</div>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.desc}>{description}</p>}
    </div>
  )
}
