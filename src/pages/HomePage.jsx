import React, { useState } from 'react';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import ProblemSolutionSection from '../components/ProblemSolutionSection';
import InteractiveDemo from '../components/InteractiveDemo';
import SuccessStories from '../components/SuccessStories';
import OnboardingFlow from '../components/OnboardingFlow';
import AuthModal from '../components/AuthModal';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('register');
  const { user, login } = useAuth();

  const handleOpenAuth = (mode) => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    if (userData && userData.user) {
      login(userData.user);
    }
    setAuthModalOpen(false);
  };

  // Премиальный футер компонент
  const PremiumFooter = ({ isAuthenticated }) => (
    <footer style={{
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)',
      padding: '80px 0 30px 0',
      textAlign: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Фоновые элементы */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.05) 0%, transparent 50%)
        `,
        zIndex: 1
      }}></div>
      
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontSize: '2.5rem',
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          {isAuthenticated ? 'Готов к новым победам?' : 'Готов найти свою идеальную команду?'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            color: 'var(--text-secondary)',
            fontSize: '1.2rem',
            marginBottom: isAuthenticated ? '40px' : '10px',
            lineHeight: '1.6'
          }}
        >
          {isAuthenticated 
            ? 'Присоединяйся к тысячам геймеров, которые уже нашли свою идеальную команду'
            : 'Присоединяйся к нам'
          }
        </motion.p>

        {!isAuthenticated && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              color: 'var(--text-secondary)',
              fontSize: '1rem',
              marginBottom: '30px'
            }}
          >
            <strong>Без подписок. Бесплатно. Сейчас.</strong>
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{ 
            display: 'flex', 
            gap: '15px', 
            justifyContent: 'center', 
            flexWrap: 'wrap' 
          }}
        >
          {isAuthenticated ? (
            <>
              <button
                className="btn-primary"
                style={{
                  padding: '20px 40px',
                  fontSize: '1.2rem'
                }}
                onClick={() => window.location.reload()}
              >
                🎮 Начать играть
              </button>
              <button
                className="btn-secondary"
                style={{
                  padding: '20px 40px',
                  fontSize: '1.2rem'
                }}
                onClick={() => handleOpenAuth('login')}
              >
                👥 Поиск игроков
              </button>
            </>
          ) : (
            <button
              className="btn-primary"
              style={{
                padding: '20px 40px',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
              onClick={() => handleOpenAuth('register')}
            >
              🚀 Начать бесплатно
            </button>
          )}
        </motion.div>
        
        {/* Автор проекта */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            marginTop: '50px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}
        >
          project by <strong style={{ color: 'var(--primary-blue)' }}>AntAndr</strong>
        </motion.div>
      </div>
    </footer>
  );

  // Премиальный контент для авторизованных пользователей
  if (user) {
    return (
      <div style={{ 
        background: 'var(--primary-dark)',
        minHeight: '100vh'
      }}>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />

        {/* Улучшенная герой-секция для авторизованных */}
        <section style={{
          minHeight: '60vh',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
          paddingTop: '80px'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)
            `,
            zIndex: 1
          }}></div>

          <div className="container" style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
            >
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: 'bold',
                  marginBottom: '20px',
                  lineHeight: '1.2'
                }}
              >
                С возвращением, <span className="gradient-text">{user.profile?.nickname || 'игрок'}!</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                style={{
                  fontSize: 'clamp(1rem, 2vw, 1.3rem)',
                  color: 'var(--text-secondary)',
                  marginBottom: '40px',
                  lineHeight: '1.6'
                }}
              >
                Твоя идеальная команда ждет тебя. Найди проверенных тиммейтов, 
                <br />
                общайся в голосовом чате и покоряй новые вершины вместе!
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{
                  display: 'flex',
                  gap: '20px',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  marginBottom: '40px'
                }}
              >
                <button 
                  className="btn-primary" 
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '15px 30px'
                  }}
                  onClick={() => window.location.reload()}
                >
                  📊 Перейти в профиль
                </button>
                <button 
                  className="btn-secondary"
                  onClick={() => handleOpenAuth('login')}
                  style={{
                    padding: '15px 30px'
                  }}
                >
                  👥 Найти игроков
                </button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="glass"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 24px',
                  borderRadius: '50px'
                }}
              >
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: 'var(--success-green)',
                  animation: 'pulse 2s infinite'
                }}></div>
                <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
                  Статус: <strong style={{ color: 'var(--text-primary)' }}>Авторизован</strong> • 
                  Готов к поиску команды!
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Остальные секции с улучшенными анимациями */}
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <ProblemSolutionSection />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <InteractiveDemo />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <SuccessStories />
        </motion.div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
        >
          <OnboardingFlow onOpenAuth={handleOpenAuth} />
        </motion.div>

        <PremiumFooter isAuthenticated={true} />
      </div>
    );
  }

  // Стандартный лендинг для неавторизованных
  return (
    <div style={{ background: 'var(--primary-dark)' }}>
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />

      <HeroSection onOpenAuth={handleOpenAuth} />

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ProblemSolutionSection />
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <InteractiveDemo />
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <SuccessStories />
      </motion.div>

      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.3 }}
      >
        <OnboardingFlow onOpenAuth={handleOpenAuth} />
      </motion.div>

      <PremiumFooter isAuthenticated={false} />
    </div>
  );
};

export default HomePage;
