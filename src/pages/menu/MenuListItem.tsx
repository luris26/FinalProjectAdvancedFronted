import { useNavigate } from "react-router-dom";
import Card from "../../layout/CardLayout"; // Adjust the import path based on your file structure

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
    <Card
      title={item.name}
      subtitle={`Category: ${item.category || "Uncategorized"}`}
    >
      <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
      <p
        className={`text-sm font-medium ${
          item.availability ? "text-green-600" : "text-red-600"
        }`}
      >
        {item.availability ? "Available" : "Not Available"}
      </p>
      <div className="mt-4 flex justify-between">
        <button
          onClick={() => navigate(`/edit-menu-item/${item.menuId}`)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(item.menuId)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition"
        >
          Delete
        </button>
      </div>
    </Card>
  );
};

export default MenuListItem;

