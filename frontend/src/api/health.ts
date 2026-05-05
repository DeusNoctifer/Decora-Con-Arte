import api from './axios';

export const checkBackendStatus = async () => {
  try {
    const response = await api.get('health/');
    return response.data;
  } catch (error) {
    console.error("Error conectando con el servidor:", error);
    throw error;
  }
};