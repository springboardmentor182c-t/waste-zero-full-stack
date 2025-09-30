const Opportunity = require('../models/Opportunity');

// Create
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();
    res.status(201).json(opportunity);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Read All
exports.getAllOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Read One
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).json({ error: 'Not found' });
    res.json(opportunity);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update
exports.updateOpportunity = async (req, res) => {
  try {
    const updated = await Opportunity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete
exports.deleteOpportunity = async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.json({ message: 'Opportunity deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
