import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './EnhancedDashboard.css';

const EnhancedDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('teammates');
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Здесь будет загрузка реальных данных
    setTimeout(() => {
      setProfiles([]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleInvite = (profileId) => {
    console.log('Inviting:', profileId);
    // Реальная логика приглашения
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Ваша игровая команда</h1>
        {user && (
          <div style={styles.userInfo}>
            <span>Добро пожаловать, {user.nickname || user.email}!</span>
          </div>
        )}
      </div>

      <div style={styles.tabContainer}>
        <button 
          style={{ 
            ...styles.tab, 
            ...(activeTab === 'teammates' ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab('teammates')}
        >
          👥 Поиск тиммейтов
        </button>
        <button 
          style={{ 
            ...styles.tab, 
            ...(activeTab === 'profile' ? styles.activeTab : {}) 
          }}
          onClick={() => setActiveTab('profile')}
        >
          ⚙️ Настройки профиля
        </button>
      </div>

      <div style={styles.tabContent}>
        {activeTab === 'teammates' && (
          <TeammatesTab 
            profiles={profiles} 
            loading={loading}
            onInvite={handleInvite}
          />
        )}
        
        {activeTab === 'profile' && (
          <ProfileTab user={user} />
        )}
      </div>
    </div>
  );
};

const TeammatesTab = ({ profiles, loading, onInvite }) => {
  if (loading) {
    return <div style={styles.loading}>Загрузка профилей...</div>;
  }

  if (profiles.length === 0) {
    return (
      <div style={styles.emptyState}>
        <h3>Начните поиск тиммейтов!</h3>
        <p>Используйте фильтры чтобы найти игроков с похожими навыками и расписанием</p>
        <div style={styles.placeholderProfiles}>
          <div style={styles.placeholderCard}>
            <div style={styles.placeholderAvatar}></div>
            <div style={styles.placeholderText}></div>
            <div style={styles.placeholderButton}></div>
          </div>
          <div style={styles.placeholderCard}>
            <div style={styles.placeholderAvatar}></div>
            <div style={styles.placeholderText}></div>
            <div style={styles.placeholderButton}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.profilesGrid}>
      {profiles.map(profile => (
        <div key={profile.id} style={styles.profileCard}>
          <div style={styles.profileHeader}>
            <div style={styles.avatar}>
              {profile.nickname?.charAt(0).toUpperCase()}
            </div>
            <div style={styles.profileInfo}>
              <h4 style={styles.nickname}>{profile.nickname}</h4>
              <span style={styles.game}>{profile.game}</span>
            </div>
          </div>
          <button 
            style={styles.inviteButton}
            onClick={() => onInvite(profile.id)}
          >
            Пригласить
          </button>
        </div>
      ))}
    </div>
  );
};

const ProfileTab = ({ user }) => {
  return (
    <div style={styles.profileTab}>
      <h3>Ваш профиль</h3>
      {user ? (
        <div style={styles.profileInfo}>
          <p><strong>Никнейм:</strong> {user.nickname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>
      ) : (
        <p>Загрузка данных профиля...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    minHeight: '400px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px'
  },
  title: {
    fontSize: '2rem',
    background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    margin: 0
  },
  userInfo: {
    color: '#b0b0d0'
  },
  tabContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
    paddingBottom: '10px'
  },
  tab: {
    background: 'none',
    border: 'none',
    color: '#b0b0d0',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  },
  activeTab: {
    background: 'rgba(78, 84, 200, 0.2)',
    color: '#4e54c8',
    border: '1px solid rgba(78, 84, 200, 0.5)'
  },
  tabContent: {
    minHeight: '300px'
  },
  loading: {
    textAlign: 'center',
    color: '#b0b0d0',
    fontSize: '1.2rem',
    padding: '50px'
  },
  emptyState: {
    textAlign: 'center',
    color: '#b0b0d0'
  },
  placeholderProfiles: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    marginTop: '30px'
  },
  placeholderCard: {
    width: '200px',
    height: '150px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px'
  },
  placeholderAvatar: {
    width: '50px',
    height: '50px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%'
  },
  placeholderText: {
    width: '100%',
    height: '20px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '4px'
  },
  placeholderButton: {
    width: '80%',
    height: '30px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '6px'
  },
  profilesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  },
  profileCard: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.1)',
    transition: 'transform 0.3s ease'
  },
  profileHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '15px'
  },
  avatar: {
    width: '50px',
    height: '50px',
    background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    color: 'white',
    fontSize: '1.2rem'
  },
  profileInfo: {
    flex: 1
  },
  nickname: {
    margin: '0 0 5px 0',
    fontSize: '1.1rem'
  },
  game: {
    color: '#b0b0d0',
    fontSize: '0.9rem'
  },
  inviteButton: {
    width: '100%',
    background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
    color: 'white',
    border: 'none',
    padding: '10px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'transform 0.2s ease'
  },
  profileTab: {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '12px',
    padding: '30px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  profileInfo: {
    color: '#b0b0d0',
    lineHeight: '1.6'
  }
};

export default EnhancedDashboard;
