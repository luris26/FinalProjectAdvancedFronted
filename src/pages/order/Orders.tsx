import React, { useEffect, useState } from "react";
import { Menu } from "../../data/Menu";
import { fetchOrders, markOrderAsCompleted, createOrder } from "../../hooks/orderHooks";
import { fetchMenuItems } from "../../hooks/menuHooks";
import OrderCard from "./OrderCard";
import OrderModal from "./OrderModal";
import { Order } from "../../data/Order";
import { NewOrder } from "../../data/OrderItem";


const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState<string>("todos");

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

  const handleCreateOrder = async (newOrder: NewOrder) => {
    try {
      const createdOrder = await createOrder(newOrder);
      const updateOrders = await fetchOrders();
      
      setOrders(updateOrders || [])
      setIsModalOpen(false);
      console.log("Orden creada:", createdOrder);
    } catch (error) {
      console.error("Error creando la orden:", error);
      setError("No se pudo crear la orden.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "pendiente") return order.status === "pendiente";
    if (filter === "completado") return order.status === "completado";
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto  pb-32">
      
      <h1 className="text-3xl font-bold text-center mb-6">Órdenes</h1>

      {loading && <p className="text-center text-gray-500">Cargando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setFilter("todos")}
          className={`px-4 py-2 rounded-lg ${filter === "todos" ? "bg-ChestnutRose text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Todas
        </button>
        <button
          onClick={() => setFilter("pendiente")}
          className={`px-4 py-2 rounded-lg ${filter === "pendiente" ? "bg-ChestnutRose text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Pendientes
        </button>
        <button
          onClick={() => setFilter("completado")}
          className={`px-4 py-2 rounded-lg ${filter === "completado" ? "bg-ChestnutRose text-white" : "bg-gray-200 text-gray-700"
            }`}
        >
          Completadas
        </button>
      </div>

      {filteredOrders.length === 0 && !loading && !error && (
        <p className="text-center text-gray-500">No hay órdenes disponibles.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onComplete={handleCompleteOrder} onModify={function (order: Order): void {
              throw new Error("Function not implemented.");
            } }          />
        ))}
      </div>

      <button
        onClick={handleAddOrder}
        className="fixed bottom-20 right-8 bg-GreenOlive text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:bg-GreenOliveComple transition"
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