import React, { createContext, useState, useEffect } from 'react';

// Создаем контекст
export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  register: () => {},
  loading: true
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем токен при загрузке
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Ошибка при парсинге user данных:', e);
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Здесь будет реальный API вызов
      // Пока используем мок
      const mockUser = {
        id: 16,
        email: email,
        nickname: email.split('@')[0],
        token: 'mock-token-' + Date.now()
      };
      
      localStorage.setItem('token', mockUser.token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const register = async (email, password, nickname) => {
    try {
      // Здесь будет реальный API вызов
      const mockUser = {
        id: Date.now(),
        email: email,
        nickname: nickname,
        token: 'mock-token-' + Date.now()
      };
      
      localStorage.setItem('token', mockUser.token);
      localStorage.setItem('user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
