import axios from "axios";

const API = "http://localhost:8080/hotels";

export const getHotels = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const addHotel = async (hotel) => {
  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API}/admin/add`,
    hotel,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const deleteHotel = async (id) => {
  const token = localStorage.getItem("token");

  return axios.delete(
    `${API}/admin/delete/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};