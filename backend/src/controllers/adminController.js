import User from "../models/User.js";
import Order from "../models/Order.js";
import Product from "../models/Product.js";

// 📊 Dashboard Summary
export const getDashboardData = async (req, res) => {
  try {
    const [users, farmers, buyers, agents, orders, products, totalPayments] =
      await Promise.all([
        User.countDocuments(),
        User.countDocuments({ role: "farmer" }),
        User.countDocuments({ role: "buyer" }),
        User.countDocuments({ role: "agent" }),
        Order.countDocuments(),
        Product.countDocuments(),
        Order.countDocuments({ "payment.status": "Paid" }),
      ]);

    res.json({
      users,
      farmers,
      buyers,
      agents,
      orders,
      products,
      payments: totalPayments,
    });
  } catch (err) {
    res.status(500).json({ message: "Error loading dashboard", error: err.message });
  }
};

// 👥 Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};
export const getAllFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" }).select("-password");
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch farmers", error: err.message });
  }
};

// 👨‍🌾 Farmers CRUD
export const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" }).select("-password");
    res.json(farmers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching farmers", error: err.message });
  }
};

export const addFarmer = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Farmer already exists" });

    const farmer = new User({ fullName, email, password, role: "farmer" });
    await farmer.save();
    res.status(201).json({ message: "Farmer added successfully", farmer });
  } catch (err) {
    res.status(500).json({ message: "Error adding farmer", error: err.message });
  }
};

export const updateFarmer = async (req, res) => {
  try {
    const farmer = await User.findOneAndUpdate(
      { _id: req.params.id, role: "farmer" },
      req.body,
      { new: true }
    );
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });
    res.json({ message: "Farmer updated successfully", farmer });
  } catch (err) {
    res.status(500).json({ message: "Error updating farmer", error: err.message });
  }
};

export const deleteFarmer = async (req, res) => {
  try {
    const farmer = await User.findOneAndDelete({ _id: req.params.id, role: "farmer" });
    if (!farmer) return res.status(404).json({ message: "Farmer not found" });
    res.json({ message: "Farmer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting farmer", error: err.message });
  }
};

// 🧑‍💼 Agents
export const getAllAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" }).select("-password");
    res.json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching agents", error: err.message });
  }
};

// 👤 Buyers
export const getAllBuyers = async (req, res) => {
  try {
    const buyers = await User.find({ role: "buyer" }).select("-password");
    res.json(buyers);
  } catch (err) {
    res.status(500).json({ message: "Error fetching buyers", error: err.message });
  }
};

export const addBuyer = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Buyer already exists" });

    const buyer = new User({ fullName, email, password, role: "buyer" });
    await buyer.save();
    res.status(201).json({ message: "Buyer added successfully", buyer });
  } catch (err) {
    res.status(500).json({ message: "Error adding buyer", error: err.message });
  }
};

export const deleteBuyer = async (req, res) => {
  try {
    const buyer = await User.findOneAndDelete({ _id: req.params.id, role: "buyer" });
    if (!buyer) return res.status(404).json({ message: "Buyer not found" });
    res.json({ message: "Buyer deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting buyer", error: err.message });
  }
};

// 📦 Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("buyer", "fullName email")
      .populate("product", "name price");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status;
    if (status === "Confirmed") order.approved = true;
    await order.save();

    res.json({ message: "Order status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Error updating order", error: err.message });
  }
};

// 💳 Payments
export const getAllPayments = async (req, res) => {
  try {
    const orders = await Order.find({ "payment.status": { $exists: true } })
      .populate("buyer", "fullName email")
      .populate({
        path: "product",
        populate: { path: "farmer", select: "fullName email" },
      });

    const payments = orders.map((o) => ({
      orderId: o._id,
      buyer: o.buyer,
      farmer: o.product?.farmer,
      productName: o.product?.name,
      transactionId: o.payment?.transactionId,
      paymentDate: o.payment?.paymentDate,
      paymentAmount: o.payment?.amount,
      paymentStatus: o.payment?.status,
      paymentMethod: o.payment?.method,
      notes: o.payment?.notes,
    }));

    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching payments", error: err.message });
  }
};

// 🌾 Products
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("farmer", "fullName email");
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

export const approveProduct = async (req, res) => {
  try {
    const { approved } = req.body;
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { approved },
      { new: true }
    );
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product approval updated", product });
  } catch (err) {
    res.status(500).json({ message: "Error approving product", error: err.message });
  }
};
