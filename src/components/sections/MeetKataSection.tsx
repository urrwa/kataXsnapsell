import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { ASSET_SLOTS } from '../../data/content';
import { t, useLanguage } from '../../i18n';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void }

/**
 * Scroll choreography:
 * The section has a tall scroll track. The heading is sticky so it stays
 * in view. As you scroll, the portrait container (positioned below the heading
 * in DOM order) translates upward, physically passing in front of the heading.
 * Simultaneously the heading scales down and dims. The portrait mask is a
 * tall capsule — fully rounded top and bottom — and the whole container moves,
 * never just the image inside a stationary crop.
 */
export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Drive everything from a single scroll source on the outer track.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Heading: stays sticky, scale 1→0.72, opacity 1→0.25 as portrait approaches
  const headingScale = useTransform(scrollYProgress, [0, 0.55], [1, 0.72]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0.25]);

  // Portrait travels upward. At progress=0 it sits in normal flow below the heading.
  // Negative translateY pulls it up, overlapping the heading.
  // The value here is tuned so at ~0.55 progress the portrait center reaches heading center.
  const portraitY = useTransform(scrollYProgress, [0, 0.85], ['0vh', '-58vh']);

  const ease = [0.22, 1, 0.36, 1] as const;
  const revealBelow = {
    initial: reduceMotion ? false as const : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.75, ease },
  };

  return (
    <section id="section-3" className="mk-bronx" aria-labelledby="meet-kata-heading" ref={trackRef}>

      {/* Sticky heading layer — stays in view while the section scrolls */}
      <div className="mk-bronx__sticky-shell">
        <motion.div
          className="mk-bronx__heading-wrap"
          style={reduceMotion ? {} : { scale: headingScale, opacity: headingOpacity }}
        >
          <p className="mk-bronx__eyebrow">{t('DEINE CREATOR-MENTORIN')}</p>
          <h2 id="meet-kata-heading" className="mk-bronx__heading">
            <span className="mk-bronx__line">{t('Mehr über')}</span>
            <span className="mk-bronx__line">Katharina.</span>
          </h2>
        </motion.div>
      </div>

      {/* Foreground: portrait scrolls upward over the sticky heading */}
      <div className="mk-bronx__foreground">
        <motion.div
          className="mk-bronx__portrait-mover"
          style={reduceMotion ? {} : { y: portraitY }}
        >
          {/* Capsule mask — fully rounded, constant silhouette */}
          <div className="mk-bronx__portrait">
            <img
              src={ASSET_SLOTS.heroKata.src}
              alt={t('Katharina, Creator-Coach und Mentorin')}
              loading="lazy" decoding="async" referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* Biography and CTA — appear after the portrait sequence */}
      <motion.div className="mk-bronx__copy" {...revealBelow}>
        <p className="mk-bronx__statement">
          {t('Creatorin. Coach.')}<br />
          <span>{t('Deine Creator Mama.')}</span>
        </p>
        <p className="mk-bronx__description">
          {t('Mit über 20 Jahren Erfahrung begleitet Katharina dich dabei, deine Marke zu stärken und dein Creator-Business aufzubauen.')}
        </p>
        <p className="mk-bronx__note">
          {t('Hör auf, alles allein zu machen. Fang an, wie eine Unternehmerin zu denken.')}
        </p>
        <AnimatedButton
          id="meet-kata-start-btn" className="mk-bronx__cta"
          onClick={onStartWithKata} animateArrow
        >{t('Für die Academy bewerben')}</AnimatedButton>

        <details className="mk-bronx__coaching" onToggle={event => {
          if (!event.currentTarget.open) videoRef.current?.pause();
        }}>
          <summary>{t('Coaching-Einblick')}</summary>
          <video
            ref={videoRef}
            src="/media/mentor/coaching-ai-v2.mp4"
            poster="/media/mentor/coaching-ai-v2-poster.jpg"
            controls playsInline preload="none"
            aria-label={t('Coaching-Einblick · KI-generierte Vorschau')}
          />
          <p>{t('KI-generierte Vorschau')}</p>
        </details>
      </motion.div>
    </section>
  );
};
