import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';
import { useAuth } from '../context/AuthContext';

interface User {
  userId: number;
  name: string;
  role: string;
  email: string;
}

const UsersList: React.FC = () => {
  const { token, logout } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      if (!token) return;
      try {
        const data = await fetchUsers(token);
        setUsers(data);
      } catch (err) {
        setError('Error loading users');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [token]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee List</h2>
      <button
        onClick={logout}
        className="mb-6 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
      <ul className="divide-y divide-gray-200">
        {users.map(user => (
          <li key={user.userId} className="flex justify-between items-center py-4">
            <span className="font-semibold text-blue-600">{user.name}</span>
            <span className="italic text-gray-600">{user.role}</span>
            <span className="text-gray-800">{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;
