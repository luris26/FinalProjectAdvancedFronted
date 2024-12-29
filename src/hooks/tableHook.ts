import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5073/api/table",
//   baseURL: "https://api.final-project-luris.duckdns.org/api",
  headers: { "Content-Type": "application/json" },
});

export const fetchTables = async () => {
  const response = await apiClient.get("/tables");
  return response.data;
};
