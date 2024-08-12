import { Schema, model } from "mongoose";

const adminEmailSchema = new Schema({
  email: { type: String, required: true, unique: true },
});

export default model("AdminEmail", adminEmailSchema);
