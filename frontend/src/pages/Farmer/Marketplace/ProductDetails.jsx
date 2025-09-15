// apps/frontend/src/pages/Farmer/Marketplace/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./FarmerMarketplace.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/farmers/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product details", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="details-container">
      <button className="back-btn" onClick={() => navigate(-1)}>⬅ Back</button>
      
      <h2>{product.name}</h2>
      <p>{product.description || "No description provided"}</p>

      {/* Image Gallery */}
      <div className="gallery">
        {product.images?.length > 0 ? (
          product.images.map((img, i) => (
            <img
              key={i}
              src={`http://localhost:5000/uploads/${img}`}
              alt={`crop-${i}`}
              className="gallery-img"
            />
          ))
        ) : (
          <img src="/default-crop.jpg" alt="default" className="gallery-img" />
        )}
      </div>

      <div className="details-info">
        <p><strong>Price:</strong> ₹{product.price}</p>
        <p><strong>Quantity:</strong> {product.quantity} kg</p>
        <p><strong>Quality:</strong> {product.quality}</p>
        <p><strong>Organicccc:</strong> {product.organic ? "🌱 Yes" : "❌ No"}</p>
      </div>
    </div>
  );
}

export default ProductDetails;
