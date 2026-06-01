import axios from "axios";

const API = "http://localhost:8080/auth";

export const login = async (user) => {
  const response = await axios.post(`${API}/login`, user);

  localStorage.setItem("token", response.data);

  return response.data;
};