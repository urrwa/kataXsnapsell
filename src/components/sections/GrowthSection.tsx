import { t, useLanguage } from '../../i18n';
import React, { useState, useRef, useEffect } from 'react';
import { ApplyButton } from '../BriefAdditions';

const GROWTH_ITEMS = [
  {
    num: '01',
    title: 'Content & Reichweite',
    sub: 'Sichtbarkeit',
    img: '/client-assets/hero/hero-poster-2.png',
    bullets: ['Content-Plan', 'KI-gestützte Erstellung', 'Plattform-Optimierung', 'Konsistente Präsenz'],
  },
  {
    num: '02',
    title: 'Direkte Verkäufe',
    sub: 'Umsatz',
    img: '/client-assets/hero/hero-poster-3.png',
    bullets: ['Digitale Produkte', 'Sofortige Zahlungen', 'Bundles & Upsells', 'Payment-Links'],
  },
  {
    num: '03',
    title: 'Käuferbindung',
    sub: 'Loyalität',
    img: '/client-assets/hero/hero-poster.png',
    bullets: ['CRM & Follow-ups', 'Stammkunden', 'Community-Aufbau', 'Wiederkehrende Einnahmen'],
  },
];

function AccordionItem({ item, isOpen, onToggle }: {
  item: typeof GROWTH_ITEMS[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.maxHeight = isOpen ? el.scrollHeight + 'px' : '0px';
  }, [isOpen]);

  return (
    <div className="border-t border-white/10">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <div className="flex items-baseline gap-4">
          <span className="text-xs font-mono text-[#20C997] font-bold flex-shrink-0">{item.num}</span>
          <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white group-hover:text-[#20C997] transition-colors leading-none">
            {t(item.title)}
          </span>
          <span className="text-sm text-white/35 font-normal hidden sm:inline">{t(item.sub)}</span>
        </div>
        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center flex-shrink-0 text-white/60 text-lg leading-none transition-transform" style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
          +
        </span>
      </button>

      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div className="pb-8 flex flex-col sm:flex-row gap-6">
          {/* Photo */}
          <div className="sm:w-48 lg:w-56 flex-shrink-0 rounded-2xl overflow-hidden" style={{ height: '160px' }}>
            <img src={item.img} alt="" className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
          {/* Bullets */}
          <div className="flex flex-wrap gap-2 content-start">
            {item.bullets.map(b => (
              <span key={b} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/75">
                {t(b)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const GrowthSection: React.FC = () => {
  useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="section-12"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Growth Potential")}
    >
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center space-y-10">
        {/* Header */}
        <div className="w-full space-y-2">
          <p className="text-xs uppercase tracking-widest font-bold text-[#20C997]">{t("DEIN NÄCHSTES LEVEL")}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15]">
            {t("Baue deinen Weg ")}<span className="text-[#20C997]">{t("zu $20K-Monaten.")}</span>
          </h2>
          <p className="text-[10px] text-white/25 leading-relaxed max-w-lg">{t("$20.000/Monat ist ein ambitioniertes Ziel, kein garantiertes Einkommen. Ergebnisse hängen von Reichweite, Angebot und Umsetzung ab.")}</p>
        </div>

        {/* Accordion */}
        <div className="w-full">
          {GROWTH_ITEMS.map((item, i) => (
            <AccordionItem
              key={item.num}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
          <div className="border-t border-white/10" />
        </div>

        <ApplyButton>{t("Mein Wachstumspotenzial prüfen")}</ApplyButton>
      </div>
    </section>
  );
};
