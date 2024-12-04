import React, { useEffect, useState } from "react";
import { Order } from "../../data/Order";
import { Menu } from "../../data/Menu";
import { fetchOrders, markOrderAsCompleted, createOrder } from "../../hooks/orderHooks";
import { fetchMenuItems } from "../../hooks/menuHooks";
import OrderCard from "./OrderCard";
import OrderModal from "./OrderModal";
import { OrderItem } from "../../data/OrderItem";
import { NewOrder } from "../../data/NewOrder";

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Error fetching orders");
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, []);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const data = await fetchMenuItems("");
        setMenuItems(data || []);
      } catch (err) {
        console.error("Error fetching menu items:", err);
        setError("Error fetching menu items");
      }
    };
    loadMenuItems();
  }, []);

  const handleCompleteOrder = async (orderId: number) => {
    try {
      await markOrderAsCompleted(orderId);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: "completado" } : order
        )
      );
    } catch (err) {
      console.error("Error completing order:", err);
      setError("Failed to complete order");
    }
  };

  const handleAddOrder = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleCreateOrder = async (tableId: number, orderItems: OrderItem[], userId:number) => {
    try {
      const newOrder = new NewOrder(tableId, userId, orderItems);
      await createOrder(newOrder);
      console.log("Orden creada:", newOrder);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creando la orden:", error);
      setError("No se pudo crear la orden.");
    }
  };
  

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <h1 className="text-3xl font-bold text-center mb-6">Órdenes</h1>
      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {orders.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No hay órdenes disponibles.</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onComplete={handleCompleteOrder}
          />
        ))}
      </div>
      <button
        onClick={handleAddOrder}
        className="fixed bottom-8 right-8 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-green-600 transition"
        aria-label="Añadir una orden"
      >
        +
      </button>

      {isModalOpen && (
        <OrderModal
          onClose={handleModalClose}
          onCreateOrder={handleCreateOrder}
          menuItems={menuItems}
        />
      )}
    </div>
  );
};

export default OrdersPage;
