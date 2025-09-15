// backend/src/controllers/adminController.js
import User from "../models/User.js";

// Register admin
export const registerAdmin = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = new User({ fullName, email, password, role: "admin" });
    await admin.save();

    res.status(201).json({ message: "Admin registered successfully", admin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all admins
export const getAdmins = async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// backend/src/controllers/adminController.js

import bcrypt from "bcrypt";

// Get all farmers
export const getFarmers = async (req, res) => {
  try {
    const farmers = await User.find({ role: "farmer" });
    res.json(farmers);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Add a farmer
export const addFarmer = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Farmer already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const farmer = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role: "farmer",
    });

    res.status(201).json({
      message: "Farmer added successfully",
      farmer,
 });

  } catch (error) {
    res.status(500).json({ message: "Error adding farmer", error: error.message });
  }
};


// Update a farmer
export const updateFarmer = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const farmer = await User.findOneAndUpdate(
      { _id: id, role: "farmer" },
      updates,
      { new: true }
    );

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json({ message: "Farmer updated successfully", farmer });
  } catch (error) {
    res.status(500).json({ message: "Error updating farmer", error: error.message });
  }
};

// Delete a farmer
export const deleteFarmer = async (req, res) => {
  try {
    const { id } = req.params;

    const farmer = await User.findOneAndDelete({ _id: id, role: "farmer" });

    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    res.json({ message: "Farmer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting farmer", error: error.message });
  }
};
