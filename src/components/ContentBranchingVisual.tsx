import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage } from '../i18n';
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Video, Sparkles, Compass, Dumbbell, ShoppingCart } from 'lucide-react';

const BRANCH_FORMATS = [
  { id: 'story', title: 'Story', icon: Camera, image: "https://images.pexels.com/photos/6001501/pexels-photo-6001501.jpeg?auto=compress&cs=tinysrgb&w=1000", position: '50% 40%', description: 'Persönliche Einblicke für dein vertikales Story-Format.', tag: 'Dein vertikales Format', badge: 'Deine Freigabe' },
  {
    id: 'fashion',
    title: "AI-Foto",
    icon: Camera,
    image: "https://images.pexels.com/photos/2531119/pexels-photo-2531119.jpeg?auto=compress&cs=tinysrgb&w=1000", position: '50% 75%', description: 'Fashion und Editorials als Inspiration für deinen eigenen Stil.',
    tag: "Studio und Fashion",
    badge: "Dein Stil"
  },
  {
    id: 'fitness',
    title: "Reel",
    icon: Dumbbell,
    image: "https://images.pexels.com/photos/4534637/pexels-photo-4534637.jpeg?auto=compress&cs=tinysrgb&w=1000", position: '50% 60%', description: 'Bewegung, Routinen und Lifestyle für deine kurzen Clips.',
    tag: "Bewegung und Lifestyle",
    badge: "Deine Idee"
  },
  {
    id: 'travel',
    title: "Travel-Content",
    icon: Compass,
    image: "https://isorepublic.com/wp-content/uploads/2018/11/santorini-1100x733.jpg", position: '50% 50%', description: 'Neue Orte und Perspektiven für deine Travel-Geschichten.',
    tag: "Neue Perspektiven",
    badge: "Deine Freigabe"
  },
  {
    id: 'video',
    title: "Talking Video",
    icon: Video,
    image: "https://images.pexels.com/photos/2041396/pexels-photo-2041396.jpeg?auto=compress&cs=tinysrgb&w=1000", position: '65% 50%', description: 'Deine Themen und deine Stimme im Mittelpunkt.',
    tag: "Deine Stimme",
    badge: "Deine Kontrolle"
  },
  {
    id: 'promo',
    title: "Produktvisual",
    icon: ShoppingCart,
    image: "https://images.pexels.com/photos/942872/pexels-photo-942872.jpeg?auto=compress&cs=tinysrgb&w=1000", position: '50% 50%', description: 'Präsentiere deine Guides, Workbooks und digitalen Angebote.',
    tag: "Dein digitales Angebot",
    badge: "Dein Angebot"
  }
];

