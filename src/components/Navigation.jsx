import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
  const { user, logout } = useAuth();

  const handleHomeClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProfileClick = () => {
    alert('🎮 Демо-режим: Профиль пользователя\n\nВ реальной версии здесь будет страница профиля с настройками, историей игр и рейтингом!');
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
        {/* Логотип */}
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
              fontSize: '16px',
              padding: '8px 16px',
              borderRadius: '25px'
            }}
          >
            <span style={{
              fontSize: '20px',
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              SquadUp
            </span>
          </button>

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

        {/* Правая часть навигации - ТОЛЬКО АВТОРИЗАЦИЯ */}
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {user ? (
            <>
              <button 
                onClick={handleProfileClick}
                style={{
                  background: 'rgba(0, 255, 136, 0.2)',
                  color: '#00ff88',
                  border: '1px solid rgba(0, 255, 136, 0.3)',
                  padding: '8px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
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
                  fontSize: '14px'
                }}
              >
                🚪 Выйти
              </button>
            </>
          ) : (
            // Пусто - все ссылки перенесены в футер
            <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
              Присоединяйся к сообществу
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
