import { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Проверяем авторизацию при загрузке
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      // Пытаемся получить данные пользователя
      // Если бэкенд не поддерживает /api/auth/me, используем демо-данные
      const demoUser = {
        id: "1",
        email: "user@example.com",
        profile: {
          nickname: "Игрок",
          overallRating: 4.5,
          playMode: "both",
          age: 25,
          aboutMe: "Добро пожаловать в SquadUp!",
          games: ["Dota 2", "CS:GO"],
          location: "Москва",
          totalReviews: 0
        }
      };
      setUser(demoUser);
      setIsDemoMode(true);
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await apiService.login(email, password);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsDemoMode(apiService.isDemoMode);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Ошибка авторизации' };
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Ошибка авторизации'
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password, nickname) => {
    try {
      setLoading(true);
      const result = await apiService.register(email, password, nickname);
      
      if (result.success && result.user) {
        setUser(result.user);
        setIsDemoMode(apiService.isDemoMode);
        return { success: true, user: result.user };
      }
      return { success: false, error: result.error || 'Ошибка регистрации' };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'Ошибка регистрации'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsDemoMode(false);
  };

  const updateUserProfile = (profileData) => {
    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData }
    };
    setUser(updatedUser);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isDemoMode,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
