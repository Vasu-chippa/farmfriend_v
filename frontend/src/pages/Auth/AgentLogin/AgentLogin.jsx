// apps/frontend/src/pages/Auth/AgentLogin/AgentLogin.jsx
import React, { useState } from "react";
import API from "../../../api"; 
import { useNavigate } from "react-router-dom";
import "../../Auth/Auth.css"; 

function AgentLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // call backend route (API uses baseURL from .env)
      const res = await API.post("/agents/login", { email, password });

      // Expect backend response: { message, user, token } or { token, user }
      const { token, user } = res.data;

      if (!token || !user) {
        console.error("Agent login response missing token/user:", res.data);
        return alert("Login failed: invalid response from server");
      }

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("Agent login response:", res.data);

      // navigate to agent dashboard
      navigate("/agent/dashboard");
    } catch (err) {
      console.error("Agent Login Error:", err.response?.data || err.message);
      alert("Login failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="auth-container">
      <h2>Agent Login</h2>
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

export default AgentLogin;
