import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { profileService } from '../services/api';
import VoiceChatButton from './VoiceChatButton';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('players');

  console.log('📊 Dashboard User:', user);

  useEffect(() => {
    if (user) {
      loadProfiles();
    }
  }, [user]);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      // Временные демо-данные пока нет бэкенда
      const demoProfiles = [
        {
          id: '2',
          nickname: 'ProPlayer',
          isOnline: true,
          overallRating: 4.8,
          playMode: 'competitive',
          age: 25,
          aboutMe: 'Ищу тиммейтов для ранговых игр. Играю серьезно!',
          games: ['CS2', 'Valorant']
        },
        {
          id: '3', 
          nickname: 'CasualGamer',
          isOnline: true,
          overallRating: 4.2,
          playMode: 'casual',
          age: 22,
          aboutMe: 'Играю для удовольствия, без токсичности',
          games: ['Dota 2', 'Minecraft']
        },
        {
          id: '4',
          nickname: 'StrategyMaster',
          isOnline: false,
          overallRating: 4.9,
          playMode: 'both',
          age: 28,
          aboutMe: 'Люблю стратегии и тактические игры',
          games: ['League of Legends', 'CS2']
        }
      ];
      
      // Фильтруем, чтобы не показывать текущего пользователя
      const filteredProfiles = demoProfiles.filter(profile => profile.id !== user.id);
      setProfiles(filteredProfiles);
      
    } catch (error) {
      console.error('Ошибка загрузки профилей:', error);
      // В случае ошибки используем демо-данные
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const handleGoToHomepage = () => {
    navigate('/');
  };

  const handleLogout = () => {
    logout();
  };

  const handleInviteClick = (profileId, profileName) => {
    alert(`Приглашение отправлено игроку: ${profileName}`);
    // Здесь будет реальный API вызов
  };

  const handleReviewClick = (profileId, profileName) => {
    alert(`Открытие формы отзыва для: ${profileName}`);
    // Здесь будет реальная форма отзыва
  };

  // Если пользователь не авторизован, этот компонент не должен показываться
  // из-за защиты маршрута в App.js
  if (!user) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white',
      padding: '20px',
      paddingTop: '80px'
    }}>
      
      {/* Шапка Dashboard */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px',
        padding: '20px',
        background: 'rgba(30, 30, 60, 0.7)',
        borderRadius: '15px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '28px' }}>
            🎮 Добро пожаловать, <span style={{ color: '#4e54c8' }}>{user.profile?.nickname || user.email}</span>!
          </h1>
          <p style={{ margin: '5px 0 0 0', color: '#b0b0d0' }}>
            {user.email} • ID: {user.id}
          </p>
        </div>
        
        {/* Кнопки управления */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleGoToHomepage}
            style={{
              padding: '10px 20px',
              background: 'rgba(78, 84, 200, 0.2)',
              color: '#4e54c8',
              border: '1px solid rgba(78, 84, 200, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(78, 84, 200, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(78, 84, 200, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🏠 На главную
          </button>
          <button
            onClick={handleLogout}
            style={{
              padding: '10px 20px',
              background: 'rgba(255, 107, 107, 0.2)',
              color: '#ff6b6b',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 107, 107, 0.3)';
              e.target.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 107, 107, 0.2)';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            🚪 Выйти
          </button>
        </div>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Боковая панель профиля */}
        <div style={{
          background: 'rgba(30, 30, 60, 0.7)',
          padding: '25px',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          height: 'fit-content'
        }}>
          <h3 style={{ marginTop: 0, color: '#4e54c8' }}>👤 Ваш профиль</h3>
          <div style={{ marginBottom: '20px' }}>
            <strong>Никнейм:</strong> {user.profile?.nickname || 'Не указан'}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Email:</strong> {user.email}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Режим игры:</strong> {user.profile?.playMode === 'both' ? 'Любой' : user.profile?.playMode || 'Не указан'}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Рейтинг:</strong> ⭐ {user.profile?.overallRating || 'Нет оценок'}
          </div>
          <div style={{ marginBottom: '20px' }}>
            <strong>Отзывов:</strong> {user.profile?.totalReviews || 0}
          </div>

          <button style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            marginTop: '20px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          >
            ✏️ Редактировать профиль
          </button>
        </div>

        {/* Основная область с контентом */}
        <div>
          {/* Панель поиска и фильтров */}
          <div style={{
            background: 'rgba(30, 30, 60, 0.7)',
            padding: '25px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            marginBottom: '20px'
          }}>
            <h3 style={{ marginTop: 0, color: '#4e54c8' }}>🎯 Поиск тиммейтов</h3>

            {/* Вкладки */}
            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <button
                onClick={() => setActiveTab('players')}
                style={{
                  padding: '10px 20px',
                  background: activeTab === 'players' ? 'rgba(78, 84, 200, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: activeTab === 'players' ? '1px solid rgba(78, 84, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                👥 Игроки
              </button>
              <button
                onClick={() => setActiveTab('teams')}
                style={{
                  padding: '10px 20px',
                  background: activeTab === 'teams' ? 'rgba(78, 84, 200, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: activeTab === 'teams' ? '1px solid rgba(78, 84, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🏆 Команды
              </button>
              <button
                onClick={() => setActiveTab('voice')}
                style={{
                  padding: '10px 20px',
                  background: activeTab === 'voice' ? 'rgba(78, 84, 200, 0.3)' : 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  border: activeTab === 'voice' ? '1px solid rgba(78, 84, 200, 0.5)' : '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                🎙️ Голосовые комнаты
              </button>
            </div>

            {/* Фильтры по играм */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {['Все игры', 'Dota 2', 'CS2', 'Valorant', 'League of Legends'].map((game) => (
                <button 
                  key={game}
                  style={{
                    padding: '8px 16px',
                    background: game === 'Все игры' ? 'rgba(78, 84, 200, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                    color: game === 'Все игры' ? '#4e54c8' : 'white',
                    border: game === 'Все игры' ? '1px solid rgba(78, 84, 200, 0.3)' : '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '20px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (game !== 'Все игры') {
                      e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (game !== 'Все игры') {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>

          {/* Контент вкладок */}
          {activeTab === 'players' && (
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h4 style={{ color: '#b0b0d0', margin: 0 }}>
                  🎮 Игроки онлайн ({profiles.length})
                </h4>
                <button
                  onClick={loadProfiles}
                  disabled={loading}
                  style={{
                    padding: '8px 16px',
                    background: loading ? '#666' : 'rgba(78, 84, 200, 0.2)',
                    color: loading ? '#999' : '#4e54c8',
                    border: '1px solid rgba(78, 84, 200, 0.3)',
                    borderRadius: '6px',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.background = 'rgba(78, 84, 200, 0.3)';
                      e.target.style.transform = 'translateY(-1px)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.background = 'rgba(78, 84, 200, 0.2)';
                      e.target.style.transform = 'translateY(0)';
                    }
                  }}
                >
                  {loading ? '⏳' : '🔄'} Обновить
                </button>
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#b0b0d0' }}>
                  Загрузка игроков...
                </div>
              ) : profiles.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {profiles.map(profile => (
                    <div key={profile.id} style={{
                      background: 'rgba(30, 30, 60, 0.7)',
                      padding: '20px',
                      borderRadius: '10px',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          marginBottom: '8px'
                        }}>
                          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            {profile.nickname}
                          </div>
                          {profile.isOnline && (
                            <div style={{
                              width: '8px',
                              height: '8px',
                              background: '#00ff88',
                              borderRadius: '50%',
                              animation: 'pulse 2s infinite'
                            }}></div>
                          )}
                        </div>
                        <div style={{ color: '#b0b0d0', fontSize: '14px', marginBottom: '5px' }}>
                          Рейтинг: ⭐ {profile.overallRating || 'Нет оценок'} •
                          Режим: {profile.playMode === 'both' ? 'Любой' : profile.playMode} •
                          Возраст: {profile.age || 'Не указан'}
                        </div>
                        <div style={{ color: '#b0b0d0', fontSize: '13px', marginBottom: '5px' }}>
                          Игры: {profile.games?.join(', ') || 'Не указаны'}
                        </div>
                        {profile.aboutMe && (
                          <div style={{ color: '#b0b0d0', fontSize: '13px', fontStyle: 'italic' }}>
                            "{profile.aboutMe}"
                          </div>
                        )}
                      </div>

                      {/* Кнопки действий */}
                      <div style={{ display: 'flex', gap: '8px', flexDirection: 'column' }}>
                        <button
                          onClick={() => handleInviteClick(profile.id, profile.nickname)}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(0, 255, 136, 0.1)',
                            color: '#00ff88',
                            border: '1px solid rgba(0, 255, 136, 0.3)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(0, 255, 136, 0.2)';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(0, 255, 136, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          🎯 Пригласить
                        </button>
                        <VoiceChatButton 
                          targetUserId={profile.id} 
                          targetUserName={profile.nickname}
                        />
                        <button
                          onClick={() => handleReviewClick(profile.id, profile.nickname)}
                          style={{
                            padding: '6px 12px',
                            background: 'rgba(255, 193, 7, 0.1)',
                            color: '#ffc107',
                            border: '1px solid rgba(255, 193, 7, 0.3)',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                            whiteSpace: 'nowrap',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255, 193, 7, 0.2)';
                            e.target.style.transform = 'translateY(-1px)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255, 193, 7, 0.1)';
                            e.target.style.transform = 'translateY(0)';
                          }}
                        >
                          ⭐ Оставить отзыв
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: '40px',
                  background: 'rgba(30, 30, 60, 0.7)',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#b0b0d0'
                }}>
                  🎯 Пока нет других игроков. Будь первым!
                </div>
              )}
            </div>
          )}

          {activeTab === 'teams' && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              background: 'rgba(30, 30, 60, 0.7)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#b0b0d0'
            }}>
              🏆 Система команд в разработке...
            </div>
          )}

          {activeTab === 'voice' && (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              background: 'rgba(30, 30, 60, 0.7)',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#b0b0d0'
            }}>
              🎙️ Голосовые комнаты в разработке...
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;