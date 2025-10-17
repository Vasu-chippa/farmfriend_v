import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "./ManageUsers.css";

const ManageBuyers = () => {
  const [buyers, setBuyers] = useState([]);
  const [newBuyer, setNewBuyer] = useState({ fullName: "", email: "", password: "" });

  const fetchBuyers = async () => {
    try {
      const { data } = await API.get("/admins/buyers");
      setBuyers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const handleAdd = async () => {
    try {
     await API.post("/admins/buyers", newBuyer);
      alert("Buyer added successfully!");
      setNewBuyer({ fullName: "", email: "", password: "" });
      fetchBuyers();
    } catch (err) {
      alert("Failed to add buyer");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this buyer?")) return;
    try {
      await API.delete(`/admins/buyers/${id}`);
      fetchBuyers();
    } catch (err) {
      alert("Error deleting buyer");
    }
  };

  return (
    <div className="manage-buyers">
      <AdminSidebar />
      <div className="content">
        <h2>Manage Buyers</h2>

        <div className="add-form">
          <input
            placeholder="Full Name"
            value={newBuyer.fullName}
            onChange={(e) => setNewBuyer({ ...newBuyer, fullName: e.target.value })}
          />
          <input
            placeholder="Email"
            value={newBuyer.email}
            onChange={(e) => setNewBuyer({ ...newBuyer, email: e.target.value })}
          />
          <input
            placeholder="Password"
            value={newBuyer.password}
            onChange={(e) => setNewBuyer({ ...newBuyer, password: e.target.value })}
          />
          <button onClick={handleAdd}>Add Buyer</button>
        </div>

        <table className="buyers-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Joined</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((b, i) => (
              <tr key={b._id}>
                <td>{i + 1}</td>
                <td>{b.fullName}</td>
                <td>{b.email}</td>
                <td>{new Date(b.createdAt).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(b._id)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBuyers;
