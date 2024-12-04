import React from 'react';

interface CardProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ title, subtitle, children }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="font-semibold text-xl">{title}</h2>
      <p className="text-sm text-gray-500">{subtitle}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
};

export default Card;
