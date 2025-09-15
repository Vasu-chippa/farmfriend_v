// apps/backend/src/controllers/cropRecordController.js
import CropRecord from "../models/CropRecord.js";

/**
 * Create record
 */
export const addRecord = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please login again." });
    }

    const {
      cropId,
      date,
      cost,
      quantity,
      description,
      fertilizer,
      seeds,
      workers,
      transportCost,
    } = req.body;

    // minimal validation
    if (!cropId || !date || cost === undefined || quantity === undefined) {
      return res.status(400).json({ error: "Missing required fields (cropId, date, cost, quantity)" });
    }

    const record = new CropRecord({
      farmer: req.user._id,
      cropId,
      date,
      cost,
      quantity,
      description,
      fertilizer,
      seeds,
      workers,
      transportCost,
    });

    await record.save();
    res.status(201).json(record);
  } catch (err) {
    console.error("addRecord error:", err);
    res.status(400).json({ error: err.message });
  }
};

/**
 * Get records by crop (farmer scoped)
 */
export const getRecords = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please login again." });
    }

    const records = await CropRecord.find({
      cropId: req.params.cropId,
      farmer: req.user._id,
    }).sort({ date: -1 });

    res.json(records);
  } catch (err) {
    console.error("getRecords error:", err);
    res.status(500).json({ error: err.message });
  }
};

/**
 * Update record (farmer-scoped)
 */
export const updateRecord = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please login again." });
    }

    const allowed = (({
      date,
      cost,
      quantity,
      description,
      fertilizer,
      seeds,
      workers,
      transportCost,
    }) => ({
      date,
      cost,
      quantity,
      description,
      fertilizer,
      seeds,
      workers,
      transportCost,
    }))(req.body);

    const record = await CropRecord.findOneAndUpdate(
      { _id: req.params.id, farmer: req.user._id },
      allowed,
      { new: true }
    );

    if (!record) {
      return res.status(404).json({ error: "Record not found or not yours" });
    }

    res.json(record);
  } catch (err) {
    console.error("updateRecord error:", err);
    res.status(400).json({ error: err.message });
  }
};

/**
 * Delete record (farmer-scoped)
 */
export const deleteRecord = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized. Please login again." });
    }

    const deleted = await CropRecord.findOneAndDelete({
      _id: req.params.id,
      farmer: req.user._id,
    });

    if (!deleted) {
      return res.status(404).json({ error: "Record not found or not yours" });
    }

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("deleteRecord error:", err);
    res.status(500).json({ error: err.message });
  }
};
