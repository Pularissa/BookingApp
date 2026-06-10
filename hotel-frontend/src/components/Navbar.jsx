import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../Services/authService';
import '../Styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/"><h2>APPHUB</h2></Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>Home</Link></li>
        <li><Link to="/hotels" className={`nav-item ${location.pathname === '/hotels' ? 'active' : ''}`}>Hotels</Link></li>
        <li><Link to="/flights" className={`nav-item ${location.pathname === '/flights' ? 'active' : ''}`}>Flights</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard" className={`nav-item ${location.pathname === '/dashboard' ? 'active' : ''}`}>Dashboard</Link></li>
            <li><Link to="/admin" className={`nav-item ${location.pathname.startsWith('/admin') ? 'active' : ''}`}>Admin Portal</Link></li>
            <li><button onClick={handleLogout} className="logout-btn">Sign Out</button></li>
          </>
        ) : (
          <li><Link to="auth/login" className="book-btn">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;