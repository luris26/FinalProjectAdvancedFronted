import React from 'react';
import { useAuth } from 'react-oidc-context';

const Login: React.FC = () => {
  const auth = useAuth();

  if (!auth) {
    return <div>Error: Authentication context is not available.</div>;
  }

  if (auth.isAuthenticated) {
    return <p className="text-center text-green-500 mt-20">You are already logged in.</p>;
  }

  if (auth.isLoading) {
    return <p className="text-center text-gray-500 mt-20">Loading...</p>;
  }

  if (auth.error) {
    return <div className="text-center text-red-500 mt-20">Error: {auth.error.message}</div>;
  }

  const handleLogin = () => {
    auth.signinRedirect();
  };

  return (
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20 text-center">
      <div className="mb-6">
        <img
          src="/login.svg" 
          alt="Verification"
          className="w-32 h-32 mx-auto"
        />
      </div>

      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Porfavor usa el boton para verificar tu identidad
      </h2>

      <button
        onClick={handleLogin}
        className="bg-ChestnutRose text-white font-semibold py-2 px-6 rounded-lg hover:bg-ChestnutRoseComplement transition shadow-md"
      >
        Verificar Identidad
      </button>
    </div>
  );
};

export default Login;
