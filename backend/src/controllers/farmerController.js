// backend/src/controllers/farmerController.js
import Farmer from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ✅ New imports for stats
import Crop from "../models/Crop.js";
import Harvest from "../models/Harvest.js";
import Expense from "../models/Expense.js";

// Generate JWT
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register a farmer
export const registerFarmer = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if farmer already exists
    const existing = await Farmer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Farmer already exists" });
    }

    const farmer = new Farmer({ fullName, email, password, role: "farmer" });
    await farmer.save();

    res
      .status(201)
      .json({ message: "Farmer registered successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login Farmer
export const loginFarmer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    const isMatch = await bcrypt.compare(password, farmer.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      token: generateToken(farmer._id, farmer.role),
      farmer,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({ role: "farmer" });
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// 📊 Farmer Stats API
export const getFarmerStats = async (req, res) => {
  try {
    const farmerId = req.user._id;

    // Total Crops created by farmer
    const totalCrops = await Crop.countDocuments({ farmer: farmerId });

    // Harvest crops count
    const harvest = await Harvest.findOne({ farmer: farmerId });
    const totalHarvest = harvest ? harvest.crops.length : 0;

    // Farmer’s expenses (⚠️ requires farmer field in Expense model)
    const expenses = await Expense.find({ farmer: farmerId });
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);

    // Total Income from harvest
    const totalIncome = harvest
      ? harvest.crops.reduce(
          (sum, c) => sum + (c.price || 0) * (c.quantity || 0),
          0
        )
      : 0;

    // Profit or Loss
    const profitOrLoss = totalIncome - totalExpenses;

    res.json({
      totalCrops,
      totalHarvest,
      totalExpenses,
      totalIncome,
      profitOrLoss,
    });
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch stats",
      details: err.message,
    });
  }
};
