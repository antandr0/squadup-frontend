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

const AppContent = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { user } = useAuth();

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (userData) => {
    console.log('Auth success:', userData);
    setIsAuthModalOpen(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)',
      color: 'white'
    }}>
      <Navigation />
      
      <HeroSection onOpenAuth={handleOpenAuth} />
      <ProblemSolutionSection />
      <FeaturesSection />
      <StatisticsSection />
      <InteractiveDemo />
      <SuccessStories />
      <OnboardingFlow onOpenAuth={handleOpenAuth} />

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
