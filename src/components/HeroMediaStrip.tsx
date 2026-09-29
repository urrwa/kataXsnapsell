import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState } from 'react';
import { ASSET_SLOTS } from '../data/content';
import { Sparkles, ShoppingBag, MessageSquare } from 'lucide-react';

interface MediaCard {
  id: string;
  image: string;
  alt: string;
  objectPosition?: string;
  tag?: string;
  icon?: React.ComponentType<{ className?: string }>;
  headline?: string;
  caption?: string;
  isAiAssistant?: boolean;
}

const CARDS_DATA: MediaCard[] = [
  {
    id: 'hero-kata',
    image: ASSET_SLOTS.heroKata.src,
    alt: 'Katharina als Mentorin der Katharina Academy',
    objectPosition: 'object-[center_top]',
    isAiAssistant: true,
    tag: "Katharina AI Assistenz",
    headline: "Chat-Demo",
    caption: "„Hey! Hier findest du den Link zu meinem Lookbook und den Styling-Ideen.“"
  },
  {
    id: 'ai-visual-sync',
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1790000079/pexels-jeny-godjali-2159216127-39193783_rwaym3.jpg',
    alt: 'Fashion Editorial with AI Visual Sync',
    objectPosition: 'object-center',
    tag: "AI Content Creation",
    icon: Sparkles,
    headline: "Dein persönlicher Stil",
    caption: "Ein Konzept. Viele Formate."
  },
  {
    id: 'creator-coaching',
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789999591/Pic_12_ngbd1w.png',
    alt: 'Coaching mit Katharina',
    objectPosition: 'object-center',
    tag: "Creator Masterclass",
    icon: MessageSquare,
    headline: "Katharina Coaching",
    caption: "Persönlich lernen und wachsen"
  },
  {
    id: 'direct-sales',
    image: ASSET_SLOTS.finishedCampaign.src,
    alt: 'Direct sales finished campaign photoshoot',
    objectPosition: 'object-center',
    tag: "Creator CRM & Direct Sales",
    icon: ShoppingBag,
    headline: "Dein digitales Angebot",
    caption: "Payment-Link und Auslieferung"
  },
  {
    id: 'production-pipeline',
    image: ASSET_SLOTS.btsShoot.src,
    alt: 'Behind the scenes content studio production',
    objectPosition: 'object-center',
    tag: "Content-Produktion",
    icon: Sparkles,
    headline: "Dein Content-System",
    caption: "Mehr Content, weniger tägliche Produktion"
  },
  {
    id: 'founder-kata',
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789999603/Pic_3_rvyxyr.png',
    alt: 'Katharina – Creatorin, Coach und Trainerin',
    objectPosition: 'object-[center_20%]',
    tag: "Creator-Mentorin",
    headline: "Katharina – The Creator Mama",
    caption: "20+ Jahre Erfahrung"
  },
  {
    id: 'streamlined-workflow',
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789999657/images_3_fdcnor.jpg',
    alt: 'Streamlined creator studio workflow',
    objectPosition: 'object-center',
    tag: "Mehr Freiraum",
    headline: "Klare Systeme",
    caption: "Wachstum mit Struktur"
  },
  {
    id: 'global-network',
    image: ASSET_SLOTS.finalCommunity.src,
    alt: 'Katharina Creator Circle – illustratives Community-Bild',
    objectPosition: 'object-center',
    tag: "Katharina Creator Circle",
    headline: "Gemeinsam wachsen",
    caption: "Eine Community für Creatorinnen"
  }
];

// Double the cards in each group so a single group is wider than any widescreen monitor (~3200px)
const GROUP_CARDS = [...CARDS_DATA, ...CARDS_DATA];

