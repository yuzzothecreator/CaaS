import React from 'react';
import { motion } from 'motion/react';
import { AlertTriangle, ArrowLeft, RefreshCw } from 'lucide-react';

interface NotFoundProps {
  onBack: () => void;
}

export default function NotFoundPage({ onBack }: NotFoundProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center surface-mint surface-mesh relative">
      <div className="max-w-md space-y-6">
        <motion.div
          animate={{ rotate: [0, 4, -4, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600 border border-red-200"
        >
          <AlertTriangle className="h-8 w-8" />
        </motion.div>

        <h1 className="text-7xl sm:text-8xl font-bold tracking-tight text-foreground font-mono">404</h1>

        <h2 className="text-xl font-semibold text-foreground tracking-tight text-balance">
          This page was divided by zero.
        </h2>

        <p className="text-muted-foreground text-sm leading-relaxed text-pretty">
          The mathematical universe collapsed while attempting to fetch this cluster resource. Our sandbox
          isolated the error. Please restore basic variables.
        </p>

        <div className="bg-sidebar text-sidebar-foreground p-4 rounded-2xl font-mono text-[11px] text-left space-y-1.5 max-w-sm mx-auto">
          <p className="text-red-400 font-bold">&gt;&gt; FATAL: DIV_BY_ZERO</p>
          <p className="text-sidebar-foreground/60">&gt; isolating node-404-address-conflict</p>
          <p className="text-sidebar-foreground/60">&gt; active_tensors: 0</p>
          <p className="text-emerald-400">✓ System safety systems: ONLINE</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-xl btn-secondary px-5 py-3 text-sm font-semibold cursor-pointer"
            id="back-to-home-btn"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Home
          </button>

          <button
            onClick={onBack}
            className="flex items-center justify-center gap-2 rounded-xl btn-primary px-5 py-3 text-sm font-semibold cursor-pointer"
            id="reboot-node-btn"
          >
            <RefreshCw className="h-4 w-4" /> Reboot Math Node
          </button>
        </div>
      </div>
    </div>
  );
}
