import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { motion } from 'framer-motion';
import "./AgentLayout.css";

const AgentLayout = ({ children }) => {
  return (
    <div className="app-layout agent-layout">
      <Sidebar />
      <motion.main className="app-main agent-main" initial={{opacity:0, y:8}} animate={{opacity:1,y:0}} transition={{duration:0.36}}>
        {children}
      </motion.main>
    </div>
  );
};

export default AgentLayout;
