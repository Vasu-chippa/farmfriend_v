// backend/src/controllers/buyerController.js
import Buyer from "../models/Buyer.js";

// ✅ Register Buyer
export const registerBuyer = async (req, res) => {
  try {
    const { fullName, email, password, company } = req.body;
    const existing = await Buyer.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Buyer already exists" });
    }

    const buyer = new Buyer({ fullName, email, password, company });
    await buyer.save();

    res.status(201).json({
      message: "Buyer registered successfully",
      user: buyer,
    });
  } catch (err) {
    res.status(500).json({ message: "Error registering buyer", error: err.message });
  }
};

// ✅ Login Buyer
export const loginBuyer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const buyer = await Buyer.findOne({ email, password });
    if (!buyer) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.json({
      message: "Login successful",
      user: buyer,
    });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err.message });
  }
};
