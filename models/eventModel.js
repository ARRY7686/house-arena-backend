const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  housePoints: {
    kong: { type: Number, required: true },
    leo: { type: Number, required: true },
    phoenix: { type: Number, required: true },
    tusker: { type: Number, required: true },
  },
  description: { type: String },
  images: [{ type: String }],
});

module.exports = mongoose.model('Event', EventSchema);
