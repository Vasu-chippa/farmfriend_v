import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { motion } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./FarmerLayout.css";

const FarmerLayout = ({ children }) => {
  return (
    <div className="app-layout farmer-layout">
      <Sidebar />
      <motion.main className="app-main farmer-main" initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} transition={{duration:0.36}}>
        {children}
        <ToastContainer position="top-right" autoClose={2200} />
      </motion.main>
    </div>
  );
};

export default FarmerLayout;
