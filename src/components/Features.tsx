import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, ServerCrash, CloudLightning, Brain, Cpu, MinusSquare, Award, Sparkles } from 'lucide-react';

export default function Features() {
  const list = [
    {
      icon: <ServerCrash className="h-6 w-6 text-emerald-400" />,
      title: '99.999% Arithmetic Uptime',
      desc: 'Our distributed multi-region cluster ensures that your addition operations have instant fallback nodes in case of a regional mathematical failure.',
      badge: 'SLA Guaranteed',
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-blue-400" />,
      title: 'Military Grade Mathematics',
      desc: 'All calculations are encrypted with quantum-resistant keys, preventing unauthorized third parties from figuring out your intermediate equations.',
      badge: 'Highly Encrypted',
    },
    {
      icon: <CloudLightning className="h-6 w-6 text-indigo-400" />,
      title: 'Cloud-Based Numbers',
      desc: 'No local processor load. Our proprietary Number Cloud renders digits server-side, reducing device thermal throttling during heavy addition loops.',
      badge: 'Serverless',
    },
    {
      icon: <Brain className="h-6 w-6 text-purple-400" />,
      title: 'AI Enhanced Addition',
      desc: 'Our LLMs predict what number you are going to add next, pre-fetching it in a serverless cache before you even click the plus sign.',
      badge: 'Predictive',
    },
    {
      icon: <Cpu className="h-6 w-6 text-pink-400" />,
      title: 'Quantum Division Engine',
      desc: 'Available on the Business plan. Dividing by zero no longer crashes your computer—our sandbox routing isolates zero errors on safe offshore servers.',
      badge: 'Business Plan',
    },
    {
      icon: <MinusSquare className="h-6 w-6 text-amber-400" />,
      title: 'Unlimited Minus Operations',
      desc: 'We do not charge per subtraction. Execute unlimited minus calculations under our basic tier with zero fractional overhead fees.',
      badge: '100% Free',
    },
    {
      icon: <Award className="h-6 w-6 text-cyan-400" />,
      title: 'SOC 2 Compliant Arithmetic',
      desc: 'Independent auditors regularly certify that our additions are exactly correct. Rest easy knowing that 2 + 2 is consistently evaluated.',
      badge: 'Certified',
    },
    {
      icon: <Sparkles className="h-6 w-6 text-violet-400" />,
      title: 'Calculations at Light Speed',
      desc: 'Bypass physical limitations with localized hyper-loop servers. Your multiplication commands are prioritized through fiber-optic channels.',
      badge: 'Speed of Sound',
    },
  ];

  return (
    <section id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">Computational Superpowers</span>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl mt-3">
            Why Companies Trust CalcFlow For High-Stakes Arithmetic
          </h2>
          <p className="text-slate-400 mt-4 text-sm sm:text-base">
            Evaluating critical equations on primitive desktop calculators is a liability. 
            CalcFlow brings standard enterprise infrastructure to basic operations.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="glass-panel glass-panel-hover rounded-xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 bg-slate-900/80 rounded-lg border border-white/5 inline-block shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-5xs font-semibold uppercase tracking-wider font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-white/5">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white text-base mt-4">{item.title}</h3>
                <p className="text-slate-400 text-xs mt-2.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
