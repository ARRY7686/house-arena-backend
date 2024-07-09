const mongoose = require('mongoose');

const HouseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model('House', HouseSchema);
