import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust if backend port changes
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept responses to handle 401 token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token to force re-login if token is invalid or expired
      localStorage.removeItem('token');
      // Dispatch a custom event that AuthContext can listen to
      window.dispatchEvent(new Event('auth:unauthorized'));
    }
    return Promise.reject(error);
  }
);

export const calculateRouteAPI = async (payload) => {
  const response = await api.post('/routes/calculate', payload);
  return response.data;
};

export const getDashboardStatusAPI = async () => {
  const response = await api.get('/dashboard/status');
  return response.data;
};

export default api;
