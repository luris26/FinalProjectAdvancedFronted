import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Providers from './context/Provider';
import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/user/UserLists';
import Orders from './pages/order/Orders';
import Menu from './pages/menu/Menu';
import Login from './pages/Login';
import AddUser from '../src/pages/user/AddUser';
import EditUser from '../src/pages/user/EditUser';
import AddMenuItemPage from './pages/menu/AddMenuItemPage';
import EditMenuItemPage from './pages/menu/EditMenuItemPage';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from './components/ProtectedRoute';



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
              <Route path="/orders" element={<ProtectedRoute><Orders token={''} /></ProtectedRoute>} />
              <Route path="/menu" element={<ProtectedRoute><Menu token={''} /></ProtectedRoute>} />
              <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
              <Route path="/add-menu-item" element={<ProtectedRoute><AddMenuItemPage token={''} /></ProtectedRoute>} />
              <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
              <Route path="/edit-menu-item/:id" element={<ProtectedRoute><EditMenuItemPage token={''} /></ProtectedRoute>} />
              <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
