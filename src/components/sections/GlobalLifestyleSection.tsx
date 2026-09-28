import { SlideButton } from '../SlideButton';
import React, { useState } from 'react';
import { Globe, ArrowUpRight, MapPin, Camera, Users, Sparkles, Building2 } from 'lucide-react';

interface GlobalLifestyleSectionProps {
  onExploreOpportunities: () => void;
}

const DESTINATIONS = [
  {
    num: '01',
    icon: Camera,
    title: 'International Shoots',
    tagline: 'Mediterranean Coastal Villas',
    location: 'French Riviera & Balearics',
    desc: 'Curated multi-day photography sets with international lighting crews and natural golden-hour backdrops.',
    coords: '43.7° N, 7.2° E',
    accent: '#63DCA8',
  },
  {
    num: '02',
    icon: Building2,
    title: 'Premium Locations',
    tagline: 'Modern Architectural Sanctuaries',
    location: 'Zurich & Milan Penthouses',
    desc: 'High-contrast minimalist spaces crafted specifically for luxury lifestyle branding and editorial lookbooks.',
    coords: '45.4° N, 9.1° E',
    accent: '#63DCA8',
  },
  {
    num: '03',
    icon: Sparkles,
    title: 'Creator Events',
    tagline: 'Private Masterclass Summits',
    location: 'Dubai & London Salons',
    desc: 'Intimate roundtables, live AI workflow intensives, and private strategy sessions led directly by Kata.',
    coords: '25.2° N, 55.2° E',
    accent: '#63DCA8',
  },
  {
    num: '04',
    icon: Users,
    title: 'Global Networking',
    tagline: 'Empowered Creator Collective',
    location: 'Worldwide Community',
    desc: 'Collaborate with trusted, ambitious female peers building high-value independent media businesses.',
    coords: 'Worldwide',
    accent: '#63DCA8',
  },
];

export const GlobalLifestyleSection: React.FC<GlobalLifestyleSectionProps> = ({
  onExploreOpportunities,
}) => {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="section-10"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Global Creator Lifestyle"
    >
      <div className="max-w-6xl mx-auto w-full flex flex-col items-center space-y-14">

        {/* Header */}
        <div className="text-center max-w-2xl space-y-4">
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
            <span className="h-px w-8 bg-white/20" />
            <Globe className="w-3 h-3 text-[#63DCA8]" />
            <span className="text-[#63DCA8]">More Possibilities</span>
            <span className="h-px w-8 bg-white/20" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-[1.1]">
            The World Is{' '}
            <span className="text-[#63DCA8]">Your Studio</span>
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Selected members access international productions, creator trips, events and professional collaborations.
          </p>
        </div>

        {/* Destination Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] rounded-2xl overflow-hidden border border-white/[0.06]">
          {DESTINATIONS.map((item, idx) => {
            const Icon = item.icon;
            const isActive = active === idx;
            return (
              <div
                key={idx}
                onMouseEnter={() => setActive(idx)}
                onMouseLeave={() => setActive(null)}
                className={`group relative flex flex-col gap-5 p-8 cursor-default transition-colors duration-300 ${
                  isActive ? 'bg-[#0D1A12]' : 'bg-[#080F0A]'
                }`}
              >
                {/* Number + Icon row */}
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-bold tracking-widest text-white/20 tabular-nums">
                    {item.num}
                  </span>
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-colors duration-300 ${
                      isActive
                        ? 'bg-[#63DCA8]/15 border-[#63DCA8]/40'
                        : 'bg-white/[0.04] border-white/10'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive ? 'text-[#63DCA8]' : 'text-white/40'
                      }`}
                      strokeWidth={1.8}
                    />
                  </div>
                </div>

                {/* Text content */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-widest text-[#63DCA8]/70 uppercase flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </p>
                  <h3 className="text-xl font-bold font-display text-white leading-snug">
                    {item.title}
                  </h3>
                  <p
                    className={`text-xs font-semibold transition-colors duration-300 ${
                      isActive ? 'text-[#63DCA8]' : 'text-white/30'
                    }`}
                  >
                    {item.tagline}
                  </p>
                  <p className="text-sm text-white/50 leading-relaxed pt-1">
                    {item.desc}
                  </p>
                </div>

                {/* Coordinates footer */}
                <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-center justify-between">
                  <span className="text-[10px] text-white/20 font-mono tracking-wider">
                    {item.coords}
                  </span>
                  <ArrowUpRight
                    className={`w-4 h-4 transition-all duration-300 ${
                      isActive ? 'text-[#63DCA8] translate-x-0.5 -translate-y-0.5' : 'text-white/10'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <SlideButton
            id="explore-opportunities-btn"
            onClick={onExploreOpportunities}
            className="px-7 py-3.5 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-[#050907] font-bold text-sm flex items-center gap-2 shadow-xl shadow-[#63DCA8]/20 transition-all active:scale-95"
          >
            <span>Explore Opportunities</span>
            <ArrowUpRight className="w-4 h-4" />
          </SlideButton>
          <p className="text-[11px] text-white/30">
            * Opportunities depend on selection, availability and individual agreements.
          </p>
        </div>
      </div>
    </section>
  );
};
