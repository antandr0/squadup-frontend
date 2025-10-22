import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const FeaturesSection = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'var(--primary-dark)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedIcon>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>
            Все что нужно для идеальной игры
          </h2>
        </AnimatedIcon>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}>
          <AnimatedIcon delay={200}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px 30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>🎯</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Умный подбор</h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                AI алгоритмы анализируют стиль игры и находят идеальных тиммейтов
              </p>
            </div>
          </AnimatedIcon>
          <AnimatedIcon delay={400}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px 30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>🗺️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Геопоиск</h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                Играй с геймерами из своего города с минимальным пингом
              </p>
            </div>
          </AnimatedIcon>
          <AnimatedIcon delay={600}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '40px 30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                fontSize: '3rem',
                marginBottom: '20px'
              }}>🎙️</div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Голосовой чат</h3>
              <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
                Встроенный WebRTC чат без задержек для идеальной коммуникации
              </p>
            </div>
          </AnimatedIcon>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
