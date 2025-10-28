import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WebRTCManager from '../services/WebRTCManager';
import DemoVoiceChat from './DemoVoiceChat';
import './VoiceChat.css';

const VoiceChat = () => {
  const { user } = useAuth();
  const [isConnected, setIsConnected] = useState(false);
  const [roomId, setRoomId] = useState('');
  const [participants, setParticipants] = useState([]);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [useDemoMode, setUseDemoMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const webRTCManager = useRef(null);
  const audioElements = useRef(new Map());

  useEffect(() => {
    webRTCManager.current = new WebRTCManager();
    
    webRTCManager.current.onRemoteStream = (userId, stream) => {
      console.log('🔊 Remote stream received for user:', userId);
      const audio = new Audio();
      audio.srcObject = stream;
      audio.play().catch(e => console.error('Error playing audio:', e));
      audioElements.current.set(userId, audio);
    };

    return () => {
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

  const initializeVoiceChat = async () => {
    try {
      setConnectionStatus('connecting');
      setErrorMessage('');
      
      await webRTCManager.current.getLocalAudioStream();
      
      const newRoomId = generateRoomId();
      setRoomId(newRoomId);
      
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
            
            const audio = audioElements.current.get(userId);
            if (audio) {
              audio.pause();
              audio.srcObject = null;
              audioElements.current.delete(userId);
            }
          },
          
          onUserMuteUpdated: (userId, isMuted) => {
            setParticipants(prev => 
              prev.map(p => 
                p.userId === userId ? { ...p, isMuted } : p
              )
            );
          },
          
          onError: (errorMessage) => {
            setConnectionStatus('error');
            setErrorMessage(errorMessage);
          },
          
          userNickname: user.nickname
        }
      );

    } catch (error) {
      console.error('Error initializing voice chat:', error);
      setConnectionStatus('error');
      setErrorMessage(error.message || 'Неизвестная ошибка');
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
        p.userId === userId ? { ...p, volume } : p
      )
    );
    
    const audio = audioElements.current.get(userId);
    if (audio) {
      audio.volume = volume / 100;
    }
  };

  const enableDemoMode = () => {
    setUseDemoMode(true);
    setErrorMessage('');
  };

  const disableDemoMode = () => {
    setUseDemoMode(false);
    setErrorMessage('');
  };

  // Если включен демо-режим, показываем демо компонент
  if (useDemoMode) {
    return <DemoVoiceChat />;
  }

  // Если есть ошибка, показываем сообщение об ошибке
  if (connectionStatus === 'error' && !isConnected) {
    return (
      <div className="voice-chat">
        <div className="voice-chat-header">
          <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
          <div className="voice-chat-status">
            <div className="status-indicator error">Ошибка</div>
          </div>
        </div>

        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <div className="error-content">
            <h4>Не удалось подключиться</h4>
            <p>{errorMessage}</p>
            <div className="error-actions">
              <button className="retry-button" onClick={initializeVoiceChat}>
                🔄 Попробовать снова
              </button>
              <button className="demo-button" onClick={enableDemoMode}>
                🎭 Включить демо-режим
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Основной интерфейс
  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${connectionStatus}`}>
            {connectionStatus === 'connected' ? 'Подключен' : 
             connectionStatus === 'connecting' ? 'Подключается...' : 
             connectionStatus === 'error' ? 'Ошибка' : 'Отключен'}
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
          
          <div className="demo-fallback">
            <button className="demo-fallback-button" onClick={enableDemoMode}>
              🎭 Протестировать интерфейс (демо)
            </button>
          </div>
        </div>
      ) : (
        // ... остальной код интерфейса без изменений
        <div className="voice-chat-active">
          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>{roomId}</strong></span>
              <button className="copy-button">
                📋 Копировать
              </button>
            </div>
            <button className="invite-button">
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
    </div>
  );
};

export default VoiceChat;
