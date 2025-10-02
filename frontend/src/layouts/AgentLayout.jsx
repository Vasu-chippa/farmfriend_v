import React from "react";
import AgentSidebar from "../components/AgentSidebar";
import "./AgentLayout.css";

const AgentLayout = ({ children }) => {
  return (
    <div className="agent-layout">
      <AgentSidebar />
      <main className="agent-main">
        {children}   {/* instead of <Outlet /> */}
      </main>
    </div>
  );
};

export default AgentLayout;
