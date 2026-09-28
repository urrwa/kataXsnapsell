import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { TrendingUp, Sparkles, MessageSquare, ShoppingBag, Users, AlertCircle } from 'lucide-react';

const BAR_HEIGHTS = [20, 28, 35, 42, 50, 58, 64, 75, 82, 92, 100];

const METRIC_CARDS = [
  {
    label: 'Content Output',
    icon: Sparkles,
    iconColor: 'text-[#63DCA8]',
    value: '60+ assets',
    sub: '↑ 4.2x capacity',
    subNote: 'via AI workflow',
  },
  {
    label: 'Automated Chats',
    icon: MessageSquare,
    iconColor: 'text-[#AFD9BF]',
    value: '24/7 active',
    sub: '100% reply rate',
    subNote: '< 30s',
  },
  {
    label: 'SnapSell Orders',
    icon: ShoppingBag,
    iconColor: 'text-[#63DCA8]',
    value: 'Direct Checkout',
    sub: '1-Click access',
    subNote: 'zero friction',
  },
  {
    label: 'Returning Buyers',
    icon: Users,
    iconColor: 'text-[#AFD9BF]',
    value: 'Repeat LTV',
    sub: 'Nurtured leads',
    subNote: 'recurring drops',
  },
];

export const DashboardVisual: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const reduced = useReducedMotion();

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={ref} className="w-full max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 32 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
        className="w-full bg-[#111012] border border-white/10 rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#63DCA8]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Dashboard Top Bar */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 mb-6 gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#63DCA8] to-[#20B777] flex items-center justify-center text-white font-bold shadow-md">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white font-display flex items-center gap-2">
                <span>Creator Operations Hub</span>
                <motion.span
                  initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35, ease }}
                  className="text-[10px] bg-emerald-500/20 text-emerald-400 font-mono px-2 py-0.5 rounded-full font-semibold"
                >
                  Systems Active
                </motion.span>
              </div>
              <div className="text-xs text-white/50">Simulated monthly trajectory model</div>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-white/50 uppercase tracking-widest font-mono">Aspirational Goal</div>
            <div className="text-2xl sm:text-3xl font-extrabold font-display text-white">
              <span className="text-[#63DCA8]">$20,000</span>
              <span className="text-white/40 text-sm font-normal"> / month target</span>
            </div>
          </div>
        </motion.div>

        {/* 4 Core Velocity Streams */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {METRIC_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.08, ease }}
                className="bg-[#142219] border border-white/5 rounded-2xl p-3.5 sm:p-4 text-left"
              >
                <div className="flex items-center justify-between text-white/50 mb-2">
                  <span className="text-[11px] font-medium">{card.label}</span>
                  <Icon className={`w-3.5 h-3.5 ${card.iconColor}`} />
                </div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-white">{card.value}</div>
                <div className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1 font-mono">
                  <span>{card.sub}</span>
                  <span className="text-white/40">{card.subNote}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Visual Growth Waveform Graphic */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55, ease }}
          className="p-4 rounded-2xl bg-black/50 border border-white/5 mb-4 text-left"
        >
          <div className="flex items-center justify-between mb-3 text-xs">
            <span className="text-white/70 font-semibold">Creator Leverage Over Time</span>
            <span className="text-[#63DCA8] text-[11px] font-mono">Decoupling Revenue From Working Hours</span>
          </div>
          <div className="h-20 w-full flex items-end gap-1.5 pt-2">
            {BAR_HEIGHTS.map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div
                  className="w-full rounded-t bg-gradient-to-t from-white/10 to-[#63DCA8]"
                  initial={{ height: 0 }}
                  animate={inView ? { height: `${h}%` } : { height: 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.6,
                    delay: reduced ? 0 : 0.6 + i * 0.04,
                    ease: [0.34, 1.2, 0.64, 1],
                  }}
                  style={{ minHeight: 0 }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-mono">
            <span>Month 1: System Onboarding</span>
            <span>Month 3: Automated Scaling</span>
            <span>Target: High-LTV Autonomy</span>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          id="income-target-disclaimer"
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.85, ease }}
          className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-[#AFD9BF] shrink-0 mt-0.5" />
          <div className="text-xs text-[#F8F6F7]/90 leading-relaxed">
            <strong className="text-[#AFD9BF] font-semibold">Mandatory Transparency Notice:</strong> $20,000 per month is an ambitious target, not guaranteed income. Results depend on your audience, offer, pricing, consistency and execution.
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
