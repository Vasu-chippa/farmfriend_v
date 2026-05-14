// frontend/src/layouts/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../pages/Admin/AdminSidebar";
import { motion } from 'framer-motion';
import "./AdminLayout.css";

const AdminLayout = () => {
  return (
    <div className="admin-container">
      <AdminSidebar />
      <motion.main className="admin-main" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.36 }}>
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminLayout;
