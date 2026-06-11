import React from 'react';
import HotelCard from './HotelCard';


const HotelList = ({ hotel, onBookHotel }) => {
  if (!hotel || hotel.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
        No accommodations match your selection criteria.
      </div>
    );
  }

  return (
    <div className="hotel-grid">
      {hotel.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} onBook={onBookHotel} />
      ))}
    </div>
  );
};

export default HotelList;