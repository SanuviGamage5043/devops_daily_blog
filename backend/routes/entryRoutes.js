import express from "express";
import {
  createEntry,
  getEntriesByUser,
  updateEntry,
  deleteEntry,
  getAnalytics,
  exportEntries
} from "../controllers/entryController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// CRUD
router.post("/", protect, upload.array("files"), createEntry);       
router.get("/", protect, getEntriesByUser);                         
router.put("/:id", protect, upload.array("files"), updateEntry);    
router.delete("/:id", protect, deleteEntry);                        

// Analytics
router.get("/analytics", protect, getAnalytics);

// Export
router.get("/export", protect, exportEntries);

export default router;