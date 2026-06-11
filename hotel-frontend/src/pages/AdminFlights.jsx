import React, { useState, useEffect } from 'react';
import { flightService } from '../Services/flightService';
import './../Styles/global.css';

const emptyForm = {
  airline: '',
  flightNumber: '',
  departureAirport: '',
  arrivalAirport: '',
  departureTime: '',
  arrivalTime: '',
  duration: '',
  price: 0,
  availableSeats: 100,
  totalSeats: 180,
  status: 'SCHEDULED',
  seatType: 'Economy'
};

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  color: 'var(--text-muted)',
  marginBottom: '0.4rem',
  letterSpacing: '1px'
};

const AdminFlights = () => {
  const [flights, setFlights] = useState([]);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    loadFlights();
  }, []);

  const loadFlights = async () => {
    try {
      const data = await flightService.getAllFlights();
      // 🚀 FIXED: Safely read from .content if backend returns a paginated Page wrapper object
      const cleanFlightsArray = Array.isArray(data) ? data : (data.content || []);
      setFlights(cleanFlightsArray);
    } catch (err) {
      console.error("Failed to load flights:", err);
      setStatus({ type: 'error', text: '❌ Failed to load live flight matrices from server.' });
    }
  };

  // 🚀 FIXED: Retain true ISO timestamp values without stripping indicators to pass Jackson parsers cleanly
  const toISOString = (val) => val ? new Date(val).toISOString() : null;

  const handleSave = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    const payload = {
      ...form,
      price: Number(form.price),
      availableSeats: Number(form.availableSeats),
      totalSeats: Number(form.totalSeats),
      departureTime: toISOString(form.departureTime),
      arrivalTime: toISOString(form.arrivalTime)
    };

    try {
      if (isEditing) {
        await flightService.updateFlight(editId, payload);
        setStatus({ type: 'success', text: '✅ Flight updated successfully in database.' });
      } else {
        await flightService.createFlight(payload);
        setStatus({ type: 'success', text: '✅ Flight published to database.' });
      }
      resetForm();
      loadFlights();
    } catch (err) {
      setStatus({ type: 'error', text: `❌ Error: ${err.message}` });
    }
  };

  const handleEditClick = (flight) => {
    setIsEditing(true);
    setEditId(flight.id);
    // Convert ISO timestamp layout safely to match datetime-local inputs (yyyy-MM-ddThh:mm)
    const toLocal = (iso) => iso ? iso.substring(0, 16) : '';
    setForm({
      airline: flight.airline || '',
      flightNumber: flight.flightNumber || '',
      departureAirport: flight.departureAirport || '',
      arrivalAirport: flight.arrivalAirport || '',
      departureTime: toLocal(flight.departureTime),
      arrivalTime: toLocal(flight.arrivalTime),
      duration: flight.duration || '',
      price: flight.price || 0,
      availableSeats: flight.availableSeats || 100,
      totalSeats: flight.totalSeats || 180,
      status: flight.status || 'SCHEDULED',
      seatType: flight.seatType || 'Economy'
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently remove this flight from the database?')) return;
    try {
      await flightService.deleteFlight(id);
      if (isEditing && editId === id) resetForm();
      loadFlights();
      setStatus({ type: 'success', text: '✅ Flight deleted successfully.' });
    } catch (err) {
      setStatus({ type: 'error', text: `❌ Delete failed: ${err.message}` });
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setEditId(null);
    setForm(emptyForm);
  };

  const statusColor = (s) => {
    if (s === 'SCHEDULED') return '#00ffcc';
    if (s === 'DEPARTED') return '#f59e0b';
    if (s === 'ARRIVED') return '#60a5fa';
    if (s === 'CANCELLED') return '#ff4d4d';
    return '#aaa';
  };

  return (
    <div style={{ padding: '2rem', color: 'white', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <h2 className="dashboard-title"> Flight Management Operations</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Schedule, update, and remove flight records. Status is auto-updated by the DB scheduler every 2 minutes.
      </p>

      {status.text && (
        <div style={{
          color: status.type === 'success' ? '#00ffcc' : '#ff4d4d',
          background: '#111',
          padding: '1rem',
          borderRadius: '4px',
          marginBottom: '1.5rem',
          border: '1px solid #333'
        }}>
          {status.text}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
        {/* LEFT: Form */}
        <div>
          <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '2rem', borderRadius: '8px' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
              {isEditing ? '✏️ Edit Flight Record' : '🛫 Register New Flight'}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>AIRLINE</label>
                <input className="form-input" type="text" required value={form.airline}
                  onChange={e => setForm({ ...form, airline: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>FLIGHT NUMBER</label>
                <input className="form-input" type="text" required value={form.flightNumber}
                  onChange={e => setForm({ ...form, flightNumber: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>DEPARTURE AIRPORT</label>
                <input className="form-input" type="text" required value={form.departureAirport}
                  onChange={e => setForm({ ...form, departureAirport: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>ARRIVAL AIRPORT</label>
                <input className="form-input" type="text" required value={form.arrivalAirport}
                  onChange={e => setForm({ ...form, arrivalAirport: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>DEPARTURE TIME</label>
                <input className="form-input" type="datetime-local" required value={form.departureTime}
                  onChange={e => setForm({ ...form, departureTime: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>ARRIVAL TIME</label>
                <input className="form-input" type="datetime-local" required value={form.arrivalTime}
                  onChange={e => setForm({ ...form, arrivalTime: e.target.value })} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>DURATION</label>
                <input className="form-input" type="text" placeholder="e.g. 2h 30m" value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>PRICE ($)</label>
                <input className="form-input" type="number" min="0" value={form.price}
                  onChange={e => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>SEAT TYPE</label>
                <select className="form-input" value={form.seatType}
                  onChange={e => setForm({ ...form, seatType: e.target.value })}>
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
              <div className="form-group">
                <label style={labelStyle}>AVAILABLE SEATS</label>
                <input className="form-input" type="number" min="0" value={form.availableSeats}
                  onChange={e => setForm({ ...form, availableSeats: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>TOTAL SEATS</label>
                <input className="form-input" type="number" min="1" value={form.totalSeats}
                  onChange={e => setForm({ ...form, totalSeats: e.target.value })} />
              </div>
              <div className="form-group">
                <label style={labelStyle}>STATUS</label>
                <select className="form-input" value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option>SCHEDULED</option>
                  <option>DEPARTED</option>
                  <option>ARRIVED</option>
                  <option>CANCELLED</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button type="submit" className="book-btn" style={{ flex: 1, padding: '0.8rem' }}>
                {isEditing ? '💾 Save Changes' : '🚀 Publish Flight'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm}
                  style={{ background: 'transparent', border: '1px solid #555', color: '#aaa', padding: '0.8rem 1.2rem', borderRadius: '4px', cursor: 'pointer' }}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* RIGHT: Flight List */}
        <div>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Live Flight Database ({flights.length} records)
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '70vh', overflowY: 'auto' }}>
            {flights.length > 0 ? flights.map((f) => (
              <div key={f.id} style={{
                background: '#111', border: '1px solid #222', padding: '1rem',
                borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
              }}>
                <div>
                  <h4 style={{ margin: 0, color: 'white' }}>{f.flightNumber} — {f.airline}</h4>
                  <small style={{ color: 'var(--text-muted)' }}>
                    {f.departureAirport} → {f.arrivalAirport} | ${f.price} | {f.seatType}
                  </small>
                  <br />
                  <span style={{
                    color: statusColor(f.status), fontSize: '0.75rem',
                    background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '20px'
                  }}>
                    ● {f.status}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleEditClick(f)}
                    style={{ background: 'transparent', border: '1px solid #00ffcc', color: '#00ffcc', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(f.id)}
                    style={{ background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '0.4rem 0.8rem', borderRadius: '4px', cursor: 'pointer', fontSize: '0.85rem' }}>
                    Delete
                  </button>
                </div>
              </div>
            )) : (
              <p style={{ color: 'var(--text-muted)' }}>No flights in database. Add one above.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFlights;