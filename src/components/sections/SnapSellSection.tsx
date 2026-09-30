import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React from 'react';
import { SnapSellFlowMockup } from '../SnapSellFlowMockup';
import { ShoppingBag, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface SnapSellSectionProps {
  onDiscoverSnapSell: () => void;
}

export const SnapSellSection: React.FC<SnapSellSectionProps> = ({ onDiscoverSnapSell }) => {
  useLanguage();

  return (
    <section
      id="section-7"
      className="landing-section bg-[#080808] px-4 sm:px-6 lg:px-8"
      aria-label={t("Pillar 03: SnapSell Direct Sales")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{t("SÄULE 03")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Mehr als ein ")}<span className="text-[#20C997] inline-block">{t("Payment-Link.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">{t(" SnapSell verbindet dein gesamtes Creator-Business in einem System. ")}</p>
        </div>

        {/* Dominant 5-Step Connected Interface Mockup */}
        <p className="text-xs text-[#20C997]">{t("Powered by SnapSell Technology")}</p>
        <SnapSellFlowMockup />

        {/* Main Benefit & Button Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-2xl w-full p-4 rounded-2xl bg-[#141416] border border-white/10 text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-white font-display">{t("DEIN SYSTEM")}</div>
              <div className="text-xs text-white/70">{t("Deine Käufer. Deine Angebote. Dein System.")}</div>
            </div>
          </div>

          <AnimatedButton
            animateArrow id="discover-snapsell-btn"
            onClick={onDiscoverSnapSell}
            className="px-6 py-2.5 rounded-full bg-[#20C997] hover:bg-[#169B74] text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md shadow-[#20C997]/30 whitespace-nowrap active:scale-95"
          >
            <span>{t("SnapSell Technologie entdecken")}</span>
            
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};
