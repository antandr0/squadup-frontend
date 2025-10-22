import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { apiService } from '../services/api';

const EnhancedDashboard = () => {
  const { user, isDemoMode, updateUserProfile } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    setLoading(true);
    try {
      const data = await apiService.getProfiles();
      setProfiles(Array.isArray(data) ? data : data?.profiles || []);
    } catch (error) {
      console.error('Failed to load profiles:', error);
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const result = await apiService.updateProfile(profileData);
      if (result.success) {
        updateUserProfile(profileData);
        alert('✅ Профиль успешно обновлен!');
      }
    } catch (error) {
      console.error('Profile update failed:', error);
      alert('❌ Ошибка обновления профиля');
    }
  };

  const handleInvite = (profileId) => {
    const player = profiles.find(p => p.id === profileId);
    alert(`🤝 Приглашение отправлено игроку ${player?.nickname || profileId}`);
  };

  return (
    <div style={styles.container}>
      {isDemoMode && (
        <div style={styles.demoBanner}>
          🚧 Демо-режим: Используются тестовые данные
        </div>
      )}
      
      <div style={styles.header}>
        <h1 style={styles.title}>Личный кабинет</h1>
        <div style={styles.userInfo}>
          <span style={styles.welcome}>Добро пожаловать, {user?.profile?.nickname || user?.email}!</span>
          <div style={styles.rating}>
            ⭐ Рейтинг: {user?.profile?.overallRating || 0}/5.0
          </div>
        </div>
      </div>

      <div style={styles.tabs}>
        <button 
          style={{...styles.tab, ...(activeTab === 'profile' && styles.activeTab)}}
          onClick={() => setActiveTab('profile')}
        >
          👤 Мой профиль
        </button>
        <button 
          style={{...styles.tab, ...(activeTab === 'teammates' && styles.activeTab)}}
          onClick={() => setActiveTab('teammates')}
        >
          🎮 Найти тиммейтов
        </button>
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'profile' && <ProfileTab user={user} onUpdate={updateProfile} />}
        {activeTab === 'teammates' && (
          <TeammatesTab 
            profiles={profiles} 
            loading={loading}
            onInvite={handleInvite}
            isDemo={isDemoMode}
          />
        )}
      </div>
    </div>
  );
};

// Компонент вкладки профиля
const ProfileTab = ({ user, onUpdate }) => {
  const [formData, setFormData] = useState({
    nickname: user?.profile?.nickname || '',
    playMode: user?.profile?.playMode || 'both',
    age: user?.profile?.age || '',
    aboutMe: user?.profile?.aboutMe || '',
    games: user?.profile?.games?.join(', ') || '',
    location: user?.profile?.location || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      ...formData,
      games: formData.games.split(',').map(game => game.trim()).filter(Boolean)
    });
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div style={styles.profileTab}>
      <h3>Настройки профиля</h3>
      <form onSubmit={handleSubmit} style={styles.profileCard}>
        <div style={styles.field}>
          <label style={styles.label}>Никнейм:</label>
          <input 
            value={formData.nickname}
            onChange={(e) => handleChange('nickname', e.target.value)}
            style={styles.input}
            placeholder="Введите ваш игровой никнейм"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Стиль игры:</label>
          <select 
            value={formData.playMode}
            onChange={(e) => handleChange('playMode', e.target.value)}
            style={styles.select}
          >
            <option value="casual">🎮 Казуальная игра</option>
            <option value="competitive">🏆 Ранковый режим</option>
            <option value="both">⚡ Оба варианта</option>
          </select>
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Возраст:</label>
          <input 
            type="number"
            value={formData.age}
            onChange={(e) => handleChange('age', e.target.value)}
            style={styles.input}
            placeholder="Ваш возраст"
            min="16"
            max="60"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Игры:</label>
          <input 
            value={formData.games}
            onChange={(e) => handleChange('games', e.target.value)}
            style={styles.input}
            placeholder="Dota 2, CS:GO, Valorant..."
          />
          <small style={styles.hint}>Перечислите игры через запятую</small>
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Город:</label>
          <input 
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            style={styles.input}
            placeholder="Ваш город"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>О себе:</label>
          <textarea 
            value={formData.aboutMe}
            onChange={(e) => handleChange('aboutMe', e.target.value)}
            style={styles.textarea}
            rows="4"
            placeholder="Расскажите о себе, вашем стиле игры, предпочтениях..."
          />
        </div>
        
        <button type="submit" style={styles.saveButton}>
          💾 Сохранить изменения
        </button>
      </form>
    </div>
  );
};

