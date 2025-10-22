const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://squadup-backend-03vr.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.isDemoMode = false;
  }

  async request(endpoint, options = {}) {
    const token = localStorage.getItem('token');
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🔄 API Request: ${this.baseURL}${endpoint}`);
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log(`✅ API Success: ${endpoint}`, data);
      return data;
    } catch (error) {
      console.warn(`❌ API Failed: ${error.message}, using demo mode`);
      this.isDemoMode = true;
      return this.getDemoResponse(endpoint, options);
    }
  }

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
            response = {
              success: true,
              data: {
                profiles: [
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
                  },
                  {
                    id: "4",
                    nickname: "StrategicMind", 
                    isOnline: false,
                    overallRating: 4.9,
                    playMode: "competitive",
                    age: 28,
                    aboutMe: "Тактический игрок, ищу команду для турниров",
                    games: ["Dota 2", "League of Legends"],
                    location: "Казань"
                  }
                ]
              }
            };
            break;
            
          default:
            response = { success: true, demo: true };
        }
        
        resolve(response);
      }, 800);
    });
  }

  async login(email, password) {
    const response = await this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Обрабатываем разные форматы ответа
    if (response.token) {
      localStorage.setItem('token', response.token);
      return { success: true, user: response.user };
    } else if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true, user: response.data.user };
    }
    
    return { success: false, error: response.error || 'Ошибка авторизации' };
  }

  async register(email, password, nickname) {
    const response = await this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname }),
    });
    
    if (response.token) {
      localStorage.setItem('token', response.token);
      return { success: true, user: response.user };
    } else if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return { success: true, user: response.data.user };
    }
    
    return { success: false, error: response.error || 'Ошибка регистрации' };
  }

  async getProfiles(filters = {}) {
    const queryParams = new URLSearchParams(filters).toString();
    const endpoint = queryParams ? `/api/profiles?${queryParams}` : '/api/profiles';
    const response = await this.request(endpoint);
    
    // Обрабатываем разные форматы ответа
    if (Array.isArray(response)) {
      return response;
    } else if (response.data?.profiles) {
      return response.data.profiles;
    } else if (response.profiles) {
      return response.profiles;
    }
    
    return [];
  }

  async updateProfile(profileData) {
    return this.request('/api/profiles/update', {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  }
}

export const apiService = new ApiService();
