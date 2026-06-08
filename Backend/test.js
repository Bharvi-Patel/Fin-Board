import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

console.log('URI starts with:', process.env.MONGO_URI?.substring(0, 20));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connected!');
    process.exit(0);
  })
  .catch((err) => {
    console.log('❌ Failed:', err.message);
    process.exit(1);
  }); 
