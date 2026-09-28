import React, { useEffect, useRef } from 'react';
import { X, Shield, FileText, Scale, Mail, Sliders, CheckCircle2 } from 'lucide-react';
import { ASSET_SLOTS } from '../data/content';

export type ModalType = 'privacy' | 'terms' | 'legal' | 'contact' | 'assets' | null;

interface ModalProps {
  type: ModalType;
  onClose: () => void;
}

export const Modal: React.FC<ModalProps> = ({ type, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!type) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialogRef.current?.querySelector<HTMLButtonElement>('button')?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const items = dialogRef.current?.querySelectorAll<HTMLElement>('button, a[href], input, select, [tabindex="0"]');
      if (!items?.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKey);
    return () => { document.removeEventListener('keydown', handleKey); document.body.style.overflow = previousOverflow; previousFocus?.focus(); };
  }, [type, onClose]);
  if (!type) return null;

  const renderContent = () => {
    switch (type) {
      case 'privacy':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#63DCA8] font-bold text-base">
              <Shield className="w-5 h-5" />
              <span>Privacy Policy & Data Security</span>
            </div>
            <p>
              Kata x SnapSell Academy prioritizes creator privacy, identity ownership, and subscriber data integrity. We do not sell your personal information or content assets to third-party ad networks.
            </p>
            <h4 className="font-bold text-white text-sm">1. Creator Identity & AI Training Security</h4>
            <p>
              Your reference photographs, audio samples, and brand persona data are stored in private, isolated enterprise infrastructure. They are exclusively utilized for training your authorized AI chat assistants and generative media models. You retain 100% intellectual property ownership of your approved identity likeness.
            </p>
            <h4 className="font-bold text-white text-sm">2. Information Collection</h4>
            <p>
              When applying or utilizing SnapSell checkout links, we collect name, email address, social handle, and transaction data required for identity verification, payouts, and customer support.
            </p>
            <h4 className="font-bold text-white text-sm">3. Direct Payment Processing</h4>
            <p>
              Transactions through SnapSell are processed by Level 1 PCI-compliant banking and merchant partners (e.g. Stripe, Apple Pay). Sensitive credit card information is never stored directly on our servers.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#63DCA8] font-bold text-base">
              <FileText className="w-5 h-5" />
              <span>Terms of Service</span>
            </div>
            <p>
              Welcome to Kata x SnapSell Academy. By accessing our platform, learning curriculum, or SnapSell commerce tools, you agree to comply with these terms.
            </p>
            <h4 className="font-bold text-white text-sm">1. Age Requirement & Eligibility</h4>
            <p>
              Academy access and SnapSell merchant tools are strictly restricted to verified individuals aged 18 years or older. Applications with unverified age status will be rejected.
            </p>
            <h4 className="font-bold text-white text-sm">2. Content Compliance & Acceptable Use</h4>
            <p>
              All published media, photoshoots, and direct sales packages must comply with applicable regional legal standards. Fraudulent, non-consensual, or malicious content is strictly prohibited and results in immediate termination of account access.
            </p>
            <h4 className="font-bold text-white text-sm">3. Income & Growth Disclaimer</h4>
            <p>
              Any revenue targets (such as $20,000/month milestones) are illustrative aspirational goals and do not constitute a guarantee of income. Individual creator results vary according to audience engagement, pricing, offer quality, and execution.
            </p>
          </div>
        );

      case 'legal':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#63DCA8] font-bold text-base">
              <Scale className="w-5 h-5" />
              <span>Legal Notice & Earnings Disclosure</span>
            </div>
            <p className="text-white">
              Kata x SnapSell Academy operates as a premium creator education, technology enablement, and commerce ecosystem.
            </p>
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-200">
              <strong>Statutory Earnings Disclaimer:</strong> Any revenue examples or targets shown on this website are illustrative and are not guarantees of future results. Individual performance varies based on personal effort, market conditions, and consistency.
            </div>
            <h4 className="font-bold text-white text-sm">International Productions & Opportunities</h4>
            <p>
              Access to international photoshoots, luxury retreats, and creative agency services are subject to separate selective qualification, availability, travel visas, and bilateral agreements.
            </p>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#63DCA8] font-bold text-base">
              <Mail className="w-5 h-5" />
              <span>Contact Academy Advisory</span>
            </div>
            <p>
              Have specific questions about coaching tiers, AI identity setup, or SnapSell integration? Our creator concierge team is here to assist.
            </p>
            <div className="space-y-2 p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-xs text-white/50">Direct Admissions Inquiries</div>
              <div className="text-white font-mono font-bold text-sm sm:text-base">concierge@kata-academy.com</div>
              <div className="text-xs text-white/50 pt-2">Office Locations</div>
              <div className="text-white text-xs">Zurich • Dubai • London • Singapore</div>
            </div>
          </div>
        );

      case 'assets':
        return (
          <div className="space-y-4 text-xs sm:text-sm text-white/80 leading-relaxed">
            <div className="flex items-center gap-2 text-[#63DCA8] font-bold text-base">
              <Sliders className="w-5 h-5" />
              <span>Media & Asset Slot Integration Guide</span>
            </div>
            <p>
              All visual assets in the Kata x SnapSell Academy build have been decoupled and configured with descriptive slots, alt text, and responsive aspect ratios. Replace these URLs in <code className="text-[#63DCA8] bg-black/60 px-1.5 py-0.5 rounded">src/data/content.ts</code> with approved photographer deliverables:
            </p>
            <div className="space-y-2.5 max-h-[340px] overflow-y-auto pr-1">
              {Object.entries(ASSET_SLOTS).map(([key, val]) => (
                <div key={key} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-3">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{val.slotName}</span>
                    </div>
                    <div className="text-[11px] text-white/50 mt-0.5">{val.alt}</div>
                    <div className="text-[10px] font-mono text-[#AFD9BF] mt-1 truncate max-w-xs">{val.src}</div>
                  </div>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/70 font-mono">
                    Slot
                  </span>
                </div>
              ))}
            </div>
          </div>
        );
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${type} information`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto bg-[#101C14] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {renderContent()}

        <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
