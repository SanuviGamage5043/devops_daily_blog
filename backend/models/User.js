import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
   

    // Reminder / Settings
    reminderEnabled: { type: Boolean, default: false },
    reminderTime: { type: String, enum: ["morning", "evening", "custom"], default: "morning" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
