import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Shield, Sparkles, Cpu, Award, Zap } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface PricingProps {
  currentTier: SubscriptionTier;
  setCurrentTier: (tier: SubscriptionTier) => void;
}

export default function Pricing({ currentTier, setCurrentTier }: PricingProps) {
  const plans = [
    {
      id: 'free' as SubscriptionTier,
      name: 'Free Math',
      price: '$0',
      period: 'forever',
      tagline: 'Ideal for hobbyists who only need to combine single digits together.',
      popular: false,
      features: [
        'Addition (+)',
        'Subtraction (-)',
        'Standard 4-second latency queue',
        'Standard non-AI math layout',
      ],
      notIncluded: [
        'Multiplication (*)',
        'Division (/)',
        'Decimals (.) and fractions',
        'Advanced Scientific layout',
        'Military grade math encryption',
      ],
      color: 'border-white/5 bg-white/[0.02]',
      btnText: 'Current Active',
    },
    {
      id: 'pro' as SubscriptionTier,
      name: 'Professional Arithmetic',
      price: '$9',
      period: 'month',
      tagline: 'For power math users looking to unlock dimensional scalar equations.',
      popular: false,
      features: [
        'Addition (+)',
        'Subtraction (-)',
        'Multiplication (*)',
        'Reduced calculation latency',
        'Access to Pro server cluster',
      ],
      notIncluded: [
        'Division (/)',
        'Decimals (.) and scientific functions',
        'Priority support',
      ],
      color: 'border-white/10 bg-slate-900/40',
      btnText: 'Unlock Pro Tier',
    },
    {
      id: 'business' as SubscriptionTier,
      name: 'Business Algebra',
      price: '$29',
      period: 'month',
      tagline: 'The mathematical choice for scaling startups that require division operations.',
      popular: false,
      features: [
        'Addition (+)',
        'Subtraction (-)',
        'Multiplication (*)',
        'Division (/)',
        'Sub-second mathematical solution',
        'Isolate division by zero safe-nodes',
      ],
      notIncluded: [
        'Trigonometry and logarithms',
        'Root computation',
      ],
      color: 'border-indigo-500/10 bg-indigo-500/5',
      btnText: 'Go Business',
    },
    {
      id: 'enterprise' as SubscriptionTier,
      name: 'Quantum Enterprise math',
      price: '$299',
      period: 'month',
      tagline: 'Maximum throughput. Ideal for mathematical cartels and high-frequency addition.',
      popular: true,
      features: [
        'Square Root (√)',
        'Percentages (%) & Decimals (.)',
        'Parentheses (()) & Brackets',
        'Full Scientific functions (sin, cos, log)',
        'Priority Arithmetic Support (24/7 Phone)',
        'AI Predictor Addition',
        'SOC-2 Compliance certified',
        'Military Grade Math Encryption',
      ],
      notIncluded: [],
      color: 'border-amber-500/30 bg-slate-950 shadow-2xl shadow-amber-500/5 relative',
      btnText: 'Acquire Enterprise License',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-slate-950 grid-bg relative overflow-hidden">
      {/* Background visual details */}
      <div className="absolute top-1/4 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 -z-10 h-[400px] w-[400px] rounded-full bg-pink-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Scale Your Calculations</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-3">
            Simple, Low-Cost Math Licenses
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
            Choose the subscription package that matches your mathematical scale. Pay per node cluster 
            to execute advanced calculations without local hardware thermal throttling.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 items-stretch">
          {plans.map((plan) => {
            const isActive = currentTier === plan.id;
            
            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -4 }}
                className={`rounded-2xl border p-6 sm:p-8 flex flex-col justify-between transition-all ${plan.color} ${
                  plan.popular ? 'ring-2 ring-amber-500' : ''
                }`}
                id={`pricing-card-${plan.id}`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <span className="absolute -top-3 right-6 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-4xs font-bold uppercase tracking-wider text-slate-950 flex items-center gap-1 shadow-lg">
                    <Sparkles className="h-3 w-3 fill-slate-950" /> Most Popular (92% of startups)
                  </span>
                )}

                <div>
                  <h3 className="font-display font-bold text-white text-lg flex items-center gap-2">
                    {plan.name}
                    {isActive && (
                      <span className="text-5xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono font-bold tracking-wider">
                        ACTIVE
                      </span>
                    )}
                  </h3>
                  <p className="text-slate-400 text-xs mt-2.5 leading-relaxed min-h-[48px]">{plan.tagline}</p>

                  <div className="mt-6 flex items-baseline gap-1 border-b border-white/5 pb-6">
                    <span className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">{plan.price}</span>
                    <span className="text-xs text-slate-400 font-medium">/ {plan.period}</span>
                  </div>

                  {/* Feature Lists */}
                  <ul className="mt-6 space-y-3.5 text-xs">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-slate-200 leading-normal">
                        <Check className="h-4 w-4 text-indigo-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded && plan.notIncluded.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-slate-600 leading-normal line-through">
                        <X className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      setCurrentTier(plan.id);
                      // Scroll to calculator
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full rounded-xl py-3 text-center text-xs font-bold transition-all active:scale-97 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 pointer-events-none'
                        : plan.popular
                        ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 text-slate-950 shadow-lg shadow-amber-500/10 hover:brightness-110'
                        : 'bg-white/5 text-slate-200 border border-white/10 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {isActive ? 'Current Active Plan' : plan.btnText}
                  </button>
                  <p className="text-center text-4xs text-slate-500 mt-2.5 font-mono">
                    {plan.id === 'enterprise' ? '99.9% conversion SLA' : 'Instant provisioning'}
                  </p>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Humorous Legal Sub-Disclaimer */}
        <div className="mt-16 text-center max-w-xl mx-auto rounded-xl border border-white/5 bg-white/[0.01] p-4">
          <p className="text-4xs text-slate-500 leading-relaxed uppercase tracking-wider font-mono">
            ⚠️ TAX CODE REGULATION ALERT: Under US Senate math bill §312, calculating numbers without an enterprise licence 
            is permitted only for integers under 1,000. Underage calculations or unpaid divisions may result in cloud auditing logs.
          </p>
        </div>

      </div>
    </section>
  );
}
