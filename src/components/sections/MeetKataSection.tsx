import { SlideButton } from '../SlideButton';
import React, { useState, useRef } from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { ArrowUpRight, Award, Play, Pause, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface MeetKataSectionProps {
  onStartWithKata: () => void;
}

export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      id="section-3"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Meet Kata"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Left Column: Visuals - Editorial Portrait & Coaching Video Frame */}
        <div className="lg:col-span-6 relative flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Primary Editorial Portrait */}
          <div className="relative w-full max-w-[320px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-black">
            <img loading="lazy" decoding="async"
              src={ASSET_SLOTS.kataPortrait.src}
              alt={ASSET_SLOTS.kataPortrait.alt}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Tasteful Verified Badge: 20 Years Coaching & Training */}
            <div className="absolute top-4 left-4 p-2.5 rounded-2xl bg-[#050907]/90 backdrop-blur-md border border-[#AFD9BF]/40 shadow-xl flex items-center gap-2">
              <Award className="w-4 h-4 text-[#AFD9BF]" />
              <div className="text-left">
                <div className="text-[10px] font-bold text-white uppercase tracking-wider">20 Years</div>
                <div className="text-[9px] text-[#AFD9BF]">Coaching & Training</div>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 right-4 text-left">
              <div className="text-white font-display font-bold text-lg">Kata</div>
              <div className="text-xs text-[#63DCA8] font-medium">Founder & Head Mentor</div>
            </div>
          </div>

          {/* Secondary Coaching Session Video Window */}
          <div className="relative w-full max-w-[260px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-black sm:-mt-8 group">
            {/* HTML5 Video Element with Kata Coaching Clip */}
            <video
              ref={videoRef}
              src="https://res.cloudinary.com/n5nqkpmk/video/upload/v1790000241/01_a04ekp.mp4"
              poster={ASSET_SLOTS.kataCoachingVideoPoster.src}
              preload="none"
              playsInline
              muted={isMuted}
              loop
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 pointer-events-none" />

            {/* Top Status Indicators */}
            <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
              <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-white text-[9px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#63DCA8] animate-pulse" />
                <span>Mentoring Session</span>
              </div>

              {/* Sound Toggle Button */}
              <button
                type="button"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-7 h-7 rounded-full bg-black/75 backdrop-blur-md border border-white/15 hover:border-[#63DCA8] text-white flex items-center justify-center transition-colors shadow-md"
              >
                {isMuted ? <VolumeX className="w-3.5 h-3.5 text-white/70" /> : <Volume2 className="w-3.5 h-3.5 text-[#63DCA8]" />}
              </button>
            </div>

            {/* Centered Play/Pause Button on Hover / Paused state */}
            <button
              type="button"
              onClick={togglePlay}
              className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300 ${
                isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100 bg-black/40'
              }`}
              aria-label={isPlaying ? "Pause coaching video" : "Play coaching video"}
            >
              <div className="w-12 h-12 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white flex items-center justify-center shadow-xl shadow-[#63DCA8]/40 hover:scale-110 active:scale-95 transition-transform mb-1.5">
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </div>
              <span className="text-[10px] font-semibold text-white/90 bg-black/70 px-2.5 py-0.5 rounded-full border border-white/10">
                {isPlaying ? "Pause Stream" : "Play Session"}
              </span>
            </button>

            {/* Bottom Details */}
            <div className="absolute bottom-3 left-3 right-3 text-left pointer-events-none z-10">
              <div className="text-[9.5px] text-[#AFD9BF] uppercase tracking-widest font-mono font-semibold">Hands-on Guidance</div>
              <div className="text-xs text-white font-medium drop-shadow-sm">Group Mentoring Lab</div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Copy */}
        <div className="lg:col-span-6 text-left space-y-6">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
            <span className="h-px w-8 bg-[#63DCA8]/40" />
            <span className="text-[#63DCA8]">Your Creator Coach</span>
          </div>

          <div className="space-y-2">
            <h2 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold font-display text-white leading-[1.1]">
              Learn From Kata
            </h2>
            <div className="text-base sm:text-lg font-semibold text-[#AFD9BF] tracking-wide font-display">
              Creator. Coach. Trainer.
            </div>
          </div>

          <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-xl">
            Kata combines around 20 years of coaching and training experience with practical knowledge of building and monetizing a personal brand.
          </p>

          {/* Direct Quote */}
          <blockquote className="p-5 rounded-2xl bg-[#101C14] border-l-4 border-[#63DCA8] border-y border-r border-white/10 text-white space-y-2">
            <p className="font-editorial italic text-base sm:text-lg text-white/95">
              “I’ll help you stop doing everything alone and start building like a professional.”
            </p>
            <cite className="text-xs text-white/50 block not-italic">— Kata</cite>
          </blockquote>

          {/* Key Mentor Pillars */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-4 rounded-2xl bg-[#0D1711] border border-white/[0.07] flex flex-col gap-2">
              <div className="text-[#63DCA8] text-lg font-bold font-display">20 yrs</div>
              <div className="text-xs text-white/60 leading-snug">Coaching and training experience</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#0D1711] border border-white/[0.07] flex flex-col gap-2">
              <div className="text-[#AFD9BF] text-lg font-bold font-display">Personal</div>
              <div className="text-xs text-white/60 leading-snug">Hands-on direct sales methodology</div>
            </div>
          </div>

          {/* Button */}
          <div className="pt-2">
            <SlideButton
              id="meet-kata-start-btn"
              onClick={onStartWithKata}
              className="px-7 py-3.5 rounded-full bg-[#63DCA8] hover:bg-[#20B777] text-white font-bold text-sm sm:text-base flex items-center gap-2 shadow-xl shadow-[#63DCA8]/25 hover:shadow-[#63DCA8]/40 active:scale-95 transition-all"
            >
              <span>Start With Kata</span>
              <ArrowUpRight className="w-4 h-4" />
            </SlideButton>
          </div>
        </div>
      </div>
    </section>
  );
};
