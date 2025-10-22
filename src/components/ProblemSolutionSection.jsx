import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const ProblemSolutionSection = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'var(--primary-dark)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Проблемы */}
        <div style={{ marginBottom: '80px' }}>
          <AnimatedIcon>
            <h2 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '40px',
              textAlign: 'center',
              color: '#ff6b6b'
            }}>
              ❌ Надоело искать тиммейтов на различных площадках и сервисах?
            </h2>
          </AnimatedIcon>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <AnimatedIcon delay={200}>
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>Тролли и токсики</h3>
                <p style={{ color: '#b0b0d0' }}>Каждая вторая игра с рандомами — это лотерея</p>
              </div>
            </AnimatedIcon>
            <AnimatedIcon delay={400}>
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>Играешь один</h3>
                <p style={{ color: '#b0b0d0' }}>Не знаешь, кто рядом с тобой играет в те же игры</p>
              </div>
            </AnimatedIcon>
            <AnimatedIcon delay={600}>
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#ff6b6b', marginBottom: '15px' }}>Часы поиска</h3>
                <p style={{ color: '#b0b0d0' }}>30 минут поиска в чатах ради одной игры</p>
              </div>
            </AnimatedIcon>
          </div>
        </div>

        {/* Решения */}
        <div>
          <AnimatedIcon delay={800}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '40px',
              textAlign: 'center',
              color: '#00ff88'
            }}>
              ✅ Как это решает SquadUp?
            </h2>
          </AnimatedIcon>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            <AnimatedIcon delay={1000}>
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#00ff88', marginBottom: '15px' }}>Рейтинг и отзывы</h3>
                <p style={{ color: '#b0b0d0' }}>Видишь реальную репутацию игрока до начала игры</p>
              </div>
            </AnimatedIcon>
            <AnimatedIcon delay={1200}>
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#00ff88', marginBottom: '15px' }}>Геопоиск</h3>
                <p style={{ color: '#b0b0d0' }}>Находишь тиммейтов в своем городе для игры с низким пингом и возможностью познакомиться лично</p>
              </div>
            </AnimatedIcon>
            <AnimatedIcon delay={1400}>
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(0, 255, 136, 0.3)',
                transition: 'transform 0.3s ease'
              }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
                 onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
                <h3 style={{ color: '#00ff88', marginBottom: '15px' }}>Мгновенный подбор</h3>
                <p style={{ color: '#b0b0d0' }}>2 клика — и ты уже в голосовом чате с новой командой</p>
              </div>
            </AnimatedIcon>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProblemSolutionSection;
