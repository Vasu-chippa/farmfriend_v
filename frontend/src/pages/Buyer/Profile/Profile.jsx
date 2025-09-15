import React, { useState } from "react";
import BuyerSidebar from "../../../components/BuyerSidebar";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    company: "AgriCo",
    phone: "9876543210",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    alert("Profile updated (connect API later)");
  };

  return (
    <div className="buyer-layout">
      <BuyerSidebar />
      <div className="buyer-content">
        <h2>👤 Profile</h2>
        <div className="profile-form">
          <label>
            Full Name:
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Company:
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
          </label>
          <button className="btn" onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
