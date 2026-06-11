import React, { useState, useEffect } from 'react';
import { flightService } from '../Services/flightService';

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // 🔢 Pagination State Parameters
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 5; // Change this to show more or fewer flights per page

  useEffect(() => {
    setLoading(true);
    // Pass page parameters down the backend service infrastructure pipeline
    flightService.getAllFlights(currentPage, pageSize)
      .then(data => {
        // Spring Boot Pageable nests arrays inside data.content
        if (data && data.content) {
          setFlights(data.content);
          setTotalPages(data.totalPages);
        } else {
          // Fallback array structure handler
          setFlights(data || []);
          setTotalPages(1);
        }
      })
      .catch(err => console.error("Pagination array tracking dropped: ", err))
      .finally(() => setLoading(false));
  }, [currentPage, pageSize]); // Tracks dependency and updates view on page change

  return (
    <div className="container">
      <h1>Active Transit Matrix</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Real-time available passenger airliner logs.</p>

      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Synchronizing flight arrays...</p>
      ) : flights.length === 0 ? (
        <p style={{ color: 'var(--text-muted)' }}>No active flight vectors mapped in this allocation table.</p>
      ) : (
        <>
          {/* FLIGHT MATRIX PRESENTATION GRID */}
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

          {/* 🎛️ PAGINATION INTERFACE FOOTER */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginTop: '2.5rem', padding: '1rem 0' }}>
            <button 
              className="book-btn"
              disabled={currentPage === 0} 
              onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
              style={{ padding: '0.5rem 1.25rem', opacity: currentPage === 0 ? 0.5 : 1, cursor: currentPage === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous Vector
            </button>
            
            <span style={{ fontSize: '0.95rem', fontWeight: '500', color: 'var(--text-main)' }}>
              Page <span style={{ color: 'var(--accent-color)', fontWeight: '700' }}>{currentPage + 1}</span> of {totalPages || 1}
            </span>

            <button 
              className="book-btn"
              disabled={currentPage >= totalPages - 1} 
              onClick={() => setCurrentPage(prev => prev + 1)}
              style={{ padding: '0.5rem 1.25rem', opacity: currentPage >= totalPages - 1 ? 0.5 : 1, cursor: currentPage >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
            >
              Next Vector →
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Flights;