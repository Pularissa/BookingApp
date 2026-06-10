import React, { useState, useEffect } from 'react';
import { hotelService } from '../Services/hotelService';
import HotelList from '../components/HotelList';

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    hotelService.getAllHotels()
      .then(data => setHotels(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleBooking = (hotel) => {
    alert(`Initiating secure engine reservation sequence for: ${hotel.name}`);
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '0.5rem' }}>Luxury Accommodations</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Curated list of premium locations verified by global metrics.</p>
      {loading ? <p style={{ color: 'var(--text-muted)' }}>Querying backend...</p> : <HotelList hotels={hotels} onBookHotel={handleBooking} />}
    </div>
  );
};

export default Hotels;