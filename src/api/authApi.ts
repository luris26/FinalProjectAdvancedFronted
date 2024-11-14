import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5073/api',
  headers: { 'Content-Type': 'application/json' }
});

interface LoginResponse {
  token: string;
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  const response = await apiClient.post('/auth/login', { email: email, password });
  return response.data;
};
