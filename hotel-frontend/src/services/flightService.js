import API from './api';

export const flightService = {
  getAllFlights: async () => {
    const response = await API.get('/flights/flights');
    return response.data;
  },
  createFlight: async (formData) => {
    const response = await API.post('/flights', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });
    return response.data;
  },
  deleteFlight: async (id) => {
    const response = await API.get(`/flights/delete/${id}`);
    return response.data;
  }
};