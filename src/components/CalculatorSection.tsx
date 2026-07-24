import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Sparkles, Cpu, Layers, HelpCircle, Lock, Server, ArrowRight, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import { SubscriptionTier } from '../types';

interface CalculatorSectionProps {
  currentTier: SubscriptionTier;
  onTriggerUpgrade: (op: string, requiredTier: SubscriptionTier) => void;
}

export default function CalculatorSection({ currentTier, onTriggerUpgrade }: CalculatorSectionProps) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [isComputing, setIsComputing] = useState(false);
  const [computingLog, setComputingLog] = useState('');
  const [progress, setProgress] = useState(0);
  const [scientificMode, setScientificMode] = useState(false);
  const [systemLogs, setSystemLogs] = useState<string[]>([
    'System: CalcFlow arithmetic matrix online.',
    'Cluster: 512,000 Xeon Cores standby.',
  ]);

  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll logs
  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemLogs, computingLog]);

  // Map operators to required tiers
  const getRequiredTierForChar = (char: string): SubscriptionTier => {
    if (['+', '-'].includes(char)) return 'free';
    if (['*', 'x', 'X'].includes(char)) return 'pro';
    if (['/', '÷'].includes(char)) return 'business';
    if (['.', '%', '^', '√', '(', ')', 'p', 'e', 's', 'c', 't', 'l'].includes(char.toLowerCase())) {
      return 'enterprise';
    }
    return 'free';
  };

  const getTierLabel = (tier: SubscriptionTier) => {
    if (tier === 'pro') return 'Pro Plan Required';
    if (tier === 'business') return 'Business Plan Required';
    if (tier === 'enterprise') return 'Enterprise Plan Required';
    return '';
  };

  // Keyboard intercept
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if focus is on modal or something else
      if (document.activeElement?.tagName === 'INPUT' && document.activeElement?.id !== 'calc-input-hidden') return;
      
      const key = e.key;

      if (key === 'Enter' || key === '=') {
        e.preventDefault();
        handleCalculate();
        return;
      }

      if (key === 'Escape' || key === 'c' || key === 'C') {
        e.preventDefault();
        handleClear();
        return;
      }

      if (key === 'Backspace') {
        e.preventDefault();
        setExpression(prev => prev.slice(0, -1));
        return;
      }

      // Check numeric or valid symbols
      if (/^[0-9]$/.test(key)) {
        setExpression(prev => prev + key);
        return;
      }

      // Validate operators
      if (['+', '-', '*', '/', '%', '^', '.', '(', ')'].includes(key)) {
        e.preventDefault();
        const reqTier = getRequiredTierForChar(key);
        if (!isTierAllowed(reqTier)) {
          onTriggerUpgrade(getFriendlyOpName(key), reqTier);
        } else {
          setExpression(prev => prev + key);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentTier]);

  const isTierAllowed = (required: SubscriptionTier): boolean => {
    const order: SubscriptionTier[] = ['free', 'pro', 'business', 'enterprise'];
    return order.indexOf(currentTier) >= order.indexOf(required);
  };

  const getFriendlyOpName = (char: string): string => {
    switch (char) {
      case '*': return 'Multiplication (*)';
      case '/': return 'Division (/)';
      case '.': return 'Decimal placement (.)';
      case '%': return 'Percentage (%)';
      case '^': return 'Exponentiation (^)';
      case '√': return 'Square Root (√)';
      case 'sin': return 'Trigonometry (sin)';
      case 'cos': return 'Trigonometry (cos)';
      case 'tan': return 'Trigonometry (tan)';
      case 'log': return 'Logarithm (log)';
      case 'ln': return 'Natural Log (ln)';
      default: return char;
    }
  };

  // Click on pad key
  const handleKeyClick = (val: string, reqTier: SubscriptionTier = 'free') => {
    if (isComputing) return;

    if (!isTierAllowed(reqTier)) {
      onTriggerUpgrade(getFriendlyOpName(val), reqTier);
      return;
    }

    if (val === 'C') {
      handleClear();
    } else if (val === 'DEL') {
      setExpression(prev => prev.slice(0, -1));
    } else if (val === '=') {
      handleCalculate();
    } else {
      // Append key or custom formula
      setExpression(prev => prev + val);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
    setSystemLogs(prev => [...prev, 'System: Compute board buffer purged.']);
  };

  const handleCalculate = () => {
    if (!expression || isComputing) return;

    // Last-mile check of any characters in the expression
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      const reqTier = getRequiredTierForChar(char);
      if (!isTierAllowed(reqTier)) {
        onTriggerUpgrade(getFriendlyOpName(char), reqTier);
        return;
      }
    }

    // Trigger funny fake AI calculations
    setIsComputing(true);
    setProgress(0);

    const steps = [
      { message: 'Initializing Cloud Math Engine...', duration: 600 },
      { message: 'Allocating Arithmetic Core Tensors...', duration: 600 },
      { message: 'Streaming values to Number Server cluster...', duration: 700 },
      { message: 'Resolving dimensional fraction collisions...', duration: 600 },
      { message: 'Deploying deep AI arithmetic verification models...', duration: 700 },
      { message: 'Formulating final consensus equation...', duration: 500 },
    ];

    let currentStep = 0;
    
    const runStep = () => {
      if (currentStep < steps.length) {
        const step = steps[currentStep];
        setComputingLog(step.message);
        setSystemLogs(prev => [...prev, `Cloud: ${step.message}`]);
        
        // Advance progress bar
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100));

        setTimeout(() => {
          currentStep++;
          runStep();
        }, step.duration);
      } else {
        // Evaluate the calculation
        try {
          const solved = evaluateExpression(expression);
          setResult(solved);
          setSystemLogs(prev => [...prev, `System: Solved! "${expression}" = ${solved} (99.999% certainty)`]);
        } catch (err) {
          setResult('ERROR: INF');
          setSystemLogs(prev => [...prev, 'System: Overflow / Complex Matrix anomaly detected. Upgrade plan?']);
        }
        setIsComputing(false);
        setComputingLog('');
      }
    };

    runStep();
  };

  // Safe Math Evaluator
  const evaluateExpression = (expr: string): string => {
    // Replace custom scientific symbols to math equivalents
    let sanitized = expr
      .replace(/x/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/\^/g, '**');

    // Basic calculation execution via safe function scope
    // We only execute operations composed of valid safe calculation tokens
    const validPattern = /^[0-9+\-*/().%*\s|Math.PI|Math.E|Math.sin|Math.cos|Math.tan|Math.log10|Math.log|Math.sqrt|Math.pow|\**]+$/i;
    
    if (!validPattern.test(sanitized)) {
      throw new Error('Arithmetic Security Violation');
    }

    // Evaluate
    // eslint-disable-next-line no-new-func
    const resultVal = new Function(`return (${sanitized})`)();
    
    if (typeof resultVal === 'number') {
      if (isNaN(resultVal)) return 'NaN';
      if (!isFinite(resultVal)) return '∞';
      // Format response beautifully
      return Number(resultVal.toFixed(8)).toString();
    }
    return String(resultVal);
  };

  const handleScientificToggle = () => {
    if (!isTierAllowed('enterprise')) {
      onTriggerUpgrade('Scientific functions', 'enterprise');
      return;
    }
    setScientificMode(!scientificMode);
    setSystemLogs(prev => [
      ...prev,
      scientificMode 
        ? 'System: Advanced trigonometry coprocessors offline.'
        : 'System: Scientific quantum computing module mounted successfully.',
    ]);
  };

  return (
    <section id="calculator" className="py-24 bg-slate-900/40 relative border-y border-white/5">
      {/* Visual Ambient Glow */}
      <div className="absolute top-0 right-10 -z-10 h-96 w-96 rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 -z-10 h-96 w-96 rounded-full bg-pink-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Detail Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500">Distributed Compute Node</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl leading-tight">
              A Gorgeous Interface For Extreme Calculations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Experience the power of CalcFlow. Tap the keys, use your physical keyboard, or toggle the 
              advanced scientific panel. All expressions are calculated with heavy server-side telemetry simulation to protect integrity.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-500/10 text-emerald-400 shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span className="text-xs text-slate-300"><strong>Free Tier Cap:</strong> Basic addition (+) and subtraction (-) are free forever.</span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/10 text-blue-400 shrink-0">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs text-slate-300"><strong>Multiplication Locked:</strong> Requires <strong>Pro Plan</strong> ($9/mo) to unlock double-digit scaling.</span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-purple-500/10 text-purple-400 shrink-0">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs text-slate-300"><strong>Division Locked:</strong> Requires <strong>Business Plan</strong> ($29/mo) to compute fractions cleanly.</span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/10 text-amber-500 shrink-0">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-xs text-slate-300"><strong>Trigonometry/Scientific:</strong> Power, root, percentages, parentheses, and sine curves require <strong>Enterprise</strong> ($299/mo).</span>
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="rounded-xl border border-white/5 bg-slate-950/40 p-4 flex gap-3.5 items-start">
              <HelpCircle className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-xs text-slate-400 leading-relaxed">
                <strong className="text-slate-200">Interactive Protip:</strong> Try to use a locked key like <code className="bg-slate-800 text-white px-1 rounded font-bold font-mono">*</code> or <code className="bg-slate-800 text-white px-1 rounded font-bold font-mono">/</code>, or toggle scientific mode to test the enterprise checkout simulation.
              </p>
            </div>
          </div>

          {/* Right Main Calculator Column */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-950 p-4 sm:p-6 shadow-2xl relative">
              
              {/* Premium Gadget Highlights */}
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-5xs text-slate-500 tracking-wider">SECURE GRID CLUSTER</span>
              </div>

              <div className="absolute top-4 right-6 flex items-center gap-1.5 bg-slate-900/80 px-2 py-0.5 rounded border border-white/5">
                <Server className="h-2.5 w-2.5 text-indigo-400" />
                <span className="font-mono text-5xs text-slate-400 uppercase">{currentTier} MODE</span>
              </div>

              {/* Calculator Screen Container */}
              <div className="mt-6 mb-5 bg-slate-900 rounded-2xl p-4 border border-white/5 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-80" />
                
                {/* Simulated OLED Background lines */}
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/[0.01] to-transparent pointer-events-none" />

                {/* OLED Display Header */}
                <div className="flex justify-between items-center text-4xs font-mono text-slate-500 pb-1.5 border-b border-white/5">
                  <span>EXPRESSION COMPILER</span>
                  <span className="text-slate-400 tracking-widest uppercase">
                    {isComputing ? 'RESOLVING AI TENSORS...' : 'IDLE READY'}
                  </span>
                </div>

                {/* Main calculation string */}
                <div className="min-h-[38px] flex items-end justify-end text-lg sm:text-xl font-mono text-slate-400 mt-2 tracking-wide overflow-x-auto whitespace-nowrap scrollbar-none">
                  {expression || '0'}
                </div>

                {/* Final evaluated result string */}
                <div className="min-h-[44px] flex items-end justify-end text-3xl sm:text-4xl font-extrabold text-white text-glow tracking-tight mt-1 truncate">
                  {isComputing ? (
                    <span className="text-sm font-mono text-indigo-400 animate-pulse flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                      COMPUTING CLOUD CONSENSUS...
                    </span>
                  ) : (
                    result || '0'
                  )}
                </div>
              </div>

              {/* Fake AI Computing progress bar */}
              <AnimatePresence>
                {isComputing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 space-y-1.5"
                  >
                    <div className="flex justify-between text-5xs font-mono text-indigo-400 uppercase tracking-widest">
                      <span>{computingLog}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Toolbar */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleScientificToggle}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-all ${
                    scientificMode
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30 shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                      : 'bg-slate-900/40 text-slate-300 border-white/5 hover:bg-slate-900 hover:border-white/10'
                  }`}
                  id="scientific-toggle-btn"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  {scientificMode ? 'Scientific (Active)' : 'Mount Scientific (Enterprise)'}
                </button>
                <button
                  onClick={handleClear}
                  className="rounded-xl border border-white/5 bg-slate-900/40 text-slate-300 hover:bg-slate-900 hover:text-white hover:border-white/10 px-4 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-all"
                  id="clear-btn"
                >
                  Clear Buffer
                </button>
              </div>

              {/* Dynamic Buttons Keypad Layout */}
              <div className="grid grid-cols-4 gap-2">
                
                {/* Advanced Scientific keys if scientificMode active */}
                <AnimatePresence>
                  {scientificMode && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="col-span-4 grid grid-cols-4 gap-2 pb-2 mb-2 border-b border-white/5"
                    >
                      <button
                        onClick={() => handleKeyClick('sin(', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        sin
                      </button>
                      <button
                        onClick={() => handleKeyClick('cos(', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        cos
                      </button>
                      <button
                        onClick={() => handleKeyClick('tan(', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        tan
                      </button>
                      <button
                        onClick={() => handleKeyClick('^', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        x^y
                      </button>

                      <button
                        onClick={() => handleKeyClick('log(', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        log
                      </button>
                      <button
                        onClick={() => handleKeyClick('ln(', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        ln
                      </button>
                      <button
                        onClick={() => handleKeyClick('π', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        π
                      </button>
                      <button
                        onClick={() => handleKeyClick('e', 'enterprise')}
                        className="rounded-xl bg-slate-900/80 border border-white/5 text-amber-400/90 font-mono text-xs font-bold py-2.5 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
                      >
                        e
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Row 1 */}
                <button
                  onClick={() => handleKeyClick('(', 'enterprise')}
                  className="rounded-xl bg-slate-900/60 border border-white/5 text-slate-300 font-mono font-bold py-3.5 hover:bg-slate-800 hover:text-white transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-slate-500" />}
                  (
                </button>
                <button
                  onClick={() => handleKeyClick(')', 'enterprise')}
                  className="rounded-xl bg-slate-900/60 border border-white/5 text-slate-300 font-mono font-bold py-3.5 hover:bg-slate-800 hover:text-white transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-slate-500" />}
                  )
                </button>
                <button
                  onClick={() => handleKeyClick('√(', 'enterprise')}
                  className="rounded-xl bg-slate-900/60 border border-white/5 text-slate-300 font-mono font-bold py-3.5 hover:bg-slate-800 hover:text-white transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-slate-500" />}
                  √
                </button>
                <button
                  onClick={() => handleKeyClick('/', 'business')}
                  className="rounded-xl bg-slate-900 border border-indigo-500/20 text-indigo-400 font-mono font-extrabold py-3.5 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('business') && <Lock className="absolute top-1 right-1 h-2 w-2 text-indigo-500" />}
                  ÷
                </button>

                {/* Row 2 */}
                <button
                  onClick={() => handleKeyClick('7')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  7
                </button>
                <button
                  onClick={() => handleKeyClick('8')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  8
                </button>
                <button
                  onClick={() => handleKeyClick('9')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  9
                </button>
                <button
                  onClick={() => handleKeyClick('*', 'pro')}
                  className="rounded-xl bg-slate-900 border border-indigo-500/20 text-indigo-400 font-mono font-extrabold py-3.5 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('pro') && <Lock className="absolute top-1 right-1 h-2 w-2 text-indigo-500" />}
                  ×
                </button>

                {/* Row 3 */}
                <button
                  onClick={() => handleKeyClick('4')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  4
                </button>
                <button
                  onClick={() => handleKeyClick('5')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  5
                </button>
                <button
                  onClick={() => handleKeyClick('6')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  6
                </button>
                <button
                  onClick={() => handleKeyClick('-')}
                  className="rounded-xl bg-slate-900 border border-indigo-500/20 text-indigo-400 font-mono font-extrabold py-3.5 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                >
                  -
                </button>

                {/* Row 4 */}
                <button
                  onClick={() => handleKeyClick('1')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  1
                </button>
                <button
                  onClick={() => handleKeyClick('2')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  2
                </button>
                <button
                  onClick={() => handleKeyClick('3')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  3
                </button>
                <button
                  onClick={() => handleKeyClick('+')}
                  className="rounded-xl bg-slate-900 border border-indigo-500/20 text-indigo-400 font-mono font-extrabold py-3.5 hover:bg-indigo-500 hover:text-white transition-all cursor-pointer"
                >
                  +
                </button>

                {/* Row 5 */}
                <button
                  onClick={() => handleKeyClick('0')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-colors cursor-pointer"
                >
                  0
                </button>
                <button
                  onClick={() => handleKeyClick('.', 'enterprise')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-slate-500" />}
                  .
                </button>
                <button
                  onClick={() => handleKeyClick('%', 'enterprise')}
                  className="rounded-xl bg-white/[0.03] border border-white/5 text-white font-sans text-lg font-semibold py-3.5 hover:bg-white/[0.08] transition-all cursor-pointer relative"
                >
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-slate-500" />}
                  %
                </button>
                <button
                  onClick={() => handleKeyClick('DEL')}
                  className="rounded-xl bg-red-950/40 border border-red-500/20 text-red-400 font-mono font-bold py-3.5 hover:bg-red-900 hover:text-white transition-colors cursor-pointer"
                >
                  DEL
                </button>
              </div>

              {/* Huge beautiful calculate button */}
              <button
                onClick={handleCalculate}
                disabled={isComputing || !expression}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-4 text-sm font-bold text-white shadow-lg hover:brightness-110 active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none mt-3 shadow-indigo-500/20"
                id="calculate-trigger-btn"
              >
                <Sparkles className="h-4 w-4" />
                EXECUTE ENTERPRISE SOLUTION
              </button>

              {/* Live console logs below calculator */}
              <div className="mt-5 rounded-2xl bg-slate-950 p-4 border border-white/5">
                <div className="flex justify-between items-center text-5xs font-mono text-slate-500 uppercase tracking-widest pb-1 border-b border-white/5">
                  <span>Cluster Output Logstream</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-emerald-500 animate-ping" />
                    LIVE TELEMETRY
                  </span>
                </div>
                <div className="max-h-24 overflow-y-auto mt-2 space-y-1.5 font-mono text-5xs text-slate-400 scrollbar-none">
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 leading-relaxed">
                      <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                      <span className={log.includes('Solved') ? 'text-emerald-400 font-bold' : log.includes('Locked') ? 'text-amber-400' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                  <div ref={logsEndRef} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
