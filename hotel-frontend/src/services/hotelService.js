import API from './api';

export const hotelService = {
  getAllHotels: async () => {
    const response = await API.get('/hotels');
    return response.data;
  },
  addHotel: async (hotelData) => {
    const response = await API.post('/hotels/admin/add', hotelData);
    return response.data;
  },
  updateHotel: async (id, hotelData) => {
    const response = await API.put(`/hotels/admin/update/${id}`, hotelData);
    return response.data;
  },
  deleteHotel: async (id) => {
    const response = await API.delete(`/hotels/admin/delete/${id}`);
    return response.data;
  }
};