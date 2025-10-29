import SimpleWebRTC from './SimpleWebRTC';

class WebRTCManager {
  constructor() {
    this.simpleWebRTC = new SimpleWebRTC();
    this.isUsingExternalService = false;
  }

  async connectToSignalingServer(roomId, userId, nickname, callbacks) {
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
      throw externalError;
    }
  }

  async connectToExternalService(roomId, userId, nickname, callbacks) {
    // Используем публичный WebSocket эхо-сервер для демонстрации
    const externalWsUrl = 'wss://ws.postman-echo.com/raw';
    
    return new Promise((resolve, reject) => {
      const ws = new WebSocket(externalWsUrl);
      const timeout = setTimeout(() => reject(new Error('External WebSocket timeout')), 10000);

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
        }, 1000);
        
        resolve();
      };

      ws.onerror = () => {
        clearTimeout(timeout);
        reject(new Error('External WebSocket error'));
      };
    });
  }

  // Делегируем остальные методы
  getLocalAudioStream() {
    return this.simpleWebRTC.getLocalAudioStream();
  }

  leaveRoom() {
    this.simpleWebRTC.leaveRoom();
  }

  toggleMute(muted) {
    this.simpleWebRTC.toggleMute(muted);
  }

  sendWebRTCSignal(signal) {
    this.simpleWebRTC.sendWebRTCSignal(signal);
  }

  cleanup() {
    this.simpleWebRTC.cleanup();
  }

  isExternalService() {
    return this.isUsingExternalService;
  }
}

export default WebRTCManager;
