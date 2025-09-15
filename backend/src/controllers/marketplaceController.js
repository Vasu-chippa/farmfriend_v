import Harvest from "../models/Harvest.js";

// Get all crops uploaded by farmers (for marketplace)
export const getMarketplaceCrops = async (req, res) => {
  try {
    const crops = await Harvest.find()
      .populate("farmer", "name email") // shows farmer info
      .sort({ createdAt: -1 });
    res.json(crops);
  } catch (error) {
    res.status(500).json({ message: "Failed to load marketplace crops", error });
  }
};
