const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  location: String,
  date: Date
}, { timestamps: true });

module.exports = mongoose.model("Opportunity", opportunitySchema);

