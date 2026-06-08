import express from 'express';
import Transaction from '../models/Transaction.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All transaction routes require login
router.use(protect);
// router.use() applies middleware to ALL routes in this file
// so you don't have to add protect to every single route

// ─────────────────────────────────────────
// GET /api/transactions
// Get all transactions for logged in user
// ─────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const {
      type,           // filter by income/expense
      category,       // filter by category
      search,         // search in note
      sortBy = 'date',
      sortDir = 'desc',
      page = 1,
      limit = 20,
    } = req.query;

    // Start with base filter — only this user's transactions
    const filter = { user: req.user._id };

    // Add optional filters if provided
    if (type) filter.type = type;
    if (category) filter.category = category;
    if (search) filter.note = { $regex: search, $options: 'i' };
    // $regex = pattern match, $options: 'i' = case insensitive

    const sort = { [sortBy]: sortDir === 'asc' ? 1 : -1 };
    // 1 = ascending, -1 = descending

    const skip = (page - 1) * limit;
    // page 1 → skip 0, page 2 → skip 20, page 3 → skip 40

    // Run both queries at the same time for efficiency
    const [transactions, total] = await Promise.all([
      Transaction.find(filter).sort(sort).skip(skip).limit(Number(limit)),
      Transaction.countDocuments(filter),
    ]);

    res.json({ transactions, total, page: Number(page) });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// GET /api/transactions/summary
// Total income, expense, balance
// ─────────────────────────────────────────
router.get('/summary', async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { user: req.user._id } },  // only this user
      { $group: {
        _id: '$type',                       // group by income/expense
        total: { $sum: '$amount' }          // sum all amounts in each group
      }}
    ]);

    // result looks like:
    // [{ _id: 'income', total: 120000 }, { _id: 'expense', total: 46000 }]

    const summary = { income: 0, expense: 0 };
    result.forEach(r => { summary[r._id] = r.total; });
    summary.balance = summary.income - summary.expense;

    res.json(summary);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// POST /api/transactions
// Create a new transaction (admin only)
// ─────────────────────────────────────────
router.post('/', adminOnly, async (req, res) => {
  try {
    const { type, amount, category, note, date } = req.body;

    const transaction = await Transaction.create({
      user: req.user._id,  // always use logged in user's id, never trust client
      type,
      amount,
      category,
      note,
      date,
    });

    res.status(201).json(transaction);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// PUT /api/transactions/:id
// Update a transaction (admin only)
// ─────────────────────────────────────────
router.put('/:id', adminOnly, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id }, // must belong to this user
      req.body,
      { new: true, runValidators: true }
      // new: true → return updated doc, not the old one
      // runValidators: true → enforce schema rules on update too
    );

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json(transaction);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ─────────────────────────────────────────
// DELETE /api/transactions/:id
// Delete a transaction (admin only)
// ─────────────────────────────────────────
router.delete('/:id', adminOnly, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,  // can only delete your own transactions
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;