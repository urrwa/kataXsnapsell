import { t, useLanguage } from '../../i18n';
import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ApplyButton } from '../BriefAdditions';

interface FloatCard {
  id: string;
  title: string;
  value: string;
  sub: string;
  color: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  floatDelay: number;
  floatDuration: number;
}

const CARDS: FloatCard[] = [
  {
    id: 'c1',
    title: 'Monatliche Einnahmen',
    value: '€ 8.240',
    sub: '+34% seit letztem Monat',
    color: '#20C997',
    top: '8%',
    left: '2%',
    floatDelay: 0,
    floatDuration: 6.2,
  },
  {
    id: 'c2',
    title: 'Content freigegeben',
    value: '24 Beiträge',
    sub: 'Diese Woche geplant',
    color: '#9B7CF4',
    top: '18%',
    right: '3%',
    floatDelay: 1.1,
    floatDuration: 7.0,
  },
  {
    id: 'c3',
    title: 'Aktive Käufer',
    value: '183',
    sub: '12 neue diese Woche',
    color: '#F4A361',
    top: '52%',
    left: '1%',
    floatDelay: 0.6,
    floatDuration: 5.8,
  },
  {
    id: 'c4',
    title: 'Verkäufe heute',
    value: '€ 1.120',
    sub: '9 abgeschlossene Käufe',
    color: '#20C997',
    bottom: '18%',
    right: '2%',
    floatDelay: 1.8,
    floatDuration: 6.6,
  },
  {
    id: 'c5',
    title: 'KI-Antworten',
    value: '96%',
    sub: 'Automatisch beantwortet',
    color: '#5BBCFF',
    bottom: '8%',
    left: '3%',
    floatDelay: 0.3,
    floatDuration: 7.4,
  },
  {
    id: 'c6',
    title: 'Neues Angebot',
    value: 'Masterclass Bundle',
    sub: '€ 297 · sofort verfügbar',
    color: '#F4A361',
    top: '38%',
    right: '1%',
    floatDelay: 2.2,
    floatDuration: 6.0,
  },
];

function FloatingCard({ card, scrollProgress }: { card: FloatCard; scrollProgress: ReturnType<typeof useTransform> }) {
  const reducedMotion = useReducedMotion();

  const posStyle: React.CSSProperties = {
    position: 'absolute',
    top: card.top,
    left: card.left,
    right: card.right,
    bottom: card.bottom,
  };

  if (reducedMotion) {
    return (
      <div
        className="floating-card"
        style={posStyle}
      >
        <p className="floating-card-label">{t(card.title)}</p>
        <p className="floating-card-value" style={{ color: card.color }}>{t(card.value)}</p>
        <p className="floating-card-sub">{t(card.sub)}</p>
      </div>
    );
  }

  return (
    <motion.div
      className="floating-card"
      style={{ ...posStyle }}
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: '-10%' }}
      transition={{
        duration: 0.7,
        delay: card.floatDelay * 0.4,
        ease: [0.22, 1, 0.36, 1],
      }}
      animate={{
        y: [0, -10, 0, 6, 0],
        rotate: [0, 0.4, 0, -0.3, 0],
      }}
    >
      {/* animate prop on motion overrides whileInView once visible — use CSS animation instead */}
      <p className="floating-card-label">{t(card.title)}</p>
      <p className="floating-card-value" style={{ color: card.color }}>{t(card.value)}</p>
      <p className="floating-card-sub">{t(card.sub)}</p>
    </motion.div>
  );
}

