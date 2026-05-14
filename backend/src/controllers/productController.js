// backend/controllers/productController.js
import Product from "../models/Product.js";
import User from "../models/User.js";
import mongoose from "mongoose";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "name email");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching marketplace products" });
  }
};

// Get single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "farmer",
      "name email"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get nearby products by farmer location
export const getNearbyProducts = async (req, res) => {
  try {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters
    if (!lat || !lng) return res.status(400).json({ message: "lat and lng required" });

    // Find farmers within radius
    const farmers = await User.find({
      role: "farmer",
      location: {
        $nearSphere: {
          $geometry: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: parseInt(radius, 10),
        },
      },
    }).select("_id location fullName");

    const farmerIds = farmers.map((f) => f._id);
    const products = await Product.find({ farmer: { $in: farmerIds } }).populate("farmer", "fullName location");
    res.json({ products, farmers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch nearby products" });
  }
};
