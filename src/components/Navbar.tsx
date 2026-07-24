import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Shield, Layers } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface NavbarProps {
  currentTier: SubscriptionTier;
  setCurrentTier: (tier: SubscriptionTier) => void;
  onNavigate: (section: string) => void;
}

export default function Navbar({ currentTier, setCurrentTier, onNavigate }: NavbarProps) {
  const getBadgeStyle = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'pro':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'business':
        return 'bg-secondary text-secondary-foreground border-border';
      case 'enterprise':
        return 'bg-accent text-accent-foreground border-accent/40';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div
          onClick={() => onNavigate('hero')}
          className="flex cursor-pointer items-center gap-2.5 transition-transform active:scale-95"
          id="navbar-logo"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Calculator className="h-5 w-5" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-foreground">
              Calc<span className="text-primary">Flow</span>
            </span>
            <div className="flex items-center gap-1.5">
              <span className="block text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                Arithmetical Sovereign
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          {[
            { id: 'features', label: 'Capabilities' },
            { id: 'calculator', label: 'Compute Node' },
            { id: 'pricing', label: 'Plans' },
            { id: 'faq', label: 'FAQ' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              id={`nav-${item.id}-btn`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-card p-1 shadow-sm">
            <span className="hidden lg:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground pl-1.5">
              <Layers className="h-3 w-3" /> Plan:
            </span>
            <select
              id="tier-selector-navbar"
              className="cursor-pointer bg-transparent text-xs font-medium text-foreground focus:outline-none pr-1 pl-1 lg:pl-0 font-mono capitalize"
              value={currentTier}
              onChange={(e) => setCurrentTier(e.target.value as SubscriptionTier)}
            >
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="business">Business</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>

          <motion.div
            key={currentTier}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center gap-1.5 rounded-xl border px-2.5 py-1.5 text-xs font-semibold capitalize tracking-wide ${getBadgeStyle(currentTier)}`}
            id="active-tier-badge"
          >
            <Shield className="h-3 w-3" />
            <span className="hidden sm:inline">{currentTier}</span>
            <span className="sm:hidden">{currentTier}</span>
          </motion.div>

          <button
            onClick={() => onNavigate('calculator')}
            className="hidden sm:flex items-center gap-1.5 rounded-xl btn-primary px-3.5 py-2 text-xs font-semibold"
            id="navbar-cta-btn"
          >
            Start Calculating
          </button>
        </div>
      </div>
    </header>
  );
}
