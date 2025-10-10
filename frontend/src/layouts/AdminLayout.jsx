// frontend/src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
//import AdminSidebar from "../pages/Admin/AdminSidebar";
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* <AdminSidebar /> */}
       <Outlet />
      <div className="admin-content">
       
      </div>
    </div>
  );
};

export default AdminLayout;
