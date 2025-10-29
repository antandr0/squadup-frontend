import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WebRTCManager from '../services/WebRTCManager';
import EnhancedDemoVoiceChat from './EnhancedDemoVoiceChat';
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
  const [debugLog, setDebugLog] = useState([]);
  const [isUsingExternalService, setIsUsingExternalService] = useState(false);
  
  const webRTCManager = useRef(null);

  const addDebugLog = (message) => {
    console.log('🔧 Debug:', message);
    setDebugLog(prev => [...prev.slice(-9), `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    webRTCManager.current = new WebRTCManager();
    addDebugLog('WebRTCManager инициализирован');
    
    return () => {
      if (webRTCManager.current) {
        webRTCManager.current.cleanup();
        addDebugLog('WebRTCManager очищен');
      }
    };
  }, []);

  const initializeVoiceChat = async () => {
    try {
      setConnectionStatus('connecting');
      setErrorMessage('');
      addDebugLog('Начинаем подключение к голосовому чату...');
      
      addDebugLog('Запрашиваем доступ к микрофону...');
      await webRTCManager.current.getLocalAudioStream();
      addDebugLog('✅ Доступ к микрофону получен');
      
      const newRoomId = `room-${user.id}-${Date.now()}`;
      setRoomId(newRoomId);
      addDebugLog(`Создана комната: ${newRoomId}`);
      
      addDebugLog('Подключаемся к серверу сигналинга...');
      await webRTCManager.current.connectToSignalingServer(
        newRoomId,
        user.id,
        user.nickname,
        {
          onRoomJoined: (users) => {
            addDebugLog(`✅ Подключились к комнате, участников: ${users.length}`);
            setParticipants(users.map(u => ({
              ...u,
              isYou: u.userId === user.id,
              volume: 100,
              isMuted: false
            })));
            setIsConnected(true);
            setConnectionStatus('connected');
            setIsUsingExternalService(webRTCManager.current.isExternalService());
          },
          
          onUserJoined: (newUser) => {
            addDebugLog(`👤 Новый участник: ${newUser.nickname}`);
            setParticipants(prev => {
              if (prev.find(p => p.userId === newUser.userId)) return prev;
              return [...prev, {
                ...newUser,
                isYou: newUser.userId === user.id,
                volume: 100,
                isMuted: false
              }];
            });
          },
          
          onUserLeft: (userId) => {
            addDebugLog(`👤 Участник вышел: ${userId}`);
            setParticipants(prev => prev.filter(p => p.userId !== userId));
          },
          
          onError: (errorMsg) => {
            addDebugLog(`❌ Ошибка: ${errorMsg}`);
            setConnectionStatus('error');
            setErrorMessage(errorMsg);
          }
        }
      );

    } catch (error) {
      addDebugLog(`❌ Ошибка инициализации: ${error.message}`);
      setConnectionStatus('error');
      setErrorMessage(`
        Не удалось подключиться к серверу голосового чата.
        
        🔧 Причина: ${error.message}
        
        💡 Решение:
        • Render (бесплатный тариф) блокирует WebSocket соединения через Cloudflare
        • Для работы голосового чата нужен хостинг с поддержкой WebSocket
        • Альтернативы: Railway.app, Fly.io, или платный тариф Render
        
        🎭 А пока можете протестировать интерфейс в демо-режиме!
      `);
    }
  };

  const disconnectVoiceChat = () => {
    addDebugLog('Отключаемся от голосового чата...');
    if (webRTCManager.current) {
      webRTCManager.current.leaveRoom();
    }
    setIsConnected(false);
    setConnectionStatus('disconnected');
    setParticipants([]);
    setIsUsingExternalService(false);
    addDebugLog('✅ Отключены от голосового чата');
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    addDebugLog(newMutedState ? '🔇 Микрофон выключен' : '🎤 Микрофон включен');
    
    if (webRTCManager.current) {
      webRTCManager.current.toggleMute(newMutedState);
    }
  };

  const enableDemoMode = () => {
    addDebugLog('🔄 Включаем демо-режим');
    setUseDemoMode(true);
    setErrorMessage('');
  };

  if (useDemoMode) {
    return <EnhancedDemoVoiceChat />;
  }

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
            <h4>Проблема с подключением</h4>
            <div className="error-description">
              {errorMessage.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
            
            <div className="debug-log">
              <h5>Лог отладки:</h5>
              {debugLog.map((log, index) => (
                <div key={index} className="debug-line">{log}</div>
              ))}
            </div>
            
            <div className="error-actions">
              <button className="retry-button" onClick={initializeVoiceChat}>
                🔄 Попробовать снова
              </button>
              <button className="demo-button" onClick={enableDemoMode}>
                🎭 Демо-режим
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voice-chat">
      <div className="voice-chat-header">
        <h3 className="voice-chat-title">🎙️ Голосовой чат</h3>
        <div className="voice-chat-status">
          <div className={`status-indicator ${connectionStatus}`}>
            {connectionStatus === 'connected' ? 
              (isUsingExternalService ? 'Демо-режим' : 'Подключен') : 
             connectionStatus === 'connecting' ? 'Подключается...' : 'Отключен'}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Создать голосовую комнату</h4>
            <p>Пригласите тиммейтов для обсуждения тактики и координации в игре</p>
            
            <div className="connection-info">
              <p><strong>Текущий статус:</strong> {connectionStatus}</p>
              <p><strong>Сервер:</strong> squadup-backend-03vr.onrender.com</p>
              <p className="warning-text">
                ⚠️ Бесплатный Render может блокировать WebSocket соединения
              </p>
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
        <div className="voice-chat-active">
          {isUsingExternalService && (
            <div className="demo-notice">
              <div className="demo-icon">🎭</div>
              <div className="demo-content">
                <h4>Демо-режим активен</h4>
                <p>Используется внешний WebSocket сервер для демонстрации. Реальный голосовой чат будет работать после смены хостинга.</p>
              </div>
            </div>
          )}

          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>{roomId}</strong></span>
              <button className="copy-button" onClick={() => navigator.clipboard.writeText(roomId)}>
                📋 Копировать
              </button>
            </div>
            <div className="room-stats">
              👥 {participants.length}/6 игроков
              {isUsingExternalService && ' (демо)'}
            </div>
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
                    </div>
                  </div>
                </div>
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

          <div className="debug-section">
            <details>
              <summary>Отладочная информация</summary>
              <div className="debug-log">
                {debugLog.map((log, index) => (
                  <div key={index} className="debug-line">{log}</div>
                ))}
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceChat;
