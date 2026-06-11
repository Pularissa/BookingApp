import React, { useEffect, useState } from 'react';
import { dataService } from '../Services/dataService';
import { authService } from '../Services/authService';

const Dashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const userRole = authService.getUserRole();
  const username = authService.getCurrentUser();
  const isAdmin = userRole === 'ADMIN';

  useEffect(() => {
    const loadBookings = async () => {
      setLoading(true);
      // Admin fetches ALL bookings; regular user fetches only their own
      const data = isAdmin
        ? await dataService.getAllBookings(page)
        : await dataService.getBookings(page);

      if (data) {
        setBookings(data.content || []);
        setTotalPages(data.totalPages || 0);
      }
      setLoading(false);
    };

    loadBookings();
  }, [page, isAdmin]);

  return (
    <div style={{ padding: '2rem', color: 'white', background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* Header */}
      <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <h2 className="dashboard-title">
          {isAdmin ? '🛡️ Admin Booking Control' : '📋 My Reservations'}
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          {isAdmin
            ? 'Viewing all system-wide bookings across all users.'
            : `Welcome back, ${username}. Your active reservations are below.`}
        </p>

        {/* Quick admin links */}
        {isAdmin && (
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <a href="/admin/hotel" className="book-btn" style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 1.2rem' }}>
              🏨 Manage Hotels
            </a>
            <a href="/admin/flights" className="book-btn" style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '0.5rem 1.2rem', background: 'transparent', border: '1px solid var(--gold)', color: 'var(--gold)' }}>
              ✈️ Manage Flights
            </a>
          </div>
        )}
      </div>

      {/* Bookings Table */}
      {loading ? (
        <p style={{ color: 'var(--text-muted)' }}>Loading reservations...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--bg-accent)', color: 'var(--text-muted)', fontSize: '0.8rem', letterSpacing: '1px' }}>
              <th style={{ padding: '0.75rem' }}>ID</th>
              <th style={{ padding: '0.75rem' }}>HOTEL</th>
              <th style={{ padding: '0.75rem' }}>FLIGHT REF</th>
              <th style={{ padding: '0.75rem' }}>CHECK-IN</th>
              <th style={{ padding: '0.75rem' }}>CHECK-OUT</th>
              <th style={{ padding: '0.75rem' }}>ROOMS</th>
              {isAdmin && <th style={{ padding: '0.75rem' }}>GUEST</th>}
              <th style={{ padding: '0.75rem' }}>TOTAL</th>
              <th style={{ padding: '0.75rem' }}>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length > 0 ? bookings.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                <td style={{ padding: '1rem 0.75rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>#{item.id}</td>
                <td style={{ padding: '1rem 0.75rem' }}>
                  <strong style={{ display: 'block', color: 'white' }}>{item.hotel?.name || '—'}</strong>
                  <small style={{ color: 'var(--text-muted)' }}>{item.hotel?.location || ''}</small>
                </td>
                <td style={{ padding: '1rem 0.75rem', color: 'var(--gold)', fontFamily: 'monospace' }}>
                  {item.flightReference || '—'}
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem' }}>{item.checkInDate || '—'}</td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.85rem' }}>{item.checkoutDate || '—'}</td>
                <td style={{ padding: '1rem 0.75rem' }}>{item.roomsBooked}</td>
                {isAdmin && (
                  <td style={{ padding: '1rem 0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    {item.username || item.customerName || '—'}
                  </td>
                )}
                <td style={{ padding: '1rem 0.75rem', color: 'var(--gold)', fontWeight: '600' }}>
                  {item.totalPaid ? `$${item.totalPaid}` : '—'}
                </td>
                <td style={{ padding: '1rem 0.75rem' }}>
                  <span style={{ color: '#00ffcc', background: 'rgba(0,255,204,0.1)', padding: '0.25rem 0.6rem', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 'bold' }}>
                    ACTIVE
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={isAdmin ? 9 : 8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  {isAdmin ? 'No bookings in the system yet.' : 'No bookings found. Book a hotel to get started!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button
            disabled={page === 0}
            onClick={() => setPage(prev => prev - 1)}
            className="book-btn"
            style={{ padding: '0.5rem 1rem', opacity: page === 0 ? 0.5 : 1, cursor: page === 0 ? 'not-allowed' : 'pointer' }}
          >
            ← Previous
          </button>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            Page {page + 1} of {totalPages}
          </span>
          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(prev => prev + 1)}
            className="book-btn"
            style={{ padding: '0.5rem 1rem', opacity: page >= totalPages - 1 ? 0.5 : 1, cursor: page >= totalPages - 1 ? 'not-allowed' : 'pointer' }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;