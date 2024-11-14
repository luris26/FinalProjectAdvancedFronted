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
    <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto mt-20">
      <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition"
      >
        Log in with OIDC
      </button>
    </div>
  );
};

export default Login;
