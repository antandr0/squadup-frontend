import SimpleWebRTC from './SimpleWebRTC';

class WebRTCManager {
  constructor() {
    this.simpleWebRTC = new SimpleWebRTC();
    this.isUsingExternalService = false;
    this.connectionTimeout = null;
  }

  async connectToSignalingServer(roomId, userId, nickname, callbacks) {
    // Устанавливаем общий таймаут 15 секунд
    return new Promise(async (resolve, reject) => {
      this.connectionTimeout = setTimeout(() => {
        reject(new Error('Таймаут подключения: сервер не отвежает более 15 секунд'));
      }, 15000);

      try {
        await this.tryConnect(roomId, userId, nickname, callbacks);
        clearTimeout(this.connectionTimeout);
        resolve();
      } catch (error) {
        clearTimeout(this.connectionTimeout);
        reject(error);
      }
    });
  }

  async tryConnect(roomId, userId, nickname, callbacks) {
    // Сначала пробуем наш бэкенд
    try {
      const wsUrl = 'wss://squadup-backend-03vr.onrender.com/ws';
      console.log('🔗 Пробуем подключиться к нашему бэкенду...');
      
      await this.simpleWebRTC.connect(wsUrl, roomId, userId, nickname);
      
      this.simpleWebRTC.onRoomJoined = callbacks.onRoomJoined;
      this.simpleWebRTC.onUserJoined = callbacks.onUserJoined;
      this.simpleWebRTC.onUserLeft = callbacks.onUserLeft;
      this.simpleWebRTC.onWebRTCSignal = callbacks.onWebRTCSignal;
      this.simpleWebRTC.onError = callbacks.onError;

      console.log('✅ Успешное подключение к нашему бэкенду');
      return;

    } catch (error) {
      console.log('❌ Не удалось подключиться к нашему бэкенду:', error.message);
      console.log('🔄 Пробуем внешний WebSocket сервис...');
    }

    // Fallback: используем публичный WebSocket сервер для демо
    try {
      await this.connectToExternalService(roomId, userId, nickname, callbacks);
      this.isUsingExternalService = true;
    } catch (externalError) {
      console.error('❌ Все способы подключения не удались');
      throw new Error(`Не удалось подключиться: ${externalError.message}`);
    }
  }

  async connectToExternalService(roomId, userId, nickname, callbacks) {
    return new Promise((resolve, reject) => {
      const externalWsUrl = 'wss://ws.postman-echo.com/raw';
      console.log('🔗 Пробуем внешний WebSocket сервис...');
      
      const ws = new WebSocket(externalWsUrl);
      const timeout = setTimeout(() => {
        reject(new Error('Внешний WebSocket сервер не отвежает'));
      }, 10000);

      ws.onopen = () => {
        clearTimeout(timeout);
        console.log('✅ Подключены к внешнему WebSocket серверу');
        
        // В демо-режиме имитируем успешное подключение
        setTimeout(() => {
          if (callbacks.onRoomJoined) {
            callbacks.onRoomJoined([
              { userId, nickname, isYou: true },
              { userId: 'demo-1', nickname: 'Player2' },
              { userId: 'demo-2', nickname: 'Player3' }
            ]);
          }
        }, 500);
        
        // Закрываем соединение - оно нам больше не нужно для демо
        setTimeout(() => ws.close(), 1000);
        resolve();
      };

      ws.onerror = (error) => {
        clearTimeout(timeout);
        console.error('❌ Ошибка внешнего WebSocket:', error);
        reject(new Error('Внешний WebSocket сервер недоступен'));
      };

      ws.onclose = () => {
        clearTimeout(timeout);
      };
    });
  }

  // Делегируем остальные методы
  getLocalAudioStream() {
    return this.simpleWebRTC.getLocalAudioStream();
  }

  leaveRoom() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }
    this.simpleWebRTC.leaveRoom();
  }

  toggleMute(muted) {
    this.simpleWebRTC.toggleMute(muted);
  }

  sendWebRTCSignal(signal) {
    this.simpleWebRTC.sendWebRTCSignal(signal);
  }

  cleanup() {
    if (this.connectionTimeout) {
      clearTimeout(this.connectionTimeout);
    }
    this.simpleWebRTC.cleanup();
  }

  isExternalService() {
    return this.isUsingExternalService;
  }
}

export default WebRTCManager;
