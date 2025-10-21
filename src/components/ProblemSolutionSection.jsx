import React from 'react';
import { motion } from 'framer-motion';
import { Frown, Smile, MapPin, Clock, Star, Users, Zap } from 'lucide-react';

const ProblemSolutionSection = () => {
  const painPoints = [
    { icon: Frown, title: 'Тролли и токсики', desc: 'Каждая вторая игра с рандомами — это лотерея' },
    { icon: MapPin, title: 'Играешь один', desc: 'Не знаешь, кто рядом с тобой играет в те же игры' },
    { icon: Clock, title: 'Часы поиска', desc: '30 минут поиска в чатах ради одной игры' }
  ];

  const solutions = [
    { icon: Star, title: 'Рейтинг и отзывы', desc: 'Видишь реальную репутацию игрока до начала игры' },
    { icon: Users, title: 'Геопоиск', desc: 'Находишь тиммейтов в своем городе для игры с низким пингом и возможностью познакомиться лично' },
    { icon: Zap, title: 'Мгновенный подбор', desc: '2 клика — и ты уже в голосовом чате с новой командой' }
  ];

  return (
    <section id="features" style={{ background: 'var(--primary-dark)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}
        >
          {/* Левая сторона - Проблема */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#ff6b6b'
            }}>
              ❌ Надоело искать в Discord?
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {painPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '15px',
                    padding: '20px',
                    background: 'rgba(255, 107, 107, 0.1)',
                    borderRadius: '15px',
                    border: '1px solid rgba(255, 107, 107, 0.2)'
                  }}
                >
                  <point.icon size={24} color="#ff6b6b" />
                  <div>
                    <h3 style={{ marginBottom: '5px', color: 'var(--text-primary)' }}>{point.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{point.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Правая сторона - Решение */}
          <div>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '40px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              color: '#00ff88'
            }}>
              ✅ Как это решает SquadUp?
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '15px',
                    padding: '20px',
                    background: 'rgba(0, 255, 136, 0.1)',
                    borderRadius: '15px',
                    border: '1px solid rgba(0, 255, 136, 0.2)'
                  }}
                >
                  <solution.icon size={24} color="#00ff88" />
                  <div>
                    <h3 style={{ marginBottom: '5px', color: 'var(--text-primary)' }}>{solution.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{solution.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;