import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // При загрузке приложения проверяем токен
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          // Валидируем токен через бэкенд
          const response = await apiService.validateToken(token);
          
          if (response.success) {
            console.log('✅ Токен валиден, пользователь из БД:', response.user.nickname);
            setUser(response.user);
            
            // Обновляем активность
            await apiService.updateActivity(response.user.id);
          } else {
            console.warn('❌ Невалидный токен:', response.error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Ошибка валидации токена:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // 🔐 РЕАЛЬНЫЙ ВХОД ЧЕРЕЗ БАЗУ ДАННЫХ
  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('🔄 Пытаемся войти через БД:', email);
      
      const response = await apiService.login(email, password);
      console.log('📨 Ответ от бэкенда при входе:', response);
      
      if (response.success && response.user) {
        console.log('✅ Успешный вход через БД, пользователь:', response.user);
        
        setUser(response.user);
        
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        // Обновляем активность в БД
        await apiService.updateActivity(response.user.id);
        
        return { success: true };
      } else {
        console.log('❌ Ошибка входа через БД:', response.error);
        return { 
          success: false, 
          error: response.error || 'Неверный email или пароль' 
        };
      }
    } catch (error) {
      console.error('❌ Ошибка при входе:', error);
      return { 
        success: false, 
        error: 'Ошибка сервера. Попробуйте позже.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // 📝 РЕАЛЬНАЯ РЕГИСТРАЦИЯ В БАЗЕ ДАННЫХ
  const register = async (email, password, nickname) => {
    try {
      setLoading(true);
      console.log('🔄 Регистрация в БД:', { email, nickname });
      
      const response = await apiService.register(email, password, nickname);
      console.log('📨 Ответ от бэкенда при регистрации:', response);
      
      if (response.success && response.user) {
        console.log('✅ Успешная регистрация в БД, пользователь:', response.user);
        
        setUser(response.user);
        
        if (response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
        }
        
        return { success: true };
      } else {
        console.log('❌ Ошибка регистрации в БД:', response.error);
        return { 
          success: false, 
          error: response.error || 'Ошибка регистрации' 
        };
      }
    } catch (error) {
      console.error('❌ Ошибка при регистрации:', error);
      return { 
        success: false, 
        error: 'Ошибка сервера. Попробуйте позже.' 
      };
    } finally {
      setLoading(false);
    }
  };

  // 🚪 ВЫХОД
  const logout = () => {
    console.log('👋 Выход из системы, пользователь:', user?.nickname);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
