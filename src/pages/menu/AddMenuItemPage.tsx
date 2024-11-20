import React, { useState } from "react";
import { addMenuItem } from "../../hooks/menuHooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AddMenuItemPageProps {
  token: string;
}

const AddMenuItemPage: React.FC<AddMenuItemPageProps> = ({ token }) => {
  const [menuItem, setMenuItem] = useState({
    name: "",
    description: "",
    category: "",
    price: 0,
    availability: true,
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setMenuItem((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMenuItem(menuItem, token);
      toast.success("Menu item added successfully!");
      navigate("/menu");
    } catch (err) {
      toast.error("Failed to add menu item");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Menu Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={menuItem.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="description"
          value={menuItem.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={menuItem.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={menuItem.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Add Menu Item
        </button>
      </form>
    </div>
  );
};

export default AddMenuItemPage;
