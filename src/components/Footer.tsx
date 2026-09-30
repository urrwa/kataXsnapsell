import React, { useState, useCallback } from 'react';
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

  // Application dialog state — shares the same dialog as the CTA banner by
  // scrolling to section-13 (the existing application anchor).
  const handleApply = useCallback(() => {
    onNavigate('section-13');
  }, [onNavigate]);

  const revealProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  const wordmarkRevealProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 36 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
      };

  return (
    <footer id="main-footer" aria-label={t('Footer-Navigation')}>

      {/* ── Main footer surface ── */}
      <div className="ft-surface">
        <div className="ft-inner">
          <motion.div className="ft-top" {...revealProps}>

            {/* Left: brand statement + apply CTA */}
            <div className="ft-brand-col">
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
            </div>

            {/* Right: 3 link columns */}
            <div className="ft-links">
              {/* Academy */}
              <nav className="ft-link-col" aria-label={t('Academy')}>
                <h3 className="ft-col-label">{t('Academy')}</h3>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-3')}>{t('Über Katharina')}</button>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-9')}>{t('The Academy')}</button>
                <button type="button" className="ft-link" onClick={() => onNavigate('section-11')}>{t('Creator Circle')}</button>
              </nav>

              {/* Connect */}
              <nav className="ft-link-col" aria-label={t('Connect')}>
                <h3 className="ft-col-label">{t('Connect')}</h3>
                <a className="ft-link" href="https://www.instagram.com/katharinaschwarz_official" target="_blank" rel="noopener noreferrer">Instagram</a>
                <button type="button" className="ft-link" onClick={() => onOpenModal('contact')}>{t('Kontakt')}</button>
              </nav>

              {/* Legal */}
              <nav className="ft-link-col" aria-label={t('Legal')}>
                <h3 className="ft-col-label">{t('Legal')}</h3>
                <button type="button" className="ft-link" onClick={() => onOpenModal('privacy')}>{t('Datenschutz')}</button>
                <button type="button" className="ft-link" onClick={() => onOpenModal('legal')}>{t('Impressum')}</button>
                <button type="button" className="ft-link" onClick={() => onOpenModal('terms')}>{t('Programmhinweise')}</button>
              </nav>
            </div>
          </motion.div>

          {/* Bottom bar */}
          <div className="ft-bottom">
            <p className="ft-copyright">© {year} {t('Katharina Academy. Alle Rechte vorbehalten.')}</p>
            <p className="ft-disclaimer">{t('Alle genannten Umsatzbeispiele oder Ziele dienen nur zur Orientierung und sind keine Garantie für zukünftige Ergebnisse. Individuelle Ergebnisse können stark variieren.')}</p>
          </div>
        </div>
      </div>

      {/* ── Oversized wordmark strip ── */}
      <motion.div className="ft-wordmark-strip" aria-hidden="true" {...wordmarkRevealProps}>
        <span className="ft-wordmark-main">KATHARINA</span>
        <span className="ft-wordmark-sub">ACADEMY</span>
      </motion.div>

    </footer>
  );
};
