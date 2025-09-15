import mongoose from "mongoose";

const cropRecordSchema = new mongoose.Schema(
  {
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cropId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Crop",
      required: true,
    },
    date: { type: Date, required: true },
    cost: { type: Number, required: true },
    quantity: { type: Number, required: true },
    description: { type: String },
    fertilizer: { type: String },
    seeds: { type: Number },
    workers: { type: Number },
    transportCost: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("CropRecord", cropRecordSchema);
