import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ✅ Place order
router.post("/", async (req, res) => {
  try {
    const { buyer, farmer, crop, quantity, price } = req.body;
    const order = new Order({ buyer, farmer, crop, quantity, price });
    await order.save();
    res.status(201).json({ message: "✅ Order placed successfully", order });
  } catch (error) {
    console.error("❌ Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
});

// ✅ Get orders for a buyer
router.get("/buyer/:buyerId", async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.buyerId })
      .populate("crop", "name price images")
      .populate("farmer", "fullName email");
    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching buyer orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

export default router;
