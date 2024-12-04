import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5073/api/Users",
  // baseURL: 'https://api.final-project-luris.duckdns.org/api/Users',
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchUsers = async (token: string) => {
  const response = await apiClient.get("users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const deleteUser = async (userId: number, token: string) => {
  const response = await apiClient.delete(`delete/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
export const addUser = async (
  userAdded: {
    name: string;
    email: string;
    role: string;
    passwordHash: string;
  },
  token: string
) => {
  console.log("Datos enviados:", userAdded);
  try {
    const response = await apiClient.post("add", userAdded, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al añadir usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateUser = async (
  userId: number,
  updatedUser: {
    id: number;
    name: string;
    email: string;
    role: string;
    passwordHash?: string;
  },
  token: string
) => {
  try {
    const { id, ...userWithoutId } = updatedUser;
    id: id
    const response = await apiClient.put(`edit/${userId}`, userWithoutId, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error al actualizar usuario:",
      error.response?.data || error.message
    );
    throw error;
  }
};
