class WebRTCManager {
  constructor() {
    this.localStream = null;
    this.peerConnections = new Map();
    this.remoteStreams = new Map();
    this.ws = null;
    this.connectionId = null;
    this.roomId = null;
    this.userId = null;
    
    this.rtcConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' }
      ]
    };
  }

  async connectToSignalingServer(roomId, userId, nickname, onMessage) {
    return new Promise((resolve, reject) => {
      try {
        const wsUrl = this.getWebSocketUrl();
        console.log(`🔄 Connecting to WebSocket: ${wsUrl}`);
        
        this.ws = new WebSocket(wsUrl);
        this.roomId = roomId;
        this.userId = userId;

        const timeoutId = setTimeout(() => {
          reject(new Error('Таймаут подключения к серверу'));
          if (this.ws) {
            this.ws.close();
          }
        }, 10000);

        this.ws.onopen = () => {
          clearTimeout(timeoutId);
          console.log('✅ WebSocket connected');
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message = JSON.parse(event.data);
            this.handleSignalingMessage(message, onMessage);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(timeoutId);
          console.error('WebSocket error:', error);
          reject(new Error('Ошибка подключения к WebSocket серверу'));
        };

        this.ws.onclose = (event) => {
          clearTimeout(timeoutId);
          console.log('WebSocket closed:', event.code, event.reason);
          if (event.code !== 1000) {
            onMessage.onError?.(`Соединение закрыто: ${event.reason || 'код ' + event.code}`);
          }
        };

      } catch (error) {
        reject(new Error(`Ошибка инициализации: ${error.message}`));
      }
    });
  }

  getWebSocketUrl() {
    // Для production на Render - используем тот же URL что и для API
    if (window.location.hostname === 'squadup-frontend.vercel.app') {
      return 'wss://squadup-backend-03vr.onrender.com/ws';
    }
    // Для local development
    return 'ws://localhost:10000/ws';
  }

  handleSignalingMessage(message, onMessage) {
    console.log('📨 WebSocket message:', message.type);

    switch (message.type) {
      case 'welcome':
        this.connectionId = message.connectionId;
        this.joinRoom(nickname);
        break;

      case 'room-joined':
        onMessage.onRoomJoined?.(message.users);
        break;

      case 'user-joined':
        onMessage.onUserJoined?.(message.user);
        break;

      case 'user-left':
        onMessage.onUserLeft?.(message.userId);
        break;

      case 'webrtc-offer':
        this.handleOffer(message.offer, message.fromConnectionId);
        break;

      case 'webrtc-answer':
        this.handleAnswer(message.answer, message.fromConnectionId);
        break;

      case 'ice-candidate':
        this.handleICECandidate(message.candidate, message.fromConnectionId);
        break;

      case 'user-mute-updated':
        onMessage.onUserMuteUpdated?.(message.userId, message.isMuted);
        break;

      case 'error':
        onMessage.onError?.(message.message);
        break;

      default:
        console.log('Unknown WebSocket message:', message.type);
    }
  }

  joinRoom(nickname) {
    this.sendToSignaling({
      type: 'join-room',
      roomId: this.roomId,
      data: {
        userId: this.userId,
        nickname: nickname
      }
    });
  }

  async getLocalAudioStream() {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error('Ваш браузер не поддерживает доступ к микрофону');
      }

      this.localStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false
      });
      return this.localStream;
    } catch (error) {
      console.error('Microphone access error:', error);
      
      if (error.name === 'NotAllowedError') {
        throw new Error('Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.');
      } else if (error.name === 'NotFoundError') {
        throw new Error('Микрофон не найден. Убедитесь что микрофон подключен.');
      } else {
        throw new Error(`Не удалось получить доступ к микрофону: ${error.message}`);
      }
    }
  }

  sendToSignaling(message) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
      console.log('📤 Sent message:', message.type);
    } else {
      console.warn('WebSocket not connected, cannot send message');
    }
  }

  // WebRTC методы (пока заглушки для демо)
  async handleOffer(offer, fromConnectionId) {
    console.log('📞 Received WebRTC offer from:', fromConnectionId);
  }

  async handleAnswer(answer, fromConnectionId) {
    console.log('📞 Received WebRTC answer from:', fromConnectionId);
  }

  async handleICECandidate(candidate, fromConnectionId) {
    console.log('🧊 Received ICE candidate from:', fromConnectionId);
  }

  toggleMute(isMuted) {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMuted;
      });

      this.sendToSignaling({
        type: 'mute-audio',
        roomId: this.roomId,
        data: { isMuted }
      });
    }
  }

  leaveRoom() {
    if (this.roomId) {
      this.sendToSignaling({
        type: 'leave-room',
        roomId: this.roomId
      });
    }
    this.cleanup();
  }

  cleanup() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.connectionId = null;
    this.roomId = null;
  }
}

export default WebRTCManager;
