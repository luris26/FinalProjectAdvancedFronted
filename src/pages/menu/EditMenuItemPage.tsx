import React, { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchMenuItems, updateMenuItem } from "../../hooks/menuHooks";
import { toast } from "react-toastify";
import { useFetchData } from "../../hooks/useFetchData";
import { useForm } from "../../hooks/useFormHooks";

interface EditMenuItemPageProps {
  token: string;
}

const EditMenuItemPage: FC<EditMenuItemPageProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: menuItem, loading } = useFetchData<{
    name: string;
    description: string;
    category: string;
    price: number;
    availability: boolean;
  }>(fetchMenuItems, id, token);

  const { formValues, handleChange, setFormValues } = useForm<{
    name: string;
    description: string;
    category: string;
    price: number;
    availability: boolean;
  }>({
    initialValues: {
      name: "",
      description: "",
      category: "",
      price: 0,
      availability: true,
    },
  });

  useEffect(() => {
    if (menuItem) {
      setFormValues({
        name: menuItem.name || "",
        description: menuItem.description || "",
        category: menuItem.category || "",
        price: menuItem.price || 0,
        availability: menuItem.availability ?? true,
      });
    }
  }, [menuItem, setFormValues]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateMenuItem(parseInt(id || ""), token, formValues);
      toast.success("Item updated successfully");
      navigate("/menu");
    } catch (error) {
      toast.error("Error updating item");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Menu Item</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="description"
            value={formValues.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="category"
            value={formValues.category}
            onChange={handleChange}
            placeholder="Category"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="price"
            value={formValues.price}
            onChange={handleChange}
            placeholder="Price"
            className="w-full p-2 border rounded"
          />
          <label>
            Availability:
            <select
              name="availability"
              value={formValues.availability ? "true" : "false"}
              onChange={(e) =>
                setFormValues((prev) => ({
                  ...prev,
                  availability: e.target.value === "true",
                }))
              }
              className="w-full p-2 border rounded"
            >
              <option value="true">Available</option>
              <option value="false">Not Available</option>
            </select>
          </label>
          <button type="submit" className="bg-blue-500 text-white rounded px-4 py-2">
            Update
          </button>
        </form>
      )}
    </div>
  );
};

export default EditMenuItemPage;
