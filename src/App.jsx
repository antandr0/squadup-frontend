import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import ProblemSolutionSection from './components/ProblemSolutionSection';
import StatisticsSection from './components/StatisticsSection';
import SuccessStories from './components/SuccessStories';
import OnboardingFlow from './components/OnboardingFlow';
import InteractiveDemo from './components/InteractiveDemo';
import UserDashboard from './components/UserDashboard';

const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [currentView, setCurrentView] = useState('auto'); // 'auto', 'landing', 'dashboard'
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

  const handleLogout = () => {
    setCurrentView('auto');
  };

  // Определяем что показывать
  const getCurrentView = () => {
    if (currentView === 'landing') {
      return 'landing';
    }
    if (currentView === 'dashboard') {
      return 'dashboard';
    }
    // Автоматический выбор
    return user ? 'dashboard' : 'landing';
  };

  const view = getCurrentView();

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white'
    }}>
      <Navigation onLogoClick={handleLogoClick} onLogout={handleLogout} />
      
      {view === 'dashboard' ? (
        <UserDashboard />
      ) : (
        <>
          <HeroSection onOpenAuth={handleOpenAuth} />
          <ProblemSolutionSection />
          <FeaturesSection />
          <StatisticsSection />
          <InteractiveDemo />
          <SuccessStories />
          <OnboardingFlow onOpenAuth={handleOpenAuth} />
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
