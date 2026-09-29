import React, { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';

export function HeroDashboardVideo({ paused }: { paused: boolean }) {
  useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [blocked, setBlocked] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || failed) return;
    let inView = true;
    let disposed = false;
    const synchronize = () => {
      if (paused || document.hidden || !inView) {
        video.pause();
        return;
      }
      void video.play().catch(() => {
        if (!disposed && !video.paused) return;
        if (!disposed && !paused && inView && !document.hidden) setBlocked(true);
      });
    };
    const observer = new IntersectionObserver(entries => {
      inView = entries.some(entry => entry.isIntersecting);
      synchronize();
    }, { threshold: 0.05 });
    observer.observe(video);
    document.addEventListener('visibilitychange', synchronize);
    synchronize();
    return () => {
      disposed = true;
      observer.disconnect();
      document.removeEventListener('visibilitychange', synchronize);
      video.pause();
    };
  }, [paused, failed]);

  return <div className="hero-dashboard-video-frame">
    {failed ? <img className="hero-dashboard-video" src="/media/dashboard-poster.png" alt={t('Animierte SnapSell-Dashboard-Vorschau')} /> : <video
      ref={videoRef}
      className="hero-dashboard-video"
      src="/media/dashboard-motion.mp4"
      poster="/media/dashboard-poster.png"
      muted
      loop
      playsInline
      preload="auto"
      aria-label={t('Animierte SnapSell-Dashboard-Vorschau')}
      onPlaying={() => setBlocked(false)}
      onError={() => setFailed(true)}
    />}
    {blocked && !paused && !failed && <AnimatedButton className="hero-video-play reference-primary" onClick={() => { void videoRef.current?.play().catch(() => setBlocked(true)); }}><Play size={15} />{t('Video abspielen')}</AnimatedButton>}
    {failed && <p className="hero-video-fallback" role="status">{t('Video nicht verfügbar. Statische Vorschau wird angezeigt.')}</p>}
  </div>;
}
