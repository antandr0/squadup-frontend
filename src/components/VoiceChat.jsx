import React, { useEffect, useRef, useState } from 'react';

const VoiceChat = ({ roomId, userId, roomName, onClose }) => {
  const localAudioRef = useRef();
  const remoteAudioRef = useRef();
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [error, setError] = useState('');
  const [audioLevel, setAudioLevel] = useState(0); // Уровень звука 0-100
  const [isSpeaking, setIsSpeaking] = useState(false);

  const pc = useRef(null);
  const localStream = useRef(null);
  const audioContext = useRef(null);
  const analyser = useRef(null);
  const animationFrame = useRef(null);

  useEffect(() => {
    initializeVoiceChat();
    return () => {
      cleanup();
    };
  }, []);

  // Функция для анализа уровня звука
  const analyzeAudio = () => {
    if (!analyser.current || !localStream.current) return;

    const dataArray = new Uint8Array(analyser.current.frequencyBinCount);
    analyser.current.getByteFrequencyData(dataArray);

    // Вычисляем средний уровень звука
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;
    
    // Преобразуем в значение от 0 до 100
    const level = Math.min(100, Math.max(0, (average / 255) * 100));
    setAudioLevel(level);
    
    // Определяем, говорит ли пользователь (порог можно настроить)
    setIsSpeaking(level > 5);

    // Продолжаем анализ
    animationFrame.current = requestAnimationFrame(analyzeAudio);
  };

  const initializeVoiceChat = async () => {
    try {
      setConnectionStatus('connecting');
      setError('');

      // Запрашиваем доступ к микрофону
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          channelCount: 1,
          sampleRate: 48000
        },
        video: false 
      });

      localStream.current = stream;
      localAudioRef.current.srcObject = stream;

      // Создаем AudioContext для анализа звука
      audioContext.current = new (window.AudioContext || window.webkitAudioContext)();
      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 256;
      
      const source = audioContext.current.createMediaStreamSource(stream);
      source.connect(analyser.current);
      
      // Запускаем анализ звука
      analyzeAudio();

      // Создаем Peer Connection
      pc.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
          { urls: 'stun:stun1.l.google.com:19302' },
          { urls: 'stun:stun2.l.google.com:19302' },
          { urls: 'stun:stun3.l.google.com:19302' },
          { urls: 'stun:stun4.l.google.com:19302' }
        ]
      });

      // Добавляем локальные треки в соединение
      stream.getTracks().forEach(track => {
        pc.current.addTrack(track, stream);
      });

      // Настраиваем обработчики WebRTC событий
      pc.current.onicecandidate = (event) => {
        if (event.candidate) {
          console.log('❄️ ICE candidate:', event.candidate);
        }
      };

      pc.current.ontrack = (event) => {
        console.log('🎧 Получен удаленный аудиопоток');
        remoteAudioRef.current.srcObject = event.streams[0];
        setIsConnected(true);
        setConnectionStatus('connected');
      };

      pc.current.onconnectionstatechange = () => {
        const state = pc.current.connectionState;
        console.log('🔗 Connection state:', state);
        setConnectionStatus(state);
        
        if (state === 'connected') {
          setIsConnected(true);
        } else if (state === 'disconnected' || state === 'failed') {
          setIsConnected(false);
        }
      };

      // Создаем offer для установки соединения
      const offer = await pc.current.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: false
      });
      
      await pc.current.setLocalDescription(offer);
      
      console.log('✅ Голосовой чат инициализирован');
      setConnectionStatus('ready');

      // Симуляция подключения второго пользователя (для демо)
      setTimeout(() => {
        if (pc.current && pc.current.connectionState === 'new') {
          simulateRemoteConnection();
        }
      }, 2000);

    } catch (error) {
      console.error('❌ Ошибка инициализации голосового чата:', error);
      setError(`Не удалось подключить микрофон: ${error.message}`);
      setConnectionStatus('failed');
    }
  };

  // Функция для симуляции подключения второго пользователя (демо)
  const simulateRemoteConnection = async () => {
    try {
      const remotePc = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      const remoteStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      remoteStream.getTracks().forEach(track => {
        remotePc.addTrack(track, remoteStream);
      });

      const offer = await pc.current.createOffer();
      await pc.current.setLocalDescription(offer);
      
      await remotePc.setRemoteDescription(offer);
      const answer = await remotePc.createAnswer();
      await remotePc.setLocalDescription(answer);
      
      await pc.current.setRemoteDescription(answer);

      console.log('🤖 Демо: симуляция подключения завершена');

    } catch (error) {
      console.log('⚠️ Демо: симуляция не удалась, но это нормально для теста');
    }
  };

  const toggleMute = () => {
    if (localStream.current) {
      const audioTracks = localStream.current.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsMuted(!isMuted);
    }
  };

  const cleanup = () => {
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
    if (audioContext.current) {
      audioContext.current.close();
    }
    if (pc.current) {
      pc.current.close();
    }
    if (localStream.current) {
      localStream.current.getTracks().forEach(track => track.stop());
    }
    setIsConnected(false);
  };

  const disconnect = () => {
    cleanup();
    onClose();
  };

  const getStatusColor = () => {
    switch(connectionStatus) {
      case 'connected': return '#00ff88';
      case 'connecting': return '#ffc107';
      case 'ready': return '#4e54c8';
      case 'failed': return '#ff6b6b';
      default: return '#b0b0d0';
    }
  };

  const getStatusText = () => {
    switch(connectionStatus) {
      case 'connected': return 'Подключено';
      case 'connecting': return 'Подключение...';
      case 'ready': return 'Готов к подключению';
      case 'failed': return 'Ошибка подключения';
      default: return connectionStatus;
    }
  };

  // Функция для получения цвета индикатора звука
  const getAudioLevelColor = () => {
    if (audioLevel > 50) return '#ff6b6b'; // Красный - громко
    if (audioLevel > 20) return '#ffc107'; // Желтый - средне
    return '#00ff88'; // Зеленый - тихо
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'var(--card-bg)',
      border: '2px solid var(--primary-blue)',
      borderRadius: '15px',
      padding: '25px',
      zIndex: 1000,
      minWidth: '350px',
      maxWidth: '90vw',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(10px)'
    }}>
      {/* Заголовок */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          🎙️ {roomName}
        </h3>
        <button
          onClick={onClose}
          style={{
            background: 'rgba(255, 107, 107, 0.2)',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            color: '#ff6b6b',
            fontSize: '18px',
            cursor: 'pointer',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          ×
        </button>
      </div>

      {/* Статус подключения */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '15px',
        padding: '12px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px'
      }}>
        <div style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: getStatusColor(),
          animation: connectionStatus === 'connecting' ? 'pulse 1.5s infinite' : 'none'
        }}></div>
        <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
          {getStatusText()}
        </span>
        {isConnected && (
          <span style={{ 
            color: '#00ff88', 
            fontSize: '12px',
            marginLeft: 'auto'
          }}>
            🔊 Звук активен
          </span>
        )}
      </div>

      {/* Индикатор уровня звука */}
      <div style={{
        marginBottom: '20px',
        padding: '15px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '10px'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '8px'
        }}>
          <div style={{
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            background: isSpeaking ? getAudioLevelColor() : '#666',
            animation: isSpeaking ? 'pulse 0.5s infinite' : 'none'
          }}></div>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {isSpeaking ? '🎤 Говорите...' : '🔇 Микрофон активен'}
          </span>
        </div>
        
        {/* Визуальный индикатор уровня звука */}
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${audioLevel}%`,
            height: '100%',
            background: `linear-gradient(90deg, #00ff88, ${getAudioLevelColor()})`,
            borderRadius: '4px',
            transition: 'width 0.1s ease'
          }}></div>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px'
        }}>
          <span style={{ color: '#b0b0d0', fontSize: '10px' }}>Тихо</span>
          <span style={{ color: '#b0b0d0', fontSize: '10px' }}>Уровень: {Math.round(audioLevel)}%</span>
          <span style={{ color: '#b0b0d0', fontSize: '10px' }}>Громко</span>
        </div>
      </div>

      {/* Сообщение об ошибке */}
      {error && (
        <div style={{
          background: 'rgba(255, 107, 107, 0.1)',
          border: '1px solid rgba(255, 107, 107, 0.3)',
          color: '#ff6b6b',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '20px',
          fontSize: '14px'
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Элементы управления */}
      <div style={{
        display: 'flex',
        gap: '12px',
        justifyContent: 'center',
        marginBottom: '20px'
      }}>
        <button
          onClick={toggleMute}
          disabled={connectionStatus === 'failed'}
          style={{
            padding: '12px 20px',
            background: isMuted ? '#ff6b6b' : 'var(--primary-blue)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: connectionStatus === 'failed' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px',
            opacity: connectionStatus === 'failed' ? 0.6 : 1,
            transition: 'all 0.3s ease'
          }}
        >
          {isMuted ? '🔇' : '🎤'}
          {isMuted ? 'Включить' : 'Выключить'}
        </button>

        <button
          onClick={disconnect}
          style={{
            padding: '12px 20px',
            background: 'rgba(255, 107, 107, 0.2)',
            color: '#ff6b6b',
            border: '1px solid rgba(255, 107, 107, 0.3)',
            borderRadius: '10px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '14px'
          }}
        >
          📞 Завершить
        </button>
      </div>

      {/* Информация о комнате */}
      <div style={{
        fontSize: '12px',
        color: 'var(--text-secondary)',
        textAlign: 'center',
        padding: '10px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '8px'
      }}>
        <div>ID комнаты: <strong>{roomId}</strong></div>
        <div>💡 Используется WebRTC для прямого P2P соединения</div>
        {connectionStatus === 'ready' && (
          <div style={{ color: '#ffc107', marginTop: '5px' }}>
            ⏳ Ожидание подключения собеседника...
          </div>
        )}
      </div>

      {/* Скрытые аудио элементы */}
      <audio ref={localAudioRef} muted />
      <audio ref={remoteAudioRef} autoPlay />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default VoiceChat;