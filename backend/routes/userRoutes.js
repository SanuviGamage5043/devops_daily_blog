// routes/userRoutes.js
import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);

// Protected route example — only logged-in users can access
router.get("/", protect, getUsers);

export default router;
