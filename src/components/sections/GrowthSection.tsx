import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ApplyButton } from '../BriefAdditions';
import { DashboardVisual } from '../DashboardVisual';

export const GrowthSection: React.FC = () => {
  useLanguage();

  const GROWTH_DRIVERS = [
    "regelmäßiger Premium-Content",
    "schnellere Käuferkommunikation",
    "klare digitale Angebote",
    "direkte Verkäufe",
    "Produkt-Bundles und Upsells",
    "wiederkehrende Käufer"
  ];

  return (
    <section
      id="section-12"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Growth Potential")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <span>{t("DEIN NÄCHSTES LEVEL")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Baue deinen Weg ")}<span className="text-[#20C997] inline-block">{t("zu $20K-Monaten.")}</span>
          </h2>
          {/* 6 Compact Growth Drivers */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {t(GROWTH_DRIVERS.map((driver, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/85"
              >
                {t(driver)}
              </span>
            )))}
          </div>
          <p className="text-[10px] text-white/30 max-w-md mx-auto leading-relaxed">{t("$20.000/Monat ist ein ambitioniertes Ziel, kein garantiertes Einkommen. Ergebnisse hängen von Reichweite, Angebot und Umsetzung ab.")}</p>
        </div>

        {/* Dominant Creator Business Dashboard Visual with Visible Income Target Disclaimer */}
        <DashboardVisual />

        <ApplyButton>{t("Mein Wachstumspotenzial prüfen")}</ApplyButton>
      </div>
    </section>
  );
};
