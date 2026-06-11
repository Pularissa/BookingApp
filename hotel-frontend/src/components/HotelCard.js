import React from 'react';
import '../Styles/global.css'; // Global styles for consistent theming

const HotelCard = ({ hotel, onBook }) => {
  // Graceful visual fallback using curated high-end architecture assets
  const fallbackImage = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80";

  return (
    <div className="hotel-card">
      <div className="hotel-image-wrapper">
        <img 
          src={hotel.imageUrl || fallbackImage} 
          alt={hotel.name} 
          className="hotel-img"
        />
        <div className="hotel-rating-badge">★ {hotel.rating.toFixed(1)}</div>
      </div>
      <div className="hotel-info">
        <h3 className="hotel-name">{hotel.name}</h3>
        <p className="hotel-loc">{hotel.location} • {hotel.address}</p>
        <div className="hotel-footer">
          <div className="hotel-price">
            ${hotel.pricePerNight} <span>/ night</span>
          </div>
          <button className="book-btn" onClick={() => onBook(hotel)}>
            Book Space
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;