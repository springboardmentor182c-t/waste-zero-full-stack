const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
 title: { type: String, required: true },
 description: String,
 location: String,
 date: Date,
 required_skills: [String], // Keep as array
 duration: String,
 volunteersNeeded: Number,
 createdBy: String // Admin or NGO ID
}, { timestamps: true });

module.exports = mongoose.model('Opportunity', opportunitySchema);
