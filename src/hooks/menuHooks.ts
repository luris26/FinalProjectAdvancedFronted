import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5073/api/menu",
  // baseURL: "https://api.final-project-luris.duckdns.org/api/Menu",
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchMenuItems = async (token: string) => {
  const response = await apiClient.get("", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const addMenuItem = async (
  newMenuItem: {
    name: string;
    description: string;
    category: string;
    price: number;
    availability: boolean;
  },
  token: string
) => {
  const response = await apiClient.post("add", newMenuItem, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const updateMenuItem = async (
  menuId: number,
  token: string,
  updatedMenu: {
    name: string;
    description: string;
    category: string;
    price: number;
    availability: boolean;
  }
) => {
  try {
    const response = await apiClient.put(`update/${menuId}`, updatedMenu, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Error updating menu item:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteMenuItem = async (menuId: number, token: string) => {
  const response = await apiClient.delete(`delete/${menuId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
