export const CATEGORIES = {
  Food:          { color: '#c8a45a', bg: 'rgba(200,164,90,0.10)' },
  Transport:     { color: '#5a8ed4', bg: 'rgba(90,142,212,0.10)' },
  Entertainment: { color: '#9575cd', bg: 'rgba(149,117,205,0.10)' },
  Shopping:      { color: '#d4895f', bg: 'rgba(212,137,95,0.10)' },
  Health:        { color: '#52a87c', bg: 'rgba(82,168,124,0.10)' },
  Housing:       { color: '#4db8a8', bg: 'rgba(77,184,168,0.10)' },
  Salary:        { color: '#52a87c', bg: 'rgba(82,168,124,0.10)' },
  Freelance:     { color: '#c8a45a', bg: 'rgba(200,164,90,0.10)' },
  Investment:    { color: '#c96b8a', bg: 'rgba(201,107,138,0.10)' },
  Utilities:     { color: '#9575cd', bg: 'rgba(149,117,205,0.10)' },
}

let nextId = 100

export const INITIAL_TRANSACTIONS = [
  { id: 1,  name: 'Monthly Salary',       amount: 85000, type: 'income',  category: 'Salary',        date: '2024-04-01', note: 'April salary credit' },
  { id: 2,  name: 'Apartment Rent',        amount: 18000, type: 'expense', category: 'Housing',       date: '2024-04-01', note: 'Monthly rent' },
  { id: 3,  name: 'Netflix Subscription',  amount: 649,   type: 'expense', category: 'Entertainment', date: '2024-04-02', note: '' },
  { id: 4,  name: 'Weekly Groceries',      amount: 3200,  type: 'expense', category: 'Food',          date: '2024-04-03', note: '' },
  { id: 5,  name: 'Metro Card Recharge',   amount: 500,   type: 'expense', category: 'Transport',     date: '2024-04-04', note: '' },
  { id: 6,  name: 'Freelance — UI Design', amount: 22000, type: 'income',  category: 'Freelance',     date: '2024-04-05', note: 'E-commerce redesign project' },
  { id: 7,  name: 'Amazon Order',          amount: 4500,  type: 'expense', category: 'Shopping',      date: '2024-04-06', note: 'Desk organiser + cables' },
  { id: 8,  name: 'Clinic Visit',          amount: 1200,  type: 'expense', category: 'Health',        date: '2024-04-07', note: '' },
  { id: 9,  name: 'Electricity Bill',      amount: 1800,  type: 'expense', category: 'Utilities',     date: '2024-04-08', note: '' },
  { id: 10, name: 'Restaurant Dinner',     amount: 2100,  type: 'expense', category: 'Food',          date: '2024-04-09', note: 'Anniversary dinner' },
  { id: 11, name: 'Spotify Premium',       amount: 119,   type: 'expense', category: 'Entertainment', date: '2024-04-10', note: '' },
  { id: 12, name: 'Cab Rides',             amount: 850,   type: 'expense', category: 'Transport',     date: '2024-04-11', note: '' },
  { id: 13, name: 'SIP Return',            amount: 5200,  type: 'income',  category: 'Investment',    date: '2024-04-12', note: 'Mutual fund SIP payout' },
  { id: 14, name: 'Gym Membership',        amount: 2000,  type: 'expense', category: 'Health',        date: '2024-04-13', note: '' },
  { id: 15, name: 'Online Course',         amount: 3500,  type: 'expense', category: 'Entertainment', date: '2024-04-14', note: 'React advanced patterns' },
  { id: 16, name: 'Freelance — Logo',      amount: 8000,  type: 'income',  category: 'Freelance',     date: '2024-04-15', note: 'Brand identity project' },
  { id: 17, name: 'Clothing Store',        amount: 5600,  type: 'expense', category: 'Shopping',      date: '2024-04-16', note: '' },
  { id: 18, name: 'Water Bill',            amount: 400,   type: 'expense', category: 'Utilities',     date: '2024-04-17', note: '' },
  { id: 19, name: 'Street Food',           amount: 480,   type: 'expense', category: 'Food',          date: '2024-04-18', note: '' },
  { id: 20, name: 'Petrol',               amount: 1400,   type: 'expense', category: 'Transport',     date: '2024-04-19', note: '' },
]

export const TREND_DATA = [
  { month: 'Nov', income: 90000,  expenses: 38000, savings: 52000 },
  { month: 'Dec', income: 95000,  expenses: 52000, savings: 43000 },
  { month: 'Jan', income: 85000,  expenses: 41000, savings: 44000 },
  { month: 'Feb', income: 88000,  expenses: 36000, savings: 52000 },
  { month: 'Mar', income: 92000,  expenses: 44000, savings: 48000 },
  { month: 'Apr', income: 120200, expenses: 45799, savings: 74401 },
]

export const generateId = () => ++nextId
