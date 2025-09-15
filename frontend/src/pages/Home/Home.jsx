// File: apps/frontend/src/pages/Home/Home.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Footer from "../../components/Footer";

import { isAuthenticated, getRole } from "../../utils/auth";

const Home = () => {
  const navigate = useNavigate();
  const authed = isAuthenticated();
  const role = getRole();

  const handleGetStarted = () => {
    if (!authed) {
      // direct guest to farmer login by default (you can change)
      navigate("/farmer/login");
    } else {
      // role-based routing
      if (role === "admin") navigate("/admin/dashboard");
      else if (role === "farmer") navigate("/farmer/dashboard");
      else if (role === "buyer") navigate("/buyer/dashboard");
      else if (role === "agent") navigate("/agent/dashboard");
      else navigate("/");
    }
  };

  return (
    <div className="ff-home-page">
      <header className="hero">
        <div className="hero-inner">
          <div className="hero-content">
            <h1 className="hero-title">FarmFriend</h1>
            <p className="hero-sub">
              Empowering farmers, connecting buyers, and building sustainable
              agriculture. Manage crops, track expenses, sell in the marketplace,
              and analyze profits — all in one place.
            </p>

            <div className="hero-cta">
              <button className="btn-primary" onClick={handleGetStarted}>
                {authed ? "Go to Dashboard" : "Get Started"}
              </button>
              <button
                className="btn-ghost"
                onClick={() => navigate("/farmer/crops")}
              >
                Explore Crops
              </button>
            </div>
          </div>

          <div className="hero-visual" aria-hidden>
            {/* Illustration — replace with local asset if you prefer */}
            <img
              src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80"
              alt="Farmer in field"
            />
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2>What FarmFriend gives you</h2>
          <div className="feature-grid">
            <article className="feature-card">
              <div className="feature-icon">🌾</div>
              <h3>Crops Management</h3>
              <p>
                Select crops for your land, track growth cycles, and get crop
                recommendations by season & soil type.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Expense Tracking</h3>
              <p>
                Track seed, fertilizer and labour costs — visualize spending and
                get monthly summaries.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">🛒</div>
              <h3>Marketplace</h3>
              <p>
                List produce with images & pricing, reach buyers nearby, and
                accept orders securely.
              </p>
            </article>

            <article className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Profit Analysis</h3>
              <p>
                See profit/loss per crop, compare seasons, and improve decisions
                with simple analytics.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="quick-start">
        <div className="container">
          <h2>Ready to grow with FarmFriend?</h2>
          <p>
            Whether you are a farmer, buyer or agent — create an account to
            start managing crops, tracking expenses and selling produce.
          </p>
          <div className="hero-cta">
            <button className="btn-primary" onClick={handleGetStarted}>
              {authed ? "Dashboard" : "Create Account"}
            </button>
            <button
              className="btn-ghost"
              onClick={() => navigate(authed ? "/farmer/profile" : "/farmer/register")}
            >
              {authed ? "View Profile" : "Register"}
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
