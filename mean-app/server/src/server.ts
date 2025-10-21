import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
// Import path updated for root-level server.ts with src/admin
import adminRoutes from './src/admin/admin.routes';

dotenv.config();

const app: Application = express();

app.use(cors({
  origin: 'http://localhost:4200',  // Angular default port
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wastezero';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Error:', error);
    process.exit(1);
  }
};

connectDB();

app.get('/', (req: Request, res: Response) => {
  res.json({ success: true, message: 'WasteZero API Running!' });
});

app.use('/api/admin', adminRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;