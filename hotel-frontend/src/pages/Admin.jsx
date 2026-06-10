import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="container" style={{ display: 'flex', gap: '2rem' }}>
      <aside style={{ width: '240px', background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)', height: 'fit-content' }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem', letterSpacing: '0.5px' }}>MANAGEMENT LAYER</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Link to="/admin/hotels" style={{ padding: '0.6rem 1rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--bg-accent)', fontSize: '0.9rem' }}>Modify Accommodations</Link>
        </div>
      </aside>
      <main style={{ flexGrow: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Admin;