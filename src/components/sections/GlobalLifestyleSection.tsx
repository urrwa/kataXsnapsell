import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useState, useEffect, useRef } from 'react';
import { MexicoExperience } from '../BriefAdditions';
import { Globe, ArrowUpRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

interface GlobalLifestyleSectionProps {
  onExploreOpportunities: () => void;
}

const DESTINATIONS = [
  {
    title: "Internationale Produktionen",
    tagline: "Professionelle Fotos und Videos",
    location: "Ausgewählte Locations",
    image: "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=900&auto=format&fit=crop",
    desc: "Erstelle hochwertigen Content mit professionellen Fotografen und Videoteams."
  },
  {
    title: "Filmreife Shootings",
    tagline: "Premium-Content an besonderen Orten",
    location: "Internationale Möglichkeiten",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=900&auto=format&fit=crop",
    desc: "Produziere Premium-Fotos und Videos an ausgewählten Locations."
  },
  {
    title: "Creator-Events in Europa",
    tagline: "Lernen und vernetzen",
    location: "Europa",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",
    desc: "Lerne andere Creatorinnen, Partner und Branchenexperten kennen."
  },
  {
    title: "Creator Networking",
    tagline: "Katharina Creator Circle",
    location: "Internationale Community",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=900&auto=format&fit=crop",
    desc: "Baue wertvolle Kontakte und internationale Partnerschaften auf."
  }
];

export const GlobalLifestyleSection: React.FC<GlobalLifestyleSectionProps> = ({
  onExploreOpportunities
}) => {
  useLanguage();

  const [currentIndex, setCurrentIndex] = useState(0);

  const [paused, setPaused] = useState(false);
  const touchStart = useRef(0);
  useEffect(() => { if (paused || matchMedia('(prefers-reduced-motion: reduce)').matches) return; const timer = setInterval(() => setCurrentIndex(c => (c + 1) % DESTINATIONS.length), 7000); return () => clearInterval(timer); }, [paused]);
  const prev = () => setCurrentIndex((c) => (c === 0 ? DESTINATIONS.length - 1 : c - 1));
  const next = () => setCurrentIndex((c) => (c === DESTINATIONS.length - 1 ? 0 : c + 1));

  return (
    <section
      id="section-11"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Global Creator Lifestyle")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Header Block */}
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>{t("KATHARINA CREATOR CIRCLE")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white leading-[1.15] pb-1 overflow-visible">{t(" Lerne online. Wachse gemeinsam. ")}<span className="text-[#20C997] inline-block">{t("Erschaffe Content weltweit.")}</span>
          </h2>

          <p className="text-sm sm:text-base text-white/80 max-w-xl mx-auto">{t(" Ausgewählte Academy-Mitglieder können Zugang zu besonderen Community- und Produktionsmöglichkeiten erhalten. ")}</p>
        </div>

        {/* 4 Visual Opportunity Cards (Grid on desktop, carousel on mobile) */}
        <div className="hidden lg:flex gap-4 w-full overflow-x-auto pb-3">
          {t([...DESTINATIONS.slice(currentIndex), ...DESTINATIONS.slice(0,currentIndex)].map((item, idx) => (
            <div
              key={idx}
              className="group relative shrink-0 w-[calc(25%-12px)] h-[380px] rounded-3xl overflow-hidden border border-white/10 hover:border-[#20C997]/60 transition-all duration-300 shadow-xl flex flex-col justify-end p-5 text-left bg-black"
            >
              <img loading="lazy"
                src={item.image}
                alt={t(item.title)}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              <div className="relative z-10 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[11px] text-[#D7BE8A] font-semibold">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{t(item.location)}</span>
                </div>
                <h4 className="text-lg font-bold font-display text-white">{t(item.title)}</h4>
                <div className="text-xs text-[#20C997] font-medium">{t(item.tagline)}</div>
                <p className="text-[11px] text-white/70 line-clamp-2 pt-1">{t(item.desc)}</p>
              </div>
            </div>
          )))}
        </div>

        {/* Mobile / Tablet Carousel View */}
        <div onTouchStart={e => { setPaused(true); touchStart.current = e.touches[0].clientX; }} onTouchEnd={e => { const dx = e.changedTouches[0].clientX - touchStart.current; if (Math.abs(dx) > 40) dx > 0 ? prev() : next(); }} className="lg:hidden w-full max-w-md relative">
          <div className="relative h-[360px] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black flex flex-col justify-end p-6 text-left">
            <img
              src={DESTINATIONS[currentIndex].image}
              alt={t(DESTINATIONS[currentIndex].title)}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <div className="relative z-10 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs text-[#D7BE8A] font-semibold">
                <MapPin className="w-3.5 h-3.5" />
                <span>{t(DESTINATIONS[currentIndex].location)}</span>
              </div>
              <h4 className="text-xl font-bold font-display text-white">{t(DESTINATIONS[currentIndex].title)}</h4>
              <div className="text-xs text-[#20C997] font-medium">{t(DESTINATIONS[currentIndex].tagline)}</div>
              <p className="text-xs text-white/70 pt-1">{t(DESTINATIONS[currentIndex].desc)}</p>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-between mt-3 px-2">
            <AnimatedButton animationVariant="icon"
              onClick={() => {setPaused(true);prev();}}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label={t("Vorherige Experience")}
            >
              <ChevronLeft className="w-4 h-4" />
            </AnimatedButton>
            <div className="flex gap-1.5">
              {t(DESTINATIONS.map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${i === currentIndex ? 'w-5 bg-[#20C997]' : 'bg-white/20'}`}
                />
              )))}
            </div>
            <AnimatedButton animationVariant="icon"
              onClick={() => {setPaused(true);next();}}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              aria-label={t("Nächste Experience")}
            >
              <ChevronRight className="w-4 h-4" />
            </AnimatedButton>
          </div>
        </div>

        <AnimatedButton onClick={() => setPaused(!paused)} className="text-xs text-white/70 border border-white/15 rounded-full px-4 py-2">{t(paused ? 'Experience-Slider starten' : 'Experience-Slider pausieren')}</AnimatedButton>
        <p className="text-xs text-white/50">{t("Stimmungsbilder · keine dokumentierten Academy-Events.")}</p>
        <MexicoExperience />
        {/* CTA Button & Mandatory Qualification Line */}
        <div className="space-y-3 max-w-xl">
          <AnimatedButton
            animateArrow id="explore-opportunities-btn"
            onClick={() => document.getElementById('mexico-experience')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'})}
            className="px-7 py-3.5 rounded-full bg-[#20C997] hover:bg-[#169B74] text-white font-bold text-sm flex items-center gap-2 mx-auto shadow-xl shadow-[#20C997]/20 transition-all active:scale-95"
          >
            <span>{t("Creator Circle entdecken")}</span>
            
          </AnimatedButton>

          <p className="text-sm text-white/70 leading-relaxed">{t(" Internationale Experiences sind für ausgewählte, verifizierte Mitglieder verfügbar. Teilnahme, Leistungen, Termine und Kosten hängen vom jeweiligen Programm, der Verfügbarkeit und individuellen Vereinbarungen ab. ")}</p>
        </div>
      </div>
    </section>
  );
};
