import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import dashboardController from "../controllers/dashboardController.js";

const router = express.Router();

// All endpoints are protected and return data for the authenticated farmer
router.get("/summary", protect, dashboardController.getSummary);
router.get("/chart", protect, dashboardController.getChart);
router.get("/stats", protect, dashboardController.getStats);

export default router;
