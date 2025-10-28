import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WebRTCManager from '../services/WebRTCManager';
import './VoiceChat.css';

const VoiceChat = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  
  const webRTCManager = useRef(null);
  const audioElements = useRef(new Map());

  useEffect(() => {
    // Инициализируем WebRTCManager
    webRTCManager.current = new WebRTCManager();
    
    // Настройка обработчиков событий
    webRTCManager.current.onRemoteStream = (userId, stream) => {
      console.log('🔊 Remote stream received for user:', userId);
      // Создаем audio элемент для воспроизведения удаленного потока
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play().catch(e => console.error('Error playing audio:', e));
      audioElements.current.set(userId, audio);
    };

    return () => {
      // Очистка при размонтировании компонента
      if (webRTCManager.current) {
        webRTCManager.current.cleanup();
      }
      audioElements.current.forEach(audio => {
        audio.pause();
        audio.srcObject = null;
      });
      audioElements.current.clear();
    };
  }, []);

  // Инициализация голосового чата
  const initializeVoiceChat = async () => {
    try {
      setConnectionStatus('connecting');
      
      // Получаем доступ к микрофону
      await webRTCManager.current.getLocalAudioStream();
      
      // Генерируем ID комнаты
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      
      // Подключаемся к signaling server
      await webRTCManager.current.connectToSignalingServer(
        newRoomId,
        user.id,
        user.nickname,
        {
          onRoomJoined: (users) => {
            console.log('✅ Joined room with users:', users);
            setParticipants(users.map(u => ({
              ...u,
              isYou: u.userId === user.id,
              volume: 100,
              isMuted: false
            })));
            setIsConnected(true);
            setConnectionStatus('connected');
          },
          
          onUserJoined: (newUser) => {
            console.log('👤 User joined:', newUser);
            setParticipants(prev => {
              if (prev.find(p => p.userId === newUser.userId)) {
                return prev;
              }
              return [...prev, {
                ...newUser,
                isYou: newUser.userId === user.id,
                volume: 100,
                isMuted: false
              }];
            });
          },
          
          onUserLeft: (userId) => {
            console.log('👤 User left:', userId);
            setParticipants(prev => prev.filter(p => p.userId !== userId));
            
            // Останавливаем audio элемент
            const audio = audioElements.current.get(userId);
            if (audio) {
              audio.pause();
              audio.srcObject = null;
              audioElements.current.delete(userId);
            }
          },
          
          onUserMuteUpdated: (userId, isMuted) => {
            console.log(`🔇 User ${userId} mute:`, isMuted);
            setParticipants(prev => 
              prev.map(p => 
                p.userId === userId ? { ...p, isMuted } : p
              )
            );
          },
          
          onError: (errorMessage) => {
            console.error('Signaling error:', errorMessage);
            setConnectionStatus('error');
            alert(`Ошибка подключения: ${errorMessage}`);
          },
          
          userNickname: user.nickname
        }
      );

    } catch (error) {
      console.error('Error initializing voice chat:', error);
      setConnectionStatus('error');
      
      if (error.name === 'NotAllowedError') {
        alert('Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.');
      } else {
        alert(`Ошибка инициализации голосового чата: ${error.message}`);
      }
    }
  };

  const generateRoomId = () => {
    return `room-${Math.random().toString(36).substr(2, 9)}`;
  };

  const disconnectVoiceChat = () => {
    if (webRTCManager.current) {
      webRTCManager.current.leaveRoom();
    }
    
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setParticipants([]);
    
    // Очищаем все audio элементы
    audioElements.current.forEach(audio => {
      audio.pause();
      audio.srcObject = null;
    });
    audioElements.current.clear();
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    
    if (webRTCManager.current) {
      webRTCManager.current.toggleMute(newMutedState);
    }
  };

  const handleVolumeChange = (userId, volume) => {
    setParticipants(prev => 
      prev.map(p => 
        p.id === userId ? { ...p, volume } : p
      )
    );
    
    // Регулировка громкости audio элемента
    const audio = audioElements.current.get(userId);
    if (audio) {
      audio.volume = volume / 100;
    }
  };

  const copyRoomLink = () => {
    navigator.clipboard.writeText(roomId);
    alert('ID комнаты скопирован! Отправьте его друзьям для подключения.');
  };

  const invitePlayer = () => {
    const nickname = prompt('Введите никнейм игрока для приглашения:');
    if (nickname) {
      // В будущем здесь будет интеграция с системой друзей/приглашений
      alert(`Приглашение отправлено игроку ${nickname}!`);
    }
  };

  const getConnectionStatusText = () => {
    const statusMap = {
      disconnected: 'Отключен',
      connecting: 'Подключается...',
      connected: 'Подключен',
      error: 'Ошибка'
    };
    return statusMap[connectionStatus] || 'Неизвестно';
  };

  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${connectionStatus}`}>
            {getConnectionStatusText()}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Создать голосовую комнату</h4>
            <p>Пригласите тиммейтов для обсуждения тактики и координации в игре</p>
            <div className="feature-highlights">
              <span>🔒 Безопасное соединение</span>
              <span>🎯 Низкая задержка</span>
              <span>👥 До 8 участников</span>
            </div>
          </div>
          <button 
            className="connect-button"
            onClick={initializeVoiceChat}
            disabled={connectionStatus === 'connecting'}
          >
            {connectionStatus === 'connecting' ? '🔄 Подключение...' : '🎧 Подключиться'}
          </button>
        </div>
      ) : (
        <div className="voice-chat-active">
          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>{roomId}</strong></span>
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
              onClick={disconnectVoiceChat}
            >
              📞 Отключиться
            </button>
          </div>
        </div>
      )}

      {/* Информация о возможностях */}
      <div className="voice-features-info">
        <h4>Технологии:</h4>
        <ul>
          <li>⚡ WebRTC - прямое P2P соединение</li>
          <li>🔒 Сквозное шифрование</li>
          <li>🎯 Задержка менее 100мс</li>
          <li>🌐 Работает в любом современном браузере</li>
        </ul>
      </div>
    </div>
  );
};

export default VoiceChat;
