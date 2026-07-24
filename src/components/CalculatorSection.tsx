import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, HelpCircle, Lock, Server, RefreshCw, CheckCircle } from 'lucide-react';
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

  useEffect(() => {
    if (logsEndRef.current) {
      logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [systemLogs, computingLog]);

  const getRequiredTierForChar = (char: string): SubscriptionTier => {
    if (['+', '-'].includes(char)) return 'free';
    if (['*', 'x', 'X'].includes(char)) return 'pro';
    if (['/', '÷'].includes(char)) return 'business';
    if (['.', '%', '^', '√', '(', ')', 'p', 'e', 's', 'c', 't', 'l'].includes(char.toLowerCase())) {
      return 'enterprise';
    }
    return 'free';
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
        setExpression((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[0-9]$/.test(key)) {
        setExpression((prev) => prev + key);
        return;
      }

      if (['+', '-', '*', '/', '%', '^', '.', '(', ')'].includes(key)) {
        e.preventDefault();
        const reqTier = getRequiredTierForChar(key);
        if (!isTierAllowed(reqTier)) {
          onTriggerUpgrade(getFriendlyOpName(key), reqTier);
        } else {
          setExpression((prev) => prev + key);
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
      case '*':
        return 'Multiplication (*)';
      case '/':
        return 'Division (/)';
      case '.':
        return 'Decimal placement (.)';
      case '%':
        return 'Percentage (%)';
      case '^':
        return 'Exponentiation (^)';
      case '√':
        return 'Square Root (√)';
      case 'sin':
        return 'Trigonometry (sin)';
      case 'cos':
        return 'Trigonometry (cos)';
      case 'tan':
        return 'Trigonometry (tan)';
      case 'log':
        return 'Logarithm (log)';
      case 'ln':
        return 'Natural Log (ln)';
      default:
        return char;
    }
  };

  const handleKeyClick = (val: string, reqTier: SubscriptionTier = 'free') => {
    if (isComputing) return;

    if (!isTierAllowed(reqTier)) {
      onTriggerUpgrade(getFriendlyOpName(val), reqTier);
      return;
    }

    if (val === 'C') {
      handleClear();
    } else if (val === 'DEL') {
      setExpression((prev) => prev.slice(0, -1));
    } else if (val === '=') {
      handleCalculate();
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
    setSystemLogs((prev) => [...prev, 'System: Compute board buffer purged.']);
  };

  const handleCalculate = () => {
    if (!expression || isComputing) return;

    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      const reqTier = getRequiredTierForChar(char);
      if (!isTierAllowed(reqTier)) {
        onTriggerUpgrade(getFriendlyOpName(char), reqTier);
        return;
      }
    }

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
        setSystemLogs((prev) => [...prev, `Cloud: ${step.message}`]);
        setProgress(Math.round(((currentStep + 1) / steps.length) * 100));

        setTimeout(() => {
          currentStep++;
          runStep();
        }, step.duration);
      } else {
        try {
          const solved = evaluateExpression(expression);
          setResult(solved);
          setSystemLogs((prev) => [...prev, `System: Solved! "${expression}" = ${solved} (99.999% certainty)`]);
        } catch {
          setResult('ERROR: INF');
          setSystemLogs((prev) => [...prev, 'System: Overflow / Complex Matrix anomaly detected. Upgrade plan?']);
        }
        setIsComputing(false);
        setComputingLog('');
      }
    };

    runStep();
  };

  const evaluateExpression = (expr: string): string => {
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

    const validPattern =
      /^[0-9+\-*/().%*\s|Math.PI|Math.E|Math.sin|Math.cos|Math.tan|Math.log10|Math.log|Math.sqrt|Math.pow|\**]+$/i;

    if (!validPattern.test(sanitized)) {
      throw new Error('Arithmetic Security Violation');
    }

    const resultVal = new Function(`return (${sanitized})`)();

    if (typeof resultVal === 'number') {
      if (isNaN(resultVal)) return 'NaN';
      if (!isFinite(resultVal)) return '∞';
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
    setSystemLogs((prev) => [
      ...prev,
      scientificMode
        ? 'System: Advanced trigonometry coprocessors offline.'
        : 'System: Scientific quantum computing module mounted successfully.',
    ]);
  };

  const keyBase =
    'rounded-xl border border-border font-semibold py-3.5 transition-all cursor-pointer relative';
  const digitKey = `${keyBase} bg-card text-foreground hover:bg-secondary`;
  const opKey = `${keyBase} bg-secondary text-primary hover:bg-primary hover:text-primary-foreground`;
  const lockedKey = `${keyBase} bg-muted/60 text-muted-foreground hover:bg-muted`;
  const sciKey = `${keyBase} bg-accent/30 text-accent-foreground border-accent/40 hover:bg-accent/50 py-2.5 font-mono text-xs`;

  return (
    <section id="calculator" className="py-24 bg-secondary/30 relative border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Distributed Compute Node
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl leading-tight text-balance">
              A clear interface for extreme calculations
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-pretty">
              Tap the keys, use your keyboard, or mount the scientific panel. Expressions run through
              simulated server-side telemetry so integrity stays theatrical—and intact.
            </p>

            <div className="space-y-3.5 pt-2">
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 shrink-0">
                  <CheckCircle className="h-4 w-4" />
                </span>
                <span className="text-sm text-foreground/80">
                  <strong>Free Tier:</strong> Addition (+) and subtraction (-) forever.
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 text-primary shrink-0">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground/80">
                  <strong>Multiplication:</strong> Requires <strong>Pro</strong> ($9/mo).
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-secondary-foreground shrink-0 border border-border">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground/80">
                  <strong>Division:</strong> Requires <strong>Business</strong> ($29/mo).
                </span>
              </div>
              <div className="flex gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-50 text-amber-600 shrink-0">
                  <Lock className="h-3.5 w-3.5" />
                </span>
                <span className="text-sm text-foreground/80">
                  <strong>Scientific:</strong> Roots, decimals, and trig need <strong>Enterprise</strong> ($299/mo).
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 flex gap-3.5 items-start shadow-sm">
              <HelpCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Tip:</strong> Try a locked key like{' '}
                <code className="bg-muted text-foreground px-1.5 py-0.5 rounded font-mono text-xs">*</code> or{' '}
                <code className="bg-muted text-foreground px-1.5 py-0.5 rounded font-mono text-xs">/</code> to open
                the checkout simulation.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="w-full max-w-md rounded-2xl border border-border bg-card p-4 sm:p-6 shadow-sm relative">
              <div className="absolute top-4 left-6 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-[10px] text-muted-foreground tracking-wider">SECURE GRID</span>
              </div>

              <div className="absolute top-4 right-6 flex items-center gap-1.5 bg-secondary px-2 py-0.5 rounded-lg border border-border">
                <Server className="h-2.5 w-2.5 text-primary" />
                <span className="font-mono text-[10px] text-muted-foreground uppercase">{currentTier} MODE</span>
              </div>

              <div className="mt-6 mb-5 bg-sidebar text-sidebar-foreground rounded-2xl p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary" />

                <div className="flex justify-between items-center text-[10px] font-mono text-sidebar-foreground/50 pb-1.5 border-b border-white/10">
                  <span>EXPRESSION COMPILER</span>
                  <span className="tracking-widest uppercase">
                    {isComputing ? 'RESOLVING...' : 'IDLE READY'}
                  </span>
                </div>

                <div className="min-h-[38px] flex items-end justify-end text-lg sm:text-xl font-mono text-sidebar-foreground/70 mt-2 tracking-wide overflow-x-auto whitespace-nowrap">
                  {expression || '0'}
                </div>

                <div className="min-h-[44px] flex items-end justify-end text-3xl sm:text-4xl font-bold tracking-tight mt-1 truncate font-mono text-white">
                  {isComputing ? (
                    <span className="text-sm font-mono text-teal-300 animate-pulse flex items-center gap-1.5">
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      COMPUTING...
                    </span>
                  ) : (
                    result || '0'
                  )}
                </div>
              </div>

              <AnimatePresence>
                {isComputing && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 space-y-1.5"
                  >
                    <div className="flex justify-between text-[10px] font-mono text-primary uppercase tracking-widest">
                      <span>{computingLog}</span>
                      <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden border border-border">
                      <motion.div
                        className="h-full bg-primary"
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex gap-2 mb-4">
                <button
                  onClick={handleScientificToggle}
                  className={`flex-1 flex items-center justify-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold tracking-wide cursor-pointer transition-all ${
                    scientificMode
                      ? 'bg-accent/40 text-accent-foreground border-accent/50'
                      : 'bg-secondary text-foreground border-border hover:bg-muted'
                  }`}
                  id="scientific-toggle-btn"
                >
                  <Cpu className="h-3.5 w-3.5" />
                  {scientificMode ? 'Scientific (Active)' : 'Mount Scientific'}
                </button>
                <button
                  onClick={handleClear}
                  className="rounded-xl border border-border bg-secondary text-foreground hover:bg-muted px-4 py-2 text-xs font-semibold cursor-pointer transition-all"
                  id="clear-btn"
                >
                  Clear
                </button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <AnimatePresence>
                  {scientificMode && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="col-span-4 grid grid-cols-4 gap-2 pb-2 mb-2 border-b border-border"
                    >
                      {['sin(', 'cos(', 'tan(', '^', 'log(', 'ln(', 'π', 'e'].map((sym, i) => (
                        <button
                          key={sym}
                          onClick={() => handleKeyClick(sym, 'enterprise')}
                          className={sciKey}
                        >
                          {['sin', 'cos', 'tan', 'x^y', 'log', 'ln', 'π', 'e'][i]}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button onClick={() => handleKeyClick('(', 'enterprise')} className={lockedKey}>
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-muted-foreground" />}
                  (
                </button>
                <button onClick={() => handleKeyClick(')', 'enterprise')} className={lockedKey}>
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-muted-foreground" />}
                  )
                </button>
                <button onClick={() => handleKeyClick('√(', 'enterprise')} className={lockedKey}>
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-muted-foreground" />}
                  √
                </button>
                <button onClick={() => handleKeyClick('/', 'business')} className={opKey}>
                  {!isTierAllowed('business') && <Lock className="absolute top-1 right-1 h-2 w-2" />}
                  ÷
                </button>

                {['7', '8', '9'].map((d) => (
                  <button key={d} onClick={() => handleKeyClick(d)} className={`${digitKey} font-sans text-lg`}>
                    {d}
                  </button>
                ))}
                <button onClick={() => handleKeyClick('*', 'pro')} className={opKey}>
                  {!isTierAllowed('pro') && <Lock className="absolute top-1 right-1 h-2 w-2" />}
                  ×
                </button>

                {['4', '5', '6'].map((d) => (
                  <button key={d} onClick={() => handleKeyClick(d)} className={`${digitKey} font-sans text-lg`}>
                    {d}
                  </button>
                ))}
                <button onClick={() => handleKeyClick('-')} className={opKey}>
                  −
                </button>

                {['1', '2', '3'].map((d) => (
                  <button key={d} onClick={() => handleKeyClick(d)} className={`${digitKey} font-sans text-lg`}>
                    {d}
                  </button>
                ))}
                <button onClick={() => handleKeyClick('+')} className={opKey}>
                  +
                </button>

                <button onClick={() => handleKeyClick('0')} className={`${digitKey} font-sans text-lg`}>
                  0
                </button>
                <button onClick={() => handleKeyClick('.', 'enterprise')} className={`${digitKey} font-sans text-lg`}>
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-muted-foreground" />}
                  .
                </button>
                <button onClick={() => handleKeyClick('%', 'enterprise')} className={`${digitKey} font-sans text-lg`}>
                  {!isTierAllowed('enterprise') && <Lock className="absolute top-1 right-1 h-2 w-2 text-muted-foreground" />}
                  %
                </button>
                <button
                  onClick={() => handleKeyClick('DEL')}
                  className="rounded-xl bg-red-50 border border-red-200 text-red-600 font-mono font-bold py-3.5 hover:bg-red-100 transition-colors cursor-pointer"
                >
                  DEL
                </button>
              </div>

              <button
                onClick={handleCalculate}
                disabled={isComputing || !expression}
                className="w-full flex items-center justify-center gap-2 rounded-2xl btn-primary px-4 py-4 text-sm font-semibold mt-3 disabled:opacity-50 disabled:pointer-events-none"
                id="calculate-trigger-btn"
              >
                Execute Solution
              </button>

              <div className="mt-5 rounded-2xl bg-muted/50 p-4 border border-border">
                <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground uppercase tracking-widest pb-1 border-b border-border">
                  <span>Cluster Logstream</span>
                  <span className="text-emerald-600 flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    LIVE
                  </span>
                </div>
                <div className="max-h-24 overflow-y-auto mt-2 space-y-1.5 font-mono text-[10px] text-muted-foreground">
                  {systemLogs.map((log, idx) => (
                    <div key={idx} className="flex gap-2 leading-relaxed">
                      <span className="text-muted-foreground/50">[{new Date().toLocaleTimeString()}]</span>
                      <span
                        className={
                          log.includes('Solved')
                            ? 'text-emerald-700 font-semibold'
                            : log.includes('Locked')
                              ? 'text-amber-700'
                              : ''
                        }
                      >
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
