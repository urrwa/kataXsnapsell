import React from 'react';
import { BeforeAfterSlider } from '../BeforeAfterSlider';
import { Camera, Film, Palette, Scissors, Sparkles } from 'lucide-react';

export const ProductionsSection: React.FC = () => {
  const CREATIVE_ROLES = [
    { title: "Photographers", icon: Camera },
    { title: "Filmmakers", icon: Film },
    { title: "Creative Directors", icon: Palette },
    { title: "Styling Teams", icon: Scissors }
  ];

  return (
    <section
      id="section-11"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Professional Productions"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PREMIUM CONTENT</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            Work With <span className="text-[#63DCA8] inline-block">World-Class Creatives</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Create a professional portfolio with experienced international photographers, filmmakers and production teams.
          </p>

          {/* 4 Role Tags */}
          <div className="flex flex-wrap justify-center gap-2.5 pt-2">
            {CREATIVE_ROLES.map((role, idx) => {
              const Icon = role.icon;
              return (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-white/90 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#63DCA8]" />
                  <span>{role.title}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Before/After Production Slider */}
        <BeforeAfterSlider />

        {/* Supporting Line Callout */}
        <div className="p-3.5 rounded-2xl bg-[#101C14] border border-white/10 text-xs sm:text-sm font-semibold text-white max-w-md">
          “Content designed to make your personal brand stand out.”
        </div>
      </div>
    </section>
  );
};
