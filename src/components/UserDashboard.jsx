import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
// Используем существующий файл api.jsx
import { apiService } from '../services/api.jsx';
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
      console.log('🔄 Dashboard: Начинаем загрузку данных...');

      // Проверяем доступность apiService
      if (!apiService) {
        console.error('❌ Dashboard: apiService не определен');
        return;
      }

      console.log('✅ Dashboard: apiService доступен');

      // Вызываем getProfiles
      const profilesData = await apiService.getProfiles();

      console.log('📊 Dashboard: Получены данные:', profilesData);

      if (profilesData && Array.isArray(profilesData)) {
        setProfiles(profilesData.slice(0, 6));
        console.log(`✅ Dashboard: Успешно загружено ${profilesData.length} профилей`);
      } else {
        console.warn('⚠️  Dashboard: Получены некорректные данные');
      }

      setUserStats({
        matchesPlayed: null,
        winRate: null,
        friendsCount: null,
        rating: null,
        onlineTime: '2ч 15м'
      });
    } catch (error) {
      console.error('Dashboard: Error loading data:', error);
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
    <span className="stat-label">переменная матчей</span>
    </div>
    <div className="stat-item">
    <span className="stat-value">--</span>
    <span className="stat-label">переменная побед</span>
    </div>
    <div className="stat-item">
    <span className="stat-value">--</span>
    <span className="stat-label">переменная друзей</span>
    </div>
    <div className="stat-item">
    <span className="stat-value">--</span>
    <span className="stat-label">переменная рейтинг</span>
    </div>
    </div>
    </div>
    <div className="user-status">
    <span className="status-indicator online"></span>
    <span className="status-text">пример переменной В сети</span>
    </div>
    </div>

    {/* Вкладки */}
    <div className="dashboard-tabs">
    <button
    className={`tab-button ${activeTab === 'teammates' ? 'active' : ''}`}
    onClick={handleFindTeammates}
    >
    Найти игроков
    </button>
    <button
    className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
    onClick={handleFriendsTab}
    >
    Мои друзья
    </button>
    </div>

    {/* тестовый Голосовой чат */}
    <div className="voice-chat-section">
    <VoiceChat />
    </div>
    </div>
    </div>
    </section>
  );
};

export default UserDashboard;
// Якорь коммита: 09.12.2025 14:41 - Dashboard показывает онлайн из БД
