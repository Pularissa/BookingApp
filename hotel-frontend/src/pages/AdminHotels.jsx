import React, { useState, useEffect } from 'react';
import { hotelService } from '../Services/hotelService';
import './../Styles/global.css';

const labelStyle = { 
  display: 'block', 
  fontSize: '0.7rem', 
  color: 'var(--text-muted)', 
  marginBottom: '0.4rem', 
  letterSpacing: '1px' 
};

const initialFormState = {
  name: '',
  location: '',
  address: '',
  rating: 5.0,
  pricePerNight: 120,
  availableRooms: 10,
  totalRooms: 20
};

const AdminHotels = () => {
  // 🚀 FIXED: State name aligned uniformly as 'hotels' to clear rendering issues
  const [hotels, setHotels] = useState([]);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(initialFormState);

  useEffect(() => {
    loadHotels();
  }, []);

  const loadHotels = async () => {
    try {
      const data = await hotelService.getAllHotels();
      // 🚀 FIXED: Safely read from .content if backend returns a paginated Page wrapper object
      const cleanHotelsArray = Array.isArray(data) ? data : (data.content || []);
      setHotels(cleanHotelsArray);
    } catch (err) {
      console.error("Failed to load hotels:", err);
      setStatus({ type: 'error', text: '❌ Failed to fetch live hotel catalog blocks from the server.' });
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    try {
      if (isEditing) {
        // 🌟 UPDATE OPERATION
        const success = await hotelService.updateHotel(editId, form);
        if (success) {
          setStatus({ type: 'success', text: '✅ Hotel inventory parameters updated successfully.' });
          resetForm();
          loadHotels();
        } else {
          setStatus({ type: 'error', text: '❌ Failed to update hotel records. Check configuration.' });
        }
      } else {
        // 🌟 CREATE OPERATION
        const success = await hotelService.addHotel(form);
        if (success) {
          setStatus({ type: 'success', text: '✅ Hotel successfully published to system core.' });
          resetForm();
          loadHotels();
        } else {
          setStatus({ type: 'error', text: '❌ Failed to add hotel. Check Admin permissions.' });
        }
      }
    } catch (err) {
      setStatus({ type: 'error', text: `❌ Network Error: ${err.message}` });
    }
  };

  const handleEditClick = (hotelItem) => {
    setIsEditing(true);
    setEditId(hotelItem.id);
    setForm({
      name: hotelItem.name || '',
      location: hotelItem.location || '',
      address: hotelItem.address || '',
      rating: hotelItem.rating || 5.0,
      pricePerNight: hotelItem.pricePerNight || 120,
      availableRooms: hotelItem.availableRooms !== undefined ? hotelItem.availableRooms : (hotelItem.totalRooms || 10),
      totalRooms: hotelItem.totalRooms || 20
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this hotel from inventory?')) return;
    try {
      const success = await hotelService.deleteHotel(id);
      if (success) {
        if (isEditing && editId === id) resetForm();
        loadHotels();
        setStatus({ type: 'success', text: '✅ Hotel listing removed from database system.' });
      } else {
        setStatus({ type: 'error', text: '❌ Dropping listing rejected. Verify credentials.' });
      }
    } catch (err) {
      setStatus({ type: 'error', text: `❌ Delete Action Dropped: ${err.message}` });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setForm(initialFormState);
  };

  return (
    <div style={{ padding: '2rem', color: 'white', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <h2 className="dashboard-title">Hotel Management Operations</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Provision new locations or manage existing inventory.</p>

      {status.text && (
        <div style={{ color: status.type === 'success' ? '#00ffcc' : '#ff4d4d', background: '#111', padding: '1rem', borderRadius: '4px', marginBottom: '1.5rem', border: '1px solid #333' }}>
          {status.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* Left Side: Form Interface */}
        <div>
          <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              {isEditing ? '✏️ Modify Hotel Listing Details' : '🏢 Register New Hotel'}
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>NAME</label>
                <input className="form-input" type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>CITY</label>
                <input className="form-input" type="text" required value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
              </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
              <label style={labelStyle}>FULL ADDRESS</label>
              <input className="form-input" type="text" required value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>PRICE ($)</label>
                <input className="form-input" type="number" min="0" value={form.pricePerNight} onChange={e => setForm({...form, pricePerNight: Number(e.target.value)})} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>RATING</label>
                <input className="form-input" type="number" step="0.1" min="1" max="5" value={form.rating} onChange={e => setForm({...form, rating: Number(e.target.value)})} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>ROOMS</label>
                <input className="form-input" type="number" min="1" value={form.totalRooms} onChange={e => setForm({...form, totalRooms: Number(e.target.value), availableRooms: Number(e.target.value)})} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="book-btn" style={{ flex: 1, padding: '0.8rem' }}>
                {isEditing ? 'Save Metrics' : 'Publish Listing'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '0.8rem 1.2rem', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right Side: Current Inventory View */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Current Inventory ({hotels.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {hotels.length > 0 ? hotels.map((h) => (
              <div key={h.id} style={{ background: '#111', border: '1px solid #222', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, color: 'white' }}>{h.name}</h4>
                  <small style={{ color: 'var(--text-muted)' }}>{h.location} — ${h.pricePerNight}/night</small>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => handleEditClick(h)} 
                    style={{ background: 'transparent', border: '1px solid #00ffcc', color: '#00ffcc', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(h.id)} 
                    style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer' }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )) : <p style={{ color: 'var(--text-muted)' }}>No hotels indexed in database.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHotels;