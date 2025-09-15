import mongoose from "mongoose";

const harvestSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    crops: [
      {
        cropId: { type: mongoose.Schema.Types.ObjectId, ref: "Crop", required: true },
        name: String,
        price: Number,
        quantity: Number,
        image: String,
        category: String,
        quality: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Harvest", harvestSchema);
