import React, { useState, useEffect } from "react";
import axios from "axios";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";
import "./AdminTable.css"; // table styles

const FarmersList = () => {
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [editFarmer, setEditFarmer] = useState(null);

  // Fetch farmers
  const fetchFarmers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // get token from login
      const res = await axios.get("http://localhost:5000/api/admin/farmers", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFarmers(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching farmers");
    } finally {
      setLoading(false);
    }
  };

  // Delete farmer
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this farmer?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/farmers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchFarmers();
    } catch (err) {
      console.error(err);
      alert("Error deleting farmer");
    }
  };

  useEffect(() => {
    fetchFarmers();
  }, []);

  return (
    <div className="admin-table-page">
      <div className="admin-header">
        <h2>Farmers</h2>
        <button onClick={() => setShowAdd(true)} className="primary-btn">
          + Add Farmer
        </button>
      </div>

      {loading ? (
        <p>Loading farmers...</p>
      ) : farmers.length === 0 ? (
        <p>No farmers found.</p>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Land Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {farmers.map((farmer) => (
              <tr key={farmer._id}>
                <td>{farmer.fullName}</td>
                <td>{farmer.email}</td>
                <td>{farmer.phone}</td>
                <td>{farmer.landSize || "-"} acres</td>
                <td>
                  <button
                    onClick={() => setEditFarmer(farmer)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(farmer._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Add Modal */}
      {showAdd && (
        <AddModal
          role="farmer"
          onClose={() => setShowAdd(false)}
          onAdded={fetchFarmers}
        />
      )}

      {/* Edit Modal */}
      {editFarmer && (
        <EditModal
          role="farmer"
          data={editFarmer}
          onClose={() => setEditFarmer(null)}
          onUpdated={fetchFarmers}
        />
      )}
    </div>
  );
};

export default FarmersList;
