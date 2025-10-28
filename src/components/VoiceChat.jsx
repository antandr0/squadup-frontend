import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './VoiceChat.css';

const VoiceChat = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState(new Map());
  const peerConnections = useRef(new Map());
  const localAudioRef = useRef(null);
  const audioContextRef = useRef(null);

  // Инициализация WebRTC
  const initializeVoiceChat = async () => {
    try {
      // Запрос доступа к микрофону
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        } 
      });
      
      setLocalStream(stream);
      
      if (localAudioRef.current) {
        localAudioRef.current.srcObject = stream;
      }
      
      // Создаем комнату
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      setIsConnected(true);
      
      // Подключаемся к signaling server (заглушка)
      connectToSignalingServer(newRoomId, user);
      
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Не удалось получить доступ к микрофону. Проверьте разрешения.');
    }
  };

  const generateRoomId = () => {
    return `room-${Math.random().toString(36).substr(2, 9)}`;
  };

  const connectToSignalingServer = (roomId, user) => {
    // Заглушка - здесь будет подключение к WebSocket серверу
    console.log(`Connecting to room: ${roomId} as ${user.nickname}`);
    
    // Демо данные участников
    setTimeout(() => {
      setParticipants([
        { id: user.id, nickname: user.nickname, isYou: true, volume: 100, isMuted: false },
        { id: 2, nickname: 'Player2', isYou: false, volume: 80, isMuted: false },
        { id: 3, nickname: 'Player3', isYou: false, volume: 90, isMuted: true }
      ]);
    }, 1000);
  };

  const disconnectVoiceChat = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    
    peerConnections.current.forEach(pc => pc.close());
    peerConnections.current.clear();
    setRemoteStreams(new Map());
    
    setIsConnected(false);
    setParticipants([]);
  };

  const toggleMute = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!track.enabled);
    }
  };

  const handleVolumeChange = (userId, volume) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === userId ? { ...p, volume } : p
      )
    );
    
    // Здесь будет логика изменения громкости аудио элемента
    console.log(`Changed volume for user ${userId} to ${volume}%`);
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomId);
    alert('Ссылка на комнату скопирована!');
  };

  const invitePlayer = () => {
    const nickname = prompt('Введите никнейм игрока для приглашения:');
    if (nickname) {
      // Заглушка - здесь будет отправка приглашения
      console.log(`Inviting player: ${nickname}`);
    }
  };

  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? 'Подключен' : 'Отключен'}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Создать голосовую комнату</h4>
            <p>Пригласите тиммейтов для обсуждения тактики и координации в игре</p>
          </div>
          <button 
            className="connect-button"
            onClick={initializeVoiceChat}
          >
            🎧 Подключиться
          </button>
        </div>
      ) : (
        <div className="voice-chat-active">
          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: {roomId}</span>
              <button 
                className="copy-button"
                onClick={copyRoomLink}
              >
                📋 Копировать
              </button>
            </div>
            <button 
              className="invite-button"
              onClick={invitePlayer}
            >
              ➕ Пригласить игрока
            </button>
          </div>

          <div className="participants-list">
            <h4>Участники ({participants.length})</h4>
            {participants.map(participant => (
              <div key={participant.id} className="participant-item">
                <div className="participant-info">
                  <div className="participant-avatar">
                    {participant.nickname.charAt(0).toUpperCase()}
                  </div>
                  <div className="participant-details">
                    <span className="participant-name">
                      {participant.nickname}
                      {participant.isYou && ' (Вы)'}
                    </span>
                    <div className="participant-status">
                      {participant.isMuted ? '🔇 Заглушен' : '🎤 Говорит'}
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
                        onChange={(e) => handleVolumeChange(participant.id, parseInt(e.target.value))}
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
              onClick={disconnectVoiceChat}
            >
              📞 Отключиться
            </button>
          </div>

          {/* Скрытый audio элемент для локального потока */}
          <audio ref={localAudioRef} autoPlay muted />
        </div>
      )}

      {/* Демо информация о возможностях */}
      <div className="voice-features-info">
        <h4>Возможности голосового чата:</h4>
        <ul>
          <li>🎯 Кристально чистое качество звука</li>
          <li>🔊 Индивидуальная регулировка громкости</li>
          <li>👥 До 8 участников в комнате</li>
          <li>⚡ Мгновенное подключение</li>
          <li>🛡️ Сквозное шифрование</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceChat;
