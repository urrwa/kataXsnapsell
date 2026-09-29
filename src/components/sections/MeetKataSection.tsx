import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import React, { useState, useRef } from 'react';
import { ASSET_SLOTS } from '../../data/content';
import { Award, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import '../../meet-kata.css';

interface MeetKataSectionProps { onStartWithKata: () => void; }

export const MeetKataSection: React.FC<MeetKataSectionProps> = ({ onStartWithKata }) => {
  useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => setIsPlaying(false));
    else video.pause();
  };

  return (
    <section id="section-3" className="landing-section meet-kata" aria-labelledby="meet-kata-heading">
      <div className="meet-kata-layout">
        <div className="meet-kata-visuals">
          <div className="meet-kata-portrait">
            <img loading="lazy" src={ASSET_SLOTS.kataPortrait.src}
              alt={t('Katharina, Creator-Coach und Mentorin')} referrerPolicy="no-referrer" />
            <div className="meet-kata-experience">
              <Award size={19} strokeWidth={1.5} aria-hidden="true" />
              <div><strong>{t('20+ Jahre Erfahrung')}</strong><span>{t('Coaching und Training')}</span></div>
            </div>
          </div>
          <div className="meet-kata-video">
            <video ref={videoRef}
              src="https://res.cloudinary.com/n5nqkpmk/video/upload/v1790000241/01_a04ekp.mp4"
              poster={ASSET_SLOTS.kataCoachingVideoPoster.src}
              playsInline preload="none" muted={isMuted} loop
              onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}
              onError={() => setIsPlaying(false)} />
            <AnimatedButton type="button" onClick={togglePlay} className="meet-kata-play"
              aria-label={t(isPlaying ? 'Coaching-Video pausieren' : 'Coaching-Video abspielen')}>
              <span className="meet-kata-play-icon">{isPlaying ? <Pause size={21} /> : <Play size={21} />}</span>
              <span>{t(isPlaying ? 'Video pausieren' : 'Katharina kennenlernen')}</span>
            </AnimatedButton>
            <AnimatedButton type="button" onClick={() => setIsMuted(value => !value)}
              aria-label={t(isMuted ? 'Ton einschalten' : 'Ton ausschalten')}
              aria-pressed={!isMuted} className="meet-kata-sound">
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </AnimatedButton>
          </div>
        </div>
        <div className="meet-kata-copy space-y-6">
          <p className="meet-kata-eyebrow"><span />{t('DEINE CREATOR-MENTORIN')}</p>
          <div>
            <h2 id="meet-kata-heading">{t('Dein nächstes Kapitel.')}<br />{t('Mit Katharina.')}</h2>
            <p className="meet-kata-subtitle">{t('Creatorin. Coach.')} <span>{t('Deine Creator Mama.')}</span></p>
          </div>
          <p className="meet-kata-description">{t('Baue dein Creator-Business mit Katharinas Begleitung auf. Mit über 20 Jahren Branchenerfahrung hilft sie Frauen, ihre persönliche Marke zu stärken, selbstbewusste Entscheidungen zu treffen und Systeme für ihr Wachstum aufzubauen.')}</p>
          {/* Editorial copy, not an attributed quote until Katharina confirms the wording. */}
          <p className="meet-kata-note">{t('Hör auf, alles allein zu machen. Fang an, wie eine Unternehmerin zu denken.')}</p>
          <p className="meet-kata-benefits">{t('Persönliche Begleitung · Klare Systeme · Deine eigene Marke')}</p>
          <div>
            <AnimatedButton animateArrow id="meet-kata-start-btn" onClick={onStartWithKata}
              className="meet-kata-cta">{t('Für die Academy bewerben')}</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};
