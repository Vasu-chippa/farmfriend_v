// frontend/src/layouts/BuyerLayout.jsx
import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { motion } from 'framer-motion';

const BuyerLayout = ({ children }) => {
  return (
    <div className="app-layout buyer-layout">
      <Sidebar />

      <motion.div className="app-main" initial={{opacity:0, y:6}} animate={{opacity:1,y:0}} transition={{duration:0.36}}>
        {children}
      </motion.div>
    </div>
  );
};

export default BuyerLayout;
