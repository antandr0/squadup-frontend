import React from 'react';

const AnimatedGradient = ({ children }) => {
  return (
    <span style={{
      background: 'linear-gradient(45deg, #4e54c8, #8a2be2, #ff6b6b, #4e54c8)',
      backgroundSize: '400% 400%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      animation: 'gradientShift 3s ease infinite'
    }}>
      {children}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </span>
  );
};

export default AnimatedGradient;
