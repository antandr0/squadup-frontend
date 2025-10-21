import React, { createContext, useState, useContext, useEffect } from 'react';
import { authService } from '../services/api';

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

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      console.log('🔐 Проверка авторизации...');
      
      const token = authService.getToken();
      
      console.log('🔑 Token exists:', !!token);
      
      if (token) {
        // В реальном приложении здесь был бы запрос к API для проверки токена
        // Для демо используем localStorage
        const storedUser = localStorage.getItem('squadup_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          window.userId = userData.id;
          console.log('✅ Пользователь авторизован');
        } else {
          setUser(null);
          console.log('❌ Пользователь не авторизован');
        }
      } else {
        setUser(null);
        console.log('❌ Токен не найден');
      }
    } catch (error) {
      console.error('❌ Ошибка проверки авторизации:', error);
      setUser(null);
    } finally {
      setLoading(false);
      console.log('🏁 Завершена проверка авторизации');
    }
  };

  const login = (userData) => {
    console.log('🔐 Логин пользователя:', userData);
    setUser(userData);
    window.userId = userData.id;
    localStorage.setItem('squadup_user', JSON.stringify(userData));
  };

  const logout = () => {
    console.log('🚪 Выход из системы');
    authService.logout();
    setUser(null);
    window.userId = null;
    localStorage.removeItem('squadup_user');
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
