import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { t, useLanguage } from '../i18n';
import './snapsell-step-videos.css';

const steps = [
  ['Content hochladen', 'Lade deine freigegebenen Inhalte hoch und erstelle ein digitales Produkt.'],
  ['Preis festlegen', 'Lege Inhalt, Umfang und Preis deines Angebots fest.'],
  ['Payment-Link teilen', 'Teile den passenden SnapSell-Link mit interessierten Käufern.'],
  ['Zahlung erhalten', 'Dein Käufer öffnet den Payment-Link und bezahlt das Angebot.'],
  ['Inhalt ausliefern', 'Nach erfolgreicher Zahlung wird der gekaufte Inhalt bereitgestellt.'],
];

const StepVideo: React.FC<{ step: number; lang: 'en' | 'de' }> = ({ step, lang }) => {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const manualPause = useRef(false);
  const visible = useRef(false);
  const base = `/media/snapsell-steps/${step}-${lang}`;
  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const sync = () => {
      if (!visible.current || document.hidden) video.pause();
      else if (!reduced && !manualPause.current && !video.ended) void video.play().catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => { visible.current = entry.isIntersecting; sync(); }, { threshold: 0.4 });
    observer.observe(video);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); video.pause(); };
  }, [reduced]);
  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (!video.paused) { manualPause.current = true; video.pause(); }
    else {
      manualPause.current = false;
      if (video.ended) { video.currentTime = 0; setEnded(false); }
      void video.play().catch(() => setPlaying(false));
    }
  };
  return <div className="ss-film">
    <video ref={ref} src={`${base}.mp4`} poster={`${base}.jpg`} muted playsInline preload="metadata"
      aria-label={`${t(steps[step - 1][0])} — ${lang === 'en' ? 'illustrative video demo' : 'illustrative Videovorschau'}`}
      onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
      onEnded={() => { setEnded(true); setPlaying(false); }} onError={() => setFailed(true)} />
    <div className="ss-film-controls">
      <span>{lang === 'en' ? 'Illustrative demo · 5 sec' : 'Illustrative Vorschau · 5 Sek.'}</span>
      {failed ? <span role="status">{lang === 'en' ? 'Video unavailable' : 'Video nicht verfügbar'}</span> :
        <button type="button" onClick={toggle}>{playing ? 'Pause' : ended ? (lang === 'en' ? 'Replay' : 'Wiederholen') : (lang === 'en' ? 'Play' : 'Abspielen')}</button>}
    </div>
  </div>;
}

export const SnapSellFlowMockup: React.FC = () => {
  const lang = useLanguage();
  const [active, setActive] = useState(0);
  return <div className="ss-walkthrough">
    <nav className="ss-steps" aria-label={lang === 'en' ? 'SnapSell steps' : 'SnapSell Schritte'}>
      {steps.map(([title], i) => <button key={title} type="button" aria-pressed={active === i}
        aria-controls="snapsell-step-panel" onClick={() => setActive(i)}>
        <span className="ss-step-number">0{i + 1}</span><span>{t(title)}</span>
      </button>)}
    </nav>
    <div id="snapsell-step-panel" className="ss-panel">
      <StepVideo key={`${active}-${lang}`} step={active + 1} lang={lang} />
      <div className="ss-step-copy" aria-live="polite">
        <span className="ss-step-eyebrow">0{active + 1} / 05</span>
        <h3>{t(steps[active][0])}</h3><p>{t(steps[active][1])}</p>
        <button type="button" onClick={() => setActive((active + 1) % 5)}>
          {t(active < 4 ? 'Nächster Schritt' : 'Vorschau neu starten')} <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </div>;
};
