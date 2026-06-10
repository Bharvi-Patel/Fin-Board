import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppStore } from '../../store/useAppStore'
import styles from './Sidebar.module.css'

const NAV = [
  { to: '/dashboard',    label: 'Dashboard',    icon: '◈' },
  { to: '/transactions', label: 'Transactions', icon: '↕' },
  { to: '/insights',     label: 'Insights',     icon: '◎' },
]

export default function Sidebar({ open, onClose }) {
  const { user, logout, deleteAccount } = useAppStore()
  const navigate = useNavigate()
  const [showConfirm, setShowConfirm] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      await deleteAccount()
      navigate('/login')
    } catch {
      setDeleting(false)
      setShowConfirm(false)
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '?'

  return (
    <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoMark}>💰</div>
        <span className={styles.logoText}>FinBoard</span>
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

      {/* Footer — Profile */}
      <div className={styles.footer}>
        <div className={styles.profile}>
          <div className={styles.avatar}>{initials}</div>

          <div className={styles.userInfo}>
            <p className={styles.userName}>{user?.name || 'User'}</p>
            <p className={styles.userEmail}>{user?.email || ''}</p>
          </div>

          <div className={styles.profileActions}>
            {/* Delete account */}
            <button
              className={styles.deleteAccBtn}
              onClick={() => setShowConfirm(true)}
              title="Delete account"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3 6 5 6 21 6"/>
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                <path d="M10 11v6M14 11v6"/>
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
              </svg>
            </button>

            {/* Logout */}
            <button
              className={styles.logoutBtn}
              onClick={handleLogout}
              title="Sign out"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Delete confirmation */}
        {showConfirm && (
          <div className={styles.confirmBox}>
            <p className={styles.confirmText}>
              This will permanently delete your account and all transactions.
            </p>
          <div className={styles.confirmBtns}>
            <button
              className={styles.confirmCancel}
              onClick={() => setShowConfirm(false)}
              disabled={deleting}
            >
              Cancel
            </button>
          <button
            className={styles.confirmDelete}
            onClick={handleDeleteAccount}
            disabled={deleting}
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    )}

        <div className={styles.version}>FinBoard v1.0 · 2026</div>
      </div>
    </aside>
  )
}