import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/users", getUsers);

export default router;
