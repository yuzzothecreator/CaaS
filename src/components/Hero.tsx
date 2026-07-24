import React from 'react';
import { motion } from 'motion/react';
import { Play, CreditCard, ChevronRight, Sparkles, Cpu, Layers, Globe, Server, Check } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  // Floating arithmetic items
  const mathSymbols = [
    { symbol: 'f(x)', top: '15%', left: '10%', delay: 0 },
    { symbol: 'π', top: '25%', left: '80%', delay: 1.5 },
    { symbol: '√x', top: '70%', left: '8%', delay: 0.8 },
    { symbol: '∑', top: '65%', left: '85%', delay: 2.2 },
    { symbol: 'x + y', top: '12%', left: '75%', delay: 1.2 },
    { symbol: '∫ dy', top: '80%', left: '48%', delay: 1.8 },
    { symbol: 'log(n)', top: '50%', left: '12%', delay: 0.5 },
    { symbol: 'e = mc²', top: '48%', left: '88%', delay: 2.5 },
  ];

  return (
    <section id="hero" className="relative overflow-hidden pt-20 pb-20 md:pt-28 md:pb-32 grid-bg">
      {/* Animated Glowing Ambient Orbs */}
      <div className="absolute inset-x-0 -top-40 -z-10 flex transform-gpu justify-center overflow-hidden blur-3xl" aria-hidden="true">
        <div className="aspect-1108/632 w-[69.25rem] flex-none bg-gradient-to-r from-indigo-500 to-[#ff4694] opacity-15" style={{ clipPath: 'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)' }} />
      </div>

      <div className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-slate-950/20 shadow-xl shadow-slate-900/10 ring-1 ring-white/5" />

      {/* Floating Math Symbols Animation */}
      {mathSymbols.map((item, idx) => (
        <motion.div
          key={idx}
          className="absolute hidden sm:flex select-none font-mono text-sm md:text-lg font-semibold text-slate-700/60 pointer-events-none"
          style={{ top: item.top, left: item.left }}
          animate={{
            y: [0, -12, 0],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: item.delay,
            ease: 'easeInOut',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          {/* Parody Launch Alert Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-2xs font-bold uppercase tracking-wider text-indigo-400 mb-6"
          >
            <Sparkles className="h-3 w-3" />
            CalcFlow v4.0 AI-Engine Is Live
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
            id="hero-headline"
          >
            The World's Most <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              Advanced Calculator
            </span>{' '}
            Platform.
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base sm:text-lg lg:text-xl text-slate-400 leading-relaxed"
            id="hero-subheadline"
          >
            Powering enterprise arithmetic with next-generation AI-powered mathematics. Why calculate locally when you can offload addition to our serverless $10B GPU-powered number cloud?
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => onNavigate('calculator')}
              className="group w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:brightness-110 active:scale-98 transition-all"
              id="hero-start-btn"
            >
              Start Calculating
              <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('pricing')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/10 hover:text-white hover:border-white/20 active:scale-98 transition-all"
              id="hero-pricing-btn"
            >
              <CreditCard className="h-4 w-4" />
              View Pricing
            </button>
          </motion.div>

          {/* Fake Metrics Trust Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-16 border-t border-white/5 pt-8 max-w-4xl mx-auto"
          >
            <p className="text-2xs font-semibold uppercase tracking-widest text-slate-500 mb-6">
              Empowering top global math agencies and non-mathematicians
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <span className="block font-display text-2xl font-extrabold text-white">4.2 Billion</span>
                <span className="block text-4xs uppercase tracking-wider text-slate-500 font-mono">Operations Solved</span>
              </div>
              <div className="space-y-1">
                <span className="block font-display text-2xl font-extrabold text-white">99.9999%</span>
                <span className="block text-4xs uppercase tracking-wider text-slate-500 font-mono">Arithmetic Uptime</span>
              </div>
              <div className="space-y-1">
                <span className="block font-display text-2xl font-extrabold text-white">&lt; 2.4s</span>
                <span className="block text-4xs uppercase tracking-wider text-slate-500 font-mono">Average Plus Latency</span>
              </div>
              <div className="space-y-1">
                <span className="block font-display text-2xl font-extrabold text-white">100%</span>
                <span className="block text-4xs uppercase tracking-wider text-slate-500 font-mono">Cloud-Native Numbers</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Premium Interactive UI Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 50, delay: 0.4 }}
            className="mt-16 relative mx-auto max-w-4xl rounded-2xl border border-white/10 bg-slate-950 p-2 shadow-2xl shadow-indigo-500/5 overflow-hidden"
          >
            {/* Header elements */}
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 bg-slate-900/60 rounded-t-xl">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
              </div>
              <span className="font-mono text-4xs text-slate-500 flex items-center gap-1.5 bg-slate-950 px-2 py-0.5 rounded-md border border-white/5">
                <Server className="h-2.5 w-2.5 text-indigo-400" />
                node-use-1.calcflow.io (US-East)
              </span>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-5xs text-slate-400 tracking-wider">SECURE NODE</span>
              </div>
            </div>

            {/* Simulated app interface */}
            <div className="bg-slate-900 p-4 sm:p-6 flex flex-col md:flex-row gap-6 text-left">
              {/* Left sidebar info */}
              <div className="md:w-1/3 space-y-4 border-r border-white/5 md:pr-6 hidden md:block">
                <div>
                  <span className="text-4xs font-semibold text-indigo-400 uppercase tracking-widest font-mono">SYSTEM TELEMETRY</span>
                  <p className="text-xs text-slate-300 mt-1 font-display font-semibold">Active Compute Matrix</p>
                </div>
                <div className="space-y-2 font-mono text-4xs text-slate-500">
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Allocation Core</span>
                    <span className="text-slate-300">Xeon Platinum 9k</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Active Math Tensors</span>
                    <span className="text-slate-300">1,024 TPUs</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Minus Buffer Pool</span>
                    <span className="text-slate-300">Unlimited (Free)</span>
                  </div>
                  <div className="flex justify-between border-b border-white/5 pb-1">
                    <span>Mult-Thread Locked</span>
                    <span className="text-amber-500 font-bold">YES (Pro Required)</span>
                  </div>
                </div>
                {/* Micro visualizer bar */}
                <div className="rounded-lg bg-slate-950 p-2 border border-white/5 space-y-1.5">
                  <div className="flex justify-between text-5xs font-mono text-slate-500">
                    <span>CLOUD ARITHMETIC LOAD</span>
                    <span className="text-indigo-400">42% CAPACITY</span>
                  </div>
                  <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: '42%' }} />
                  </div>
                </div>
              </div>

              {/* Right main simulated screen */}
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-4xs font-bold text-pink-500 uppercase tracking-widest font-mono">DEMO CONTAINER</span>
                  <span className="text-5xs bg-slate-950 text-indigo-400 px-1.5 py-0.5 rounded font-mono">REAL-TIME</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-xs text-slate-300 space-y-2 min-h-[140px] flex flex-col justify-between">
                  <div className="space-y-1 text-slate-500 text-4xs">
                    <p>&gt; calcflow --cluster init</p>
                    <p className="text-emerald-400">✓ Connected to Quantum Addition Pipeline</p>
                    <p>&gt; evaluate "420 + 69"</p>
                    <p className="text-indigo-300">Evaluating multi-layered quantum addition tensors...</p>
                  </div>
                  <div className="text-right border-t border-white/5 pt-2">
                    <p className="text-4xs text-slate-500">OPTIMIZED SOLUTION</p>
                    <p className="text-2xl font-bold font-sans text-white text-glow">489</p>
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => onNavigate('calculator')}
                    className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 font-semibold cursor-pointer"
                  >
                    Open Live Solver <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
