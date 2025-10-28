import React from 'react';
import AnimatedIcon from './AnimatedIcon';

const SuccessStories = () => {
  return (
    <section style={{
      padding: '80px 20px',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)'
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <AnimatedIcon>
          <h2 style={{ 
            fontSize: '2.5rem', 
            marginBottom: '20px',
            background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Они уже нашли свою команду. Твоя очередь!
          </h2>
        </AnimatedIcon>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '40px',
          marginTop: '50px'
        }}>
          
          {/* ОРИГИНАЛЬНЫЙ ОТЗЫВ 1 */}
          <AnimatedIcon delay={200}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  А
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Алексей</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Dota 2 • Москва</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Благодаря SquadUp нашел команду для регулярных игр. Теперь играть стало в разы интереснее!"
              </p>
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                color: '#00ff88',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(0, 255, 136, 0.3)'
              }}>
                ✅ Нашел команду за 2 дня
              </div>
            </div>
          </AnimatedIcon>

          {/* ОРИГИНАЛЬНЫЙ ОТЗЫВ 2 */}
          <AnimatedIcon delay={400}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #ff6b6b, #ffa726)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  М
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Мария</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Valorant • Санкт-Петербург</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Наконец-то перестала играть с токсичными рандомами. Ребята из SquadUp - просто огонь!"
              </p>
              <div style={{
                background: 'rgba(78, 84, 200, 0.1)',
                color: '#4e54c8',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(78, 84, 200, 0.3)'
              }}>
                🎯 Рейтинг вырос на 30%
              </div>
            </div>
          </AnimatedIcon>

          {/* НОВЫЙ ИНТЕРЕСНЫЙ ОТЗЫВ 1 */}
          <AnimatedIcon delay={600}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #00ff88, #00cc66)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  Д
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Дмитрий "Штурм"</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>CS:GO • IT-специалист • Екатеринбург</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Играл 8 лет в одиночку, думал так и закончу карьеру. В SquadUp нашел парней с таким же опытом! Теперь мы не просто команда - мы семья. Уже съездили на LAN в соседний город!"
              </p>
              <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                color: '#ffc107',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(255, 193, 7, 0.3)'
              }}>
                💫 Faceit Level 10 команда
              </div>
            </div>
          </AnimatedIcon>

          {/* НОВЫЙ ИНТЕРЕСНЫЙ ОТЗЫВ 2 */}
          <AnimatedIcon delay={800}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #9c27b0, #e91e63)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  К
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Кирилл "Скаут"</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Apex Legends • Студент • Казань</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Переехал в Казань учиться и не знал ни души. Через SquadUp нашел не просто тиммейтов, а лучших друзей! Теперь мы вместе не только в Apex, но и в универе, и на вечеринках."
              </p>
              <div style={{
                background: 'rgba(156, 39, 176, 0.1)',
                color: '#9c27b0',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(156, 39, 176, 0.3)'
              }}>
                🎯 Predator в трио
              </div>
            </div>
          </AnimatedIcon>

          {/* НОВЫЙ ИНТЕРЕСНЫЙ ОТЗЫВ 3 */}
          <AnimatedIcon delay={1000}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #2196f3, #03a9f4)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  П
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Павел "Мидер"</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>League of Legends • Бармен • Красноярск</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Работаю в ночную смену барменом, график сумасшедший. В SquadUp нашел 'ночных' игроков с таким же графиком! Теперь после работы у нас традиция - 2-3 игры перед сном."
              </p>
              <div style={{
                background: 'rgba(255, 152, 0, 0.1)',
                color: '#ff9800',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(255, 152, 0, 0.3)'
              }}>
                ⚡ Challenger в соло-ранге
              </div>
            </div>
          </AnimatedIcon>

          {/* НОВЫЙ ИНТЕРЕСНЫЙ ОТЗЫВ 4 */}
          <AnimatedIcon delay={1200}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              padding: '30px',
              borderRadius: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textAlign: 'left',
              transition: 'transform 0.3s ease'
            }} onMouseEnter={(e) => e.target.style.transform = 'translateY(-5px)'}
               onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '15px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  М
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Максим "Танк"</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Dota 2 • Архитектор • Новосибирск</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "После 15 проигранных игр подряд с токсичными рандомами я был готов завязать. В SquadUp за 2 дня собрал команду мечты! Теперь мы разрабатываем тактики как настоящая киберспортивная команда!"
              </p>
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                color: '#00ff88',
                padding: '8px 15px',
                borderRadius: '20px',
                fontSize: '0.9rem',
                display: 'inline-block',
                border: '1px solid rgba(0, 255, 136, 0.3)'
              }}>
                🚀 Взлетел с 2k до 4.5k MMR за месяц
              </div>
            </div>
          </AnimatedIcon>

        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
