// backend/src/routes/authRoutes.js
import express from "express";
import { registerUser, loginUser, getCurrentUser, logoutUser } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generic login for all roles
router.post("/register", registerUser);  // ✅ Add this line
router.post("/login", loginUser);
router.get("/me", protect, getCurrentUser);
router.post("/logout", logoutUser);

export default router;
