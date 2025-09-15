import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    cropName: { type: String, required: [true, "Crop name is required"] },
    category: { 
      type: String, 
      required: [true, "Category is required"], 
      enum: ["Seeds", "Fertilizer", "Labor", "Transport", "Water", "Equipment", "Others"] // ✅ allowed values
    },
    amount: { 
      type: Number, 
      required: [true, "Amount is required"], 
      min: [1, "Amount must be at least 1"] 
    },
    date: { type: Date, required: [true, "Date is required"] },
    description: { type: String, maxlength: 200 }, // optional
  },
  { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);
