import express from "express";
import Order from "../models/Order.js";
import Notification from "../models/Notification.js";
import LedgerEntry from "../models/LedgerEntry.js";
import Product from "../models/Product.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get orders for a buyer
router.get("/buyer/:buyerId", protect, async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.params.buyerId })
      .populate("product", "name price images")
      .populate("farmer", "fullName email");
    res.json(orders);
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// Update order status (farmer/admin)
router.put("/:orderId/status", protect, authorizeRoles("farmer", "admin"), async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: "Order not found" });

    order.status = status;
    await order.save();

    // Notify buyer of status change
    const notif = await Notification.create({
      user: order.buyer,
      title: "Order Update",
      message: `Your order ${order._id} status changed to ${status}`,
      data: { orderId: order._id, status },
    });

    try {
      const io = req.app.locals.io;
      const onlineUsers = req.app.locals.onlineUsers;
      const socketId = onlineUsers.get(String(order.buyer));
      if (socketId && io) io.to(socketId).emit("notification", notif);
    } catch (e) {
      console.warn("Socket emit failed:", e.message || e);
    }

    // If delivered/completed, create ledger income for farmer and enable review
    if (status === "Delivered" || status === "Completed") {
      // create ledger entry for farmer income
      await LedgerEntry.create({
        farmer: order.farmer,
        type: "income",
        amount: order.total || (order.price * order.quantity),
        description: `Income from order ${order._id}`,
        source: "order",
        meta: { orderId: order._id },
      });
    }

    res.json({ message: "Order status updated", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ error: "Failed to update status" });
  }
});

export default router;
