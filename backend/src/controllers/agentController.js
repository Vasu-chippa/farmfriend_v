// backend/src/controllers/agentController.js
import User from "../models/User.js";

// Register agent
export const registerAgent = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Agent already exists" });
    }

    const agent = new User({ fullName, email, password, role: "agent" });
    await agent.save();

    res.status(201).json({ message: "Agent registered successfully", agent });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Example: Get all agents
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: "agent" });
    res.json(agents);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
