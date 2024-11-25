import React, { useState } from "react";
import { Menu } from "../../data/Menu";

interface OrderModalProps {
  onClose: () => void;
  onCreateOrder: (tableId: number, orderItems: any[]) => void;
  menuItems: Menu[]; 
}

const OrderModal: React.FC<OrderModalProps> = ({ onClose, onCreateOrder, menuItems }) => {
  const [tableId, setTableId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);
  console.log(menuItems)

  const handleAddItem = () => {
    setOrderItems([...orderItems, { menuId: "", quantity: 1 }]);
  };

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index][field] = value;
    setOrderItems(updatedItems);
  };

  const handleSubmit = () => {
    if (tableId && orderItems.length > 0) {
      const populatedItems = orderItems.map((item) => {
        const menuItem = menuItems.find((menu) => menu.menuId === Number(item.menuId));
        return {
          menuName: menuItem?.name || "",
          quantity: item.quantity,
          price: menuItem?.price || 0,
        };
      });
      onCreateOrder(tableId, populatedItems);
    } else {
      alert("Por favor, selecciona una mesa y agrega al menos un artículo.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Orden</h2>
        <label className="block mb-2">
          Mesa:
          <input
            type="number"
            value={tableId || ""}
            onChange={(e) => setTableId(Number(e.target.value))}
            className="block w-full border rounded-md p-2"
          />
        </label>
        <div>
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={item.menuId}
                onChange={(e) =>
                  handleItemChange(index, "menuId", Number(e.target.value))
                }
                className="border rounded-md p-2 flex-1"
              >
                <option value="" disabled>
                  Selecciona un plato
                </option>
                {menuItems.map((menuItem) => (
                  <option key={menuItem.menuId} value={menuItem.menuId}>
                    {menuItem.name} (${menuItem.price.toFixed(2)})
                  </option>
                ))}
              </select>
              <input
                type="number"
                placeholder="Cantidad"
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                className="border rounded-md p-2 w-20"
              />
            </div>
          ))}
        </div>
        <button
          onClick={handleAddItem}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition mt-4"
        >
          Agregar artículo
        </button>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="mr-2 py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            Crear Orden
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;

