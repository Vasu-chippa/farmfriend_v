// apps/frontend/src/pages/Admin/BuyersList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AdminTable.css";
import AddModal from "./components/AddModal";
import EditModal from "./components/EditModal";

const BuyersList = () => {
  const [buyers, setBuyers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editBuyer, setEditBuyer] = useState(null);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Sorting
  const [sortField, setSortField] = useState("fullName");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchBuyers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/buyers");
      setBuyers(res.data);
    } catch (err) {
      console.error("Error fetching buyers:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this buyer?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/buyers/${id}`);
      fetchBuyers();
    } catch (err) {
      console.error("Error deleting buyer:", err);
    }
  };

  const handleEdit = (buyer) => {
    setEditBuyer(buyer);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  const filtered = buyers.filter((b) =>
    b.fullName?.toLowerCase().includes(search.toLowerCase())
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
      <h2>Buyers List</h2>
      <div className="admin-actions">
        <input
          type="text"
          placeholder="Search buyer..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button onClick={fetchBuyers}>Refresh</button>
        <button className="primary" onClick={() => setShowAdd(true)}>
          + Add Buyer
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
                <th onClick={() => handleSort("company")}>
                  Company {sortField === "company" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((buyer) => (
                <tr key={buyer._id}>
                  <td>{buyer.fullName}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.company}</td>
                  <td>
                    <button onClick={() => handleEdit(buyer)}>Edit</button>
                    <button className="danger" onClick={() => handleDelete(buyer._id)}>Delete</button>
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
        <AddModal role="buyer" onClose={() => setShowAdd(false)} onSaved={fetchBuyers} />
      )}

      {editBuyer && (
        <EditModal role="buyer" data={editBuyer} onClose={() => setEditBuyer(null)} onSaved={fetchBuyers} />
      )}
    </div>
  );
};

export default BuyersList;
