import React, { useState } from 'react';
import { authService } from '../services/api';

const RegisterForm = ({ onSuccess, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (!formData.email || !formData.password || !formData.nickname) {
      setError('Все поля обязательны для заполнения');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('🔄 Отправка данных регистрации...');
      const result = await authService.register(formData);

      if (result.success) {
        console.log('✅ Регистрация успешна!');
        if (onSuccess) onSuccess(result.data);
      } else {
        setError(result.message || 'Ошибка регистрации');
      }
    } catch (err) {
      console.error('❌ Ошибка регистрации:', err);

      // Детальная обработка ошибок
      if (err.code === 'NETWORK_ERROR' || err.message === 'Network Error') {
        setError('Ошибка соединения с сервером. Проверьте что бэкенд запущен на порту 5000');
      } else if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else if (err.response?.data?.errors) {
        setError(err.response.data.errors.join(', '));
      } else {
        setError('Произошла неизвестная ошибка. Проверьте консоль для деталей.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      background: 'rgba(30, 30, 60, 0.7)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.1)'
    }}>
    <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'white' }}>
    🎮 Присоединиться к SquadUp
    </h2>

    {error && (
      <div style={{
        background: 'rgba(255, 107, 107, 0.1)',
               border: '1px solid rgba(255, 107, 107, 0.3)',
               color: '#ff6b6b',
               padding: '15px',
               borderRadius: '8px',
               marginBottom: '20px',
               textAlign: 'center',
               fontSize: '14px'
      }}>
      ⚠️ {error}
      </div>
    )}

    <form onSubmit={handleSubmit}>
    <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '8px', color: '#b0b0d0' }}>
    Email
    </label>
    <input
    type="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    disabled={loading}
    style={{
      width: '100%',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '16px',
          outline: 'none'
    }}
    placeholder="your@email.com"
    />
    </div>

    <div style={{ marginBottom: '20px' }}>
    <label style={{ display: 'block', marginBottom: '8px', color: '#b0b0d0' }}>
    Пароль
    </label>
    <input
    type="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    minLength="6"
    disabled={loading}
    style={{
      width: '100%',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '16px',
          outline: 'none'
    }}
    placeholder="Не менее 6 символов"
    />
    </div>

    <div style={{ marginBottom: '30px' }}>
    <label style={{ display: 'block', marginBottom: '8px', color: '#b0b0d0' }}>
    Игровой никнейм
    </label>
    <input
    type="text"
    name="nickname"
    value={formData.nickname}
    onChange={handleChange}
    required
    minLength="2"
    disabled={loading}
    style={{
      width: '100%',
      padding: '12px',
      background: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          color: 'white',
          fontSize: '16px',
          outline: 'none'
    }}
    placeholder="Ваш игровой ник"
    />
    </div>

    <button
    type="submit"
    disabled={loading}
    style={{
      width: '100%',
      padding: '15px',
      background: loading ? '#666' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          cursor: loading ? 'not-allowed' : 'pointer',
          marginBottom: '20px',
          opacity: loading ? 0.7 : 1
    }}
    >
    {loading ? '⏳ Регистрация...' : '🎮 Начать играть'}
    </button>

    <div style={{ textAlign: 'center', color: '#b0b0d0' }}>
    Уже есть аккаунт?{' '}
    <button
    type="button"
    onClick={onSwitchToLogin}
    style={{
      background: 'none',
      border: 'none',
      color: '#4e54c8',
      cursor: 'pointer',
      textDecoration: 'underline'
    }}
    >
    Войти
    </button>
    </div>
    </form>
    </div>
  );
};

export default RegisterForm;
