import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgba(10, 10, 25, 0.95)',
      padding: '50px 20px 30px 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      color: '#b0b0d0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '30px'
      }}>
        
        {/* О компании */}
        <div>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>
            🎮 О SquadUp
          </h3>
          <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
            Современная платформа для поиска тиммейтов и создания игровых команд. 
            Объединяем геймеров со всей России для совместных побед!
          </p>
        </div>

        {/* Как работает */}
        <div>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>
            🗺️ Как работает
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '0.9rem' }}>
            <li>🎯 Умный подбор по стилю игры</li>
            <li>🌍 Геопоиск игроков рядом</li>
            <li>⭐ Система рейтингов и отзывов</li>
            <li>🎙️ Встроенный голосовой чат</li>
          </ul>
        </div>

        {/* Правовая информация */}
        <div>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>
            📋 Правовая информация
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '0.9rem' }}>
            <li><a href="#privacy" style={{ color: '#b0b0d0', textDecoration: 'none' }}>🔒 Политика конфиденциальности</a></li>
            <li><a href="#terms" style={{ color: '#b0b0d0', textDecoration: 'none' }}>📄 Пользовательское соглашение</a></li>
            <li><a href="#cookies" style={{ color: '#b0b0d0', textDecoration: 'none' }}>🍪 Политика cookies</a></li>
            <li><a href="#offer" style={{ color: '#b0b0d0', textDecoration: 'none' }}>📝 Оферта</a></li>
          </ul>
        </div>

        {/* Контакты */}
        <div>
          <h3 style={{ color: 'white', marginBottom: '15px', fontSize: '1.2rem' }}>
            📞 Контакты
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, lineHeight: '1.8', fontSize: '0.9rem' }}>
            <li>📧 Email: support@squadup.com</li>
            <li>💬 Telegram: @squadup_support</li>
            <li>🎮 Discord: SquadUp Community</li>
            <li>🌐 Сайт: squadup-frontend.vercel.app</li>
          </ul>
        </div>

      </div>

      {/* Копирайт */}
      <div style={{
        textAlign: 'center',
        paddingTop: '30px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.8rem',
        color: '#666'
      }}>
        <p>© {currentYear} SquadUp. Все права защищены.</p>
        <p style={{ marginTop: '5px' }}>Сделано с ❤️ для российских геймеров</p>
      </div>
    </footer>
  );
};

export default Footer;
