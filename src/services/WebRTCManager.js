class WebRTCManager {
  constructor() {
    this.localStream = null;
    this.peerConnections = new Map(); // connectionId -> RTCPeerConnection
    this.remoteStreams = new Map(); // userId -> MediaStream
    this.ws = null;
    this.connectionId = null;
    this.roomId = null;
    this.userId = null;
    
    // STUN серверы (бесплатные)
    this.rtcConfig = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    };
  }

  // Подключение к Signaling Server
  connectToSignalingServer(roomId, userId, nickname, onMessage) {
    return new Promise((resolve, reject) => {
      try {
        // WebSocket подключение к signaling server
        this.ws = new WebSocket('ws://localhost:8080');
        this.roomId = roomId;
        this.userId = userId;

        this.ws.onopen = () => {
          console.log('✅ Connected to signaling server');
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
          console.error('WebSocket error:', error);
          reject(error);
        };

        this.ws.onclose = () => {
          console.log('❌ Disconnected from signaling server');
          this.cleanup();
        };

      } catch (error) {
        reject(error);
      }
    });
  }

  // Обработка сообщений от signaling server
  handleSignalingMessage(message, onMessage) {
    console.log('📨 Signaling message:', message.type);

    switch (message.type) {
      case 'welcome':
        this.connectionId = message.connectionId;
        // Присоединяемся к комнате после получения connectionId
        this.joinRoom(this.userId, this.roomId, onMessage.userNickname);
        break;

      case 'room-joined':
        onMessage.onRoomJoined?.(message.users);
        // Начинаем устанавливать WebRTC соединения с другими пользователями
        this.createPeerConnections(message.users);
        break;

      case 'user-joined':
        onMessage.onUserJoined?.(message.user);
        // Создаем peer connection для нового пользователя
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

  // Присоединение к комнате
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

  // Выход из комнаты
  leaveRoom() {
    if (this.roomId) {
      this.sendToSignaling({
        type: 'leave-room',
        roomId: this.roomId
      });
    }
    this.cleanup();
  }

  // Создание peer connections для всех пользователей в комнате
  async createPeerConnections(users) {
    for (const user of users) {
      // Пропускаем себя
      if (user.userId === this.userId) continue;
      
      await this.createPeerConnectionForUser(user);
    }
  }

  // Создание peer connection для конкретного пользователя
  async createPeerConnectionForUser(user) {
    if (this.peerConnections.has(user.userId)) {
      console.log(`Peer connection already exists for user: ${user.userId}`);
      return;
    }

    try {
      const peerConnection = new RTCPeerConnection(this.rtcConfig);
      
      // Добавляем локальный поток если он есть
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, this.localStream);
        });
      }

      // Обработка ICE candidates
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

      // Обработка входящих потоков
      peerConnection.ontrack = (event) => {
        console.log('📞 Received remote stream from:', user.userId);
        const remoteStream = event.streams[0];
        this.remoteStreams.set(user.userId, remoteStream);
        
        // Уведомляем UI о новом потоке
        if (this.onRemoteStream) {
          this.onRemoteStream(user.userId, remoteStream);
        }
      };

      // Обработка изменения состояния соединения
      peerConnection.onconnectionstatechange = () => {
        console.log(`Connection state for ${user.userId}:`, peerConnection.connectionState);
        
        if (peerConnection.connectionState === 'connected') {
          console.log(`✅ WebRTC connected with ${user.userId}`);
        } else if (peerConnection.connectionState === 'failed' || 
                   peerConnection.connectionState === 'disconnected') {
          console.log(`❌ WebRTC disconnected from ${user.userId}`);
        }
      };

      this.peerConnections.set(user.userId, peerConnection);

      // Создаем offer для установки соединения
      await this.createOffer(peerConnection, user.connectionId);

    } catch (error) {
      console.error('Error creating peer connection:', error);
    }
  }

  // Создание и отправка offer
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

  // Обработка входящего offer
  async handleOffer(offer, fromConnectionId) {
    try {
      const peerConnection = new RTCPeerConnection(this.rtcConfig);
      
      // Добавляем локальный поток
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => {
          peerConnection.addTrack(track, this.localStream);
        });
      }

      // Обработка ICE candidates
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

      // Обработка входящих потоков
      peerConnection.ontrack = (event) => {
        const remoteStream = event.streams[0];
        // Находим userId по connectionId (в реальном приложении нужен mapping)
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

      // Сохраняем peer connection
      const userId = this.findUserIdByConnectionId(fromConnectionId);
      if (userId) {
        this.peerConnections.set(userId, peerConnection);
      }

    } catch (error) {
      console.error('Error handling offer:', error);
    }
  }

  // Обработка входящего answer
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

  // Обработка ICE candidate
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

  // Получение локального аудио потока
  async getLocalAudioStream() {
    try {
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
      throw error;
    }
  }

  // Mute/unmute локального микрофона
  toggleMute(isMuted) {
    if (this.localStream) {
      const audioTracks = this.localStream.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !isMuted;
      });

      // Уведомляем сервер об изменении статуса mute
      this.sendToSignaling({
        type: 'mute-audio',
        roomId: this.roomId,
        data: { isMuted }
      });
    }
  }

  // Отправка сообщения на signaling server
  sendToSignaling(message) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket not connected');
    }
  }

  // Вспомогательные методы
  findUserIdByConnectionId(connectionId) {
    // В реальном приложении нужно хранить mapping connectionId -> userId
    // Пока возвращаем connectionId как временное решение
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

  // Очистка ресурсов
  cleanup() {
    // Закрываем все peer connections
    this.peerConnections.forEach((pc, userId) => {
      pc.close();
    });
    this.peerConnections.clear();
    this.remoteStreams.clear();

    // Останавливаем локальный поток
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    // Закрываем WebSocket соединение
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }

    this.connectionId = null;
    this.roomId = null;
  }
}

export default WebRTCManager;
