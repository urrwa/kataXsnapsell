import React from 'react';
import { ContentBranchingVisual } from '../ContentBranchingVisual';
import { Sparkles, ShieldCheck, Check } from 'lucide-react';

export const AiContentSection: React.FC = () => {
  const OUTPUT_LABELS = [
    "Realistic AI Photos",
    "Short Videos",
    "Reels and Stories",
    "Lifestyle Content",
    "Scripts and Captions",
    "Multilingual Content"
  ];

  return (
    <section
      id="section-6"
      className="landing-section bg-[#080F0A] px-4 sm:px-6 lg:px-8"
      aria-label="Pillar 02: AI Content Creation"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PILLAR 02</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1">
            Create More <span className="text-[#63DCA8] inline-block">Without Filming Every Day</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Turn your approved identity and style into content for all your important channels.
          </p>

          {/* 6 Output Labels Pills */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {OUTPUT_LABELS.map((label, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 flex items-center gap-1.5"
              >
                <Check className="w-3 h-3 text-[#63DCA8]" />
                <span>{label}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Dominant Visual: Center Creator Identity Branching */}
        <ContentBranchingVisual />

        {/* Trust Line & Main Benefit Banner */}
        <div className="max-w-xl w-full flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#101C14] border border-white/10 text-left">
          <div className="space-y-0.5">
            <div className="text-xs font-bold text-white font-display">
              “Stay visible without creating every post yourself.”
            </div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>You approve your identity, style and final content.</span>
            </div>
          </div>
          <span className="text-[10px] uppercase font-mono font-bold bg-[#63DCA8]/10 text-[#63DCA8] px-2.5 py-1 rounded-full whitespace-nowrap">
            100% Protected
          </span>
        </div>
      </div>
    </section>
  );
};
