import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import Dashboard from './components/Dashboard';
import './styles/index.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  console.log('🔐 App Content State:', { user, loading });

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
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎮</div>
          <div>Загрузка SquadUp...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Navigation />
      <Routes>
        {/* Если пользователь авторизован, перенаправляем в Dashboard */}
        <Route 
          path="/" 
          element={user ? <Navigate to="/dashboard" replace /> : <HomePage />} 
        />
        {/* Dashboard доступен только авторизованным */}
        <Route 
          path="/dashboard" 
          element={user ? <Dashboard /> : <Navigate to="/" replace />} 
        />
        {/* Запасной маршрут */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;