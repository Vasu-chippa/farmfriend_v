// apps/frontend/src/pages/Admin/AgentsList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTable.css";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";

const AgentsList = () => {
  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editAgent, setEditAgent] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting
  const [sortField, setSortField] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/agents");
      setAgents(res.data);
    } catch (err) {
      console.error("Error fetching agents:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this agent?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/agents/${id}`);
      fetchAgents();
    } catch (err) {
      console.error("Error deleting agent:", err);
    }
  };

  const handleEdit = (agent) => {
    setEditAgent(agent);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    fetchAgents();
  }, []);

  const filtered = agents.filter((a) =>
    a.fullName?.toLowerCase().includes(search.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="admin-table-container">
      <h2>Agents List</h2>
      <div className="admin-actions">
        <input
          type="text"
          placeholder="Search agent..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button onClick={fetchAgents}>Refresh</button>
        <button className="primary" onClick={() => setShowAdd(true)}>
          + Add Agent
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="admin-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("fullName")}>
                  Name {sortField === "fullName" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("email")}>
                  Email {sortField === "email" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th onClick={() => handleSort("phone")}>
                  Phone {sortField === "phone" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((agent) => (
                <tr key={agent._id}>
                  <td>{agent.fullName}</td>
                  <td>{agent.email}</td>
                  <td>{agent.phone}</td>
                  <td>
                    <button onClick={() => handleEdit(agent)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(agent._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="admin-pagination">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={currentPage === i + 1 ? "active" : ""}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      )}

      {showAdd && (
        <AddModal role="agent" onClose={() => setShowAdd(false)} onSaved={fetchAgents} />
      )}

      {editAgent && (
        <EditModal role="agent" data={editAgent} onClose={() => setEditAgent(null)} onSaved={fetchAgents} />
      )}
    </div>
  );
};

export default AgentsList;
