import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = ({ onLogoClick, onLogout, onDashboardClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (onLogoClick) {
      onLogoClick();
    }
  };

  const handleUserMenuClick = () => {
    if (onDashboardClick) {
      onDashboardClick();
    }
  };

  const handleMobileUserInfoClick = () => {
    if (onDashboardClick) {
      onDashboardClick();
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Логотип */}
        <a 
          href="/" 
          className="nav-logo"
          onClick={handleLogoClick}
        >
          SquadUp
        </a>

        {/* Десктопное меню */}
        <div className="nav-menu">
          <a href="#features" className="nav-link">скоро будет кнопка Возможности</a>
          <a href="#success" className="nav-link">скоро будет кнопка Отзывы</a>
          
          {user ? (
            <div 
              className="user-menu"
              onClick={handleUserMenuClick}
              style={{ cursor: 'pointer' }}
            >
              <span className="user-info">
                В СЕТИ: {user.nickname || user.email}
              </span>
              <button onClick={handleLogout} className="logout-button">
                Выйти
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <a href="#demo" className="nav-link">Попробовать</a>
            </div>
          )}
        </div>

        {/* Мобильное меню */}
        <div className="mobile-menu">
          <button 
            className="menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
          
          {isMenuOpen && (
            <div className="mobile-nav-menu">
              <a href="#features" className="mobile-nav-link">скоро будет кнопка Возможности</a>
              <a href="#success" className="mobile-nav-link">скоро будет кнопка Истории успеха</a>
              
              {user ? (
                <>
                  <span 
                    className="mobile-user-info"
                    onClick={handleMobileUserInfoClick}
                    style={{ cursor: 'pointer' }}
                  >
                    В СЕТИ: {user.nickname || user.email}
                  </span>
                  <button onClick={handleLogout} className="mobile-logout-button">
                    Выйти
                  </button>
                </>
              ) : (
                <a href="#demo" className="mobile-nav-link">Попробовать</a>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
