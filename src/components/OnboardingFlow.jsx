import React from 'react';

const OnboardingFlow = ({ onOpenAuth }) => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        <h2 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '60px',
          background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Начни за 3 простых шага
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
          textAlign: 'left'
        }}>
          
          {/* Шаг 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '15px',
              color: '#00ff88'
            }}>✓</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
              Вход через Steam/VK
            </h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              Автоматически импортируем твои игры и статистику
            </p>
          </div>

          {/* Шаг 2 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '15px',
              color: '#4e54c8'
            }}>2</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
              Расскажи о себе
            </h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              30 секунд - и твой профиль готов
            </p>
          </div>

          {/* Шаг 3 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '2rem',
              marginBottom: '15px',
              color: '#8a2be2'
            }}>3</div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
              Найди команду
            </h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              Смотри кто играет рядом и приглашай
            </p>
          </div>

        </div>

        <div style={{ marginBottom: '30px' }}>
          <button
            onClick={() => onOpenAuth('register')}
            style={{
              background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '25px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            🚀 Начать играть
          </button>
          <p style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
            Без подписок. Бесплатно. Сейчас.
          </p>
        </div>

        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '30px',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '500px',
          margin: '0 auto'
        }}>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '15px',
            color: 'white'
          }}>
            Готов найти свою идеальную команду?
          </h3>
          <p style={{ 
            color: '#b0b0d0', 
            marginBottom: '20px',
            fontSize: '1.1rem'
          }}>
            Присоединяйся к нам
          </p>
          <p style={{ 
            color: '#00ff88', 
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}>
            Без подписок. Бесплатно. Сейчас.
          </p>
        </div>

        <div style={{ 
          marginTop: '40px', 
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <p style={{ color: '#666', fontSize: '0.8rem' }}>
            project by AntAndr
          </p>
        </div>

      </div>
    </section>
  );
};

export default OnboardingFlow;
