import React, { useState, useEffect } from 'react';
import { hotelService } from '../Services/hotelService';

const AdminHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({ name: '', location: '', address: '', rating: 5.0, pricePerNight: 120.0, availableRooms: 10, totalRooms: 20 });

  useEffect(() => { loadHotels(); }, []);

  const loadHotels = () => {
    hotelService.getAllHotels().then(setHotels).catch(console.error);
  };

  const handleSave = (e) => {
    e.preventDefault();
    hotelService.addHotel(form).then(() => {
      loadHotels();
      alert("Hotel matrix records appended.");
    });
  };

  const handleDelete = (id) => {
  // Explicitly reference window to bypass strict React/linter checks
  if (window.confirm("Confirm row structural drop sequence?")) {
    hotelService.deleteHotel(id)
      .then(() => loadHotels())
      .catch((err) => console.error("Drop sequence failed:", err));
  }
};

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Accommodation Control Array</h2>
      
      <form onSubmit={handleSave} style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
        <input type="text" placeholder="Name" required style={{ padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', color: 'white', borderRadius: '6px' }} onChange={e => setForm({...form, name: e.target.value})} />
        <input type="text" placeholder="Location" required style={{ padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', color: 'white', borderRadius: '6px' }} onChange={e => setForm({...form, location: e.target.value})} />
        <input type="text" placeholder="Address" required style={{ padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', color: 'white', borderRadius: '6px' }} onChange={e => setForm({...form, address: e.target.value})} />
        <input type="number" step="0.1" placeholder="Price" required style={{ padding: '0.6rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', color: 'white', borderRadius: '6px' }} onChange={e => setForm({...form, pricePerNight: parseFloat(e.target.value)})} />
        <button type="submit" className="book-btn" style={{ gridColumn: 'span 2' }}>Inject Structure</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {hotels.map(h => (
          <div key={h.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--bg-accent)' }}>
            <span>{h.name} ({h.location})</span>
            <button onClick={() => handleDelete(h.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger-color)', cursor: 'pointer' }}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminHotels;