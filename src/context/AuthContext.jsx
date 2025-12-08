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

  // Проверяем наличие токена при загрузке приложения
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          // Валидируем токен через бэкенд
          const response = await apiService.validateToken(token);
          
          if (response.success) {
            setUser(response.user);
            console.log('✅ Токен валиден, пользователь:', response.user.nickname);
          } else {
            console.warn('❌ Невалидный токен:', response.error);
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Ошибка валидации токена:', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      console.log('🔄 Попытка входа:', { email });
      
      const response = await apiService.login(email, password);
      console.log('📨 Ответ входа:', response);
      
      if (response.success && response.user) {
        setUser(response.user);
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        // Обновляем активность
        await apiService.updateActivity(response.user.id);
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.error || 'Вход не удался' 
        };
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      return { 
        success: false, 
        error: 'Ошибка сети. Проверьте подключение.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, nickname) => {
    try {
      setLoading(true);
      console.log('🔄 Регистрация:', { email, nickname });
      
      const response = await apiService.register(email, password, nickname);
      console.log('📨 Ответ регистрации:', response);
      
      if (response.success && response.user) {
        setUser(response.user);
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        return { success: true };
      } else {
        return { 
          success: false, 
          error: response.error || 'Регистрация не удалась' 
        };
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      return { 
        success: false, 
        error: 'Ошибка сети. Проверьте подключение.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    console.log('👋 Пользователь вышел');
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
