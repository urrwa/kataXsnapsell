import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useEffect, useRef, useState } from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { Award, Play, Pause } from 'lucide-react';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void; }

export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [documentVisible, setDocumentVisible] = useState(true);

  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Video play/pause logic
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: .15 });
    observer.observe(video);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentVisible(!document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      preference.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView && documentVisible && !paused && !hovered && !focused && !reducedMotion) {
      video.play().catch(() => setPaused(true));
    } else video.pause();
  }, [inView, documentVisible, paused, hovered, focused, reducedMotion]);

  // Scroll-driven portrait reveal — image rises up behind the heading
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const portrait = portraitRef.current;
    if (!section || !portrait) return;

    let raf = 0;
    const render = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 when section top hits bottom of viewport, 1 when section top hits viewport top
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh + rect.height * 0.4)));
      // Portrait starts fully clipped (only top visible), reveals as you scroll in
      const revealed = Math.round(progress * 100);
      portrait.style.clipPath = `inset(${100 - revealed}% 0 0 0)`;
      portrait.style.transform = `translateY(${(1 - progress) * 60}px)`;
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (portraitRef.current) {
        portraitRef.current.style.clipPath = '';
        portraitRef.current.style.transform = '';
      }
    };
  }, [reducedMotion]);

  return (
    <section id="section-3" ref={sectionRef} className="landing-section meet-kata" aria-labelledby="meet-kata-heading">

      {/* Giant heading — stays on top via z-index, portrait rises behind it */}
      <div className="mk-hero-text" aria-hidden="true">
        <span>{t('MEHR ÜBER')}</span>
        <span className="mk-hero-name">{t('KATHARINA©')}</span>
      </div>

      {/* Portrait rises through the heading */}
      <div className="mk-portrait-stage">
        <div className="mk-portrait-reveal" ref={portraitRef}>
          <img
            loading="lazy"
            src={ASSET_SLOTS.heroKata.src}
            alt={t('Katharina, Creator-Coach und Mentorin')}
            referrerPolicy="no-referrer"
          />
          <div className="mk-experience-badge">
            <Award size={19} strokeWidth={1.5} aria-hidden="true" />
            <div>
              <strong>{t('20+ Jahre Erfahrung')}</strong>
              <span>{t('Coaching und Training')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Copy + video below */}
      <div className="mk-body">
        <div className="mk-body-grid">

          {/* Left: copy */}
          <div className="mk-copy">
            <p className="mk-eyebrow"><span className="mk-dot" />{t('DEINE CREATOR-MENTORIN')}</p>
            <h2 id="meet-kata-heading" className="mk-heading">
              {t('Dein nächstes Kapitel.')}<br />
              <span className="mk-heading-mint">{t('Mit Katharina.')}</span>
            </h2>
            <p className="mk-subtitle">
              {t('Creatorin. Coach.')} <span>{t('Deine Creator Mama.')}</span>
            </p>
            <p className="mk-description">
              {t('Baue dein Creator-Business mit Katharinas Begleitung auf. Mit über 20 Jahren Branchenerfahrung hilft sie Frauen, ihre persönliche Marke zu stärken, selbstbewusste Entscheidungen zu treffen und Systeme für ihr Wachstum aufzubauen.')}
            </p>
            <p className="mk-note">
              {t('Hör auf, alles allein zu machen. Fang an, wie eine Unternehmerin zu denken.')}
            </p>
            <p className="mk-benefits">{t('Persönliche Begleitung · Klare Systeme · Deine eigene Marke')}</p>
            <AnimatedButton animateArrow id="meet-kata-start-btn" onClick={onStartWithKata} className="mk-cta">
              {t('Für die Academy bewerben')}
            </AnimatedButton>
          </div>

          {/* Right: floating video card */}
          <div
            className="mk-video-wrap"
            onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
            onPointerLeave={() => setHovered(false)}
            onFocusCapture={event => { if (event.target.matches(':focus-visible')) setFocused(true); }}
            onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
          >
            <video
              ref={videoRef}
              src="/media/mentor/coaching-ai-v2.mp4"
              poster="/media/mentor/coaching-ai-v2-poster.jpg"
              aria-label={t('Coaching-Einblick · KI-generierte Vorschau')}
              playsInline preload="metadata" muted loop
              onError={() => setPaused(true)}
            />
            <div className="mk-video-caption">
              <strong>{t('Coaching-Einblick')}</strong>
              <span>{t('KI-generierte Vorschau')}</span>
            </div>
            <AnimatedButton
              type="button"
              onClick={() => { if (reducedMotion) { setReducedMotion(false); setPaused(false); } else setPaused(v => !v); }}
              aria-label={t(paused || reducedMotion ? 'Coaching-Video abspielen' : 'Coaching-Video pausieren')}
              aria-pressed={paused}
              className="mk-sound-btn"
            >
              {paused || reducedMotion ? <Play size={15} /> : <Pause size={15} />}
            </AnimatedButton>
          </div>

        </div>
      </div>

    </section>
  );
};
