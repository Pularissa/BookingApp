import React from 'react';
import { authService } from '../Services/authService';

const Dashboard = () => {
  const username = authService.getCurrentUser();

  return (
    <div className="container">
      <div style={{ background: 'var(--bg-secondary)', padding: '2.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Terminal Active</h1>
        <p style={{ color: 'var(--accent-color)' }}>Operator Target: {username}</p>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)' }}>
          <h3>Telemetry & Booking Status</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>No pending reservation approvals currently in memory pipelines.</p>
        </div>
        <div style={{ background: 'var(--bg-secondary)', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--bg-accent)' }}>
          <h3>Active Log Diagnostics</h3>
          <p style={{ color: 'var(--success-color)', marginTop: '0.5rem' }}>● Integration pipes connection stable.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;