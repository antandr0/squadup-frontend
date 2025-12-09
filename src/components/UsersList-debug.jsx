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
      console.log('🔄 [UsersList] Запрашиваем пользователей из БД...');
      
      const response = await apiService.getAllProfiles();
      console.log('📨 [UsersList] Ответ от API:', response);
      
      if (response.success) {
        const dbUsers = response.users || [];
        console.log(`📊 [UsersList] Получено ${dbUsers.length} пользователей из БД`);
        
        // 🔍 ДЕТАЛЬНАЯ ОТЛАДКА
        if (dbUsers.length > 0) {
          console.log('🔍 [UsersList] Детальная информация о пользователях:');
          dbUsers.forEach((user, index) => {
            console.log(`   ${index + 1}. ${user.nickname || user.email}:`);
            console.log(`      - ID: ${user.id}`);
            console.log(`      - Online (boolean): ${user.online}`);
            console.log(`      - Online (typeof): ${typeof user.online}`);
            console.log(`      - Online (!!): ${!!user.online}`);
            console.log(`      - Last active: ${user.last_active}`);
            console.log(`      - CSS class будет: ${user.online ? 'online' : 'offline'}`);
          });
        }
        
        // Подсчитываем онлайн правильно
        const actualOnlineCount = dbUsers.filter(user => user.online === true).length;
        console.log(`🟢 [UsersList] Реальных онлайн: ${actualOnlineCount}, из API: ${response.online_count}`);
        
        setUsers(dbUsers);
        setOnlineCount(actualOnlineCount); // Используем наш подсчет
        setLastUpdate(new Date());
        setError(null);
      } else {
        const errorMsg = response.error || 'Ошибка загрузки из базы данных';
        console.error('❌ [UsersList] Ошибка от API:', errorMsg);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('❌ [UsersList] Ошибка загрузки:', err);
      setError('Не удалось подключиться к серверу. Проверьте консоль для деталей.');
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
        <p className="loading-sub">Откройте консоль (F12) для отладки</p>
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
        <p className="error-info">
          Откройте консоль браузера (F12 → Console) для детальной информации
        </p>
      </div>
    );
  }

  return (
    <div className="users-list">
      <div className="users-header">
        <h2>👥 Игроки в системе (отладка)</h2>
        <div className="online-counter">
          <span className="online-dot"></span>
          <span>Онлайн сейчас: <strong>{onlineCount}</strong> из <strong>{users.length}</strong></span>
        </div>
      </div>
      
      <div className="database-info">
        <span className="db-badge">PostgreSQL</span>
        <span className="db-badge">Отладка включена</span>
        <span className="db-badge">Обновлено: {lastUpdate ? lastUpdate.toLocaleTimeString('ru-RU') : '--:--'}</span>
      </div>
      
      <div className="debug-info">
        <p>📊 Всего пользователей: {users.length} | 🟢 Онлайн: {onlineCount} | ⚫ Оффлайн: {users.length - onlineCount}</p>
        <p>🔍 Откройте консоль (F12) для детальной информации о каждом пользователе</p>
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
          users.map((user) => {
            // Правильно определяем онлайн статус
            const isOnline = user.online === true;
            
            return (
              <div key={user.id} className={`user-card ${isOnline ? 'online' : 'offline'}`}>
                <div className={`user-avatar ${isOnline ? 'avatar-online' : 'avatar-offline'}`}>
                  {getUserAvatar(user.nickname)}
                  <div className="avatar-status">
                    {isOnline ? '🟢' : '⚫'}
                  </div>
                </div>
                <div className="user-info">
                  <h3 className="user-name">
                    {getUserDisplayName(user)}
                    {isOnline && <span className="live-badge">LIVE</span>}
                    <span className="debug-id">ID: {user.id}</span>
                  </h3>
                  <p className="user-email">{user.email}</p>
                  <p className="user-status">
                    {isOnline ? '🟢 В сети сейчас' : '⚫ Не в сети'}
                    <span className="debug-field">
                      (online={user.online?.toString()})
                    </span>
                  </p>
                  {user.last_active && (
                    <p className="user-last-active">
                      <small>Последняя активность: {formatDate(user.last_active)}</small>
                    </p>
                  )}
                  <p className="user-registered">
                    <small>Зарегистрирован: {new Date(user.created_at).toLocaleDateString('ru-RU')}</small>
                  </p>
                </div>
                <div className="user-actions">
                  <button className="invite-btn">
                    👋 Пригласить
                  </button>
                  {isOnline && (
                    <button className="voice-btn">
                      🎧 Голос
                    </button>
                  )}
                  <button 
                    className="debug-btn"
                    onClick={() => console.log('🔍 Детали пользователя:', user)}
                    title="Показать в консоли"
                  >
                    🔍
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      
      <div className="users-footer">
        <div className="footer-actions">
          <button onClick={loadUsers} className="refresh-btn">
            🔄 Обновить список
          </button>
          <button 
            className="test-api-btn"
            onClick={() => {
              console.log('🧪 Тестируем API напрямую...');
              fetch('https://squadup-backend-03vr.onrender.com/api/profiles/all')
                .then(res => res.json())
                .then(data => console.log('📨 Прямой ответ от API:', data))
                .catch(err => console.error('❌ Ошибка:', err));
            }}
          >
            🧪 Тест API
          </button>
        </div>
        <div className="footer-info">
          <p className="last-updated">
            Данные из PostgreSQL | {users.length} пользователей
          </p>
          <p className="debug-hint">
            💡 Для отладки откройте консоль (F12 → Console)
          </p>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
