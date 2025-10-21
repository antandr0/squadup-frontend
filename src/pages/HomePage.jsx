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

  console.log('🏠 HomePage State:', { user });

  const handleOpenAuth = (mode) => {
    console.log('🎯 Открытие модалки авторизации:', mode);
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    console.log('✅ Успешная аутентификация:', userData);
    
    if (userData && userData.user) {
      login(userData.user);
    }
    
    setAuthModalOpen(false);
    console.log('🔄 Интерфейс должен обновиться автоматически');
  };

  // Если пользователь авторизован, показываем улучшенный лендинг
  if (user) {
    return (
      <div style={{ 
        background: 'var(--primary-dark)',
        minHeight: '100vh',
        paddingTop: '80px'
      }}>
        <AuthModal
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          onSuccess={handleAuthSuccess}
          initialMode={authMode}
        />

        {/* Герой-секция для авторизованных пользователей */}
        <section style={{
          minHeight: '60vh',
          background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
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
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  padding: '10px 20px',
                  borderRadius: '50px',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <div style={{
                  width: '8px',
                  height: '8px',
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

        {/* Остальные секции лендинга */}
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

        {/* Футер для авторизованных пользователей */}
        <footer style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)',
          padding: '80px 0 30px 0',
          textAlign: 'center',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '20px'
            }}>
              Готов к новым победам?
            </h2>
            <p style={{
              color: 'var(--text-secondary)',
              fontSize: '1.2rem',
              marginBottom: '40px'
            }}>
              Присоединяйся к тысячам геймеров, которые уже нашли свою идеальную команду
            </p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
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
            </div>
            
            {/* Автор проекта */}
            <div style={{
              marginTop: '50px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-secondary)',
              fontSize: '14px'
            }}>
              project by <strong style={{ color: 'var(--primary-blue)' }}>AntAndr</strong>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Стандартный лендинг для неавторизованных пользователей
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

      {/* Футер для неавторизованных пользователей */}
      <footer style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f0f23 100%)',
        padding: '80px 0 30px 0',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}>
        <div className="container">
          <h2 style={{
            fontSize: '2.5rem',
            marginBottom: '20px'
          }}>
            Готов найти свою идеальную команду?
          </h2>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1.2rem',
            marginBottom: '10px'
          }}>
            Присоединяйся к нам
          </p>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: '1rem',
            marginBottom: '30px'
          }}>
            <strong>Без подписок. Бесплатно. Сейчас.</strong>
          </p>
          
          {/* Автор проекта */}
          <div style={{
            marginTop: '50px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}>
            project by <strong style={{ color: 'var(--primary-blue)' }}>AntAndr</strong>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;