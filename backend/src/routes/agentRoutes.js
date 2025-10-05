import express from "express";
import {
  registerAgent,
  loginAgent,
  getAgentProfile,
  updateAgentProfile,
  getAgentFarmers,
  addFarmerByAgent,
  verifyFarmer,
  listProductsForAgent,
  approveProduct,
  getOrdersForAgent,
  approveOrder,
  updateOrderStatus,
  getAgentDashboard,
} from "../controllers/agentController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerAgent);
router.post("/login", loginAgent);
router.get("/dashboard", protect, authorizeRoles("agent"), getAgentDashboard);

router.get("/farmers", protect, authorizeRoles("agent"), getAgentFarmers);
router.post("/farmers", protect, authorizeRoles("agent"), addFarmerByAgent);
router.put("/farmers/verify", protect, authorizeRoles("agent"), verifyFarmer);

router.get("/products", protect, authorizeRoles("agent"), listProductsForAgent);
router.put("/products/:productId/approve", protect, authorizeRoles("agent"), approveProduct);

router.get("/orders", protect, authorizeRoles("agent"), getOrdersForAgent);
router.put("/orders/:id/approve", protect, authorizeRoles("agent"), approveOrder);
router.put("/orders/:id/status", protect, authorizeRoles("agent"), updateOrderStatus);

router.get("/profile", protect, authorizeRoles("agent"), getAgentProfile);
router.put("/profile", protect, authorizeRoles("agent"), updateAgentProfile);

export default router;
