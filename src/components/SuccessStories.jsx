import React from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin } from 'lucide-react';

const SuccessStories = () => {
  const stories = [
    {
      id: 1,
      avatar: "/images/avatars/avatar1.jpg",
      name: "Максим",
      game: "Dota 2",
      from: "Новосибирск",
      text: "В Discord искал постоянную команду 2 месяца. В SquadUp нашел за 2 дня. Теперь играем каждый вечер с ребятами из соседнего дома!",
      result: "Поднялся с 2k до 3.5k MMR"
    },
    {
      id: 2,
      avatar: "/images/avatars/avatar2.jpg",
      name: "Анна", 
      game: "Valorant",
      from: "Москва",
      text: "Боялась токсиков как девушка-геймер. Система рейтингов тут реально работает! Нашла адекватную команду, задумавыюсь о стримах, площадка ТОП",
      result: "Достигли Platinum вместе"
    }
  ];

  return (
    <section style={{ 
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
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
          Они уже нашли свою команду. Твоя очередь!
        </motion.h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="story-card"
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}>
                <img 
                  src={story.avatar} 
                  alt={story.name}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '2px solid var(--primary-blue)'
                  }}
                />
                <div>
                  <h3 style={{ 
                    fontSize: '1.3rem', 
                    marginBottom: '5px' 
                  }}>
                    {story.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    color: 'var(--text-secondary)',
                    fontSize: '14px'
                  }}>
                    <Star size={14} />
                    <span>{story.game}</span>
                    <span>•</span>
                    <MapPin size={14} />
                    <span>{story.from}</span>
                  </div>
                </div>
              </div>
              
              <p style={{
                color: 'var(--text-secondary)',
                lineHeight: '1.6',
                marginBottom: '20px',
                fontStyle: 'italic'
              }}>
                "{story.text}"
              </p>
              
              <div style={{
                background: 'rgba(0, 255, 136, 0.1)',
                padding: '10px 15px',
                borderRadius: '10px',
                border: '1px solid rgba(0, 255, 136, 0.2)'
              }}>
                <span style={{
                  color: '#00ff88',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}>
                  🎯 {story.result}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;