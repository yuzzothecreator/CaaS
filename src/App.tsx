import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import CalculatorSection from './components/CalculatorSection';
import Pricing from './components/Pricing';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import UpgradeModal from './components/UpgradeModal';
import Footer from './components/Footer';
import NotFoundPage from './components/NotFoundPage';
import { SubscriptionTier } from './types';

export default function App() {
  const [currentTier, setCurrentTier] = useState<SubscriptionTier>('free');
  
  // Upgrade Modal states
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [attemptedOp, setAttemptedOp] = useState('');
  const [requiredTier, setRequiredTier] = useState<SubscriptionTier>('pro');

  // Page routing simulation (allows user to see the parody 404)
  const [viewState, setViewState] = useState<'home' | '404'>('home');

  const triggerUpgrade = (opName: string, tier: SubscriptionTier) => {
    setAttemptedOp(opName);
    setRequiredTier(tier);
    setIsUpgradeOpen(true);
  };

  const handleUpgradeSuccess = (unlockedTier: SubscriptionTier) => {
    setCurrentTier(unlockedTier);
  };

  const navigateToSection = (sectionId: string) => {
    if (viewState !== 'home') {
      setViewState('home');
      // Delay slightly to let layout render
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (['api', 'documentation', 'status'].includes(sectionId)) {
      setViewState('404');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans antialiased text-foreground">
      {/* Navbar always accessible */}
      <Navbar
        currentTier={currentTier}
        setCurrentTier={setCurrentTier}
        onNavigate={navigateToSection}
      />

      {/* Main Dynamic Viewport */}
      {viewState === 'home' ? (
        <main>
          {/* Hero Section */}
          <Hero onNavigate={navigateToSection} />

          {/* Core Interactive Calculator Node */}
          <CalculatorSection
            currentTier={currentTier}
            onTriggerUpgrade={triggerUpgrade}
          />

          {/* Humorous Features / Capabilities */}
          <Features />

          {/* Pricing cards matrix */}
          <Pricing
            currentTier={currentTier}
            setCurrentTier={setCurrentTier}
          />

          {/* Customer Reviews Parodies */}
          <Testimonials />

          {/* FAQ Accordion list */}
          <FAQ />
        </main>
      ) : (
        <NotFoundPage onBack={() => setViewState('home')} />
      )}

      {/* Interactive Footer */}
      <Footer onNavigate={navigateToSection} />

      {/* Shared Premium Upgrade checkout Modal */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        attemptedOp={attemptedOp}
        requiredTier={requiredTier}
        onUpgradeSuccess={handleUpgradeSuccess}
      />
    </div>
  );
}
