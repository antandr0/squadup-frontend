import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = ({ onLogoClick, onLogout }) => {
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

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Логотип - всегда ведет на главную без разлогина */}
        <a 
          href="/" 
          className="nav-logo"
          onClick={handleLogoClick}
        >
          SquadUp
        </a>

        {/* Десктопное меню */}
        <div className="nav-menu">
          <a href="#features" className="nav-link">Возможности</a>
          <a href="#success" className="nav-link">Истории успеха</a>
          <a href="#demo" className="nav-link">Демо</a>
          
          {user ? (
            <div className="user-menu">
              <span className="user-info">
                Играет: {user.nickname || user.email}
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
              <a href="#features" className="mobile-nav-link">Возможности</a>
              <a href="#success" className="mobile-nav-link">Истории успеха</a>
              <a href="#demo" className="mobile-nav-link">Демо</a>
              
              {user ? (
                <>
                  <span className="mobile-user-info">
                    Играет: {user.nickname || user.email}
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
