import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addUser } from '../hooks/userHooks';
import { useAuth } from 'react-oidc-context';
import InputField from '../components/InputField';

const AddUser: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.role || !formData.password) {
      toast.error('Por favor, llene todos los campos');
      return;
    }

    if (!user?.id_token) {
      toast.error('Usuario no autorizado');
      return;
    }

    setLoading(true);
    try {
      await addUser(
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          password: formData.password
        },
        user.id_token
      );
      toast.success('Usuario añadido correctamente');
      navigate('/'); 
    } catch (err) {
      toast.error('Error al añadir usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Añadir Usuario</h2>
      <form onSubmit={handleAddUser}>
        <InputField
          label="Nombre"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Añade un nombre"
          required
        />
        <InputField
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Añade Correo Electrónico"
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Rol</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Ingresa una Contraseña"
          required
        />
        <button
          type="submit"
          className={`bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Añadiendo...' : 'Añadir Usuario'}
        </button>
      </form>
    </div>
  );
};

export default AddUser;
