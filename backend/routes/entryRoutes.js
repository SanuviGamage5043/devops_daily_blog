import express from "express";
import {
  createEntry,
  getEntriesByUser,
  deleteEntry,
} from "../controllers/entryController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js"; // JWT auth

const router = express.Router();

// Create new entry with optional files
router.post("/", protect, upload.array("files", 10), createEntry);

// Get entries for logged-in user
router.get("/user", protect, getEntriesByUser);

// Update entry by ID with optional new files
router.put("/:id", protect, upload.array("files", 10), updateEntry);

// Delete entry by ID
router.delete("/:id", protect, deleteEntry);

export default router;
