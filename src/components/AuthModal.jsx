import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, register } = useAuth();

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        password: '',
        nickname: ''
      });
      setError('');
      setMode(initialMode);
    }
  }, [isOpen, initialMode]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Заполните все обязательные поля');
      return;
    }

    if (mode === 'register' && !formData.nickname) {
      setError('Введите никнейм');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.nickname);
      }

      if (result.success) {
        onSuccess(result.user);
        onClose(); // Закрываем модалку после успеха
      } else {
        setError(result.error || `Ошибка ${mode === 'login' ? 'входа' : 'регистрации'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Произошла непредвиденная ошибка. Попробуйте еще раз.');
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError('');
    
    try {
      const result = await login('demo@user.com', 'demo123');
      if (result.success) {
        onSuccess(result.user);
        onClose();
      } else {
        setError('Демо-вход временно недоступен');
      }
    } catch (error) {
      setError('Ошибка демо-входа');
    } finally {
      setLoading(false);
    }
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
      zIndex: 2000
    }}>
      <div style={{
        background: 'rgba(30, 30, 60, 0.95)',
        padding: '30px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, color: 'white' }}>
            {mode === 'login' ? '🎮 Вход' : '🚀 Регистрация'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff6b6b',
              fontSize: '24px',
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>

          {mode === 'register' && (
            <div style={{ marginBottom: '15px' }}>
              <input
                type="text"
                name="nickname"
                value={formData.nickname}
                onChange={handleInputChange}
                placeholder="Игровой никнейм"
                required
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white',
                  fontSize: '14px'
                }}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Пароль"
              required
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 15px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.1)',
              color: '#ff6b6b',
              padding: '10px 15px',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '14px',
              border: '1px solid rgba(255, 107, 107, 0.3)'
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#666' : 'linear-gradient(45deg, #4e54c8, #8a2be2)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              marginBottom: '10px'
            }}
          >
            {loading ? '⏳ Загрузка...' : (mode === 'login' ? '🎮 Войти' : '🚀 Зарегистрироваться')}
          </button>
        </form>

        {mode === 'login' && (
          <button
            onClick={handleDemoLogin}
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#666' : 'rgba(0, 255, 136, 0.2)',
              color: loading ? '#999' : '#00ff88',
              border: '1px solid rgba(0, 255, 136, 0.3)',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              marginBottom: '15px',
              transition: 'all 0.3s ease'
            }}
          >
            {loading ? '⏳ Загрузка...' : '🎯 Попробовать демо-режим'}
          </button>
        )}

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            disabled={loading}
            style={{
              background: 'none',
              border: 'none',
              color: '#4e54c8',
              cursor: loading ? 'not-allowed' : 'pointer',
              textDecoration: 'underline',
              fontSize: '14px'
            }}
          >
            {mode === 'login' ? 'Нет аккаунта? Зарегистрироваться' : 'Есть аккаунт? Войти'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
