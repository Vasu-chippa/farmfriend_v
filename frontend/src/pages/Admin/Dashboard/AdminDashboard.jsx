import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
       const { data } = await API.get("/admins/dashboard");
        setStats(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      <AdminSidebar />
      <div className="dashboard-content">
        <h1>Welcome, Admin</h1>
        <div className="stats-grid">
          <div className="card">👥 Users: {stats.users}</div>
          <div className="card">🌾 Farmers: {stats.farmers}</div>
          <div className="card">🛒 Buyers: {stats.buyers}</div>
          <div className="card">💳 Payments: {stats.payments}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
