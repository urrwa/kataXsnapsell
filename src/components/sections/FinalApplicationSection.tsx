import { SlideButton } from '../SlideButton';
import React from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { ApplicationForm } from '../ApplicationForm';
import { Sparkles, MessageSquare, ShoppingBag, Users, Globe, ArrowUpRight } from 'lucide-react';

interface FinalApplicationSectionProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

export const FinalApplicationSection: React.FC<FinalApplicationSectionProps> = ({
  onOpenModal,
  onSuccessReturn
}) => {
  const scrollToForm = () => {
    const input = document.getElementById('first-name-input');
    if (input) {
      input.focus();
      input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section
      id="section-13"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Join Kata's Academy & Application"
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img loading="lazy" decoding="async"
          src={ASSET_SLOTS.finalCommunity.src}
          alt={ASSET_SLOTS.finalCommunity.alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-20 filter contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050907] via-[#050907]/90 to-[#050907]/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Final Pitch, Three Pillars, Secondary Benefits & Buttons */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>YOUR NEXT CHAPTER</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-display text-white leading-[1.08] pb-1 overflow-visible">
            Ready to Stop <br />
            <span className="text-[#63DCA8] inline-block">Doing It All Alone?</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Join Kata’s SnapSell Academy and build your creator business with AI, direct sales and professional support.
          </p>

          {/* Three Primary Pillars Displayed Again */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
              The Three Core Pillars:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <MessageSquare className="w-4 h-4 text-[#63DCA8] shrink-0" />
                <span>AI Chat Support</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <Sparkles className="w-4 h-4 text-[#63DCA8] shrink-0" />
                <span>AI Content Creation</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-white">
                <ShoppingBag className="w-4 h-4 text-[#63DCA8] shrink-0" />
                <span>Direct Sales With SnapSell</span>
              </div>
            </div>
          </div>

          {/* Two Secondary Benefits */}
          <div className="space-y-2 pt-1">
            <div className="text-[11px] uppercase tracking-wider text-white/50 font-semibold">
              Included Growth Ecosystem:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-white/80">
                <Users className="w-4 h-4 text-[#AFD9BF] shrink-0" />
                <span>Professional Team Support</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-white/80">
                <Globe className="w-4 h-4 text-[#AFD9BF] shrink-0" />
                <span>International Opportunities</span>
              </div>
            </div>
          </div>

          {/* Primary & Secondary Call to Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <SlideButton
              onClick={scrollToForm}
              className="px-6 py-3.5 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-[#63DCA8]/25 active:scale-95 transition-all"
            >
              <span>Join Kata’s Academy</span>
              <ArrowUpRight className="w-4 h-4" />
            </SlideButton>

            <button
              onClick={scrollToForm}
              className="px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-all"
            >
              <span>Apply Now</span>
            </button>
          </div>

          {/* Final Line */}
          <p className="text-sm font-semibold font-display text-white/90 pt-2">
            “Create more. Automate the manual work. Sell directly. Live with greater freedom.”
          </p>
        </div>

        {/* Right Column: Application Form */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <ApplicationForm
            onOpenModal={onOpenModal}
            onSuccessReturn={onSuccessReturn}
          />
        </div>
      </div>
    </section>
  );
};
