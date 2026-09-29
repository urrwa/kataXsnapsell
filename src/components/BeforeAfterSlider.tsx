import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState, useRef, useCallback } from 'react';
import { ASSET_SLOTS } from '../data/content';
import { Sparkles, SlidersHorizontal, Eye } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  useLanguage();

  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      {/* Interactive Drag Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full h-[360px] sm:h-[440px] rounded-3xl overflow-hidden shadow-2xl border border-white/10 select-none cursor-ew-resize group"
      >
        {/* RIGHT SIDE: Finished Cinematic Campaign Result */}
        <div className="absolute inset-0">
          <img
            src="https://res.cloudinary.com/n5nqkpmk/image/upload/v1789999891/pexels-andrea-musto-135941147-14137828_tcbnvs.jpg"
            alt={t("Finished cinematic campaign result after production")}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white border border-[#20C997]/40 flex items-center gap-1.5 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#20C997]" />
            <span>{t("After: Finished Result")}</span>
          </div>
        </div>

        {/* LEFT SIDE: Before Studio Shoot (clipped seamlessly by sliderPos) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img
            src={ASSET_SLOTS.btsShoot.src}
            alt={t(ASSET_SLOTS.btsShoot.alt)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-semibold text-white/90 border border-white/20 flex items-center gap-1.5 shadow-lg pointer-events-auto">
            <Eye className="w-3.5 h-3.5 text-[#D7BE8A]" />
            <span>{t("Before: Studio Shoot")}</span>
          </div>
        </div>

        {/* Vertical Divider Handle Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(32, 201, 151,0.8)] cursor-ew-resize z-20 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
        >
          <div className="w-9 h-9 rounded-full bg-[#20C997] text-white shadow-xl flex items-center justify-center border-2 border-white ring-2 ring-black/40 active:scale-110 transition-transform">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Mobile / Quick Tap Controls */}
      <div className="flex items-center justify-between w-full max-w-md mt-4 text-xs text-white/60">
        <AnimatedButton
          onClick={() => setSliderPos(90)}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            sliderPos > 70 ? 'bg-white/10 text-white border-white/30' : 'bg-transparent border-white/5'
          }`}
        >{t(" Show Before ")}</AnimatedButton>
        <span className="text-[11px] text-white/40">{t("Drag or tap to compare")}</span>
        <AnimatedButton
          onClick={() => setSliderPos(10)}
          className={`px-3 py-1.5 rounded-lg border transition-all ${
            sliderPos < 30 ? 'bg-[#20C997]/20 text-[#20C997] border-[#20C997]/40' : 'bg-transparent border-white/5'
          }`}
        >{t(" Show After ")}</AnimatedButton>
      </div>
    </div>
  );
};
