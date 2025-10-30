import React from 'react';

const HowItWorks = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      textAlign: 'center'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Как это работает?
        </h2>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#b0b0d0',
          marginBottom: '50px',
          lineHeight: '1.6'
        }}>
          напишу позже...
        </p>
      </div>
    </section>
  );
};

export default HowItWorks;
