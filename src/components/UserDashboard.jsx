import React from 'react';
import { useAuth } from '../context/AuthContext';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <section className="user-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">
            Добро пожаловать, <span className="user-highlight">{user.nickname}</span>!
          </h1>
          <p className="dashboard-subtitle">
            Твоя игровая команда ждет тебя
          </p>
        </div>

        <div className="dashboard-content">
          <div className="user-card">
            <div className="user-avatar">
              {user.nickname?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.nickname}</h3>
              <p className="user-email">{user.email}</p>
              <div className="user-stats">
                <div className="stat-item">
                  <span className="stat-label">ID игрока</span>
                  <span className="stat-value">{user.id}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Статус</span>
                  <span className="stat-value status-active">Активен</span>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-actions">
            <h3 className="actions-title">Быстрые действия</h3>
            <div className="action-buttons">
              <button className="action-btn primary">
                🎯 Найти тиммейтов
              </button>
              <button className="action-btn secondary">
                👥 Моя команда
              </button>
              <button className="action-btn secondary">
                ⚙️ Настройки профиля
              </button>
            </div>
          </div>

          <div className="demo-notice">
            <div className="demo-icon">🚧</div>
            <div className="demo-content">
              <h4>Панель управления в разработке</h4>
              <p>
                Мы активно работаем над полной версией панели управления. 
                Скюда появятся поиск команд, чаты, статистика и многое другое!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
