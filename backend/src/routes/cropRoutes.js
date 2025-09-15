import express from "express";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { getCrops, getCropById, createCrop, updateCrop, deleteCrop } from "../controllers/cropController.js";

const router = express.Router();

// GET all crops
router.get("/", protect, authorizeRoles("farmer"), getCrops);

// ✅ GET crop by ID
router.get("/:id", protect, authorizeRoles("farmer"), getCropById);

// POST new crop
router.post("/", protect, authorizeRoles("farmer"), createCrop);

// PUT update crop
router.put("/:id", protect, authorizeRoles("farmer"), updateCrop);

// DELETE crop
router.delete("/:id", protect, authorizeRoles("farmer"), deleteCrop);

export default router;
