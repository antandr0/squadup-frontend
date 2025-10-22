import React from 'react';
import AnimatedGradient from './AnimatedGradient';
import AnimatedIcon from './AnimatedIcon';

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
        <AnimatedIcon>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            fontWeight: 'bold',
            marginBottom: '20px'
          }}>
            <AnimatedGradient>Твоя идеальная команда ждет тебя</AnimatedGradient>
          </h1>
        </AnimatedIcon>
        
        <AnimatedIcon delay={200}>
          <p style={{
            fontSize: '1.3rem',
            color: '#b0b0d0',
            marginBottom: '40px',
            lineHeight: '1.6'
          }}>
            Забудь про токсичных рандомов. Находи проверенных тиммейтов рядом с тобой.
          </p>
        </AnimatedIcon>
        
        <AnimatedIcon delay={400}>
          <p style={{
            fontSize: '1.1rem',
            color: '#8a2be2',
            marginBottom: '30px',
            fontWeight: 'bold'
          }}>
            Пришло время SquadUp.
          </p>
        </AnimatedIcon>
        
        <AnimatedIcon delay={600}>
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
              transition: 'transform 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            🎮 Начать играть бесплатно
          </button>
        </AnimatedIcon>
      </div>
    </section>
  );
};

export default HeroSection;
