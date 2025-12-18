import React, { useState, Suspense, lazy } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import StatisticsSection from './components/StatisticsSection';
import SuccessStories from './components/SuccessStories';
import UsersList from './components/UsersList'; // ✅ ДОБАВЛЕНО!

// 🚀 ЛЕНИВАЯ ЗАГРУЗКА ТЯЖЕЛЫХ КОМПОНЕНТОВ
const UserDashboard = lazy(() => import('./components/UserDashboard'));
const InteractiveDemo = lazy(() => import('./components/InteractiveDemo'));
const OnboardingFlow = lazy(() => import('./components/OnboardingFlow'));

// 🎯 COMPONENT LOADING FALLBACK
const LoadingFallback = ({ componentName = "компонент" }) => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '200px',
    color: '#888'
  }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid #333',
        borderTop: '3px solid #007bff',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 10px'
      }}></div>
      <p>Загружаем {componentName}...</p>
    </div>
  </div>
);

const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('auto');
  const { user } = useAuth();

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    console.log('✅ Авторизация успешна:', userData);
    setIsAuthModalOpen(false);
    setCurrentView('dashboard');
  };

  const handleLogoClick = () => {
    setCurrentView('landing');
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentView('auto');
  };

  const getCurrentView = () => {
    if (currentView === 'landing') {
      return 'landing';
    }
    if (currentView === 'dashboard') {
      return 'dashboard';
    }
    return user ? 'dashboard' : 'landing';
  };

  const view = getCurrentView();

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
      
      <Navigation 
        onLogoClick={handleLogoClick} 
        onLogout={handleLogout}
        onDashboardClick={handleDashboardClick}
      />
      
      {view === 'dashboard' ? (
        <>
          <Suspense fallback={<LoadingFallback componentName="дашборд" />}>
            <UserDashboard />
          </Suspense>
          {/* ✅ ДОБАВЛЯЕМ СПИСОК ПОЛЬЗОВАТЕЛЕЙ В ДАШБОРД */}
          <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
            <UsersList />
          </div>
        </>
      ) : (
        <>
          <HeroSection onOpenAuth={handleOpenAuth} />
          <ProblemSolutionSection />
          <FeaturesSection />
          <StatisticsSection />
          <Suspense fallback={<LoadingFallback componentName="интерактивную демонстрацию" />}>
            <InteractiveDemo />
          </Suspense>
          <SuccessStories />
          <Suspense fallback={<LoadingFallback componentName="онбординг" />}>
            <OnboardingFlow onOpenAuth={handleOpenAuth} />
          </Suspense>
        </>
      )}

      <Footer />

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;

// 🚀 Vercel deploy trigger Чт 18 дек 2025 18:38:35 MSK
// Deploy: Чт 18 дек 2025 19:08:17 MSK
