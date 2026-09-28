import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Camera, Video, Clapperboard, AlignLeft, Check, Sparkles, AudioLines, Globe2, ArrowRight } from 'lucide-react';

const CONTENT_FORMATS = [
  {
    id: 'photo',
    icon: Camera,
    title: 'Realistic AI photos',
    subtitle: 'Your aesthetic, in new settings',
    heading: 'A new setting. The same you.',
    description: 'Create photorealistic lifestyle and editorial imagery around your approved appearance and visual direction.',
    tags: ['Lifestyle', 'Fashion', 'Travel'],
    label: 'PHOTO DIRECTION',
    note: 'Appearance · Styling · Setting',
    profileTags: ['Coastal palette', 'Golden tones', 'Minimal styling'],
    outputLines: ['Lifestyle moment', 'Editorial look', 'Destination story'],
    outputAccent: '#63DCA8',
  },
  {
    id: 'talking',
    icon: Video,
    title: 'Talking videos',
    subtitle: 'Your message, in your voice',
    heading: 'Show up without another shoot.',
    description: 'Turn approved scripts into talking clips, with your persona and voice guiding the content.',
    tags: ['Talking clips', 'Voice', 'Scripts'],
    label: 'TALKING CLIP',
    note: 'Script · Voice · Delivery',
    profileTags: ['Confident tone', 'Warm delivery', 'Clear pace'],
    outputLines: ['Intro hook', 'Core message', 'Soft CTA'],
    outputAccent: '#63DCA8',
  },
  {
    id: 'reels',
    icon: Clapperboard,
    title: 'Reels & stories',
    subtitle: 'Made for your everyday channels',
    heading: 'One identity. More ways to show up.',
    description: 'Build short-form content around your ideas, with hooks, visual direction and captions adapted for reels and stories.',
    tags: ['Reels', 'Stories', 'Short videos'],
    label: 'SHORT-FORM CONTENT',
    note: 'Hook · Story · Call to action',
    profileTags: ['Fast pacing', 'Visual rhythm', 'On-brand hooks'],
    outputLines: ['The hook', 'Your story', 'The next step'],
    outputAccent: '#63DCA8',
  },
  {
    id: 'writing',
    icon: AlignLeft,
    title: 'Scripts & captions',
    subtitle: 'Your tone, across languages',
    heading: 'Words that sound like you.',
    description: 'Create scripts and captions in your tone, then adapt them for different languages and audiences.',
    tags: ['Scripts', 'Captions', 'Multilingual'],
    label: 'YOUR VOICE IN WORDS',
    note: 'Tone · Message · Language',
    profileTags: ['Eloquent', 'Direct', 'Multilingual-ready'],
    outputLines: ['Opening line', 'Body message', 'Adapted caption'],
    outputAccent: '#63DCA8',
  },
] as const;

type FormatId = typeof CONTENT_FORMATS[number]['id'];

export const ContentBranchingVisual: React.FC = () => {
  const [selected, setSelected] = useState<FormatId>('photo');
  const [pulse, setPulse] = useState(false);
  const reduceMotion = useReducedMotion();
  const format = CONTENT_FORMATS.find(item => item.id === selected)!;
  const Icon = format.icon;

  useEffect(() => {
    setPulse(true);
    const t = setTimeout(() => setPulse(false), 600);
    return () => clearTimeout(t);
  }, [selected]);

  return (
    <div className="ai-content-flow">
      {/* Left: Format selector */}
      <div className="ai-content-formats">
        <div className="ai-content-formats__eyebrow">ONE CREATOR. MULTIPLE CONTENT FORMATS.</div>
        <div className="ai-content-formats__choices">
          {CONTENT_FORMATS.map(({ id, icon: FormatIcon, title, subtitle }, index) => (
            <button
              type="button"
              key={id}
              aria-pressed={id === selected}
              aria-controls="ai-content-preview"
              onClick={() => setSelected(id)}
              className={id === selected ? 'is-selected' : ''}
            >
              <span className="ai-content-formats__icon">
                <FormatIcon size={20} strokeWidth={1.7} />
              </span>
              <span>
                <strong>{title}</strong>
                <small>{subtitle}</small>
              </span>
              <span className="ai-content-formats__number">
                {id === selected ? <Check size={16} /> : `0${index + 1}`}
              </span>
            </button>
          ))}
        </div>
        <div className="ai-content-explanation" aria-live="polite">
          <h3>{format.heading}</h3>
          <p>{format.description}</p>
        </div>
      </div>

      {/* Right: Clean pipeline visual — no images */}
      <div className="ai-content-visual" id="ai-content-preview" role="region" aria-label="AI content workflow preview">
        <div className="ai-content-visual__top">
          <span><Sparkles size={16} /> AI CONTENT PIPELINE</span>
          <span>CONTENT WORKFLOW</span>
        </div>

        {/* Pipeline grid */}
        <div className="acv-pipeline">
          {/* Step 1: Voice profile */}
          <div className={`acv-step acv-step--profile ${pulse && !reduceMotion ? 'acv-step--pulse' : ''}`}>
            <span className="acv-step__label">01 · YOUR IDENTITY</span>
            <div className="acv-step__card">
              <div className="acv-profile-name">Kata</div>
              <div className="acv-profile-role">Creator · Brand · Voice</div>
              <div className="acv-profile-tags">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selected}
                    className="acv-tags-inner"
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {format.profileTags.map(tag => (
                      <span key={tag} className="acv-tag">{tag}</span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="acv-profile-bar" />
            </div>
          </div>

          {/* Arrow + AI engine */}
          <div className="acv-arrow" aria-hidden="true">
            <div className={`acv-engine ${pulse && !reduceMotion ? 'acv-engine--active' : ''}`}>
              <Sparkles size={18} />
            </div>
            <ArrowRight size={14} className="acv-arrow-icon" />
          </div>

          {/* Step 2: Output */}
          <div className="acv-step acv-step--output">
            <span className="acv-step__label">02 · OUTPUT FORMAT</span>
            <div className="acv-step__card acv-step__card--output">
              <div className="acv-output-icon">
                <Icon size={20} strokeWidth={1.5} />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  className="acv-output-body"
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduceMotion ? 0 : -4 }}
                  transition={{ duration: 0.22 }}
                >
                  <span className="acv-output-label">{format.label}</span>
                  <div className="acv-output-lines">
                    {format.outputLines.map((line, i) => (
                      <div key={line} className="acv-output-line">
                        <span className="acv-output-num">0{i + 1}</span>
                        <span>{line}</span>
                      </div>
                    ))}
                  </div>
                  <div className="acv-output-note">{format.note}</div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="ai-content-visual__tags">
          <span><Check size={12} /> Consistent identity</span>
          {format.tags.map(tag => <span key={tag}>{tag}</span>)}
        </div>

        <div className="ai-content-visual__bottom">
          <span><b>01</b> Your identity</span>
          <i />
          <span><b>02</b> AI creation</span>
          <i />
          <span><b>03</b> You approve</span>
        </div>
        <p className="ai-content-visual__disclaimer">Illustrative workflow · Your identity stays yours</p>
      </div>
    </div>
  );
};
