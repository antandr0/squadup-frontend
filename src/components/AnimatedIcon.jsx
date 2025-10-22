import React from 'react';

const AnimatedIcon = ({ children, delay = 0 }) => {
  return (
    <div style={{
      opacity: 0,
      transform: 'translateY(20px)',
      animation: `fadeInUp 0.6s ease-out ${delay}ms forwards`
    }}>
      {children}
      <style>
        {`
          @keyframes fadeInUp {
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedIcon;
