import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const faqs: FAQItem[] = [
    {
      q: "Why can't I multiply?",
      a: "Multiplication is a premium computational feature that relies on advanced double-digit scaling processors. In order to handle factors cleanly without local processor overheating, multiplication requires a minimum of a Pro Subscription ($9/mo)."
    },
    {
      q: "Can I divide?",
      a: "Division requires significant fraction management, modular division offsets, and floating point sandboxing. Therefore, division operations are strictly locked to our Business Plan ($29/mo) and higher. This prevents casual division from destabilizing integer queues."
    },
    {
      q: "Does it use AI?",
      a: "Absolutely. We mention AI in almost every single sentence. Our LLM-powered neural layers predict exactly what numbers you are going to add next, preparing them on safe serverless cache clusters before you even click. Plus, we use fancy terminal loading text to prove it's smart."
    },
    {
      q: "What happens if I divide by zero?",
      a: "On other primitive calculators, dividing by zero crashes your operating system or returns a confusing error. On CalcFlow, our Business Plan routes zero errors into isolated docker containers located on offshore servers, safeguarding your local network from arithmetic collapse."
    },
    {
      q: "How secure is my arithmetic?",
      a: "Every digit you enter is processed using military-grade mathematical matrices and quantum-resistant addition pathways. We make sure that unauthorized third parties cannot spy on your formulas (e.g. figuring out that 1 + 1 is indeed 2)."
    },
    {
      q: "Can I export my calculations to Microsoft Excel?",
      a: "Excel export requires our Enterprise License ($299/mo). When exported, your operations are packaged as advanced crypto-signed spreadsheets with 99.9% checksum security, allowing you to present verified sums to stakeholders."
    }
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-slate-900/60 border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -z-10 h-96 w-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <HelpCircle className="h-8 w-8 text-indigo-400 mx-auto animate-pulse" />
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white mt-4 sm:text-4xl">
            Mathematical Frequently Asked Questions
          </h2>
          <p className="text-slate-400 mt-3 text-xs sm:text-sm">
            Everything you need to know about premium arithmetic packages and serverless number cloud.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-white/5 bg-slate-950/40 overflow-hidden transition-all"
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-white font-semibold text-xs sm:text-sm hover:bg-white/[0.02] transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-indigo-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-500" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-5 pt-0 text-slate-400 text-xs leading-relaxed border-t border-white/5 bg-slate-950/20">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
