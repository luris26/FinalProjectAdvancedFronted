import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Providers from './context/Provider';
import ErrorBoundary from './errorBoundary/ErrorBoundary';
import Navbar from './layout/NavBar';
import Profile from './pages/Dashboard';
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
import PromotionConfigurator from './pages/promotion/PromotionConfigurator';
import ClipboardExample from './pages/extraAPI/ClipBoard';
import MainLayout from './layout/MainLayout';
import AboutPage from './pages/about/about';
import TableView from './pages/table/tableIcons';

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <Router>
          <MainLayout>
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
                <Route path="/" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                <Route path="/menu" element={<ProtectedRoute><Menu token={''} /></ProtectedRoute>} />
                <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
                <Route path="/add-menu-item" element={<ProtectedRoute><AddMenuItemPage token={''} /></ProtectedRoute>} />
                <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
                <Route path="/edit-menu-item/:id" element={<ProtectedRoute><EditMenuItemPage token={''} /></ProtectedRoute>} />
                <Route path="/edit-user/:userId" element={<ProtectedRoute><EditUser /></ProtectedRoute>} />
                <Route path="/promotion" element={<ProtectedRoute><PromotionConfigurator /></ProtectedRoute>} />
                <Route path="/clipboard" element={<ProtectedRoute><ClipboardExample /></ProtectedRoute>} />
                <Route path="/about" element={<AboutPage/>}/>
                <Route path="/tables" element={<ProtectedRoute><TableView /></ProtectedRoute>} />
              </Routes>
            </div>
          </MainLayout>
        </Router>
      </Providers>
    </ErrorBoundary>
  );
};

export default App;
