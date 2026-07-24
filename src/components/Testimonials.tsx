import React from 'react';
import { motion } from 'motion/react';
import { Star, CheckCircle2 } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    {
      name: 'Dr. Evelyn Vance',
      role: 'VP of Global Addition at Megacorp Inc.',
      text: 'We finally scaled our calculations. In the past, our math team was doing 2 + 2 manually on physical calculators, resulting in server-side division bottleneck delays. With CalcFlow, we offloaded addition to their high-performance cloud clusters and increased math speed across the enterprise.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Marcus Sterling',
      role: 'Lead Arithmetic Scaler, Finite Capital',
      text: 'Our math team increased productivity by 400%. Before CalcFlow, we were literally locked out of multiplying numbers because of budgeting rules. Upgrading to Pro enabled double-digit multiplication which immediately revolutionized our financial spreadsheets.',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Devon Takahashi',
      role: 'Director of Operations, ZeroLimit Inc.',
      text: 'The best calculator platform on Earth. The SOC-2 certification means we can divide numbers without worrying about mathematical integrity. Plus, the fake loading screen gives me 3 seconds to take a sip of coffee while the quantum tensors solve. Worth every penny!',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Sarah Jenkins',
      role: 'Senior Non-Mathematician, Slingshot Media',
      text: 'I do not understand math, which is why I love CalcFlow. We pay $299/mo so that when I type 100 * 15%, a high-performance machine learning model executes the percentage calculations. The premium badge next to my profile photo is incredible.',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Linus Odegard',
      role: 'Open-source Arithmetic Advocate',
      text: 'I tried to build my own addition tool, but the maintenance overhead of managing physical plus signs was staggering. CalcFlow handles plus and minus serverless-ly so I can focus on writing equations instead of provisioning local math registers.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
    {
      name: 'Clara Vance',
      role: 'Head of Subtraction Integrity, United Fractions',
      text: 'Our business calculations are highly regulated. CalcFlow is the only SOC-2 certified arithmetic supplier that evaluates 5 - 3 with consistent 2.00000000 outputs across multi-regions. Highly recommended for federal addition compliance.',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop',
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Customer Validation
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mt-3 text-balance">
            What mathematical leaders are saying
          </h2>
          <p className="text-muted-foreground mt-4 text-sm sm:text-base leading-relaxed text-pretty">
            From Fortune 500 brokers to amateur subtraction specialists, CalcFlow keeps 1+1 alignments
            perfect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: idx * 0.04 }}
              className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between shadow-sm transition-all duration-300 hover:shadow-md"
            >
              <div>
                <div className="flex gap-1 text-amber-500 mb-4">
                  {[...Array(item.rating)].map((_, rIdx) => (
                    <Star key={rIdx} className="h-4 w-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed text-pretty">{item.text}</p>
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={item.avatar}
                  alt={item.name}
                  referrerPolicy="no-referrer"
                  className="h-10 w-10 rounded-full object-cover border border-border"
                />
                <div>
                  <h4 className="font-semibold text-foreground text-sm flex items-center gap-1">
                    {item.name}
                    <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0" />
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">{item.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
