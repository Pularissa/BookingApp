import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../Services/authService';
import './../Styles/global.css';

const Login = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = await authService.login(form);
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Authentication rejected. Verify matching system credentials.');
      }
    } catch (err) {
      setError('Network communication failed. Ensure your backend server node is active.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', height: 'calc(100vh - 70px)', background: 'var(--primary-bg)' }}>
      {/* Form Sidebar Panel */}
      <div style={{ width: '45%', background: 'var(--secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '360px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif", color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Access your custom reservation panels.</p>
          
          {error && (
            <p style={{ color: 'var(--danger)', marginBottom: '1.25rem', fontSize: '0.9rem', fontWeight: 500, background: '#FDF2F2', padding: '0.75rem', borderRadius: 'var(--radius-sm)' }}>
              ⚠️ {error}
            </p>
          )}
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>SYSTEM ID</label>
            <input 
              type="text" 
              required 
              style={{ width: '100%', padding: '0.75rem', background: 'var(--section-bg)', border: '1px solid var(--light-brown)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }} 
              value={form.username} // 🌟 FIX: Two-way data binding link
              onChange={e => setForm({...form, username: e.target.value})} 
              disabled={loading}
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600 }}>PASSPHRASE</label>
            <input 
              type="password" 
              required 
              style={{ width: '100%', padding: '0.75rem', background: 'var(--section-bg)', border: '1px solid var(--light-brown)', borderRadius: 'var(--radius-sm)', color: 'var(--text-primary)' }} 
              value={form.password} // 🌟 FIX: Two-way data binding link
              onChange={e => setForm({...form, password: e.target.value})} 
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="book-btn" 
            style={{ width: '100%', padding: '0.8rem', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            disabled={loading}
          >
            {loading ? 'Validating Payload...' : 'Access Core'}
          </button>
        </form>
      </div>
      
      {/* Decorative Visual Split Screen */}
      <div style={{ width: '55%', backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
    </div>
  );
};

export default Login;