import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMenuItems, updateMenuItem } from "../../hooks/menuHooks";
import { toast } from "react-toastify";
import InputField from "../../components/InputField";
import { useAuth } from "react-oidc-context";

interface EditMenuItemProps {
  token: string;
}

const EditMenuItemPage: React.FC<EditMenuItemProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    availability: true,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMenuItem = async () => {
      if (!user || !id) return;
      try {
        const menuItems = await fetchMenuItems(token);
        const selectedItem = menuItems.find((item: any) => item.menuId === parseInt(id));
        if (selectedItem) {
          setFormData({
            name: selectedItem.name,
            description: selectedItem.description,
            category: selectedItem.category,
            price: selectedItem.price,
            availability: selectedItem.availability,
          });
        }
      } catch (err) {
        toast.error("Error loading menu item");
      }
    };

    getMenuItem();
  }, [token, id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "price" ? parseFloat(value) : value });
  };

  const handleUpdateMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.category || formData.price <= 0) {
      toast.error("Porfavor llene todos los campos");
      return;
    }

    setLoading(true);
    try {
      await updateMenuItem(parseInt(id!), token, formData);
      toast.success("Menu item updated successfully");
      navigate("/menu");
    } catch (err) {
      toast.error("Error updating menu item");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Edit Menu Item</h2>
      <form onSubmit={handleUpdateMenuItem}>
        <InputField
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Item name"
          required
        />
        <InputField
          label="Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Item description"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Select a category</option>
            <option value="Bebidas">Bebidas</option>
            <option value="Pupusas">Pupusas</option>
            <option value="Tacos">Tacos</option>
            <option value="Combos">Combos</option>
            <option value="Postres">Postres</option>
          </select>
        </div>
        <InputField
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Item price"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Availability</label>
          <select
            name="availability"
            value={formData.availability ? "true" : "false"}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                availability: e.target.value === "true",
              }))
            }
            className="w-full p-3 border border-gray-300 rounded-lg"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Menu Item"}
        </button>
      </form>
    </div>
  );
};

export default EditMenuItemPage;

