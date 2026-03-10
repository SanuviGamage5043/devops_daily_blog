import express from "express";
import { createUser, loginUser, getCurrentUser, updateUserSettings } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/signup", createUser);
router.post("/login", loginUser);

// Protected routes
router.get("/me", protect, getCurrentUser);           
router.put("/me/settings", protect, updateUserSettings); 

export default router;