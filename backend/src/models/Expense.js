// backend/src/models/Expense.js
import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // 👈 link to farmer
    cropName: { type: String, required: true },
    category: { 
      type: String, 
      required: true, 
      enum: ["Seeds", "Fertilizer", "Labor", "Transport", "Water", "Equipment", "Others"]
    },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, maxlength: 200 },
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
