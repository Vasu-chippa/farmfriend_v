import React from "react";
import { useNavigate } from "react-router-dom";

const CropCard = ({ crop }) => {
  const navigate = useNavigate();

  if (!crop) return null;

  return (
    <div
      onClick={() => navigate(`/crop/${crop._id}`)}
      className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition"
    >
      {/* Image */}
      <img
        src={crop.image || "/default-crop.jpg"}
        alt={crop.name}
        className="h-40 w-full object-cover"
      />

      {/* Details */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{crop.name}</h3>
        <p className="text-sm text-gray-600">
          {crop.quantity || "N/A"} kg • ₹{crop.price || "0"}
        </p>
        <p className="text-xs text-gray-500">
          {crop.isOrganic ? "🌱 Organic" : "Conventional"} |{" "}
          Quality: {crop.quality || "Standard"}
        </p>
      </div>
    </div>
  );
};

export default CropCard;
