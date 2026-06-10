import React from 'react';
import HotelCard from './HotelCard';
import './HotelList.css';

const HotelList = ({ hotels, onBookHotel }) => {
  if (!hotels || hotels.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        No accommodations match your selection criteria.
      </div>
    );
  }

  return (
    <div className="hotel-grid">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} onBook={onBookHotel} />
      ))}
    </div>
  );
};

export default HotelList;