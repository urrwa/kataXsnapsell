import { AnimatedButton } from './AnimatedButton';
import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { LanguageSwitcher, t, useLanguage } from '../i18n';
import { useFocusTrap } from './BriefAdditions';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenAssetGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useFocusTrap(mobileMenuOpen, () => setMobileMenuOpen(false));
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 40);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const links = [
    { label: 'Das System', target: 'section-4' },
    { label: 'Über Katharina', target: 'section-3' },
    { label: 'Academy', target: 'section-9' },
    { label: 'Creator Circle', target: 'section-11' },
  ];
  const navigate = (target: string) => { setMobileMenuOpen(false); onNavigate(target); };

  return <header id="main-header" className={`reference-header ${scrolled ? 'is-scrolled' : ''}`}>
    <div className="reference-nav">
      <AnimatedButton animationVariant="brand" className="reference-logo" onClick={() => navigate('section-1')} aria-label={t('Katharina Academy Startseite')}>KATHARINA<span>ACADEMY<span className="reference-logo-dot" /></span></AnimatedButton>
      <nav className="reference-nav-links" aria-label={t('Navigation')}>
        {links.map(link => <AnimatedButton key={link.target} onClick={() => navigate(link.target)}>{t(link.label)}</AnimatedButton>)}
      </nav>
      <div className="reference-nav-actions">
        <LanguageSwitcher />
        <AnimatedButton id="header-join-cta" className="reference-primary header-apply" onClick={() => navigate('section-13')}>{t('Jetzt bewerben')}</AnimatedButton>
        <AnimatedButton animationVariant="icon" id="mobile-menu-toggle" className="reference-menu-toggle" aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation" aria-label={t('Menü öffnen')} onClick={() => setMobileMenuOpen(true)}><Menu size={21} /></AnimatedButton>
      </div>
    </div>
    {mobileMenuOpen && <div id="mobile-navigation" className="reference-mobile-menu" role="dialog" aria-modal="true" aria-label={t('Navigation')} ref={menuRef}>
      <div className="reference-mobile-heading"><span>{t('Navigation')}</span><AnimatedButton animationVariant="icon" aria-label={t('Menü schließen')} onClick={() => setMobileMenuOpen(false)}><X size={23} /></AnimatedButton></div>
      <nav>{links.map((link, index) => <AnimatedButton key={link.target} onClick={() => navigate(link.target)}><span className="mobile-link-number">0{index + 1}</span>{t(link.label)}</AnimatedButton>)}</nav>
      <AnimatedButton className="reference-primary" onClick={() => navigate('section-13')}>{t('Jetzt für die Academy bewerben')}</AnimatedButton>
    </div>}
  </header>;
};
