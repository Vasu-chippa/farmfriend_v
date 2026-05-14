import React, { useEffect, useState } from 'react';
import AdminSidebar from '../AdminSidebar';
import API from '../../../api';
import '../Users/ManageUsers.css';

const Reports = () => {
  const [stats, setStats] = useState(null);
  const fetchReports = async () => {
    try {
      const { data } = await API.get('/admins/reports');
      setStats(data);
    } catch (err) {
      console.error('Failed to fetch reports', err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!stats) return (
    <div className="manage-users">
      <AdminSidebar />
      <div className="content">Loading reports…</div>
    </div>
  );

  return (
    <div className="manage-users">
      <AdminSidebar />
      <div className="content">
        <h2>Reports</h2>
        <div className="reports-grid">
          <div className="card">🛒 Total Sold: {stats.totalSold}</div>
          <div className="card">⏳ Pending Orders: {stats.pendingOrders}</div>
          <div className="card">💰 Revenue: ₹{Number(stats.revenue || 0).toFixed(2)}</div>
          <div className="card">🏷️ Commission ({(stats.commissionRate*100).toFixed(1)}%): ₹{Number(stats.commission || 0).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
