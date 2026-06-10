import api from './client'

export const fetchTransactions = () =>
  api.get('/transactions').then((r) => r.data.transactions)

export const fetchSummary = () =>
  api.get('/transactions/summary').then((r) => r.data)

export const createTransaction = (data) =>
  api.post('/transactions', data).then((r) => r.data)

export const deleteTransaction = (id) =>
  api.delete(`/transactions/${id}`)