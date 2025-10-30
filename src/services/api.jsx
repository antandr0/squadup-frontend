const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://squadup-backend-03vr.onrender.com';

// 🚀 СИСТЕМА КЭШИРОВАНИЯ
class CacheService {
  constructor() {
    this.cache = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 минут
  }

  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, {
      data,
      expiry: Date.now() + ttl,
      ttl
    });
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;

    // Проверяем не истек ли TTL
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.data;
  }

  delete(key) {
    this.cache.delete(key);
  }

  clear() {
    this.cache.clear();
  }

  // Статистика кэша для мониторинга
  getStats() {
    const now = Date.now();
    let valid = 0, expired = 0;
    
    this.cache.forEach(item => {
      if (now > item.expiry) expired++;
      else valid++;
    });

    return {
      total: this.cache.size,
      valid,
      expired,
      hitRate: this.getHitRate()
    };
  }

  getHitRate() {
    // Простая реализация hit rate
    return this.cache.size > 0 ? Math.round((valid / this.cache.size) * 100) : 0;
  }
}

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.isDemoMode = false;
    this.cache = new CacheService();
    this.requestQueue = new Map(); // Для дедупликации параллельных запросов
    this.requestStats = {
      total: 0,
      cached: 0,
      network: 0
    };
  }

  // 🎯 УЛУЧШЕННЫЙ МЕТОД ЗАПРОСА С КЭШИРОВАНИЕМ
  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    const method = options.method || 'GET';
    const useCache = options.useCache !== false && method === 'GET';
    const cacheKey = this.generateCacheKey(endpoint, options);

    // 🔥 ДЕДУПЛИКАЦИЯ ПАРАЛЛЕЛЬНЫХ ЗАПРОСОВ
    if (this.requestQueue.has(cacheKey)) {
      console.log(`🔄 Дедупликация запроса: ${cacheKey}`);
      return this.requestQueue.get(cacheKey);
    }

    // 🔥 ПРОВЕРКА КЭША ДЛЯ GET ЗАПРОСОВ
    if (useCache) {
      const cachedData = this.cache.get(cacheKey);
      if (cachedData) {
        console.log(`💾 Используем кэш для: ${endpoint}`);
        this.requestStats.cached++;
        this.requestStats.total++;
        return cachedData;
      }
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    // Создаем промис для дедупликации
    const requestPromise = (async () => {
      try {
        console.log(`🌐 Сетевой запрос: ${this.baseURL}${endpoint}`);
        const response = await fetch(`${this.baseURL}${endpoint}`, config);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // 🔥 КЭШИРУЕМ УСПЕШНЫЕ GET ЗАПРОСЫ
        if (useCache && data.success !== false) {
          const ttl = this.getTTLForEndpoint(endpoint);
          this.cache.set(cacheKey, data, ttl);
          console.log(`💾 Сохранили в кэш: ${endpoint} (TTL: ${ttl/1000}s)`);
        }

        this.requestStats.network++;
        this.requestStats.total++;
        
        return data;
      } catch (error) {
        console.warn(`❌ API Failed: ${error.message}, using demo mode`);
        this.isDemoMode = true;
        
        // Не кэшируем demo responses
        const demoData = await this.getDemoResponse(endpoint, options);
        this.requestStats.network++;
        this.requestStats.total++;
        return demoData;
      } finally {
        // Удаляем из очереди после завершения
        this.requestQueue.delete(cacheKey);
      }
    })();

    // Добавляем в очередь для дедупликации
    this.requestQueue.set(cacheKey, requestPromise);
    return requestPromise;
  }

  // 🎯 ГЕНЕРАЦИЯ КЛЮЧА КЭША
  generateCacheKey(endpoint, options) {
    const body = options.body ? JSON.stringify(options.body) : '';
    return `${endpoint}|${body}|${options.method || 'GET'}`;
  }

  // 🎯 TTL ДЛЯ РАЗНЫХ ENDPOINTS
  getTTLForEndpoint(endpoint) {
    const ttlConfig = {
      '/api/profiles': 2 * 60 * 1000, // 2 минуты для профилей
      '/api/auth/me': 5 * 60 * 1000,  // 5 минут для данных пользователя
      '/health': 30 * 1000,           // 30 секунд для health check
      default: 5 * 60 * 1000          // 5 минут по умолчанию
    };

    return ttlConfig[endpoint] || ttlConfig.default;
  }

  // 🎯 МЕТОДЫ ДЛЯ УПРАВЛЕНИЯ КЭШЕМ
  clearCache() {
    this.cache.clear();
    console.log('🧹 Кэш полностью очищен');
  }

  invalidateEndpoint(endpointPattern) {
    let cleared = 0;
    for (const key of this.cache.cache.keys()) {
      if (key.includes(endpointPattern)) {
        this.cache.delete(key);
        cleared++;
      }
    }
    console.log(`🧹 Очищено ${cleared} записей кэша для: ${endpointPattern}`);
  }

  getCacheStats() {
    return {
      cache: this.cache.getStats(),
      requests: this.requestStats
    };
  }

  // 🔧 СУЩЕСТВУЮЩИЕ МЕТОДЫ С КЭШИРОВАНИЕМ
  async login(email, password) {
    // Не кэшируем логин
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      useCache: false
    });
    
    if (response.token && response.user) {
      localStorage.setItem('token', response.token);
      // Инвалидируем кэш при смене пользователя
      this.invalidateEndpoint('/api/profiles');
      this.invalidateEndpoint('/api/auth/me');
      return { success: true, user: response.user };
    } else if (response.error) {
      return { success: false, error: response.error };
    }
    
    return { success: false, error: 'Ошибка авторизации' };
  }

  async register(email, password, nickname) {
    // Не кэшируем регистрацию
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname }),
      useCache: false
    });
    
    if (response.token && response.user) {
      localStorage.setItem('token', response.token);
      return { success: true, user: response.user };
    } else if (response.error) {
      return { success: false, error: response.error };
    }
    
    return { success: false, error: 'Ошибка регистрации' };
  }

  async getProfiles() {
    // Кэшируем запрос профилей
    return this.request('/api/profiles', {
      useCache: true
    });
  }

  async updateProfile(profileData) {
    const response = await this.request('/api/profiles/update', {
      method: 'POST',
      body: JSON.stringify(profileData),
      useCache: false
    });
    
    // Инвалидируем кэш профилей после обновления
    if (response.success) {
      this.invalidateEndpoint('/api/profiles');
    }
    
    return response;
  }

  async getCurrentUser() {
    // Кэшируем данные текущего пользователя
    return this.request('/api/auth/me', {
      useCache: true
    });
  }

  // 🔧 DEMO MODE (без изменений)
  getDemoResponse(endpoint, options) {
    return new Promise(resolve => {
      setTimeout(() => {
        let response;
        
        switch(endpoint) {
          case '/api/auth/login':
          case '/api/auth/register':
            const body = options.body ? JSON.parse(options.body) : {};
            response = {
              user: {
                id: "demo-" + Date.now(),
                email: body.email || "demo@user.com",
                profile: {
                  nickname: body.nickname || "DemoUser",
                  overallRating: 4.5,
                  playMode: "both",
                  age: 25,
                  aboutMe: "Демо-пользователь SquadUp",
                  games: ["Dota 2", "CS:GO"],
                  location: "Москва",
                  totalReviews: 0
                }
              },
              token: "demo-token-" + Date.now()
            };
            break;
            
          case '/api/profiles':
            response = [
              {
                id: "2",
                nickname: "ProPlayer",
                isOnline: true,
                overallRating: 4.8,
                playMode: "competitive",
                age: 25,
                aboutMe: "Ищу тиммейтов для ранговых игр. Играю серьезно!",
                games: ["Dota 2", "CS:GO"],
                location: "Москва"
              },
              {
                id: "3", 
                nickname: "CasualGamer",
                isOnline: true,
                overallRating: 4.2,
                playMode: "casual", 
                age: 22,
                aboutMe: "Играю для удовольствия, без токсичности",
                games: ["Valorant", "Overwatch 2"],
                location: "Санкт-Петербург"
              }
            ];
            break;
            
          default:
            response = { success: true, demo: true };
        }
        
        resolve(response);
      }, 800);
    });
  }
}

export const apiService = new ApiService();

// 🎯 HOOK ДЛЯ ИСПОЛЬЗОВАНИЯ В КОМПОНЕНТАХ
export const useApiCache = () => {
  return {
    clearCache: () => apiService.clearCache(),
    invalidateEndpoint: (pattern) => apiService.invalidateEndpoint(pattern),
    getStats: () => apiService.getCacheStats()
  };
};
