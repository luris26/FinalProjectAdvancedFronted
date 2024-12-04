import axios from "axios";
import { Order } from "../data/Order";
import { NewOrder } from "../data/NewOrder";

const apiClient = axios.create({
  // baseURL: "http://localhost:5073/api/orders",
  baseURL: 'https://api.final-project-luris.duckdns.org/api/Orders',
  headers: { "Content-Type": "application/json" },
});

export const fetchOrders = async (status?: string) => {
  const response = await apiClient.get("/", { params: { status } });
  return response.data;
};

export const createOrder = async (order: NewOrder): Promise<Order> => {
  const response = await apiClient.post("/addmenu", order);
  return response.data;
};

export const updateOrder = async (id: number, order: Partial<Order>) => {
  const response = await apiClient.put(`/${id}`, order);
  return response.data;
};

export const markOrderAsCompleted = async (id: number) => {
  const response = await apiClient.put(`/complete/${id}`);
  return response.data;
};
