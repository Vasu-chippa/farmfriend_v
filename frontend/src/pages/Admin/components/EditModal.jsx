import React, { useState } from "react";
import axios from "axios";

const EditModal = ({ role, data, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    fullName: data.fullName || "",
    email: data.email || "",
    phone: data.phone || "",
    landSize: data.landSize || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:5000/api/admin/farmers/${data._id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(`${role} updated successfully`);
      onUpdated(); // refresh list
      onClose();   // close modal
    } catch (err) {
      console.error(err);
      alert(`Error updating ${role}`);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit {role.charAt(0).toUpperCase() + role.slice(1)}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
          />
          {role === "farmer" && (
            <input
              type="number"
              name="landSize"
              placeholder="Land Size (acres)"
              value={formData.landSize}
              onChange={handleChange}
            />
          )}

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
