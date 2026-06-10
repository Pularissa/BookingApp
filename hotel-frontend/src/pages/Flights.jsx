import React, { useState, useEffect } from 'react';
import { flightService } from '../Services/flightService';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    flightService.getAllFlights()
      .then(data => setFlights(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      <h1>Active Transit Matrix</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Real-time available passenger airliner logs.</p>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Synchronizing flight arrays...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {flights.map((flight) => (
            <div key={flight.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)' }}>
              <div>
                <h3 style={{ color: 'var(--accent-color)' }}>{flight.flightNumber} — {flight.airline}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{flight.departureAirport} → {flight.arrivalAirport}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontWeight: '600' }}>{flight.duration}</p>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Class: {flight.seatType}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)' }}>${flight.price}</p>
                <button className="book-btn" style={{ marginTop: '0.5rem', padding: '0.4rem 1rem', fontSize: '0.85rem' }}>Hold Seat</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Flights;