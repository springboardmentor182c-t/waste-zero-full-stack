// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load env vars
dotenv.config();

// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB with Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB via Mongoose"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import controller
const opportunityController = require('./controllers/opportunityController');

// Routes
app.post('/api/opportunities', opportunityController.createOpportunity);
app.get('/api/opportunities', opportunityController.getOpportunities);

// (Optional: add these later in controller)
// app.get('/api/opportunities/:id', opportunityController.getOpportunityById);
// app.put('/api/opportunities/:id', opportunityController.updateOpportunity);
// app.delete('/api/opportunities/:id', opportunityController.deleteOpportunity);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
