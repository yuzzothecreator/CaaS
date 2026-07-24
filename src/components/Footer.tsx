import React from 'react';
import { Calculator, Heart, Shield } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-secondary/40 border-t border-border pt-16 pb-8 text-sm text-muted-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 pb-12 border-b border-border">
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calculator className="h-4 w-4" />
              </span>
              <span className="text-base font-bold tracking-tight text-foreground">
                Calc<span className="text-primary">Flow</span>
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-xs text-sm">
              Next-generation arithmetic scaling for hyper-growth non-mathematicians. Protecting global integer queues since 2026.
            </p>
            <div className="flex items-center gap-2 text-muted-foreground font-mono text-[10px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>SATELLITE NODE UPTIME: 100.00%</span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[10px] font-mono">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('calculator')} className="hover:text-foreground transition-colors cursor-pointer">
                  Compute Node
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-foreground transition-colors cursor-pointer">
                  Pricing Plans
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('features')} className="hover:text-foreground transition-colors cursor-pointer">
                  Enterprise Features
                </button>
              </li>
              <li>
                <span className="text-muted-foreground/70 flex items-center gap-1.5">
                  Scientific Layout <code className="bg-muted text-muted-foreground px-1 rounded text-[10px]">V4</code>
                </span>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[10px] font-mono">
              Resources
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground/70 flex items-center gap-1.5">
                  Developer API <code className="bg-amber-50 text-amber-700 px-1 rounded text-[10px]">LOCK</code>
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/70">Documentation</span>
              </li>
              <li>
                <span className="text-muted-foreground/70 flex items-center gap-1.5">
                  Cluster Status <code className="bg-emerald-50 text-emerald-700 px-1 rounded text-[10px]">LIVE</code>
                </span>
              </li>
              <li>
                <span className="text-muted-foreground/70">Arithmetical Blog</span>
              </li>
            </ul>
          </div>

          <div className="space-y-3 col-span-2">
            <h4 className="font-semibold text-foreground uppercase tracking-wider text-[10px] font-mono">
              Certifications
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 bg-card border border-border rounded-xl p-2.5 text-foreground shadow-sm">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 bg-card border border-border rounded-xl p-2.5 text-foreground shadow-sm">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span>ISO 27001 Sums</span>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground leading-normal">
              Our calculations have been fully certified by the General Board of Addition compliance.
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="text-foreground font-semibold text-sm">
              Disclaimer: This website is a parody and intended for entertainment purposes only.
            </p>
            <p className="text-[11px] text-muted-foreground leading-normal">
              No real credit cards are charged. No actual AI GPUs are used to calculate 2 + 2. CalcFlow is not a real $10 billion company.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2 text-muted-foreground font-mono text-[10px]">
            <span>© {new Date().getFullYear()} CalcFlow Inc.</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="h-2.5 w-2.5 text-red-500 fill-red-500" /> for arithmetic satire
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
