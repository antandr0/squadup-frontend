import React from 'react';

const FeaturesSection = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'var(--primary-dark)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '60px' }}>
          Все что нужно для идеальной игры
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '40px 30px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>🎯</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Умный подбор</h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              AI алгоритмы анализируют стиль игры и находят идеальных тиммейтов
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '40px 30px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>🗺️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Геопоиск</h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              Играй с геймерами из своего города с минимальным пингом
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '40px 30px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <div style={{
              fontSize: '3rem',
              marginBottom: '20px'
            }}>🎙️</div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '15px' }}>Голосовой чат</h3>
            <p style={{ color: '#b0b0d0', lineHeight: '1.6' }}>
              Встроенный WebRTC чат без задержек для идеальной коммуникации
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
