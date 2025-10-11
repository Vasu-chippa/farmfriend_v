import React, { useState } from "react";
import API from "../../../api";
import "../Auth.css";  // ✅ common css

function BuyerRegister() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/buyers/register", { fullName, email, password });
      alert("Buyer registered successfully");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <h2>Buyer Registration</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default BuyerRegister;
