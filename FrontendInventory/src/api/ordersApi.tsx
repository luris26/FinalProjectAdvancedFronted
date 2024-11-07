import axios from 'axios';

export const getOrders = async () => {
  const response = await axios.get('http://localhost:3001/orders');
  return response.data;
};
