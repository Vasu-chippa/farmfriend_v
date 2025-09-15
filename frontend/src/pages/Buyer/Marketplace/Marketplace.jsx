import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BuyerSidebar from "../../../components/BuyerSidebar";
import "./Marketplace.css";

const MarketplaceList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/marketplace");
        setProducts(res.data);
      } catch (err) {
        console.error("❌ Error fetching products:", err);
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <p>Loading marketplace...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ display: "flex" }}>
      <BuyerSidebar />
      <div className="marketplace-container" style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>🌾 Marketplace</h2>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className="marketplace-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <img
                  src={
                    product.images?.length > 0
                      ? `http://localhost:5000/uploads/${product.images[0]}`
                      : "https://via.placeholder.com/200x150?text=No+Image"
                  }
                  alt={product.name}
                  className="product-image"
                />
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <p>
                  <strong>💰 Price:</strong> ₹{product.price}/kg
                </p>
                <p>
                  <strong>📦 Quantity:</strong> {product.quantity} kg
                </p>
                <p>
                  <strong>👨‍🌾 Farmer:</strong> {product.farmer?.fullName || "Unknown"}
                </p>
                <button
                  className="buy-btn"
                  onClick={() => navigate(`/buyer/marketplace/${product._id}`)}
                >
                  View & Buy
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceList;
