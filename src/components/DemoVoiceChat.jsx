import React, { useState } from 'react';
import './VoiceChat.css';

const DemoVoiceChat = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState([]);

  const initializeDemoVoiceChat = () => {
    setIsConnected(true);
    
    // Демо данные участников
    setParticipants([
      { userId: 1, nickname: 'Вы', isYou: true, volume: 100, isMuted: false },
      { userId: 2, nickname: 'Player2', isYou: false, volume: 80, isMuted: false },
      { userId: 3, nickname: 'Player3', isYou: false, volume: 90, isMuted: true }
    ]);
  };

  const disconnectDemoVoiceChat = () => {
    setIsConnected(false);
    setParticipants([]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (userId, volume) => {
    setParticipants(prev => 
      prev.map(p => 
        p.userId === userId ? { ...p, volume } : p
      )
    );
  };

  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат (Демо)</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Демо-режим' : 'Отключен'}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Демо-режим голосового чата</h4>
            <p>Сервер голосового чата временно недоступен. Включен демо-режим для тестирования интерфейса.</p>
            <div className="demo-warning">
              ⚠️ Реальный голосовой чат будет доступен после настройки сервера
            </div>
          </div>
          <button 
            className="connect-button"
            onClick={initializeDemoVoiceChat}
          >
            🎭 Включить демо-режим
          </button>
        </div>
      ) : (
        <div className="voice-chat-active">
          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>demo-room-123</strong></span>
              <button className="copy-button">
                📋 Копировать
              </button>
            </div>
            <button className="invite-button">
              ➕ Пригласить игрока
            </button>
          </div>

          <div className="participants-list">
            <h4>Участники ({participants.length}) - Демо</h4>
            {participants.map(participant => (
              <div key={participant.userId} className="participant-item">
                <div className="participant-info">
                  <div className="participant-avatar">
                    {participant.nickname?.charAt(0).toUpperCase()}
                  </div>
                  <div className="participant-details">
                    <span className="participant-name">
                      {participant.nickname}
                      {participant.isYou && ' (Вы)'}
                    </span>
                    <div className="participant-status">
                      {participant.isMuted ? '🔇 Заглушен' : '🎤 Говорит'}
                      {participant.isYou && isMuted && ' (Вы заглушены)'}
                    </div>
                  </div>
                </div>
                
                {!participant.isYou && (
                  <div className="participant-controls">
                    <div className="volume-control">
                      <span className="volume-icon">🔊</span>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={participant.volume}
                        onChange={(e) => handleVolumeChange(participant.userId, parseInt(e.target.value))}
                        className="volume-slider"
                      />
                      <span className="volume-value">{participant.volume}%</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="voice-controls">
            <button 
              className={`mute-button ${isMuted ? 'muted' : ''}`}
              onClick={toggleMute}
            >
              {isMuted ? '🔇 Включить звук' : '🎤 Выключить звук'}
            </button>
            <button 
              className="disconnect-button"
              onClick={disconnectDemoVoiceChat}
            >
              📞 Отключиться
            </button>
          </div>
        </div>
      )}

      <div className="voice-features-info">
        <h4>В реальном режиме будет доступно:</h4>
        <ul>
          <li>⚡ Настоящая голосовая связь с тиммейтами</li>
          <li>🔒 Защищенное P2P соединение</li>
          <li>🎯 Кристально чистое качество звука</li>
          <li>👥 До 8 участников одновременно</li>
        </ul>
      </div>
    </div>
  );
};

export default DemoVoiceChat;
