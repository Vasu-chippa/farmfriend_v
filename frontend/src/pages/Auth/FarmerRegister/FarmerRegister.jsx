import React, { useState } from "react";
import { register } from "../../../services/authService";
import { FaUser, FaEnvelope, FaLock, FaLeaf } from "react-icons/fa";
import wave from "../wave.png";
import bg from "../bg.svg";
import avatar from "../avatar.svg";
import "../Auth.css";

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
        role: "farmer",
      });
      alert(`✅ Farmer registered successfully: ${user.fullName}`);
      window.location.href = "/farmer/login";
    } catch (err) {
      console.error("Registration Error:", err.response?.data || err.message);
      alert("❌ Registration failed: " + (err.response?.data?.message || "Unknown error"));
    }
  };

  return (
    <div className="auth-page">
      <img src={wave} alt="wave" className="wave" />
      <div className="auth-container">
        <div className="auth-image">
          <img src={bg} alt="background" />
        </div>

        <div className="auth-content">
          <form onSubmit={handleSubmit}>
            <img src={avatar} alt="avatar" className="avatar" />
            <h2 className="title">Farmer Registration</h2>

            <div className="floating-label-group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder=" "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                autoComplete="name"
              />
              <label>Full Name</label>
            </div>

            <div className="floating-label-group">
              <FaEnvelope className="icon" />
              <input
                type="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
              <label>Email</label>
            </div>

            <div className="floating-label-group">
              <FaLock className="icon" />
              <input
                type="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />
              <label>Password</label>
            </div>

            {/* Land Size uses existing input styling for distinction */}
            <div className="input-box">
              <label><FaLeaf className="icon" /> Land Size (in acres)</label>
              <input
                type="number"
                placeholder="Enter land size"
                value={landSize}
                onChange={(e) => setLandSize(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FarmerRegister;
