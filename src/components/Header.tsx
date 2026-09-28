import { SlideButton } from './SlideButton';
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Sliders } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenAssetGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onNavigate,
  onOpenAssetGuide
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  const navLinks = [
    { label: 'The System', target: 'section-4' },
    { label: 'How It Works', target: 'section-8' },
    { label: 'Meet Kata', target: 'section-3' },
    { label: 'Opportunities', target: 'section-10' },
    { label: 'Apply', target: 'section-13' },
  ];

  const handleLinkClick = (targetId: string) => {
    setMobileMenuOpen(false);
    onNavigate(targetId);
  };

  return (
    <header
      id="main-header"
      className="fixed top-0 inset-x-0 z-50"
    >
      <div className={`transition-colors duration-300 ${isScrolled || mobileMenuOpen ? 'bg-[#050907]/95 backdrop-blur-xl' : 'bg-transparent'}`}>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-[44px_1fr_44px] lg:grid-cols-[1fr_auto_1fr] items-center gap-2 lg:gap-6 min-h-[72px] lg:min-h-[80px] border-b border-white/[0.07]">
            <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-5 xl:gap-8 text-xs text-white/85">
              {[
                { label: 'The System', target: 'section-4' },
                { label: 'How It Works', target: 'section-8' },
                { label: 'Opportunities', target: 'section-10' },
              ].map((item) => (
                <button key={item.label} onClick={() => handleLinkClick(item.target)} className="py-3 whitespace-nowrap hover:text-[#63DCA8] transition-colors">
                  {item.label}
                </button>
              ))}
            </nav>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex items-center justify-center w-11 h-11 text-white/85 hover:text-white"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <button
              onClick={() => handleLinkClick('section-1')}
              className="justify-self-center text-white whitespace-nowrap"
              aria-label="Kata x SnapSell Academy home"
            >
              <span className="font-editorial text-[23px] sm:text-[27px] xl:text-[30px] tracking-tight">Kata <span className="text-[#AFD9BF] text-base align-middle mx-1">×</span> SnapSell</span>
            </button>

            <div className="hidden lg:flex items-center justify-end gap-5 xl:gap-8 text-xs">
              <button onClick={() => handleLinkClick('section-3')} className="py-3 text-white/85 hover:text-[#63DCA8] transition-colors whitespace-nowrap">Meet Kata</button>
              <button onClick={() => handleLinkClick('section-9')} className="py-3 text-white/85 hover:text-[#63DCA8] transition-colors">Our Team</button>
              <button
                id="header-join-cta"
                onClick={() => handleLinkClick('section-13')}
                className="px-4 py-2.5 rounded-xl bg-[#2d8554] hover:bg-[#369d64] text-white font-semibold transition-colors whitespace-nowrap"
              >
                Join Academy
              </button>
            </div>
            <span className="lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Full-screen Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="fixed inset-x-4 sm:inset-x-6 top-[84px] bottom-4 overflow-y-auto rounded-2xl bg-[#050907]/98 backdrop-blur-xl z-40 lg:hidden flex flex-col justify-between p-6 border-t border-white/10 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="space-y-6 pt-4">
            <div className="text-xs uppercase tracking-widest text-[#63DCA8] font-semibold">
              Navigation
            </div>
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <SlideButton
                  key={link.label}
                  onClick={() => handleLinkClick(link.target)}
                  className="text-left text-2xl font-bold font-display text-white hover:text-[#63DCA8] transition-colors py-2 border-b border-white/5 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-white/40" />
                </SlideButton>
              ))}
            </div>

            <div className="pt-4 space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAssetGuide();
                }}
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm"
              >
                <span className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-[#63DCA8]" />
                  <span>Approved Asset Slots & Guide</span>
                </span>
                <span className="text-xs text-white/40">Inspect</span>
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-8 pb-6 border-t border-white/10">
            <button
              onClick={() => handleLinkClick('section-13')}
              className="w-full py-4 rounded-full bg-[#63DCA8] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-[#63DCA8]/30"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join the Academy</span>
            </button>
            <p className="text-center text-xs text-white/50">
              Kata x SnapSell Academy — Built for ambitious creators.
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
