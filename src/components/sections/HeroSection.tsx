import { AnimatedButton } from '../AnimatedButton';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowDown, Pause, Play } from 'lucide-react';
import { t, useLanguage } from '../../i18n';
import '../../reference-hero.css';

interface HeroSectionProps {
  onJoin: () => void;
  onExplore: () => void;
  onScrollNext: () => void;
}

const SLIDES = [
  '/client-assets/hero/hero-poster.png',
  '/client-assets/hero/hero-poster-2.png',
  '/client-assets/hero/hero-poster-3.png',
];

const SLIDE_DURATION = 5000; // ms each slide shows

export const HeroSection: React.FC<HeroSectionProps> = ({ onJoin, onExplore, onScrollNext }) => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const [videoPaused, setVideoPaused] = useState(false);
  const [underlineDrawn, setUnderlineDrawn] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  // Draw underline after headline appears
  useEffect(() => {
    if (reducedMotion) { setUnderlineDrawn(true); return; }
    const timer = setTimeout(() => setUnderlineDrawn(true), 1400);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Sync video play/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (videoPaused || reducedMotion) { video.pause(); }
    else { void video.play().catch(() => {}); }
  }, [videoPaused, reducedMotion]);

  // Photo slideshow — advances every SLIDE_DURATION ms
  useEffect(() => {
    if (reducedMotion) return;
    const advance = () => {
      setActiveSlide(prev => (prev + 1) % SLIDES.length);
    };
    slideTimerRef.current = setTimeout(advance, SLIDE_DURATION);
    return () => { if (slideTimerRef.current) clearTimeout(slideTimerRef.current); };
  }, [activeSlide, reducedMotion]);

  const toggleVideo = () => {
    setVideoPaused(prev => !prev);
  };

  return (
    <section
      id="section-1"
      className="reference-hero cinematic-hero"
      aria-label={t('Katharina Academy – Start')}
    >
      {/* Background media */}
      <div className="cinematic-media" aria-hidden="true">
        {/* Photo slideshow — each slide fades in/out */}
        {SLIDES.map((src, i) => (
          <img
            key={src}
            className={`cinematic-poster cinematic-slide${i === activeSlide ? ' cinematic-slide-active' : ''}`}
            src={src}
            alt=""
            style={{ zIndex: i === activeSlide ? 2 : 1 }}
          />
        ))}
        {/* Video layer on top when playing */}
        {!reducedMotion && (
          <video
            ref={videoRef}
            className="cinematic-video"
            src="/client-assets/hero/hero-video.mp4"
            poster="/client-assets/hero/hero-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
        )}
        {/* Gradient overlays */}
        <div className="cinematic-gradient" aria-hidden="true" />
      </div>

      {/* Copy */}
      <div className="cinematic-inner">
        <div className="cinematic-copy">
          <motion.p {...entrance(0.05)} className="hero-eyebrow">
            <span />{t('DEINE MARKE. DEINE REGELN.')}
          </motion.p>
          <motion.h1 {...entrance(0.15)}>
            <span>{t('Schaffe mehr.')}</span>
            <span>{t('Arbeite weniger.')}</span>
            <span className={`hero-last-line${underlineDrawn ? ' hero-underline-drawn' : ''}`}>
              {t('Lebe größer.')}
            </span>
          </motion.h1>
          <motion.p {...entrance(0.26)} className="hero-description">
            {t('Baue dein Creator-Business mit KI, direkten Verkäufen und einem professionellen Team auf.')}
          </motion.p>
          <motion.div {...entrance(0.36)} className="hero-actions">
            <AnimatedButton animateArrow id="hero-primary-join-btn" className="reference-primary" onClick={onJoin}>
              {t('Jetzt für die Academy bewerben')}
            </AnimatedButton>
            <AnimatedButton animateArrow id="hero-secondary-works-btn" className="reference-secondary cinematic-secondary" onClick={onExplore}>
              {t('Das System entdecken')}
            </AnimatedButton>
          </motion.div>
          <motion.p {...entrance(0.46)} className="hero-qualification">
            {t('Für ambitionierte Creatorinnen ab 18 Jahren.')}
          </motion.p>
        </div>
      </div>

      {/* Bottom bar */}
      <motion.div {...entrance(0.6)} className="hero-bottom-bar cinematic-bottom-bar">
        <AnimatedButton className="hero-scroll" onClick={onScrollNext} aria-label={t('Das System entdecken – zur nächsten Sektion')}>
          <span className="hero-scroll-icon"><ArrowDown size={15} /></span>{t('Mehr entdecken')}
        </AnimatedButton>
        <p>{t('Technology powered by SnapSell')}<span className="hero-partner-dot" /><strong>SnapSell<span>®</span></strong></p>
        {!reducedMotion && (
          <AnimatedButton
            className="hero-motion-control"
            aria-pressed={videoPaused}
            aria-label={t(videoPaused ? 'Video abspielen' : 'Video pausieren')}
            onClick={toggleVideo}
          >
            {videoPaused ? <Play size={13} /> : <Pause size={13} />}
            <span>{t(videoPaused ? 'Abspielen' : 'Pause')}</span>
          </AnimatedButton>
        )}
      </motion.div>
    </section>
  );
};
