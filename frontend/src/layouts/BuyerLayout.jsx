// frontend/src/layouts/BuyerLayout.jsx
import React from "react";
import BuyerSidebar from "../components/BuyerSidebar";

const BuyerLayout = ({ children }) => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <BuyerSidebar />

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 min-h-screen p-6">
        {children}
      </div>
    </div>
  );
};

export default BuyerLayout;
