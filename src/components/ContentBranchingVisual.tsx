import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState } from 'react';
import { Camera, Video, Sparkles, Compass, Dumbbell, ShoppingCart } from 'lucide-react';

const BRANCH_FORMATS = [
  { id: 'story', title: 'Story', icon: Camera, image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789595380/Woman_posing_in_professional_fas__2K_20260917024852_rnd6jo.jpg', tag: 'Dein vertikales Format', badge: 'Deine Freigabe' },
  {
    id: 'fashion',
    title: "AI-Foto",
    icon: Camera,
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789595380/Woman_posing_in_professional_fas__2K_20260917024852_rnd6jo.jpg',
    tag: "Studio und Fashion",
    badge: "Dein Stil"
  },
  {
    id: 'fitness',
    title: "Reel",
    icon: Dumbbell,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=800&auto=format&fit=crop',
    tag: "Bewegung und Lifestyle",
    badge: "Deine Idee"
  },
  {
    id: 'travel',
    title: "Travel-Content",
    icon: Compass,
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789998821/Luxury-Destinations-That-Are-Actually-Worth-the-Price-According-to-Solo-Female-Travelers_pgwvzx.jpg',
    tag: "Neue Perspektiven",
    badge: "Deine Freigabe"
  },
  {
    id: 'video',
    title: "Talking Video",
    icon: Video,
    image: 'https://res.cloudinary.com/n5nqkpmk/image/upload/v1789999345/pexels-ericka-sanchez-1098642631-28469397_keuqct.jpg',
    tag: "Deine Stimme",
    badge: "Deine Kontrolle"
  },
  {
    id: 'promo',
    title: "Produktvisual",
    icon: ShoppingCart,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop',
    tag: "Dein digitales Angebot",
    badge: "Dein Angebot"
  }
];

export const ContentBranchingVisual: React.FC = () => {
  useLanguage();

  const [selectedFormat, setSelectedFormat] = useState(BRANCH_FORMATS[0]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Central Identity Anchor */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="relative">
          <img loading="lazy"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop"
            alt={t("Single approved creator identity")}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#20C997] shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#20C997] text-white p-1 rounded-full shadow">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20C997]/15 text-[#20C997] text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20C997] animate-ping" />
            <span>{t("DEIN FREIGEGEBENER STIL")}</span>
          </div>
          <h4 className="text-base font-bold text-white font-display">{t("Ein Konzept. Viele Content-Formate.")}</h4>
          <p className="text-xs text-white/60 max-w-xs mt-0.5">{t(" Du bestimmst dein Aussehen, deine Stimme und jede finale Freigabe. Diese Bilder zeigen lediglich Formate als Vorschau. ")}</p>
        </div>
      </div>

      {/* 5 Branching Formats Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mb-6">
        {t(BRANCH_FORMATS.map((item) => {
          const isSelected = selectedFormat.id === item.id;
          const IconComponent = item.icon;
          return (
            <AnimatedButton
              key={item.id}
              aria-pressed={isSelected}
              onClick={() => setSelectedFormat(item)}
              className={`p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden border ${
                isSelected
                  ? 'bg-[#1C1B1E] border-[#20C997] shadow-lg shadow-[#20C997]/20 scale-102'
                  : 'bg-[#121113]/80 border-white/5 hover:border-white/20 hover:bg-[#18161A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#20C997] text-white' : 'bg-white/5 text-white/60'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-[#20C997] font-semibold">{t(item.badge)}</span>
              </div>
              <div className="font-semibold text-xs text-white line-clamp-1">{t(item.title)}</div>
              <div className="text-[10px] text-white/50 truncate mt-0.5">{t(item.tag)}</div>
            </AnimatedButton>
          );
        }))}
      </div>

      {/* Active Output Showcase Card */}
      <div className="w-full bg-[#121113] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 relative h-56 md:h-72 overflow-hidden bg-black/40">
          <img
            src={selectedFormat.image}
            alt={t(selectedFormat.title)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="bg-black/70 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">{t(" Formatbeispiel · kein Identitätsnachweis ")}</span>
            <span className="bg-[#20C997] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t(" VORSCHAU ")}</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5 sm:p-6 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#20C997] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("Dein Content-Format")}</span>
          </div>
          <h4 className="text-xl font-bold font-display text-white">{t(selectedFormat.title)}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{t(" Aus deinem freigegebenen Stil können verschiedene Inhalte entstehen. Du prüfst jedes Ergebnis, bevor es veröffentlicht wird. Die vorhandenen Bilder sind illustrative Formatbeispiele. ")}</p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-[#D7BE8A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7BE8A]" />
            <span>{t("Dein Aussehen. Deine Themen. Deine Freigabe.")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
