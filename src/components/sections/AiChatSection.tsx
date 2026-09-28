import React from 'react';
import { InteractiveChatMockup } from '../InteractiveChatMockup';
import { CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

export const AiChatSection: React.FC = () => {
  const BENEFIT_CHIPS = [
    "Answers common questions",
    "Understands buyer interests",
    "Recommends suitable content",
    "Sends SnapSell links",
    "Follows up automatically",
    "Transfers important chats"
  ];

  return (
    <section
      id="section-5"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Pillar 01: AI Chat Support"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Copy & Animated Benefit Chips */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>PILLAR 01</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            Stay Available <br />
            <span className="text-[#63DCA8] inline-block">Without Being Online All Day</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Your AI assistant supports repetitive conversations and guides interested buyers toward the right offer.
          </p>

          {/* 6 Benefit Chips */}
          <div className="space-y-2 pt-2">
            <div className="text-xs uppercase tracking-wider text-white/40 font-semibold">
              Autonomous Chat Capabilities:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BENEFIT_CHIPS.map((chip, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#101C14] border border-white/5 hover:border-[#63DCA8]/30 transition-colors text-xs text-white/90"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#63DCA8] shrink-0" />
                  <span>{chip}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Benefit Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#142219] to-[#201822] border-l-4 border-[#63DCA8] border-y border-r border-white/10 text-left">
            <div className="text-[11px] uppercase tracking-wider text-[#63DCA8] font-bold">Key Outcome</div>
            <div className="text-base sm:text-lg font-bold font-display text-white mt-0.5">
              “More conversations. Less repetitive messaging.”
            </div>
          </div>
        </div>

        {/* Right Column: Dominant Smartphone Chat Mockup */}
        <div className="lg:col-span-6 flex justify-center items-center">
          <InteractiveChatMockup />
        </div>
      </div>
    </section>
  );
};
