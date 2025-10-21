import React, { useState } from 'react';
import VoiceChat from './VoiceChat';
import { useAuth } from '../context/AuthContext';

const VoiceChatButton = ({ targetUserId, targetUserName }) => {
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const { user } = useAuth();

  const handleVoiceChatClick = async () => {
    if (!user) {
      alert('Для использования голосового чата необходимо авторизоваться');
      return;
    }

    try {
      // Создаем уникальную комнату для двух пользователей
      const newRoomId = `private_${Math.min(targetUserId, user.id)}_${Math.max(targetUserId, user.id)}`;
      setRoomId(newRoomId);
      setShowVoiceChat(true);
    } catch (error) {
      console.error('Ошибка создания голосового чата:', error);
      alert('Не удалось начать голосовой чат');
    }
  };

  return (
    <>
      <button 
        onClick={handleVoiceChatClick}
        style={{
          padding: '6px 12px',
          background: 'rgba(78, 84, 200, 0.1)',
          color: '#4e54c8',
          border: '1px solid rgba(78, 84, 200, 0.3)',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '12px',
          whiteSpace: 'nowrap',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.background = 'rgba(78, 84, 200, 0.2)';
          e.target.style.transform = 'translateY(-1px)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = 'rgba(78, 84, 200, 0.1)';
          e.target.style.transform = 'translateY(0)';
        }}
      >
        🎙️ Голосовой чат
      </button>

      {showVoiceChat && roomId && user && (
        <VoiceChat
          roomId={roomId}
          userId={user.id}
          roomName={`Чат с ${targetUserName}`}
          onClose={() => setShowVoiceChat(false)}
        />
      )}
    </>
  );
};

export default VoiceChatButton;