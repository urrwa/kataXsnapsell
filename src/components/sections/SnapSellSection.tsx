import { SlideButton } from '../SlideButton';
import React from 'react';
import { SnapSellFlowMockup } from '../SnapSellFlowMockup';
import { ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SnapSellSectionProps {
  onDiscoverSnapSell: () => void;
}

export const SnapSellSection: React.FC<SnapSellSectionProps> = ({ onDiscoverSnapSell }) => {
  return (
    <section
      id="section-7"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Pillar 03: SnapSell Direct Sales"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>PILLAR 03</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            Your Content. Your Price. <span className="text-[#63DCA8] inline-block">One Link.</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Package your digital content and connect it directly with your buyers.
          </p>
        </div>

        {/* Dominant 5-Step Connected Interface Mockup */}
        <SnapSellFlowMockup />

        {/* Main Benefit & Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl w-full p-4 rounded-2xl bg-[#101C14] border border-white/10 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-display">Main Benefit</div>
              <div className="text-xs text-white/70">“A simple journey from interest to purchase.”</div>
            </div>
          </div>

          <SlideButton
            id="discover-snapsell-btn"
            onClick={onDiscoverSnapSell}
            className="px-6 py-2.5 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-[#63DCA8]/30 whitespace-nowrap active:scale-95"
          >
            <span>Discover SnapSell</span>
            <ArrowUpRight className="w-4 h-4" />
          </SlideButton>
        </div>
      </div>
    </section>
  );
};
