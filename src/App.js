import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import './index.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '60px',
            marginBottom: '20px',
            animation: 'pulse 2s infinite, rotate 3s linear infinite'
          }}>
            🎮
          </div>
          <div style={{ fontSize: '18px', color: '#b0b0d0' }}>
            Загрузка SquadUp...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App" style={{
      background: 'var(--primary-dark)',
      minHeight: '100vh',
      color: 'var(--text-primary)'
    }}>
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
