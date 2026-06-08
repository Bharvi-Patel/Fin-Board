import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// 1. Define the shape of a user document
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,        // no two users with same email
    lowercase: true,     // always store as lowercase
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'viewer'],  // only these two values allowed
    default: 'admin',
  },
}, { timestamps: true }); // adds createdAt and updatedAt automatically

// 2. Hash password BEFORE saving to DB
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});


// 3. Method to compare passwords on login
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
  // returns true or false
};

// 4. Export the model
export default mongoose.model('User', userSchema);