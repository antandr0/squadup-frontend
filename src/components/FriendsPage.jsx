import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './FriendsPage.css';

const FriendsPage = () => {
  const { token, user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [incomingRequests, setIncomingRequests] = useState([]);
  const [outgoingRequests, setOutgoingRequests] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('friends'); // 'friends', 'incoming', 'outgoing', 'search'
  const [message, setMessage] = useState({ text: '', type: '' });

  // ✅ ИСПРАВЛЕНО: убраны пробелы, fallback без пробелов
  const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() || 'https://squadup-backend-03vr.onrender.com';

  console.log('🔧 FriendsPage: API_BASE_URL =', `"${API_BASE_URL}"`);
  console.log('🔧 FriendsPage: token =', token ? '✅ present' : '❌ null/undefined');

  // Загружаем данные
  const loadData = async () => {
    if (!token) {
      console.warn('❗ FriendsPage: токен отсутствует — пропускаем загрузку');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const headers = { Authorization: `Bearer ${token}` };
      console.log('📡 FriendsPage: запрос к', `${API_BASE_URL}/api/friends/list`);

      // Загружаем друзей
      const friendsRes = await fetch(`${API_BASE_URL}/api/friends/list`, { headers });
      if (friendsRes.ok) {
        const data = await friendsRes.json();
        console.log('✅ Friends list loaded:', data.count, 'friends');
        setFriends(data.friends || []);
      } else {
        const err = await friendsRes.json();
        console.error('❌ Ошибка загрузки друзей:', err);
      }

      // Входящие запросы
      const incRes = await fetch(`${API_BASE_URL}/api/friends/incoming-requests`, { headers });
      if (incRes.ok) {
        const data = await incRes.json();
        console.log('📥 Incoming requests loaded:', data.count);
        setIncomingRequests(data.requests || []);
      } else {
        const err = await incRes.json();
        console.error('❌ Ошибка входящих запросов:', err);
      }

      // Исходящие запросы
      const outRes = await fetch(`${API_BASE_URL}/api/friends/outgoing-requests`, { headers });
      if (outRes.ok) {
        const data = await outRes.json();
        console.log('📤 Outgoing requests loaded:', data.count);
        setOutgoingRequests(data.requests || []);
      } else {
        const err = await outRes.json();
        console.error('❌ Ошибка исходящих запросов:', err);
      }
    } catch (error) {
      console.error('💥 FriendsPage fetch error:', error.message || error);
      showMessage('Ошибка загрузки данных', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: '', type: '' }), 3000);
  };

  useEffect(() => {
    console.log('🔍 FriendsPage mounted. Token:', token ? token.substring(0, 15) + '...' : '❌ null');
    loadData();
  }, [token]);

  // Если нет токена — показываем заглушку
  if (!token) {
    return (
      <div className="friends-page">
        <div className="friends-header">
          <h1>👥 Друзья</h1>
          <p>Для работы с друзьями необходимо авторизоваться</p>
        </div>
      </div>
    );
  }

  return (
    <div className="friends-page">
      {message.text && (
        <div className={`message ${message.type}`}>{message.text}</div>
      )}
      <div className="friends-header">
        <h1>👥 Друзья</h1>
        <p>Управляйте списком друзей и приглашайте их в команду</p>
      </div>
      <div className="friends-content">
        <div className="friends-actions">
          <div className="tabs">
            <button className={`tab ${activeTab === 'friends' ? 'active' : ''}`} onClick={() => setActiveTab('friends')}>
              Друзья ({friends.length})
            </button>
            <button className={`tab ${activeTab === 'incoming' ? 'active' : ''}`} onClick={() => setActiveTab('incoming')}>
              Входящие ({incomingRequests.length})
            </button>
            <button className={`tab ${activeTab === 'outgoing' ? 'active' : ''}`} onClick={() => setActiveTab('outgoing')}>
              Исходящие ({outgoingRequests.length})
            </button>
          </div>
          <div className="search-container">
            <input
              type="text"
              placeholder="Поиск пользователей..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn-primary" onClick={() => {
              if (searchQuery.trim().length >= 2) {
                (async () => {
                  try {
                    const url = `${API_BASE_URL}/api/friends/search?query=${encodeURIComponent(searchQuery)}`;
                    console.log('🔍 Search request:', url);
                    const res = await fetch(url, {
                      headers: { Authorization: `Bearer ${token}` }
                    });
                    if (res.ok) {
                      const data = await res.json();
                      console.log('🔍 Search result:', data.count, 'users');
                      setSearchResults(data.users || []);
                      setActiveTab('search');
                    } else {
                      const err = await res.json();
                      console.error('❌ Search error:', err);
                      showMessage(err.error || 'Ошибка поиска', 'error');
                    }
                  } catch (e) {
                    console.error('💥 Search fetch error:', e);
                    showMessage('Ошибка поиска', 'error');
                  }
                })();
              } else {
                showMessage('Введите минимум 2 символа', 'warning');
              }
            }}>🔍 Найти</button>
          </div>
        </div>

        <div className="friends-list">
          {loading ? (
            <div className="loading">Загрузка данных...</div>
          ) : (
            <>
              {activeTab === 'friends' && (
                <div className="section-title">Мои друзья ({friends.length})</div>
              )}
              {activeTab === 'incoming' && (
                <div className="section-title">Входящие ({incomingRequests.length})</div>
              )}
              {activeTab === 'outgoing' && (
                <div className="section-title">Исходящие ({outgoingRequests.length})</div>
              )}
              {activeTab === 'search' && (
                <div className="section-title">Результаты поиска: "{searchQuery}"</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendsPage;
