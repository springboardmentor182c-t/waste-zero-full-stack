
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import pickupRoutes from './routes/pickup.route.js';

const app = express();
const PORT = 3000;
app.use(express.json());

app.use("/api/pickup", pickupRoutes); // ✅ Mounts all pickup routes under /api/pickup

// 🔌 Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wastezero', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
}).catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});

// 🛠 Middleware
app.use(express.json());

// for cors
// const app = express();
app.use(cors()); // ✅ Enables CORS for all origins
app.use(express.json());


// 🚚 Routes
app.use('/api/pickup', pickupRoutes);

// 🏠 Root Endpoint
app.get('/', (req, res) => {
  res.send('API is running!');
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
