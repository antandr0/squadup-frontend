import React, { useState, useEffect } from 'react';
import './VoiceChat.css';

const VoiceChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [participants, setParticipants] = useState([]);

  const handleConnect = async () => {
    if (isConnected) {
      // Логика отключения
      setIsConnected(false);
      setParticipants([]);
      return;
    }

    setIsConnecting(true);
    
    // Имитация подключения к голосовому чату
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      setParticipants([
        { id: 1, name: '1test', isYou: true },
        { id: 2, name: 'ProPlayer' },
        { id: 3, name: 'CasualGamer' }
      ]);
      setRoomId('room-' + Math.random().toString(36).substr(2, 5));
    }, 2000);
  };

  const getConnectionText = () => {
    if (isConnecting) return 'Подключение...';
    return isConnected ? 'Отключиться' : 'Подключиться к чату';
  };

  const getStatusIcon = () => {
    if (isConnecting) return '🔄';
    return isConnected ? '🔴' : '🟢';
  };

  return (
    <div className="voice-chat-container">
      <div className="voice-chat-card">
        <div className="voice-chat-header">
          <h3 className="voice-chat-title">Голосовой чат</h3>
          <div className="connection-status">
            <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
              {getStatusIcon()}
            </span>
            <span className="status-text">
              {isConnected ? 'Подключен' : 'Отключен'}
            </span>
          </div>
        </div>

        <div className="voice-chat-content">
          {isConnected && (
            <div className="room-info">
              <div className="room-id">
                <strong>Комната:</strong> {roomId}
              </div>
              <div className="participants">
                <strong>Участники:</strong>
                <div className="participants-list">
                  {participants.map(participant => (
                    <div key={participant.id} className="participant">
                      <span className="participant-name">
                        {participant.name}
                        {participant.isYou && ' (Вы)'}
                      </span>
                      <span className="participant-status">
                        {participant.isYou ? 'В сети' : 'В сети'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="voice-chat-button">
            <button
              className={`connect-btn ${isConnected ? 'connected' : ''} ${isConnecting ? 'connecting' : ''}`}
              onClick={handleConnect}
              disabled={isConnecting}
            >
              <span className="btn-icon">
                {getStatusIcon()}
              </span>
              <span className="btn-text">{getConnectionText()}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
