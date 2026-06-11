import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { authService } from '../Services/authService';
import '../Styles/global.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const userRole = authService.getUserRole();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';
  const isAdminActive = location.pathname.startsWith('/admin') ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/"><h2>Pula_Sol</h2></Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/" className={`nav-item ${isActive('/')}`}>Home</Link></li>
        <li><Link to="/hotel" className={`nav-item ${isActive('/hotel')}`}>Hotels</Link></li>
        <li><Link to="/flights" className={`nav-item ${isActive('/flights')}`}>Flights</Link></li>

        {isAuthenticated ? (
          <>
            <li><Link to="/dashboard" className={`nav-item ${isActive('/dashboard')}`}>Dashboard</Link></li>

            {/* Admin dropdown — only visible to ADMIN role */}
            {userRole === 'ADMIN' && (
              <>
                <li><Link to="/admin/hotel" className={`nav-item ${isAdminActive}`}> Hotels Admin</Link></li>
                <li><Link to="/admin/flights" className={`nav-item ${isAdminActive}`}> Flights Admin</Link></li>
              </>
            )}

            <li><button onClick={handleLogout} className="logout-btn">Sign Out</button></li>
          </>
        ) : (
          <li><Link to="/login" className="book-btn">Sign In</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;