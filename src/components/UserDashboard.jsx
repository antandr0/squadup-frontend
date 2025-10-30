import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import VoiceChat from './VoiceChat';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [userStats, setUserStats] = useState({
    matchesPlayed: 0,
    winRate: 0,
    friendsCount: 0,
    rating: 4.5
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Загружаем профили других игроков
      const profilesData = await apiService.getProfiles();
      if (profilesData && Array.isArray(profilesData)) {
        setProfiles(profilesData.slice(0, 6)); // Показываем первых 6 игроков
      }

      // Загружаем статистику пользователя (заглушка)
      setUserStats({
        matchesPlayed: Math.floor(Math.random() * 100) + 50,
        winRate: Math.floor(Math.random() * 30) + 60,
        friendsCount: Math.floor(Math.random() * 50) + 10,
        rating: (Math.random() * 1.5 + 3.5).toFixed(1)
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindTeammates = () => {
    // Прокрутка к секции с игроками
    document.getElementById('online-players').scrollIntoView({ behavior: 'smooth' });
  };

  const handleCreateRoom = () => {
    // Логика создания голосовой комнаты
    alert('Функция создания комнаты скоро будет доступна!');
  };

  const handleJoinRandom = () => {
    // Логика присоединения к случайной комнате
    alert('Поиск доступных комнат...');
  };

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
          {/* Карточка пользователя со статистикой */}
          <div className="user-card enhanced">
            <div className="user-avatar">
              {user.nickname?.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3 className="user-name">{user.nickname}</h3>
              <p className="user-email">{user.email}</p>
              <div className="user-stats-grid">
                <div className="stat-item">
                  <span className="stat-value">{userStats.matchesPlayed}</span>
                  <span className="stat-label">матчей</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{userStats.winRate}%</span>
                  <span className="stat-label">побед</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{userStats.friendsCount}</span>
                  <span className="stat-label">друзей</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{userStats.rating}</span>
                  <span className="stat-label">рейтинг</span>
                </div>
              </div>
            </div>
            <div className="user-status">
              <div className="status-indicator online"></div>
              <span>Онлайн</span>
            </div>
          </div>

          <div className="dashboard-main">
            {/* Быстрые действия */}
            <div className="dashboard-actions enhanced">
              <h3 className="actions-title">Быстрые действия</h3>
              <div className="action-buttons-grid">
                <button className="action-btn primary" onClick={handleFindTeammates}>
                  🎯 Найти тиммейтов
                </button>
                <button className="action-btn secondary" onClick={handleCreateRoom}>
                  🎮 Создать комнату
                </button>
                <button className="action-btn secondary" onClick={handleJoinRandom}>
                  🔥 Присоединиться
                </button>
                <button className="action-btn secondary">
                  ⚙ Настройки
                </button>
              </div>
            </div>

            {/* Голосовой чат */}
            <div className="voice-chat-section">
              <h3 className="section-title">Голосовой чат</h3>
              <VoiceChat />
            </div>

            {/* Онлайн игроки */}
            <div id="online-players" className="online-players-section">
              <h3 className="section-title">Игроки онлайн ({profiles.length})</h3>
              {loading ? (
                <div className="loading-players">
                  <div className="loading-spinner"></div>
                  <p>Загружаем список игроков...</p>
                </div>
              ) : (
                <div className="players-grid">
                  {profiles.map((profile) => (
                    <div key={profile.id} className="player-card">
                      <div className="player-avatar">
                        {profile.nickname?.charAt(0).toUpperCase()}
                      </div>
                      <div className="player-info">
                        <h4 className="player-name">{profile.nickname}</h4>
                        <p className="player-rating">⭐ {profile.overallRating || 4.5}</p>
                        <p className="player-mode">{profile.playMode || 'casual'}</p>
                      </div>
                      <button className="invite-btn">
                        Пригласить
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Информация о системе */}
            <div className="system-info">
              <div className="info-card">
                <div className="info-icon">🚀</div>
                <div className="info-content">
                  <h4>Система работает стабильно</h4>
                  <p>Все функции доступны. Голосовой чат готов к использованию.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
