import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Providers from './context/Provider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/user/UserLists';
import Orders from './pages/Orders';
import Menu from './pages/menu/Menu';
import Login from './pages/Login';
import { useAuth } from 'react-oidc-context';
import AddUser from '../src/pages/user/AddUser';
import EditUser from '../src/pages/user/EditUser';
import AddMenuItemPage from './pages/menu/AddMenuItemPage';
import EditMenuItemPage from './pages/menu/EditMenuItemPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuth();

  if (auth.isLoading) return <p>Loading...</p>;
  if (auth.error) return <p>Error: {auth.error.message}</p>;
  if (!auth.isAuthenticated) return <Navigate to="/login" />;

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <Router>
          <Navbar />
          <div className="container mx-auto p-6">
            <ToastContainer
              position="top-right"
              autoClose={3000} 
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
              <Route path="/menu" element={<ProtectedRoute><Menu token={''} /></ProtectedRoute>} />
              <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
              <Route path="/add-menu-item" element={<AddMenuItemPage token={''} />} />
              <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
              <Route path="/edit-menu-item/:id" element={<EditMenuItemPage token={''} />} />
            </Routes>
          </div>
        </Router>
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
