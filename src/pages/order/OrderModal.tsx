import React, { useState } from "react";
import { Menu } from "../../data/Menu";
import { NewOrder, OrderItem } from "../../data/OrderItem";

interface OrderModalProps {
  onClose: () => void;
  onCreateOrder: (newOrder: NewOrder) => void;
  menuItems: Menu[];
}

const OrderModal: React.FC<OrderModalProps> = ({
  onClose,
  onCreateOrder,
  menuItems,
}) => {
  const [userId] = useState<number>(1);
  const [tableId, setTableId] = useState<number | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { menuId: 0, quantity: 1, price: 0, menuName: "" }]);
  };

  const handleItemChange = (index: number, field: keyof OrderItem, value: any) => {
    const updatedItems = [...orderItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    if (field === "menuId") {
      const menuItem = menuItems.find((menu) => menu.menuId === Number(value));
      if (menuItem) {
        updatedItems[index].menuName = menuItem.name;
        updatedItems[index].price = menuItem.price;
      }
    }
    setOrderItems(updatedItems);
  };

  const handleSubmit = () => {
    if (!tableId || orderItems.length === 0) {
      setError("Por favor, selecciona una mesa y agrega al menos un artículo.");
      return;
    }

    const newOrder: NewOrder = {
      tableId,
      userId,
      status: "pendiente",
      totalAmount: orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
      orderItems,
    };

    onCreateOrder(newOrder);
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Nueva Orden</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <label className="block mb-2">
          Mesa:
          <input
            type="number"
            value={tableId || ""}
            onChange={(e) => setTableId(Number(e.target.value))}
            className="block w-full border rounded-md p-2"
            placeholder="Número de mesa"
          />
        </label>
        <div>
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <select
                value={item.menuId || ""}
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
                value={item.quantity || 1}
                min={1}
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

