import API from './api';

export const authService = {
  login: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data && response.data !== "Invalid Credentials") {
      localStorage.setItem('token', response.data);
      localStorage.setItem('username', credentials.username);
      return true;
    }
    return false;
  },
  register: async (userData) => {
    const response = await API.post('/auth/register', userData);
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
  },
  getCurrentUser: () => localStorage.getItem('username'),
  isAuthenticated: () => !!localStorage.getItem('token')
};