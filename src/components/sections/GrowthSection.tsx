import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ApplyButton } from '../BriefAdditions';

const GROWTH_CARDS = [
  {
    title: 'Content & Reichweite',
    text: 'Plane, erstelle und veröffentliche regelmäßig Premium-Content, der deine Zielgruppe wirklich erreicht.',
    bullets: ['Wöchentlicher Content-Plan', 'KI-gestützte Erstellung', 'Plattform-Optimierung'],
    img: '/client-assets/hero/hero-poster-2.png',
  },
  {
    title: 'Direkte Verkäufe',
    text: 'Digitale Angebote, Payment-Links und Bundles – du verkaufst direkt ohne Umwege.',
    bullets: ['Klare Produktstruktur', 'Sofortige Zahlungen', 'Upsells & Bundles'],
    img: '/client-assets/hero/hero-poster-3.png',
  },
  {
    title: 'Käuferbindung & Wachstum',
    text: 'Baue langfristige Beziehungen auf und verwandle einmalige Käufer in treue Stammkunden.',
    bullets: ['CRM & Follow-ups', 'Wiederkehrende Käufer', 'Community-Aufbau'],
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
        <div className="w-full flex flex-col gap-4">
          {GROWTH_CARDS.map(({ title, text, bullets, img }) => (
            <div
              key={title}
              className="w-full rounded-2xl border border-white/8 bg-[#111013] overflow-hidden flex flex-col sm:flex-row"
              style={{ minHeight: '220px' }}
            >
              {/* Text side */}
              <div className="flex-1 p-7 sm:p-9 flex flex-col justify-center gap-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{t(title)}</h3>
                  <p className="text-sm text-white/60 leading-relaxed">{t(text)}</p>
                </div>
                <ul className="flex flex-col gap-1.5">
                  {bullets.map(b => (
                    <li key={b} className="text-sm text-white/80 flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[#20C997] flex-shrink-0" />
                      {t(b)}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Photo side */}
              <div className="sm:w-64 lg:w-80 flex-shrink-0 relative overflow-hidden" style={{ minHeight: '200px' }}>
                <img
                  src={img}
                  alt=""
                  className="w-full h-full object-cover object-center absolute inset-0"
                  loading="lazy"
                />
                {/* subtle left fade into card bg */}
                <div className="absolute inset-0" style={{ background: 'linear-gradient(90deg, #111013 0%, transparent 35%)' }} aria-hidden="true" />
              </div>
            </div>
          ))}
        </div>

        <ApplyButton>{t("Mein Wachstumspotenzial prüfen")}</ApplyButton>
      </div>
    </section>
  );
};
