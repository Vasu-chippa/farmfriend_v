// backend/src/routes/authRoutes.js
import express from "express";
import { registerUser,loginUser } from "../controllers/authController.js";

const router = express.Router();

// Generic login for all roles
router.post("/register", registerUser);  // ✅ Add this line
router.post("/login", loginUser);

export default router;
