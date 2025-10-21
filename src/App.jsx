import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import InteractiveDemo from './components/InteractiveDemo';
import OnboardingFlow from './components/OnboardingFlow';
import SuccessStories from './components/SuccessStories';
import AuthModal from './components/AuthModal';
import Dashboard from './components/Dashboard';

// Основной компонент приложения
const AppContent = () => {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    setAuthModalOpen(false);
    console.log('Auth success:', userData);
  };

  // Если пользователь авторизован, показываем Dashboard
  if (user) {
    return (
      <>
        <Navigation />
        <Dashboard />
      </>
    );
  }

  // Главная страница для неавторизованных пользователей
  return (
    <>
      <Navigation />
      <HeroSection onOpenAuth={handleOpenAuth} />
      <ProblemSolutionSection />
      <InteractiveDemo />
      <OnboardingFlow onOpenAuth={handleOpenAuth} />
      <SuccessStories />
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </>
  );
};

// Корневой компонент с провайдером контекста
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
