import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Основной контент в 3 колонки */}
        <div className="footer-grid">
          
          {/* Колонка 1: О проекте и фичи */}
          <div className="footer-column">
            <div className="footer-section">
              <h3 className="footer-title">🎮 О SquadUp</h3>
              <div className="footer-content">
                <p className="footer-description">
                  Современная платформа для поиска тиммейтов и создания игровых команд. 
                  Объединяем геймеров со всей России для совместных побед!
                </p>
                
                <div className="features-grid">
                  <div className="feature-item">
                    <span className="feature-icon">🎯</span>
                    <span className="feature-text">Умный подбор по стилю игры</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🌍</span>
                    <span className="feature-text">Геопоиск игроков рядом</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">⭐</span>
                    <span className="feature-text">Система рейтингов и отзывов</span>
                  </div>
                  <div className="feature-item">
                    <span className="feature-icon">🎙️</span>
                    <span className="feature-text">Встроенный голосовой чат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Колонка 2: Правовая информация */}
          <div className="footer-column">
            <div className="footer-section">
              <h3 className="footer-title">📋 Правовая информация</h3>
              <div className="footer-content">
                <div className="legal-links">
                  <a href="/privacy" className="legal-link">
                    <span className="legal-icon">🔒</span>
                    Политика конфиденциальности
                  </a>
                  <a href="/terms" className="legal-link">
                    <span className="legal-icon">📄</span>
                    Пользовательское соглашение
                  </a>
                  <a href="/cookies" className="legal-link">
                    <span className="legal-icon">🍪</span>
                    Политика cookies
                  </a>
                  <a href="/offer" className="legal-link">
                    <span className="legal-icon">📝</span>
                    Оферта
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Колонка 3: Контакты как кнопки */}
          <div className="footer-column">
            <div className="footer-section">
              <h3 className="footer-title">📞 Контакты</h3>
              <div className="footer-content">
                <div className="contact-buttons">
                  <a 
                    href="mailto:redspicez@yandex.ru" 
                    className="contact-button"
                  >
                    <span className="contact-icon">📧</span>
                    Email: redspicez@yandex.ru
                  </a>
                  <a 
                    href="https://t.me/aaaaandreevich" 
                    className="contact-button"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="contact-icon">💬</span>
                    Telegram: @aaaaandreevich
                  </a>
                  <a 
                    href="https://steamcommunity.com/id/AntAndr" 
                    className="contact-button"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="contact-icon">🎮</span>
                    Steam: AntAndr
                  </a>
                  <a 
                    href="https://squadup-frontend.vercel.app" 
                    className="contact-button"
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span className="contact-icon">🌐</span>
                    Сайт: squadup-frontend.vercel.app
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Нижняя часть с копирайтом */}
        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="copyright">
            © 2025 SquadUp. Все права защищены. 
            <span className="copyright-extra">Сделано с ❤️ для геймеров</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
