import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { INITIAL_TRANSACTIONS, generateId } from '../data/mockData'

// ─── App Store ───────────────────────────────────────────
export const useAppStore = create(
  persist(
    (set, get) => ({
      // Role
      role: 'admin',
      setRole: (role) => set({ role }),

      // Transactions
      transactions: INITIAL_TRANSACTIONS,

      addTransaction: (txn) =>
        set((state) => ({
          transactions: [{ ...txn, id: generateId() }, ...state.transactions],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

      resetTransactions: () =>
        set({ transactions: INITIAL_TRANSACTIONS }),

      // Computed helpers (not persisted, derived on use)
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
          .forEach((t) => {
            map[t.category] = (map[t.category] || 0) + t.amount
          })
        return Object.entries(map)
          .map(([name, value]) => ({ name, value }))
          .sort((a, b) => b.value - a.value)
      },
    }),
    {
      name: 'ledger-store',
      partialize: (state) => ({
        role: state.role,
        transactions: state.transactions,
      }),
    }
  )
)

// ─── Filter Store (not persisted — session state) ────────
export const useFilterStore = create((set) => ({
  search:    '',
  category:  'all',
  type:      'all',
  sortBy:    'date',
  sortDir:   'desc',
  page:      1,

  setSearch:   (search)   => set({ search,   page: 1 }),
  setCategory: (category) => set({ category, page: 1 }),
  setType:     (type)     => set({ type,     page: 1 }),
  setPage:     (page)     => set({ page }),

  toggleSort: (col) =>
    set((state) => ({
      sortBy:  col,
      sortDir: state.sortBy === col ? (state.sortDir === 'asc' ? 'desc' : 'asc') : 'desc',
      page: 1,
    })),

  resetFilters: () =>
    set({ search: '', category: 'all', type: 'all', sortBy: 'date', sortDir: 'desc', page: 1 }),
}))
