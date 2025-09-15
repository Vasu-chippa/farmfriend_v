// backend/src/models/Buyer.js
import mongoose from "mongoose";

const buyerSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    company: { type: String },
    role: { type: String, default: "buyer" }
  },
  { timestamps: true }
);

const Buyer = mongoose.model("Buyer", buyerSchema);
export default Buyer;
