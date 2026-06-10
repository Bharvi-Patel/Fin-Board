import { useAppStore } from '../../store/useAppStore'
import styles from './Topbar.module.css'

export default function Topbar({ title, subtitle, onMenuClick }) {
  const { user } = useAppStore()

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open sidebar">
          <span /><span /><span />
        </button>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.userPill}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className={styles.userName}>{user?.name || 'User'}</span>
        </div>
      </div>
    </header>
  )
}