import mongoose from "mongoose";

const attachmentSchema = new mongoose.Schema(
  {
    entry: { type: mongoose.Schema.Types.ObjectId, ref: "JournalEntry", required: true },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, default: "document" },
    fileSize: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Attachment", attachmentSchema);
