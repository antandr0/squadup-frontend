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
      console.log(`🌐 Запрос к бэкенду: ${this.baseURL}${endpoint}`);
      const response = await fetch(`${this.baseURL}${endpoint}`, config);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ HTTP ошибка ${response.status}:`, errorText);
        throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
      }
        
      const data = await response.json();
      console.log(`✅ Ответ от бэкенда (${endpoint}):`, data.success ? 'Успех' : 'Ошибка');
      return data;
    } catch (error) {
      console.error(`❌ API Ошибка (${endpoint}):`, error.message);
      return { 
        success: false, 
        error: error.message || 'Ошибка подключения к серверу. Проверьте интернет.' 
      };
    }
  }

  // 🔐 АВТОРИЗАЦИЯ
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

  async updateActivity(userId) {
    return this.request('/api/auth/activity', {
      method: 'POST',
      body: JSON.stringify({ user_id: userId })
    });
  }

  // 👥 ПРОФИЛИ (ПОЛУЧАЕМ ИЗ РЕАЛЬНОЙ БАЗЫ ДАННЫХ)
  async getAllProfiles() {
    const response = await this.request('/api/profiles/all');
    
    // 🔍 ДЕБАГ: Логируем что пришло с бэкенда
    if (response.success) {
      console.log(`📊 Реальные данные из БД: ${response.total} пользователей`);
      console.log(`🟢 Онлайн из БД: ${response.online_count} пользователей`);
      
      if (response.users && response.users.length > 0) {
        console.log('👤 Первый пользователь из БД:', {
          id: response.users[0].id,
          nickname: response.users[0].nickname,
          online: response.users[0].online,
          email: response.users[0].email,
          last_active: response.users[0].last_active
        });
      }
    }
    
    return response;
  }

  async getProfile(userId) {
    return this.request(`/api/profiles?user_id=${userId}`);
  }

  async updateProfile(profileData) {
    return this.request('/api/profiles/update', {
      method: 'POST',
      body: JSON.stringify(profileData)
    });
  }

  // 🗄️ РЕАЛЬНЫЕ БЭКАПЫ ИЗ БАЗЫ ДАННЫХ
  async createBackup() {
    return this.request('/api/auth/backup');
  }

  async getBackupList() {
    return this.request('/api/auth/backup-list');
  }

  // 🏥 ПРОВЕРКА РАБОТЫ СЕРВЕРА
  async checkHealth() {
    return this.request('/health');
  }
}

export const apiService = new ApiService();
