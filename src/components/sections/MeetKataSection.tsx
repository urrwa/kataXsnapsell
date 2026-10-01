import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useEffect, useState, useRef } from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { Award, Play, Pause } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void; }

export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const prefersReducedMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(video);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && documentVisible && !paused && !hovered && !focused && !reducedMotion) {
      video.play().catch(() => setPaused(true));
    } else video.pause();
  }, [inView, documentVisible, paused, hovered, focused, reducedMotion]);

  // Shared entrance config
  const fadeUp = (delay = 0) => prefersReducedMotion ? {} : {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  };

  const scaleIn = prefersReducedMotion ? {} : {
    initial: { opacity: 0, scale: 0.94 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  };

  return (
    <section id="section-3" className="landing-section meet-kata" aria-labelledby="meet-kata-heading">
      <div className="meet-kata-layout">

        {/* Visuals column */}
        <motion.div className="meet-kata-visuals" {...scaleIn}>
          <div className="meet-kata-portrait">
            <img loading="lazy" src={ASSET_SLOTS.heroKata.src}
              alt={t('Katharina, Creator-Coach und Mentorin')} referrerPolicy="no-referrer" />
            <motion.div
              className="meet-kata-experience"
              initial={prefersReducedMotion ? false : { opacity: 0, x: -16, y: 12 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Award size={19} strokeWidth={1.5} aria-hidden="true" />
              <div><strong>{t('20+ Jahre Erfahrung')}</strong><span>{t('Coaching und Training')}</span></div>
            </motion.div>
          </div>

          {/* Floating video card */}
          <motion.div
            className="meet-kata-video"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24, scale: 0.92 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={event => { if (event.target.matches(':focus-visible')) setFocused(true); }}
            onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
            <video ref={videoRef}
              src="/media/mentor/coaching-ai-v2.mp4"
              poster="/media/mentor/coaching-ai-v2-poster.jpg"
              aria-label={t('Coaching-Einblick · KI-generierte Vorschau')}
              playsInline preload="metadata" muted loop
              onError={() => setPaused(true)} />
            <div className="meet-kata-video-caption"><strong>{t('Coaching-Einblick')}</strong><span>{t('KI-generierte Vorschau')}</span></div>
            <AnimatedButton type="button" onClick={() => { if (reducedMotion) { setReducedMotion(false); setPaused(false); } else setPaused(value => !value); }}
              aria-label={t(paused || reducedMotion ? 'Coaching-Video abspielen' : 'Coaching-Video pausieren')}
              aria-pressed={paused} className="meet-kata-sound">
              {paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}
            </AnimatedButton>
          </motion.div>
        </motion.div>

        {/* Copy column — staggered entrance */}
        <div className="meet-kata-copy space-y-6">
          <motion.p className="meet-kata-eyebrow" {...fadeUp(0.05)}>
            <span />{t('DEINE CREATOR-MENTORIN')}
          </motion.p>

          <motion.div {...fadeUp(0.15)}>
            <h2 id="meet-kata-heading">{t('Dein nächstes Kapitel.')}<br />{t('Mit Katharina.')}</h2>
            <p className="meet-kata-subtitle">{t('Creatorin. Coach.')} <span>{t('Deine Creator Mama.')}</span></p>
          </motion.div>

          <motion.p className="meet-kata-description" {...fadeUp(0.25)}>
            {t('Baue dein Creator-Business mit Katharinas Begleitung auf. Mit über 20 Jahren Branchenerfahrung hilft sie Frauen, ihre persönliche Marke zu stärken, selbstbewusste Entscheidungen zu treffen und Systeme für ihr Wachstum aufzubauen.')}
          </motion.p>

          <motion.p
            className="meet-kata-note"
            {...(prefersReducedMotion ? {} : {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true, margin: '-40px' },
              transition: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
            })}
          >
            {t('Hör auf, alles allein zu machen. Fang an, wie eine Unternehmerin zu denken.')}
          </motion.p>

          <motion.p className="meet-kata-benefits" {...fadeUp(0.45)}>
            {t('Persönliche Begleitung · Klare Systeme · Deine eigene Marke')}
          </motion.p>

          <motion.div {...fadeUp(0.55)}>
            <AnimatedButton animateArrow id="meet-kata-start-btn" onClick={onStartWithKata}
              className="meet-kata-cta">{t('Für die Academy bewerben')}</AnimatedButton>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
