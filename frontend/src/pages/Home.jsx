import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { isAuthenticated, getRole } from "../../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const role = getRole();

  const handleGetStarted = () => {
    if (!authed) {
      navigate("/farmer/login"); // default login if guest
    } else {
      if (role === "admin") navigate("/admin/dashboard");
      if (role === "farmer") navigate("/farmer/dashboard");
      if (role === "buyer") navigate("/buyer/dashboard");
      if (role === "agent") navigate("/agent/dashboard");
    }
  };

  return (
    <div className="home">
      <div className="hero">
        <div className="hero-overlay">
          <h1>FarmFriend</h1>
          <p>Empowering Farmers, Connecting Buyers & Agents, Building Communities</p>
          <button className="get-started-btn" onClick={handleGetStarted}>
            {authed ? "Go to Dashboard" : "Get Started"}
          </button>
        </div>
      </div>

      <section className="about">
        <h2>Why Farmers Matter</h2>
        <p>
          Farmers are the backbone of society, feeding nations and nurturing the land.
          FarmFriend bridges the gap between farmers, buyers, and agents to create
          fair opportunities and sustainable growth for all.
        </p>
      </section>
    </div>
  );
};

export default Home;
