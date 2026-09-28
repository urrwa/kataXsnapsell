import { SlideButton } from '../SlideButton';
import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, MessageSquare, Sparkles, ShoppingBag } from 'lucide-react';
import { HeroMediaStrip } from '../HeroMediaStrip';
import FaultyTerminal from '../FaultyTerminal';

interface HeroSectionProps {
  onJoin: () => void;
  onExplore: () => void;
  onScrollNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onJoin,
  onExplore,
  onScrollNext,
}) => {
  return (
    <section
      id="section-1"
      className="relative w-full flex flex-col items-center bg-[#050907] pb-6 sm:pb-8 overflow-hidden scroll-mt-24"
      aria-label="Kata x SnapSell Academy Hero"
    >
      <div className="relative w-full min-h-[100svh] flex flex-col items-center pt-36 sm:pt-40 lg:pt-44 pb-16" data-hero-first-screen>
      {/* Decorative shader sits behind the content and never captures clicks. */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <FaultyTerminal
          tint="#88db7e"
          scale={2.4}
          curvature={0.4}
          noiseAmp={0.6}
          timeScale={2.3}
          scanlineIntensity={0.3}
          digitSize={2.4}
          brightness={0.5}
          mouseStrength={1.1}
          mouseReact
          pageLoadAnimation
          dpr={1}
        />
        <div className="absolute inset-0 hero-terminal-shade" />
      </div>

      {/* TOP TEXT BLOCK: Centered with padding */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* 1. Small “KATA X SNAPSELL ACADEMY” pill centered above headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 sm:mb-7"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#63DCA8]" />
            <span>KATA X SNAPSELL ACADEMY</span>
          </div>
        </motion.div>

        {/* Centered two-line headline, following the reference alignment. */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-4xl mx-auto mb-3.5 sm:mb-4"
        >
          <h1 className="font-extrabold font-display text-white leading-[1.08] sm:leading-[1.04] text-[clamp(2.6rem,6vw,5.5rem)]">
            <span className="block text-white"><span className="inline-block">Build More.</span>{' '}<span className="inline-block">Work Less.</span></span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#63DCA8] via-[#8CE8BC] to-[#20B777]">
              Live Bigger.
            </span>
          </h1>
        </motion.div>

        {/* 3. Centered Supporting Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base lg:text-lg text-white/80 max-w-xl mx-auto leading-relaxed font-sans px-2"
        >
          Powered by AI. Built around you.
        </motion.p>
        {/* Primary actions stay directly beneath the hero copy. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mt-7 sm:mt-8"
        >
          <SlideButton
            id="hero-primary-join-btn"
            onClick={onJoin}
            className="px-8 py-3.5 sm:py-4 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-[#63DCA8]/25 hover:shadow-[#63DCA8]/40 active:scale-95 transition-all cursor-pointer"
          >
            <span>Join the Academy</span>
            <ArrowUpRight className="w-4 h-4" />
          </SlideButton>

          <button
            id="hero-secondary-works-btn"
            onClick={onExplore}
            className="px-8 py-3.5 sm:py-4 rounded-full bg-transparent hover:bg-white/5 text-white/80 hover:text-white font-semibold text-sm sm:text-base border border-white/15 hover:border-white/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
          >
            <span>See How It Works</span>
          </button>
        </motion.div>

      </div>

      </div>

      {/* Carousel and features begin after the full-height opening screen. */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
        className="w-full pt-8 sm:pt-12 mb-6 sm:mb-8 overflow-hidden relative z-10"
        data-hero-below-fold
      >
        <HeroMediaStrip />
      </motion.div>

      {/* BOTTOM ACTION & BENEFITS BLOCK: Centered with padding */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        {/* 6. Existing Three Feature Benefits in one centered row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.46, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-7 pt-3 border-t border-white/10 max-w-2xl mx-auto text-xs text-white/90"
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#63DCA8]/20 text-[#63DCA8] flex items-center justify-center shrink-0">
              <MessageSquare className="w-3 h-3" />
            </div>
            <span className="font-semibold tracking-wide">AI Chat Support</span>
          </div>

          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#63DCA8]/20 text-[#63DCA8] flex items-center justify-center shrink-0">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-semibold tracking-wide">AI Content Creation</span>
          </div>

          <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-white/20" />

          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-[#63DCA8]/20 text-[#63DCA8] flex items-center justify-center shrink-0">
              <ShoppingBag className="w-3 h-3" />
            </div>
            <span className="font-semibold tracking-wide">Direct Sales With SnapSell</span>
          </div>
        </motion.div>

        {/* 7. Bottom “Discover the System” indicator with bounce */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="mt-5 sm:mt-6"
        >
          <SlideButton onClick={onScrollNext} className="px-5 py-3 rounded-full text-xs font-semibold">
            <span>Discover the system</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </SlideButton>
        </motion.div>
      </div>
    </section>
  );
};
