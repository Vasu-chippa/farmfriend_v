import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
    verifiedPurchase: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
