import mongoose from "mongoose";

const entrySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["neutral", "happy", "sad", "excited", "tired"],
      default: "neutral",
    },
    content: {
      type: String,
      required: true,
    },
    tags: [String],
    files: [String], // URLs or filenames for uploaded files
  },
  { timestamps: true }
);

export default mongoose.model("Entry", entrySchema);
