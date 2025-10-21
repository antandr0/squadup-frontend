import TestComponent from "./components/TestComponent"
import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import ProblemSolutionSection from './components/ProblemSolutionSection'
import InteractiveDemo from './components/InteractiveDemo'
import OnboardingFlow from './components/OnboardingFlow'
import SuccessStories from './components/SuccessStories'
import AuthModal from './components/AuthModal'
import Dashboard from './components/Dashboard'

const AppContent = () => {
  const { user } = useAuth()
  const [authModalOpen, setAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')

  const handleOpenAuth = (mode = 'login') => {
    setAuthMode(mode)
    setAuthModalOpen(true)
  }

  const handleAuthSuccess = () => {
    setAuthModalOpen(false)
  }

  if (user) {
    return (
      <>
        <Navigation />
        <Dashboard />
      </>
    )
  }

  return (
    <div style={{ 
      background: '#0f0f23',
      minHeight: '100vh',
      color: 'white'
    }}>
      <Navigation />
      <HeroSection onOpenAuth={handleOpenAuth} />
      <ProblemSolutionSection />
      <InteractiveDemo />
      <OnboardingFlow onOpenAuth={handleOpenAuth} />
      <SuccessStories />
      <TestComponent />
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
      />
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