export const FloatingCardsSection: React.FC = () => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const centerY = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]);
  const centerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="section-floating"
      className="floating-cards-section"
      aria-label={t('Creator Business System')}
    >
      <style>{`
        .floating-cards-section {
          position: relative;
          width: 100%;
          min-height: 100svh;
          background: #0A0A0C;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 80px 24px;
        }

        /* Radial glow behind center */
        .floating-cards-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 60% 55% at 50% 50%, rgba(32,201,151,0.07) 0%, transparent 70%);
          pointer-events: none;
        }

        .floating-cards-arena {
          position: relative;
          width: 100%;
          max-width: 900px;
          height: min(80svh, 620px);
          margin: 0 auto;
        }

        /* Central content */
        .floating-center {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          width: min(320px, 80%);
        }

        .floating-center-eyebrow {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .12em;
          text-transform: uppercase;
          color: #20C997;
          margin-bottom: 14px;
        }

        .floating-center h2 {
          font-size: clamp(26px, 4.5vw, 48px);
          font-weight: 700;
          line-height: 1.15;
          color: #fff;
          letter-spacing: -.02em;
          margin: 0 0 14px;
          text-wrap: balance;
        }

        .floating-center h2 span {
          color: #20C997;
        }

        .floating-center p {
          font-size: 13px;
          line-height: 1.6;
          color: rgba(255,255,255,0.6);
          margin-bottom: 24px;
        }

        /* Cards */
        .floating-card {
          position: absolute;
          background: rgba(20, 20, 22, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          padding: 14px 18px;
          min-width: 160px;
          max-width: 200px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.05) inset;
          z-index: 5;
        }

        .floating-card-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin: 0 0 6px;
        }

        .floating-card-value {
          font-size: 18px;
          font-weight: 700;
          line-height: 1.1;
          margin: 0 0 4px;
          font-variant-numeric: tabular-nums;
        }

        .floating-card-sub {
          font-size: 10px;
          color: rgba(255,255,255,0.45);
          margin: 0;
          line-height: 1.4;
        }

        /* Floating keyframe animations per card */
        .floating-card:nth-child(1) { animation: float1 6.2s ease-in-out 0s infinite; }
        .floating-card:nth-child(2) { animation: float2 7.0s ease-in-out 1.1s infinite; }
        .floating-card:nth-child(3) { animation: float3 5.8s ease-in-out 0.6s infinite; }
        .floating-card:nth-child(4) { animation: float4 6.6s ease-in-out 1.8s infinite; }
        .floating-card:nth-child(5) { animation: float5 7.4s ease-in-out 0.3s infinite; }
        .floating-card:nth-child(6) { animation: float6 6.0s ease-in-out 2.2s infinite; }

        @keyframes float1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(.5deg)} }
        @keyframes float2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-8px) rotate(-.4deg)} }
        @keyframes float3 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(.3deg)} }
        @keyframes float4 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-10px) rotate(-.5deg)} }
        @keyframes float5 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-9px) rotate(.4deg)} }
        @keyframes float6 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-11px) rotate(-.3deg)} }

        @media (prefers-reduced-motion: reduce) {
          .floating-card { animation: none !important; }
        }

        /* Mobile: hide side cards, show only 2 corners */
        @media (max-width: 640px) {
          .floating-card:nth-child(1) { top: 4% !important; left: 2% !important; right: auto !important; bottom: auto !important; }
          .floating-card:nth-child(2) { top: 4% !important; right: 2% !important; left: auto !important; bottom: auto !important; }
          .floating-card:nth-child(3) { display: none; }
          .floating-card:nth-child(4) { bottom: 10% !important; right: 2% !important; left: auto !important; top: auto !important; }
          .floating-card:nth-child(5) { bottom: 10% !important; left: 2% !important; right: auto !important; top: auto !important; }
          .floating-card:nth-child(6) { display: none; }
          .floating-cards-arena { height: min(85svh, 560px); }
          .floating-card { min-width: 130px; max-width: 150px; padding: 10px 13px; }
          .floating-card-value { font-size: 15px; }
        }
      `}</style>

      <div className="floating-cards-arena">
        {/* Floating cards */}
        {CARDS.map((card, i) => (
          <motion.div
            key={card.id}
            className="floating-card"
            style={{
              position: 'absolute',
              top: card.top,
              left: card.left,
              right: card.right,
              bottom: card.bottom,
            }}
            initial={reducedMotion ? {} : { opacity: 0, scale: 0.85, y: 24 }}
            whileInView={reducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-5%' }}
            transition={reducedMotion ? {} : {
              duration: 0.65,
              delay: i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <p className="floating-card-label">{t(card.title)}</p>
            <p className="floating-card-value" style={{ color: card.color }}>{t(card.value)}</p>
            <p className="floating-card-sub">{t(card.sub)}</p>
          </motion.div>
        ))}

        {/* Central headline */}
        <motion.div
          className="floating-center"
          style={reducedMotion ? {} : { y: centerY, opacity: centerOpacity }}
        >
          <span className="floating-center-eyebrow">{t('Dein Creator System')}</span>
          <h2>
            {t('Alles läuft.')}<br />
            {t('Auch wenn ')}<span>{t('du schläfst.')}</span>
          </h2>
          <p>{t('KI, CRM und direkte Verkäufe – dein Business arbeitet rund um die Uhr für dich.')}</p>
          <ApplyButton>{t('Jetzt bewerben')}</ApplyButton>
        </motion.div>
      </div>
    </section>
  );
};
