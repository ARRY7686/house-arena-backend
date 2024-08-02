import { Schema, model } from "mongoose";

const EventSchema = new Schema({
  name: { type: String, required: true },
  date: {
    type: Date,
    required: false,
    default: null},
  housePoints: {
    kong: { type: Number, required: true },
    leo: { type: Number, required: true },
    phoenix: { type: Number, required: true },
    tusker: { type: Number, required: true },
  },
  description: { type: String, required: false},
});

export default model("Event", EventSchema);