// Компонент вкладки поиска тиммейтов
const TeammatesTab = ({ profiles, loading, onInvite, isDemo }) => {
  return (
    <div style={styles.teammatesTab}>
      <h3>Найди свою команду</h3>
      
      {isDemo && (
        <div style={styles.demoHint}>
          🔍 В демо-режиме показаны тестовые профили
        </div>
      )}

      {loading ? (
        <div style={styles.loading}>
          <div style={styles.spinner}>⏳</div>
          Загрузка игроков...
        </div>
      ) : (
        <div style={styles.profilesGrid}>
          {profiles.map(profile => (
            <div key={profile.id} style={styles.profileCard}>
              <div style={styles.profileHeader}>
                <h4 style={styles.nickname}>{profile.nickname}</h4>
                <span style={styles.status}>
                  {profile.isOnline ? '🟢 Онлайн' : '🔴 Офлайн'}
                </span>
              </div>
              
              <div style={styles.profileDetails}>
                <div style={styles.rating}>⭐ {profile.overallRating}/5.0</div>
                <div style={styles.playMode}>🎯 {getPlayModeText(profile.playMode)}</div>
                <div style={styles.age}>🎂 {profile.age} лет</div>
                <div style={styles.location}>🌍 {profile.location}</div>
                {profile.games && (
                  <div style={styles.games}>🎮 {Array.isArray(profile.games) ? profile.games.join(', ') : profile.games}</div>
                )}
              </div>
              
              <div style={styles.about}>{profile.aboutMe}</div>
              
              <button 
                onClick={() => onInvite(profile.id)}
                style={styles.inviteButton}
                disabled={!profile.isOnline}
              >
                {profile.isOnline ? '🤝 Пригласить в команду' : '🔴 Не в сети'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const getPlayModeText = (mode) => {
  const modes = {
    casual: '🎮 Казуальная игра',
    competitive: '🏆 Ранковый режим', 
    both: '⚡ Любой режим'
  };
  return modes[mode] || mode;
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    color: '#ffffff',
    minHeight: '80vh'
  },
  demoBanner: {
    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
    padding: '12px 20px',
    borderRadius: '8px',
    textAlign: 'center',
    marginBottom: '20px',
    fontWeight: 'bold',
    fontSize: '14px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '20px'
  },
  title: {
    background: 'linear-gradient(135deg, #4e54c8, #8a2be2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    fontSize: '2.5rem',
    margin: 0
  },
  userInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: '5px'
  },
  welcome: {
    fontSize: '1.1rem',
    color: '#b0b0d0'
  },
  rating: {
    background: 'rgba(78, 84, 200, 0.2)',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '14px',
    border: '1px solid #4e54c8'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '2px solid #2a2a4a'
  },
  tab: {
    background: 'none',
    border: 'none',
    padding: '12px 24px',
    color: '#b0b0d0',
    cursor: 'pointer',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s ease',
    fontSize: '14px'
  },
  activeTab: {
    background: '#4e54c8',
    color: '#ffffff'
  },
  tabContent: {
    background: 'rgba(15, 15, 35, 0.6)',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid #2a2a4a'
  },
  profileCard: {
    background: 'rgba(26, 26, 46, 0.8)',
    padding: '25px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a'
  },
  field: {
    marginBottom: '20px'
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#b0b0d0',
    fontWeight: '500'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a2e',
    border: '1px solid #4e54c8',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px'
  },
  select: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a2e',
    border: '1px solid #4e54c8',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px'
  },
  textarea: {
    width: '100%',
    padding: '12px 16px',
    background: '#1a1a2e',
    border: '1px solid #4e54c8',
    borderRadius: '8px',
    color: '#ffffff',
    fontSize: '14px',
    resize: 'vertical'
  },
  hint: {
    color: '#8a8aaa',
    fontSize: '12px',
    marginTop: '5px'
  },
  saveButton: {
    background: 'linear-gradient(135deg, #4e54c8, #8a2be2)',
    color: '#ffffff',
    border: 'none',
    padding: '14px 30px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: 'bold',
    width: '100%',
    marginTop: '10px'
  },
  demoHint: {
    background: 'rgba(138, 43, 226, 0.2)',
    border: '1px solid #8a2be2',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center'
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    color: '#b0b0d0'
  },
  spinner: {
    fontSize: '24px',
    marginBottom: '10px'
  },
  profilesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  profileCard: {
    background: 'rgba(26, 26, 46, 0.8)',
    padding: '20px',
    borderRadius: '12px',
    border: '1px solid #2a2a4a'
  },
  profileHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  nickname: {
    margin: 0,
    color: '#ffffff',
    fontSize: '18px'
  },
  status: {
    fontSize: '12px',
    padding: '4px 8px',
    borderRadius: '12px',
    background: 'rgba(0, 255, 136, 0.1)',
    border: '1px solid #00ff88'
  },
  profileDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '8px',
    marginBottom: '15px',
    fontSize: '13px'
  },
  rating: { color: '#ffd700' },
  playMode: { color: '#4e54c8' },
  age: { color: '#8a2be2' },
  location: { color: '#00ff88' },
  games: {
    gridColumn: '1 / -1',
    color: '#b0b0d0',
    fontSize: '12px'
  },
  about: {
    color: '#b0b0d0',
    fontSize: '14px',
    lineHeight: '1.4',
    marginBottom: '15px'
  },
  inviteButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #00ff88, #00cc66)',
    color: '#0f0f23',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 'bold'
  }
};

export default EnhancedDashboard;
