import { AnimatedLink } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ContentBranchingVisual } from '../ContentBranchingVisual';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

export const AiContentSection: React.FC = () => {
  useLanguage();

  const OUTPUT_LABELS = [
    "realistische AI-Fotos",
    "kurze Videos und Reels",
    "Talking Videos",
    "Lifestyle- und Travel-Content",
    "Skripte und Captions",
    "mehrsprachige Inhalte"
  ];

  return (
    <section
      id="section-6"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Pillar 02: AI Content Creation")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("SÄULE 02")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1">{t(" Mehr Content. ")}<span className="text-[#20C997] inline-block">{t("Weniger tägliche Produktion.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">{t(" Aus deinem freigegebenen Stil können verschiedene Inhalte entstehen. ")}</p>

          {/* 6 Output Labels Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {t(OUTPUT_LABELS.map((label, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-1.5"
              >
                <Check className="w-3 h-3 text-[#20C997]" />
                <span>{t(label)}</span>
              </span>
            )))}
          </div>
        </div>

        {/* Dominant Visual: Center Creator Identity Branching */}
        <div id="content-demo" className="w-full scroll-mt-28"><ContentBranchingVisual /></div>
        <AnimatedLink href="#content-demo" className="px-5 py-3 rounded-full border border-[#20C997]/40 text-[#20C997] text-sm">{t("Content-System ansehen")}</AnimatedLink>

        {/* Trust Line & Main Benefit Banner */}
        <div className="max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#141416] border border-white/10 text-left">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white font-display">{t(" Ein Konzept. Viele Content-Formate. ")}</div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>{t("Du behältst die Kontrolle über dein Aussehen, deine Stimme, deine Themen und jede finale Freigabe.")}</span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold bg-[#20C997]/10 text-[#20C997] px-2.5 py-1 rounded-full whitespace-nowrap">{t(" DEINE FREIGABE ")}</span>
        </div>
      </div>
    </section>
  );
};
