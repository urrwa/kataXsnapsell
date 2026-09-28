import React, { useRef, useState } from 'react';
import FlipCard from '../FlipCard';
import { SlideButton } from '../SlideButton';
import { THREE_PILLARS } from '../../data/content';
import { MessageSquare, Sparkles, ShoppingBag, ArrowRight, Check, RotateCcw, Rotate3D } from 'lucide-react';
import './ThreePillarsSection.css';

interface ThreePillarsSectionProps {
  onSelectPillar: (targetSectionId: string) => void;
}

const BENEFITS: Record<string, string[]> = {
  'pillar-1': ['Everyday questions, answered', 'Conversations in your tone', 'Interested buyers, guided'],
  'pillar-2': ['Your approved visual identity', 'Photos, clips and captions', 'Content for every channel'],
  'pillar-3': ['Your content, your pricing', 'One shareable product link', 'Automatic digital delivery'],
};

function PillarCard({ pillar, onSelectPillar }: { key?: string; pillar: typeof THREE_PILLARS[number]; onSelectPillar: ThreePillarsSectionProps['onSelectPillar'] }) {
  const [flipped, setFlipped] = useState(false);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const Icon = pillar.icon === 'message-square' ? MessageSquare : pillar.icon === 'shopping-bag' ? ShoppingBag : Sparkles;
  const flip = (open: boolean) => {
    setFlipped(open);
    requestAnimationFrame(() => (open ? backButton : frontButton).current?.focus({ preventScroll: true }));
  };
  return <div onKeyDown={event => { if (event.key === 'Escape' && flipped) { event.preventDefault(); flip(false); } }}>
    <FlipCard className="pillar-card-motion" flipped={flipped} onFlipChange={setFlipped}
      axis="y" flipOnClick draggable tilt tiltMax={4} glare glareOpacity={0.06} hoverScale={1.01}
      perspective={1100} stiffness={170} damping={20} radius={26} background="#0d1711"
      ariaLabel={`${pillar.title}. Click, drag, or press Enter to flip.`}
      front={<div className="pillar-card-front">
        <img className="pillar-card-front__image" src={pillar.image.src} alt={pillar.image.alt} loading="lazy" decoding="async" />
        <div className="pillar-card-front__shade" />
        <div className="pillar-card__top"><span className="pillar-card__badge">PILLAR {pillar.pillarNumber}</span><span className="pillar-card__icon"><Icon size={24} aria-hidden="true" /></span></div>
        <div className="pillar-card-front__summary"><h3>{pillar.title}</h3><p className="pillar-card__tagline">{pillar.tagline}</p></div>
        <button ref={frontButton} type="button" className="pillar-card-front__open" onClick={() => flip(true)} aria-expanded={flipped} aria-controls={`${pillar.id}-details`} aria-label={`Flip ${pillar.title} card to see details`}>Flip to explore <Rotate3D size={18} aria-hidden="true" /></button>
      </div>}
      back={<div id={`${pillar.id}-details`} className="pillar-card pillar-card-back">
        <div className="pillar-card__top"><span className="pillar-card__badge">PILLAR {pillar.pillarNumber}</span><button ref={backButton} type="button" className="pillar-card__close" onClick={() => flip(false)} aria-label={`Flip ${pillar.title} card back`}><RotateCcw size={16} aria-hidden="true" />Back</button></div>
        <span className="pillar-card__icon"><Icon size={24} aria-hidden="true" /></span>
        <h3>{pillar.title}</h3>
        <p className="pillar-card__description">{pillar.description}</p>
        <ul>{BENEFITS[pillar.id].map(benefit => <li key={benefit}><Check size={14} aria-hidden="true" /><span>{benefit}</span></li>)}</ul>
        <div className="pillar-card__action"><SlideButton onClick={() => onSelectPillar(pillar.targetSection)} className="w-full py-3 px-3 rounded-xl"><span>Explore Pillar Details</span><ArrowRight size={14} /></SlideButton></div>
      </div>}
    />
  </div>;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ onSelectPillar }) => (
  <section id="section-4" className="landing-section bg-[#080F0A] px-4 sm:px-6 lg:px-8" aria-label="Three Pillars">
    <div className="max-w-7xl mx-auto w-full flex flex-col items-center text-center space-y-10">
      <div className="max-w-2xl space-y-3">
        <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-widest text-white/40 font-semibold"><span className="h-px w-8 bg-white/20" /><span>The Complete System</span><span className="h-px w-8 bg-white/20" /></div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white leading-[1.1] pb-1">Three Pillars. <br className="sm:hidden" /><span className="text-[#63DCA8] inline-block">One Creator Business.</span></h2>
        <p className="text-sm sm:text-base text-white/70 font-medium">Create attention. Build conversations. Turn interest into sales.</p>
      </div>
      <div className="pillar-card-grid">{THREE_PILLARS.map(pillar => <PillarCard key={pillar.id} pillar={pillar} onSelectPillar={onSelectPillar} />)}</div>
    </div>
  </section>
);
