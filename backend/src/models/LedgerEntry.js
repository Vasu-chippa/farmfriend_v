import mongoose from "mongoose";

const ledgerSchema = new mongoose.Schema(
  {
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    description: { type: String },
    source: { type: String },
    meta: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true }
);

export default mongoose.model("LedgerEntry", ledgerSchema);
