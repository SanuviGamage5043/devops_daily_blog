import mongoose from "mongoose";

const moodSchema = new mongoose.Schema(
  {
    moodName: { type: String, required: true },
    emoji: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Mood", moodSchema);
