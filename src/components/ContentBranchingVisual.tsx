import { EDITORIAL_IMAGES } from '../data/images';
import React, { useState } from 'react';
import { Camera, Video, Sparkles, Compass, Dumbbell, ShoppingCart } from 'lucide-react';

const BRANCH_FORMATS = [
  {
    id: 'fashion',
    title: 'Fashion Editorial',
    icon: Camera,
    image: EDITORIAL_IMAGES.campaign.src,
    tag: 'Studio & Runways',
    badge: 'Approved Style'
  },
  {
    id: 'fitness',
    title: 'Fitness & Wellness',
    icon: Dumbbell,
    image: EDITORIAL_IMAGES.wellness.src,
    tag: 'Active Lifestyle',
    badge: 'Approved Routine'
  },
  {
    id: 'travel',
    title: 'Luxury Travel',
    icon: Compass,
    image: EDITORIAL_IMAGES.retreat.src,
    tag: 'Golden Hour Coast',
    badge: 'Approved Scenery'
  },
  {
    id: 'video',
    title: 'Talking Video Frame',
    icon: Video,
    image: EDITORIAL_IMAGES.studio.src,
    tag: 'Lip-Sync & Speeches',
    badge: 'Approved Voice'
  },
  {
    id: 'promo',
    title: 'Digital Product Visual',
    icon: ShoppingCart,
    image: EDITORIAL_IMAGES.commerce.src,
    tag: 'SnapSell Showcase',
    badge: 'Ready to Monetize'
  }
];

export const ContentBranchingVisual: React.FC = () => {
  const [selectedFormat, setSelectedFormat] = useState(BRANCH_FORMATS[0]);

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Central Identity Anchor */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 rounded-2xl bg-[#101A14]/90 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="relative">
          <img loading="lazy" decoding="async"
            src={EDITORIAL_IMAGES.content.src}
            alt={EDITORIAL_IMAGES.content.alt}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#63DCA8] shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#63DCA8] text-white p-1 rounded-full shadow">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#63DCA8]/15 text-[#63DCA8] text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#63DCA8] animate-ping" />
            <span>Master Identity Vault</span>
          </div>
          <h4 className="text-base font-bold text-white font-display">One Creator Identity</h4>
          <p className="text-xs text-white/60 max-w-xs mt-0.5">
            Your face, body proportions, natural aesthetic and voice are strictly protected and trained once.
          </p>
        </div>
      </div>

      {/* 5 Branching Formats Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 w-full mb-6">
        {BRANCH_FORMATS.map((item) => {
          const isSelected = selectedFormat.id === item.id;
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setSelectedFormat(item)}
              className={`p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden border ${
                isSelected
                  ? 'bg-[#192A20] border-[#63DCA8] shadow-lg shadow-[#63DCA8]/20 scale-102'
                  : 'bg-[#0D1711]/80 border-white/5 hover:border-white/20 hover:bg-[#15231A]'
              }`}
            >
              <img src={item.image} alt="" loading="lazy" decoding="async" className="w-full h-24 object-cover rounded-lg mb-3" />
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#63DCA8] text-white' : 'bg-white/5 text-white/60'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-[#63DCA8] font-semibold">{item.badge}</span>
              </div>
              <div className="font-semibold text-xs text-white line-clamp-1">{item.title}</div>
              <div className="text-[10px] text-white/50 truncate mt-0.5">{item.tag}</div>
            </button>
          );
        })}
      </div>

      {/* Active Output Showcase Card */}
      <div className="w-full bg-[#0D1711] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 relative h-56 md:h-72 overflow-hidden bg-black/40">
          <img loading="lazy" decoding="async"
            src={selectedFormat.image}
            alt={selectedFormat.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="bg-black/70 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">
              Consistent Visual Direction
            </span>
            <span className="bg-[#63DCA8] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
              Concept Preview
            </span>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5 sm:p-6 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#63DCA8] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Format Details</span>
          </div>
          <h4 className="text-xl font-bold font-display text-white">{selectedFormat.title}</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Explore a cohesive visual direction for your content, with considered lighting, textures and a consistent color palette across formats.
          </p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-[#AFD9BF]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#AFD9BF]" />
            <span>Curated composition • Consistent color palette</span>
          </div>
        </div>
      </div>
    </div>
  );
};
