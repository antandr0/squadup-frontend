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
          
          {/* Отзыв 1 */}
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
                  М
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Максим</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Dota 2 • Новосибирск</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "В Discord искал постоянную команду 2 месяца. В SquadUp нашел за 2 дня. Теперь играем каждый вечер с ребятами из соседнего дома!"
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
                🎯 Поднялся с 2k до 3.5k MMR
              </div>
            </div>
          </AnimatedIcon>

          {/* Отзыв 2 */}
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
                  А
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>Анна</div>
                  <div style={{ color: '#b0b0d0', fontSize: '0.9rem' }}>Valorant • Москва</div>
                </div>
              </div>
              <p style={{ 
                color: '#b0b0d0', 
                lineHeight: '1.6',
                fontStyle: 'italic',
                marginBottom: '20px'
              }}>
                "Боялась токсиков как девушка-геймер. Система рейтингов тут реально работает! Нашла адекватную команду, задумавыюсь о стримах, площадка ТОП"
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
                🎯 Достигли Platinum вместе
              </div>
            </div>
          </AnimatedIcon>

        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
