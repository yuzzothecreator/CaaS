import React from 'react';
import { Calculator, Globe, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-16 pb-8 text-xs text-slate-500 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-white/5">
          {/* Logo & Slogan Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-indigo-500 to-pink-500">
                <Calculator className="h-4 w-4 text-white" />
              </span>
              <span className="font-display text-base font-extrabold text-white">Calc<span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">Flow</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Next-generation arithmetic scaling for hyper-growth non-mathematicians. Protecting global integer queues since 2026.
            </p>
            <div className="flex items-center gap-2 text-slate-600 font-mono text-5xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
              <span>SATELLITE NODE UPTIME: 100.00%</span>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-5xs font-mono">Product Matrix</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-white transition-colors cursor-pointer">
                  Arithmetic Compute Node
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-white transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-white transition-colors cursor-pointer">
                  Enterprise Features
                </button>
              </li>
              <li>
                <span className="text-slate-700 flex items-center gap-1.5">
                  Scientific Layout <code className="bg-white/5 text-slate-500 px-1 rounded text-5xs">V4</code>
                </span>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase tracking-wider text-5xs font-mono">Resources</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-600 flex items-center gap-1.5">
                  Developer API <code className="bg-amber-500/10 text-amber-500 px-1 rounded text-5xs">LOCK</code>
                </span>
              </li>
              <li>
                <span className="text-slate-600 flex items-center gap-1.5">
                  Documentation <code className="bg-white/5 text-slate-500 px-1 rounded text-5xs">PDF</code>
                </span>
              </li>
              <li>
                <span className="text-slate-600 flex items-center gap-1.5">
                  Cluster Status <code className="bg-emerald-500/10 text-emerald-400 px-1 rounded text-5xs">LIVE</code>
                </span>
              </li>
              <li>
                <span className="text-slate-600">Arithmetical Blog</span>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-3 col-span-2">
            <h4 className="font-semibold text-white uppercase tracking-wider text-5xs font-mono">Secured Certifications</h4>
            <div className="grid grid-cols-2 gap-2 text-4xs">
              <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-slate-300">
                <Shield className="h-3.5 w-3.5 text-indigo-400" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/[0.02] border border-white/5 rounded-lg p-2 text-slate-300">
                <Shield className="h-3.5 w-3.5 text-pink-400" />
                <span>ISO 27001 Sums</span>
              </div>
            </div>
            <p className="text-5xs text-slate-600 leading-normal">
              Our calculations have been fully certified by the General Board of Addition compliance.
            </p>
          </div>
        </div>

        {/* Parody Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-slate-400 font-semibold text-glow-green">
              Disclaimer: This website is a parody and intended for entertainment purposes only.
            </p>
            <p className="text-5xs text-slate-600 leading-normal">
              No real credit cards are charged. No actual AI GPUs are used to calculate 2 + 2. CalcFlow is not a real $10 billion company.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-slate-600 font-mono text-5xs">
            <span>© {new Date().getFullYear()} CalcFlow Inc.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-2.5 w-2.5 text-red-500 fill-red-500" /> by Antigravity Agent
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
