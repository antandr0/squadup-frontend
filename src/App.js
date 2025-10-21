import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import './styles/index.css';

const AppContent = () => {
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--primary-dark)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>{"🎮"}</div>
          <div>Загрузка SquadUp...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation />
      {user ? <Dashboard /> : <HomePage />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
