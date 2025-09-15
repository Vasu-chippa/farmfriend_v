import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaTractor, FaUsers, FaUserTie } from "react-icons/fa"; 
import "./AdminLayout.css";

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <h2 className="sidebar-brand">FarmFriend</h2>
        <nav className="sidebar-nav">
          <Link
            to="/admin/dashboard"
            className={`sidebar-link ${
              location.pathname.includes("/admin/dashboard") ? "active" : ""
            }`}
          >
            <FaTachometerAlt className="sidebar-icon" />
            Dashboard
          </Link>

          <Link
            to="/admin/farmers"
            className={`sidebar-link ${
              location.pathname.includes("/admin/farmers") ? "active" : ""
            }`}
          >
            <FaTractor className="sidebar-icon" />
            Farmers
          </Link>

          <Link
            to="/admin/buyers"
            className={`sidebar-link ${
              location.pathname.includes("/admin/buyers") ? "active" : ""
            }`}
          >
            <FaUsers className="sidebar-icon" />
            Buyers
          </Link>

          <Link
            to="/admin/agents"
            className={`sidebar-link ${
              location.pathname.includes("/admin/agents") ? "active" : ""
            }`}
          >
            <FaUserTie className="sidebar-icon" />
            Agents
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
