function HotelCard({ hotel }) {
  return (
    <div className="hotel-card">
      <h3>{hotel.name}</h3>

      <p>{hotel.location}</p>

      <p>⭐ {hotel.rating}</p>

      <p>${hotel.pricePerNight}</p>

      <p>{hotel.description}</p>
    </div>
  );
}

export default HotelCard;