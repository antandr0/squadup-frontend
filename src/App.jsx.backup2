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

// 🎯 DASHBOARD LOADING SKELETON
const DashboardSkeleton = () => (
  <div style={{ padding: '20px' }}>
    <div style={{ 
      background: 'rgba(255,255,255,0.1)', 
      height: '40px', 
      borderRadius: '8px',
      marginBottom: '20px',
      animation: 'pulse 2s infinite'
    }}></div>
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '20px' 
    }}>
      {[1, 2, 3].map(i => (
        <div key={i} style={{ 
          background: 'rgba(255,255,255,0.05)', 
          padding: '20px',
          borderRadius: '12px',
          animation: 'pulse 2s infinite',
          animationDelay: `${i * 0.2}s`
        }}>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            height: '20px', 
            borderRadius: '4px',
            marginBottom: '10px'
          }}></div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            height: '16px', 
            borderRadius: '4px',
            marginBottom: '10px',
            width: '70%'
          }}></div>
          <div style={{ 
            background: 'rgba(255,255,255,0.1)', 
            height: '16px', 
            borderRadius: '4px',
            width: '50%'
          }}></div>
        </div>
      ))}
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
    console.log('Auth success:', userData);
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
        <Suspense fallback={<DashboardSkeleton />}>
          <UserDashboard />
        </Suspense>
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
