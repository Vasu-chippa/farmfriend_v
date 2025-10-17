// apps/frontend/src/components/AdminSidebar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./AdminSidebar.css";

const AdminSidebar = () => {
  const location = useLocation();
  const isActive = (path) => (location.pathname === path ? "active" : "");

  // const user = localStorage.getItem("user")
  //   ? JSON.parse(localStorage.getItem("user"))
  //   : { fullName: "Admin" };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">FarmFriend — Admin</div>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>
              📊 Dashboard
            </Link>
          </li>
          <li>
  <Link to="/admin/users/farmers" className={isActive("/admin/users/farmers")}>
    🌾 Farmers
  </Link>
</li>
<li>
  <Link to="/admin/users/buyers" className={isActive("/admin/users/buyers")}>
    🛒 Buyers
  </Link>
</li>
<li>
  <Link to="/admin/users/agents" className={isActive("/admin/users/agents")}>
    🤝 Agents
  </Link>
</li>

          <li>
            <Link to="/admin/orders" className={isActive("/admin/orders")}>
              📦 Orders
            </Link>
          </li>
          <li>
            <Link to="/admin/products" className={isActive("/admin/products")}>
              🌱 Products
            </Link>
          </li>
          <li>
            <Link to="/admin/payments" className={isActive("/admin/payments")}>
              💳 Payments
            </Link>
          </li>
        </ul>
      </nav>

      <div className="sidebar-footer">
        <small>
          Logged as: <strong> ADMIN</strong>
        </small>
      </div>
    </aside>
  );
};

export default AdminSidebar;
