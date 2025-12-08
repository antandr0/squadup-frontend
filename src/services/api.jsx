const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://squadup-backend-03vr.onrender.com';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
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
      console.log(`🌐 Запрос к: ${this.baseURL}${endpoint}`);
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
        
      return await response.json();
    } catch (error) {
      console.error(`❌ API Error (${endpoint}):`, error);
      return { 
        success: false, 
        error: error.message || 'Network error' 
      };
    }
  }

  // АВТОРИЗАЦИЯ
  async login(email, password) {
    return this.request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  }

  async register(email, password, nickname) {
    return this.request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, nickname })
    });
  }

  async validateToken(token) {
    return this.request('/api/auth/validate', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
  }

  // ПРОФИЛИ
  async getAllProfiles() {
    return this.request('/api/profiles/all');
  }

  async getProfile(userId) {
    return this.request(`/api/profiles?user_id=${userId}`);
  }

  // АКТИВНОСТЬ
  async updateActivity(userId) {
    return this.request('/api/auth/activity', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId })
    });
  }

  // ПРОСТОЙ DEMO MODE (если бэкенд недоступен)
  getDemoProfiles() {
    return {
      success: true,
      users: [
        {
          id: "demo-1",
          email: "demo1@test.com",
          nickname: "DemoUser1",
          online: true,
          last_active: new Date().toISOString()
        }
      ],
      total: 1,
      online_count: 1
    };
  }
}

export const apiService = new ApiService();
