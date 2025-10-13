import connectDB from '../src/config/db.js';
import mongoose from 'mongoose';

(async () => {
  try {
    await connectDB();
    console.log('Test connection successful');
  } catch (err) {
    console.error('Test connection failed:', err.message);
    process.exitCode = 1;
  } finally {
    try {
      await mongoose.disconnect();
    } catch (e) {
      // ignore
    }
  }
})();
