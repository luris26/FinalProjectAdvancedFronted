import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'react-oidc-context';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;

  if (auth.error) return <p>Error: {auth.error.message}</p>;

  if (!auth.isAuthenticated) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
