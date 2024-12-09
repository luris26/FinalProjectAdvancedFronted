import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../hooks/userHooks';
import { useAuth } from 'react-oidc-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../pages/menu/Button';
import Card from '../../layout/CardLayout';

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
      setLoading(true);
      try {
        const data = await fetchUsers(user.id_token);
        setUsers(data);
      } catch (err) {
        toast.error('Error al cargar los usuarios' + err);
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, [user]);

  const handleDeleteUser = async (userId: number) => {
    if (!user?.id_token) return;

    setLoading(true);
    try {
      await deleteUser(userId, user.id_token);
      setUsers(users.filter((u) => u.userId !== userId));
      toast.success('Usuario eliminado correctamente');
    } catch (err) {
      toast.error('Error al eliminar usuario' + err);
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
    <section className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Usuarios</h1>
      <div className="flex justify-center mb-6">
        <Button
          onClick={handleAddUser}
          className="bg-GreenOlive text-white shadow-lg hover:bg-GreenOlive focus:ring-green-500"
        >
          Añadir Usuario
        </Button>
      </div>

      {loading && <p className="text-center text-gray-500">Cargando...</p>}

      {users.length === 0 && !loading && (
        <p className="text-center text-gray-500">No hay usuarios disponibles.</p>
      )}

      <div className="space-y-4">
        {users.map((user) => (
          <Card key={user.userId} name={user.name} email={user.email}>
            <img
              src="/userProfile.svg"
              alt="Verification"
              className="w-32 h-32 mx-auto"
            />
            <div className="flex justify-between items-center mt-4">
              <Button
                onClick={() => handleEditUser(user.userId)}
                className="bg-Tan text-white px-4 py-2 hover:bg-TanComplementary"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteUser(user.userId)}
                className="bg-ChestnutRose text-white px-4 py-2 hover:bg-ChestnutRoseComplement"
              >
                Eliminar
              </Button>
            </div>
          </Card>
        ))}
      </div>

    </section>
  );
};

export default UsersList;
