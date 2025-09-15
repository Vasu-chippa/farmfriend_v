import React from "react";
import "./AdminTable.css";

const AddModal = ({ title, fields, onSave, onClose }) => {
  const [formData, setFormData] = React.useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{title}</h3>
        <form onSubmit={handleSubmit}>
          {fields.map((f) => (
            <input
              key={f.name}
              type={f.type || "text"}
              name={f.name}
              placeholder={f.label}
              onChange={handleChange}
              required
            />
          ))}

          <div className="modal-actions">
            <button type="button" className="cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
