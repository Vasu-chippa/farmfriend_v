import mongoose from "mongoose";

const cropSchema = new mongoose.Schema({
  farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  image: { type: String, default: "" },
  status: { type: String, enum: ["Active", "Completed", "Hold"], default: "Active" },
  profit: { type: Number, default: 0 },
  dateAdded: { type: Date, default: Date.now },
  dateCompleted: { type: Date }
});

// ✅ Correct way for ESM
export default mongoose.model("Crop", cropSchema);
