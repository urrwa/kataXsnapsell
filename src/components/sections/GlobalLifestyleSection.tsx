import { EDITORIAL_IMAGES } from '../../data/images';
import { SlideButton } from '../SlideButton';
import React, { useState } from 'react';
import { Globe, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface GlobalLifestyleSectionProps {
  onExploreOpportunities: () => void;
}

const DESTINATIONS = [
  {
    title: "International Shoots",
    tagline: "Mediterranean Coastal Villas",
    location: "French Riviera & Balearics",
    image: EDITORIAL_IMAGES.retreat.src,
    desc: "Curated multi-day photography sets with international lighting crews and natural golden-hour backdrops."
  },
  {
    title: "Premium Locations",
    tagline: "Modern Architectural Sanctuaries",
    location: "Zurich & Milan Penthouses",
    image: EDITORIAL_IMAGES.interior.src,
    desc: "High-contrast minimalist spaces crafted specifically for luxury lifestyle branding and editorial lookbooks."
  },
  {
    title: "Creator Events",
    tagline: "Private Masterclass Summits",
    location: "Dubai & London Salons",
    image: EDITORIAL_IMAGES.team.src,
    desc: "Intimate roundtables, live AI workflow intensives, and private strategy sessions led directly by Kata."
  },
  {
    title: "Global Networking",
    tagline: "Empowered Creator Collective",
    location: "Worldwide Community",
    image: EDITORIAL_IMAGES.network.src,
    desc: "Collaborate with trusted, ambitious female peers building high-value independent media businesses."
  }
];

export const GlobalLifestyleSection: React.FC<GlobalLifestyleSectionProps> = ({
  onExploreOpportunities
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => setCurrentIndex((c) => (c === 0 ? DESTINATIONS.length - 1 : c - 1));
  const next = () => setCurrentIndex((c) => (c === DESTINATIONS.length - 1 ? 0 : c + 1));

  return (
    <section
      id="section-10"
      className="landing-section bg-[#080F0A] px-4 sm:px-6 lg:px-8"
      aria-label="Global Creator Lifestyle"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Header Block */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#63DCA8]/10 border border-[#63DCA8]/30 text-[#63DCA8] text-xs font-bold tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>MORE POSSIBILITIES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">
            Create Content <span className="text-[#63DCA8] inline-block">Around the World</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">
            Selected members may access international productions, creator trips, events and professional collaborations.
          </p>
        </div>

        {/* 4 Visual Opportunity Cards (Grid on desktop, carousel on mobile) */}
        <div className="hidden lg:grid grid-cols-4 gap-4 w-full">
          {DESTINATIONS.map((item, idx) => (
            <div
              key={idx}
              className="group relative h-[380px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#63DCA8]/60 transition-all duration-300 shadow-xl flex flex-col justify-end p-5 text-left bg-black"
            >
              <img loading="lazy" decoding="async"
                src={item.image}
                alt={item.title}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#AFD9BF] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{item.location}</span>
                </div>
                <h4 className="text-lg font-bold font-display text-white">{item.title}</h4>
                <div className="text-xs text-[#63DCA8] font-medium">{item.tagline}</div>
                <p className="text-[11px] text-white/70 line-clamp-2 pt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile / Tablet Carousel View */}
        <div className="lg:hidden w-full max-w-md relative">
          <div className="relative h-[360px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black flex flex-col justify-end p-6 text-left">
            <img loading="lazy" decoding="async"
              src={DESTINATIONS[currentIndex].image}
              alt={DESTINATIONS[currentIndex].title}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#AFD9BF] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{DESTINATIONS[currentIndex].location}</span>
              </div>
              <h4 className="text-xl font-bold font-display text-white">{DESTINATIONS[currentIndex].title}</h4>
              <div className="text-xs text-[#63DCA8] font-medium">{DESTINATIONS[currentIndex].tagline}</div>
              <p className="text-xs text-white/70 pt-1">{DESTINATIONS[currentIndex].desc}</p>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-3 px-2">
            <button
              onClick={prev}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Previous destination"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {DESTINATIONS.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? 'w-5 bg-[#63DCA8]' : 'bg-white/20'}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label="Next destination"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CTA Button & Mandatory Qualification Line */}
        <div className="space-y-3 max-w-xl">
          <SlideButton
            id="explore-opportunities-btn"
            onClick={onExploreOpportunities}
            className="px-7 py-3.5 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-bold text-sm flex items-center gap-2 mx-auto shadow-xl shadow-[#63DCA8]/20 transition-all active:scale-95"
          >
            <span>Explore Opportunities</span>
            <ArrowUpRight className="w-4 h-4" />
          </SlideButton>

          <p className="text-[11px] text-white/50 leading-relaxed">
            * Opportunities depend on selection, availability and individual agreements.
          </p>
        </div>
      </div>
    </section>
  );
};
