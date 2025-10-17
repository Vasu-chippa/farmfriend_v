import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "../Users/ManageUsers.css";

const ManageAgents = () => {
  const [agents, setAgents] = useState([]);
  const [newAgent, setNewAgent] = useState({ fullName: "", email: "", password: "" });

  const fetchAgents = async () => {
    try {
      const { data } = await API.get("/admins/agents");
      setAgents(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const handleAdd = async () => {
    try {
      await API.post("/admins/agents", newAgent);
      alert("Agent added successfully!");
      setNewAgent({ fullName: "", email: "", password: "" });
      fetchAgents();
    } catch (err) {
      alert("Failed to add agent");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    try {
      await API.delete(`/admins/agents/${id}`);
      fetchAgents();
    } catch (err) {
      alert("Error deleting agent");
    }
  };

  return (
    <div className="manage-users">
      <AdminSidebar />
      <div className="content">
        <h2>Manage Agents</h2>

        <div className="add-form">
          <input placeholder="Full Name" value={newAgent.fullName}
            onChange={(e) => setNewAgent({ ...newAgent, fullName: e.target.value })} />
          <input placeholder="Email" value={newAgent.email}
            onChange={(e) => setNewAgent({ ...newAgent, email: e.target.value })} />
          <input placeholder="Password" value={newAgent.password}
            onChange={(e) => setNewAgent({ ...newAgent, password: e.target.value })} />
          <button onClick={handleAdd}>Add Agent</button>
        </div>

        <table className="users-table">
          <thead>
            <tr>
              <th>#</th><th>Name</th><th>Email</th><th>Joined</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a, i) => (
              <tr key={a._id}>
                <td>{i + 1}</td>
                <td>{a.fullName}</td>
                <td>{a.email}</td>
                <td>{new Date(a.createdAt).toLocaleDateString()}</td>
                <td><button onClick={() => handleDelete(a._id)}>❌ Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAgents;
