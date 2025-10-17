// apps/backend/server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import adminRoutes from "./src/routes/adminRoutes.js";
import agentRoutes from "./src/routes/agentRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import buyerRoutes from "./src/routes/buyerRoutes.js";
import farmerRoutes from "./src/routes/farmerRoutes.js";
import harvestRoutes from "./src/routes/harvestRoutes.js";
import cropRecordRoutes from "./src/routes/cropRecordRoutes.js";
import cropRoutes from "./src/routes/cropRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Static folder for uploaded images
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "src", "uploads")));

// Health check route
app.get("/", (req, res) => {
  res.send("✅ FarmFriend Backend is running...");
});

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/agents", agentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/buyers", buyerRoutes);
app.use("/api/farmers", farmerRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/harvest", harvestRoutes);
app.use("/api/crop-records", cropRecordRoutes);
app.use("/api/marketplace", productRoutes);

// Database connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      console.warn(
        "⚠️  MONGO_URI is not set. Skipping MongoDB connection. Set MONGO_URI in your .env to enable DB features."
      );
      return;
    }

    await mongoose.connect(mongoUri, {
      // mongoose options (no deprecated options required for modern mongoose)
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error && error.message ? error.message : error);
    // Don't crash here; depending on environment (like preview or static deployments)
    // you may intentionally run without a DB. If you expect a DB, set MONGO_URI.
  }
};

connectDB();

// Server listening
const PORT = Number(process.env.PORT) || 5000;
const server = app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use. Set a different PORT in your environment or stop the process using this port.`);
  } else {
    console.error("❌ Server error:", err);
  }
});
