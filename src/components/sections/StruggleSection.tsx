import React, { useRef, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import '../../struggle-section.css';

interface StruggleSectionProps { onNext: () => void; }

const rows = [
  {
    num: '01',
    categoryKey: 'Content',
    headingKey: 'Jeden Tag neuen Content.',
    sentenceKey: 'Planen, filmen, schneiden – dein Content braucht immer dich.',
    img: '/client-assets/struggle/row1.png',
    altKey: 'Creatorin am Schnittplatz mit Monitor, Kamera und Ringlicht',
    snippets: null,
  },
  {
    num: '02',
    categoryKey: 'Gespräche',
    headingKey: 'Dein Posteingang macht nie Pause.',
    sentenceKey: 'Nachrichten, Käuferfragen und Follow-ups – alle warten auf dich.',
    img: '/client-assets/struggle/row2.png',
    altKey: 'Creatorin im Aufnahmestudio mit Laptop und Kamera',
    snippets: ['Ist das noch verfügbar?', 'Nur kurz nachgehakt …'],
    snippetsLabelKey: 'Illustratives Beispiel',
  },
  {
    num: '03',
    categoryKey: 'Deine Zeit',
    headingKey: 'So viele Kanäle. So wenig Zeit.',
    sentenceKey: 'Der Wechsel zwischen Plattformen lässt weniger Raum für dein Leben.',
    img: '/client-assets/struggle/row3.png',
    altKey: 'Creatorin am Schreibtisch mit Sony-Kamera, Laptop, Mikrofon und Content-Kalender',
    snippets: null,
  },
] as const;

const entrance = (delay = 0) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-64px' },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const mediaEntrance = (delay = 0) => ({
  initial: { opacity: 0, scale: 1.025 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, margin: '-64px' },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
});

interface RowProps {
  row: typeof rows[number];
  reducedMotion: boolean | null;
  lang: string;
}

const EditorialRow: React.FC<RowProps> = ({ row, reducedMotion, lang }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.play().catch(() => {}); }
        else { video.pause(); }
      },
      { threshold: 0.2 }
    );
    observerRef.current.observe(video);
    return () => observerRef.current?.disconnect();
  }, []);

  const textBlock = (
    <div className="er-text">
      <motion.span className="er-category" {...(reducedMotion ? {} : entrance(0))}>
        {row.num} / {t(row.categoryKey)}
      </motion.span>
      <motion.h3 {...(reducedMotion ? {} : entrance(0.06))}>
        {t(row.headingKey)}
      </motion.h3>
      <motion.p {...(reducedMotion ? {} : entrance(0.12))}>
        {t(row.sentenceKey)}
      </motion.p>
    </div>
  );

  const mediaBlock = (
    <motion.div
      className="er-media"
      {...(reducedMotion ? {} : mediaEntrance(0.08))}
    >
      <img
        src={row.img}
        alt={t(row.altKey)}
        loading="lazy"
        decoding="async"
      />
      {row.snippets && (
        <div className="er-snippets" aria-label={t(row.snippetsLabelKey as string)}>
          {row.snippets.map((s, i) => (
            <span key={i} className={`er-snippet er-snippet-${i}`}>{s}</span>
          ))}
        </div>
      )}
    </motion.div>
  );

  return (
    <article className={`er-row${row.num === '02' ? ' er-row--reverse' : ''}`}>
      {textBlock}
      {mediaBlock}
    </article>
  );
};

export const StruggleSection: React.FC<StruggleSectionProps> = ({ onNext }) => {
  const { language } = useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="section-2" className="landing-section struggle-features" aria-labelledby="struggle-heading">
      <div className="sf-container">

        {/* Section heading — already updated in a prior pass */}
        <header className="sf-heading sf-heading-minimal">
          <motion.h2
            id="struggle-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('Machst du noch')}<br />
            <span className="sf-heading-mint">{t('alles selbst?')}</span>
          </motion.h2>
          <motion.p
            className="sf-intro"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('Du musst nicht härter arbeiten. Du brauchst ein besseres System.')}
          </motion.p>
        </header>

        {/* Editorial rows */}
        <div className="er-rows" role="list">
          {rows.map((row) => (
            <EditorialRow
              key={row.num}
              row={row}
              reducedMotion={reducedMotion}
              lang={language}
            />
          ))}
        </div>

        {/* Closing line */}
        <motion.p
          className="er-closing"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-48px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('Es muss nicht so bleiben.')}
        </motion.p>

        {/* CTA */}
        <div className="er-actions">
          <AnimatedButton onClick={onNext} className="rounded-full px-5 py-3 bg-[#20C997] text-[#080808] text-sm font-bold">
            {t('Mein System entdecken')}
          </AnimatedButton>
        </div>

      </div>
    </section>
  );
};
