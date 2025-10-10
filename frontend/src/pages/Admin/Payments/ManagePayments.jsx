import React, { useEffect, useState } from "react";
import AdminSidebar from "../AdminSidebar";
import API from "../../../api";
import "./ManagePayments.css";

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const { data } = await API.get("/admins/payments");
      setPayments(data);
    } catch (err) {
      console.error("fetch payments", err);
      alert("Failed to fetch payments");
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getColor = (status) => {
    if (status === "paid") return "green";
    if (status === "unpaid") return "red";
    if (status === "refunded") return "orange";
    return "gray";
  };

  return (
    <div className="manage-payments">
      <AdminSidebar />
      <div className="content">
        <h2>Manage Payments</h2>
        <table className="payments-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Order ID</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Method</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td>{p.transactionId}</td>
                <td>{p.orderId}</td>
                <td>{p.buyer?.fullName || ""} ({p.buyer?.email || ""})</td>
                <td>₹{p.paymentAmount}</td>
                <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                <td style={{ color: getColor(p.paymentStatus) }}>{p.paymentStatus}</td>
                <td>{p.paymentMethod}</td>
                <td>{p.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePayments;
