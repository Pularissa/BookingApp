import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authService';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await authService.login(form);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Authentication rejected. Verify matching system credentials.');
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)' }}>
      <div style={{ width: '45%', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Access your custom reservation panels.</p>
          
          {error && <p style={{ color: 'var(--danger-color)', marginBottom: '1rem', fontSize: '0.9rem' }}>{error}</p>}
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>SYSTEM ID</label>
            <input type="text" required style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', borderRadius: 'var(--radius)', color: 'white' }} onChange={e => setForm({...form, username: e.target.value})} />
          </div>
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>PASSPHRASE</label>
            <input type="password" required style={{ width: '100%', padding: '0.75rem', background: 'var(--bg-primary)', border: '1px solid var(--bg-accent)', borderRadius: 'var(--radius)', color: 'white' }} onChange={e => setForm({...form, password: e.target.value})} />
          </div>
          <button type="submit" className="book-btn" style={{ width: '100%', padding: '0.8rem' }}>Access Core</button>
        </form>
      </div>
      <div style={{ width: '55%', backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
    </div>
  );
};

export default Login;