// backend/src/routes/buyerRoutes.js
import express from "express";
import { registerBuyer, loginBuyer } from "../controllers/buyerController.js";

const router = express.Router();

// Buyer registration + login
router.post("/register", registerBuyer);
router.post("/login", loginBuyer);

export default router;
