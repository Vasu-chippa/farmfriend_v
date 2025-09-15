import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./BuyerSidebar.css";

const BuyerSidebar = () => {
  const location = useLocation();
  const [open, setOpen] = useState(true);

  const links = [
    { to: "/buyer/dashboard", icon: "📊", label: "Dashboard" },
    { to: "/buyer/marketplace", icon: "🛒", label: "Marketplace" },
    { to: "/buyer/orders", icon: "📦", label: "My Orders" },
    { to: "/buyer/profile", icon: "👤", label: "Profile" },
  ];

  return (
    <div className={`sidebar-wrapper ${open ? "open" : "closed"}`}>
      {/* Sidebar itself */}
      <div className="buyer-sidebar">
        <h2 className="logo">{open ? "FarmFriend" : "FF"}</h2>

        <ul>
          {links.map((link) => (
            <li
              key={link.to}
              className={location.pathname === link.to ? "active" : ""}
            >
              <Link to={link.to}>
                <span className="icon">{link.icon}</span>
                {open && <span className="text">{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Toggle button (always visible) */}
      <button className="sidebar-toggle" onClick={() => setOpen(!open)}>
        {open ? "<" : ">"}
      </button>
    </div>
  );
};

export default BuyerSidebar;
