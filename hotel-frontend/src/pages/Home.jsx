import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.85), rgba(15, 23, 42, 0.95)), url("https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=1920&q=80")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: 'calc(100vh - 70px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 1rem'
    }}>
      <div>
        <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', letterSpacing: '-1px' }}>
          Travel Anywhere. <span style={{ color: 'var(--accent-color)' }}>Seamless Booking.</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
          Instantly schedule flights and reserve global dynamic corporate spaces through our integrated engine.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/hotels" className="book-btn" style={{ padding: '0.8rem 2rem', fontSize: '1rem' }}>Browse Spaces</Link>
          <Link to="/flights" className="book-btn" style={{ padding: '0.8rem 2rem', fontSize: '1rem', background: 'transparent', border: '1px solid var(--text-main)', color: 'var(--text-main)' }}>Find Flights</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;