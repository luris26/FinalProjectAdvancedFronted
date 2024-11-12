import React from 'react';
import { useAuth } from 'react-oidc-context';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;
  }

  if (auth.error) {
    return <p className="text-center text-red-500 mt-10">Error: {auth.error.message}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-20">
      <h1 className="text-3xl font-semibold text-gray-800">
        Bienvenida, {auth.user?.profile.given_name || "User"}!
      </h1>
      <p className="mt-4 text-gray-600">
        Aqui hay un resumen de lo que ofrece esta aplicacion
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <Link
          to="/users"
          className="bg-blue-500 hover:bg-blue-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold">Manage Users</h3>
        </Link>

        <Link
          to="/orders"
          className="bg-customGray hover:bg-green-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold">View Orders</h3>
        </Link>

        <Link
          to="/menu"
          className="bg-customPurple hover:bg-purple-600 text-white p-6 rounded-lg text-center"
        >
          <h3 className="text-xl font-semibold">Manage Menu</h3>
        </Link>
      </div>

      {/* Información adicional */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-800">Your Profile Information:</h2>
        <p className="mt-4">
          <strong>Email:</strong> {auth.user?.profile.email}
        </p>
        <p>
          <strong>Username:</strong> {auth.user?.profile.preferred_username}
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
