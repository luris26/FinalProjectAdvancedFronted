import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUsers, updateUser } from '../hooks/userHooks';
import { useAuth } from 'react-oidc-context';
import { toast } from 'react-toastify';
import InputField from '../components/InputField';

interface User {
  userId: number;
  name: string;
  email: string;
  role: string;
}

const EditUser: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      if (!user?.id_token || !userId) return;
      try {
        const users = await fetchUsers(user.id_token);
        const selectedUser = users.find((u: User) => u.userId === parseInt(userId));
        if (selectedUser) {
          setFormData({
            name: selectedUser.name,
            email: selectedUser.email,
            role: selectedUser.role,
            password: ''
          });
        }
      } catch (err) {
        toast.error('Error al cargar usuario');
      }
    };
    getUser();
  }, [user, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role) {
      toast.error('Por favor, llene todos los campos');
      return;
    }

    if (!user?.id_token) {
      toast.error('Usuario no autorizado');
      return;
    }

    setLoading(true);
    try {
      await updateUser(
        parseInt(userId!),
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password || undefined
        },
        user.id_token
      );
      toast.success('Usuario actualizado correctamente');
      navigate('/');
    } catch (err) {
      toast.error('Error al actualizar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Editar Usuario</h2>
      <form onSubmit={handleUpdateUser}>
        <InputField
          label="Nombre"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Nombre"
          required
        />
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo Electrónico"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          >
            <option value="">Seleccione un Rol</option>
            <option value="admin">Administrador</option>
            <option value="chef">Cocinero</option>
            <option value="waiter">Mesero</option>
            <option value="cashier">Cajero</option>
          </select>
        </div>
        <InputField
          label="Contraseña (Opcional)"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Nueva Contraseña"
        />
        <button
          type="submit"
          className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Actualizando...' : 'Actualizar Usuario'}
        </button>
      </form>
    </div>
  );
};

export default EditUser;
