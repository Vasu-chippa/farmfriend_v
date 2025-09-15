import React from "react";
import BuyerSidebar from "../../../components/BuyerSidebar";
import "./BuyerDashboard.css";

const BuyerDashboard = () => {
  return (
    <div className="buyer-layout">
      <BuyerSidebar />
      <div className="buyer-content">
        <h2>📊 Buyer Dashboard</h2>

        <div className="summary-cards">
          <div className="card">
            <h3>Total Orders</h3>
            <p>12</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p>3</p>
          </div>
          <div className="card">
            <h3>Completed Orders</h3>
            <p>9</p>
          </div>
        </div>

        <div className="chart-section">
          <h3>Spending Over Time</h3>
          <div className="chart-placeholder">📈 Chart Coming Soon</div>
        </div>

        <div className="quick-actions">
          <button className="btn">🛒 Browse Marketplace</button>
          <button className="btn">📦 View Orders</button>
        </div>
      </div>
    </div>
  );
};

export default BuyerDashboard;
