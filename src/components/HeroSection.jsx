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
      {/* Анимированный фон */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 20% 80%, rgba(78, 84, 200, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)`,
        zIndex: 1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          {/* Заголовок */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4rem)',
              fontWeight: 'bold',
              marginBottom: '20px',
              lineHeight: '1.2'
            }}
          >
            Твоя <span className="gradient-text">идеальная команда</span> ждет тебя
          </motion.h1>

          {/* Подзаголовок */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.3rem)',
              color: 'var(--text-secondary)',
              marginBottom: '40px',
              lineHeight: '1.6'
            }}
          >
            Забудь про токсичных рандомов. Находи проверенных тиммейтов рядом с тобой.
            <br />
            <strong style={{ color: 'var(--text-primary)' }}>Пришло время SquadUp.</strong>
          </motion.p>

          {/* Social Proof */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: 'rgba(255, 255, 255, 0.1)',
              padding: '10px 20px',
              borderRadius: '50px',
              marginBottom: '40px',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: 'var(--success-green)',
              animation: 'pulse 2s infinite'
            }}></div>
            <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
              Прямо сейчас <strong style={{ color: 'var(--text-primary)' }}>72 геймера</strong> ищут команду
            </span>
          </motion.div>

          {/* Кнопки CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              display: 'flex',
              gap: '20px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px'
            }}
          >
            <button 
              className="btn-primary" 
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px 30px'
              }}
              onClick={() => onOpenAuth('register')}
            >
              🎮 Найти команду за 2 минуты
              <ArrowRight size={20} />
            </button>
          </motion.div>

          {/* Статистика */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              flexWrap: 'wrap'
            }}
          >
            {[
              { icon: Users, number: '10K+', text: 'активных геймеров' },
              { icon: MapPin, number: '50+', text: 'городов России' },
              { icon: Star, number: '4.9', text: 'средний рейтинг' }
            ].map((item, index) => (
              <div key={index} style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', marginBottom: '5px' }}>
                  <item.icon size={20} color="var(--primary-blue)" />
                  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>{item.number}</span>
                </div>
                <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{item.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;