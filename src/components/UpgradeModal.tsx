import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShieldAlert, CreditCard, Lock, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
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
          tagline: 'Unlock multiplication and dimensional math scaling.',
        };
      case 'business':
        return {
          name: 'Business Arithmetic',
          price: '$29/mo',
          tagline: 'Division, fraction computation, and faster solutions.',
        };
      case 'enterprise':
        return {
          name: 'Enterprise Quantum Math',
          price: '$299/mo',
          tagline: 'Scientific functions, decimals, and priority routing.',
        };
      default:
        return {
          name: 'Free Arithmetic',
          price: '$0/mo',
          tagline: 'Basic addition and subtraction for hobbyist math.',
        };
    }
  };

  const details = getTierDetails(requiredTier);

  const handleFakeCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpgrading(true);
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 16 }}
            transition={{ type: 'spring', duration: 0.45 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-lg md:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-border">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldAlert className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    Unlock Premium Mathematics
                  </h3>
                  <p className="text-sm text-muted-foreground">Upgrade to execute this operation</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                id="close-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {!isSuccess ? (
              <div className="mt-6 space-y-6">
                <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4">
                  <div className="flex gap-3">
                    <Lock className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-amber-900">
                        Operation{' '}
                        <code className="px-1.5 py-0.5 bg-white rounded font-mono font-bold text-foreground border border-amber-200">
                          {attemptedOp}
                        </code>{' '}
                        is locked
                      </p>
                      <p className="text-amber-800/80 mt-1 leading-relaxed">
                        Your current plan does not support this dimension. Multiplication, division, and
                        advanced arithmetic require a premium license.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-secondary/40 p-4 flex items-center justify-between">
                  <div>
                    <span className="inline-block rounded-lg bg-primary px-2.5 py-0.5 text-[10px] font-semibold text-primary-foreground uppercase tracking-wider">
                      {requiredTier} Plan
                    </span>
                    <h4 className="font-semibold text-foreground text-base mt-1.5">{details.name}</h4>
                    <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{details.tagline}</p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <div className="text-2xl font-bold tracking-tight text-foreground font-mono">
                      {details.price}
                    </div>
                    <div className="text-[10px] text-muted-foreground">per calculation node</div>
                  </div>
                </div>

                <form onSubmit={handleFakeCheckout} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-muted-foreground">Payment credentials</label>
                    <div className="space-y-3 rounded-2xl border border-border bg-card p-4 shadow-sm">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground shrink-0" />
                        <input
                          type="text"
                          className="w-full bg-transparent font-mono text-sm text-foreground focus:outline-none"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="Card number"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4 border-t border-border pt-3">
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            Expires
                          </label>
                          <input
                            type="text"
                            className="w-full bg-transparent font-mono text-xs text-foreground focus:outline-none"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-wider text-muted-foreground mb-1">
                            CVC
                          </label>
                          <input
                            type="text"
                            className="w-full bg-transparent font-mono text-xs text-foreground focus:outline-none"
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            placeholder="CVC"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-muted-foreground text-center text-pretty">
                    Payments are simulated. Real capital is not charged—this is a comedy parody.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 rounded-xl btn-secondary px-4 py-3 text-sm font-semibold"
                      id="cancel-upgrade-btn"
                    >
                      Maybe Later
                    </button>
                    <button
                      type="submit"
                      disabled={isUpgrading}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl btn-primary px-4 py-3 text-sm font-semibold disabled:opacity-70 disabled:pointer-events-none"
                      id="submit-upgrade-btn"
                    >
                      {isUpgrading ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
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
                  className="rounded-full bg-emerald-50 p-4 text-emerald-600"
                >
                  <Sparkles className="h-10 w-10" />
                </motion.div>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">Payment Confirmed</h3>
                <p className="text-sm text-muted-foreground max-w-xs text-pretty">
                  Capacity scaled to{' '}
                  <span className="font-semibold text-primary">{requiredTier.toUpperCase()}</span>.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">
                  Restrictions for {attemptedOp} are now removed.
                </p>
                <div className="flex gap-2 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                  <CheckCircle2 className="h-4 w-4" /> Transaction ID: tx_parody_
                  {Math.floor(Math.random() * 900000 + 100000)}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
