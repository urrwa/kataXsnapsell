import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Check, Layers, MessageSquare, CalendarDays, ShoppingBag, Plus, Sparkles } from 'lucide-react';
import { EDITORIAL_IMAGES } from '../../data/images';
import { SlideButton } from '../SlideButton';
import './StruggleSection.css';

const TASKS = [
  { title: 'Creating every post', short: 'Content', icon: Layers, manual: 'Draft. Edit. Repeat.', organized: 'Create with a plan.', solution: 'AI-assisted content', detail: 'The idea is yours. Get support turning it into content for the channels you use.', friction: 'One post turns into a full afternoon of editing, formatting and starting again.', tag: 'Always making', accent: 'paper' },
  { title: 'Answering every message', short: 'Conversations', icon: MessageSquare, manual: 'An inbox that never ends.', organized: 'Keep conversations going.', solution: 'AI chat support', detail: 'Let AI handle everyday questions and point interested buyers toward your offers.', friction: 'Every notification interrupts the thing you were finally finding time to create.', tag: 'Always replying', accent: 'mint' },
  { title: 'Managing every channel', short: 'Your channels', icon: CalendarDays, manual: 'Another tab. Another task.', organized: 'Bring the pieces together.', solution: 'A connected workflow', detail: 'Connect your content, conversations and offers through a more considered workflow.', friction: 'Ideas, files and schedules live in different places. You become the connection between them.', tag: 'Always switching', accent: 'dark' },
  { title: 'Missing opportunities', short: 'Digital sales', icon: ShoppingBag, manual: 'Every sale, another step.', organized: 'One link to your offer.', solution: 'SnapSell checkout', detail: 'Give your audience a simple path from discovering your content to buying your digital products.', friction: 'Interested followers lose momentum while you arrange links, payments and delivery.', tag: 'Always catching up', accent: 'sand' },
];

interface StruggleSectionProps { onNext: () => void }

export const StruggleSection: React.FC<StruggleSectionProps> = ({ onNext }) => {
  const [organized, setOrganized] = useState(false);
  const [selected, setSelected] = useState(0);
  const reducedMotion = useReducedMotion();
  const task = TASKS[selected];
  return (
    <section id="section-2" className="landing-section creator-workspace" aria-labelledby="bottleneck-title">
      <div className="creator-workspace__inner">
        <div className="creator-workspace__eyebrow"><span className="creator-workspace__index">02 /</span><span>The creator bottleneck</span><span className="creator-workspace__rule" /></div>
        <div className="creator-workspace__layout">
          <motion.div className="creator-workspace__copy" initial={reducedMotion ? false : { opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }}>
            <h2 id="bottleneck-title" style={{fontSize:'clamp(2.6rem,6vw,5rem)',lineHeight:1.08}}>One creator.<br /><span>Too many hats.</span></h2>
            <p className="creator-workspace__intro">Still doing everything alone? Your best work deserves more of you. Your busywork deserves a better system.</p>
            <div className="creator-workspace__tasks" aria-label="Explore the four creator bottlenecks">
              {TASKS.map((item, index) => {
                const Icon = item.icon;
                return <button type="button" key={item.short} className={`creator-workspace__task ${selected === index ? 'is-selected' : ''}`} aria-pressed={selected === index} aria-controls="bottleneck-detail" onClick={() => setSelected(index)}>
                  <span className="creator-workspace__number">0{index + 1}</span><Icon size={17} aria-hidden="true" /><span>{organized ? item.solution : item.title}</span><span className="creator-workspace__task-marker" aria-hidden="true">{organized ? <Check size={15} /> : <Plus size={15} />}</span>
                </button>;
              })}
            </div>
            <div id="bottleneck-detail" className="creator-workspace__detail" aria-live="polite" aria-atomic="true"><span>{organized ? 'A little more breathing room' : 'Sound familiar?'}</span><p>{organized ? task.detail : task.friction}</p></div>
            <SlideButton onClick={onNext} className="creator-workspace__cta"><span>Meet your support system</span><ArrowUpRight size={16} /></SlideButton>
          </motion.div>
          <motion.div className="creator-workspace__visual" initial={reducedMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="creator-workspace__switch" role="group" aria-label="Compare working alone with a connected system">
              <button type="button" aria-pressed={!organized} onClick={() => setOrganized(false)} className={!organized ? 'is-active' : ''}>Doing it all</button>
              <button type="button" aria-pressed={organized} onClick={() => setOrganized(true)} className={organized ? 'is-active' : ''}><Sparkles size={14} aria-hidden="true" />With a system</button>
            </div>
            <div className={`creator-desk ${organized ? 'is-organized' : ''}`}>
              <div className="creator-desk__toolbar"><span><span className="creator-desk__status" />YOUR CREATIVE WORKSPACE</span><span>{organized ? 'Connected' : 'All on you'}</span></div>
              <div className="creator-desk__canvas">
                <div className="creator-desk__cross creator-desk__cross--one" aria-hidden="true">+</div><div className="creator-desk__cross creator-desk__cross--two" aria-hidden="true">+</div>
                <svg className="creator-desk__connections" viewBox="0 0 600 432" preserveAspectRatio="none" aria-hidden="true"><path d="M150 85 V216 H450 V85 M150 335 V216 M450 335 V216" /></svg>
                <motion.div className="creator-desk__center" animate={{ opacity: organized ? 1 : 0.3, scale: organized ? 1 : 0.92 }} transition={{ duration: reducedMotion ? 0 : 0.5 }} aria-hidden="true"><span className="creator-desk__center-mark">k.</span><span>Your ideas.<br /><strong>Your time back.</strong></span></motion.div>
                {TASKS.map((item, index) => {
                  const Icon = item.icon;
                  const manual = [{ left: '5%', top: 27, rotate: -8 }, { left: '51%', top: 103, rotate: 7 }, { left: '3%', top: 219, rotate: -5 }, { left: '49%', top: 291, rotate: 6 }][index];
                  const tidy = { left: index % 2 === 0 ? '4%' : '53%', top: index < 2 ? 24 : 270, rotate: 0 };
                  return <motion.button type="button" key={item.short} className={`creator-desk__card creator-desk__card--${item.accent} ${selected === index ? 'is-selected' : ''}`} animate={organized ? tidy : manual} transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 95, damping: 17, delay: index * 0.055 }} onClick={() => setSelected(index)} aria-pressed={selected === index} aria-label={`${item.short}: ${organized ? item.solution : item.manual}`} aria-controls="bottleneck-detail">
                    <span className="creator-desk__card-top"><Icon size={18} aria-hidden="true" /><span>0{index + 1}</span></span><strong>{item.short}</strong><span className="creator-desk__card-description">{organized ? item.organized : item.manual}</span>
                    <span className="creator-desk__card-foot">{organized ? <><Check size={12} aria-hidden="true" />{item.solution}</> : <><span className="creator-desk__tiny-dot" />{item.tag}</>}</span>
                  </motion.button>;
                })}
              </div>
              <div className="creator-desk__footer"><span className="creator-desk__footer-dot" /><span>{organized ? 'More room for the work only you can do.' : 'Your attention is the only thing connecting it all.'}</span><span className="creator-desk__counter">{organized ? '01 system' : '04 demands'}</span></div>
            </div>
            <div className="creator-workspace__note"><p>You don’t need to work harder.<br /><span>You need a better system.</span></p><span className="creator-workspace__note-symbol" aria-hidden="true">↳</span></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
