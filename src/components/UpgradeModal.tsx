import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, Sparkles, CreditCard, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  attemptedOp: string;
  requiredTier: SubscriptionTier;
  onUpgradeSuccess: (tier: SubscriptionTier) => void;
}

export default function UpgradeModal({
  isOpen,
  onClose,
  attemptedOp,
  requiredTier,
  onUpgradeSuccess,
}: UpgradeModalProps) {
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('***');

  const getTierDetails = (tier: SubscriptionTier) => {
    switch (tier) {
      case 'pro':
        return {
          name: 'Pro Math Plan',
          price: '$9/mo',
          color: 'from-blue-500 to-indigo-500',
          textColor: 'text-blue-400',
          shadowColor: 'rgba(59, 130, 246, 0.3)',
          tagline: 'Unlock multiplication and unleash dimensional math scaling.',
        };
      case 'business':
        return {
          name: 'Business Arithmetic',
          price: '$29/mo',
          color: 'from-purple-500 to-pink-500',
          textColor: 'text-purple-400',
          shadowColor: 'rgba(168, 85, 247, 0.3)',
          tagline: 'Enables division, real-time fraction computation, and fast calculations.',
        };
      case 'enterprise':
        return {
          name: 'Enterprise Quantum Math',
          price: '$299/mo',
          color: 'from-amber-400 via-orange-500 to-red-600',
          textColor: 'text-amber-400',
          shadowColor: 'rgba(245, 158, 11, 0.3)',
          tagline: 'Scientific functions, power, root, priority routing, and unlimited decimals.',
        };
      default:
        return {
          name: 'Free Arithmetic',
          price: '$0/mo',
          color: 'from-gray-500 to-gray-700',
          textColor: 'text-gray-400',
          shadowColor: 'rgba(156, 163, 175, 0.3)',
          tagline: 'Basic addition and subtraction for hobbyist math.',
        };
    }
  };

  const details = getTierDetails(requiredTier);

  const handleFakeCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpgrading(true);
    // Simulate real high-end Stripe integration loading flow
    setTimeout(() => {
      setIsUpgrading(false);
      setIsSuccess(true);
      setTimeout(() => {
        onUpgradeSuccess(requiredTier);
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="upgrade-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-2xl md:p-8"
          >
            {/* Ambient Background Glow */}
            <div className={`absolute -top-40 -right-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br ${details.color} opacity-20 blur-[100px]`} />

            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-2">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                  <ShieldAlert className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-white">Unlock Premium Mathematics</h3>
                  <p className="text-xs text-slate-400">Upgrade to execute operational calculations</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/5 hover:text-white transition-colors"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            {!isSuccess ? (
              <div className="mt-6 space-y-6">
                {/* Alert Notice */}
                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4">
                  <div className="flex gap-3">
                    <Lock className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-200">
                        Operation <code className="px-1.5 py-0.5 bg-slate-800 rounded font-mono font-bold text-white">{attemptedOp}</code> is Locked
                      </p>
                      <p className="text-slate-400 mt-1">
                        Your current subscription plan does not support this mathematical dimension. 
                        Multiplication, Division, and Advanced Arithmetic require premium computational resources.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Plan Highlights */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4 flex items-center justify-between">
                  <div>
                    <span className={`inline-block rounded-full bg-gradient-to-r ${details.color} px-2.5 py-0.5 text-2xs font-semibold text-slate-950 uppercase tracking-wider`}>
                      {requiredTier} Plan
                    </span>
                    <h4 className="font-display font-bold text-white text-base mt-1.5">{details.name}</h4>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{details.tagline}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-2xl font-black text-white">{details.price}</div>
                    <div className="text-2xs text-slate-400">per calculation node</div>
                  </div>
                </div>

                {/* Simulated Stripe Checkout Form */}
                <form onSubmit={handleFakeCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-2xs font-semibold uppercase tracking-wider text-slate-400">SaaS Payment Credentials</label>
                    <div className="space-y-3 rounded-xl border border-white/10 bg-slate-950 p-4">
                      {/* Card Input Wrapper */}
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-slate-500 shrink-0" />
                        <input
                          type="text"
                          className="w-full bg-transparent font-mono text-sm text-white focus:outline-none"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card number"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-3">
                        <div>
                          <label className="block text-4xs uppercase tracking-wider text-slate-500 mb-1">Expires</label>
                          <input
                            type="text"
                            className="w-full bg-transparent font-mono text-xs text-white focus:outline-none"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-4xs uppercase tracking-wider text-slate-500 mb-1">CVC Code</label>
                          <input
                            type="text"
                            className="w-full bg-transparent font-mono text-xs text-white focus:outline-none"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="CVC"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Disclaimer */}
                  <p className="text-4xs text-slate-500 text-center">
                    Payments are handled by CalcFlow Secure Cryptographic Ledger. Real capital is not charged. 
                    This is a comedy parody. Clicking below simulated payments instantly unlocks computation.
                  </p>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                      id="cancel-upgrade-btn"
                    >
                      Maybe Later
                    </button>
                    <button
                      type="submit"
                      disabled={isUpgrading}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:brightness-110 active:scale-98 transition-all disabled:opacity-70 disabled:pointer-events-none"
                      style={{ boxShadow: `0 4px 20px ${details.shadowColor}` }}
                      id="submit-upgrade-btn"
                    >
                      {isUpgrading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Securing Node...
                        </>
                      ) : (
                        <>
                          Upgrade Plan <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="mt-8 mb-4 flex flex-col items-center text-center space-y-4">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="rounded-full bg-emerald-500/10 p-4 text-emerald-400"
                >
                  <Sparkles className="h-10 w-10 animate-pulse" />
                </motion.div>
                <h3 className="font-display text-xl font-bold text-white">Payment Confirmed!</h3>
                <p className="text-sm text-slate-300 max-w-xs">
                  Your CalcFlow mathematical capacity has been scaled to <span className="font-bold text-indigo-400">{requiredTier.toUpperCase()}</span>.
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Quantum nodes have been successfully deployed. Calculation restrictions for {attemptedOp} are now removed.
                </p>
                <div className="flex gap-2 text-xs text-emerald-400 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                  <CheckCircle2 className="h-4 w-4" /> Transaction ID: tx_parody_{Math.floor(Math.random() * 900000 + 100000)}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
