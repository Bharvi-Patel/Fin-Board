import { Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import AppShell from './components/layout/AppShell'
import DashboardPage from './pages/DashboardPage'
import TransactionsPage from './pages/TransactionsPage'
import InsightsPage from './pages/InsightsPage'
import LoginPage from './pages/LoginPage'

function ProtectedRoute({ children }) {
  const token = useAppStore((s) => s.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const token             = useAppStore((s) => s.token)
  const fetchTransactions = useAppStore((s) => s.fetchTransactions)

  useEffect(() => {
    if (token) fetchTransactions()
  }, [token])

  return (
    <Routes>
      {/* Login is OUTSIDE AppShell */}
      <Route path="/login" element={<LoginPage />} />

      {/* Everything else is INSIDE AppShell + protected */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <AppShell>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard"    element={<DashboardPage />} />
                <Route path="/transactions" element={<TransactionsPage />} />
                <Route path="/insights"     element={<InsightsPage />} />
              </Routes>
            </AppShell>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}