import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React from 'react';
import { FAQAccordion } from '../BriefAdditions';
import { ASSET_SLOTS } from '../../data/content';
import { ApplicationForm } from '../ApplicationForm';
import { Sparkles, MessageSquare, ShoppingBag, Users, Globe, ArrowUpRight } from 'lucide-react';

interface FinalApplicationSectionProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

export const FinalApplicationSection: React.FC<FinalApplicationSectionProps> = ({
  onOpenModal,
  onSuccessReturn
}) => {
  useLanguage();

  const scrollToForm = () => {
    const input = document.getElementById('first-name-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="section-13"
      className="landing-section bg-[#080808] px-4 sm:px-6 lg:px-8"
      aria-label={t("Bewerbung für die Katharina Academy")}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img loading="lazy"
          src={ASSET_SLOTS.finalCommunity.src}
          alt={t(ASSET_SLOTS.finalCommunity.alt)}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/90 to-[#080808]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Final Pitch, Three Pillars, Secondary Benefits & Buttons */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("DEIN NÄCHSTER SCHRITT")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Bereit, nicht mehr ")}<br />
            <span className="text-[#20C997] inline-block">{t("alles allein zu machen?")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">{t(" Bewirb dich für die Katharina Academy und erfahre, welcher Weg zu deinem aktuellen Creator-Business passt. ")}</p>

          {/* Three Primary Pillars Displayed Again */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">{t(" DIE DREI SÄULEN: ")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <MessageSquare className="w-4 h-4 text-[#20C997] shrink-0" />
                <span>{t("AI Chat Support")}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-[#20C997] shrink-0" />
                <span>{t("AI Content Creation")}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <ShoppingBag className="w-4 h-4 text-[#20C997] shrink-0" />
                <span>{t("Creator CRM & Direct Sales")}</span>
              </div>
            </div>
          </div>

          {/* Two Secondary Benefits */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">{t(" DEINE MÖGLICHKEITEN: ")}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-[#D7BE8A] shrink-0" />
                <span>{t("Academy und Coaching")}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-white/80">
                <Globe className="w-4 h-4 text-[#D7BE8A] shrink-0" />
                <span>{t("internationale Möglichkeiten")}</span>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <AnimatedButton animateArrow
              onClick={scrollToForm}
              className="px-6 py-3.5 rounded-full bg-[#20C997] hover:bg-[#169B74] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-[#20C997]/25 active:scale-95 transition-all"
            >
              <span>{t("Jetzt für die Academy bewerben")}</span>
              
            </AnimatedButton>

            <AnimatedButton
              onClick={scrollToForm}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              <span>{t("Jetzt bewerben")}</span>
            </AnimatedButton>
          </div>

          <p className="text-xs text-white/60">{t("Technology powered by SnapSell")}</p>
          {/* Final Line */}
          <p className="text-sm font-semibold font-display text-white/90 pt-2">{t(" Deine Persönlichkeit ist die Marke. Katharina zeigt dir, wie daraus ein Business wird. ")}</p>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <ApplicationForm
            onOpenModal={onOpenModal}
            onSuccessReturn={onSuccessReturn}
          />
        </div>
      </div>
      <FAQAccordion />
    </section>
  );
};
