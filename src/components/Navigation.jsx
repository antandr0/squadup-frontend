import React from 'react';
import { GamepadIcon, UsersIcon, MapPinIcon, LogOutIcon, LayoutDashboardIcon } from 'lucide-react';
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
      <div className="container" style={{
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
            <GamepadIcon size={32} color="#4e54c8" />
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
                <LayoutDashboardIcon size={16} />
                Мой профиль
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
                <LogOutIcon size={16} />
                Выйти
              </button>
            </>
          ) : (
            // Если пользователь не авторизован
            <>
              <a href="#features" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                <UsersIcon size={18} />
                Возможности
              </a>

              <a href="#demo" style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '5px',
                transition: 'color 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.color = 'var(--text-primary)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>
                <MapPinIcon size={18} />
                Как работает
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;