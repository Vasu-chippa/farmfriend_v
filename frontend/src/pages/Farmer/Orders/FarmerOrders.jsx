import React, { useEffect, useState } from "react";
import axios from "axios";

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("/api/orders/farmer", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    const token = localStorage.getItem("token");
    await axios.put(
      `/api/orders/${id}/status`,
      { status },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setOrders((prev) =>
      prev.map((o) => (o._id === id ? { ...o, status } : o))
    );
  };

  return (
    <div>
      <h2>Incoming Orders</h2>
      {orders.map((order) => (
        <div key={order._id}>
          <p>Crop: {order.crop?.name}</p>
          <p>Buyer: {order.buyer?.name}</p>
          <p>Status: {order.status}</p>
          <button onClick={() => updateStatus(order._id, "Accepted")}>Accept</button>
          <button onClick={() => updateStatus(order._id, "Rejected")}>Reject</button>
          <button onClick={() => updateStatus(order._id, "Delivered")}>Delivered</button>
        </div>
      ))}
    </div>
  );
};

export default FarmerOrders;
