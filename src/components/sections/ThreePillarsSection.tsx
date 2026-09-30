import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useReducedMotion } from 'motion/react';
import { t, useLanguage } from '../../i18n';
import '../../pillars.css';

interface ThreePillarsSectionProps { onSelectPillar?: (targetSectionId: string) => void; }

// ─── Data ────────────────────────────────────────────────────────────────────

const PILLARS = [
  {
    id: 'ai-content',
    num: '01',
    labelKey: 'AI Content',
    headingKey: 'Create more. Start with one idea.',
    descKey: 'Turn your ideas into content you can share.',
    video: '/videos/pillars/ai-content.mp4',
    poster: '/client-assets/pillars/ai-content-poster.png',
    captionSide: 'left' as const,
  },
  {
    id: 'ai-chat',
    num: '02',
    labelKey: 'AI Chat',
    headingKey: 'Keep the conversation going.',
    descKey: 'Support your audience while you focus on creating.',
    video: '/videos/pillars/ai-chat.mp4',
    poster: '/client-assets/pillars/ai-chat-poster.png',
    captionSide: 'right' as const,
  },
  {
    id: 'snapsell',
    num: '03',
    labelKey: 'SnapSell',
    headingKey: 'From interest to purchase.',
    descKey: 'Give your audience a simple way to buy your digital products.',
    video: '/videos/pillars/snapsell.mp4',
    poster: '/client-assets/pillars/snapsell-poster.png',
    captionSide: 'left' as const,
  },
] as const;

type Pillar = typeof PILLARS[number];

// ─── PillarScene ─────────────────────────────────────────────────────────────

interface PillarSceneProps {
  pillar: Pillar;
  index: number;
  sceneRef: { current: HTMLDivElement | null };
  mediaRef: { current: HTMLDivElement | null };
  videoRef: { current: HTMLVideoElement | null };
  captionRef: { current: HTMLDivElement | null };
  isSticky: boolean;
}

