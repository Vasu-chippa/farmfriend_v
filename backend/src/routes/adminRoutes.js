import express from "express";
import {
  getDashboardData,
  getAllUsers,
  getFarmers,
  getAllFarmers,
  addFarmer,
  updateFarmer,
  deleteFarmer,
  getAllAgents,
  addAgent,
  getAllBuyers,
  addBuyer,
  deleteBuyer,
  deleteAgent,
  getAllOrders,
  updateOrderStatus,
  getAllPayments,
  getAllProducts,
  approveProduct,
  addProduct,
  deleteProduct,
  getReports,
} from "../controllers/adminController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Dashboard
router.get("/dashboard", protect, authorizeRoles("admin"), getDashboardData);

// Users
router.get("/users", protect, authorizeRoles("admin"), getAllUsers);

// Farmers
router.get("/farmers", protect, authorizeRoles("admin"), getFarmers);
router.post("/farmers", protect, authorizeRoles("admin"), addFarmer);
router.put("/farmers/:id", protect, authorizeRoles("admin"), updateFarmer);
router.delete("/farmers/:id", protect, authorizeRoles("admin"), deleteFarmer);
// Agents
router.get("/agents", protect, authorizeRoles("admin"), getAllAgents);
router.post("/agents", protect, authorizeRoles("admin"), addAgent);
router.delete("/agents/:id", protect, authorizeRoles("admin"), deleteAgent);

// Buyers
router.get("/buyers", protect, authorizeRoles("admin"), getAllBuyers);
router.post("/buyers", protect, authorizeRoles("admin"), addBuyer);
router.delete("/buyers/:id", protect, authorizeRoles("admin"), deleteBuyer);

// Orders
router.get("/orders", protect, authorizeRoles("admin"), getAllOrders);
router.put("/orders/:id/status", protect, authorizeRoles("admin"), updateOrderStatus);

// Payments
router.get("/payments", protect, authorizeRoles("admin"), getAllPayments);

// Products
router.get("/products", protect, authorizeRoles("admin"), getAllProducts);
router.post("/products", protect, authorizeRoles("admin"), addProduct);
router.delete("/products/:id", protect, authorizeRoles("admin"), deleteProduct);
router.put("/products/:id/approve", protect, authorizeRoles("admin"), approveProduct);

// Reports
router.get("/reports", protect, authorizeRoles("admin"), getReports);

export default router;
