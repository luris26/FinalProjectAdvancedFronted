import axios from 'axios';

const apiClient = axios.create({
  // baseURL: 'http://localhost:5073/api',
  baseURL: 'http://api.final-project-luris.duckdns.org/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const fetchUsers = async (token: string) => {
  const response = await apiClient.get('/users/users', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
