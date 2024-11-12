import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from 'react-oidc-context';

interface MenuItem {
  menuId: number;
  name: string;
  description: string;
  category: string;
  price: number;
  availability: boolean;
}

const Menu: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchMenuItems = async () => {
      if (!auth.user?.id_token) return;

      try {
        const response = await axios.get('http://localhost:5073/api/menu', {
          headers: {
            Authorization: `Bearer ${auth.user.id_token}`,
          },
        });
        setMenuItems(response.data);
      } catch (err) {
        setError('Error loading menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [auth.user]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Menu</h1>
      {menuItems.length === 0 ? (
        <p className="text-gray-600">No items found in the menu.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {menuItems.map((item) => (
            <li key={item.menuId} className="flex flex-col md:flex-row justify-between items-center py-4">
              <div>
                <h3 className="text-xl font-semibold text-blue-600">{item.name}</h3>
                <p className="text-gray-700">{item.description}</p>
                <p className="text-gray-500 italic">{item.category}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">${item.price.toFixed(2)}</p>
                <p className={item.availability ? 'text-green-600' : 'text-red-600'}>
                  {item.availability ? 'Available' : 'Not Available'}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Menu;
