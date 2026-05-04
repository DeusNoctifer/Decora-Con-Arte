import api from '../api/axios';

export interface RegisterData {
  email: string;
  names: string;
  surnames: string;
  password: string;
  gender?: string;
  date_of_birth?: string;
  tel?: string;
}

export const registerUser = async (userData: RegisterData) => {
  try {
    const response = await api.post('auth/register/', userData);
    return response.data;
  } catch (error: any) {
    throw error.response?.data || "Error en el servidor";
  }
};