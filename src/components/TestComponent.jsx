import React from 'react';

const TestComponent = () => {
  return (
    <div style={{
      padding: '20px',
      background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
      color: 'white',
      textAlign: 'center',
      margin: '20px',
      borderRadius: '10px'
    }}>
      <h2>✅ Компоненты работают!</h2>
      <p>Если вы видите это сообщение, значит React компоненты загружаются правильно!</p>
    </div>
  );
};

export default TestComponent;
