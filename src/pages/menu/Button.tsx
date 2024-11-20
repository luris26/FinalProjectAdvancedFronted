import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg focus:outline-none focus:ring-2 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
