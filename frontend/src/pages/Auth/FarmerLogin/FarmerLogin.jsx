import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../../services/authService"; 
import "../Auth.css";

function FarmerLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // ✅ hook for navigation

 const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const { user } = await login({ email, password });
    alert(`✅ Welcome back, ${user.fullName}!`);

    if (user.role === "farmer") {
      navigate("/farmer/dashboard");
    } else if (user.role === "buyer") {
      navigate("/buyer/dashboard");
    } else if (user.role === "agent") {
      navigate("/agent/dashboard");
    } else if (user.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  } catch (err) {
    console.error("Login Error:", err.response?.data || err.message);
    alert("❌ Login failed: " + (err.response?.data?.message || "Unknown error"));
  }
};



  return (
    <div className="auth-container">
      <h2>Farmer Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default FarmerLogin;
