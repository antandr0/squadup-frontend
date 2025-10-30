import React from 'react';

const HeroSection = ({ onOpenAuth }) => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      padding: '80px 20px 40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Анимированный фон */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 40% 40%, rgba(120, 219, 255, 0.05) 0%, transparent 50%)`,
        animation: 'float 6s ease-in-out infinite'
      }}></div>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
        `}
      </style>

      <div style={{
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Главный заголовок */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #fff 0%, #a8c0ff 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          marginBottom: '1.5rem',
          lineHeight: '1.2'
        }}>
          Твоя идеальная команда ждет тебя
        </h1>

        {/* Подзаголовок 1 */}
        <p style={{
          fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Забудь про токсичных рандомов. Находи проверенных тиммейтов рядом с тобой.
        </p>

        {/* Подзаголовок 2 */}
        <p style={{
          fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
          color: '#007bff',
          fontWeight: '600',
          marginBottom: '2.5rem',
          lineHeight: '1.4'
        }}>
          Пришло время SquadUp.
        </p>

        {/* CTA кнопки */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: '3rem'
        }}>
          <button
            onClick={() => onOpenAuth('register')}
            style={{
              background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 123, 255, 0.3)'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 123, 255, 0.4)';
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 123, 255, 0.3)';
            }}
          >
            Зарегистрироваться
          </button>
          
          <button
            onClick={() => onOpenAuth('login')}
            style={{
              background: 'transparent',
              color: '#007bff',
              border: '2px solid #007bff',
              padding: '15px 30px',
              fontSize: '1.1rem',
              fontWeight: '600',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = '#007bff';
              e.target.style.color = 'white';
              e.target.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#007bff';
              e.target.style.transform = 'translateY(0)';
            }}
          >
            Войти
          </button>
        </div>

        {/* Статистика */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>1000+</div>
            <div style={{ fontSize: '0.9rem' }}>игроков онлайн</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>500+</div>
            <div style={{ fontSize: '0.9rem' }}>сыгранных матчей</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#007bff' }}>98%</div>
            <div style={{ fontSize: '0.9rem' }}>положительных отзывов</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
