import React, { useEffect, useState } from "react";
import { Order } from "../../data/Order";
import { fetchOrders, markOrderAsCompleted } from "../../hooks/orderHooks";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data);
      } catch {
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  const handleCompleteOrder = async (orderId: number) => {
    try {
      await markOrderAsCompleted(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "completado" } : order
        )
      );
    } catch {
      setError("Failed to complete order");
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Ordenes</h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white rounded-lg shadow-md p-4 relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Mesa {order.tableId || "N/A"}</h2>
              <span className="text-gray-500 text-sm">
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Just now"}
              </span>
            </div>
            <ul className="text-gray-700 text-sm mb-4">
              {order.orderItems.length > 0 ? (
                order.orderItems.map((item, index) => (
                  <li key={index} className="flex justify-between">
                    <span>
                      {item.quantity}x {item.menuName} {/* Use menuName */}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No items in this order</li>
              )}
            </ul>
            <div className="flex justify-between items-center mb-4">
              <span
                className={`text-sm font-medium ${
                  order.status === "completado"
                    ? "text-green-500"
                    : order.status === "pendiente"
                    ? "text-yellow-500"
                    : "text-gray-500"
                }`}
              >
                {order.status}
              </span>
              <span className="font-bold text-lg">${order.totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={() => handleCompleteOrder(order.orderId)}
              className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              disabled={order.status === "completado"}
            >
              {order.status === "completado" ? "Completado" : "Marcar como completado"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
