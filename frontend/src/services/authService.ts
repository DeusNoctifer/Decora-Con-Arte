import api from '../api/axios';

export interface RegisterPayload {
    names: string;
    surnames: string;
    email: string;
    tel: string;
    gender: string;
    birth_date: string;
    password: string;
}

export const registerUser = async (userData: any) => {
  // Aquí ya no pones "http://localhost...", axios ya lo sabe
  const response = await api.post('auth/register/', userData);
  return response.data;
};