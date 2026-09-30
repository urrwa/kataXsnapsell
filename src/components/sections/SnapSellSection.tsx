import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useEffect, useRef } from 'react';
import { ShoppingBag } from 'lucide-react';
import { SnapSellDashboardMockup } from '../SnapSellDashboardMockup';
import '../../snapsell-section.css';

interface SnapSellSectionProps {
  onDiscoverSnapSell: () => void;
}

const LEFT_FEATURES = [
  {
    num: '01',
    title: 'Direkt verkaufen',
    desc: 'Content hochladen, Preis festlegen, Link teilen – fertig.',
  },
  {
    num: '02',
    title: 'Käufer verwalten',
    desc: 'Alle Kontakte, Notizen und Gespräche an einem Ort.',
  },
];

const RIGHT_FEATURES = [
  {
    num: '03',
    title: 'Sales-Pipeline',
    desc: 'Von Interesse bis Kauf – jeder Schritt im Blick.',
  },
  {
    num: '04',
    title: 'Analysen & Einblicke',
    desc: 'Verkäufe, Reichweite und Performance auf einen Blick.',
  },
];

export const SnapSellSection: React.FC<SnapSellSectionProps> = ({ onDiscoverSnapSell }) => {
  useLanguage();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll('.ss-reveal, .ss-mockup-reveal');
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('ss-visible'); }),
      { threshold: 0.12 }
    );
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="section-7"
      className="ss-section"
      aria-label={t("Pillar 03: SnapSell Direct Sales")}
    >
      {/* Grid pattern bg */}
      <div className="ss-grid-bg" aria-hidden="true" />

      <div className="ss-inner">
        {/* Badge */}
        <div className="ss-badge ss-reveal" data-delay="1">
          <ShoppingBag className="ss-badge-icon" />
          <span>{t("SÄULE 03 · SNAPSELL")}</span>
        </div>

        {/* Headline */}
        <h2 className="ss-headline ss-reveal" data-delay="2">
          {t("Mehr als ein")}{' '}
          <span className="ss-headline-accent">{t("Payment-Link.")}</span>
          <br />
          <span className="ss-headline-sub">{t("Dein gesamtes Business. Ein System.")}</span>
        </h2>

        {/* Three-column layout */}
        <div className="ss-layout">
          {/* Left features */}
          <div className="ss-features ss-features--left">
            {LEFT_FEATURES.map((f, i) => (
              <div className="ss-feature ss-reveal" data-delay={String(i + 2)} key={f.num}>
                <span className="ss-feature-num">{f.num}</span>
                <h3 className="ss-feature-title">{t(f.title)}</h3>
                <p className="ss-feature-desc">{t(f.desc)}</p>
              </div>
            ))}
          </div>

          {/* Central mockup */}
          <div className="ss-mockup-wrap ss-mockup-reveal">
            <SnapSellDashboardMockup />
          </div>

          {/* Right features */}
          <div className="ss-features ss-features--right">
            {RIGHT_FEATURES.map((f, i) => (
              <div className="ss-feature ss-reveal" data-delay={String(i + 3)} key={f.num}>
                <span className="ss-feature-num">{f.num}</span>
                <h3 className="ss-feature-title">{t(f.title)}</h3>
                <p className="ss-feature-desc">{t(f.desc)}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="ss-reveal" data-delay="5">
          <AnimatedButton
            animateArrow
            id="discover-snapsell-btn"
            onClick={onDiscoverSnapSell}
            className="ss-cta"
          >
            <span>{t("SnapSell Technologie entdecken")}</span>
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};
