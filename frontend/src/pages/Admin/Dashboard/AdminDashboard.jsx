import React, { useEffect, useState } from "react";
import API from "../../../api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [reports, setReports] = useState(null);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [dashRes, repRes, ordersRes, prodRes] = await Promise.all([
          API.get("/admins/dashboard"),
          API.get("/admins/reports"),
          API.get("/admins/orders"),
          API.get("/admins/products"),
        ]);

        setStats(dashRes.data || {});
        setReports(repRes.data || null);
        setOrders((ordersRes.data || []).slice(0, 6));
        setProducts((prodRes.data || []).slice(0, 6));
      } catch (err) {
        console.error("Admin dashboard load error:", err);
      }
    };
    fetchAll();
  }, []);

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="header-actions">
          <a className="btn" href="/admin/reports">View Full Reports</a>
        </div>
      </div>

      <div className="dashboard-grid">
        <section className="summary-cards">
          <div className="card sum-card">
            <div className="label">Users</div>
            <div className="value">{stats.users ?? '—'}</div>
          </div>
          <div className="card sum-card">
            <div className="label">Farmers</div>
            <div className="value">{stats.farmers ?? '—'}</div>
          </div>
          <div className="card sum-card">
            <div className="label">Buyers</div>
            <div className="value">{stats.buyers ?? '—'}</div>
          </div>
          <div className="card sum-card">
            <div className="label">Products</div>
            <div className="value">{stats.products ?? '—'}</div>
          </div>
          <div className="card sum-card">
            <div className="label">Revenue</div>
            <div className="value">₹{(reports?.revenue ?? 0).toFixed(2)}</div>
          </div>
          <div className="card sum-card">
            <div className="label">Commission</div>
            <div className="value">₹{(reports?.commission ?? 0).toFixed(2)}</div>
          </div>
        </section>

        <section className="side-widgets">
          <div className="card">
            <h3>Recent Orders</h3>
            {orders.length ? (
              <table className="mini-table">
                <thead>
                  <tr><th>Order</th><th>Buyer</th><th>Total</th><th>Status</th></tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o._id}>
                      <td>#{String(o._id).slice(-6)}</td>
                      <td>{o.buyer?.fullName || '—'}</td>
                      <td>₹{(o.payment?.amount ?? o.total ?? 0).toFixed(2)}</td>
                      <td>{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div>No recent orders</div>
            )}
          </div>

          <div className="card">
            <h3>Recent Products</h3>
            {products.length ? (
              <ul className="mini-list">
                {products.map((p) => (
                  <li key={p._id}>{p.name} — ₹{p.price}</li>
                ))}
              </ul>
            ) : (
              <div>No products</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
