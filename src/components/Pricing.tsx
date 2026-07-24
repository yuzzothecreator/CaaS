import React from 'react';
import { motion } from 'motion/react';
import { Check, X, Sparkles } from 'lucide-react';
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
      notIncluded: ['Division (/)', 'Decimals (.) and scientific functions', 'Priority support'],
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
      notIncluded: ['Trigonometry and logarithms', 'Root computation'],
      btnText: 'Go Business',
    },
    {
      id: 'enterprise' as SubscriptionTier,
      name: 'Quantum Enterprise',
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
      notIncluded: [] as string[],
      btnText: 'Acquire Enterprise License',
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-secondary/30 relative border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Scale Your Calculations
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-3 text-balance">
            Simple, low-cost math licenses
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed text-pretty">
            Choose the package that matches your mathematical scale. Pay per node cluster without local
            hardware thermal throttling.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => {
            const isActive = currentTier === plan.id;

            return (
              <motion.div
                key={plan.id}
                whileHover={{ y: -3 }}
                className={`relative rounded-2xl border bg-card p-6 sm:p-7 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md ${
                  plan.popular ? 'border-primary ring-2 ring-primary/20' : 'border-border'
                }`}
                id={`pricing-card-${plan.id}`}
              >
                {plan.popular && (
                  <span className="absolute -top-3 right-5 rounded-lg bg-accent text-accent-foreground px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="h-3 w-3" /> Most Popular
                  </span>
                )}

                <div>
                  <h3 className="font-semibold text-foreground text-lg flex items-center gap-2 tracking-tight">
                    {plan.name}
                    {isActive && (
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-md uppercase font-mono font-bold tracking-wider">
                        Active
                      </span>
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm mt-2 leading-relaxed min-h-[48px] text-pretty">
                    {plan.tagline}
                  </p>

                  <div className="mt-6 flex items-baseline gap-1 border-b border-border pb-6">
                    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground font-mono">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground font-medium">/ {plan.period}</span>
                  </div>

                  <ul className="mt-6 space-y-3 text-sm">
                    {plan.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex gap-2.5 items-start text-foreground/90 leading-normal">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feat, fIdx) => (
                      <li
                        key={fIdx}
                        className="flex gap-2.5 items-start text-muted-foreground/60 leading-normal line-through"
                      >
                        <X className="h-4 w-4 text-muted-foreground/40 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => {
                      setCurrentTier(plan.id);
                      const el = document.getElementById('calculator');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full rounded-xl py-3 text-center text-sm font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 pointer-events-none'
                        : plan.popular
                          ? 'btn-primary'
                          : 'btn-secondary'
                    }`}
                  >
                    {isActive ? 'Current Active Plan' : plan.btnText}
                  </button>
                  <p className="text-center text-[10px] text-muted-foreground mt-2.5 font-mono">
                    {plan.id === 'enterprise' ? '99.9% conversion SLA' : 'Instant provisioning'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-14 text-center max-w-xl mx-auto rounded-2xl border border-border bg-card p-4 shadow-sm">
          <p className="text-[11px] text-muted-foreground leading-relaxed uppercase tracking-wider font-mono text-pretty">
            Tax code regulation alert: Under US Senate math bill §312, calculating numbers without an
            enterprise licence is permitted only for integers under 1,000.
          </p>
        </div>
      </div>
    </section>
  );
}
