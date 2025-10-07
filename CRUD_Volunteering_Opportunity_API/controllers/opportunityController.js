const Opportunity = require("../models/opportunityModel");

// Create
exports.createOpportunity = async (req, res) => {
  try {
    const opportunity = new Opportunity(req.body);
    await opportunity.save();
    res.status(201).json(opportunity);   // ✅ This will include _id
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all
exports.getOpportunities = async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.json(opportunities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
