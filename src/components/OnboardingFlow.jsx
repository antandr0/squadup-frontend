import React from 'react';

const OnboardingFlow = ({ onOpenAuth }) => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
          Начни за 3 простых шага
        </h2>
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
          🚀 Начать сейчас
        </button>
      </div>
    </section>
  );
};

export default OnboardingFlow;
