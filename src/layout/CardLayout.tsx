import React from 'react';

interface CardProps {
  name: string;
  email: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ name, email, children }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-center font-semibold text-xl">{name}</h2>
      <p className="text-center text-sm text-gray-500">{email}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
