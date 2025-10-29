// Утилита для диагностики WebSocket подключения
class WebRTCDebugger {
  static async testWebSocketConnection() {
    const testUrls = [
      'wss://squadup-backend-03vr.onrender.com/ws',
      'wss://squadup-backend-03vr.onrender.com',
      'ws://squadup-backend-03vr.onrender.com/ws'
    ];

    const results = [];

    for (const url of testUrls) {
      try {
        const result = await this.testUrl(url);
        results.push({ url, ...result });
      } catch (error) {
        results.push({ url, success: false, error: error.message });
      }
    }

    return results;
  }

  static testUrl(url) {
    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        resolve({ success: false, error: 'Таймаут 5 секунд' });
      }, 5000);

      const ws = new WebSocket(url);

      ws.onopen = () => {
        clearTimeout(timeout);
        ws.close();
        resolve({ success: true, message: 'WebSocket подключен успешно' });
      };

      ws.onerror = (error) => {
        clearTimeout(timeout);
        resolve({ success: false, error: 'WebSocket ошибка' });
      };

      ws.onclose = (event) => {
        clearTimeout(timeout);
        if (event.code !== 1000) {
          resolve({ success: false, error: `Закрыто с кодом ${event.code}` });
        }
      };
    });
  }

  static async diagnoseConnection() {
    console.log('🔍 Диагностика WebSocket подключения...');
    
    // Проверяем базовый API
    try {
      const healthResponse = await fetch('https://squadup-backend-03vr.onrender.com/health');
      const healthData = await healthResponse.json();
      console.log('✅ Health check:', healthData);
    } catch (error) {
      console.log('❌ Health check failed:', error);
    }

    // Тестируем WebSocket URLs
    const wsResults = await this.testWebSocketConnection();
    console.log('🔌 WebSocket тесты:', wsResults);

    return {
      health: 'ok',
      websocketTests: wsResults,
      recommendation: this.getRecommendation(wsResults)
    };
  }

  static getRecommendation(results) {
    const workingUrl = results.find(r => r.success);
    if (workingUrl) {
      return `Используйте URL: ${workingUrl.url}`;
    }

    if (results.some(r => r.error.includes('404'))) {
      return 'WebSocket endpoint не найден. Проверьте что бэкенд обновлен на Render.';
    }

    if (results.some(r => r.error.includes('Таймаут'))) {
      return 'Таймаут подключения. Render может блокировать WebSocket на бесплатном тарифе.';
    }

    return 'Неизвестная ошибка. Проверьте консоль Render для логов.';
  }
}

export default WebRTCDebugger;
