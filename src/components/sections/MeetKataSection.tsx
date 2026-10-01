import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { ASSET_SLOTS } from '../../data/content';
import { t, useLanguage } from '../../i18n';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void }

/**
 * Layout:
 *
 *  <section #section-3>               ← outer section, no min-height, normal padding
 *    <div .mk-stage>                  ← animation scroll track, explicit height ~200vh
 *      <div .mk-stage__sticky>        ← position:sticky top:0, height:100vh (viewport pin)
 *        heading (scales + fades out completely by scroll end)
 *      </div>
 *      <div .mk-stage__portrait>      ← positioned below sticky, translates upward
 *        portrait capsule
 *      </div>
 *    </div>
 *    <div .mk-bronx__copy>            ← normal flow, outside the scroll track
 *      biography, CTA, coaching
 *    </div>
 *  </section>
 *
 * useScroll tracks .mk-stage from start:start to end:end so progress is
 * strictly bounded to the animation. Once .mk-stage scrolls away, progress
 * stays at 1 and the heading stays at opacity:0. The biography is never
 * inside the sticky zone.
 */
export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const reduceMotion = useReducedMotion();
  // Track only the animation stage, not the full section
  const stageRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  // Heading: starts full, fades to zero before the end of the stage.
  // [0.4, 0.72] means fade starts when portrait is approaching and
  // completes well before the bottom of the stage.
  // clamped: after 0.72 it stays at 0 permanently.
  const headingScale   = useTransform(scrollYProgress, [0, 0.65], [1, 0.76]);
  const headingOpacity = useTransform(scrollYProgress, [0.35, 0.68], [1, 0]);

  // Portrait: entire capsule translates up from its natural position to
  // well above the heading. Preserved from approved animation.
  const portraitY = useTransform(scrollYProgress, [0, 0.85], ['0vh', '-58vh']);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section id="section-3" className="mk-bronx" aria-labelledby="meet-kata-heading">

      {/* ── Animation stage: self-contained scroll track ── */}
      <div className="mk-stage" ref={stageRef}>

        {/* Sticky pin: heading stays at top:0 while stage scrolls */}
        <div className="mk-stage__sticky">
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

        {/* Portrait: sits below heading in flow, translates upward */}
        <div className="mk-stage__portrait-row">
          <motion.div
            className="mk-bronx__portrait-mover"
            style={reduceMotion ? {} : { y: portraitY }}
          >
            <div className="mk-bronx__portrait">
              <img
                src={ASSET_SLOTS.kataPortrait.src}
                alt={t('Katharina, Creator-Coach und Mentorin')}
                loading="lazy" decoding="async" referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

      </div>{/* end .mk-stage */}

      {/* ── Biography: outside the stage, pure normal flow ── */}
      <div className="mk-bronx__copy">
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
      </div>

    </section>
  );
};
