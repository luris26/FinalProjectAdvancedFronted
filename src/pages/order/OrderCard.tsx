import React from "react";
import { Order } from "../../data/Order";

interface OrderCardProps {
  order: Order;
  onComplete: (orderId: number) => void;
  onModify: (order: Order) => void; 
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onComplete, onModify }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => onModify(order)}
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
        {order.orderItems && order.orderItems.length > 0 ? (
          order.orderItems.map((item, index) => (
            <li key={index} className="flex justify-between">
              <span>
                {item.quantity}x {item.menuName}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No hay artículos en esta orden</li>
        )}
      </ul>

      <div className="flex justify-between items-center mb-4">
        <span
          className={`text-sm font-medium ${order.status === "completado"
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
        onClick={(e) => {
          e.stopPropagation();
          onComplete(order.orderId);
        }}
        className={`w-full py-2 rounded-lg ${order.status === "completado"
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-Tan text-white hover:bg-TanComplementary transition"
          }`}
        disabled={order.status === "completado"}
      >
        {order.status === "completado" ? "Completado" : "Marcar como completado"}
      </button>
    </div>
  );
};

export default OrderCard;
