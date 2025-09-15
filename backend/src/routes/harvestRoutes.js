import express from "express";
import {
  getHarvest,
  addCrop,
  removeCrop,
} from "../controllers/harvestController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ Get all harvest crops for logged-in farmer
router.get("/", protect, getHarvest);

// Add new crop to harvest
router.post("/", protect, addCrop);

// Remove crop from harvest
router.delete("/:cropId", protect, removeCrop);

export default router;
