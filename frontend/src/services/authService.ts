import api from '../api/axios';

export interface RegisterPayload {
    names: string;
    surnames: string;
    email: string;
    tel: string;
    gender: string;
    date_of_birth: string;
    password: string;
}

export const registerUser = async (userData: RegisterPayload) => {
  const response = await api.post('auth/register/', userData);
  return response.data;
};