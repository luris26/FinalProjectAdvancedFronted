import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './components/Login';
import UsersList from './components/UserLists';
import './index.css';

const AppContent: React.FC = () => {
  const { token } = useAuth();
  return token ? <UsersList /> : <Login />;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="App">
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;
