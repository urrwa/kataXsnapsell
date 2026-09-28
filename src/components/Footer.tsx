import React from 'react';
import { ModalType } from './Modal';
import { Instagram, Youtube, Sparkles } from 'lucide-react';

interface FooterProps {
  onOpenModal: (type: ModalType) => void;
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenModal, onNavigate }) => {
  return (
    <footer id="main-footer" className="bg-[#050505] border-t border-white/10 py-10 sm:py-14 text-white/60 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/5 pb-8">
          <div className="space-y-1.5 text-left">
            <button
              onClick={() => onNavigate('section-1')}
              className="flex items-center gap-2 text-white font-extrabold font-display text-lg tracking-wider"
            >
              <span>Kata</span>
              <span className="text-[#63DCA8]">×</span>
              <span>SnapSell</span>
              <span className="text-white/40 font-normal text-sm font-sans">Academy</span>
            </button>
            <p className="text-white/50 text-xs max-w-sm">
              AI Chat Support • AI Content Creation • Direct Sales With SnapSell
            </p>
          </div>

          {/* Navigation & Legal Links */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/70">
            <button onClick={() => onOpenModal('privacy')} className="hover:text-white transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onOpenModal('terms')} className="hover:text-white transition-colors">
              Terms of Service
            </button>
            <button onClick={() => onOpenModal('legal')} className="hover:text-white transition-colors">
              Legal Notice
            </button>
            <button onClick={() => onOpenModal('contact')} className="hover:text-white transition-colors">
              Contact
            </button>
            <button onClick={() => onOpenModal('assets')} className="hover:text-[#63DCA8] transition-colors flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#63DCA8]" />
              <span>Asset Slots</span>
            </button>
          </div>

          {/* Social Placeholders */}
          <div className="flex items-center gap-3">
            <a
              href="#social-instagram"
              title="Instagram"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#63DCA8] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="Instagram link"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#social-youtube"
              title="YouTube"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#63DCA8] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10"
              aria-label="YouTube link"
            >
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="#social-threads"
              title="Threads"
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-[#63DCA8] text-white/80 hover:text-white flex items-center justify-center transition-colors border border-white/10 text-[11px] font-bold"
              aria-label="Threads link"
            >
              @
            </a>
          </div>
        </div>

        {/* Mandatory Footer Earnings Disclaimer & Copyright */}
        <div className="space-y-3 text-left">
          <p className="text-[11px] text-white/40 leading-relaxed max-w-4xl">
            <strong>Earnings Disclaimer:</strong> Any revenue examples or targets shown on this website are illustrative and are not guarantees of future results. Individual performance varies according to creator niche, effort, consistency, audience demand, and market conditions.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-white/40 pt-2">
            <div>© {new Date().getFullYear()} Kata x SnapSell Academy. All rights reserved.</div>
            <div className="text-white/30">Feminine • Technology-Driven • Premium Creator Infrastructure</div>
          </div>
        </div>
      </div>
    </footer>
  );
};
