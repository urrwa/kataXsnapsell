import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { ASSET_SLOTS } from '../../data/content';
import { t, useLanguage } from '../../i18n';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void }
const ease = [0.22, 1, 0.36, 1] as const;

/** Independently recreated from the supplied recording, not exported Framer code. */
export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const reduceMotion = useReducedMotion();
  const portraitRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  });
  // Transform the image only; the layout and scroll target remain stable.
  const imageY = useTransform(scrollYProgress, [0, 1], ['-3%', '3%']);
  const reveal = (delay = 0) => ({
    initial: reduceMotion ? false as const : { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.18 },
    transition: { duration: reduceMotion ? 0 : 0.75, delay: reduceMotion ? 0 : delay, ease },
  });

  return (
    <section id="section-3" className="mk-bronx" aria-labelledby="meet-kata-heading">
      <div className="mk-bronx__inner">
        <p className="mk-bronx__eyebrow">{t('DEINE CREATOR-MENTORIN')}</p>
        <h2 id="meet-kata-heading" className="mk-bronx__heading">
          {[t('Mehr über'), 'Katharina.'].map((line, index) => (
            <span className="mk-bronx__line" key={line}>
              <motion.span
                initial={reduceMotion ? false : { y: '105%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : index * 0.1, ease }}
              >{line}</motion.span>
            </span>
          ))}
        </h2>

        <div className="mk-bronx__portrait-anchor" ref={portraitRef}>
          <motion.div className="mk-bronx__portrait" {...reveal()}>
            <motion.img
              src={ASSET_SLOTS.heroKata.src}
              alt={t('Katharina, Creator-Coach und Mentorin')}
              loading="lazy" decoding="async" referrerPolicy="no-referrer"
              style={{ y: reduceMotion ? 0 : imageY }}
            />
          </motion.div>
        </div>

        <motion.div className="mk-bronx__copy" {...reveal()}>
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

          {/* Preserve the existing illustrative clip without a floating overlay.
              It plays only after an explicit user action, with native controls. */}
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
      </div>
    </section>
  );
};
