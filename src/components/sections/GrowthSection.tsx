import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { DashboardVisual } from '../DashboardVisual';
import { TrendingUp, Check } from 'lucide-react';

export const GrowthSection: React.FC = () => {
  const GROWTH_DRIVERS = [
    "Consistent Content",
    "Faster Conversations",
    "Premium Offers",
    "Direct Sales",
    "Product Bundles",
    "Returning Buyers"
  ];

  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="section-12"
      className="landing-section bg-[#080F0A] px-4 sm:px-6 lg:px-8"
      aria-label="Growth Potential"
    >
      <div ref={ref} className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="max-w-3xl space-y-3"
        >
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
            <span className="h-px w-8 bg-white/20" />
            <TrendingUp className="w-3 h-3" />
            <span>Your Growth Path</span>
            <span className="h-px w-8 bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-[1.1] pb-1 overflow-visible">
            A Business That Works <span className="text-[#63DCA8] inline-block">While You Sleep</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Create the content, conversation and sales systems needed to pursue ambitious growth.
          </p>

          {/* 6 Compact Growth Drivers */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {GROWTH_DRIVERS.map((driver, idx) => (
              <motion.span
                key={idx}
                initial={reduced ? false : { opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.35, delay: 0.1 + idx * 0.05, ease }}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-[#63DCA8]" />
                <span>{driver}</span>
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Dashboard Visual */}
        <DashboardVisual />

        {/* Highlight Statement */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease }}
          className="p-4 rounded-2xl bg-[#101C14] border border-white/10 text-sm sm:text-base font-bold font-display text-white max-w-lg"
        >
          "Build a business that can grow beyond your personal working hours."
        </motion.div>
      </div>
    </section>
  );
};
