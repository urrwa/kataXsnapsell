import { t, useLanguage } from '../../i18n';
import React, { useEffect, useRef } from 'react';
import { AnimatedButton } from '../AnimatedButton';
import '../../snapsell.css';

interface SnapSellSectionProps {
  onDiscoverSnapSell: () => void;
}

export const SnapSellSection: React.FC<SnapSellSectionProps> = ({ onDiscoverSnapSell }) => {
  useLanguage();
  const orbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const orb = orbRef.current;
    if (!orb) return;
    const handleMove = (e: MouseEvent) => {
      const rect = orb.parentElement!.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 30;
      orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <section id="section-7" className="ss-section" aria-label={t('SnapSell')}>
      {/* Animated background orb */}
      <div className="ss-orb-wrap" aria-hidden="true">
        <div ref={orbRef} className="ss-orb" />
      </div>

      {/* Floating pill badge */}
      <div className="ss-badge">{t('PILLAR 03')}</div>

      {/* Main headline — words animate in one by one */}
      <h2 className="ss-headline">
        <span className="ss-word ss-word-1">{t('Snap.')}</span>
        <span className="ss-word ss-word-2">{t('Sell.')}</span>
        <span className="ss-word ss-word-3 ss-word-mint">{t('Done.')}</span>
      </h2>

      <p className="ss-sub">{t('Content hochladen. Preis setzen. Payment-Link teilen.')}</p>

      {/* Animated flow line */}
      <div className="ss-flow" aria-hidden="true">
        <span className="ss-dot ss-dot-1" />
        <span className="ss-line" />
        <span className="ss-dot ss-dot-2" />
        <span className="ss-line" />
        <span className="ss-dot ss-dot-3" />
      </div>

      <AnimatedButton
        onClick={onDiscoverSnapSell}
        className="ss-cta"
      >
        {t('SnapSell entdecken')}
      </AnimatedButton>
    </section>
  );
};
