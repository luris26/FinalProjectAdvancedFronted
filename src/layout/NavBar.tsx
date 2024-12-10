import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
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

  const NavLink: React.FC<{ to: string; label: string; icon: string }> = ({ to, label, icon }) => (
    <Link
      to={to}
      aria-label={label}
      className={`text-white ${isMobile ? "flex flex-col items-center" : "hover:text-Tan mr-6"}`}
    >
      <i className={`${icon} text-xl`}></i>
      {isMobile && <span className="text-sm">{label}</span>}
      {!isMobile && label}
    </Link>
  );

  return (
    <nav className={`bg-Kabul p-4 shadow-lg ${isMobile ? "fixed bottom-0 left-0 w-full" : ""}`}>
      <div className={`max-w-7xl mx-auto flex ${isMobile ? "justify-around items-center" : "justify-between items-center"}`}>
        {auth.isAuthenticated && (
          <>
            <NavLink to="/" label="Perfil" icon="bi bi-house-fill" />
            <NavLink to="/users" label="Usuarios" icon="bi bi-people-fill" />
            <NavLink to="/orders" label="Órdenes" icon="bi bi-list-task" />
            <NavLink to="/menu" label="Menú" icon="bi bi-grid-fill" />
            <NavLink to="/promotion" label="Promociones" icon="bi bi-grid-fill" />
            <NavLink to="/about" label="About" icon="bi bi-grid-fill" />
            <button
              onClick={handleLogout}
              className="bg-ChestnutRose text-white px-4 py-2 rounded hover:bg-ChestnutRoseComplement transition"
            >
              Log out
            </button>
          </>
        )}

        {!auth.isAuthenticated && (
          <span className="text-white">Por favor, inicie sesión para acceder al menú</span>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
