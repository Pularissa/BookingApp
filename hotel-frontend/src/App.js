import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Hotel from './pages/Hotel';
import Flights from './pages/Flights';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminHotels from './pages/AdminHotels';
import AdminFlights from './pages/AdminFlights';
import './Styles/global.css';

/* Page wrapper — adds top padding for fixed navbar */
const PageWrapper = ({ children, fullBleed = false }) => (
  <div style={{
    paddingTop: fullBleed ? 0 : '72px',
    minHeight: '100vh',
    background: '#0D0B09'
  }}>
    {children}
  </div>
);

function App() {
  return (
    <Router>
      {/* Fixed navbar sits outside route wrappers */}
      <Navbar />

      <Routes>
        {/* Hero pages — manage their own full-height layout */}
        <Route path="/"            element={<PageWrapper fullBleed><Home /></PageWrapper>} />
        <Route path="/auth/login"  element={<PageWrapper fullBleed><Login /></PageWrapper>} />
        <Route path="/login"       element={<PageWrapper fullBleed><Login /></PageWrapper>} />

        {/* Standard pages — padded for navbar */}
        <Route path="/hotel"      element={<PageWrapper><Hotel /></PageWrapper>} />
        <Route path="/flights"     element={<PageWrapper><Flights /></PageWrapper>} />
        <Route path="/dashboard"   element={<PageWrapper><Dashboard /></PageWrapper>} />

        {/* Admin pages */}
        <Route path="/admin/hotel"  element={<PageWrapper><AdminHotels /></PageWrapper>} />
        <Route path="/admin/flights" element={<PageWrapper><AdminFlights /></PageWrapper>} />
      </Routes>
    </Router>
  );
}

export default App;