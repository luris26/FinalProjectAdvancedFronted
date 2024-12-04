import React, { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <main className="">{children}</main>
      <footer className="bg-gray-600 text-white py-2 text-center">
        &copy; {new Date().getFullYear()} Pupusas del Parque
      </footer>
    </div>
  );
};

export default MainLayout;
