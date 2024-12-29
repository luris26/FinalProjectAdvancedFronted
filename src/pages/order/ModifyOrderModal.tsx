import React, { useState } from "react";
import { Order } from "../../data/Order";

interface ModifyOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order) => void;
}

const ModifyOrderModal: React.FC<ModifyOrderModalProps> = ({ order, onClose, onSave }) => {
  const [orderItems, setOrderItems] = useState(order.orderItems);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { menuId: Date.now(), menuName: "", quantity: 1, price: 0 }]);
  };

  const handleSave = () => {
    const updatedOrder = { ...order, orderItems };
    onSave(updatedOrder);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-lg font-bold mb-4">Modificar Orden</h2>
        <ul>
          {orderItems.map((item, index) => (
            <li key={index} className="flex justify-between items-center mb-2">
              <input
                type="text"
                value={item.menuName}
                onChange={(e) =>
                  setOrderItems((prev) =>
                    prev.map((itm, i) =>
                      i === index ? { ...itm, menuName: e.target.value } : itm
                    )
                  )
                }
                className="border p-1 rounded"
                placeholder="Nombre del artículo"
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  setOrderItems((prev) =>
                    prev.map((itm, i) =>
                      i === index ? { ...itm, quantity: +e.target.value } : itm
                    )
                  )
                }
                className="border p-1 rounded w-16"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={handleAddItem}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        >
          Agregar Artículo
        </button>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => handleSave()}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModifyOrderModal;
