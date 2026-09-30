import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useState } from 'react';
import { MexicoExperience } from '../BriefAdditions';
import { Globe, MapPin } from 'lucide-react';

import '../../creator-circle.css';

interface GlobalLifestyleSectionProps {
  onExploreOpportunities: () => void;
}

const DESTINATIONS = [
  {
    title: "Internationale Produktionen",
    tagline: "Professionelle Fotos und Videos",
    location: "Ausgewählte Locations",
    image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=1000",
    desc: "Erstelle hochwertigen Content mit professionellen Fotografen und Videoteams."
  },
  {
    title: "Filmreife Shootings",
    tagline: "Premium-Content an besonderen Orten",
    location: "Internationale Möglichkeiten",
    image: "https://images.unsplash.com/photo-1543175741-80199a6408b4?q=85&w=1000&auto=format&fit=crop",
    desc: "Produziere Premium-Fotos und Videos an ausgewählten Locations."
  },
  {
    title: "Creator-Events in Europa",
    tagline: "Lernen und vernetzen",
    location: "Europa",
    image: "https://images.unsplash.com/photo-1573167507387-6b4b98cb7c13?q=85&w=1000&auto=format&fit=crop",
    desc: "Lerne andere Creatorinnen, Partner und Branchenexperten kennen."
  },
  {
    title: "Creator Networking",
    tagline: "Katharina Creator Circle",
    location: "Internationale Community",
    image: "https://images.unsplash.com/photo-1554200876-980213841c94?q=85&w=1000&auto=format&fit=crop",
    desc: "Baue wertvolle Kontakte und internationale Partnerschaften auf."
  }
];

export const GlobalLifestyleSection: React.FC<GlobalLifestyleSectionProps> = ({
  onExploreOpportunities
}) => {
  useLanguage();

  const [paused, setPaused] = useState(false);
  const [touching, setTouching] = useState(false);

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

        <div className="creator-carousel" role="region" aria-label={t('Creator Experiences')}>
          <div className="creator-carousel-window" tabIndex={0}
            onPointerDown={event => { if (event.pointerType !== 'mouse') { event.currentTarget.setPointerCapture(event.pointerId); setTouching(true); } }}
            onPointerUp={() => setTouching(false)} onPointerCancel={() => setTouching(false)}
            onLostPointerCapture={() => setTouching(false)}>
            <div className="creator-carousel-track" style={{ animationPlayState: paused || touching ? 'paused' : undefined }}>
              {[0, 1].map(copy => <div className="creator-carousel-group" key={copy} aria-hidden={copy === 1 ? true : undefined} inert={copy === 1 ? true : undefined}>
                {DESTINATIONS.map(item => <article key={item.title} className="creator-experience-card">
                  <img src={item.image} alt={copy === 0 ? t(item.title) : ''} loading="lazy" referrerPolicy="no-referrer" />
                  <div className="creator-experience-shade" />
                  <div className="creator-experience-copy">
                    <div className="creator-experience-location"><MapPin size={14}/><span>{t(item.location)}</span></div>
                    <h4>{t(item.title)}</h4>
                    <div className="creator-experience-tagline">{t(item.tagline)}</div>
                    <p>{t(item.desc)}</p>
                  </div>
                </article>)}
              </div>)}
            </div>
          </div>
          <div className="creator-carousel-controls">
            <span>{t('Zum Anhalten mit der Maus darüberfahren.')}</span>
            <AnimatedButton onClick={() => setPaused(value => !value)} aria-pressed={paused} className="text-xs text-white/70 border border-white/15 rounded-full px-4 py-2">{t(paused ? 'Experience-Slider starten' : 'Experience-Slider pausieren')}</AnimatedButton>
          </div>
        </div>

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
