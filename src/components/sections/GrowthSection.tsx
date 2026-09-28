import React from 'react';
import { DashboardVisual } from '../DashboardVisual';
import { TrendingUp, Check, AlertCircle } from 'lucide-react';

export const GrowthSection: React.FC = () => {
  const GROWTH_DRIVERS = [
    "Consistent Content",
    "Faster Conversations",
    "Premium Offers",
    "Direct Sales",
    "Product Bundles",
    "Returning Buyers"
  ];

  return (
    <section
      id="section-12"
      className="landing-section bg-[#080F0A] px-4 sm:px-6 lg:px-8"
      aria-label="Growth Potential"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>YOUR GROWTH PATH</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            Build Your Path <span className="text-[#63DCA8] inline-block">Toward $20K Months</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Create the content, conversation and sales systems needed to pursue ambitious growth.
          </p>

          {/* 6 Compact Growth Drivers */}
          <div className="flex flex-wrap justify-center gap-2 pt-2">
            {GROWTH_DRIVERS.map((driver, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/90 flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5 text-[#63DCA8]" />
                <span>{driver}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Dominant Creator Business Dashboard Visual with Visible Income Target Disclaimer */}
        <DashboardVisual />

        {/* Highlight Statement */}
        <div className="p-4 rounded-2xl bg-[#101C14] border border-white/10 text-sm sm:text-base font-bold font-display text-white max-w-lg">
          “Build a business that can grow beyond your personal working hours.”
        </div>
      </div>
    </section>
  );
};
