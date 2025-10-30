import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';
import VoiceChat from './VoiceChat';
import './UserDashboard.css';

const UserDashboard = () => {
  const { user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [userStats, setUserStats] = useState({
    matchesPlayed: null,
    winRate: null,
    friendsCount: null,
    rating: null,
    onlineTime: '2ч 15м'
  });
  const [activeTab, setActiveTab] = useState('teammates');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const profilesData = await apiService.getProfiles();
      if (profilesData && Array.isArray(profilesData)) {
        setProfiles(profilesData.slice(0, 6));
      }

      setUserStats({
        matchesPlayed: null,
        winRate: null,
        friendsCount: null,
        rating: null,
        onlineTime: '2ч 15м'
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFindTeammates = () => {
    setActiveTab('teammates');
    document.getElementById('online-players').scrollIntoView({ behavior: 'smooth' });
  };

  const handleFriendsTab = () => {
    setActiveTab('friends');
    alert('Вкладка "Друзья" скоро будет доступна!');
  };

  const handleCreateRoom = () => {
    alert('Функция создания комнаты скоро будет доступна!');
  };

  const handleJoinRandom = () => {
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
                  <span className="stat-value">--</span>
                  <span className="stat-label">матчей</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">--</span>
                  <span className="stat-label">побед</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">--</span>
                  <span className="stat-label">друзей</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">--</span>
                  <span className="stat-label">рейтинг</span>
                </div>
                <div className="stat-item">
                  <span className="stat-value">{userStats.onlineTime}</span>
                  <span className="stat-label">в сети</span>
                </div>
              </div>
            </div>
            <div className="user-status">
              <div className="status-indicator online"></div>
              <span>В сети</span>
            </div>
          </div>

          <div className="dashboard-main">
            {/* Табы навигации */}
            <div className="dashboard-tabs">
              <button 
                className={`tab-button ${activeTab === 'teammates' ? 'active' : ''}`}
                onClick={() => setActiveTab('teammates')}
              >
                👥 Найти тиммейтов
              </button>
              <button 
                className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
                onClick={handleFriendsTab}
              >
                🤝 Друзья
              </button>
              <button 
                className={`tab-button ${activeTab === 'voice' ? 'active' : ''}`}
                onClick={() => setActiveTab('voice')}
              >
                🎤 Голосовой чат
              </button>
            </div>

            {/* Контент в зависимости от активного таба */}
            {activeTab === 'teammates' && (
              <>
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
                    <button className="action-btn secondary" onClick={handleFriendsTab}>
                      🤝 Мои друзья
                    </button>
                  </div>
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
                            <p className="player-status">
                              <span className="status-indicator small online"></span>
                              В сети
                            </p>
                            <p className="player-rating">
                              ⭐ {profile.overallRating || '4.5'}
                            </p>
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
              </>
            )}

            {activeTab === 'voice' && (
              <div className="voice-chat-section">
                <h3 className="section-title">Голосовой чат</h3>
                <VoiceChat />
              </div>
            )}

            {activeTab === 'friends' && (
              <div className="friends-section">
                <h3 className="section-title">Мои друзья</h3>
                <div className="coming-soon">
                  <div className="coming-soon-icon">🚧</div>
                  <div className="coming-soon-content">
                    <h4>Раздел "Друзья" в разработке</h4>
                    <p>
                      Скоро здесь появится список ваших друзей, история игр вместе 
                      и быстрые приглашения в голосовой чат.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserDashboard;
