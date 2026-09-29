import React, { useEffect, useRef, useState } from 'react';

export function FeatureCardVideo({ kind, paused }: { kind: string; paused: boolean }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const poster = `/media/struggle/${kind}.jpg`;

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const observer = new IntersectionObserver(entries => {
      setInView(entries.some(entry => entry.isIntersecting));
    }, { threshold: 0.1 });
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (inView && !paused) setLoaded(true);
  }, [inView, paused]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loaded || failed) return;
    let disposed = false;
    const synchronize = () => {
      if (disposed || paused || !inView || document.hidden) {
        video.pause();
      } else {
        // Muted inline playback may still be blocked by a browser's media policy.
        // In that case the supplied poster remains visible.
        void video.play().catch(() => {});
      }
    };
    synchronize();
    document.addEventListener('visibilitychange', synchronize);
    return () => {
      disposed = true;
      document.removeEventListener('visibilitychange', synchronize);
      video.pause();
    };
  }, [inView, paused, loaded, failed]);

  return <div ref={frameRef} className="sf-video-frame">
    {failed ? <img className="sf-card-video" src={poster} alt="" /> : <video
      ref={videoRef}
      className="sf-card-video"
      src={loaded ? `/media/struggle/${kind}.mp4` : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      onError={() => setFailed(true)}
    />}
  </div>;
}
