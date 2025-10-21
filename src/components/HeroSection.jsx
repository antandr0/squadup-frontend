import React from 'react';

const HeroSection = ({ onOpenAuth }) => {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 20px 20px 20px'
    }}>
      <div style={{ maxWidth: '800px' }}>
        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4rem)',
          fontWeight: 'bold',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          🚀 SQUADUP PREMIUM
        </h1>
        <p style={{
          fontSize: '1.3rem',
          color: '#b0b0d0',
          marginBottom: '40px',
          lineHeight: '1.6'
        }}>
          Найди свою идеальную игровую команду
        </p>
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
            cursor: 'pointer'
          }}
        >
          🎮 Начать играть бесплатно
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
