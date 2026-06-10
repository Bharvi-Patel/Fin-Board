import { create } from 'zustand'
import * as txnApi from '../api/transactions'
import api from '../api/client'

const mapTxn = (t) => ({
  ...t,
  id:   t._id,
  name: t.note || t.category,
})

export const useAppStore = create((set, get) => ({

  // ── Auth ──────────────────────────────────────────────
  user:  JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,

  setAuth: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null, transactions: [] })
  },

  deleteAccount: async () => {
    await api.delete('/auth/delete-account')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null, transactions: [] })
  },

  // ── Transactions ──────────────────────────────────────
  transactions: [],
  loading: false,
  error: null,

  fetchTransactions: async () => {
    set({ loading: true, error: null })
    try {
      const data = await txnApi.fetchTransactions()
      set({ transactions: data.map(mapTxn), loading: false })
    } catch (err) {
      set({ error: err.message, loading: false })
    }
  },

  addTransaction: async (txn) => {
    try {
      const payload = {
        note:     txn.name,
        amount:   txn.amount,
        type:     txn.type,
        category: txn.category,
        date:     txn.date,
      }
      const created = await txnApi.createTransaction(payload)
      set((state) => ({
        transactions: [mapTxn(created), ...state.transactions],
      }))
    } catch (err) {
      console.error('Add transaction failed:', err.message)
    }
  },

  deleteTransaction: async (id) => {
    try {
      await txnApi.deleteTransaction(id)
      set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id),
      }))
    } catch (err) {
      console.error('Delete transaction failed:', err.message)
    }
  },

  // ── Computed ──────────────────────────────────────────
  getSummary: () => {
    const { transactions } = get()
    const income   = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0)
    const expenses = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0)
    return { income, expenses, balance: income - expenses }
  },

  getSpendByCategory: () => {
    const { transactions } = get()
    const map = {}
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
  },

  getMonthlyData: () => {
    const { transactions } = get()
    const map = {}
    transactions.forEach((t) => {
      const date = new Date(t.date)
      const key  = date.toLocaleString('en-IN', { month: 'short', year: 'numeric' })
      const mon  = date.toLocaleString('en-IN', { month: 'short' })
      if (!map[key]) map[key] = { month: mon, income: 0, expenses: 0, savings: 0, sortKey: date }
      if (t.type === 'income')  map[key].income   += t.amount
      if (t.type === 'expense') map[key].expenses += t.amount
    })
    return Object.values(map)
      .map((m) => ({ ...m, savings: m.income - m.expenses }))
      .sort((a, b) => a.sortKey - b.sortKey)
      .slice(-6)
  },

}))

// ── Filter Store (unchanged) ──────────────────────────
export const useFilterStore = create((set) => ({
  search:   '',
  category: 'all',
  type:     'all',
  sortBy:   'date',
  sortDir:  'desc',
  page:     1,

  setSearch:   (search)   => set({ search,   page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setType:     (type)     => set({ type,     page: 1 }),
  setPage:     (page)     => set({ page }),

  toggleSort: (col) =>
    set((state) => ({
      sortBy:  col,
      sortDir: state.sortBy === col ? (state.sortDir === 'asc' ? 'desc' : 'asc') : 'desc',
      page:    1,
    })),

  resetFilters: () =>
    set({ search: '', category: 'all', type: 'all', sortBy: 'date', sortDir: 'desc', page: 1 }),
}))

