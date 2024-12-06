import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = async () => {
    await auth.removeUser();
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    setIsAuthenticated(auth.isAuthenticated);
  }, [auth.isAuthenticated]);

  return (
    <nav
      className={`bg-Kabul p-4 shadow-lg ${isMobile ? "fixed bottom-0 left-0 w-full" : ""
        }`}
    >
      <div
        className={`max-w-7xl mx-auto flex ${isMobile ? "justify-around items-center" : "justify-between items-center"
          }`}
      >
        {/* móviles */}
        {isMobile ? (
          <>
            <Link to="/" className="text-white flex flex-col items-center">
              <i className="bi bi-house-fill text-xl"></i>
              <span className="text-sm">Perfil</span>
            </Link>
            <Link to="/users" className="text-white flex flex-col items-center">
              <i className="bi bi-people-fill text-xl"></i>
              <span className="text-sm">Usuarios</span>
            </Link>
            <Link to="/orders" className="text-white flex flex-col items-center">
              <i className="bi bi-list-task text-xl"></i>
              <span className="text-sm">Órdenes</span>
            </Link>
            <Link to="/menu" className="text-white flex flex-col items-center">
              <i className="bi bi-grid-fill text-xl"></i>
              <span className="text-sm">Menú</span>
            </Link>
            <Link to="/promotion" className="text-white flex flex-col items-center">
              <i className="bi bi-grid-fill text-xl"></i>
              <span className="text-sm">Promociones</span>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-ChestnutRose text-white px-4 py-2 rounded hover:bg-ChestnutRoseComplement transition"
            >
              Log out
            </button>
          </>
        ) : (
          // escritorio
          <>
            <div className="flex items-center">
              <Link to="/" className="text-white text-lg font-semibold mr-6">
                Perfil
              </Link>
              <Link to="/users" className="text-white hover:text-blue-200 mr-6">
                Usuarios
              </Link>
              <Link to="/orders" className="text-white hover:text-blue-200 mr-6">
                Órdenes
              </Link>
              <Link to="/menu" className="text-white hover:text-blue-200">
                Menú
              </Link>
              <Link to="/promotion" className="text-white flex flex-col items-center">
              <i className="bi bi-grid-fill text-xl"></i>
              <span className="text-sm">Promociones</span>
            </Link>
            </div>
            <button
              onClick={handleLogout}
              className="bg-ChestnutRose text-white px-4 py-2 rounded hover:bg-ChestnutRoseComplement transition"
            >
              Log out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
