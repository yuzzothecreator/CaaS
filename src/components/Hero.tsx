import React from 'react';
import { motion } from 'motion/react';
import { CreditCard, ChevronRight, Server } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section id="hero" className="relative overflow-hidden surface-mint surface-mesh">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground text-balance"
          >
            Calc<span className="text-primary">Flow</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-foreground/90 text-balance"
            id="hero-headline"
          >
            Enterprise arithmetic, calmly delivered.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-4 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed text-pretty"
            id="hero-subheadline"
          >
            Offload addition to our number cloud—reliable, tiered, and ready when your spreadsheet is not.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
          >
            <button
              onClick={() => onNavigate('calculator')}
              className="group inline-flex items-center justify-center gap-2 rounded-xl btn-primary px-6 py-3.5 text-sm font-semibold"
              id="hero-start-btn"
            >
              Start Calculating
              <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="inline-flex items-center justify-center gap-2 rounded-xl btn-secondary px-6 py-3.5 text-sm font-semibold"
              id="hero-pricing-btn"
            >
              <CreditCard className="h-4 w-4" />
              View Pricing
            </button>
          </motion.div>
        </div>

        {/* Product visual — dominant plane below brand/CTA */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 60, delay: 0.32 }}
          className="mt-14 relative mx-auto max-w-5xl rounded-2xl border border-border bg-card shadow-sm overflow-hidden"
        >
          <div className="flex items-center justify-between border-b border-border px-4 py-2.5 bg-secondary/50">
            <div className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground flex items-center gap-1.5 bg-card px-2 py-0.5 rounded-md border border-border">
              <Server className="h-2.5 w-2.5 text-primary" />
              node-use-1.calcflow.io
            </span>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-wider">SECURE</span>
            </div>
          </div>

          <div className="bg-card p-4 sm:p-6 flex flex-col md:flex-row gap-6 text-left">
            <div className="md:w-1/3 space-y-4 border-r border-border md:pr-6 hidden md:block">
              <div>
                <span className="text-[10px] font-semibold text-primary uppercase tracking-widest font-mono">
                  System Telemetry
                </span>
                <p className="text-sm text-foreground mt-1 font-semibold">Active Compute Matrix</p>
              </div>
              <div className="space-y-2 font-mono text-[11px] text-muted-foreground">
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span>Allocation Core</span>
                  <span className="text-foreground">Xeon Platinum</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span>Math Tensors</span>
                  <span className="text-foreground">1,024 TPUs</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span>Minus Buffer</span>
                  <span className="text-foreground">Unlimited</span>
                </div>
                <div className="flex justify-between border-b border-border pb-1.5">
                  <span>Mult Locked</span>
                  <span className="text-amber-600 font-semibold">Pro Required</span>
                </div>
              </div>
              <div className="rounded-xl bg-secondary/60 p-3 border border-border space-y-2">
                <div className="flex justify-between text-[10px] font-mono text-muted-foreground">
                  <span>CLOUD LOAD</span>
                  <span className="text-primary">42%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: '42%' }} />
                </div>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">
                  Demo Container
                </span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-md font-mono font-medium">
                  REAL-TIME
                </span>
              </div>
              <div className="bg-sidebar text-sidebar-foreground p-4 rounded-xl font-mono text-xs space-y-2 min-h-[140px] flex flex-col justify-between">
                <div className="space-y-1 text-sidebar-foreground/60 text-[11px]">
                  <p>&gt; calcflow --cluster init</p>
                  <p className="text-emerald-400">✓ Connected to Quantum Addition Pipeline</p>
                  <p>&gt; evaluate "420 + 69"</p>
                  <p className="text-teal-300">Evaluating multi-layered addition tensors...</p>
                </div>
                <div className="text-right border-t border-white/10 pt-2">
                  <p className="text-[10px] text-sidebar-foreground/50">OPTIMIZED SOLUTION</p>
                  <p className="text-2xl font-bold font-mono text-white tracking-tight">489</p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => onNavigate('calculator')}
                  className="flex items-center gap-1 text-sm text-primary hover:text-primary/80 font-semibold cursor-pointer"
                >
                  Open Live Solver <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
