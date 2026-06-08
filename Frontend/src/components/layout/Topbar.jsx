import { useAppStore } from '../../store/useAppStore'
import styles from './Topbar.module.css'

export default function Topbar({ title, subtitle, onMenuClick }) {
  const { role } = useAppStore()

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick} aria-label="Open sidebar">
          <span />
          <span />
          <span />
        </button>
        <div>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>

      <div className={styles.right}>
        <div className={`${styles.rolePill} ${role === 'admin' ? styles.admin : styles.viewer}`}>
          <span>{role === 'admin' ? '🔑' : '👁'}</span>
          <span className={styles.roleText}>{role === 'admin' ? 'Admin' : 'Viewer'}</span>
        </div>
      </div>
    </header>
  )
}