export const HeroMediaStrip: React.FC = () => {
  useLanguage();

  const [paused,setPaused] = useState(false);
  const renderCard = (card: MediaCard, keyPrefix: string, index: number) => {
    const Icon = card.icon;
    const cardKey = `${keyPrefix}-${card.id}-${index}`;

    return (
      <div
        key={cardKey}
        role="article"
        aria-label={`${t(card.headline || card.tag || 'Media card')}: ${t(card.caption || card.alt)}`}
        className="group relative shrink-0 w-[148px] sm:w-[172px] lg:w-[186px] h-[215px] sm:h-[246px] lg:h-[266px] rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#121113] border border-white/15 hover:border-[#20C997]/70 transition-all duration-300 hover:scale-[1.03] shadow-[0_12px_32px_rgba(0,0,0,0.85)] hover:shadow-[0_15px_35px_rgba(32, 201, 151,0.25)] select-none"
      >
        {/* Media Image */}
        <img
          src={card.image}
          alt={t(card.alt)}
          referrerPolicy="no-referrer"
          loading={keyPrefix === 'group-1' && index < 4 ? 'eager' : 'lazy'}
          className={`w-full h-full object-cover ${card.objectPosition || 'object-center'} transition-transform duration-700 group-hover:scale-105 pointer-events-none`}
        />

        {/* Ambient atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/92 via-black/35 to-black/10 group-hover:via-black/20 transition-all duration-300 pointer-events-none" />

        {/* Card Overlays */}
        {t(card.isAiAssistant ? (
          /* Star Card: Kata AI Assistant Info at Bottom, keeping Kata's face and hair 100% visible */
          <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 z-10 flex flex-col justify-end text-left pointer-events-none bg-gradient-to-t from-black/95 via-black/70 to-transparent pt-8">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#141416]/95 border border-[#20C997]/50 text-white text-[9px] font-bold w-fit mb-1 shadow-md">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span className="text-[#20C997]">{t("Katharina AI Assistenz")}</span>
              <span className="text-white/30">{t("•")}</span>
              <span className="text-white/70 text-[8px]">{t("Chat-Demo")}</span>
            </div>
            <p className="text-[10px] sm:text-[10.5px] text-white/90 font-medium line-clamp-2 leading-snug">
              {t(card.caption)}
            </p>
          </div>
        ) : (
          /* Standard Cards: Top Pill Tag + Bottom Caption */
          <>
            {t(card.tag && (
              <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-white text-[8.5px] sm:text-[9px] font-semibold tracking-wide">
                {t(Icon && <Icon className="w-2.5 h-2.5 text-[#20C997]" />)}
                <span className="truncate max-w-[125px]">{t(card.tag)}</span>
              </div>
            ))}

            <div className="absolute bottom-0 inset-x-0 p-2.5 sm:p-3 z-10 flex flex-col justify-end text-left pointer-events-none bg-gradient-to-t from-black/95 via-black/60 to-transparent pt-6">
              {t(card.headline && (
                <div className="text-[11px] sm:text-xs font-bold text-white tracking-tight flex items-center gap-1 drop-shadow-sm">
                  <span>{t(card.headline)}</span>
                </div>
              ))}
              {t(card.caption && (
                <p className="text-[9px] sm:text-[10px] text-white/80 font-medium line-clamp-2 leading-tight mt-0.5">
                  {t(card.caption)}
                </p>
              ))}
            </div>
          </>
        ))}
      </div>
    );
  };

  return (
    <div
      className="hero-marquee relative w-full overflow-hidden py-2 sm:py-3 select-none"
      aria-label={t("Katharina Academy – Creator-Bildstreifen")}
    >
      {/* Explicit Inline Styles for 100% Guaranteed Keyframe Activation */}
      <style>{t(`
        @keyframes hero-marquee-scroll {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .hero-marquee-track-animated {
          display: flex !important;
          width: max-content !important;
          animation: hero-marquee-scroll 42s linear infinite !important;
          animation-play-state: running;
          will-change: transform !important;
        }
      `)}</style>

      {/* Subtle edge fade overlays with pointer-events-none */}
      <div className="absolute left-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-r from-[#080808] to-transparent pointer-events-none z-20" />
      <div className="absolute right-0 inset-y-0 w-12 sm:w-24 bg-gradient-to-l from-[#080808] to-transparent pointer-events-none z-20" />

      <AnimatedButton onClick={() => setPaused(!paused)} className="relative z-30 mx-auto mb-3 block rounded-full border border-white/15 px-3 py-1 text-[10px] text-white/65">{t(paused ? 'Bildstreifen starten' : 'Bildstreifen pausieren')}</AnimatedButton>
      {/* Continuously animated track */}
      <div className="hero-marquee-track hero-marquee-track-animated" style={{animationPlayState: paused ? 'paused' : 'running'}}>
        {/* First group */}
        <div className="hero-marquee-group flex shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4">
          {t(GROUP_CARDS.map((card, idx) => renderCard(card, 'group-1', idx)))}
        </div>

        {/* Second identical group for seamless infinite looping */}
        <div className="hero-marquee-group flex shrink-0 gap-3 sm:gap-4 pr-3 sm:pr-4" aria-hidden="true">
          {t(GROUP_CARDS.map((card, idx) => renderCard(card, 'group-2', idx)))}
        </div>
      </div>
    </div>
  );
};
