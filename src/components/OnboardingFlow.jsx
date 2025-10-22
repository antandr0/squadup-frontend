import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const OnboardingFlow = ({ onOpenAuth }) => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        
        <AnimatedIcon>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '60px',
            background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Начни за 3 простых шага
          </h2>
        </AnimatedIcon>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          marginBottom: '50px',
          textAlign: 'left'
        }}>
          
          {/* Шаг 1 */}
          <AnimatedIcon delay={200}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '15px',
                color: '#00ff88'
              }}>1</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
                Вход через Steam/VK
              </h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                Автоматически импортируем твои игры и статистику
              </p>
            </div>
          </AnimatedIcon>

          {/* Шаг 2 */}
          <AnimatedIcon delay={400}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '15px',
                color: '#4e54c8'
              }}>2</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
                Расскажи о себе
              </h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                поделись информацией о себе и твой профиль готов
              </p>
            </div>
          </AnimatedIcon>

          {/* Шаг 3 */}
          <AnimatedIcon delay={600}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '2rem',
                marginBottom: '15px',
                color: '#8a2be2'
              }}>3</div>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'white' }}>
                Найди команду
              </h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                Смотри кто играет рядом и приглашай будущих друзей
              </p>
            </div>
          </AnimatedIcon>

        </div>

        <AnimatedIcon delay={800}>
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
                marginBottom: '15px',
                transition: 'transform 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🚀 Начать играть
            </button>
            <p style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>
              Без подписок. Бесплатно. Сейчас.
            </p>
          </div>
        </AnimatedIcon>

        <AnimatedIcon delay={1000}>
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
        </AnimatedIcon>

        <AnimatedIcon delay={1200}>
          <div style={{ 
            marginTop: '40px', 
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <p style={{ color: '#666', fontSize: '0.8rem' }}>
              project by AntAndr
            </p>
          </div>
        </AnimatedIcon>

      </div>
    </section>
  );
};

export default OnboardingFlow;
