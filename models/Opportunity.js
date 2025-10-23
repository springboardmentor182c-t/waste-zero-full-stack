const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
  ngo_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  required_skills: [String],
  duration: String,
  location: String,
  status: { type: String, default: 'open' }
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
