// apps/backend/src/models/Product.js
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "Farmer", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  quality: { type: String, enum: ["A (Excellent)", "B (Good)", "C (Average)"], default: "B (Good)" },
  isOrganic: { type: Boolean, default: false },
  images: [{ type: String }],
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
