import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import HotelCard from "../components/HotelCard";
import { getHotels } from "../services/hotelService";

function Hotels() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    getHotels().then(setHotels);
  }, []);

  return (
    <>
      <Navbar />

      <div className="hotel-grid">
        {hotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
          />
        ))}
      </div>
    </>
  );
}

export default Hotels;