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

  const [touching, setTouching] = useState(false);

  return (
    <section
      id="section-11"
      className="landing-section bg-[#0A0A0C] px-4 sm:px-6 lg:px-8"
      aria-label={t("Global Creator Lifestyle")}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-8">
        {/* Header Block */}
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20C997]/10 border border-[#20C997]/30 text-[#20C997] text-xs font-bold tracking-widest uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>{t("KATHARINA CREATOR CIRCLE")}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-[1.15]">
            {t("Lerne. Wachse.")}{' '}
            <span className="text-[#20C997]">{t("Erstelle Content weltweit.")}</span>
          </h2>

          <p className="text-sm text-white/60 max-w-md mx-auto">{t("Für ausgewählte Mitglieder – exklusive Shootings, Events und Community.")}</p>
        </div>

        <div className="creator-carousel" role="region" aria-label={t('Creator Experiences')}>
          <div className="creator-carousel-window" tabIndex={0}
            onPointerDown={event => { if (event.pointerType !== 'mouse') { event.currentTarget.setPointerCapture(event.pointerId); setTouching(true); } }}
            onPointerUp={() => setTouching(false)} onPointerCancel={() => setTouching(false)}
            onLostPointerCapture={() => setTouching(false)}>
            <div className="creator-carousel-track" style={{ animationPlayState: touching ? 'paused' : undefined }}>
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
        </div>
        <MexicoExperience />
        {/* CTA */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-[10px] uppercase tracking-widest text-white/30 font-semibold flex items-center gap-2">
            <span className="block w-6 h-px bg-white/15" />
            {t("Nur für ausgewählte Mitglieder")}
            <span className="block w-6 h-px bg-white/15" />
          </p>
          <AnimatedButton
            animateArrow id="explore-opportunities-btn"
            onClick={() => document.getElementById('mexico-experience')?.scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'})}
            className="px-7 py-3.5 rounded-full bg-[#20C997] hover:bg-[#169B74] text-white font-bold text-sm flex items-center gap-2 mx-auto shadow-xl shadow-[#20C997]/20 transition-all active:scale-95"
          >
            <span>{t("Creator Circle entdecken")}</span>
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
};
