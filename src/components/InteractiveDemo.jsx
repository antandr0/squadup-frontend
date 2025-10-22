import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const InteractiveDemo = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedIcon>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
            Как это работает?
          </h2>
        </AnimatedIcon>
        <AnimatedIcon delay={200}>
          <p style={{ color: '#b0b0d0', fontSize: '1.2rem' }}>
            Демо-версия в разработке...
          </p>
        </AnimatedIcon>
      </div>
    </section>
  );
};

export default InteractiveDemo;
