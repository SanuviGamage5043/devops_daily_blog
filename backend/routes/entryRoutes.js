import express from "express";
import {
  createEntry,
  getEntriesByUser,
  getEntryById,
  updateEntry,
  deleteEntry,
} from "../controllers/entryController.js";

const router = express.Router();

router.post("/", createEntry); // POST /entries
router.get("/user/:userId", getEntriesByUser); // GET /entries/user/:userId
router.get("/:id", getEntryById); // GET /entries/:id
router.put("/:id", updateEntry); // PUT /entries/:id
router.delete("/:id", deleteEntry); // DELETE /entries/:id

export default router;
