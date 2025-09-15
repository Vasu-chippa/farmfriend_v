import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BuyerSidebar from "../../../components/BuyerSidebar";

function CropPurchase() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/marketplace/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("❌ Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const placeOrder = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.post(`http://localhost:5000/api/marketplace/${id}/order`, {
        buyerId: user._id,
        quantity,
      });
      alert("✅ Order placed successfully!");
    } catch (err) {
      alert("❌ Failed to place order");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div style={{ display: "flex" }}>
      <BuyerSidebar />
      <div className="page-container" style={{ marginLeft: "220px", padding: "20px" }}>
        <h2>{product.name}</h2>
        <img
          src={
            product.images?.length > 0
              ? `http://localhost:5000/uploads/${product.images[0]}`
              : "/default-crop.jpg"
          }
          alt={product.name}
          style={{ width: "300px", borderRadius: "8px" }}
        />
        <p>{product.description}</p>
        <p>Price: ₹{product.price} /kg</p>
        <input
          type="number"
          value={quantity}
          min="1"
          max={product.quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={placeOrder}>Place Order</button>
      </div>
    </div>
  );
}

export default CropPurchase;
