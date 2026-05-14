// backend/scripts/createAgent.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Agent from "../src/models/Agent.js";

// Load .env relative to this script file so the seeder works when run from project root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const createAgent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const agents = [
      {
        fullName: "Agent Two",
        email: "agenttwo2@gmail.com",
        password: "agenttwo2",
        phone: "90000001",
        region: "Hyderabad",
      },
      {
        fullName: "Agent warnagal",
        email: "agentwarangal@gmail.com",
        password: "agentwarangal",
        phone: "9003464574",
        region: "warangal",
      },
    ];

    for (const a of agents) {
      // skip if agent with same email already exists
      const exists = await Agent.findOne({ email: a.email });
      if (exists) {
        console.log("ℹ️ Agent already exists, skipping:", a.email);
        continue;
      }

      const agent = new Agent(a);
      await agent.save();
      console.log("✅ Agent created:", agent.email);
    }

    console.log("All done.");
    process.exit();
  } catch (err) {
    console.error("❌ Error creating agents:", err.message || err);
    process.exit(1);
  }
};

createAgent();
