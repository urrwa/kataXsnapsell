import { AnimatedButton } from '../AnimatedButton';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
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
  const [activeSlide, setActiveSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const slideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Scroll-driven frame transition (Lassie-style)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  // Detect mobile (≤ 767px) — stable for the session, re-evaluated on resize
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Map scroll progress to inset and border-radius
  const maxInset = isMobile ? 14 : 36;
  const maxRadius = isMobile ? 28 : 64;
  const frameInset = useTransform(scrollYProgress, [0, 0.45], [0, maxInset]);
  const frameRadius = useTransform(scrollYProgress, [0, 0.45], [0, maxRadius]);

  const entrance = (delay: number) => ({
    initial: { opacity: 0, y: reducedMotion ? 0 : 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reducedMotion ? 0 : 0.75, delay: reducedMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] as const },
  });

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
      ref={heroRef}
      id="section-1"
      className="reference-hero cinematic-hero"
      aria-label={t('Katharina Academy – Start')}
    >
      {/* Background media — scroll-driven inset frame */}
      <motion.div
        className="cinematic-media"
        aria-hidden="true"
        style={reducedMotion ? { borderRadius: 16, overflow: 'hidden' } : {
          marginInline: frameInset,
          borderRadius: frameRadius,
          overflow: 'hidden',
        }}
      >
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
      </motion.div>

      {/* Copy */}
      <div className="cinematic-inner">
        <div className="cinematic-copy">
          <motion.div {...entrance(0.05)} className="hero-eyebrow">
            <span className="hero-eyebrow-badge">{t('Katharina Academy')}</span>
            <span className="hero-eyebrow-text">{t('Dein Business. Deine Regeln.')}</span>
          </motion.div>
          <motion.h1 {...entrance(0.15)}>
            <span>{t('Baue deine Marke auf.')}</span>
            <span>{t('Lass dein Business wachsen.')}</span>
            <span>{t('Schaffe Raum für dein Leben.')}</span>
          </motion.h1>
          <motion.p {...entrance(0.26)} className="hero-description">
            {t('Verwandle deine Kreativität in ein Business – mit KI-Tools, praktischer Begleitung und Katharina an deiner Seite.')}
          </motion.p>
          <motion.div {...entrance(0.36)} className="hero-actions">
            <AnimatedButton animateArrow id="hero-primary-join-btn" className="reference-primary" onClick={onJoin}>
              {t('Für die Academy bewerben')}
            </AnimatedButton>
            <AnimatedButton animateArrow id="hero-secondary-works-btn" className="reference-secondary cinematic-secondary" onClick={onExplore}>
              {t('Die Academy entdecken')}
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
