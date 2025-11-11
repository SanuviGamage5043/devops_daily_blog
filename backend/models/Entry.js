import mongoose from "mongoose";

const entrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  mood: { type: String },
  content: { type: String },
  tags: [String],
  files: [String], // store filenames of uploaded files
}, { timestamps: true });

export default mongoose.model("Entry", entrySchema);
