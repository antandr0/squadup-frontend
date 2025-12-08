import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../services/api';
import './UsersList.css';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [onlineCount, setOnlineCount] = useState(0);

  useEffect(() => {
    loadUsers();
    
    // Обновляем список каждые 30 секунд
    const intervalId = setInterval(() => {
      loadUsers();
    }, 30000);
    
    return () => clearInterval(intervalId);
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await getAllUsers();
      
      if (response.success) {
        setUsers(response.users);
        setOnlineCount(response.online_count || 0);
      } else {
        setError(response.error || 'Ошибка загрузки пользователей');
      }
    } catch (err) {
      setError('Не удалось загрузить пользователей. Проверьте подключение к серверу.');
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Неизвестно';
    const date = new Date(dateString);
    return date.toLocaleString('ru-RU');
  };

  const getStatusText = (online, lastActive) => {
    if (online) return '🟢 В сети';
    
    if (lastActive) {
      const lastActiveDate = new Date(lastActive);
      const diffMinutes = Math.floor((Date.now() - lastActiveDate.getTime()) / (1000 * 60));
      
      if (diffMinutes < 60) return `⚫ Был(а) в сети ${diffMinutes} мин назад`;
      if (diffMinutes < 1440) return `⚫ Был(а) в сети ${Math.floor(diffMinutes / 60)} ч назад`;
      return `⚫ Был(а) в сети ${Math.floor(diffMinutes / 1440)} дн назад`;
    }
    
    return '⚫ Не в сети';
  };

  if (loading && users.length === 0) {
    return (
      <div className="users-list loading">
        <div className="spinner"></div>
        <p>Загрузка пользователей...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-list error">
        <p>{error}</p>
        <button onClick={loadUsers} className="retry-btn">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="users-list">
      <div className="users-header">
        <h2>👥 Игроки онлайн</h2>
        <div className="online-counter">
          <span className="online-dot"></span>
          <span>Онлайн: {onlineCount} из {users.length}</span>
        </div>
      </div>
      
      <div className="users-grid">
        {users.length === 0 ? (
          <div className="no-users">
            <p>Пользователи не найдены</p>
            <button onClick={loadUsers} className="retry-btn">
              Обновить
            </button>
          </div>
        ) : (
          users.map((user) => (
            <div key={user.id} className={`user-card ${user.online ? 'online' : 'offline'}`}>
              <div className="user-avatar">
                {user.nickname ? user.nickname.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-info">
                <h3 className="user-name">
                  {user.nickname || 'Без имени'}
                  {user.online && <span className="live-badge">LIVE</span>}
                </h3>
                <p className="user-email">{user.email}</p>
                <p className="user-status">
                  {getStatusText(user.online, user.last_active)}
                </p>
                {user.last_active && (
                  <p className="user-last-active">
                    Последняя активность: {formatDate(user.last_active)}
                  </p>
                )}
              </div>
              <div className="user-actions">
                <button className="invite-btn">
                  Пригласить
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="users-footer">
        <button onClick={loadUsers} className="refresh-btn">
          🔄 Обновить список
        </button>
        <p className="last-updated">
          Обновлено: {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};

export default UsersList;
