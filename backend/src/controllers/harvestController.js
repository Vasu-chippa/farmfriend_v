import Harvest from "../models/Harvest.js";

// 📋 Get all harvest crops for logged-in farmer
export const getHarvest = async (req, res) => {
  try {
    const harvest = await Harvest.findOne({ farmer: req.user._id }).populate(
      "crops.cropId",
      "name image price quantity isOrganic quality category"
    );

    if (!harvest) return res.json({ crops: [] });

    res.json({ crops: harvest.crops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ➕ Add a crop to harvest
export const addCrop = async (req, res) => {
  try {
    const { cropId, name, price, quantity, image, category, quality } = req.body;

    let harvest = await Harvest.findOne({ farmer: req.user._id });
    if (!harvest) {
      harvest = new Harvest({ farmer: req.user._id, crops: [] });
    }

    // avoid duplicates
    if (harvest.crops.some((c) => c.cropId.toString() === cropId)) {
      return res.status(400).json({ msg: "Crop already in harvest list" });
    }

    harvest.crops.push({ cropId, name, price, quantity, image, category, quality });
    await harvest.save();

    await harvest.populate("crops.cropId", "name image price quantity isOrganic quality category");

    res.json({ msg: "Crop added", crops: harvest.crops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Remove a crop from harvest
export const removeCrop = async (req, res) => {
  try {
    const { cropId } = req.params;
    let harvest = await Harvest.findOne({ farmer: req.user._id });
    if (!harvest) return res.status(404).json({ msg: "No harvest list found" });

    harvest.crops = harvest.crops.filter((c) => c.cropId.toString() !== cropId);
    await harvest.save();

    await harvest.populate("crops.cropId", "name image price quantity isOrganic quality category");

    res.json({ msg: "Crop removed", crops: harvest.crops });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📌 Get single harvest crop by id
export const getSingleHarvest = async (req, res) => {
  try {
    const harvest = await Harvest.findOne({ farmer: req.user._id }).populate(
      "crops.cropId",
      "name image price quantity isOrganic quality category"
    );

    if (!harvest) return res.status(404).json({ message: "Harvest not found" });

    const crop = harvest.crops.find((c) => c.cropId._id.toString() === req.params.id);

    if (!crop) return res.status(404).json({ message: "No crop found" });

    res.json(crop);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
