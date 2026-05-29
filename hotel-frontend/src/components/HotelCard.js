import { motion } from "framer-motion";

function HotelCard({ hotel }) {

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="bg-white rounded-3xl overflow-hidden shadow-xl"
    >

      <img
        src={hotel.imageUrl}
        alt={hotel.name}
        className="w-full h-64 object-cover"
      />

      <div className="p-6">

        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{hotel.name}</h2>
          <span className="text-yellow-500">⭐ {hotel.rating}</span>
        </div>

        <p className="text-gray-500 mt-2">{hotel.location}</p>

        <p className="mt-4 text-gray-700">
          {hotel.description}
        </p>

        <div className="mt-6 flex justify-between items-center">

          <span className="text-2xl font-bold text-blue-600">
            ₹ {hotel.pricePerNight}
          </span>

          <button className="bg-blue-600 text-white px-5 py-2 rounded-xl">
            Book Now
          </button>

        </div>

      </div>

    </motion.div>
  );
}

export default HotelCard;