export const ContentBranchingVisual: React.FC = () => {
  useLanguage();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [touching, setTouching] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const root = useRef<HTMLDivElement>(null);
  const remaining = useRef(4500);
  const selectedFormat = BRANCH_FORMATS[selectedIndex];
  const stopped = hovered || focused || touching || paused || reducedMotion || !visible || !pageVisible;

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setPageVisible(!document.hidden);
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.1 });
    if (root.current) observer.observe(root.current);
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); media.removeEventListener('change', updateMotion); document.removeEventListener('visibilitychange', updateVisibility); };
  }, []);

  useEffect(() => {
    if (stopped) return;
    const started = performance.now();
    let advanced = false;
    const timer = window.setTimeout(() => {
      advanced = true;
      remaining.current = 4500;
      setSelectedIndex(index => (index + 1) % BRANCH_FORMATS.length);
    }, remaining.current);
    return () => {
      clearTimeout(timer);
      if (!advanced) remaining.current = Math.max(0, remaining.current - (performance.now() - started));
    };
  }, [stopped, selectedIndex]);

  const selectFormat = (index: number) => { remaining.current = 4500; setSelectedIndex(index); };

  return (
    <div ref={root} className="content-format-loop w-full max-w-4xl mx-auto flex flex-col items-center"
      onPointerEnter={event => { if (event.pointerType === 'mouse') setHovered(true); }}
      onPointerLeave={() => setHovered(false)}
      onPointerDown={event => { if (event.pointerType !== 'mouse') setTouching(true); }}
      onPointerUp={() => setTouching(false)} onPointerCancel={() => setTouching(false)}
      onFocusCapture={event => setFocused(event.target.matches(':focus-visible'))}
      onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocused(false); }}>
      {/* Central Identity Anchor */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 p-4 rounded-2xl bg-[#141414]/90 border border-white/10 shadow-2xl backdrop-blur-md">
        <div className="relative">
          <img loading="lazy"
            src="https://images.pexels.com/photos/6001501/pexels-photo-6001501.jpeg?auto=compress&cs=tinysrgb&w=300"
            alt={t("Creator-Porträt · Stockfoto")}
            referrerPolicy="no-referrer"
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-[#20C997] shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#20C997] text-white p-1 rounded-full shadow">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20C997]/15 text-[#20C997] text-xs font-semibold uppercase tracking-wider mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#20C997] animate-ping" />
            <span>{t("DEIN FREIGEGEBENER STIL")}</span>
          </div>
          <h4 className="text-base font-bold text-white font-display">{t("Ein Konzept. Viele Content-Formate.")}</h4>
          <p className="text-xs text-white/60 max-w-xs mt-0.5">{t(" Du bestimmst dein Aussehen, deine Stimme und jede finale Freigabe. Diese Bilder zeigen lediglich Formate als Vorschau. ")}</p>
        </div>
      </div>

      {/* 5 Branching Formats Selector Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 w-full mb-6">
        {t(BRANCH_FORMATS.map((item, index) => {
          const isSelected = selectedFormat.id === item.id;
          const IconComponent = item.icon;
          return (
            <AnimatedButton
              key={item.id}
              aria-pressed={isSelected}
              onClick={() => selectFormat(index)}
              aria-controls="content-format-preview"
              className={`p-3 rounded-xl text-left transition-all duration-300 relative overflow-hidden border ${
                isSelected
                  ? 'bg-[#1C1B1E] border-[#20C997] shadow-lg shadow-[#20C997]/20 scale-102'
                  : 'bg-[#121113]/80 border-white/5 hover:border-white/20 hover:bg-[#18161A]'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#20C997] text-white' : 'bg-white/5 text-white/60'}`}>
                  <IconComponent className="w-4 h-4" />
                </div>
                <span className="text-[9px] font-mono text-[#20C997] font-semibold">{t(item.badge)}</span>
              </div>
              <div className="font-semibold text-xs text-white line-clamp-1">{t(item.title)}</div>
              <div className="text-[10px] text-white/50 truncate mt-0.5">{t(item.tag)}</div>
            </AnimatedButton>
          );
        }))}
      </div>

      <div className="w-full flex flex-wrap items-center justify-between gap-3 text-[11px] text-white/50 mb-3">
        <span>{t('Echte Stockfotografie · illustrative Formatbeispiele')}</span>
        <div className="flex items-center gap-3"><span className="font-mono text-[#20C997]">{selectedIndex + 1} / {BRANCH_FORMATS.length}</span>
          {!reducedMotion && <AnimatedButton type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)} className="border border-white/15 rounded-full px-3 py-1.5">{t(paused ? 'Formatvorschau fortsetzen' : 'Formatvorschau pausieren')}</AnimatedButton>}
        </div>
      </div>
      {/* Active Output Showcase Card */}
      <div id="content-format-preview" className="w-full bg-[#121113] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 relative h-56 md:h-72 overflow-hidden bg-black/40">
          {BRANCH_FORMATS.map((format, index) => <img
            key={format.id} src={format.image} alt={index === selectedIndex ? t(format.title) : ''}
            aria-hidden={index !== selectedIndex} loading="lazy" referrerPolicy="no-referrer"
            style={{ objectPosition: format.position }}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 motion-reduce:transition-none ${index === selectedIndex ? 'opacity-100' : 'opacity-0'}`}
          />)}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="bg-black/70 backdrop-blur-sm text-white/90 text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">{t(" Formatbeispiel · kein Identitätsnachweis ")}</span>
            <span className="bg-[#20C997] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">{t(" VORSCHAU ")}</span>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5 sm:p-6 text-left space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#20C997] font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t("Dein Content-Format")}</span>
          </div>
          <h4 className="text-xl font-bold font-display text-white">{t(selectedFormat.title)}</h4>
          <p className="text-xs text-white/70 leading-relaxed">{t(selectedFormat.description)}</p>
          <div className="pt-2 flex items-center gap-2 text-[11px] text-[#D7BE8A]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D7BE8A]" />
            <span>{t("Dein Aussehen. Deine Themen. Deine Freigabe.")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
