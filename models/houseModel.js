import { Schema, model } from 'mongoose';

const HouseSchema = new Schema({
  name: { type: String, required: true },
  totalPoints: { type: Number, required: true, default: 0 },
});

export default model('House', HouseSchema);