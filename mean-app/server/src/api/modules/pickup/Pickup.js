const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    contactNumber: { type: String, required: true },
    pickupDate: { type: Date, required: true },
    items: { type: String, required: true }, // e.g., "Plastic, Metal"
    status: { type: String, default: 'Scheduled' } // Scheduled / Completed / Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Pickup', pickupSchema);
