import React from 'react';
import { motion } from 'motion/react';
import { Calculator, Shield, Cpu, RefreshCw, Layers } from 'lucide-react';
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
        return 'from-blue-500 to-indigo-500 text-white border-blue-500/30 shadow-[0_0_12px_rgba(59,130,246,0.3)]';
      case 'business':
        return 'from-purple-500 to-pink-500 text-white border-purple-500/30 shadow-[0_0_12px_rgba(168,85,247,0.3)]';
      case 'enterprise':
        return 'from-amber-400 via-orange-500 to-red-600 text-slate-950 font-bold border-amber-400/30 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      default:
        return 'from-slate-700 to-slate-800 text-slate-300 border-white/5';
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          onClick={() => onNavigate('hero')}
          className="flex cursor-pointer items-center gap-2.5 transition-transform active:scale-95"
          id="navbar-logo"
        >
          <div className="relative flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-md">
            <Calculator className="h-5 w-5 text-white" />
            <div className="absolute inset-0 rounded-lg bg-white/10 opacity-0 hover:opacity-100 transition-opacity" />
          </div>
          <div>
            <span className="font-display text-lg font-extrabold tracking-tight text-white">Calc<span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Flow</span></span>
            <div className="flex items-center gap-1">
              <span className="block text-4xs font-semibold uppercase tracking-widest text-slate-500">Arithmetical Sovereign</span>
              <span className="h-1 w-1 rounded-full bg-emerald-500 animate-pulse"></span>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate('features')}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
            id="nav-features-btn"
          >
            Capabilities
          </button>
          <button
            onClick={() => onNavigate('calculator')}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors relative flex items-center gap-1.5"
            id="nav-calc-btn"
          >
            Compute Node
            <span className="flex h-1.5 w-1.5 rounded-full bg-indigo-400"></span>
          </button>
          <button
            onClick={() => onNavigate('pricing')}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
            id="nav-pricing-btn"
          >
            Plans
          </button>
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs font-medium text-slate-400 hover:text-white transition-colors"
            id="nav-faq-btn"
          >
            FAQ
          </button>
        </nav>

        {/* Action Controls & Active Tier Toggle */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Quick Tier Switcher (SaaS Parody Interaction) */}
          <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-slate-900/60 p-1">
            <span className="hidden lg:inline-flex items-center gap-1 text-4xs font-semibold uppercase tracking-wider text-slate-500 pl-1.5">
              <Layers className="h-3 w-3" /> Selected Environment:
            </span>
            <div className="relative">
              <select
                id="tier-selector-navbar"
                className="cursor-pointer bg-transparent text-xs font-medium text-slate-300 focus:outline-none pr-1 pl-1 lg:pl-0 font-mono capitalize"
                value={currentTier}
                onChange={(e) => setCurrentTier(e.target.value as SubscriptionTier)}
              >
                <option value="free" className="bg-slate-900 text-slate-300">Free Tier</option>
                <option value="pro" className="bg-slate-900 text-blue-400">Pro Plan</option>
                <option value="business" className="bg-slate-900 text-purple-400">Business</option>
                <option value="enterprise" className="bg-slate-900 text-amber-400">Enterprise</option>
              </select>
            </div>
          </div>

          {/* Subscription Status Badge */}
          <motion.div
            key={currentTier}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`flex items-center gap-1.5 rounded-lg border bg-gradient-to-r px-2.5 py-1 text-xs font-semibold capitalize tracking-wide ${getBadgeStyle(currentTier)}`}
            id="active-tier-badge"
          >
            <Shield className="h-3 w-3" />
            <span className="hidden sm:inline">{currentTier} Account</span>
            <span className="sm:hidden">{currentTier}</span>
          </motion.div>

          <button
            onClick={() => onNavigate('calculator')}
            className="hidden sm:flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-1.5 text-xs font-bold text-slate-950 hover:bg-slate-200 transition-all active:scale-95"
            id="navbar-cta-btn"
          >
            <Cpu className="h-3.5 w-3.5" /> Start Calculating
          </button>
        </div>
      </div>
    </header>
  );
}
