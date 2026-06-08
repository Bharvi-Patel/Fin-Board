import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    // 1. Check if token exists in the Authorization header
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // 2. Extract the token
    // header looks like: "Bearer eyJhbGci..."
    const token = header.split(' ')[1];

    // 3. Verify the token — throws error if invalid or expired
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id: "user's mongo id", iat: ..., exp: ... }

    // 4. Find the user and attach to request
    req.user = await User.findById(decoded.id).select('-password');
    // -password means "give me everything EXCEPT the password field"

    // 5. Continue to the actual route
    next();

  } catch (err) {
    res.status(401).json({ message: 'Token invalid or expired' });
  }
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};