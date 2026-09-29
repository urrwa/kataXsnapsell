import { AnimatedButton } from '../AnimatedButton';
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, ArrowUpRight, CornerDownRight, Pause, Play } from 'lucide-react';
import { t, useLanguage } from '../../i18n';
import { HeroDashboardVideo } from '../HeroDashboardVideo';
import '../../reference-hero.css';

interface HeroSectionProps {
  onJoin: () => void;
  onExplore: () => void;
  onScrollNext: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onJoin, onExplore, onScrollNext }) => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.1 },
    transition: { duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="section-1" className="reference-hero" data-paused={paused || !!reducedMotion} aria-label={t('Katharina Academy – Start')}>
      <div className="hero-spotlight" aria-hidden="true" />
      <div className="reference-hero-inner">
        <div className="reference-hero-copy">
          <motion.p {...entrance(0.05)} className="hero-eyebrow"><span />{t('DEINE MARKE. DEINE REGELN.')}</motion.p>
          <motion.h1 {...entrance(0.14)}>
            {t('Build More.')}<br />{t('Work Less.')}<br />
            <span>{t('Live Bigger.')}</span>
          </motion.h1>
          <motion.p {...entrance(0.25)} className="hero-description">
            {t('Baue dein Creator-Business mit KI, direkten Verkäufen und einem professionellen Team auf.')}
          </motion.p>
          <motion.div {...entrance(0.35)} className="hero-actions">
            <AnimatedButton animateArrow id="hero-primary-join-btn" className="reference-primary" onClick={onJoin}>
              {t('Jetzt für die Academy bewerben')}
            </AnimatedButton>
            <AnimatedButton animateArrow id="hero-secondary-works-btn" className="reference-secondary" onClick={onExplore}>
              {t('Das System entdecken')}
            </AnimatedButton>
          </motion.div>
          <motion.p {...entrance(0.45)} className="hero-qualification">{t('Für ambitionierte Creatorinnen ab 18 Jahren.')}</motion.p>
        </div>
        <motion.div {...entrance(0.3)} className="hero-visual hero-visual-video">
          <HeroDashboardVideo paused={paused || !!reducedMotion} />
        </motion.div>
      </div>
      <motion.div {...entrance(0.6)} className="hero-bottom-bar">
        <AnimatedButton className="hero-scroll" onClick={onScrollNext} aria-label={t('Das System entdecken – zur nächsten Sektion')}>
          <span className="hero-scroll-icon"><ArrowDown size={15} /></span>{t('Mehr entdecken')}
        </AnimatedButton>
        <p>{t('Technology powered by SnapSell')}<span className="hero-partner-dot" /><strong>SnapSell<span>®</span></strong></p>
        {!reducedMotion && <AnimatedButton className="hero-motion-control" aria-pressed={paused} aria-label={t(paused ? 'Animationen abspielen' : 'Animationen pausieren')} onClick={() => setPaused(value => !value)}>
          {paused ? <Play size={13} /> : <Pause size={13} />}<span>{t(paused ? 'Abspielen' : 'Pause')}</span>
        </AnimatedButton>}
      </motion.div>
    </section>
  );
};
