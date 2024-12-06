import { useNavigate } from "react-router-dom";
import Card from "../../layout/CardLayout";

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
      name={item.name}
      email={`Category: ${item.category || "Uncategorized"}`}
    >
      <img
          src="/food.svg" 
          alt="Verification"
          className="w-32 h-32 mx-auto"
        />
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
          className="bg-Tan text-white px-4 py-2 rounded hover:bg-TanComplementary"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(item.menuId)}
          className="bg-ChestnutRose text-white px-4 py-2 rounded hover:bg-ChestnutRoseComplement transition"
        >
          Eliminar
        </button>
      </div>
    </Card>
  );
};

export default MenuListItem;

