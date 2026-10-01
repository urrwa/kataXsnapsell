import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import '../../struggle-section.css';
import { ProjectScrollRows } from './ProjectScrollRows';

interface StruggleSectionProps { onNext: () => void; }

const rows = [
  {
    num: '01',
    categoryKey: 'Content',
    sentenceKey: 'Planen, filmen, schneiden – dein Content braucht immer dich.',
    img: '/client-assets/struggle/row1.png',
    altKey: 'Creatorin am Schnittplatz mit Monitor, Kamera und Ringlicht',
  },
  {
    num: '02',
    categoryKey: 'Gespräche',
    sentenceKey: 'Nachrichten, Käuferfragen und Follow-ups – alle warten auf dich.',
    img: '/client-assets/struggle/row2.png',
    altKey: 'Creatorin im Aufnahmestudio mit Laptop und Kamera',
  },
  {
    num: '03',
    categoryKey: 'Deine Zeit',
    sentenceKey: 'Der Wechsel zwischen Plattformen lässt weniger Raum für dein Leben.',
    img: '/client-assets/struggle/row3.png',
    altKey: 'Creatorin am Schreibtisch mit Sony-Kamera, Laptop, Mikrofon und Content-Kalender',
  },
] as const;

export const StruggleSection: React.FC<StruggleSectionProps> = ({ onNext }) => {
  useLanguage();
  const reducedMotion = useReducedMotion();

  return (
    <section id="section-2" className="landing-section struggle-features" aria-labelledby="struggle-heading">
      <div className="sf-container">

        {/* Section heading */}
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

        {/* Project-style scroll rows */}
        <ProjectScrollRows
          ariaLabel={t('Deine aktuellen Herausforderungen')}
          items={rows.map(row => ({
            id: row.num,
            title: t(row.categoryKey),
            description: t(row.sentenceKey),
            image: row.img,
            alt: t(row.altKey),
          }))}
        />

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
