import React, { useState, useEffect } from "react";
import { fetchMenuItems, deleteMenuItem } from "../../hooks/menuHooks";
import { Menu } from "../../data/Menu";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MenuListItem from "./MenuListItem";
import Button from "./Button";
import "react-toastify/dist/ReactToastify.css";

interface MenuPageProps {
  token: string;  
}

const MenuPage: React.FC<MenuPageProps> = ({ token }) => {
  const [menuItems, setMenuItems] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMenuItems(token);
        setMenuItems(data);
      } catch (err) {
        setError("Error fetching menu items" + err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const handleDeleteMenuItem = async (menuId: number) => {
    setLoading(true);
    setError(null);
    try {
      await deleteMenuItem(menuId, token);
      setMenuItems((prevItems) =>
        prevItems.filter((item) => item.menuId !== menuId)
      );
      toast.success("Plato eliminado correctament");
    } catch (err) {
      toast.error("Error al tratar de eliminar" + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Menu</h1>

      <div className="flex justify-center mb-6">
        <Button
          onClick={() => navigate("/add-menu-item")}
          className="bg-GreenOlive text-white shadow-lg focus:ring-green-500"
        >
          Añadir un Nuevo Plato
        </Button>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <ul className="space-y-4">
        {menuItems.map((item) => (
          <MenuListItem key={item.menuId} item={item} onDelete={handleDeleteMenuItem} />
        ))}
      </ul>
    </section>
  );
};

export default MenuPage;
