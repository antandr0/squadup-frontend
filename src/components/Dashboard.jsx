import React from 'react';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '100px 20px 20px 20px'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🎮 Добро пожаловать, {user?.profile?.nickname || user?.email}!
        </h1>
        <p style={{ color: '#b0b0d0', marginBottom: '30px' }}>
          Это ваш личный кабинет SquadUp Premium
        </p>
        <button
          onClick={logout}
          style={{
            background: 'rgba(255, 107, 107, 0.2)',
            color: '#ff6b6b',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            padding: '10px 20px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          🚪 Выйти
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
