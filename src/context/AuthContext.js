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
      
      const storedUser = authService.getStoredUser();
      const token = authService.getToken();
      
      console.log('📦 Stored User:', storedUser);
      console.log('🔑 Token exists:', !!token);
      
      if (storedUser && token) {
        // Устанавливаем пользователя из localStorage
        setUser(storedUser);
        window.userId = storedUser.id;
        console.log('✅ Пользователь авторизован (из localStorage)');
      } else {
        setUser(null);
        console.log('❌ Пользователь не авторизован');
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
  };

  const logout = () => {
    console.log('🚪 Выход из системы');
    authService.logout();
    setUser(null);
    window.userId = null;
    // Перезагружаем страницу для полного сброса
    window.location.href = '/';
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