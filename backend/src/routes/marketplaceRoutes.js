// apps/backend/src/routes/marketplaceRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "apps/backend/src/uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// ✅ Add new product
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { name, description, price, quantity, quality, isOrganic, farmerId } = req.body;

    const product = new Product({
      farmer: farmerId,
      name,
      description,
      price,
      quantity,
      quality,
      isOrganic: isOrganic === "true",
      images: req.files.map(file => file.filename),
    });

    await product.save();
    res.status(201).json({ message: "✅ Product added successfully", product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "❌ Failed to add product" });
  }
});

// ✅ Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "fullName email");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "❌ Failed to fetch products" });
  }
});

module.exports = router;


// buyer can view all products and purchase
// ✅ Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("farmer", "fullName email");
    if (!product) return res.status(404).json({ error: "❌ Product not found" });
    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "❌ Failed to fetch product" });
  }
});



// ✅ Place an order (buyer)
router.post("/:id/order", async (req, res) => {
  try {
    const { buyerId, quantity } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "❌ Product not found" });

    if (quantity > product.quantity) {
      return res.status(400).json({ error: "❌ Not enough stock" });
    }

    product.quantity -= quantity;
    await product.save();

    res.json({ message: "✅ Order placed successfully", product });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "❌ Failed to place order" });
  }
});
