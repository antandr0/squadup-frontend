import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle } from 'lucide-react';

const OnboardingFlow = ({ onOpenAuth }) => {
  const [step, setStep] = useState(1);
  
  return (
    <section style={{ 
      background: 'var(--primary-dark)',
      padding: '80px 0'
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
          Начни за 3 простых шага
        </motion.h2>
        
        {/* Шаги онбординга */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {[
            { number: 1, title: 'Вход через Steam/VK', desc: 'Автоматически импортируем твои игры и статистику' },
            { number: 2, title: 'Расскажи о себе', desc: '30 секунд - и твой профиль готов' },
            { number: 3, title: 'Найди команду', desc: 'Смотри кто играет рядом и приглашай' }
          ].map((stepItem, index) => (
            <motion.div
              key={stepItem.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: step >= stepItem.number ? 'rgba(78, 84, 200, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                borderRadius: '20px',
                border: step >= stepItem.number ? '2px solid var(--primary-blue)' : '1px solid rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                width: '50px',
                height: '50px',
                background: step >= stepItem.number ? 'var(--primary-blue)' : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: '20px',
                fontWeight: 'bold',
                color: 'white'
              }}>
                {step >= stepItem.number ? '✓' : stepItem.number}
              </div>
              
              <h3 style={{ 
                fontSize: '1.3rem', 
                marginBottom: '10px',
                color: step >= stepItem.number ? 'var(--text-primary)' : 'var(--text-secondary)'
              }}>
                {stepItem.title}
              </h3>
              
              <p style={{ 
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: '1.5'
              }}>
                {stepItem.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Демо онбординга */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            background: 'var(--card-bg)',
            padding: '40px',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <button 
            className="btn-primary" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              margin: '0 auto 20px',
              padding: '15px 30px',
              fontSize: '18px'
            }}
            onClick={() => onOpenAuth('register')}
          >
            🚀 Начать играть
            <ChevronRight size={20} />
          </button>
          
          <p style={{ 
            color: 'var(--text-secondary)',
            fontSize: '14px'
          }}>
            <CheckCircle size={16} style={{ display: 'inline', marginRight: '5px' }} />
            <strong>Без подписок. Бесплатно. Сейчас.</strong>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default OnboardingFlow;