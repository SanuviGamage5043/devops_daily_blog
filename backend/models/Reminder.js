import mongoose from "mongoose";

const reminderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reminderTime: { type: Date, required: true },
    message: { type: String, default: "Time to write your daily journal!" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("Reminder", reminderSchema);
