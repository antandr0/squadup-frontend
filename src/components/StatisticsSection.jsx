import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const StatisticsSection = () => {
  return (
    <section style={{
      padding: '60px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedIcon>
          <h3 style={{ 
            fontSize: '1.5rem', 
            marginBottom: '40px',
            color: '#b0b0d0'
          }}>
            Прямо сейчас 72 геймера ищут команду
          </h3>
        </AnimatedIcon>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          alignItems: 'center'
        }}>
          <AnimatedIcon delay={200}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                237
              </div>
              <div style={{ color: '#b0b0d0' }}>игроков, зато каких!</div>
            </div>
          </AnimatedIcon>
          <AnimatedIcon delay={400}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                50+
              </div>
              <div style={{ color: '#b0b0d0' }}>городов России</div>
            </div>
          </AnimatedIcon>
          <AnimatedIcon delay={600}>
            <div>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '10px'
              }}>
                4.9
              </div>
              <div style={{ color: '#b0b0d0' }}>средний рейтинг</div>
            </div>
          </AnimatedIcon>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
