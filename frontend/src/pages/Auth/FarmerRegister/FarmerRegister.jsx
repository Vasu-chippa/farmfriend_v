import React, { useState } from "react";
import { register } from "../../../services/authService";  // ✅ use authService
import "../Auth.css";  // common styles

function FarmerRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [landSize, setLandSize] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await register({
        fullName,
        email,
        password,
        landSize,
        role: "farmer",   // ✅ required so backend knows it's a farmer
      });

      alert(`✅ Farmer registered successfully: ${user.fullName}`);
      console.log("Registered Farmer:", user);

      // redirect to login or dashboard
      window.location.href = "/farmer/login";
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
       alert("❌ Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }

  };

  return (
    <div className="auth-container">
      <h2>Farmer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
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
        <input
          type="number"
          placeholder="Land Size (in acres)"
          value={landSize}
          onChange={(e) => setLandSize(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default FarmerRegister;
