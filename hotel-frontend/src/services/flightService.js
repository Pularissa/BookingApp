import axios from "axios";

const API = "http://localhost:8080/flights";

export const getFlights = async () => {
  const response = await axios.get(API);
  return response.data;
};