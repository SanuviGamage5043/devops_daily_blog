import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },

    // Reminder / Settings
    remindersEnabled: { type: Boolean, default: false },
    reminderTime: { type: String, default: "19:00" }, // default 7 PM
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);