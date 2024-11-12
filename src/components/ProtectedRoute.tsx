import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  // Si la autenticación está cargando, mostramos un mensaje de "Cargando..."
  if (auth.isLoading) return <p>Loading...</p>;

  // Si hay un error durante la autenticación, mostramos el mensaje de error
  if (auth.error) return <p>Error: {auth.error.message}</p>;

  // Si el usuario no está autenticado, redirigimos a la página de login
  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  // Si el usuario está autenticado, mostramos la página solicitada
  return <>{children}</>;
};

export default ProtectedRoute;
