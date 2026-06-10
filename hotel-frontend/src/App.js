import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotels from './pages/Hotels';
import Flights from './pages/Flights';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import AdminHotels from './pages/AdminHotels';
import { authService } from './Services/authService';
import './Styles/global.css';

const ProtectedRoute = ({ children }) => {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/flights" element={<Flights />} />
        <Route path="auth/login" element={<Login />} />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/admin" element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/hotels" />} />
          <Route path="hotels" element={<AdminHotels />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;