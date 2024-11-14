import axios from "axios";

const apiClient = axios.create({
  // baseURL: "http://localhost:5073/api/Users",
  baseURL: 'https://api.final-project-luris.duckdns.org/api',
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUsers = async (token: string) => {
  const response = await apiClient.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteUser = async (userId: number, token: string) => {
  const response = await apiClient.delete(`/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
//http://localhost:5073/api/Users/add
export const addUser = async (userAdded: { name: string; email: string; role: string; password: string }, token: string) => {
  const response = await apiClient.post('/add', userAdded, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
  });
  return response.data;
};

export const updateUser = async (
  userId: number,
  updatedUser: { name: string; email: string; role: string; password?: string },
  token: string
) => {
  const response = await apiClient.put(`/Users/${userId}`, updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

