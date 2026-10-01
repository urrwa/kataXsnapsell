import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { ASSET_SLOTS } from '../../data/content';
import { t, useLanguage } from '../../i18n';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void }

/**
 * Scroll sequence (forward):
 *
 * A. Section enters → heading fades+rises into view (entrance animation).
 *    Heading is in the BACK layer (z-index:1).
 *    Portrait top-edge is visible at bottom of viewport.
 *
 * B. User scrolls → portrait (z-index:2, front layer) rises upward,
 *    physically covering the heading. Heading simultaneously fades to 0.
 *    No heading text paints over the photo at any point.
 *
 * C. Portrait has fully risen; heading opacity is 0 and stays 0.
 *    Biography blur-reveal begins as it enters viewport.
 *
 * D. CTA visible.
 *
 * Reverse scrolling rewinds the same sequence.
 *
 * Layout:
 *  <section .mk-bronx>
 *    <div .mk-stage>          ← 200vh scroll track, ref=stageRef
 *      <div .mk-stage__sticky z-index:1>   ← heading, back layer
 *      <div .mk-stage__portrait-row z-index:2>  ← portrait, front layer
 *    </div>
 *    <div .mk-bronx__copy>   ← normal flow, outside stage
 *  </section>
 */
export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const reduceMotion = useReducedMotion();
  const stageRef   = useRef<HTMLDivElement>(null);
  const videoRef   = useRef<HTMLVideoElement>(null);
  const descRef    = useRef<HTMLParagraphElement>(null);

  /* ── Scroll progress tied to the animation stage only ── */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start start', 'end end'],
  });

  /* ── Heading: entrance settle then fade-out ──────────────
     [0 → 0.12]  entrance: opacity 0→1, y 24px→0
     [0.32 → 0.62] exit: opacity 1→0
     After 0.62 opacity stays at 0 permanently.
  ─────────────────────────────────────────────────────── */
  const headingOpacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.32, 0.62],
    [0,  1,   1,   0],
  );
  const headingY = useTransform(
    scrollYProgress,
    [0, 0.12],
    ['24px', '0px'],
  );
  const headingScale = useTransform(
    scrollYProgress,
    [0.12, 0.62],
    [1, 0.82],
  );

  /* ── Portrait: rises from below viewport through heading ─
     Starts at 0 (natural position, bottom of stage).
     Ends at -95vh (well above heading center).
     Preserved approved travel.
  ─────────────────────────────────────────────────────── */
  const portraitY = useTransform(
    scrollYProgress,
    [0, 0.85],
    ['0vh', '-95vh'],
  );

  /* ── Biography blur-reveal ───────────────────────────────
     Split description into word spans, then use an
     IntersectionObserver to add .mk-word--visible when the
     paragraph enters the central reading area.
  ─────────────────────────────────────────────────────── */
  useEffect(() => {
    const p = descRef.current;
    if (!p || reduceMotion) {
      // Reduced motion: ensure words are fully visible
      if (p) p.querySelectorAll('.mk-word').forEach(w => {
        (w as HTMLElement).classList.add('mk-word--visible');
      });
      return;
    }

    // Split text into word spans (only on first mount)
    if (!p.querySelector('.mk-word')) {
      const raw = p.textContent ?? '';
      p.textContent = '';
      raw.split(/(\s+)/).forEach((chunk, i) => {
        if (/^\s+$/.test(chunk)) {
          p.appendChild(document.createTextNode(chunk));
        } else {
          const span = document.createElement('span');
          span.className = 'mk-word';
          span.style.setProperty('--i', String(i));
          span.textContent = chunk;
          p.appendChild(span);
        }
      });
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          p.querySelectorAll('.mk-word').forEach(w =>
            w.classList.add('mk-word--visible'),
          );
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(p);
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <section id="section-3" className="mk-bronx" aria-labelledby="meet-kata-heading">

      {/* ── Animation stage: 200vh scroll track ── */}
      <div className="mk-stage" ref={stageRef}>

        {/*
          BACK LAYER (z-index:1) — heading
          Entrance: fades in and settles upward on section entry.
          Exit: fades to 0 as portrait covers it.
          Once opacity reaches 0 it stays 0 for the rest of the section.
        */}
        <div className="mk-stage__sticky">
          <motion.div
            className="mk-bronx__heading-wrap"
            style={reduceMotion ? {} : {
              opacity: headingOpacity,
              y: headingY,
              scale: headingScale,
            }}
          >
            <p className="mk-bronx__eyebrow">{t('DEINE CREATOR-MENTORIN')}</p>
            <h2 id="meet-kata-heading" className="mk-bronx__heading">
              <span className="mk-bronx__line">{t('Mehr über')}</span>
              <span className="mk-bronx__line">Katharina.</span>
            </h2>
          </motion.div>
        </div>

        {/*
          FRONT LAYER (z-index:2) — portrait
          Portrait starts visible at bottom of viewport (margin-top: -55vh).
          Travels -95vh upward as scrollYProgress goes 0→0.85.
          Covers the heading completely before heading finishes fading.
        */}
        <div className="mk-stage__portrait-row">
          <motion.div
            className="mk-bronx__portrait-mover"
            style={reduceMotion ? {} : { y: portraitY }}
          >
            <div className="mk-bronx__portrait">
              <img
                src={ASSET_SLOTS.kataPortrait.src}
                alt={t('Katharina, Creator-Coach und Mentorin')}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

      </div>{/* end .mk-stage */}

      {/* ── Biography: outside stage, pure normal flow ── */}
      <div className="mk-bronx__copy">
        <p className="mk-bronx__statement">
          {t('Creatorin. Coach.')}<br />
          <span>{t('Deine Creator Mama.')}</span>
        </p>

        {/* Words split by JS for blur-reveal. ref tracked above. */}
        <p className="mk-bronx__description" ref={descRef}>
          {t('Mit über 20 Jahren Erfahrung begleitet Katharina dich dabei, deine Marke zu stärken und dein Creator-Business aufzubauen.')}
        </p>

        <p className="mk-bronx__note">
          {t('Hör auf, alles allein zu machen. Fang an, wie eine Unternehmerin zu denken.')}
        </p>

        <AnimatedButton
          id="meet-kata-start-btn"
          className="mk-bronx__cta"
          onClick={onStartWithKata}
          animateArrow
        >{t('Für die Academy bewerben')}</AnimatedButton>

        <details className="mk-bronx__coaching" onToggle={event => {
          if (!event.currentTarget.open) videoRef.current?.pause();
        }}>
          <summary>{t('Coaching-Einblick')}</summary>
          <video
            ref={videoRef}
            src="/media/mentor/coaching-ai-v2.mp4"
            poster="/media/mentor/coaching-ai-v2-poster.jpg"
            controls
            playsInline
            preload="none"
            aria-label={t('Coaching-Einblick · KI-generierte Vorschau')}
          />
          <p>{t('KI-generierte Vorschau')}</p>
        </details>
      </div>

    </section>
  );
};
