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
    loadUsers();
    
    // Обновляем каждые 30 секунд
    const intervalId = setInterval(() => {
      loadUsers();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllProfiles();
      
      if (response.success) {
        const dbUsers = response.users || [];
        
        setUsers(dbUsers);
        setOnlineCount(response.online_count || 0);
        setLastUpdate(new Date());
        setError(null);
      } else {
        setError(response.error || 'Ошибка загрузки из базы данных');
      }
    } catch (err) {
      console.error('Ошибка загрузки:', err);
      setError('Не удалось подключиться к серверу.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Неизвестно';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Только что';
    if (diffMins < 60) return `${diffMins} мин назад`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)} ч назад`;
    return date.toLocaleDateString('ru-RU');
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
        <p>Загружаем пользователей из базы данных...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-list error">
        <h3>❌ Ошибка загрузки данных</h3>
        <p>{error}</p>
        <button onClick={loadUsers} className="retry-btn">
          🔄 Повторить попытку
        </button>
      </div>
    );
  }

  return (
    <div className="users-list">
      <div className="users-header">
        <h2>👥 Игроки в системе</h2>
        <div className="online-counter">
          <span className="online-dot"></span>
          <span>Онлайн сейчас: <strong>{onlineCount}</strong> из <strong>{users.length}</strong></span>
        </div>
      </div>
      
      <div className="database-info">
        <span className="db-badge">PostgreSQL</span>
        <span className="db-badge">Реальные данные</span>
        <span className="db-badge">{users.length} пользователей</span>
      </div>
      
      <div className="users-grid">
        {users.length === 0 ? (
          <div className="no-users">
            <p>В базе данных пока нет пользователей</p>
            <button onClick={loadUsers} className="retry-btn">
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
                </h3>
                <p className="user-email">{user.email}</p>
                <p className="user-status">
                  {user.online ? '🟢 В сети' : '⚫ Не в сети'}
                  {user.last_active && (
                    <span className="last-active-time">
                      {' '}({formatDate(user.last_active)})
                    </span>
                  )}
                </p>
              </div>
              <div className="user-actions">
                <button className="invite-btn">
                  👋 Пригласить
                </button>
                {user.online && (
                  <button className="voice-btn">
                    🎧 Голос
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="users-footer">
        <button onClick={loadUsers} className="refresh-btn">
          🔄 Обновить список
        </button>
        {lastUpdate && (
          <p className="last-updated">
            Обновлено: {lastUpdate.toLocaleTimeString('ru-RU')}
          </p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
