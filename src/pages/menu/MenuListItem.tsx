import React from "react";
import { useNavigate } from "react-router-dom";

interface MenuListItemProps {
  item: {
    menuId: number;
    name: string;
    category?: string;
    price: number;
    availability: boolean;
  };
  onDelete: (menuId: number) => void;
}

const MenuListItem: React.FC<MenuListItemProps> = ({ item, onDelete }) => {
  const navigate = useNavigate();

  return (
    <li
      className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-md hover:bg-gray-50 transition"
    >
      <div className="mb-4 md:mb-0">
        <h2 className="font-semibold text-xl">{item.name}</h2>
        <p className="text-gray-700">Category: {item.category}</p>
        <p className="text-sm text-gray-500">Price: ${item.price}</p>
        <p
          className={`text-sm font-medium ${item.availability ? "text-green-500" : "text-red-500"}`}
        >
          {item.availability ? "Available" : "Not Available"}
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
        <button
          onClick={() => navigate(`/edit-menu-item/${item.menuId}`)}
          className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(item.menuId)}
          className="w-full md:w-auto px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default MenuListItem;
