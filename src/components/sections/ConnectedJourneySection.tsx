import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ConnectedJourneyFlow } from '../ConnectedJourneyFlow';
import { Layers } from 'lucide-react';

export const ConnectedJourneySection: React.FC = () => {
  useLanguage();

  return (
    <section
      id="section-8"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("How It Works: Connected Journey")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Layers className="w-3.5 h-3.5" />
            <span>{t("SO FUNKTIONIERT ES")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Von Content ")}<span className="text-[#20C997] inline-block">{t("zu Zahlung.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">{t(" Weniger einzelne Tools. Weniger verlorene Kontakte. Mehr Struktur. ")}</p>
        </div>

        {/* Connected Interactive Journey Visual */}
        <ConnectedJourneyFlow />
      </div>
    </section>
  );
};
