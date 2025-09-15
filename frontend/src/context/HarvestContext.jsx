// src/context/HarvestContext.jsx
import React, { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

export const HarvestContext = createContext();

export const HarvestProvider = ({ children }) => {
  const [harvest, setHarvest] = useState([]);
  const token = localStorage.getItem("token");

  // fetch harvest list
  const fetchHarvest = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/harvest", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHarvest(res.data.crops || []);
    } catch (err) {
      console.error("❌ Error fetching harvest:", err);
    }
  }, [token]);

  useEffect(() => {
    fetchHarvest();
  }, [fetchHarvest]);

  // check if crop in harvest
  const isInHarvest = (id) => harvest.some((c) => c.cropId === id);

  // toggle crop in harvest
  const toggleHarvest = async (crop) => {
    try {
      if (isInHarvest(crop._id)) {
        const harvestItem = harvest.find((h) => h.cropId === crop._id);
        if (!harvestItem) return;
        await axios.delete(
          `http://localhost:5000/api/harvest/${harvestItem._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHarvest((prev) => prev.filter((h) => h.cropId !== crop._id));
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/harvest",
          {
            cropId: crop._id,
            name: crop.name,
            category: crop.category || "General",
            quality: crop.quality || "Organic",
            price: crop.price || 0,
            quantity: crop.quantity || 0,
            image: `/cropimages/${crop.name.toLowerCase()}.jpeg`,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setHarvest((prev) => [...prev, res.data]);
      }
    } catch (err) {
      console.error("❌ Error toggling harvest:", err);
    }
  };

  return (
    <HarvestContext.Provider value={{ harvest, isInHarvest, toggleHarvest }}>
      {children}
    </HarvestContext.Provider>
  );
};
