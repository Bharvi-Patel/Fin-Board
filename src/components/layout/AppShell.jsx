import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import styles from './AppShell.module.css'

const PAGE_META = {
  '/dashboard':    { title: 'Dashboard',    subtitle: 'Your financial overview at a glance' },
  '/transactions': { title: 'Transactions', subtitle: 'Track every income and expense' },
  '/insights':     { title: 'Insights',     subtitle: 'Patterns and trends in your spending' },
}

export default function AppShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const meta = PAGE_META[location.pathname] || PAGE_META['/dashboard']

  return (
    <div className={styles.shell}>
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className={styles.overlay}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className={styles.body}>
        <Topbar
          title={meta.title}
          subtitle={meta.subtitle}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  )
}
