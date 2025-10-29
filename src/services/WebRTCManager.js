import SimpleWebRTC from './SimpleWebRTC';

// 🔥 ОБНОВЛЯЕМ URL ДЛЯ WebSocket
class WebRTCManager {
  constructor() {
    this.simpleWebRTC = new SimpleWebRTC();
  }

  async connectToSignalingServer(roomId, userId, nickname, callbacks) {
    try {
      // 🎯 ПРАВИЛЬНЫЙ WebSocket URL
      const wsUrl = 'wss://squadup-backend-03vr.onrender.com/ws';
      
      await this.simpleWebRTC.connect(wsUrl, roomId, userId, nickname);
      
      // Настраиваем колбэки
      this.simpleWebRTC.onRoomJoined = callbacks.onRoomJoined;
      this.simpleWebRTC.onUserJoined = callbacks.onUserJoined;
      this.simpleWebRTC.onUserLeft = callbacks.onUserLeft;
      this.simpleWebRTC.onWebRTCSignal = callbacks.onWebRTCSignal;
      this.simpleWebRTC.onError = callbacks.onError;

    } catch (error) {
      console.error('❌ WebRTCManager: Ошибка подключения', error);
      throw error;
    }
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
}

export default WebRTCManager;
