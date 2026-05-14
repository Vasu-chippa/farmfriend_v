// backend/routes/productRoutes.js
import express from "express";
import { getProducts, getProductById, getNearbyProducts } from "../controllers/productController.js";

const router = express.Router();

// Public route for buyers (fetch all products)
router.get("/", getProducts);
// Nearby products by location
router.get("/nearby", getNearbyProducts);

// Public route for single product
router.get("/:id", getProductById);

export default router;
