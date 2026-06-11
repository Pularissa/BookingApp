import API from './api';

export const flightService = {
  // GET flights with pagination support
  // Defaults to page 0 and 10 items per page if nothing is passed
  getAllFlights: async (page = 0, size = 10) => {
    const response = await API.get(`/api/flights?page=${page}&size=${size}`);
    return response.data; // Spring Boot usually returns an object like { content: [...], totalPages: 5, totalElements: 50 }
  },

  // POST create flight (Admin only) — sends JSON body
  createFlight: async (formData) => {
    const response = await API.post('/api/flights', formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  // PUT update flight (Admin only)
  updateFlight: async (id, formData) => {
    const response = await API.put(`/api/flights/${id}`, formData, {
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  },

  // DELETE flight (Admin only)
  deleteFlight: async (id) => {
    const response = await API.delete(`/api/flights/${id}`);
    return response.data;
  }
};