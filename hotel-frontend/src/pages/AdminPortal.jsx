import React, { useState } from 'react';
import { dataService } from '../Services/dataService';

const AdminPortal = () => {
  const [hotel, setHotel] = useState({ name: '', location: '', pricePerNight: '' });
  const [status, setStatus] = useState({ type: '', text: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', text: '' });

    const success = await dataService.addHotel(hotel);
    if (success) {
      setStatus({ type: 'success', text: 'Hotel successfully published inside core data metrics database index.' });
      setHotel({ name: '', location: '', pricePerNight: '' }); // Clean the form inputs
    } else {
      setStatus({ type: 'error', text: 'Authorization rejected or remote endpoint communication fault occurred.' });
    }
  };

  return (
    <div style={{ padding: '2rem', color: 'white', background: 'var(--bg-primary)', minHeight: '100vh' }}>
      <h2>Admin Portal — Inventory Operations</h2>
      <p style={{ color: 'var(--text-muted)' }}>Provision new system locations and pricing frameworks to global consumers.</p>

      {status.text && (
        <p style={{ 
          color: status.type === 'success' ? '#00ffcc' : '#ff4d4d', 
          background: '#111', 
          padding: '1rem', 
          borderRadius: '4px', 
          marginTop: '1rem', 
          maxWidth: '400px' 
        }}>
          {status.text}
        </p>
      )}

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', marginTop: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>HOTEL IDENTITY NAME</label>
          <input 
            type="text" 
            required 
            value={hotel.name}
            style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
            onChange={e => setHotel({...hotel, name: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>GEOGRAPHIC LOCATION (CITY / REGION)</label>
          <input 
            type="text" 
            required 
            value={hotel.location}
            style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
            onChange={e => setHotel({...hotel, location: e.target.value})}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>BASE RATE PER NIGHT ($ USD)</label>
          <input 
            type="number" 
            required 
            value={hotel.pricePerNight}
            style={{ width: '100%', padding: '0.75rem', background: '#1a1a1a', border: '1px solid #333', borderRadius: '4px', color: 'white' }}
            onChange={e => setHotel({...hotel, pricePerNight: e.target.value})}
          />
        </div>

        <button type="submit" className="book-btn" style={{ width: '100%', padding: '0.8rem' }}>Publish Hotel Listing</button>
      </form>
    </div>
  );
};

export default AdminPortal;