import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if backend port changes
  headers: {
    'Content-Type': 'application/json'
  }
});

export const calculateRouteAPI = async (payload) => {
  const response = await api.post('/routes/calculate', payload);
  return response.data;
};

export const getDashboardStatusAPI = async () => {
  const response = await api.get('/dashboard/status');
  return response.data;
};

export default api;
