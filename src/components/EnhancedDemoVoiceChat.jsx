import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WebRTCDebugger from '../services/WebRTCDebugger';
import './VoiceChat.css';

const EnhancedDemoVoiceChat = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [backendStatus, setBackendStatus] = useState('checking');
  const [diagnosis, setDiagnosis] = useState(null);

  useEffect(() => {
    checkBackendStatus();
  }, []);

  const checkBackendStatus = async () => {
    setBackendStatus('checking');
    try {
      const diagnosisResult = await WebRTCDebugger.diagnoseConnection();
      setDiagnosis(diagnosisResult);
      
      const hasWebSocket = diagnosisResult.websocketTests.some(test => test.success);
      setBackendStatus(hasWebSocket ? 'ready' : 'waiting');
    } catch (error) {
      setBackendStatus('error');
    }
  };

  const initializeDemoVoiceChat = () => {
    setIsConnected(true);
    
    // Демо данные участников
    setParticipants([
      { userId: user.id, nickname: user.nickname, isYou: true, volume: 100, isMuted: false },
      { userId: 2, nickname: 'Player2', isYou: false, volume: 80, isMuted: false },
      { userId: 3, nickname: 'Player3', isYou: false, volume: 90, isMuted: true },
      { userId: 4, nickname: 'Player4', isYou: false, volume: 70, isMuted: false }
    ]);
  };

  const disconnectDemoVoiceChat = () => {
    setIsConnected(false);
    setParticipants([]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const getStatusMessage = () => {
    switch (backendStatus) {
      case 'checking':
        return '🔍 Проверяем статус бэкенда...';
      case 'ready':
        return '✅ Бэкенд готов к работе!';
      case 'waiting':
        return '⏳ Ожидаем обновления бэкенда...';
      case 'error':
        return '❌ Ошибка проверки бэкенда';
      default:
        return '⏳ Проверка статуса...';
    }
  };

  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Демо-режим' : 'Отключен'}
          </div>
        </div>
      </div>

      {/* Статус бэкенда */}
      <div className="backend-status">
        <div className={`status-message ${backendStatus}`}>
          {getStatusMessage()}
        </div>
        {diagnosis && (
          <div className="status-details">
            <p><strong>Рекомендация:</strong> {diagnosis.recommendation}</p>
            {backendStatus === 'waiting' && (
              <div className="deployment-info">
                <p>🔄 Бэкенд обновляется на Render...</p>
                <p>Обычно это занимает 5-10 минут после коммита</p>
                <button onClick={checkBackendStatus} className="refresh-button">
                  🔄 Проверить снова
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Демо-режим голосового чата</h4>
            <p>Реальный голосовой чат будет доступен после обновления бэкенда.</p>
            <p>А пока можете протестировать интерфейс в демо-режиме:</p>
            
            <div className="demo-features">
              <div className="feature-item">✅ Управление микрофоном</div>
              <div className="feature-item">✅ Список участников</div>
              <div className="feature-item">✅ Интерфейс комнаты</div>
              <div className="feature-item">🔄 Режим ожидания WebSocket</div>
            </div>
          </div>
          <button 
            className="connect-button demo"
            onClick={initializeDemoVoiceChat}
          >
            🎭 Включить демо-режим
          </button>
        </div>
      ) : (
        <div className="voice-chat-active">
          <div className="demo-notice">
            <div className="demo-icon">🎭</div>
            <div className="demo-content">
              <h4>Демо-режим активен</h4>
              <p>Это демонстрация интерфейса. Реальный голосовой чат появится после обновления бэкенда.</p>
            </div>
          </div>

          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>demo-room-123</strong></span>
              <button className="copy-button">
                📋 Копировать
              </button>
            </div>
            <div className="room-stats">
              👥 {participants.length}/6 игроков (демо)
            </div>
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

          <div className="demo-next-steps">
            <h4>Что будет в реальном режиме:</h4>
            <ul>
              <li>⚡ Настоящая голосовая связь с тиммейтами</li>
              <li>🔒 Защищенное P2P соединение</li>
              <li>🎯 Кристально чистое качество звука</li>
              <li>👥 До 6 участников одновременно</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedDemoVoiceChat;
