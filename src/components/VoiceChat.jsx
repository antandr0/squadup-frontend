import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './VoiceChat.css';

const VoiceChat = () => {
  const { user } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const handleConnect = async () => {
    if (isConnected) {
      // Логика отключения
      setIsConnected(false);
      setParticipants([]);
      setError('');
      return;
    }

    if (!user) {
      setError('Требуется авторизация для подключения к голосовому чату');
      return;
    }

    setIsConnecting(true);
    setError('');
    
    // TODO: Реальная интеграция с WebRTC сервером
    // Пока используем временную имитацию с реальным пользователем
    setTimeout(() => {
      setIsConnecting(false);
      setIsConnected(true);
      
      // Используем реальные данные текущего пользователя
      const currentUser = {
        id: user.id || 1,
        name: user.nickname || 'Вы',
        isYou: true
      };
      
      // Временные данные для демонстрации
      // В реальном приложении здесь будут данные из WebRTC соединения
      setParticipants([
        currentUser,
        { id: 2, name: 'ProPlayer', isYou: false },
        { id: 3, name: 'CasualGamer', isYou: false }
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
              {isConnected ? 'Подключен' : 'Не подключен'}
            </span>
          </div>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        {isConnected && roomId && (
          <div className="room-info">
            <p className="room-id">
              <strong>Комната:</strong> {roomId}
            </p>
            <p className="participants-count">
              <strong>Участников:</strong> {participants.length}
            </p>
          </div>
        )}

        <div className="voice-chat-body">
          {isConnected ? (
            <div className="participants-list">
              <h4>Участники чата:</h4>
              {participants.map((participant) => (
                <div key={participant.id} className={`participant ${participant.isYou ? 'you' : ''}`}>
                  <span className="participant-name">
                    {participant.name} {participant.isYou && '(Вы)'}
                  </span>
                  <span className="participant-status">
                    {participant.isYou ? '🎤 Говорите' : '🔊 Слушает'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="voice-chat-description">
              <p>
                Подключитесь к голосовому чату для общения с командой.
                {!user && ' Требуется авторизация.'}
              </p>
              <ul className="features-list">
                <li>🎙️ Качество звука 48kHz</li>
                <li>🔒 Сквозное шифрование</li>
                <li>⚡ Задержка менее 100мс</li>
              </ul>
            </div>
          )}
        </div>

        <div className="voice-chat-footer">
          <button
            className={`connect-button ${isConnected ? 'disconnect' : 'connect'} ${isConnecting ? 'connecting' : ''}`}
            onClick={handleConnect}
            disabled={isConnecting || (!user && !isConnected)}
          >
            {getConnectionText()}
          </button>
          
          {isConnected && (
            <div className="controls">
              <button className="control-btn mute" title="Выключить микрофон">
                🎤
              </button>
              <button className="control-btn volume" title="Настройки звука">
                🔊
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
