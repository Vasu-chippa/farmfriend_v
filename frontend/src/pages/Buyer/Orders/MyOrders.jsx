import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MyOrders.css";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const buyer = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`http://localhost:5000/api/orders/buyer/${buyer._id}`);
        setOrders(res.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="orders-container">
      <h2>📦 My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <img
                src={
                  order.crop?.images?.length > 0
                    ? `http://localhost:5000/uploads/${order.crop.images[0]}`
                    : "https://via.placeholder.com/150x100?text=No+Image"
                }
                alt={order.crop?.name}
                className="order-image"
              />
              <div className="order-info">
                <h3>{order.crop?.name}</h3>
                <p>
                  <strong>Farmer:</strong> {order.farmer?.fullName}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity} kg
                </p>
                <p>
                  <strong>Total Price:</strong> ₹{order.price}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </p>
                <p className="date">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyOrders;
