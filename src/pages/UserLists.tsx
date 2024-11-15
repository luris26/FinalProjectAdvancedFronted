import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../hooks/userHooks';
import { useAuth } from 'react-oidc-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface User {
  userId: number;
  name: string;
  email: string;
}

const UsersList: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      if (!user?.id_token) return;
      try {
        const data = await fetchUsers(user.id_token);
        setUsers(data);
      } catch (err) {
        toast.error('Error loading users');
      }
    };
    getUsers();
    console.log(loading);
  }, [user]);

  const handleDeleteUser = async (userId: number) => {
    if (!user?.id_token) return;

    setLoading(true);
    try {
      await deleteUser(userId, user.id_token);
      setUsers(users.filter((u) => u.userId !== userId));
      toast.success('User deleted successfully');
    } catch (err) {
      toast.error('Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (userId: number) => {
    navigate(`/edit-user/${userId}`);
  };

  const handleAddUser = () => {
    navigate('/add-user');
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Manejo de Usuarios</h2>
      
      <button
        onClick={handleAddUser}
        className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition mb-6"
      >
        Añadir un Usuario
      </button>

      <ul className="divide-y divide-gray-200">
        {users.map((user) => (
          <li key={user.userId} className="flex justify-between items-center py-4">
            <span className="font-semibold text-blue-600">{user.name}</span>
            <span>{user.email}</span>
            
            <div className="space-x-4">
              <button
                onClick={() => handleEditUser(user.userId)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600 transition"
              >
                Editar
              </button>

              <button
                onClick={() => handleDeleteUser(user.userId)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
