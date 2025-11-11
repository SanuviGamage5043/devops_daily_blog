import express from "express";
import {
  createEntry,
  getEntriesByUser,
  deleteEntry,
} from "../controllers/entryController.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("files", 10), createEntry);
router.get("/user/:userId", protect, getEntriesByUser);
router.delete("/:id", protect, deleteEntry);

export default router;
