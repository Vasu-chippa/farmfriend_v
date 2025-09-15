// apps/backend/src/routes/cropRecordRoutes.js
import express from "express";
import {
  addRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "../controllers/cropRecordController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Protect routes so req.user is set
router.post("/", protect, addRecord);
router.get("/:cropId", protect, getRecords);
router.put("/:id", protect, updateRecord);
router.delete("/:id", protect, deleteRecord);

export default router;
