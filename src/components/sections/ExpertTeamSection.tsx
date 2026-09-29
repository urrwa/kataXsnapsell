import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ApplyButton } from '../BriefAdditions';
import { ASSET_SLOTS } from '../../data/content';
import { Users, CheckCircle2, Sparkles } from 'lucide-react';

export const ExpertTeamSection: React.FC = () => {
  useLanguage();

  const TEAM_ROLES = [
    { title: "Content-Produktion", desc: "Konzept, Fotografie und Video" },
    { title: "Kanalmanagement", desc: "Social-Media-Strategie und Planung" },
    { title: "AI Chat Einrichtung", desc: "Deine Sprache und persönliche Grenzen" },
    { title: "SnapSell CRM", desc: "Angebote, Preise und Follow-ups" },
    { title: "Wachstum", desc: "Deine Zielgruppe besser verstehen" },
    { title: "Partnerschaften", desc: "Passende Möglichkeiten prüfen" }
  ];

  return (
    <section
      id="section-10"
      className="landing-section bg-[#080808] px-4 sm:px-6 lg:px-8"
      aria-label={t("Das Expertenteam")}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Visual Production Team Setting with Floating Role Labels */}
        <div className="lg:col-span-6 relative flex justify-center items-center">
          <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black">
            <img loading="lazy"
              src={ASSET_SLOTS.teamLineup.src}
              alt={t(ASSET_SLOTS.teamLineup.alt)}
              referrerPolicy="no-referrer"
              className="w-full h-[460px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

            {/* Floating Role Label 1: AI Specialist */}
            <div className="absolute top-6 left-4 p-2.5 rounded-xl bg-[#141416]/90 backdrop-blur-md border border-[#20C997]/40 shadow-lg text-left">
              <span className="text-[10px] text-[#20C997] font-mono font-bold block">{t("AI-SPEZIALIST")}</span>
              <span className="text-xs font-bold text-white">{t("AI Chat und Content")}</span>
            </div>

            {/* Floating Role Label 2: Photographer & Director */}
            <div className="absolute top-20 right-4 p-2.5 rounded-xl bg-[#141416]/90 backdrop-blur-md border border-[#D7BE8A]/40 shadow-lg text-left">
              <span className="text-[10px] text-[#D7BE8A] font-mono font-bold block">{t("FOTOGRAF UND VIDEOGRAF")}</span>
              <span className="text-xs font-bold text-white">{t("Professionelle Produktion")}</span>
            </div>

            {/* Floating Role Label 3: Growth Strategist */}
            <div className="absolute bottom-20 left-4 p-2.5 rounded-xl bg-[#141416]/90 backdrop-blur-md border border-white/20 shadow-lg text-left">
              <span className="text-[10px] text-emerald-400 font-mono font-bold block">{t("GROWTH MANAGER")}</span>
              <span className="text-xs font-bold text-white">{t("Angebote und Käuferbindung")}</span>
            </div>

            {/* Bottom Overlay Pill */}
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/80 backdrop-blur-md border border-white/10 text-center">
              <span className="text-xs text-white/90 font-medium">{t(" Content-Strategin und Expertenteam · Unterstützung nach Programm. ")}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Role Labels */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Users className="w-3.5 h-3.5" />
            <span>{t("DU MUSST NICHT ALLES ALLEIN MACHEN")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Du bleibst das Gesicht. ")}<br />
            <span className="text-[#20C997] inline-block">{t("Wir unterstützen das Business.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">{t(" Abhängig von deinem Programm kann unser Team dich unterstützen bei: ")}</p>

          {/* 6 Visual Team Roles Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {t(TEAM_ROLES.map((role, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-[#141416] border border-white/5 hover:border-[#20C997]/30 transition-all text-left"
              >
                <div className="flex items-center gap-2 text-xs font-bold text-white mb-0.5">
                  <CheckCircle2 className="w-4 h-4 text-[#20C997] shrink-0" />
                  <span>{t(role.title)}</span>
                </div>
                <div className="text-[11px] text-white/50 pl-6 leading-normal">
                  {t(role.desc)}
                </div>
              </div>
            )))}
          </div>

          <ApplyButton>{t("Unterstützung anfragen")}</ApplyButton>
          {/* Main Benefit Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#171618] to-[#1F1822] border-l-4 border-[#20C997] border-y border-r border-white/10 text-left">
            <div className="text-[11px] uppercase tracking-wider text-[#20C997] font-bold">{t("Konzentriere dich auf deine Marke.")}</div>
            <div className="text-base sm:text-lg font-bold font-display text-white mt-0.5">{t(" Wir kümmern uns mit dir um das System dahinter. ")}</div>
          </div>
        </div>
      </div>
    </section>
  );
};
