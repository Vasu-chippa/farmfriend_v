import React, { useEffect, useState } from "react";
import Chart from "../../../components/Chart";
import dashboardService from "../../../services/dashboardService";
import "./FarmerDashboard.css";

const POLL_INTERVAL = 30000;

const FarmerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [statsRight, setStatsRight] = useState(null);

  const loadAll = async () => {
    try {
      const [sRes, stRes] = await Promise.all([
        dashboardService.fetchSummary(),
        dashboardService.fetchStats(),
      ]);
      setSummary(sRes.data);
      setStatsRight(stRes.data);
    } catch (err) {
      console.error("Dashboard load failed", err);
    }
  };

  useEffect(() => {
    loadAll();
    const iv = setInterval(loadAll, POLL_INTERVAL);
    return () => clearInterval(iv);
  }, []);

  const farmerName = summary?.farmerName || localStorage.getItem("farmerName") || "Farmer";

  return (
    <div className="premium-dashboard">
      {/* HEADER AREA */}
      <header className="dash-header">
        <div className="welcome-text">
          <h1>👋 Good Morning, {farmerName}!</h1>
          <p>Here’s what’s happening on your farm today.</p>
        </div>
        <div className="header-controls">
          <div className="icon-pill">
             <span className="bell-icon">🔔</span>
             <span className="count-badge">{statsRight?.harvestListCount ?? 0}</span>
          </div>
          <div className="profile-pill">
            <div className="avatar-circle">{farmerName.charAt(0)}</div>
            <span>{farmerName}</span>
          </div>
        </div>
      </header>

      {/* TOP STATS CARDS */}
      <section className="top-stats-grid">
        <div className="glass-card stat-item">
          <div className="icon-box green-bg">🌱</div>
          <div className="stat-info">
            <span className="v-label">Total Crops</span>
            <span className="v-value">{summary?.totalCrops ?? 0}</span>
            <span className="v-trend positive">↑ 8%</span>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box orange-bg">🌾</div>
          <div className="stat-info">
            <span className="v-label">Total Harvested</span>
            <span className="v-value">{summary?.totalHarvested ?? 0}</span>
            <span className="v-trend positive">↑ 15%</span>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box red-bg">🧧</div>
          <div className="stat-info">
            <span className="v-label">Total Expenses</span>
            <span className="v-value">₹{summary?.totalExpenses?.toLocaleString() ?? 0}</span>
            <span className="v-trend negative">↑ 5%</span>
          </div>
        </div>
        <div className="glass-card stat-item">
          <div className="icon-box blue-bg">💰</div>
          <div className="stat-info">
            <span className="v-label">Profit / Loss</span>
            <span className="v-value">₹{summary?.profit?.toLocaleString() ?? 0}</span>
            <span className="v-trend positive">↑ 22%</span>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT ROW (Chart + Sidebar) */}
      <div className="dashboard-main-row">
        <div className="glass-card chart-section">
          <div className="card-header">
            <h3>Income vs Expenses</h3>
            <select className="premium-select"><option>This Season</option></select>
          </div>
          <Chart />
        </div>

        <aside className="vertical-stats">
          <div className="glass-card side-stat">
            <div className="side-icon green-light">🌱</div>
            <div className="side-text">
               <p>Crops in Harvest List</p>
               <h3>{statsRight?.harvestListCount ?? 0}</h3>
            </div>
            <span className="chevron">›</span>
          </div>
          <div className="glass-card side-stat">
            <div className="side-icon orange-light">🏪</div>
            <div className="side-text">
               <p>Crops in Marketplace</p>
               <h3>{statsRight?.marketplaceCount ?? 0}</h3>
            </div>
            <span className="chevron">›</span>
          </div>
          <div className="glass-card side-stat">
            <div className="side-icon blue-light">🛒</div>
            <div className="side-text">
               <p>Items/Products Sold</p>
               <h3>{statsRight?.soldItemsCount ?? 0}</h3>
            </div>
            <span className="chevron">›</span>
          </div>
        </aside>
      </div>

      {/* FOOTER BANNER */}
      <footer className="glass-card success-banner">
        <div className="banner-info">
          <span className="leaf-bg">🌿</span>
          <div>
            <strong>Keep it up, {farmerName}!</strong>
            <p>Your farm is performing 12% better than last season.</p>
          </div>
        </div>
        <button className="premium-btn">View Full Report</button>
      </footer>
    </div>
  );
};

export default FarmerDashboard;