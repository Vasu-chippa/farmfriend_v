import React from "react";
// Navbar intentionally omitted here — App controls when navbar is shown
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
