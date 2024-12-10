import React from "react";
import { Link } from "react-router-dom";

interface BreadcrumbsProps {
  links: { to: string; label: string }[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ links }) => {
  return (
    <nav className="text-sm text-gray-500">
      <ol className="flex space-x-2">
        {links.map((link, index) => (
          <li key={link.to} className="flex items-center">
            <Link to={link.to} className="hover:underline">
              {link.label}
            </Link>
            {index < links.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
