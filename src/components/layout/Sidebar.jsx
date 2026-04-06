import { NavLink } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import styles from './Sidebar.module.css'

const NAV = [
  { to: '/dashboard',    label: 'Dashboard',    icon: '◈' },
  { to: '/transactions', label: 'Transactions', icon: '↕' },
  { to: '/insights',     label: 'Insights',     icon: '◎' },
]

export default function Sidebar({ open, onClose }) {
  const { role, setRole } = useAppStore()

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoMark}>₹</div>
        <span className={styles.logoText}>Ledger</span>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        <p className={styles.navLabel}>Navigation</p>
        {NAV.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onClose}
            className={({ isActive }) =>
              `${styles.navItem} ${isActive ? styles.active : ''}`
            }
          >
            <span className={styles.navIcon}>{icon}</span>
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Role Switcher */}
      <div className={styles.footer}>
        <div className={styles.roleBox}>
          <p className={styles.roleLabel}>Active Role</p>
          <select
            className={styles.roleSelect}
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
          <div className={`${styles.roleBadge} ${role === 'admin' ? styles.admin : styles.viewer}`}>
            <span>{role === 'admin' ? '🔑' : '👁'}</span>
            <span>{role === 'admin' ? 'Full Access' : 'Read Only'}</span>
          </div>
        </div>

        <div className={styles.version}>Ledger v1.0 · 2024</div>
      </div>
    </aside>
  )
}
