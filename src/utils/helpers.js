// ── Currency formatting ────────────────────────────────
export const fmt = (n) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)

export const fmtShort = (n) => {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000)   return `₹${(n / 1000).toFixed(1)}K`
  return `₹${n}`
}

export const fmtNumber = (n) =>
  new Intl.NumberFormat('en-IN').format(n)

// ── Date formatting ────────────────────────────────────
export const fmtDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export const fmtDateShort = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })
}

export const todayISO = () => new Date().toISOString().split('T')[0]

// ── CSV export ─────────────────────────────────────────
export const exportToCSV = (transactions, filename = 'transactions.csv') => {
  const headers = ['Date', 'Name', 'Category', 'Type', 'Amount (₹)', 'Note']
  const rows = transactions.map((t) => [
    t.date,
    `"${t.name}"`,
    t.category,
    t.type,
    t.amount,
    `"${t.note || ''}"`,
  ])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url  = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href     = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}

// ── Misc ───────────────────────────────────────────────
export const clsx = (...classes) => classes.filter(Boolean).join(' ')

export const pct = (part, total) =>
  total === 0 ? 0 : Math.round((part / total) * 100)
