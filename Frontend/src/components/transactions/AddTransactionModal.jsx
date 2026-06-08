import { useState } from 'react'
import { useAppStore } from '../../store/useAppStore'
import { CATEGORIES } from '../../data/mockData'
import { todayISO } from '../../utils/helpers'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { FormField, Input, Select } from '../ui/FormField'
import styles from './AddTransactionModal.module.css'

const EMPTY = {
  name: '',
  amount: '',
  category: 'Food',
  type: 'expense',
  date: todayISO(),
  note: '',
}

export default function AddTransactionModal({ onClose }) {
  const addTransaction = useAppStore((s) => s.addTransaction)
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.name.trim())               errs.name   = 'Name is required'
    if (!form.amount || form.amount <= 0) errs.amount = 'Enter a valid amount'
    if (!form.date)                       errs.date   = 'Date is required'
    return errs
  }

  const handleSubmit = () => {
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    addTransaction({ ...form, amount: parseFloat(form.amount) })
    onClose()
  }

  return (
    <Modal
      title="Add Transaction"
      subtitle="Record a new income or expense"
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary"   onClick={handleSubmit}>Add Transaction</Button>
        </>
      }
    >
      <div className={styles.form}>
        <FormField label="Transaction Name" error={errors.name}>
          <Input
            placeholder="e.g. Grocery run"
            value={form.name}
            onChange={set('name')}
          />
        </FormField>

        <div className={styles.row}>
          <FormField label="Amount (₹)" error={errors.amount}>
            <Input
              type="number"
              placeholder="0"
              min="0"
              step="1"
              value={form.amount}
              onChange={set('amount')}
            />
          </FormField>
          <FormField label="Date" error={errors.date}>
            <Input
              type="date"
              value={form.date}
              onChange={set('date')}
            />
          </FormField>
        </div>

        <div className={styles.row}>
          <FormField label="Type">
            <Select value={form.type} onChange={set('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </Select>
          </FormField>
          <FormField label="Category">
            <Select value={form.category} onChange={set('category')}>
              {Object.keys(CATEGORIES).map((c) => (
                <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>
              ))}
            </Select>
          </FormField>
        </div>

        <FormField label="Note (optional)">
          <Input
            placeholder="Any details…"
            value={form.note}
            onChange={set('note')}
          />
        </FormField>
      </div>
    </Modal>
  )
}
