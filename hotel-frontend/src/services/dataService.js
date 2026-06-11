// src/Services/dataService.js
const API_URL = "http://localhost:8080/api/bookings";
const HOTELS_URL = "http://localhost:8080/api/hotel";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : ""
  };
};

export const dataService = {
  // Get current user's bookings (paginated)
  getBookings: async (page = 0) => {
    try {
      const response = await fetch(`${API_URL}/my-bookings?page=${page}&size=5`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return await response.json(); // { content: [], totalPages: x, ... }
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Admin: get ALL bookings (paginated)
  getAllBookings: async (page = 0) => {
    try {
      const response = await fetch(`${API_URL}/all?page=${page}&size=10`, {
        headers: getAuthHeaders()
      });
      if (!response.ok) throw new Error("Failed to fetch all bookings");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Create a new booking
  createBooking: async (payload) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Failed to create booking");
      return await response.json();
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  // Admin: add a hotel (used by AdminPortal)
  addHotel: async (hotelData) => {
    try {
      const response = await fetch(HOTELS_URL, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(hotelData)
      });
      return response.ok;
    } catch (err) {
      console.error("Failed to add hotel:", err);
      return false;
    }
  }
};