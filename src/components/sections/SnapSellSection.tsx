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

      </div>
    </section>
  );
};
