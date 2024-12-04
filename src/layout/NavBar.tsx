// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from 'react-oidc-context';

// const Navbar: React.FC = () => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);

//   const handleLogout = async () => {
//     await auth.removeUser();
//     localStorage.clear();
//     sessionStorage.clear();
//     navigate('/login', { replace: true });
//   };

//   useEffect(() => {
//     setIsAuthenticated(auth.isAuthenticated);
//   }, [auth.isAuthenticated]);

//   return (
//     <nav className="bg-blue-700 p-4 shadow-lg">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         <div className="flex space-x-6">
//           <Link to="/" className="text-white font-semibold hover:text-blue-200">Opciones</Link>
//           {isAuthenticated && (
//             <>
//               <Link to="/users" className="text-white hover:text-blue-200">Usuarios</Link>
//               <Link to="/orders" className="text-white hover:text-blue-200">Ordenes</Link>
//               <Link to="/menu" className="text-white hover:text-blue-200">Menu</Link>
//               <Link to="/promotion" className="text-white hover:text-blue-200">Promociones</Link>
//             </>
//           )}
//         </div>

//         <div className="flex items-center">
//           {isAuthenticated ? (
//             <button
//               onClick={handleLogout}
//               className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
//             >
//               Log out
//             </button>
//           ) : (
//             <button
//               onClick={() => void auth.signinRedirect()}
//               className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
//             >
//               Log in
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar el menú en mobile

  const handleLogout = async () => {
    await auth.removeUser();
    localStorage.clear();
    sessionStorage.clear();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  return (
    <nav className="bg-blue-700 p-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo y botón de menú */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link to="/" className="text-white text-lg font-semibold">
            Opciones
          </Link>
          <button
            className="text-white md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {/* Icono de menú */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        {/* Links de navegación */}
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } md:flex md:items-center md:space-x-6 w-full md:w-auto`}
        >
          {isAuthenticated && (
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <Link to="/users" className="text-white hover:text-blue-200">
                Usuarios
              </Link>
              <Link to="/orders" className="text-white hover:text-blue-200">
                Ordenes
              </Link>
              <Link to="/menu" className="text-white hover:text-blue-200">
                Menu
              </Link>
              <Link to="/promotion" className="text-white hover:text-blue-200">
                Promociones
              </Link>
            </div>
          )}

          {/* Botón de login/logout */}
          <div className="mt-4 md:mt-0 flex justify-center md:justify-end">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={() => void auth.signinRedirect()}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
              >
                Log in
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
