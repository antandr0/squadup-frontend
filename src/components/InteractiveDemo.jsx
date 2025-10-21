import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Map, CheckCircle } from 'lucide-react';

const InteractiveDemo = () => {
  return (
    <section id="demo" style={{ 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)' 
    }}>
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '60px' 
          }}
        >
          Почувствуй разницу
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Discord Demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              color: '#ff6b6b'
            }}>
              <MessageCircle size={24} />
              ❌ Старый способ: Discord
            </h3>
            
            <div style={{
              background: '#2f3136',
              borderRadius: '15px',
              padding: '20px',
              border: '2px solid #ff6b6b'
            }}>
              <div style={{
                background: '#36393f',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '10px'
              }}>
                <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>RandomUser123:</span>
                <span style={{ color: 'white' }}> играем в доту кто со мной? mid or feed</span>
              </div>
              
              <div style={{
                background: '#36393f',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>ToxicPro:</span>
                <span style={{ color: 'white' }}> *оскорбление* я твой mid за 10 минут разнесу</span>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#ffd700',
                fontSize: '14px'
              }}>
                ⏳ Поиск команды: 25 минут...
              </div>
            </div>
          </motion.div>

          {/* SquadUp Demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '20px',
              color: '#00ff88'
            }}>
              <Map size={24} />
              ✅ Новый способ: SquadUp
            </h3>
            
            <div style={{
              background: 'var(--card-bg)',
              borderRadius: '15px',
              padding: '20px',
              border: '2px solid #00ff88',
              position: 'relative'
            }}>
              {/* Карта с игроками */}
              <div style={{
                height: '200px',
                background: 'linear-gradient(135deg, #4e54c8, #8a2be2)',
                borderRadius: '10px',
                marginBottom: '20px',
                position: 'relative'
              }}>
                {/* Точки на карте */}
                <div style={{
                  position: 'absolute',
                  top: '30%',
                  left: '40%',
                  transform: 'translate(-50%, -50%)'
                }}>
                  <div className="player-card" style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: 'rgba(255, 255, 255, 0.9)',
                    padding: '10px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    minWidth: '200px'
                  }}>
                    <img 
                      src="https://via.placeholder.com/40" 
                      alt="Player" 
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        borderRadius: '50%' 
                      }} 
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontWeight: 'bold', 
                        color: 'black',
                        fontSize: '14px'
                      }}>Alex</div>
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '5px',
                        fontSize: '12px'
                      }}>
                        <span style={{ color: 'gold' }}>⭐</span>
                        <span style={{ color: 'black' }}>4.8</span>
                      </div>
                      <div style={{ 
                        fontSize: '11px', 
                        color: '#666' 
                      }}>1.2 км от тебя</div>
                    </div>
                    <button style={{
                      background: 'var(--primary-blue)',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '5px',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}>
                      Пригласить
                    </button>
                  </div>
                </div>
              </div>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                color: '#00ff88',
                fontSize: '14px',
                justifyContent: 'center'
              }}>
                <CheckCircle size={16} />
                Команда найдена за 47 секунд
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;