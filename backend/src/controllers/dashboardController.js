import mongoose from "mongoose";
import Crop from "../models/Crop.js";
import Expense from "../models/Expense.js";
import Harvest from "../models/Harvest.js";
import Product from "../models/Product.js";
import Order from "../models/Order.js";
import User from "../models/User.js";

// GET /api/dashboard/summary
export const getSummary = async (req, res) => {
  try {
    const farmerId = req.user && req.user._id ? new mongoose.Types.ObjectId(req.user._id) : null;
    if (!farmerId) return res.status(401).json({ message: "Unauthorized" });

    const [totalCrops, harvestedCropsAgg, expensesAgg, incomeAgg, farmer] = await Promise.all([
      Crop.countDocuments({ farmer: farmerId }),
      Crop.countDocuments({ farmer: farmerId, status: "Completed" }),
      Expense.aggregate([
        { $match: { farmer: farmerId } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
      ]),
      // income: sum of orders where the ordered product belongs to this farmer
      Order.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "product",
            foreignField: "_id",
            as: "productDoc",
          },
        },
        { $unwind: "$productDoc" },
        { $match: { "productDoc.farmer": farmerId, status: { $in: ["Completed", "Delivered"] } } },
        { $group: { _id: null, total: { $sum: "$total" } } },
      ]),
      User.findById(farmerId).select("fullName"),
    ]);

    const totalExpenses = expensesAgg && expensesAgg.length ? expensesAgg[0].total : 0;
    const totalIncome = incomeAgg && incomeAgg.length ? incomeAgg[0].total : 0;

    return res.json({
      totalCrops: totalCrops || 0,
      harvestedCrops: harvestedCropsAgg || 0,
      totalExpenses,
      totalIncome,
      profitLoss: totalIncome - totalExpenses,
      farmerName: farmer ? farmer.fullName : undefined,
    });
  } catch (error) {
    console.error("getSummary error:", error && error.message ? error.message : error);
    return res.status(500).json({ message: "Failed to fetch dashboard summary" });
  }
};

// GET /api/dashboard/chart
export const getChart = async (req, res) => {
  try {
    const farmerId = req.user && req.user._id ? new mongoose.Types.ObjectId(req.user._id) : null;
    if (!farmerId) return res.status(401).json({ message: "Unauthorized" });

    // Build monthly aggregation for last 12 months
    const now = new Date();
    const oneYearAgo = new Date(now.getFullYear() - 1, now.getMonth() + 1, 1);

    // Income by month
    const income = await Order.aggregate([
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productDoc",
        },
      },
      { $unwind: "$productDoc" },
      { $match: { "productDoc.farmer": farmerId, createdAt: { $gte: oneYearAgo } } },
      {
        $group: {
          _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
          total: { $sum: "$total" },
        },
      },
    ]);

    // Expenses by month
    const expenses = await Expense.aggregate([
      { $match: { farmer: farmerId, date: { $gte: oneYearAgo } } },
      { $group: { _id: { year: { $year: "$date" }, month: { $month: "$date" } }, total: { $sum: "$amount" } } },
    ]);

    // Merge into months array
    const months = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      const key = `${d.getFullYear()}-${d.getMonth() + 1}`;
      months.push({ key, month: d.toLocaleString("default", { month: "short" }) });
    }

    const incomeMap = new Map(income.map((it) => [`${it._id.year}-${it._id.month}`, it.total]));
    const expensesMap = new Map(expenses.map((it) => [`${it._id.year}-${it._id.month}`, it.total]));

    const result = months.map((m) => ({
      month: m.month,
      income: incomeMap.get(m.key) || 0,
      expenses: expensesMap.get(m.key) || 0,
    }));

    return res.json(result);
  } catch (error) {
    console.error("getChart error:", error && error.message ? error.message : error);
    return res.status(500).json({ message: "Failed to fetch chart data" });
  }
};

// GET /api/dashboard/stats
export const getStats = async (req, res) => {
  try {
    const farmerId = req.user && req.user._id ? new mongoose.Types.ObjectId(req.user._id) : null;
    if (!farmerId) return res.status(401).json({ message: "Unauthorized" });

    const [harvestListCount, marketplaceCountAgg, soldItemsAgg] = await Promise.all([
      Harvest.countDocuments({ farmer: farmerId }),
      Product.countDocuments({ farmer: farmerId }),
      // sold items: sum of quantity in orders for products owned by farmer and marked Completed/Delivered
      Order.aggregate([
        { $lookup: { from: "products", localField: "product", foreignField: "_id", as: "productDoc" } },
        { $unwind: "$productDoc" },
        { $match: { "productDoc.farmer": farmerId, status: { $in: ["Completed", "Delivered"] } } },
        { $group: { _id: null, totalSold: { $sum: "$quantity" } } },
      ]),
    ]);

    const marketplaceCount = marketplaceCountAgg || 0;
    const soldItemsCount = soldItemsAgg && soldItemsAgg.length ? soldItemsAgg[0].totalSold : 0;

    return res.json({ harvestListCount, marketplaceCount, soldItemsCount });
  } catch (error) {
    console.error("getStats error:", error && error.message ? error.message : error);
    return res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};

export default { getSummary, getChart, getStats };
