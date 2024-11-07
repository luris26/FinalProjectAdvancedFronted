import { useEffect, useState } from 'react';
import { getOrders } from '../api/ordersApi';
import { Order } from '../data/Order';

function OrdersList() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h1>Order List</h1>
      <ul>
        {orders.map(order => (
          <li key={order.order_id}>
            Order ID: {order.order_id}, Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdersList;
