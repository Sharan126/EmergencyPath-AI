import api from './api';

export const hospitalService = {
  getHospitals: async () => {
    const response = await api.get('/hospitals');
    return response.data;
  },

  searchHospitals: async (query) => {
    const response = await api.get(`/hospitals/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  filterHospitals: async (filters) => {
    const params = new URLSearchParams(filters).toString();
    const response = await api.get(`/hospitals/filter?${params}`);
    return response.data;
  },

  getHospitalById: async (id) => {
    const response = await api.get(`/hospitals/${id}`);
    return response.data;
  },

  toggleFavorite: async (id) => {
    const response = await api.post(`/hospitals/favorite/${id}`);
    return response.data;
  },

  getLiveStatus: async () => {
    const response = await api.get('/hospitals/live-status');
    return response.data;
  },

  getAlerts: async () => {
    const response = await api.get('/hospitals/alerts');
    return response.data;
  },
  
  getRouteToHospital: async (hospitalId, originLat, originLng) => {
    const response = await api.post('/hospitals/hospital-route', { hospitalId, originLat, originLng });
    return response.data;
  }
};
