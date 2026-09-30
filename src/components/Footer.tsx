import React, { useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { t, useLanguage } from '../i18n';
import { ModalType } from './Modal';
import '../footer.css';

interface Props {
  onOpenModal: (type: ModalType) => void;
  onNavigate: (id: string) => void;
}

export const Footer: React.FC<Props> = ({ onOpenModal, onNavigate }) => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const year = new Date().getFullYear();

  const handleApply = useCallback(() => {
    onNavigate('section-13');
  }, [onNavigate]);

  // Shared viewport settings
  const vp = { once: true, margin: '-80px' };
  const ease = [0.16, 1, 0.3, 1] as const;

  // Brand col reveal
  const brandReveal = reducedMotion ? {} : {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: vp,
    transition: { duration: 0.75, ease },
  };

  // Link columns — staggered
  const colReveal = (i: number) => reducedMotion ? {} : ({
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: vp,
    transition: { duration: 0.65, ease, delay: 0.1 + i * 0.08 },
  });

  // Bottom bar
  const bottomReveal = reducedMotion ? {} : {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: vp,
    transition: { duration: 0.6, delay: 0.35 },
  };

  // Wordmark: slides up + very slight scale
  const wordmarkReveal = reducedMotion ? {} : {
    initial: { opacity: 0, y: 60, scale: 0.97 },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.9, ease },
  };

  // Sub-label under wordmark
  const subReveal = reducedMotion ? {} : {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-40px' },
    transition: { duration: 0.7, ease, delay: 0.18 },
  };

  return (
    <footer id="main-footer" aria-label={t('Footer-Navigation')}>

      {/* ── Main footer surface ── */}
      <div className="ft-surface">
        <div className="ft-inner">
          <div className="ft-top">

            {/* Left: brand statement + apply CTA */}
            <motion.div className="ft-brand-col" {...brandReveal}>
              <p className="ft-brand-statement" aria-label={t('Deine Marke. Deine Freiheit.')}>
                <span>{t('Deine Marke.')}</span>
                <span className="ft-brand-line2">{t('Deine Freiheit.')}</span>
              </p>
              <button
                type="button"
                className="ft-apply-btn"
                onClick={handleApply}
              >
                {t('Für die Academy bewerben')}
              </button>
            </motion.div>

            {/* Right: 3 link columns — each staggered */}
            <div className="ft-links">
              {/* Academy */}
              <motion.nav className="ft-link-col" aria-label={t('Academy')} {...colReveal(0)}>
                <h3 className="ft-col-label">{t('Academy')}</h3>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-3')}>{t('Über Katharina')}</button>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-9')}>{t('The Academy')}</button>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-11')}>{t('Creator Circle')}</button>
              </motion.nav>

              {/* Connect */}
              <motion.nav className="ft-link-col" aria-label={t('Connect')} {...colReveal(1)}>
                <h3 className="ft-col-label">{t('Connect')}</h3>
                <a className="ft-link" href="https://www.instagram.com/katharinaschwarz_official" target="_blank" rel="noopener noreferrer">Instagram</a>
              </motion.nav>

              {/* Legal */}
              <motion.nav className="ft-link-col" aria-label={t('Legal')} {...colReveal(2)}>
                <h3 className="ft-col-label">{t('Legal')}</h3>
                <button type="button" className="ft-link" onClick={() => onOpenModal('privacy')}>{t('Datenschutz')}</button>
                <button type="button" className="ft-link" onClick={() => onOpenModal('legal')}>{t('Impressum')}</button>
                <button type="button" className="ft-link" onClick={() => onOpenModal('terms')}>{t('Programmhinweise')}</button>
              </motion.nav>
            </div>
          </div>

          {/* Bottom bar */}
          <motion.div className="ft-bottom" {...bottomReveal}>
            <p className="ft-copyright">© {year} {t('Katharina Academy. Alle Rechte vorbehalten.')}</p>
            <p className="ft-disclaimer">{t('Alle genannten Umsatzbeispiele oder Ziele dienen nur zur Orientierung und sind keine Garantie für zukünftige Ergebnisse. Individuelle Ergebnisse können stark variieren.')}</p>
          </motion.div>
        </div>
      </div>

      {/* ── Oversized wordmark strip ── */}
      <div className="ft-wordmark-strip" aria-hidden="true">
        <motion.span className="ft-wordmark-main" {...wordmarkReveal}>
          KATHARINA
        </motion.span>
        <motion.span className="ft-wordmark-sub" {...subReveal}>
          ACADEMY
        </motion.span>
      </div>

    </footer>
  );
};
