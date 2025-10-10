import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "./ManageOrders.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/admins/orders");
      setOrders(data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {

     await API.put(`/admins/orders/${id}/status`, { status: newStatus });


      fetchOrders();
    } catch (err) {
      alert("Failed to update order status");
    }
  };

  return (
    <div className="admin-orders-page">
      <AdminSidebar />
      <div className="orders-content">
        <h2>📦 Manage Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Status</th>
              <th>Change</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o, i) => (
              <tr key={o._id}>
                <td>{i + 1}</td>
                <td>{o._id}</td>
                <td>{o.buyer?.fullName}</td>
                <td>{o.product?.name}</td>
                <td>{o.status}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) =>
                      handleStatusChange(o._id, e.target.value)
                    }
                  >
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
