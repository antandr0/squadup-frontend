import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onSuccess, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nickname: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();

  useEffect(() => {
    setMode(initialMode);
    setError('');
    setFormData({ email: '', password: '', nickname: '' });
  }, [initialMode, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Базовая валидация
    if (!formData.email || !formData.password) {
      setError('Заполните все обязательные поля');
      setLoading(false);
      return;
    }

    if (mode === 'register' && !formData.nickname) {
      setError('Введите никнейм');
      setLoading(false);
      return;
    }

    try {
      let result;
      
      if (mode === 'login') {
        result = await login(formData.email, formData.password);
      } else {
        result = await register(formData.email, formData.password, formData.nickname);
      }

      if (result.success) {
        onSuccess();
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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const switchMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
    setFormData({ email: '', password: '', nickname: '' });
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        
        <h2>{mode === 'login' ? 'Вход в аккаунт' : 'Регистрация'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          {mode === 'register' && (
            <div className="form-group">
              <input
                type="text"
                name="nickname"
                placeholder="Игровой никнейм"
                value={formData.nickname}
                onChange={handleChange}
                required
              />
            </div>
          )}
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Пароль"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Загрузка...' : (mode === 'login' ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>
        
        <div className="auth-switch">
          <span>
            {mode === 'login' ? 'Нет аккаунта? ' : 'Уже есть аккаунт? '}
            <button type="button" onClick={switchMode} className="switch-button">
              {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
