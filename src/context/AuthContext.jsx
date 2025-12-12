import React, { createContext, useState, useContext, useEffect } from 'react';
import { apiService } from '../services/api';

// СОЗДАЕМ КОНТЕКСТ И ЭКСПОРТИРУЕМ ЕГО
export const AuthContext = createContext();

// СОЗДАЕМ И ЭКСПОРТИРУЕМ ХУК useAuth
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// СОЗДАЕМ И ЭКСПОРТИРУЕМ ПРОВАЙДЕР
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
          const validationResult = await apiService.validateToken(token);
          
          if (validationResult.success) {
            setUser(JSON.parse(userData));
          } else {
            // Токен невалидный, чистим хранилище
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } catch (error) {
          console.error('Ошибка при валидации токена:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      }
      
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const result = await apiService.login(email, password);
      
      if (result.success) {
        const userData = result.user;
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        // Обновляем активность пользователя
        await apiService.updateActivity(userData.id);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (email, password, nickname) => {
    try {
      const result = await apiService.register(email, password, nickname);
      
      if (result.success) {
        const userData = result.user;
        localStorage.setItem('token', userData.token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        return { success: true, user: userData };
      } else {
        return { success: false, error: result.error };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
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

// ЭКСПОРТИРУЕМ ПО УМОЛЧАНИЮ КОНТЕКСТ
export default AuthContext;
