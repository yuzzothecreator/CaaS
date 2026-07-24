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
      a: 'Multiplication is a premium computational feature that relies on advanced double-digit scaling processors. In order to handle factors cleanly without local processor overheating, multiplication requires a minimum of a Pro Subscription ($9/mo).',
    },
    {
      q: 'Can I divide?',
      a: 'Division requires significant fraction management, modular division offsets, and floating point sandboxing. Therefore, division operations are strictly locked to our Business Plan ($29/mo) and higher. This prevents casual division from destabilizing integer queues.',
    },
    {
      q: 'Does it use AI?',
      a: 'Absolutely. We mention AI in almost every single sentence. Our LLM-powered neural layers predict exactly what numbers you are going to add next, preparing them on safe serverless cache clusters before you even click. Plus, we use fancy terminal loading text to prove it is smart.',
    },
    {
      q: 'What happens if I divide by zero?',
      a: 'On other primitive calculators, dividing by zero crashes your operating system or returns a confusing error. On CalcFlow, our Business Plan routes zero errors into isolated docker containers located on offshore servers, safeguarding your local network from arithmetic collapse.',
    },
    {
      q: 'How secure is my arithmetic?',
      a: 'Every digit you enter is processed using military-grade mathematical matrices and quantum-resistant addition pathways. We make sure that unauthorized third parties cannot spy on your formulas (e.g. figuring out that 1 + 1 is indeed 2).',
    },
    {
      q: 'Can I export my calculations to Microsoft Excel?',
      a: 'Excel export requires our Enterprise License ($299/mo). When exported, your operations are packaged as advanced crypto-signed spreadsheets with 99.9% checksum security, allowing you to present verified sums to stakeholders.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-secondary/30 border-t border-border relative">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground mt-3 text-sm sm:text-base text-pretty">
            Everything you need to know about premium arithmetic packages and the number cloud.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm transition-all"
                id={`faq-item-${idx}`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left text-foreground font-semibold text-sm hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-5 pb-5 text-muted-foreground text-sm leading-relaxed border-t border-border pt-4 text-pretty">
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
