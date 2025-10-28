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
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    };

    // Добавляем таймаут для WebSocket
    this.connectionTimeout = 10000; // 10 секунд
  }

  // Улучшенное подключение к Signaling Server с fallback
  async connectToSignalingServer(roomId, userId, nickname, onMessage) {
    return new Promise(async (resolve, reject) => {
      try {
        // Пробуем разные адреса signaling server
        const signalingServers = [
          'wss://squadup-backend-03vr.onrender.com', // Production WebSocket
          'ws://localhost:8080', // Local development
          `ws://${window.location.hostname}:8080` // Same host
        ];

        let connectionError = null;

        for (const serverUrl of signalingServers) {
          try {
            console.log(`🔄 Trying to connect to: ${serverUrl}`);
            await this.tryConnectToServer(serverUrl, roomId, userId, nickname, onMessage);
            console.log(`✅ Connected to: ${serverUrl}`);
            resolve();
            return;
          } catch (error) {
            connectionError = error;
            console.warn(`❌ Failed to connect to ${serverUrl}:`, error.message);
            continue;
          }
        }

        // Если все серверы недоступны
        reject(new Error(`Не удалось подключиться к серверу голосового чата. Все серверы недоступны.`));

      } catch (error) {
        console.error('Connection failed:', error);
        reject(new Error(`Ошибка подключения: ${error.message || 'Неизвестная ошибка'}`));
      }
    });
  }

  // Попытка подключения к конкретному серверу
  tryConnectToServer(serverUrl, roomId, userId, nickname, onMessage) {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        reject(new Error('Таймаут подключения'));
        if (this.ws) {
          this.ws.close();
        }
      }, this.connectionTimeout);

      try {
        this.ws = new WebSocket(serverUrl);
        this.roomId = roomId;
        this.userId = userId;

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
            console.error('Error parsing signaling message:', error);
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(timeoutId);
          console.error('WebSocket error:', error);
          reject(new Error('Ошибка WebSocket соединения'));
        };

        this.ws.onclose = (event) => {
          clearTimeout(timeoutId);
          console.log('WebSocket closed:', event.code, event.reason);
          if (event.code !== 1000) {
            reject(new Error(`Соединение закрыто: ${event.reason || 'Код ' + event.code}`));
          }
        };

      } catch (error) {
        clearTimeout(timeoutId);
        reject(error);
      }
    });
  }

  // Остальные методы остаются без изменений
  handleSignalingMessage(message, onMessage) {
    console.log('📨 Signaling message:', message.type);

    switch (message.type) {
      case 'welcome':
        this.connectionId = message.connectionId;
        this.joinRoom(this.userId, this.roomId, onMessage.userNickname);
        break;

      case 'room-joined':
        onMessage.onRoomJoined?.(message.users);
        this.createPeerConnections(message.users);
        break;

      case 'user-joined':
        onMessage.onUserJoined?.(message.user);
        this.createPeerConnectionForUser(message.user);
        break;

      case 'user-left':
        onMessage.onUserLeft?.(message.userId);
        this.closePeerConnection(message.userId);
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
        console.warn('Unknown signaling message type:', message.type);
    }
  }

  joinRoom(userId, roomId, nickname) {
    this.sendToSignaling({
      type: 'join-room',
      roomId: roomId,
      data: {
        userId: userId,
        nickname: nickname
      }
    });
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

  async createPeerConnections(users) {
    for (const user of users) {
      if (user.userId === this.userId) continue;
      await this.createPeerConnectionForUser(user);
    }
  }

  async createPeerConnectionForUser(user) {
    if (this.peerConnections.has(user.userId)) {
      return;
    }

    try {
      const peerConnection = new RTCPeerConnection(this.rtcConfig);
      
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, this.localStream);
        });
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendToSignaling({
            type: 'ice-candidate',
            roomId: this.roomId,
            data: {
              targetConnectionId: user.connectionId,
              candidate: event.candidate
            }
          });
        }
      };

      peerConnection.ontrack = (event) => {
        console.log('📞 Received remote stream from:', user.userId);
        const remoteStream = event.streams[0];
        this.remoteStreams.set(user.userId, remoteStream);
        
        if (this.onRemoteStream) {
          this.onRemoteStream(user.userId, remoteStream);
        }
      };

      peerConnection.onconnectionstatechange = () => {
        console.log(`Connection state for ${user.userId}:`, peerConnection.connectionState);
      };

      this.peerConnections.set(user.userId, peerConnection);
      await this.createOffer(peerConnection, user.connectionId);

    } catch (error) {
      console.error('Error creating peer connection:', error);
    }
  }

  async createOffer(peerConnection, targetConnectionId) {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      this.sendToSignaling({
        type: 'webrtc-offer',
        roomId: this.roomId,
        data: {
          targetConnectionId: targetConnectionId,
          sdp: offer
        }
      });
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  }

  async handleOffer(offer, fromConnectionId) {
    try {
      const peerConnection = new RTCPeerConnection(this.rtcConfig);
      
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, this.localStream);
        });
      }

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          this.sendToSignaling({
            type: 'ice-candidate',
            roomId: this.roomId,
            data: {
              targetConnectionId: fromConnectionId,
              candidate: event.candidate
            }
          });
        }
      };

      peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0];
        const userId = this.findUserIdByConnectionId(fromConnectionId);
        if (userId) {
          this.remoteStreams.set(userId, remoteStream);
          if (this.onRemoteStream) {
            this.onRemoteStream(userId, remoteStream);
          }
        }
      };

      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      this.sendToSignaling({
        type: 'webrtc-answer',
        roomId: this.roomId,
        data: {
          targetConnectionId: fromConnectionId,
          sdp: answer
        }
      });

      const userId = this.findUserIdByConnectionId(fromConnectionId);
      if (userId) {
        this.peerConnections.set(userId, peerConnection);
      }

    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  async handleAnswer(answer, fromConnectionId) {
    try {
      const userId = this.findUserIdByConnectionId(fromConnectionId);
      const peerConnection = this.peerConnections.get(userId);
      
      if (peerConnection) {
        await peerConnection.setRemoteDescription(answer);
      }
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  }

  async handleICECandidate(candidate, fromConnectionId) {
    try {
      const userId = this.findUserIdByConnectionId(fromConnectionId);
      const peerConnection = this.peerConnections.get(userId);
      
      if (peerConnection) {
        await peerConnection.addIceCandidate(candidate);
      }
    } catch (error) {
      console.error('Error handling ICE candidate:', error);
    }
  }

  async getLocalAudioStream() {
    try {
      // Проверяем поддержку getUserMedia
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
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
      console.error('Error accessing microphone:', error);
      
      // Преобразуем стандартные ошибки в понятные сообщения
      if (error.name === 'NotAllowedError') {
        throw new Error('Доступ к микрофону запрещен. Разрешите доступ в настройках браузера.');
      } else if (error.name === 'NotFoundError') {
        throw new Error('Микрофон не найден. Убедитесь что микрофон подключен и доступен.');
      } else if (error.name === 'NotSupportedError') {
        throw new Error('Ваш браузер не поддерживает аудио захват.');
      } else {
        throw new Error(`Не удалось получить доступ к микрофону: ${error.message}`);
      }
    }
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

  sendToSignaling(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  findUserIdByConnectionId(connectionId) {
    return connectionId;
  }

  closePeerConnection(userId) {
    const peerConnection = this.peerConnections.get(userId);
    if (peerConnection) {
      peerConnection.close();
      this.peerConnections.delete(userId);
    }
    this.remoteStreams.delete(userId);
  }

  cleanup() {
    this.peerConnections.forEach((pc, userId) => {
      pc.close();
    });
    this.peerConnections.clear();
    this.remoteStreams.clear();

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
