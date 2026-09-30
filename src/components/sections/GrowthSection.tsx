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

function AccordionItem({ item, isOpen, onOpen }: {
  item: typeof GROWTH_ITEMS[0];
  isOpen: boolean;
  onOpen: () => void;
}) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);

  // Animate height
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.style.maxHeight = isOpen ? el.scrollHeight + 'px' : '0px';
  }, [isOpen]);

  // Open on scroll into view (IntersectionObserver)
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onOpen(); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [onOpen]);

  return (
    <div
      ref={rowRef}
      className="border-t border-white/10 group/row cursor-pointer"
      onMouseEnter={onOpen}
    >
      {/* Row header */}
      <div className="w-full flex items-center justify-between gap-4 py-7 select-none">
        <div className="flex items-baseline gap-3 sm:gap-5 min-w-0">
          <span className="text-[11px] font-mono text-[#20C997] font-bold flex-shrink-0 tracking-widest">{item.num}</span>
          <span
            className="growth-title leading-none transition-colors duration-300"
            style={{ color: isOpen ? '#20C997' : '#fff' }}
          >
            {t(item.title)}
          </span>
          <span className="text-sm text-white/30 font-normal hidden sm:inline flex-shrink-0">{t(item.sub)}</span>
        </div>
        {/* Animated line indicator */}
        <span
          className="flex-shrink-0 w-6 h-6 relative"
          aria-hidden="true"
        >
          <span className="absolute inset-0 rounded-full border border-white/20 transition-all duration-300" style={{ borderColor: isOpen ? 'rgba(32,201,151,0.5)' : undefined }} />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-px bg-white/50 transition-all duration-300" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-3 bg-white/50 transition-all duration-300" style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? 'translate(-50%,-50%) scaleY(0)' : undefined }} />
        </span>
      </div>

      {/* Expandable body */}
      <div
        ref={bodyRef}
        style={{ maxHeight: '0px', overflow: 'hidden', transition: 'max-height 0.5s cubic-bezier(0.22,1,0.36,1)' }}
      >
        <div className="pb-8 flex flex-col sm:flex-row gap-6 items-start">
          <div
            className="sm:w-52 lg:w-60 flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ height: '170px', transition: 'transform 0.5s ease', transform: isOpen ? 'translateY(0)' : 'translateY(12px)' }}
          >
            <img src={item.img} alt="" className="w-full h-full object-cover object-top" loading="lazy" />
          </div>
          <div className="flex flex-wrap gap-2 content-start pt-1">
            {item.bullets.map((b, i) => (
              <span
                key={b}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/70"
                style={{ transitionDelay: `${i * 40}ms`, opacity: isOpen ? 1 : 0, transform: isOpen ? 'translateY(0)' : 'translateY(6px)', transition: 'opacity 0.4s ease, transform 0.4s ease' }}
              >
                {t(b)}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .growth-title {
          font-family: 'Syne', 'Inter', sans-serif;
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap');
      `}</style>
    </div>
  );
}

export const GrowthSection: React.FC = () => {
  useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="section-12"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Growth Potential")}
    >
      {/* Load Syne font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&display=swap" />

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
              onOpen={() => setOpenIndex(i)}
            />
          ))}
          <div className="border-t border-white/10" />
        </div>

        <ApplyButton>{t("Mein Wachstumspotenzial prüfen")}</ApplyButton>
      </div>
    </section>
  );
};
