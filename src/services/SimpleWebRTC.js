// Простой WebRTC менеджер для голосового чата
class SimpleWebRTC {
  constructor() {
    this.ws = null;
    this.localStream = null;
    this.roomId = null;
    this.userId = null;
    this.callbacks = {};
  }

  async connect(wsUrl, roomId, userId, nickname) {
    try {
      this.roomId = roomId;
      this.userId = userId;
      
      console.log('🎯 Подключаемся к WebSocket:', wsUrl);
      
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Таймаут подключения к WebSocket'));
        }, 10000);

        this.ws = new WebSocket(wsUrl);

        this.ws.onopen = () => {
          clearTimeout(timeout);
          console.log('✅ WebSocket подключен успешно');
          
          // Отправляем запрос на присоединение к комнате
          this.ws.send(JSON.stringify({
            type: 'join-room',
            roomId,
            userId,
            nickname
          }));
          
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            this.handleMessage(data);
          } catch (error) {
            console.error('❌ Ошибка парсинга сообщения:', error);
          }
        };

        this.ws.onerror = (error) => {
          clearTimeout(timeout);
          console.error('❌ WebSocket ошибка:', error);
          reject(new Error('WebSocket ошибка подключения'));
        };

        this.ws.onclose = (event) => {
          clearTimeout(timeout);
          console.log(`🔌 WebSocket закрыт: код ${event.code}, причина: ${event.reason}`);
          if (event.code !== 1000) {
            reject(new Error(`Соединение закрыто: код ${event.code}`));
          }
        };
      });

    } catch (error) {
      console.error('❌ Ошибка подключения WebRTC:', error);
      throw error;
    }
  }

  handleMessage(data) {
    console.log('📨 WebSocket сообщение:', data.type);
    
    switch (data.type) {
      case 'connected':
        console.log('✅ WebSocket подтвердил подключение');
        break;
        
      case 'room-joined':
        console.log('🎮 Успешно присоединились к комнате, участников:', data.users?.length);
        if (this.callbacks.onRoomJoined) {
          this.callbacks.onRoomJoined(data.users);
        }
        break;
        
      case 'user-joined':
        console.log('👤 Новый участник:', data.nickname);
        if (this.callbacks.onUserJoined) {
          this.callbacks.onUserJoined({
            userId: data.userId,
            nickname: data.nickname
          });
        }
        break;
        
      case 'user-left':
        console.log('👋 Участник вышел:', data.userId);
        if (this.callbacks.onUserLeft) {
          this.callbacks.onUserLeft(data.userId);
        }
        break;
        
      case 'room-full':
        console.log('🚫 Комната заполнена:', data.message);
        if (this.callbacks.onError) {
          this.callbacks.onError(data.message);
        }
        break;
        
      case 'error':
        console.error('❌ Ошибка от сервера:', data.message);
        if (this.callbacks.onError) {
          this.callbacks.onError(data.message);
        }
        break;

      case 'webrtc-offer':
      case 'webrtc-answer':
      case 'webrtc-ice-candidate':
        if (this.callbacks.onWebRTCSignal) {
          this.callbacks.onWebRTCSignal(data);
        }
        break;
    }
  }

  async getLocalAudioStream() {
    try {
      console.log('🎤 Запрашиваем доступ к микрофону...');
      this.localStream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        },
        video: false 
      });
      console.log('✅ Доступ к микрофону получен');
      return this.localStream;
    } catch (error) {
      console.error('❌ Ошибка доступа к микрофону:', error);
      throw error;
    }
  }

  leaveRoom() {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: 'leave-room',
        roomId: this.roomId,
        userId: this.userId
      }));
    }
    
    if (this.ws) {
      this.ws.close(1000, 'Пользователь покинул комнату');
    }
    
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
    }
    
    console.log('👋 Покинули голосовую комнату');
  }

  toggleMute(muted) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !muted;
      });
      console.log(muted ? '🔇 Микрофон выключен' : '🎤 Микрофон включен');
    }
  }

  sendWebRTCSignal(signalData) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(signalData));
    }
  }

  cleanup() {
    this.leaveRoom();
  }
}

export default SimpleWebRTC;
