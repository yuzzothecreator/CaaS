import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ServerCrash, CloudLightning, Brain, Cpu, MinusSquare, Award, Sparkles } from 'lucide-react';

export default function Features() {
  const list = [
    {
      icon: ServerCrash,
      title: '99.999% Arithmetic Uptime',
      desc: 'Our distributed multi-region cluster ensures that your addition operations have instant fallback nodes in case of a regional mathematical failure.',
      badge: 'SLA Guaranteed',
    },
    {
      icon: ShieldCheck,
      title: 'Military Grade Mathematics',
      desc: 'All calculations are encrypted with quantum-resistant keys, preventing unauthorized third parties from figuring out your intermediate equations.',
      badge: 'Highly Encrypted',
    },
    {
      icon: CloudLightning,
      title: 'Cloud-Based Numbers',
      desc: 'No local processor load. Our proprietary Number Cloud renders digits server-side, reducing device thermal throttling during heavy addition loops.',
      badge: 'Serverless',
    },
    {
      icon: Brain,
      title: 'AI Enhanced Addition',
      desc: 'Our LLMs predict what number you are going to add next, pre-fetching it in a serverless cache before you even click the plus sign.',
      badge: 'Predictive',
    },
    {
      icon: Cpu,
      title: 'Quantum Division Engine',
      desc: 'Available on the Business plan. Dividing by zero no longer crashes your computer—our sandbox routing isolates zero errors on safe offshore servers.',
      badge: 'Business Plan',
    },
    {
      icon: MinusSquare,
      title: 'Unlimited Minus Operations',
      desc: 'We do not charge per subtraction. Execute unlimited minus calculations under our basic tier with zero fractional overhead fees.',
      badge: '100% Free',
    },
    {
      icon: Award,
      title: 'SOC 2 Compliant Arithmetic',
      desc: 'Independent auditors regularly certify that our additions are exactly correct. Rest easy knowing that 2 + 2 is consistently evaluated.',
      badge: 'Certified',
    },
    {
      icon: Sparkles,
      title: 'Calculations at Light Speed',
      desc: 'Bypass physical limitations with localized hyper-loop servers. Your multiplication commands are prioritized through fiber-optic channels.',
      badge: 'Priority',
    },
  ];

  return (
    <section id="features" className="py-24 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Computational Superpowers
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-3 text-balance">
            Why teams trust CalcFlow for high-stakes arithmetic
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed text-pretty">
            Evaluating critical equations on primitive desktop calculators is a liability. CalcFlow brings
            enterprise infrastructure to basic operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {list.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: idx * 0.04 }}
                className="rounded-2xl border border-border bg-card p-5 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground text-base mt-4 tracking-tight">{item.title}</h3>
                <p className="text-muted-foreground text-sm mt-2 leading-relaxed text-pretty">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
