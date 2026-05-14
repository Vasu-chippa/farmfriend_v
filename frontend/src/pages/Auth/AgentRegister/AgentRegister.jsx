import React, { useState } from "react";
import API from "../../../api";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import wave from "../wave.png";
import bg from "../bg.svg";
import avatar from "../avatar.svg";
import "../Auth.css";

function AgentRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [region, setRegion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/agents/register", { fullName, email, password, phone, region });
      toast.success("Agent registered successfully");
      setTimeout(() => window.location.href = "/agent/login", 1500);
    } catch (err) {
      toast.error("Registration failed: " + (err.response?.data?.message || err.message));
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
            <h2 className="title">Agent Registration</h2>

            <div className="floating-label-group">
              <FaUser className="icon" />
              <input
                type="text"
                placeholder=" "
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
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
              />
              <label>Password</label>
            </div>

            <div className="floating-label-group">
              <FaPhone className="icon" />
              <input
                type="text"
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label>Phone Number</label>
            </div>

            <div className="floating-label-group">
              <FaMapMarkerAlt className="icon" />
              <input
                type="text"
                placeholder=" "
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
              />
              <label>Region/Area</label>
            </div>

            <button type="submit" className="btn">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AgentRegister;
