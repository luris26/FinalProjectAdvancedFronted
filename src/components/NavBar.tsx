import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

const Navbar: React.FC = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(auth.isAuthenticated);

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
        <div className="flex space-x-6">
          <Link to="/" className="text-white font-semibold hover:text-blue-200">Dashboard</Link>
          {isAuthenticated && (
            <>
              <Link to="/users" className="text-white hover:text-blue-200">Users</Link>
              <Link to="/orders" className="text-white hover:text-blue-200">Orders</Link>
              <Link to="/menu" className="text-white hover:text-blue-200">Menu</Link>
            </>
          )}
        </div>

        <div className="flex items-center">
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
    </nav>
  );
};

export default Navbar;
