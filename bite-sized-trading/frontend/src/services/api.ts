import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api', // Update with your backend URL
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTrades = async () => {
  const response = await apiClient.get('/trading');
  return response.data;
};

export const getPortfolio = async (userId) => {
  const response = await apiClient.get(`/portfolio/${userId}`);
  return response.data;
};

export const login = async (credentials) => {
  const response = await apiClient.post('/auth/login', credentials);
  return response.data;
};

export const register = async (userData) => {
  const response = await apiClient.post('/auth/register', userData);
  return response.data;
};