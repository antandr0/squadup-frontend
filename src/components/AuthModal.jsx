import React, { useState, useEffect } from 'react';
import { authService } from '../services/api';
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

  useEffect(() => {
    if (isOpen) {
      setFormData({
        email: '',
        password: '',
        nickname: ''
      });
      setError('');
      setMode('login');
    }
  }, [isOpen]);

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
      setError('Заполните все поля');
      return;
    }

    setLoading(true);
    setError('');

    try {
      let result;
      
      if (mode === 'login') {
        result = await authService.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        result = await authService.register({
          email: formData.email,
          password: formData.password,
          nickname: formData.nickname || formData.email.split('@')[0]
        });
      }

      if (result.success) {
        onSuccess(result.data);
      } else {
        setError(result.error || `Ошибка ${mode === 'login' ? 'входа' : 'регистрации'}`);
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Произошла ошибка. Попробуйте еще раз.');
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
        background: 'rgba(30, 30, 60, 0.9)',
        padding: '30px',
        borderRadius: '15px',
        width: '90%',
        maxWidth: '400px',
        border: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{ margin: 0, color: 'white' }}>
            {mode === 'login' ? 'Вход' : 'Регистрация'}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ff6b6b',
              fontSize: '20px',
              cursor: 'pointer'
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
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white'
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
                placeholder="Никнейм"
                required
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '8px',
                  color: 'white'
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
              style={{
                width: '100%',
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: 'white'
              }}
            />
          </div>

          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.1)',
              color: '#ff6b6b',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '15px',
              fontSize: '14px'
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
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Загрузка...' : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '15px' }}>
          <button
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#4e54c8',
              cursor: 'pointer',
              textDecoration: 'underline'
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
