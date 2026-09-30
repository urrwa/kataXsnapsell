import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { Users, Camera, MessageSquare, ShoppingBag, Repeat, Zap, Pause, Play } from 'lucide-react';

const JOURNEY_STEPS = [
  {id:1,phase:'Schritt 01',title:'Aufmerksamkeit',shortRole:'Content macht sichtbar',detail:'AI Content macht deine Marke sichtbar.',icon:Camera,previewBadge:'Deine Marke',metric:'Content freigeben'},
  {id:2,phase:'Schritt 02',title:'Gespräch',shortRole:'Interesse verstehen',detail:'AI Chat reagiert auf Interesse und beantwortet Fragen.',icon:MessageSquare,previewBadge:'AI Chat Support',metric:'Fragen beantworten'},
  {id:3,phase:'Schritt 03',title:'Organisation',shortRole:'Kontakte im Blick',detail:'Das CRM speichert Kontakte, Interessen und Gespräche.',icon:Users,previewBadge:'Creator CRM',metric:'Kontakt organisieren'},
  {id:4,phase:'Schritt 04',title:'Verkauf',shortRole:'Das passende Angebot',detail:'Der passende Payment-Link wird direkt verschickt.',icon:ShoppingBag,previewBadge:'SnapSell-Technologie',metric:'Angebot → Zahlung'},
  {id:5,phase:'Schritt 05',title:'Wachstum',shortRole:'Verbindungen erhalten',detail:'Follow-ups fördern weitere Käufe.',icon:Repeat,previewBadge:'Käuferbindung',metric:'Persönlich nachfassen'},
];

export const ConnectedJourneyFlow: React.FC = () => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(3);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const stageRef = useRef<HTMLDivElement>(null);
  const nodesRef = useRef<Array<HTMLButtonElement | null>>([]);
  const elapsedRef = useRef(0);
  const running = inView && pageVisible && !paused && !reducedMotion;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: .1});
    observer.observe(stage);
    const visibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', visibility); };
  }, []);

  useEffect(() => {
    let frame = 0;
    let last = 0;
    const render = (time: number) => {
      if (running && last) elapsedRef.current += Math.min(time - last, 64);
      last = time;
      // A measured pause, then one orbital step. Icons stay upright as the path moves.
      const cycle = elapsedRef.current / 4600;
      const phase = cycle % 1;
      const move = Math.max(0, Math.min(1, (phase - .45) / .55));
      const eased = move * move * (3 - 2 * move);
      const offset = reducedMotion ? 0 : (Math.floor(cycle) + eased) / 5;
      nodesRef.current.forEach((node, index) => {
        if (!node) return;
        const position = ((index / 5 + .1 + offset) % 1 + 1) % 1;
        const angle = position * Math.PI;
        node.style.left = `${50 - 44 * Math.cos(angle)}%`;
        node.style.top = `${8 + 68 * Math.sin(angle)}%`;
        const edgeVisibility = Math.min(1, position / .045, (1 - position) / .045);
        node.style.opacity = String(edgeVisibility);
        // The few frames at either end are decorative; never leave a hidden hit target.
        node.style.visibility = edgeVisibility < .05 ? 'hidden' : 'visible';
      });
      if (running) frame = requestAnimationFrame(render);
    };
    render(0);
    return () => cancelAnimationFrame(frame);
  }, [running, reducedMotion]);

  const active = JOURNEY_STEPS.find(step => step.id === activeStep)!;
  return (
    <div className="journey-flow" data-running={running}>
      <div className="journey-orbit" ref={stageRef} role="group" aria-label={t('Dein verbundenes Creator-System')}
        onFocusCapture={() => setPaused(true)}>
        <svg className="journey-orbit-lines" viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
          <defs><linearGradient id="journey-line-fade" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#20c997" stopOpacity="0" /><stop offset=".65" stopColor="#20c997" stopOpacity=".42" /><stop offset="1" stopColor="#20c997" stopOpacity=".28" /></linearGradient></defs>
          <path d="M60 40 A440 340 0 0 0 940 40" stroke="url(#journey-line-fade)" fill="none" />
          <path d="M500 254 V380" className="journey-hub-connection" />
          <circle className="journey-signal journey-signal-one" r="3" />
          <circle className="journey-signal journey-signal-two" r="3" />
          <circle className="journey-signal journey-signal-three" r="3" />
        </svg>
        <div className="journey-hub" aria-label="SnapSell">
          <div className="journey-hub-core"><Zap fill="currentColor" strokeWidth={1} /><strong>SnapSell</strong><span>{t('DEIN WORKSPACE')}</span></div>
        </div>
        {JOURNEY_STEPS.map((step, index) => {
          const Icon = step.icon;
          return <AnimatedButton key={step.id} ref={node => { nodesRef.current[index] = node; }}
            className={`journey-node ${step.id === activeStep ? 'is-selected' : ''}`}
            style={{left: `${50 - 44 * Math.cos((index / 5 + .1) * Math.PI)}%`, top: `${8 + 68 * Math.sin((index / 5 + .1) * Math.PI)}%`}}
            aria-pressed={step.id === activeStep} aria-controls="journey-step-detail"
            onClick={() => { setActiveStep(step.id); setPaused(true); }}>
            <span className="journey-node-disc"><Icon strokeWidth={1.5} /></span>
            <span className="journey-node-title">{t(step.title)}</span>
            <span className="journey-node-role">{t(step.shortRole)}</span>
          </AnimatedButton>;
        })}
      </div>
      <div className="journey-caption">
        <p>{t('Content → Chat → CRM → Angebot → Zahlung → Follow-up')}</p>
        {!reducedMotion && <AnimatedButton className="journey-motion-toggle" onClick={() => setPaused(value => !value)} aria-pressed={paused}
          aria-label={t(paused ? 'Animationen abspielen' : 'Animationen pausieren')}>
          {paused ? <Play size={13} /> : <Pause size={13} />}{t(paused ? 'Abspielen' : 'Pause')}
        </AnimatedButton>}
      </div>
      <div id="journey-step-detail" className="journey-detail" aria-live="polite" aria-atomic="true">
        <div><p className="journey-detail-meta">{t(active.phase)} · {t(active.previewBadge)}</p><h3>{t(active.title)} <span>— {t(active.shortRole)}</span></h3><p>{t(active.detail)}</p></div>
        <div className="journey-next"><span>{t('DEIN NÄCHSTER SCHRITT')}</span><strong>{t(active.metric)}</strong><small>{t('Illustrativer Ablauf')}</small></div>
      </div>
    </div>
  );
};
