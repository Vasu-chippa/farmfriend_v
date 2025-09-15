import express from "express";
import { getFarmers, addFarmer, updateFarmer, deleteFarmer } from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Admin manages farmers
router.get("/farmers", protect, authorizeRoles("admin"), getFarmers);
router.post("/farmers", protect, authorizeRoles("admin"), addFarmer);

// Admin manages farmers
router.get("/farmers", protect, authorizeRoles("admin"), getFarmers);
router.post("/farmers", protect, authorizeRoles("admin"), addFarmer);
router.put("/farmers/:id", protect, authorizeRoles("admin"), updateFarmer);
router.delete("/farmers/:id", protect, authorizeRoles("admin"), deleteFarmer);


export default router;
