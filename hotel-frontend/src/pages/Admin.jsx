import { useState } from "react";
import API from "../services/api";

function Admin() {

  const [hotel, setHotel] = useState({
    name: "",
    location: "",
    address: "",
    rating: "",
    pricePerNight: "",
    availableRooms: "",
    totalRooms: "",
    description: "",
    amenities: "",
    contactNumber: "",
    email: "",
    imageUrl: "",
  });

  const handleChange = (e) => {

    setHotel({
      ...hotel,
      [e.target.name]: e.target.value,
    });
  };

  const addHotel = async () => {

    await API.post("/hotels/admin/add", hotel);

    alert("Hotel Added Successfully");
  };

  return (
    <div className="min-h-screen flex justify-center items-center py-20">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[700px]">

        <h1 className="text-4xl font-black mb-10">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-2 gap-5">
         <input
                    type="text"
                    name="name"
                    placeholder="Hotel Name"
                    onChange={handleChange}
                    className="border p-4 rounded-xl"
                  />

                  <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    onChange={handleChange}
                    className="border p-4 rounded-xl"
                  />

                  <input
                    type="number"
                    name="pricePerNight"
                    placeholder="Price"
                    onChange={handleChange}
                    className="border p-4 rounded-xl"
                  />

                  <input
                    type="text"
                    name="imageUrl"
                    placeholder="Online Image URL"
                    onChange={handleChange}
                    className="border p-4 rounded-xl"
                  />

                </div>

                 <textarea
                          name="description"
                          placeholder="Description"
                          onChange={handleChange}
                          className="w-full border p-4 rounded-xl mt-5 h-40"
                        />

                        <button
                          onClick={addHotel}
                          className="w-full bg-blue-600 text-white py-4 rounded-2xl mt-6 text-xl"
                        >
                          Add Hotel
                        </button>

                      </div>

                    </div>
                  );
                }

                export default Admin;
