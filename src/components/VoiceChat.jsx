import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import WebRTCManager from '../services/WebRTCManager';
import DemoVoiceChat from './DemoVoiceChat';
import WebRTCDebugger from '../services/WebRTCDebugger';
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
  const [diagnosis, setDiagnosis] = useState(null);
  
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

  const runDiagnostics = async () => {
    addDebugLog('Запускаем диагностику подключения...');
    const diagnosisResult = await WebRTCDebugger.diagnoseConnection();
    setDiagnosis(diagnosisResult);
    addDebugLog('Диагностика завершена');
  };

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
      
      addDebugLog('Подключаемся к WebSocket серверу...');
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

      addDebugLog('✅ WebSocket подключен успешно');

    } catch (error) {
      addDebugLog(`❌ Ошибка инициализации: ${error.message}`);
      setConnectionStatus('error');
      setErrorMessage(error.message);
      
      // Автоматически запускаем диагностику при ошибке
      setTimeout(runDiagnostics, 1000);
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
    return <DemoVoiceChat />;
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
            <h4>Не удалось подключиться</h4>
            <p>{errorMessage}</p>
            
            {diagnosis && (
              <div className="diagnosis-info">
                <h5>Результаты диагностики:</h5>
                <p><strong>Рекомендация:</strong> {diagnosis.recommendation}</p>
                <div className="ws-tests">
                  {diagnosis.websocketTests.map((test, index) => (
                    <div key={index} className={`ws-test ${test.success ? 'success' : 'error'}`}>
                      <strong>{test.url}</strong>: {test.success ? '✅ Успех' : `❌ ${test.error}`}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
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
              <button className="diagnose-button" onClick={runDiagnostics}>
                🔍 Диагностика
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
            {connectionStatus === 'connected' ? 'Подключен' : 
             connectionStatus === 'connecting' ? 'Подключается...' : 'Отключен'}
          </div>
        </div>
      </div>

      {!isConnected ? (
        <div className="voice-chat-setup">
          <div className="setup-info">
            <h4>Создать голосовую комнату</h4>
            <p>Пригласите тиммейтов для обсуждения тактики и координации в игре</p>
            <div className="server-info">
              <strong>WebSocket URL:</strong> wss://squadup-backend-03vr.onrender.com/ws
            </div>
            <button className="diagnose-link" onClick={runDiagnostics}>
              🔍 Проверить подключение
            </button>
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
          <div className="room-info">
            <div className="room-id">
              <span>ID комнаты: <strong>{roomId}</strong></span>
              <button className="copy-button" onClick={() => navigator.clipboard.writeText(roomId)}>
                📋 Копировать
              </button>
            </div>
            <div className="room-stats">
              👥 {participants.length}/6 игроков
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
