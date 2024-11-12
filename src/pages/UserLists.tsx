import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../api/userApi';
import { useAuth } from 'react-oidc-context';
import { getUserEmail } from '../api/getuserEmail'
interface User {
  userId: number;
  name: string;
  role: string;
  email: string;
}

const UsersList: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [authenticatedEmail, setAuthenticatedEmail] = useState<string | null>(null);

  useEffect(() => {
    const getEmailAndUsers = async () => {
      if (!user || !user.id_token) return;

      try {
        // Obtener el email del usuario autenticado
        const email = await getUserEmail(user.id_token);
        setAuthenticatedEmail(email);

        // Obtener la lista de usuarios
        const data = await fetchUsers(user.id_token);
        setUsers(data);
      } catch (err) {
        setError('Error loading users');
      } finally {
        setLoading(false);
      }
    };
    
    getEmailAndUsers();
  }, [user]);

  if (loading) return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 text-center">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee List</h2>
      {authenticatedEmail && (
        <p className="mb-4 text-gray-700">Authenticated User Email: {authenticatedEmail}</p>
      )}
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
