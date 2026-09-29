import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { MessageSquare, Sparkles, ShoppingBag, Check, Image, Play, Users } from 'lucide-react';
import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import { THREE_PILLARS } from '../../data/content';
import '../../pillars.css';

interface ThreePillarsSectionProps { onSelectPillar: (targetSectionId: string) => void; }
const clamp = (value: number) => Math.max(0, Math.min(1, value));

function PillarVisual({ index }: { index: number }) {
  return <div className={`pillar-visual pillar-visual-${index}`} aria-hidden="true">
    <div className="pillar-visual-top"><span className="pillar-live-dot" /><span>{['AI Chat', 'AI Content', 'SnapSell CRM'][index]}</span><span className="pillar-visual-dots">···</span></div>
    {index === 0 ? <div className="pillar-chat-art">
      <span className="pillar-art-icon"><MessageSquare size={20} strokeWidth={1.4} /></span>
      <div className="pillar-chat-line"><i /><i /></div>
      <div className="pillar-chat-line pillar-chat-answer"><Sparkles size={12} /><div><i /><i /></div><Check size={12} /></div>
      <div className="pillar-chat-line pillar-chat-short"><i /></div>
    </div> : index === 1 ? <div className="pillar-content-art">
      <div className="pillar-format pillar-format-back"><Play size={22} strokeWidth={1.3} /><i /></div>
      <div className="pillar-format pillar-format-front"><Image size={27} strokeWidth={1.2} /><i /><i /></div>
      <span className="pillar-content-spark"><Sparkles size={20} strokeWidth={1.3} /></span>
    </div> : <div className="pillar-crm-art">
      <div className="pillar-crm-path"><span><Users size={21} strokeWidth={1.3} /></span><i /><span><MessageSquare size={21} strokeWidth={1.3} /></span><i /><span><ShoppingBag size={21} strokeWidth={1.3} /></span></div>
      <div className="pillar-crm-row"><span /><i /><Check size={13} /></div>
      <div className="pillar-crm-row"><span /><i /><Check size={13} /></div>
    </div>}
  </div>;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({ onSelectPillar }) => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(() => window.matchMedia('(min-width: 900px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)');
    const update = () => setPinned(media.matches && !reducedMotion);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [reducedMotion]);

  useEffect(() => {
    const scene = sceneRef.current;
    const pin = pinRef.current;
    if (!scene || !pin) return;
    const cards = Array.from(scene.querySelectorAll('.pillar-reveal')) as HTMLElement[];
    const steps = Array.from(scene.querySelectorAll('.pillar-step')) as HTMLElement[];
    let frame = 0;
    const render = () => {
      frame = 0;
      const sceneBox = scene.getBoundingClientRect();
      const travel = Math.max(1, scene.offsetHeight - pin.offsetHeight);
      const stickyTop = parseFloat(getComputedStyle(pin).top) || 0;
      document.documentElement.classList.toggle('pillars-scroll-active', pinned && sceneBox.top < window.innerHeight && sceneBox.bottom > stickyTop);
      const progress = clamp((stickyTop - sceneBox.top) / travel);
      // Each panel rises into the same row; completed panels remain in place.
      cards.forEach((card, index) => {
        const amount = reducedMotion ? 1 : pinned
          ? clamp((progress - index * .32) / .23)
          : clamp((window.innerHeight * .94 - card.parentElement!.getBoundingClientRect().top) / 180);
        const rise = pinned ? 110 : 18;
        card.style.transform = `translateY(${(1 - amount) * rise}%)`;
        card.style.opacity = `${clamp(amount * 3)}`;
        card.inert = amount < .98;
        steps[index].classList.toggle('is-active', amount > .5);
      });
      scene.style.setProperty('--pillar-progress', `${pinned ? clamp(progress / .9) : 1}`);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const resize = new ResizeObserver(schedule);
    resize.observe(scene);
    resize.observe(pin);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.documentElement.classList.remove('pillars-scroll-active');
      cards.forEach(card => { card.inert = false; });
    };
  }, [pinned, reducedMotion]);

  return <section id="section-4" className="landing-section pillars-section" aria-labelledby="pillars-heading">
    <header className="pillars-heading">
      <p className="pillars-eyebrow">{t('DAS KOMPLETTE CREATOR-SYSTEM')}</p>
      <h2 id="pillars-heading">{t('Drei Säulen.')} <span>{t('Ein Business.')}</span></h2>
      <p className="pillars-intro">{t('Content erzeugt Aufmerksamkeit. Chat baut Vertrauen auf. SnapSell macht daraus Verkäufe.')}</p>
    </header>
    <div ref={sceneRef} className={`pillar-scene ${pinned ? 'is-pinned' : ''}`}>
      <div ref={pinRef} className="pillar-pin">
        <div className="pillar-timeline" aria-hidden="true"><span className="pillar-line" />{THREE_PILLARS.map(pillar => <span className="pillar-step" key={pillar.id}>{pillar.pillarNumber}</span>)}</div>
        <div className="pillar-panels">
          {THREE_PILLARS.map((pillar, index) => <div className="pillar-window" key={pillar.id}>
            <article className="pillar-reveal">
              <span className="pillar-mobile-number" aria-hidden="true">{pillar.pillarNumber}</span>
              <h3>{t(pillar.title)}</h3>
              <PillarVisual index={index} />
              <p className="pillar-tagline">{t(pillar.tagline)}</p>
              <p className="pillar-description">{t(pillar.description)}</p>
              <AnimatedButton animateArrow className="pillar-explore" onClick={() => onSelectPillar(pillar.targetSection)}>{t('Säule entdecken')}</AnimatedButton>
            </article>
          </div>)}
        </div>
      </div>
    </div>
  </section>;
};
