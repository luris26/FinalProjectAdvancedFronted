import React from 'react';
import { useAuth } from 'react-oidc-context';

const Profile: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  if (auth.error) {
    return <p className="text-center text-red-500 mt-10">Error: {auth.error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <div className="mb-6 object-fill">
        <img
          src="/profile.svg"
          alt="Verification"
          className="w-32 h-32 mx-auto"
        />
      </div>
      <h1 className="text-3xl font-semibold text-gray-800 text-center">
        Bienvenida, {auth.user?.profile.given_name || "User"}!
      </h1>
      <div className="mt-10  text-center">
        <p className="mt-4">
          <strong>Correo Electronico:</strong> {auth.user?.profile.email}
        </p>
        <p>
          <strong>Nombre del Usuario:</strong> {auth.user?.profile.preferred_username}
        </p>
      </div>
    </div>
  );
};

export default Profile;