const PillarScene: React.FC<PillarSceneProps> = ({
  pillar, index, sceneRef, mediaRef, videoRef, captionRef, isSticky,
}) => {
  const manuallyPausedRef = useRef(false);

  // IntersectionObserver autoplay for non-sticky (mobile / reduced-motion)
  useEffect(() => {
    if (isSticky) return;
    const video = videoRef.current;
    if (!video) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !manuallyPausedRef.current) {
          video.play().catch(() => {});
        } else if (!entry.isIntersecting) {
          video.pause();
          // Reset manual pause when scrolled off, so it will autoplay again on re-entry
          manuallyPausedRef.current = false;
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(video);
    return () => obs.disconnect();
  }, [isSticky, videoRef]);

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      manuallyPausedRef.current = false;
      video.play().catch(() => {});
    } else {
      manuallyPausedRef.current = true;
      video.pause();
    }
  }, [videoRef]);

  return (
    <div
      ref={(el) => { sceneRef.current = el; }}
      className={`ps-scene ps-scene-${index}`}
      data-side={pillar.captionSide}
      data-index={index}
    >
      {/* Caption */}
      <div
        ref={(el) => { captionRef.current = el; }}
        className={`ps-caption ps-caption-${pillar.captionSide}`}
      >
        <span className="ps-label">{pillar.num} / {t(pillar.labelKey)}</span>
        <h3>{t(pillar.headingKey)}</h3>
        <p>{t(pillar.descKey)}</p>
      </div>

      {/* Media */}
      <div className="ps-media-wrap" ref={(el) => { mediaRef.current = el; }}>
        <div className="ps-media">
          <video
            ref={(el) => { videoRef.current = el; }}
            className="ps-video"
            src={pillar.video}
            poster={pillar.poster}
            muted
            playsInline
            loop
            preload={index === 0 ? 'metadata' : 'none'}
            aria-label={`${t(pillar.labelKey)}: ${t(pillar.headingKey)}`}
          />
          <img
            className="ps-poster-fallback"
            src={pillar.poster}
            alt=""
            aria-hidden="true"
            loading={index === 0 ? 'eager' : 'lazy'}
          />
          <button
            className="ps-play-btn"
            onClick={handleTogglePlay}
            aria-label={t('Pause/Play')}
            type="button"
          >
            <span className="ps-play-icon" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

// Create stable ref arrays outside the component so they are never recreated
const N = PILLARS.length;
function makeRefArr<T>(): Array<{ current: T | null }> {
  return Array.from({ length: N }, () => ({ current: null }));
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = () => {
  useLanguage();
  const reducedMotion = useReducedMotion();

  const [isSticky, setIsSticky] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 900px)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 900px)');
    const update = () => setIsSticky(mq.matches && !reducedMotion);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, [reducedMotion]);

  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  // Stable ref arrays (not recreated on render)
  const sceneRefs = useRef(makeRefArr<HTMLDivElement>());
  const mediaRefs = useRef(makeRefArr<HTMLDivElement>());
  const videoRefs = useRef(makeRefArr<HTMLVideoElement>());
  const captionRefs = useRef(makeRefArr<HTMLDivElement>());
  const manualPausedFlags = useRef<boolean[]>(Array(N).fill(false));

  // Scroll-driven RAF loop for sticky desktop
  useEffect(() => {
    if (!isSticky) {
      // Non-sticky: reset all inline styles
      sceneRefs.current.forEach(r => { if (r.current) r.current.style.transform = ''; });
      mediaRefs.current.forEach(r => { if (r.current) r.current.style.transform = ''; });
      captionRefs.current.forEach(r => { if (r.current) r.current.style.opacity = ''; });
      return;
    }

    const stage = stageRef.current;
    const pin = pinRef.current;
    if (!stage || !pin) return;

    let raf = 0;
    let activeIndex = -1;

    const playVideo = (i: number) => {
      const video = videoRefs.current[i]?.current;
      if (!video || manualPausedFlags.current[i]) return;
      video.play().catch(() => {});
    };
    const pauseVideo = (i: number) => {
      const video = videoRefs.current[i]?.current;
      if (!video) return;
      video.pause();
    };

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const ease = (t: number) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const render = () => {
      raf = 0;
      const stageBox = stage.getBoundingClientRect();
      const stageH = stage.offsetHeight;
      const viewH = window.innerHeight;

      const scrolled = Math.max(0, -stageBox.top);
      const totalTravel = Math.max(1, stageH - viewH);
      const segH = totalTravel / N;

      const globalProg = clamp01(scrolled / totalTravel);

      // Determine active panel
      const nextActive = Math.min(N - 1, Math.floor(globalProg * N + 0.2));
      if (nextActive !== activeIndex) {
        if (activeIndex >= 0) pauseVideo(activeIndex);
        activeIndex = nextActive;
        playVideo(activeIndex);
      }

      PILLARS.forEach((_, i) => {
        const segStart = i * segH;
        const rawSeg = (scrolled - segStart) / segH;

        const scene = sceneRefs.current[i]?.current;
        const media = mediaRefs.current[i]?.current;
        const caption = captionRefs.current[i]?.current;
        if (!scene || !media) return;

        // How far this panel has departed (0 = still here, 1 = gone)
        // Panel i departs during segment i (rawSeg: 0→1)
        const departure = i < N - 1 ? clamp01(rawSeg) : 0;

        // translateY: panel moves up as it departs
        const translateY = -ease(departure) * 100; // moves up 100vh

        // Scale for the media: incoming panels (i > 0) start at 0.96 and reach 1
        const arrival = i === 0 ? 1 : clamp01((scrolled - (i - 1) * segH) / segH);
        const scale = 0.96 + ease(arrival) * 0.04;

        scene.style.transform = `translateY(${translateY.toFixed(2)}vh)`;
        media.style.transform = `scale(${scale.toFixed(4)})`;

        if (caption) {
          // Caption fades in as panel arrives, fades out as it departs
          const fadeIn = i === 0 ? 1 : clamp01((arrival - 0.2) / 0.5);
          const fadeOut = i < N - 1 ? clamp01(1 - departure * 4) : 1;
          caption.style.opacity = (fadeIn * fadeOut).toFixed(3);
        }
      });
    };

    const schedule = () => { if (!raf) raf = requestAnimationFrame(render); };
    render();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const ro = new ResizeObserver(schedule);
    ro.observe(stage);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      ro.disconnect();
      PILLARS.forEach((_, i) => pauseVideo(i));
    };
  }, [isSticky]);

  return (
    <section id="section-4" className="landing-section pillars-section" aria-labelledby="pillars-heading">

      <header className="pillars-heading">
        <h2 id="pillars-heading">
          {t('Drei Säulen.')}{' '}
          <span className="pillars-heading-mint">{t('Ein Business.')}</span>
        </h2>
      </header>

      <div
        ref={stageRef}
        className={`pillars-stage ${isSticky ? 'is-sticky' : ''}`}
      >
        <div ref={pinRef} className="pillars-pin">
          {PILLARS.map((pillar, i) => (
            <PillarScene
              key={pillar.id}
              pillar={pillar}
              index={i}
              sceneRef={sceneRefs.current[i]}
              mediaRef={mediaRefs.current[i]}
              videoRef={videoRefs.current[i]}
              captionRef={captionRefs.current[i]}
              isSticky={isSticky}
            />
          ))}
        </div>
      </div>

    </section>
  );
};
