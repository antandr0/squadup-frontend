// Базовый URL API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Добавляем токен авторизации если есть
    const token = this.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`🔄 API Request: ${url}`);
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;

    } catch (error) {
      console.error('❌ API Request failed:', error);
      
      // Fallback для демо режима если бэкенд недоступен
      if (error.message.includes('Failed to fetch')) {
        console.log('🔄 Using demo mode as fallback');
        return this.demoFallback(endpoint, options);
      }
      
      throw new Error(error.message || 'Network request failed');
    }
  }

  // Демо режим как fallback
  demoFallback(endpoint, options) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const demoResponses = {
          '/api/auth/login': {
            success: true,
            data: {
              user: {
                id: '1',
                email: options.body?.email || 'demo@user.com',
                profile: {
                  nickname: options.body?.email?.split('@')[0] || 'DemoUser',
                  overallRating: 4.5,
                  playMode: 'both',
                  totalReviews: 0
                }
              },
              token: 'demo-token-' + Date.now()
            }
          },
          '/api/auth/register': {
            success: true,
            data: {
              user: {
                id: '1',
                email: options.body?.email || 'demo@user.com',
                profile: {
                  nickname: options.body?.nickname || 'DemoUser',
                  overallRating: 0,
                  playMode: 'both',
                  totalReviews: 0
                }
              },
              token: 'demo-token-' + Date.now()
            }
          },
          '/api/profiles': {
            success: true,
            data: {
              profiles: [
                {
                  id: '2',
                  nickname: 'ProPlayer',
                  isOnline: true,
                  overallRating: 4.8,
                  playMode: 'competitive',
                  age: 25,
                  aboutMe: 'Ищу тиммейтов для ранговых игр. Играю серьезно!'
                },
                {
                  id: '3',
                  nickname: 'CasualGamer', 
                  isOnline: true,
                  overallRating: 4.2,
                  playMode: 'casual',
                  age: 22,
                  aboutMe: 'Играю для удовольствия, без токсичности'
                }
              ]
            }
          }
        };

        const response = demoResponses[endpoint] || { success: true, data: {} };
        resolve(response);
      }, 800);
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  async login(credentials) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async register(userData) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.success && response.data.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async getProfiles() {
    return await this.request('/api/profiles');
  }

  async logout() {
    this.removeToken();
    return { success: true };
  }
}

export const authService = new ApiService();
export default ApiService;
