# FinBoard — Financial Dashboard

A production-structured React dashboard for tracking personal financial activity. Built with Vite + React, Zustand for state, Recharts for visualisations, and CSS Modules for scoped styling.

---

## Quick Start

```bash
npm install
npm run dev       # Development server → http://localhost:5173
npm run build     # Production build  → dist/
npm run preview   # Preview the build
```

---

## Project Structure

```
src/
├── main.jsx
├── App.jsx                          # Root + React Router routes
├── styles/globals.css               # Design tokens, resets, animation helpers
├── data/mockData.js                 # CATEGORIES, INITIAL_TRANSACTIONS, TREND_DATA
├── store/useAppStore.js             # Zustand: useAppStore + useFilterStore
├── utils/helpers.js                 # fmt, fmtShort, fmtDate, exportToCSV
├── pages/
│   ├── DashboardPage.jsx
│   ├── TransactionsPage.jsx
│   └── InsightsPage.jsx
└── components/
    ├── layout/   AppShell, Sidebar, Topbar
    ├── ui/       Button, Badge, Modal, FormField, SummaryCard,
    │             ChartCard, ChartTooltip, EmptyState
    ├── dashboard/ BalanceTrendChart, SpendingDonutChart,
    │              MonthlyBarChart, RecentTransactions
    ├── transactions/ TransactionFilters, TransactionTable,
    │                 AddTransactionModal
    └── insights/  InsightCard, CategoryBreakdownBars
```

---

## State Management

Two Zustand stores in `src/store/useAppStore.js`:

**`useAppStore`** — persisted to localStorage
- `transactions` — full list; `addTransaction`, `editTransaction`, `deleteTransaction`
- `role` — `'admin'` | `'viewer'`
- `getSummary()` — derived income / expenses / balance totals
- `getSpendByCategory()` — derived expense breakdown sorted by value

**`useFilterStore`** — session only (not persisted)
- `search`, `category`, `type`, `sortBy`, `sortDir`, `page`
- All filter setters reset `page` to 1 automatically

---

## Role-Based UI

Switch via the sidebar dropdown. Persisted to localStorage.

| Feature | Admin | Viewer |
|---|---|---|
| View all data & charts | ✅ | ✅ |
| Add transaction | ✅ | ✗ |
| Delete transaction | ✅ | ✗ |
| Export CSV | ✅ | ✅ |

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 18 + Vite | UI + build |
| React Router 6 | Client-side routing |
| Zustand 4 | State management + localStorage persistence |
| Recharts 2.8 | Area, Bar, Pie charts |
| CSS Modules | Scoped per-component styles |
