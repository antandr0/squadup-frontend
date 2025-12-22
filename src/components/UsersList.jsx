import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    loadRealUsersFromDatabase();
    
    // Обновляем каждые 20 секунд
    const intervalId = setInterval(() => {
      loadRealUsersFromDatabase();
    }, 20000);
    
    return () => clearInterval(intervalId);
  }, []);

  // 📊 ЗАГРУЗКА РЕАЛЬНЫХ ПОЛЬЗОВАТЕЛЕЙ ИЗ БАЗЫ ДАННЫХ
  const loadRealUsersFromDatabase = async () => {
    try {
      setLoading(true);
      console.log('🔄 Запрашиваем реальных пользователей из БД...');
      
      const response = await apiService.getAllProfiles();
      console.log('📨 Ответ от БД:', response);
      
      if (response.success) {
        // 🔍 ВАЖНО: Проверяем структуру данных
        const dbUsers = response.users || [];
        console.log(`📊 Получено ${dbUsers.length} реальных пользователей из БД`);
        
        // Отладочная информация о каждом пользователе
        dbUsers.forEach((user, index) => {
          console.log(`👤 Пользователь ${index + 1} из БД:`, {
            id: user.id,
            nickname: user.nickname,
            online: user.online,
            email: user.email,
            last_active: user.last_active
          });
        });
        
        setUsers(dbUsers);
        setOnlineCount(response.online_count || 0);
        setLastUpdate(new Date());
        setError(null);
        
        console.log(`✅ Успешно загружено ${dbUsers.length} пользователей из БД`);
        console.log(`🟢 Онлайн из БД: ${response.online_count || 0}`);
      } else {
        const errorMsg = response.error || 'Ошибка загрузки из базы данных';
        console.error('❌ Ошибка от БД:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ Критическая ошибка при загрузке из БД:', err);
      setError('Не удалось подключиться к базе данных. Проверьте сервер.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Недавно';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} ч назад`;
    return date.toLocaleDateString('ru-RU');
  };

  const getStatusText = (user) => {
    if (user.online === true) return '🟢 В сети сейчас';
    
    if (user.last_active) {
      return `⚫ Был(а) в сети: ${formatDate(user.last_active)}`;
    }
    
    return '⚫ Не в сети';
  };

  const getUserAvatar = (nickname) => {
    return nickname ? nickname.charAt(0).toUpperCase() : '?';
  };

  const getUserDisplayName = (user) => {
    if (user.nickname) return user.nickname;
    if (user.email) return user.email.split('@')[0];
    return `User #${user.id}`;
  };

  if (loading && users.length === 0) {
    return (
      <div className="users-list loading">
        <div className="spinner"></div>
        <p>Загружаем реальных пользователей из базы данных...</p>
        <p className="loading-sub">Подключаемся к PostgreSQL на Render.com</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-list error">
        <h3>❌ Ошибка загрузки данных</h3>
        <p>{error}</p>
        <button onClick={loadRealUsersFromDatabase} className="retry-btn">
          🔄 Повторить попытку
        </button>
        <p className="error-info">
          Проверьте: 
          <br />1. Работает ли бэкенд на Render.com
          <br />2. Подключение к базе данных PostgreSQL
        </p>
      </div>
    );
  }

  return (
    <div className="users-list">
      <div className="users-header">
        <h2>👥 В системе (из БД)</h2>
        <div className="online-counter">
          <span className="online-dot"></span>
          <span>Онлайн сейчас: <strong>{onlineCount}</strong> из <strong>{users.length}</strong></span>
        </div>
      </div>
      
      <div className="database-info">
        <span className="db-badge">PostgreSQL</span>
        <span className="db-badge">Render.com</span>
        <span className="db-badge">{users.length} реальных пользователей</span>
      </div>
      
      <div className="users-grid">
        {users.length === 0 ? (
          <div className="no-users">
            <p>В базе данных пока нет пользователей</p>
            <button onClick={loadRealUsersFromDatabase} className="retry-btn">
              🔄 Проверить снова
            </button>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className={`user-card ${user.online ? 'online' : 'offline'}`}>
              <div className={`user-avatar ${user.online ? 'avatar-online' : 'avatar-offline'}`}>
                {getUserAvatar(user.nickname)}
              </div>
              <div className="user-info">
                <h3 className="user-name">
                  {getUserDisplayName(user)}
                  {user.online && <span className="live-badge">LIVE</span>}
                  {user.id && <span className="user-id-badge">ID: {user.id}</span>}
                </h3>
                <p className="user-email">{user.email}</p>
                <p className="user-status">
                  {getStatusText(user)}
                </p>
                {user.last_active && (
                  <p className="user-last-active">
                    <small>Активность: {new Date(user.last_active).toLocaleString('ru-RU')}</small>
                  </p>
                )}
                {user.created_at && (
                  <p className="user-created">
                    <small>Зарегистрирован: {new Date(user.created_at).toLocaleDateString('ru-RU')}</small>
                  </p>
                )}
              </div>
              <div className="user-actions">
                <button className="invite-btn" title="Пригласить в команду">
                  👋 Пригласить
                </button>
                {user.online && (
                  <button className="voice-btn" title="Начать голосовой чат">
                    🎧 Голос
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="users-footer">
        <div className="update-info">
          <button onClick={loadRealUsersFromDatabase} className="refresh-btn" title="Обновить данные из БД">
            🔄 Обновить из базы данных
          </button>
          {lastUpdate && (
            <p className="last-updated">
              Данные обновлены: {lastUpdate.toLocaleTimeString('ru-RU')}
              <br />
              <small>Подключено к: squadup-backend-03vr.onrender.com</small>
            </p>
          )}
        </div>
        <div className="stats-info">
          <p>📊 Статистика БД: {onlineCount} онлайн • {users.length - onlineCount} оффлайн</p>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
