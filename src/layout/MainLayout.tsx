import React, { FC } from 'react';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">{children}</main>
      <footer className="bg-Kabul text-white py-2 text-center">
        &copy; {new Date().getFullYear()} Pupusas del Parque
      </footer>
    </div>
  );
};

export default MainLayout;
