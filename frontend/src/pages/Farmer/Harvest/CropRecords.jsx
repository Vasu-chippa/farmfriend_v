import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRecords,
  addRecord,
  updateRecord,
  deleteRecord,
} from "../../../services/cropRecordService";
import API from "../../../api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CropRecords.css";
import "./Harvest.css";


const CropRecords = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [crop, setCrop] = useState(null);
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingAcres, setEditingAcres] = useState(false);
  const [cropAcres, setCropAcres] = useState(0);
  const [formData, setFormData] = useState({
    cropId: cropId || "",
    date: "",
    cost: "",
    quantity: "",
    description: "",
    fertilizer: "",
    seeds: "",
    workers: "",
    transportCost: "",
  });

  // fetch crop details
  const fetchCrop = useCallback(async () => {
    if (!cropId) return;
    try {
      const res = await API.get(`/crops/${cropId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCrop(res.data);
      setCropAcres(res.data.acres || 0);
    } catch (err) {
      try {
        const res2 = await API.get(`/harvest/${cropId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCrop(res2.data);
          setCropAcres(res2.data.acres || 0);
      } catch (err2) {
        console.error("Error fetching crop (both endpoints)", err, err2);
        setCrop(null);
      }
    }
  }, [cropId, token]);

  // fetch records list
  const fetchRecords = useCallback(async () => {
    if (!cropId) return;
    try {
      const data = await getRecords(cropId);
      setRecords(data);
    } catch (err) {
      console.error("Failed to fetch records:", err);
      toast.error("Failed to fetch records");
    }
  }, [cropId]);

  // init
  useEffect(() => {
    fetchCrop();
    fetchRecords();
  }, [fetchCrop, fetchRecords]);

  const summary = useMemo(() => {
    const totalCost = records.reduce((s, r) => s + Number(r.cost || 0), 0);
    const totalQuantity = records.reduce((s, r) => s + Number(r.quantity || 0), 0);
    const totalAcres = records.reduce((s, r) => s + Number(r.acres || 0), 0);
    const numRecords = records.length;
    const latestDate = records.length ? new Date(records[0].date) : null;
    const earliestDate = records.length ? new Date(records[records.length - 1].date) : null;
    return { totalCost, totalQuantity, totalAcres, numRecords, latestDate, earliestDate };
  }, [records]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.date || !formData.cost || !formData.quantity) {
      toast.error("Please fill Date, Cost and Quantity");
      return;
    }

    if (saving) return; // prevent duplicate submissions
    setSaving(true);
    try {
      if (editingRecord) {
        const payload = { ...formData, cropId };
        // remove acres from record payload (acres is managed separately)
        if (payload.acres !== undefined) delete payload.acres;
        const updated = await updateRecord(editingRecord._id, payload);
        setRecords((prev) => prev.map((r) => (r._id === updated._id ? updated : r)));
        toast.success("Record updated", { toastId: 'record-updated' });
        setEditingRecord(null);
      } else {
        const payload = { ...formData, cropId };
        if (payload.acres !== undefined) delete payload.acres;
        const created = await addRecord(payload);
        setRecords((prev) => [created, ...prev]);
        toast.success("Record saved", { toastId: 'record-saved' });
      }
      setShowForm(false);
      setShowAdvanced(false);
      setFormData({
        cropId,
        date: "",
        cost: "",
        quantity: "",
        description: "",
        fertilizer: "",
        seeds: "",
        workers: "",
        transportCost: "",
      });
    } catch (err) {
      console.error("Save record error:", err);
      const msg = err?.response?.data?.error || "Failed to save record";
      toast.error(msg, { toastId: 'record-save-error' });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
    setFormData({
      cropId,
      date: record.date ? new Date(record.date).toISOString().slice(0, 10) : "",
      cost: record.cost || "",
      quantity: record.quantity || "",
      description: record.description || "",
      fertilizer: record.fertilizer || "",
      seeds: record.seeds || "",
      workers: record.workers || "",
      transportCost: record.transportCost || "",
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;
    try {
      await deleteRecord(id);
      setRecords((prev) => prev.filter((r) => r._id !== id));
      toast.success("Record deleted");
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete record");
    }
  };

  return (
    <div className="crop-records-page">
      <div className="left-panel">
        <button onClick={() => navigate(-1)} className="back-btn">
          ← Back
        </button>

        {crop ? (
          <div className="crop-card">
            <img
              src={
                crop?.image
                  ? `${process.env.PUBLIC_URL}/cropimages/${crop.image}`
                  : `${process.env.PUBLIC_URL}/cropimages/default.jpeg`
              }
              alt={crop?.name || "crop"}
              className="crop-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `${process.env.PUBLIC_URL}/cropimages/default.jpeg`;
              }}
            />

            <div className="crop-info">
              <h2>🌱 {crop.name}</h2>
              <p><b>Category:</b> {crop.category || "General"}</p>
              <p><b>Season:</b> {crop.season || "N/A"}</p>
              <p><b>Sowing Time:</b> {crop.sowingTime || crop.sowing || "N/A"}</p>
              <p><b>Price:</b> ₹{crop.price || "N/A"}/kg</p>
              <p><b>Quantity:</b> {crop.quantity || "N/A"} kg</p>
              <p><b>Quality:</b> {crop.quality || (crop.isOrganic ? "Organic" : "Standard")}</p>
            </div>
          </div>
        ) : (
          <p>Loading crop...</p>
        )}
        {/* Summary / Started details box */}
        <div className="crop-stats">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>📊 Started Details</h3>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {!editingAcres ? (
              <div style={{ fontSize: 14, color: '#333' }}>Acres: <strong>{cropAcres || '-'}</strong></div>
            ) : (
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input type="number" value={cropAcres} onChange={(e) => setCropAcres(e.target.value)} style={{ width: 100, padding: '6px 8px', borderRadius: 6 }} />
                <button className="save-btn" onClick={async () => {
                  try {
                    await API.put(`/crops/${cropId}`, { acres: Number(cropAcres) }, { headers: { Authorization: `Bearer ${token}` } });
                    toast.success('Acres updated', { toastId: 'acres-updated' });
                    // refresh crop and records
                    await fetchCrop();
                    setEditingAcres(false);
                    window.dispatchEvent(new Event('harvestUpdated'));
                  } catch (err) {
                    console.error('Failed to update acres', err);
                    toast.error('Failed to update acres');
                  }
                }}>Save</button>
                <button className="icon-btn delete" onClick={() => { setEditingAcres(false); setCropAcres(crop?.acres || 0); }}>✖</button>
              </div>
            )}
            {!editingAcres && (<button className="add-btn" onClick={() => setEditingAcres(true)}>Edit Acres</button>)}
          </div>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="label">Started</div>
              <div className="value">{summary.earliestDate ? summary.earliestDate.toLocaleDateString() : (crop?.dateAdded ? new Date(crop.dateAdded).toLocaleDateString() : '—')}</div>
            </div>

            <div className="stat-item">
              <div className="label">Money Spent</div>
              <div className="value">₹{summary.totalCost}</div>
            </div>

            <div className="stat-item">
              <div className="label">Latest Record</div>
              <div className="value">{summary.latestDate ? summary.latestDate.toLocaleDateString() : '—'}</div>
            </div>

            <div className="stat-item">
              <div className="label">Total Quantity</div>
              <div className="value">{summary.totalQuantity} kg</div>
            </div>

            {/* <div className="stat-item">
              <div className="label">Acres (sum)</div>
              <div className="value">{summary.totalAcres || '-'}</div>
            </div> */}

            <div className="stat-item">
              <div className="label">Records</div>
              <div className="value">{summary.numRecords}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="records-header">
          <h3>📑 Records</h3>
          <button
            onClick={() => {
              setShowForm((s) => !s);
              setEditingRecord(null);
            }}
            className="add-btn"
          >
            {showForm ? "Cancel" : "➕ Add Record"}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="record-form">
            <div className="form-row">
              <label>Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label>Cost (₹)</label>
              <input type="number" name="cost" value={formData.cost} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <label>Quantity (kg)</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
            </div>
            <div className="form-row full">
              <label>Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} />
            </div>
            <button type="button" className="toggle-btn" onClick={() => setShowAdvanced((s) => !s)}>
              {showAdvanced ? "Hide Advanced ▲" : "Show Advanced ▼"}
            </button>
            {showAdvanced && (
              <div className="advanced-fields">
                <div className="form-row">
                  <label>Seeds Used (kg)</label>
                  <input type="number" name="seeds" value={formData.seeds} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label>Workers Count</label>
                  <input type="number" name="workers" value={formData.workers} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label>Transport Cost (₹)</label>
                  <input type="number" name="transportCost" value={formData.transportCost} onChange={handleChange} />
                </div>
                <div className="form-row">
                  <label>Fertilizer Used</label>
                  <input type="text" name="fertilizer" value={formData.fertilizer} onChange={handleChange} />
                </div>
              </div>
            )}
            <div className="form-actions">
              <button type="submit" className="save-btn">
                {editingRecord ? "Update Record" : "Save Record"}
              </button>
            </div>
          </form>
        )}

        {!showForm && (
          <>
            {records && records.length > 0 ? (
              <table className="records-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Cost (₹)</th>
                    <th>Quantity (kg)</th>
                    <th>Acres</th>
                    <th>Description</th>
                    <th>Seeds</th>
                    <th>Workers</th>
                    <th>Transport (₹)</th>
                    <th>Fertilizer</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r._id}>
                      <td>{new Date(r.date).toLocaleDateString()}</td>
                      <td>{r.cost}</td>
                      <td>{r.quantity}</td>
                      <td>{r.acres ?? '-'}</td>
                      <td className="desc-cell">{r.description}</td>
                      <td>{r.seeds ?? "-"}</td>
                      <td>{r.workers ?? "-"}</td>
                      <td>{r.transportCost ?? "-"}</td>
                      <td>{r.fertilizer ?? "-"}</td>
                      <td>
                        <button className="icon-btn edit" onClick={() => handleEdit(r)}>✏️</button>
                        <button className="icon-btn delete" onClick={() => handleDelete(r._id)}>🗑️</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="empty">⚠ No records yet</p>
            )}
          </>
        )}
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};

export default CropRecords;
