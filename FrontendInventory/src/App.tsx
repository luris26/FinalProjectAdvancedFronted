import React from 'react';
// import Login from './components/Login';
import UsersList from './components/UserLists';
import './index.css';
import { useAuth } from 'react-oidc-context';
import LogInOut from './auth/Auth';
import Providers from './auth/Provider';

const AppContent: React.FC = () => {
  const { user } = useAuth();
  return user ? <UsersList />: <div></div>;
};

const App: React.FC = () => {
  return (
    <Providers>
      <LogInOut>
      </LogInOut>
      <div className="App">
        <AppContent />
      </div>
    </Providers>
  );
};

export default App;
