import express from "express";
import upload from "../middlewares/upload.js";
import Crop from "../models/Crop.js";

const router = express.Router();


/**
 * @route   POST /api/farmers/products
 * @desc    Add new product
 */
router.post("/products", upload.array("images"), async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("Files:", req.files);

    const { name, description, price, quantity, quality, organic } = req.body;

    const crop = new Crop({
      name,
      description,
      price,
      quantity,
      quality,
      organic: organic === "true" || organic === true, // normalize boolean
      images: req.files ? req.files.map((f) => "/uploads/" + f.filename) : [],
    });

    await crop.save();
    res.json(crop);
  } catch (err) {
    console.error("❌ Error saving product:", err);
    res.status(500).json({ error: "Failed to save product" });
  }
});

/**
 * @route   GET /api/farmers/products
 * @desc    Fetch all products
 */
router.get("/products", async (req, res) => {
  try {
    const crops = await Crop.find().sort({ createdAt: -1 });
    res.json(crops);
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

/**
 * @route   GET /api/farmers/products/:id
 * @desc    Fetch single product details
 */
router.get("/products/:id", async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);
    if (!crop) return res.status(404).json({ error: "Product not found" });

    res.json(crop);
  } catch (err) {
    console.error("❌ Error fetching product:", err);
        res.status(500).json({ error: "Failed to fetch product" });
  }
});
/**
 * @route   PUT /api/farmers/products/:id
 * @desc    Update product
 */
router.put("/products/:id", upload.array("images"), async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Ensure organic is boolean
    if (updateData.organic !== undefined) {
      updateData.organic =
        updateData.organic === "true" || updateData.organic === true;
    }

    // Handle new uploaded images
    if (req.files && req.files.length > 0) {
      updateData.images = req.files.map((f) => "/uploads/" + f.filename);
    }

    const updated = await Crop.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updated) return res.status(404).json({ error: "Product not found" });

    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating product:", err);
    res.status(500).json({ error: "Failed to update product" });
  }
});

/**
 * @route   DELETE /api/farmers/products/:id
 * @desc    Delete product
 */
router.delete("/products/:id", async (req, res) => {
  try {
    const deleted = await Crop.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Product not found" });

    res.json({ message: "🗑️ Deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting product:", err);
    res.status(500).json({ error: "Failed to delete product" });
  }
});
export default router;

// Expenses model   +++++++++++++++++++++++++++++++++
import Expense from "../models/Expense.js";

/**
 * @route   POST /api/farmers/expenses
 * @desc    Add a new expense
 */
// Add expense
router.post("/expenses", async (req, res) => {
  try {
    const { cropName, category, amount, date, description } = req.body;

    const expense = new Expense({
      cropName,
      category,
      amount,
      date,
      description,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("❌ Error adding expense:", err);

    if (err.name === "ValidationError") {
      return res.status(400).json({ error: Object.values(err.errors).map(e => e.message) });
    }

    res.status(500).json({ error: "Failed to add expense" });
  }
});



/**
 * @route   GET /api/farmers/expenses
 * @desc    Fetch all expenses
 */
router.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ error: "Failed to fetch expenses" });
  }
});

/**
 * @route   PUT /api/farmers/expenses/:id
 * @desc    Update expense
 */
router.put("/expenses/:id", async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Expense not found" });
    res.json(updated);
  } catch (err) {
    console.error("❌ Error updating expense:", err);
    res.status(500).json({ error: "Failed to update expense" });
  }
});

/**
 * @route   DELETE /api/farmers/expenses/:id
 * @desc    Delete expense
 */
router.delete("/expenses/:id", async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Expense not found" });
    res.json({ message: "🗑️ Expense deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting expense:", err);
    res.status(500).json({ error: "Failed to delete expense" });
  }
});
