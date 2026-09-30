import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ApplyButton } from '../BriefAdditions';

const GROWTH_CARDS = [
  {
    title: 'Content & Reichweite',
    bullets: ['Content-Plan', 'KI-Erstellung', 'Plattform-Optimierung'],
    img: '/client-assets/hero/hero-poster-2.png',
  },
  {
    title: 'Direkte Verkäufe',
    bullets: ['Digitale Produkte', 'Sofortige Zahlungen', 'Bundles & Upsells'],
    img: '/client-assets/hero/hero-poster-3.png',
  },
  {
    title: 'Käuferbindung',
    bullets: ['CRM & Follow-ups', 'Stammkunden', 'Community'],
    img: '/client-assets/hero/hero-poster.png',
  },
];

export const GrowthSection: React.FC = () => {
  useLanguage();

  return (
    <section
      id="section-12"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Growth Potential")}
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center space-y-10">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl">
          <p className="text-xs uppercase tracking-widest font-bold text-[#20C997]">{t("DEIN NÄCHSTES LEVEL")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15]">
            {t("Baue deinen Weg ")}<span className="text-[#20C997]">{t("zu $20K-Monaten.")}</span>
          </h2>
          <p className="text-[10px] text-white/30 leading-relaxed">{t("$20.000/Monat ist ein ambitioniertes Ziel, kein garantiertes Einkommen. Ergebnisse hängen von Reichweite, Angebot und Umsetzung ab.")}</p>
        </div>

        {/* Large cards */}
        <div className="w-full flex flex-col gap-3">
          {GROWTH_CARDS.map(({ title, bullets, img }) => (
            <div
              key={title}
              className="w-full rounded-2xl border border-white/8 bg-[#111013] overflow-hidden flex flex-col sm:flex-row"
              style={{ minHeight: '180px' }}
            >
              {/* Text side */}
              <div className="flex-1 p-7 flex flex-col justify-center gap-3">
                <h3 className="text-2xl font-bold text-white">{t(title)}</h3>
                <ul className="flex flex-wrap gap-2">
                  {bullets.map(b => (
                    <li key={b} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/75">
                      {t(b)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo side */}
              <div className="sm:w-56 lg:w-72 flex-shrink-0 relative overflow-hidden" style={{ minHeight: '180px' }}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover object-center absolute inset-0"
                  loading="lazy"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #111013 0%, transparent 40%)' }} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <ApplyButton>{t("Mein Wachstumspotenzial prüfen")}</ApplyButton>
      </div>
    </section>
  );
};
