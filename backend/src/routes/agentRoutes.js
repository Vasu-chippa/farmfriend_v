// backend/src/routes/agentRoutes.js
import express from "express";
import { registerAgent, getAgents } from "../controllers/agentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Only Admin can create agents
router.post("/register", protect, authorizeRoles("admin"), registerAgent);

// Admin and Agent can view agents
router.get("/", protect, authorizeRoles("admin", "agent"), getAgents);

export default router;
