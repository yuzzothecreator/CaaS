import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, Calculator, ArrowLeft, RefreshCw } from 'lucide-react';

interface NotFoundProps {
  onBack: () => void;
}

export default function NotFoundPage({ onBack }: NotFoundProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center grid-bg relative overflow-hidden">
      
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[400px] w-[400px] rounded-full bg-red-500/10 blur-[100px] pointer-events-none" />

      {/* Funny 404 Visual Content */}
      <div className="max-w-md space-y-6">
        
        {/* Animated warning triangle */}
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10 text-red-400 border border-red-500/20"
        >
          <AlertTriangle className="h-8 w-8 animate-pulse" />
        </motion.div>

        {/* 404 Title */}
        <h1 className="font-display text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-500 to-red-600">
          404
        </h1>

        <h2 className="font-display text-xl font-bold text-white tracking-tight">
          This page was divided by zero.
        </h2>

        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
          The mathematical universe collapsed while attempting to fetch this cluster resource. 
          Our sandbox server cluster isolated the error to protect other calculations. 
          Please downgrade your current address bar or restore basic variables.
        </p>

        {/* Console display simulation */}
        <div className="bg-slate-950 p-4 rounded-xl border border-white/5 font-mono text-5xs text-left text-slate-500 space-y-1.5 max-w-sm mx-auto">
          <p className="text-red-400 font-bold">&gt;&gt; FATAL MATHEMATICAL CONFLICT: DIV_BY_ZERO</p>
          <p>&gt; isolating node-404-address-conflict</p>
          <p>&gt; active_tensors: 0</p>
          <p className="text-emerald-400">✓ System safety systems: ONLINE</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-xs font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            id="back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4" /> Downgrade to Home
          </button>
          
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 px-5 py-3 text-xs font-bold text-white shadow-lg shadow-red-500/20 hover:brightness-110 active:scale-97 transition-all cursor-pointer"
            id="reboot-node-btn"
          >
            <RefreshCw className="h-4 w-4" /> Reboot Math Node
          </button>
        </div>

      </div>
    </div>
  );
}
