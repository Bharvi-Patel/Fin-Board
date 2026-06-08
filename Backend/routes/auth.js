import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
// Router is like a mini Express app — just handles routes, then plugs into the main app

// Helper — creates a JWT token with the user's ID inside
const signToken = (id) => {
  return jwt.sign(
    { id },                          // payload — data inside the token
    process.env.JWT_SECRET,          // secret — used to sign + verify
    { expiresIn: process.env.JWT_EXPIRES_IN } // token expires after 7d
  );
};

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    // req.body contains whatever JSON the frontend sent

    // 1. Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 2. Create the user (password gets hashed automatically via the pre hook)
    const user = await User.create({ name, email, password, role });

    // 3. Create a JWT token
    const token = signToken(user._id);

    // 4. Send back token + user info (never send password back!)
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
      console.log('Error:', err.message); 
    res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Compare typed password against hashed password in DB
    const isCorrect = await user.comparePassword(password);
    if (!isCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate token and respond
    const token = signToken(user._id);
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });

  } catch (err) {
    console.log('Error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

import { protect } from '../middleware/auth.js';

// GET /api/auth/me — protected route
router.get('/me', protect, async (req, res) => {
  // if we reach here, protect middleware already verified the token
  res.json({ user: req.user });
});

export default router;