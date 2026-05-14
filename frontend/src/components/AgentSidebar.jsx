// apps/frontend/src/components/AgentSidebar.jsx
import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "../utils/auth";
import { NavLink } from "react-router-dom";
import "./AgentSidebar.css";

function AgentSidebar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const u = await fetchCurrentUser();
      if (mounted) setUser(u);
    })();
    return () => (mounted = false);
  }, []);

  return (
    <aside className="agent-sidebar">
      <div className="agent-brand">FarmFriend — Agent</div>
      <nav>
        <ul>
          <li>
            <NavLink to="/agent/dashboard" className={({isActive}) => isActive ? "active" : ""}>📊 Agent Dashboard</NavLink>
          </li>
          <li>
            <NavLink to="/agent/farmers" className={({isActive}) => isActive ? "active" : ""}>👨‍🌾 Farmers</NavLink>
          </li>
          <li>
            <NavLink to="/agent/marketplace" className={({isActive}) => isActive ? "active" : ""}>🛒 Marketplace</NavLink>
          </li>
          <li>
            <NavLink to="/agent/orders" className={({isActive}) => isActive ? "active" : ""}>📦 Orders</NavLink>
          </li>
          <li>
            <NavLink to="/agent/payments" className={({isActive}) => isActive ? "active" : ""}>💰 Payments</NavLink>
          </li>
          

          <li>
            <NavLink to="/agent/profile" className={({isActive}) => isActive ? "active" : ""}>👤 Profile</NavLink>
          </li>
        </ul>
      </nav>
      <div className="sidebar-footer">
        <small>Logged as: <strong>{user ? user.fullName : "Agent"}</strong></small>
      </div>
    </aside>
  );
}

export default AgentSidebar;
