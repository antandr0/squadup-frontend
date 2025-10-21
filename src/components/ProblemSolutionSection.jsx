import React from 'react';

const ProblemSolutionSection = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'var(--primary-dark)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>
          Почему SquadUp?
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px'
          }}>
            <h3>🎯 Умный подбор</h3>
            <p style={{ color: '#b0b0d0' }}>AI алгоритмы находят идеальных тиммейтов</p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px'
          }}>
            <h3>🗺️ Геопоиск</h3>
            <p style={{ color: '#b0b0d0' }}>Играй с геймерами из своего города</p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '30px',
            borderRadius: '15px'
          }}>
            <h3>🎙️ Голосовой чат</h3>
            <p style={{ color: '#b0b0d0' }}>Встроенный WebRTC чат</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
