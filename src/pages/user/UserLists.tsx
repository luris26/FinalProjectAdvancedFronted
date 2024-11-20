// import React, { useEffect, useState } from 'react';
// import { fetchUsers, deleteUser } from '../../hooks/userHooks';
// import { useAuth } from 'react-oidc-context';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   userId: number;
//   name: string;
//   email: string;
// }

// const UsersList: React.FC = () => {
//   const { user } = useAuth();
//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const getUsers = async () => {
//       if (!user?.id_token) return;
//       setLoading(true);
//       try {
//         const data = await fetchUsers(user.id_token);
//         setUsers(data);
//       } catch (err) {
//         toast.error('Error al cargar los usuarios');
//       } finally {
//         setLoading(false);
//       }
//     };
//     getUsers();
//   }, [user]);

//   const handleDeleteUser = async (userId: number) => {
//     if (!user?.id_token) return;

//     setLoading(true);
//     try {
//       await deleteUser(userId, user.id_token);
//       setUsers(users.filter((u) => u.userId !== userId));
//       toast.success('Usuario eliminado correctamente');
//     } catch (err) {
//       toast.error('Error al eliminar usuario');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEditUser = (userId: number) => {
//     navigate(`/edit-user/${userId}`);
//   };

//   const handleAddUser = () => {
//     navigate('/add-user');
//   };

//   return (
//     <section className="max-w-4xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-8">Usuarios</h1>

//       <div className="flex justify-center mb-6">
//         <button
//           onClick={handleAddUser}
//           className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
//         >
//           Añadir Usuario
//         </button>
//       </div>

//       {loading && <p className="text-center text-gray-500">Cargando...</p>}

//       {users.length === 0 && !loading && (
//         <p className="text-center text-gray-500">No hay usuarios disponibles.</p>
//       )}

//       <ul className="space-y-4">
//         {users.map((user) => (
//           <li
//             key={user.userId}
//             className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-md hover:bg-gray-50 transition"
//           >
//             <div className="mb-4 md:mb-0">
//               <h2 className="font-semibold text-xl">{user.name}</h2>
//               <p className="text-sm text-gray-500">{user.email}</p>
//             </div>
//             <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
//               <button
//                 onClick={() => handleEditUser(user.userId)}
//                 className="w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
//               >
//                 Editar
//               </button>
//               <button
//                 onClick={() => handleDeleteUser(user.userId)}
//                 className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition focus:outline-none focus:ring-2 focus:ring-red-400"
//               >
//                 Eliminar
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </section>
//   );
// };

// export default UsersList;
import React, { useEffect, useState } from 'react';
import { fetchUsers, deleteUser } from '../../hooks/userHooks';
import { useAuth } from 'react-oidc-context';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Button from '../../pages/menu/Button';

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
        toast.error('Error al cargar los usuarios');
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
      toast.error('Error al eliminar usuario');
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
          className="bg-green-600 text-white shadow-lg hover:bg-green-700 focus:ring-green-500"
        >
          Añadir Usuario
        </Button>
      </div>

      {loading && <p className="text-center text-gray-500">Cargando...</p>}

      {users.length === 0 && !loading && (
        <p className="text-center text-gray-500">No hay usuarios disponibles.</p>
      )}

      <ul className="space-y-4">
        {users.map((user) => (
          <li
            key={user.userId}
            className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg shadow-md hover:bg-gray-50 transition"
          >
            <div className="mb-4 md:mb-0">
              <h2 className="font-semibold text-xl">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-start md:items-center">
              <Button
                onClick={() => handleEditUser(user.userId)}
                className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-400"
              >
                Editar
              </Button>
              <Button
                onClick={() => handleDeleteUser(user.userId)}
                className="bg-gray-400 text-white hover:bg-gray-400 focus:ring-red-400"
              >
                Eliminar
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
