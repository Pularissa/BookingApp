import { useEffect, useState } from "react";
import API from "../services/api";
import HotelCard from "../components/HotelCard";

function Home() {

  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {

    const res = await API.get("/hotels/pagination/0/10");

    setHotels(res.data.content);
  };

  return (
    <div className="p-10">

      <h1 className="text-6xl font-black text-center mb-12">
        Luxury Booking App
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} hotel={hotel} />
        ))}

      </div>

    </div>
  );
}

export default Home;