import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, MapPin, Star } from 'lucide-react';

const HeroSection = ({ onOpenAuth }) => {
  return (
    <section style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Анимированный фон с частицами */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(0, 255, 136, 0.1) 0%, transparent 50%)
        `,
        zIndex: 1
      }}></div>

      {/* Плавающие элементы */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          fontSize: '40px',
          opacity: 0.3
        }}
      >
        🎮
      </motion.div>

      <motion.div
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{
          position: 'absolute',
          bottom: '30%',
          right: '15%',
          fontSize: '35px',
          opacity: 0.3
        }}
      >
        ⚡
      </motion.div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto' }}
        >
          {/* Заголовок с улучшенным градиентом */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
              fontWeight: '800',
              marginBottom: '25px',
              lineHeight: '1.1',
              background: 'linear-gradient(45deg, #ffffff, #b0b0d0, #4e54c8, #8a2be2)',
              backgroundSize: '400% 400%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 8s ease infinite'
            }}
          >
            Твоя <span style={{ 
              background: 'linear-gradient(45deg, #4e54c8, #8a2be2, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 6s ease infinite'
            }}>идеальная команда</span> ждет тебя
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)',
              color: 'var(--text-secondary)',
              marginBottom: '45px',
              lineHeight: '1.7',
              fontWeight: '300'
            }}
          >
            Забудь про токсичных рандомов. Находи проверенных тиммейтов рядом с тобой.
            <br />
            <strong style={{ 
              color: 'var(--text-primary)',
              background: 'linear-gradient(45deg, #4e54c8, #8a2be2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Пришло время SquadUp.</strong>
          </motion.p>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="glass"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 25px',
              borderRadius: '50px',
              marginBottom: '50px',
              backdropFilter: 'blur(20px)'
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: 'var(--success-green)',
              }}
            ></motion.div>
            <span style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
              Прямо сейчас <strong style={{ color: 'var(--text-primary)' }}>87 геймеров</strong> ищут команду
            </span>
          </motion.div>

          {/* Кнопки CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{
              display: 'flex',
              gap: '25px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '70px'
            }}
          >
            <motion.button 
              className="btn-primary" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 35px',
                fontSize: '18px',
                fontWeight: '600'
              }}
              onClick={() => onOpenAuth('register')}
            >
              <motion.span
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎮
              </motion.span>
              Найти команду за 2 минуты
              <ArrowRight size={22} />
            </motion.button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '50px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { icon: Users, number: '12K+', text: 'активных геймеров', color: '#4e54c8' },
              { icon: MapPin, number: '60+', text: 'городов России', color: '#8a2be2' },
              { icon: Star, number: '4.9', text: 'средний рейтинг', color: '#ffd93d' }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.3 + index * 0.1 }}
                style={{ textAlign: 'center' }}
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '10px', 
                  justifyContent: 'center', 
                  marginBottom: '8px' 
                }}>
                  <item.icon size={24} color={item.color} />
                  <motion.span 
                    style={{ 
                      fontSize: '28px', 
                      fontWeight: 'bold',
                      background: `linear-gradient(45deg, ${item.color}, #ffffff)`,
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    {item.number}
                  </motion.span>
                </div>
                <span style={{ 
                  color: 'var(--text-secondary)', 
                  fontSize: '15px',
                  fontWeight: '300'
                }}>
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
