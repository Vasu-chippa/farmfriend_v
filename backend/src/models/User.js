// backend/src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["farmer", "buyer", "agent", "admin"],
      default: "farmer",
    },
    verified: { type: Boolean, default: false },
    phone: { type: String },
    
    // Farmer specific fields
    landSize: { type: String },
    age: { type: Number },
    address: { type: String },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [lng, lat]
        default: [0, 0],
      },
    },

    // Buyer specific fields
    company: { type: String },

    // Agent specific fields
    region: { type: String },
    commissionEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

userSchema.index({ location: "2dsphere" });

export default mongoose.model("User", userSchema);
