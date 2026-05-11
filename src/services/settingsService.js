import api from './api';

export const getSettingsAPI = async () => {
  const response = await api.get('/settings');
  return response.data;
};

export const updateAppearanceAPI = async (payload) => {
  const response = await api.put('/settings/appearance', payload);
  return response.data;
};

export const updateNotificationsAPI = async (payload) => {
  const response = await api.put('/settings/notifications', payload);
  return response.data;
};

export const updateAIAPI = async (payload) => {
  const response = await api.put('/settings/ai', payload);
  return response.data;
};

export const updateMapAPI = async (payload) => {
  const response = await api.put('/settings/map', payload);
  return response.data;
};
