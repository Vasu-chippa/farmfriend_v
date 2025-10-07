import React, { useEffect, useState } from "react";
import API from "../../../api";
import "../../../pages/Agent/Agent.css";
import "./AgentPayments.css";
import { motion } from "framer-motion";
import { fadeInUp } from "../../Agent/animation";

export default function AgentPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data } = await API.get("/agents/payments");
      setPayments(data || []);
    } catch (err) {
      console.error("fetch payments", err);
      alert("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "unpaid":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount || 0);

  return (
    <div className="agent-layout">
      <main className="agent-main">
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Payments</h2>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
              onClick={fetchPayments}
            >
              Refresh
            </button>
          </div>

          {/* Table */}
          <div className="bg-white shadow rounded-2xl overflow-x-auto">
            {loading ? (
              <p className="p-4 text-gray-500">Loading payments...</p>
            ) : payments.length === 0 ? (
              <p className="p-4 text-gray-500">No payments found.</p>
            ) : (
              <table className="min-w-full text-sm text-left border-collapse">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 border-b">Transaction ID</th>
                    <th className="px-4 py-2 border-b">Payment Date</th>
                    <th className="px-4 py-2 border-b">Amount</th>
                    <th className="px-4 py-2 border-b">Order ID</th>
                    <th className="px-4 py-2 border-b">Buyer Details</th>
                    <th className="px-4 py-2 border-b">Status</th>
                    <th className="px-4 py-2 border-b">Method</th>
                    <th className="px-4 py-2 border-b">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p._id}
                      className="hover:bg-gray-50 transition-all border-b"
                    >
                      <td className="px-4 py-2 font-mono text-blue-600">
                        {p.transactionId || "—"}
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {p.paymentDate
                          ? new Date(p.paymentDate).toLocaleDateString()
                          : "—"}
                      </td>
                      <td className="px-4 py-2 font-semibold text-gray-900">
                        {formatAmount(p.paymentAmount)}
                      </td>
                      <td className="px-4 py-2 text-gray-700">{p._id}</td>
                      <td className="px-4 py-2">
                        {p.buyer ? (
                          <div>
                            <p className="font-medium text-gray-900">
                              {p.buyer.fullName || "Unknown"}
                            </p>
                            <p className="text-gray-500 text-xs">
                              {p.buyer.email}
                            </p>
                          </div>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            p.paymentStatus
                          )}`}
                        >
                          {p.paymentStatus || "N/A"}
                        </span>
                      </td>
                      <td className="px-4 py-2 text-gray-700">
                        {p.paymentMethod || "—"}
                      </td>
                      <td className="px-4 py-2 text-gray-500">
                        {p.notes || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
