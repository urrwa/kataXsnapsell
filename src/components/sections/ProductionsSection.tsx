import React, { useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Camera, Film, Palette, Scissors, MapPin, BadgeCheck, Star } from 'lucide-react';
import { FilmPreview } from '../FilmPreview';

const ROSTER = [
  {
    initials: 'MA',
    name: 'Mia Andersen',
    role: 'Photographer',
    icon: Camera,
    location: 'Milan, IT',
    tags: ['Editorial', 'Lifestyle', 'Luxury'],
    shoots: 38,
    rating: '4.9',
    color: '#63DCA8',
  },
  {
    initials: 'JP',
    name: 'Jules Perrin',
    role: 'Filmmaker',
    icon: Film,
    location: 'Paris, FR',
    tags: ['Cinematic', 'Short-form', 'Reels'],
    shoots: 24,
    rating: '4.8',
    color: '#AFD9BF',
  },
  {
    initials: 'SR',
    name: 'Sofia Reyes',
    role: 'Creative Director',
    icon: Palette,
    location: 'Dubai, AE',
    tags: ['Brand', 'Concept', 'Campaign'],
    shoots: 51,
    rating: '5.0',
    color: '#63DCA8',
  },
  {
    initials: 'NK',
    name: 'Nina Kohl',
    role: 'Styling Team',
    icon: Scissors,
    location: 'Zurich, CH',
    tags: ['Fashion', 'Wardrobe', 'Editorial'],
    shoots: 43,
    rating: '4.9',
    color: '#AFD9BF',
  },
];

export const ProductionsSection: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="section-11"
      className="landing-section bg-[#050907] px-4 sm:px-6 lg:px-8"
      aria-label="Professional Productions"
    >
      <div ref={ref} className="max-w-6xl mx-auto w-full flex flex-col items-center text-center space-y-10">

        {/* Header */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
          className="max-w-2xl space-y-3"
        >
          <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold">
            <span className="h-px w-8 bg-white/20" />
            <Camera className="w-3 h-3 text-[#63DCA8]" />
            <span>Premium Content</span>
            <span className="h-px w-8 bg-white/20" />
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-[1.1]">
            Work With{' '}
            <span className="text-[#63DCA8]">World&#8209;Class Creatives</span>
          </h2>

          <p className="text-sm sm:text-base text-white/60 max-w-lg mx-auto">
            Access an international roster of photographers, filmmakers and creative directors — ready to build with you.
          </p>
        </motion.div>

        {/* Roster Cards */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ROSTER.map((person, i) => {
            const Icon = person.icon;
            const isHovered = hovered === i;
            return (
              <motion.div
                key={i}
                initial={reduced ? false : { opacity: 0, y: 28 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex flex-col gap-4 p-5 rounded-2xl bg-[#0C1610] border border-white/[0.07] text-left cursor-default transition-all duration-300"
                style={{
                  borderColor: isHovered ? `${person.color}40` : undefined,
                  boxShadow: isHovered ? `0 0 32px 0 ${person.color}18` : undefined,
                }}
              >
                {/* Top row: avatar + verified */}
                <div className="flex items-start justify-between">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-sm font-bold font-mono text-[#050907]"
                    style={{ background: `linear-gradient(135deg, ${person.color}, ${person.color}99)` }}
                  >
                    {person.initials}
                  </div>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-white/40 font-mono">
                    <BadgeCheck className="w-3.5 h-3.5 text-[#63DCA8]" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Name & role */}
                <div>
                  <div className="text-sm font-bold text-white font-display leading-tight">{person.name}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Icon className="w-3 h-3 text-[#63DCA8]" />
                    <span className="text-[11px] text-[#63DCA8] font-semibold">{person.role}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-[11px] text-white/40 font-mono">
                  <MapPin className="w-3 h-3" />
                  {person.location}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {person.tags.map((tag, t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/60 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats footer */}
                <div className="mt-auto pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-white/40">{person.shoots} shoots</span>
                  <span className="flex items-center gap-1 text-amber-400">
                    <Star className="w-3 h-3 fill-amber-400" />
                    {person.rating}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Platform badge strip */}
        <FilmPreview title="Inside the production studio" description="A short look at the craft behind professional content." src="/videos/flow/production-detail.mp4" poster="/images/flow/production-detail-poster.webp" />

        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55, ease }}
          className="flex flex-wrap items-center justify-center gap-6 pt-2 text-[11px] text-white/30 font-mono"
        >
          <span className="flex items-center gap-1.5"><BadgeCheck className="w-3 h-3 text-[#63DCA8]" /> Background-checked</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5"><BadgeCheck className="w-3 h-3 text-[#63DCA8]" /> International availability</span>
          <span className="w-px h-3 bg-white/10" />
          <span className="flex items-center gap-1.5"><BadgeCheck className="w-3 h-3 text-[#63DCA8]" /> Selected members only</span>
        </motion.div>

        {/* Callout */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.65, ease }}
          className="p-4 rounded-2xl bg-[#101C14] border border-white/10 text-sm sm:text-base font-bold font-display text-white max-w-md"
        >
          "Content designed to make your personal brand stand out."
        </motion.div>
      </div>
    </section>
  );
};
