import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, LogIn, UserPlus, GamepadIcon, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { authService } from '../services/api';

const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Сбрасываем форму при открытии
      setFormData({
        email: '',
        password: '',
        nickname: '',
        confirmPassword: ''
      });
      setError('');
      setMode('login'); // Всегда начинаем с входа
    }
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при вводе
    if (error) setError('');
  };

  const validateForm = () => {
    if (mode === 'login') {
      if (!formData.email || !formData.password) {
        setError('Заполните все поля');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Введите корректный email');
        return false;
      }
    } else {
      if (!formData.email || !formData.password || !formData.nickname || !formData.confirmPassword) {
        setError('Заполните все поля');
        return false;
      }
      if (!/\S+@\S+\.\S+/.test(formData.email)) {
        setError('Введите корректный email');
        return false;
      }
      if (formData.password.length < 6) {
        setError('Пароль должен быть не менее 6 символов');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Пароли не совпадают');
        return false;
      }
      if (formData.nickname.length < 3) {
        setError('Никнейм должен быть не менее 3 символов');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      let result;
      
      if (mode === 'login') {
        console.log('🔐 Attempting login...');
        result = await authService.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        console.log('📝 Attempting registration...');
        result = await authService.register({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname
        });
      }

      console.log('📨 Auth result:', result);

      if (result.success) {
        console.log('✅ Auth successful, calling onSuccess');
        onSuccess(result.data);
      } else {
        setError(result.error || `Ошибка ${mode === 'login' ? 'входа' : 'регистрации'}`);
      }
    } catch (error) {
      console.error('❌ Auth error:', error);
      setError('Произошла ошибка. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    setError('');
    setFormData({
      email: '',
      password: '',
      nickname: '',
      confirmPassword: ''
    });
  };

  const handleSocialAuth = (provider) => {
    // Временная заглушка для социальной авторизации
    alert(`Авторизация через ${provider} в разработке`);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(5px)'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        style={{
          background: 'var(--card-bg)',
          borderRadius: '20px',
          padding: '30px',
          width: '90%',
          maxWidth: '400px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
          position: 'relative'
        }}
      >
        {/* Заголовок и кнопка закрытия */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '25px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <GamepadIcon size={28} color="#4e54c8" />
            <h2 style={{ 
              margin: 0, 
              color: 'var(--text-primary)',
              fontSize: '24px'
            }}>
              {mode === 'login' ? 'Вход' : 'Регистрация'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              color: '#ff6b6b',
              fontSize: '20px',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 107, 107, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 107, 107, 0.1)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Социальные кнопки авторизации */}
        <div style={{ marginBottom: '25px' }}>
          <p style={{ 
            color: 'var(--text-secondary)', 
            textAlign: 'center',
            marginBottom: '15px',
            fontSize: '14px'
          }}>
            Войдите с помощью
          </p>
          <div style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center'
          }}>
            {[
              { provider: 'steam', icon: '🎮', label: 'Steam' },
              { provider: 'vk', icon: '👥', label: 'VK' },
              { provider: 'google', icon: '🔍', label: 'Google' }
            ].map((social) => (
              <button
                key={social.provider}
                onClick={() => handleSocialAuth(social.provider)}
                style={{
                  flex: 1,
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px',
                  color: 'var(--text-primary)',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                <span style={{ fontSize: '18px' }}>{social.icon}</span>
                <span style={{ fontSize: '12px' }}>{social.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Разделитель */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          <div style={{ 
            flex: 1, 
            height: '1px', 
            background: 'rgba(255, 255, 255, 0.1)' 
          }}></div>
          <span style={{ 
            padding: '0 15px', 
            color: 'var(--text-secondary)', 
            fontSize: '14px' 
          }}>
            или
          </span>
          <div style={{ 
            flex: 1, 
            height: '1px', 
            background: 'rgba(255, 255, 255, 0.1)' 
          }}></div>
        </div>

        {/* Форма */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Поле email */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Mail size={16} />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    color: 'var(--text-primary)',
                    fontSize: '14px',
                    transition: 'all 0.3s ease'
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.borderColor = 'rgba(78, 84, 200, 0.5)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                  placeholder="your@email.com"
                />
              </div>

              {/* Поле никнейма (только для регистрации) */}
              {mode === 'register' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <User size={16} />
                    Никнейм
                  </label>
                  <input
                    type="text"
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.borderColor = 'rgba(78, 84, 200, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="Ваш игровой ник"
                  />
                </div>
              )}

              {/* Поле пароля */}
              <div style={{ marginBottom: mode === 'register' ? '20px' : '25px' }}>
                <label style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Lock size={16} />
                  Пароль
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '12px 45px 12px 15px',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      color: 'var(--text-primary)',
                      fontSize: '14px',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                      e.target.style.borderColor = 'rgba(78, 84, 200, 0.5)';
                    }}
                    onBlur={(e) => {
                      e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                      e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    }}
                    placeholder="Введите пароль"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: 'var(--text-secondary)',
                      cursor: 'pointer',
                      padding: '5px'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Подтверждение пароля (только для регистрации) */}
              {mode === 'register' && (
                <div style={{ marginBottom: '25px' }}>
                  <label style={{
                    display: 'block',
                    color: 'var(--text-secondary)',
                    marginBottom: '8px',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <Lock size={16} />
                    Подтвердите пароль
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      style={{
                        width: '100%',
                        padding: '12px 45px 12px 15px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '10px',
                        color: 'var(--text-primary)',
                        fontSize: '14px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                        e.target.style.borderColor = 'rgba(78, 84, 200, 0.5)';
                      }}
                      onBlur={(e) => {
                        e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                        e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                      }}
                      placeholder="Повторите пароль"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-secondary)',
                        cursor: 'pointer',
                        padding: '5px'
                      }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Сообщение об ошибке */}
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{
                background: 'rgba(255, 107, 107, 0.1)',
                border: '1px solid rgba(255, 107, 107, 0.3)',
                color: '#ff6b6b',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontSize: '14px',
                textAlign: 'center'
              }}
            >
              ⚠️ {error}
            </motion.div>
          )}

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '15px',
              background: loading 
                ? '#666' 
                : 'linear-gradient(135deg, #4e54c8, #8a2be2)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.3s ease',
              opacity: loading ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(78, 84, 200, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <>
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  border: '2px solid transparent',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                {mode === 'login' ? 'Вход...' : 'Регистрация...'}
              </>
            ) : (
              <>
                {mode === 'login' ? <LogIn size={18} /> : <UserPlus size={18} />}
                {mode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </>
            )}
          </button>
        </form>

        {/* Переключение между входом и регистрацией */}
        <div style={{ 
          textAlign: 'center', 
          marginTop: '25px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <span style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {mode === 'login' ? 'Еще нет аккаунта?' : 'Уже есть аккаунт?'}
          </span>
          <button
            onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#4e54c8',
              cursor: 'pointer',
              marginLeft: '8px',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'underline',
              transition: 'color 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#8a2be2';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#4e54c8';
            }}
          >
            {mode === 'login' ? 'Создать аккаунт' : 'Войти'}
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default AuthModal;