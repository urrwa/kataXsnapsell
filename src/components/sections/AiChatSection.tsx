import { AnimatedLink } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React from 'react';
import { InteractiveChatMockup } from '../InteractiveChatMockup';
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const AiChatSection: React.FC = () => {
  useLanguage();

  const BENEFIT_CHIPS = [
    "beantwortet häufige Fragen",
    "erkennt Interessen",
    "empfiehlt passende Angebote",
    "sendet SnapSell-Links",
    "übernimmt Follow-ups",
    "übergibt wichtige Chats an dein Team"
  ];

  return (
    <section
      id="section-5"
      className="landing-section bg-[#080808] px-4 sm:px-6 lg:px-8"
      aria-label={t("Pillar 01: AI Chat Support")}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Copy & Animated Benefit Chips */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{t("SÄULE 01")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Bleibe erreichbar – ")}<br />
            <span className="text-[#20C997] inline-block">{t("ohne den ganzen Tag zu chatten.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">{t(" Dein AI Chat Support hilft dir bei wiederkehrenden Gesprächen. ")}</p>

          {/* 6 Benefit Chips */}
          <div className="space-y-2 pt-2">
            <div className="text-xs uppercase tracking-wider text-white/40 font-semibold">{t(" DEINE UNTERSTÜTZUNG: ")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {t(BENEFIT_CHIPS.map((chip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141416] border border-white/5 hover:border-[#20C997]/30 transition-colors text-xs text-white/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#20C997] shrink-0" />
                  <span>{t(chip)}</span>
                </div>
              )))}
            </div>
          </div>

          <p className="text-sm text-white/70">{t("Du bestimmst deine Sprache, deine Angebote und deine persönlichen Grenzen.")}</p>
          <AnimatedLink href="#chat-demo" className="inline-flex px-5 py-3 rounded-full border border-[#20C997]/40 text-[#20C997] text-sm">{t("AI Chat entdecken")}</AnimatedLink>
          {/* Main Benefit Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171618] to-[#201822] border-l-4 border-[#20C997] border-y border-r border-white/10 text-left">
            <div className="text-[11px] uppercase tracking-wider text-[#20C997] font-bold">{t("DEIN VORTEIL")}</div>
            <div className="text-base sm:text-lg font-bold font-display text-white mt-0.5">{t(" Mehr Gespräche. Weniger manuelle Arbeit. ")}</div>
          </div>
        </div>

        {/* Right Column: Dominant Smartphone Chat Mockup */}
        <div id="chat-demo" className="lg:col-span-6 flex justify-center items-center scroll-mt-28">
          <InteractiveChatMockup />
        </div>
      </div>
    </section>
  );
};
