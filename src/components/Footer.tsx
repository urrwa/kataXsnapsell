import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React from 'react';
import { Sparkles, Check } from 'lucide-react';
import { ModalType } from './Modal';
import '../footer.css';

interface Props { onOpenModal: (type: ModalType) => void; onNavigate: (id: string) => void; }

export const Footer: React.FC<Props> = ({ onOpenModal, onNavigate }) => {
  useLanguage();
  const navigation = [
    { title: 'Entdecken', links: [['Startseite', 'section-1'], ['Das System', 'section-4'], ['AI Chat Support', 'section-5'], ['AI Content Creation', 'section-6'], ['SnapSell CRM', 'section-7']] },
    { title: 'Die Academy', links: [['Über Katharina', 'section-3'], ['The Katharina Method', 'section-9'], ['Creator Circle', 'section-11'], ['Creator Experiences', 'mexico-experience'], ['Bewerbung', 'section-13']] },
  ];
  return (
    <footer id="main-footer" className="academy-footer" aria-label={t('Footer-Navigation')}>
      <div className="academy-footer-inner">
        <div className="footer-invitation">
          <div className="footer-invitation-copy">
            <p className="footer-kicker"><Sparkles size={14} aria-hidden="true" />{t('DEIN NÄCHSTES KAPITEL')}</p>
            <h2>{t('Deine Marke. Dein nächster Schritt.')}</h2>
            <p>{t('Entdecke, wie du mit Katharina und dem richtigen System dein Creator-Business weiterentwickeln kannst.')}</p>
          </div>
          <div className="footer-invitation-action">
            <div className="footer-apply-pill">
              <span>{t('Bereit für mehr?')}</span>
              <AnimatedButton onClick={() => onNavigate('section-13')}>{t('Für die Academy bewerben')}</AnimatedButton>
            </div>
            <p className="footer-action-notes"><span><Check size={14} aria-hidden="true" />{t('Persönliche Begleitung')}</span><span><Check size={14} aria-hidden="true" />{t('Dein eigenes Tempo')}</span></p>
          </div>
        </div>

        <div className="footer-directory">
          <div className="footer-brand-column">
            <AnimatedButton className="footer-wordmark" onClick={() => onNavigate('section-1')} aria-label={t('Katharina Academy – Start')}>
              <span>KATHARINA</span><span className="footer-wordmark-sub">ACADEMY <i aria-hidden="true" /></span>
            </AnimatedButton>
            <p>{t('Deine Persönlichkeit ist die Marke. Verbinde Content, Gespräche und Verkäufe zu einem Business, das zu deinem Leben passt.')}</p>
            <span className="footer-partner">{t('Technology powered by SnapSell')}</span>
          </div>
          {navigation.map(group => (
            <nav key={group.title} className="footer-link-column" aria-label={t(group.title)}>
              <h3>{t(group.title)}</h3>
              {group.links.map(([label, id]) => <AnimatedButton key={id} onClick={() => onNavigate(id)}>{t(label)}</AnimatedButton>)}
            </nav>
          ))}
          <nav className="footer-link-column" aria-label={t('Informationen')}>
            <h3>{t('Informationen')}</h3>
            <AnimatedButton onClick={() => onOpenModal('contact')}>{t('Kontakt')}</AnimatedButton>
            <AnimatedButton onClick={() => onOpenModal('privacy')}>{t('Datenschutz')}</AnimatedButton>
            <AnimatedButton onClick={() => onOpenModal('legal')}>{t('Impressum')}</AnimatedButton>
            <AnimatedButton onClick={() => onOpenModal('terms')}>{t('Programmhinweise')}</AnimatedButton>
          </nav>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {t('Katharina Academy. Alle Rechte vorbehalten.')}</p>
          <p>{t('Deine Marke. Deine Regeln.')}</p>
        </div>
        <p className="footer-disclaimer">{t('Alle genannten Umsatzbeispiele oder Ziele dienen nur zur Orientierung und sind keine Garantie für zukünftige Ergebnisse. Individuelle Ergebnisse können stark variieren.')}</p>
      </div>
    </footer>
  );
};
