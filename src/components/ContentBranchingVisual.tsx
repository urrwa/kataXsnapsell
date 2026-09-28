import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Camera, Video, Clapperboard, AlignLeft, Check, Sparkles, AudioLines, ScanFace, Globe2 } from 'lucide-react';
import { EDITORIAL_IMAGES } from '../data/images';

const CONTENT_FORMATS = [
  { id: 'photo', icon: Camera, title: 'Realistic AI photos', subtitle: 'Your aesthetic, in new settings', heading: 'A new setting. The same you.', description: 'Create photorealistic lifestyle and editorial imagery around your approved appearance and visual direction.', tags: ['Lifestyle', 'Fashion', 'Travel'], label: 'PHOTO DIRECTION', note: 'Appearance · Styling · Setting' },
  { id: 'talking', icon: Video, title: 'Talking videos', subtitle: 'Your message, in your voice', heading: 'Show up without another shoot.', description: 'Turn approved scripts into talking clips, with your persona and voice guiding the content.', tags: ['Talking clips', 'Voice', 'Scripts'], label: 'TALKING CLIP', note: 'Script · Voice · Delivery' },
  { id: 'reels', icon: Clapperboard, title: 'Reels & stories', subtitle: 'Made for your everyday channels', heading: 'One identity. More ways to show up.', description: 'Build short-form content around your ideas, with hooks, visual direction and captions adapted for reels and stories.', tags: ['Reels', 'Stories', 'Short videos'], label: 'SHORT-FORM CONTENT', note: 'Hook · Story · Call to action' },
  { id: 'writing', icon: AlignLeft, title: 'Scripts & captions', subtitle: 'Your tone, across languages', heading: 'Words that sound like you.', description: 'Create scripts and captions in your tone, then adapt them for different languages and audiences.', tags: ['Scripts', 'Captions', 'Multilingual'], label: 'YOUR VOICE IN WORDS', note: 'Tone · Message · Language' },
] as const;

export const ContentBranchingVisual: React.FC = () => {
  const [selected, setSelected] = useState<string>('photo');
  const reduceMotion = useReducedMotion();
  const format = CONTENT_FORMATS.find(item => item.id === selected)!;
  const Icon = format.icon;
  return (
    <div className="ai-content-flow">
      <div className="ai-content-formats">
        <div className="ai-content-formats__eyebrow">ONE CREATOR. MULTIPLE CONTENT FORMATS.</div>
        <div className="ai-content-formats__choices">
          {CONTENT_FORMATS.map(({ id, icon: FormatIcon, title, subtitle }, index) => (
            <button type="button" key={id} aria-pressed={id === selected} aria-controls="ai-content-preview" onClick={() => setSelected(id)} className={id === selected ? 'is-selected' : ''}>
              <span className="ai-content-formats__icon"><FormatIcon size={20} strokeWidth={1.7} /></span>
              <span><strong>{title}</strong><small>{subtitle}</small></span>
              <span className="ai-content-formats__number">{id === selected ? <Check size={16} /> : `0${index + 1}`}</span>
            </button>
          ))}
        </div>
        <div className="ai-content-explanation" aria-live="polite"><h3>{format.heading}</h3><p>{format.description}</p></div>
      </div>
      <div className="ai-content-visual" id="ai-content-preview" role="region" aria-label="AI content workflow preview">
        <div className="ai-content-visual__top"><span><ScanFace size={16} /> YOUR APPROVED IDENTITY</span><span>CONTENT WORKFLOW</span></div>
        <div className="ai-content-visual__stage">
          <div className="ai-content-portrait">
            <img src={EDITORIAL_IMAGES.mentor.src} alt={EDITORIAL_IMAGES.mentor.alt} loading="lazy" decoding="async" />
            <div className="ai-content-portrait__shade" />
            <span className="ai-content-portrait__reference">IDENTITY REFERENCE</span>
            <div className="ai-content-portrait__caption"><span>Kata</span><p>Your look. Your personality.</p></div>
            <span className="ai-content-portrait__corner ai-content-portrait__corner--tl" /><span className="ai-content-portrait__corner ai-content-portrait__corner--br" />
          </div>
          <div className="ai-content-connector" aria-hidden="true"><i /><span><Sparkles size={20} /></span><i /></div>
          <div className="ai-content-output" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected} className="ai-content-output__inner" initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduceMotion ? 0 : -6 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
                <span className="ai-content-output__icon"><Icon size={24} strokeWidth={1.5} /></span>
                <span className="ai-content-output__label">{format.label}</span>
                <h4>{format.title}</h4>
                {selected === 'photo' && <div className="ai-photo-directions"><div><span>01</span> Lifestyle moments</div><div><span>02</span> Editorial looks</div><div><span>03</span> Destination stories</div></div>}
                {selected === 'talking' && <div className="ai-talking-preview"><AudioLines size={20} /><div className="ai-content-wave" aria-hidden="true">{[12,22,16,35,26,14,30,40,23,14,32,18].map((h,i)=><i key={i} style={{height:h,animationDelay:`${i * .08}s`}} />)}</div><p>Approved script<br /><strong>Your voice & delivery</strong></p></div>}
                {selected === 'reels' && <div className="ai-reel-preview"><div><b>01</b><span>The hook</span></div><div><b>02</b><span>Your story</span></div><div><b>03</b><span>The next step</span></div></div>}
                {selected === 'writing' && <div className="ai-writing-preview"><span>CAPTION DIRECTION</span><p>A glimpse behind the scenes.<br />A story only you can tell.</p><span><Globe2 size={13} /> Adapted to your audience</span></div>}
                <div className="ai-content-output__note">{format.note}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="ai-content-visual__tags"><span><Check size={12} /> Consistent identity</span>{format.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
        <div className="ai-content-visual__bottom"><span><b>01</b> Your identity</span><i /><span><b>02</b> AI creation</span><i /><span><b>03</b> You approve</span></div>
        <p className="ai-content-visual__disclaimer">Illustrative workflow · Portrait shown as an identity reference</p>
      </div>
    </div>
  );
};
