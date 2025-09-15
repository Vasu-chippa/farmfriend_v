import User from "../models/User.js";
import { generateToken } from "../utils/generateToken.js";

// @desc    Register a new user (farmer, buyer, agent, admin)
// @route   POST /api/auth/register
// @access  Public
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role, landSize } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      fullName,
      email,
      password,
      role,
      landSize,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // For now compare plain text (later use bcrypt)
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    return res.json({
      message: "Login successful",
      token: generateToken(user._id, user.role),
      user,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};
