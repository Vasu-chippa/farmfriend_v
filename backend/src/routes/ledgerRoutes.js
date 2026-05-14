import express from "express";
import LedgerEntry from "../models/LedgerEntry.js";

const router = express.Router();

// Get ledger entries for a farmer
router.get("/:farmerId", async (req, res) => {
  try {
    const entries = await LedgerEntry.find({ farmer: req.params.farmerId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch ledger entries" });
  }
});

// Summary
router.get("/:farmerId/summary", async (req, res) => {
  try {
    const farmerId = req.params.farmerId;
    const agg = await LedgerEntry.aggregate([
      { $match: { farmer: new require('mongoose').Types.ObjectId(farmerId) } },
      { $group: { _id: "$type", total: { $sum: "$amount" } } },
    ]);

    const totals = { income: 0, expense: 0 };
    agg.forEach((g) => {
      totals[g._id] = g.total;
    });
    const net = (totals.income || 0) - (totals.expense || 0);
    res.json({ totals, net });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to compute ledger summary" });
  }
});

export default router;
