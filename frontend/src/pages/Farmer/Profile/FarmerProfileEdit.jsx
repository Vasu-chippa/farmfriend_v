import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FarmerProfile.css';

export default function FarmerProfileEdit() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    age: '',
    gender: '',
    acres: '',
    bio: '',
  });

  useEffect(() => {
    const raw = localStorage.getItem('user');
    if (!raw) return navigate('/farmer/login');
    try {
      const user = JSON.parse(raw);
      setForm({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        age: user.age || '',
        gender: user.gender || '',
        acres: user.acres || '',
        bio: user.bio || '',
      });
    } catch (e) {
      console.error(e);
    }
  }, [navigate]);

  const handle = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    // persist to localStorage for now
    const raw = localStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : {};
    const updated = { ...user, ...form };
    localStorage.setItem('user', JSON.stringify(updated));
    // optional: send to backend if API available (not implemented)
    navigate('/farmer/profile');
  };

  return (
    <div className="ff-edit-root">
      <div className="card" style={{ maxWidth: 900, margin: '12px auto', padding: 18 }}>
        <h2 style={{ marginTop: 0 }}>Edit Profile</h2>
        <form onSubmit={save} className="ff-edit-form">
          <label className="form-field">
            <span className="label-text">Full name</span>
            <input name="fullName" value={form.fullName} onChange={handle} className="input" />
          </label>

          <label className="form-field">
            <span className="label-text">Email</span>
            <input name="email" value={form.email} onChange={handle} className="input" />
          </label>

          <label className="form-field">
            <span className="label-text">Phone</span>
            <input name="phone" value={form.phone} onChange={handle} className="input" />
          </label>

          <label className="form-field full-width">
            <span className="label-text">Address</span>
            <input name="address" value={form.address} onChange={handle} className="input" />
          </label>

          <label className="form-field">
            <span className="label-text">Age</span>
            <input name="age" value={form.age} onChange={handle} className="input" />
          </label>

          <label className="form-field">
            <span className="label-text">Gender</span>
            <select name="gender" value={form.gender} onChange={handle} className="input">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </label>

          <label className="form-field">
            <span className="label-text">Acres</span>
            <input name="acres" value={form.acres} onChange={handle} className="input" />
          </label>

          <label className="form-field full-width">
            <span className="label-text">Biography</span>
            <textarea name="bio" value={form.bio} onChange={handle} className="textarea" />
          </label>

          <div className="form-actions full-width">
            <button type="submit" className="btn-primary">Save</button>
            <button type="button" onClick={() => navigate('/farmer/profile')} className="btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
