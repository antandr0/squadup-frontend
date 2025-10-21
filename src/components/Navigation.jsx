import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  const handleHomeClick = () => {
    window.location.href = '/';
  };

  const handleDashboardClick = () => {
    window.location.href = '/';
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      width: '100%',
      background: 'rgba(15, 15, 35, 0.95)',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
      padding: '15px 0',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Логотип и кнопка главной */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={handleHomeClick}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: 'white',
              fontSize: '16px'
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4e54c8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <line x1="6" x2="10" y1="12" y2="12"></line>
              <line x1="8" x2="8" y1="10" y2="14"></line>
              <line x1="15" x2="15.01" y1="13" y2="13"></line>
              <line x1="18" x2="18.01" y1="11" y2="11"></line>
              <rect width="20" height="12" x="2" y="6" rx="2"></rect>
            </svg>
            <span style={{
              fontSize: '24px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SquadUp
            </span>
          </button>

          {/* Информация о пользователе если авторизован */}
          {user && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(78, 84, 200, 0.2)',
              padding: '5px 15px',
              borderRadius: '20px',
              border: '1px solid rgba(78, 84, 200, 0.3)'
            }}>
              <span style={{ fontSize: '14px', color: '#b0b0d0' }}>Играет:</span>
              <span style={{ fontWeight: 'bold', color: 'white' }}>
                {user.profile?.nickname || user.email}
              </span>
            </div>
          )}
        </div>

        {/* Правая часть навигации */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user ? (
            // Если пользователь авторизован - показываем Dashboard и Выйти
            <>
              <button 
                onClick={handleDashboardClick}
                style={{
                  background: 'rgba(0, 255, 136, 0.2)',
                  color: '#00ff88',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '14px'
                }}
              >
                📊 Мой профиль
              </button>

              <button
                onClick={handleLogout}
                style={{
                  background: 'rgba(255, 107, 107, 0.2)',
                  color: '#ff6b6b',
                  border: '1px solid rgba(255, 107, 107, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '14px'
                }}
              >
                🚪 Выйти
              </button>
            </>
          ) : (
            // Если пользователь не авторизован
            <>
              <a href="#features" style={{
                color: '#b0b0d0',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#b0b0d0'}>
                👥 Возможности
              </a>

              <a href="#demo" style={{
                color: '#b0b0d0',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'white'}
              onMouseLeave={(e) => e.target.style.color = '#b0b0d0'}>
                🗺️ Как работает
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
