// src/pages/HarvestList.jsx
import React, { useEffect, useState } from "react";
import API from "../../../api";
import { useNavigate } from "react-router-dom";
import "./HarvestList.css";

const HarvestList = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removing, setRemoving] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHarvest = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/harvest", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const list = res.data.crops || [];
        // filter out any null/undefined cropId right away
        setCrops(list.filter((c) => c && c.cropId));
      } catch (err) {
        console.error("❌ Error fetching harvest list:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHarvest();
  }, []);

  const handleRemove = async (cropId) => {
    try {
      setRemoving(cropId);
      const token = localStorage.getItem("token");

      await API.delete(`/harvest/${cropId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔥 Safe filter with null check
      setCrops((prev) => prev.filter((c) => c && c.cropId && c.cropId._id !== cropId));
    } catch (err) {
      console.error("❌ Error removing crop:", err);
    } finally {
      setRemoving(null);
    }
  };

  if (loading) return <p>Loading harvest list...</p>;
  if (!crops.length) return <p>No crops added to your harvest list yet.</p>;

  const getImageUrl = (img) => {
    if (!img) return `${process.env.PUBLIC_URL}/cropimages/default.jpeg`;
    if (!img.startsWith("http")) {
      return `${process.env.PUBLIC_URL}/cropimages/${img}`;
    }
    return img;
  };

  return (
    <div className="harvest-container">
      <h2>🌾 My Harvest List</h2>
      <div className="harvest-grid">
        {crops.map((crop, idx) => {
          if (!crop || !crop.cropId) return null; // ⛑️ safety check

          return (
            <div key={crop.cropId._id || idx} className="harvest-card">
              <img
                src={getImageUrl(crop.cropId.image)}
                alt={crop.cropId.name || "crop"}
                className="harvest-image"
                onClick={() => navigate(`/farmer/crop-records/${crop.cropId._id}`)}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `${process.env.PUBLIC_URL}/cropimages/default.jpeg`;
                }}
              />
              <div className="harvest-details">
                <h3>{crop.cropId.name}</h3>
                <p><b>Category:</b> {crop.cropId.category || "General"}</p>
                <p><b>Quality:</b> {crop.cropId.quality}</p>
                <p><b>Price:</b> ₹{crop.cropId.price}/kg</p>
                <p><b>Quantity:</b> {crop.cropId.quantity} kg</p>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(crop.cropId._id)}
                disabled={removing === crop.cropId._id}
              >
                {removing === crop.cropId._id ? "Removing..." : "❌ Remove"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HarvestList;
