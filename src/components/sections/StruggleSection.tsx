import React, { useState } from 'react';
import { CheckCircle2, Pause, Play } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { FeatureCardVideo } from '../FeatureCardVideo';
import { AnimatedButton } from '../AnimatedButton';
import { t, useLanguage } from '../../i18n';
import '../../struggle-section.css';

interface StruggleSectionProps { onNext: () => void; }

const tasks = [
  { category: 'Content', title: 'Jeden Tag neuen Content erstellen', description: 'Von der ersten Idee bis zum fertigen Post: Dein Content braucht jeden Tag deine Aufmerksamkeit.', solution: 'AI Content Creation', kind: 'content' },
  { category: 'Nachrichten', title: 'Jede Nachricht selbst beantworten', description: 'Fragen, Gespräche und neue Anfragen. Dein Posteingang macht keine Pause.', solution: 'AI Chat Support', kind: 'messages' },
  { category: 'Organisation', title: 'Mehrere Kanäle verwalten', description: 'Content hier, Nachrichten dort. Zwischen all deinen Kanälen fehlt der Überblick.', solution: 'Ein verbundenes System', kind: 'channels' },
  { category: 'Kontakte', title: 'Käufer und Follow-ups verlieren', description: 'Wer hat Interesse? Wem wolltest du antworten? Ohne klare Übersicht gehen wichtige Kontakte unter.', solution: 'SnapSell CRM', kind: 'contacts' },
  { category: 'Freiraum', title: 'Zu wenig Zeit für dein eigenes Leben haben', description: 'Dein Business sollte Raum für dein Leben schaffen. Nicht jede freie Minute beanspruchen.', solution: 'Klare Abläufe', kind: 'time' },
] as const;

export const StruggleSection: React.FC<StruggleSectionProps> = ({ onNext }) => {
  useLanguage();
  const [isSystemActive, setIsSystemActive] = useState(false);
  const [videosPaused, setVideosPaused] = useState(false);
  const reducedMotion = useReducedMotion();

  return (
    <section id="section-2" className="landing-section struggle-features" aria-labelledby="struggle-heading">
      <div className="sf-container">
        <header className="sf-heading sf-heading-minimal">
          <motion.h2
            id="struggle-heading"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('Machst du noch')}<br />
            <span className="sf-heading-mint">{t('alles selbst?')}</span>
          </motion.h2>
          <motion.p
            className="sf-intro"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {t('Du musst nicht härter arbeiten. Du brauchst ein besseres System.')}
          </motion.p>
        </header>

        <div className="sf-grid">
          {tasks.map((task, index) => (
            <article className={`sf-card sf-card-${task.kind}`} key={task.kind}>
              <div className="sf-visual" aria-hidden="true">
                <span className="sf-card-index">0{index + 1}<span>/ {t(task.category)}</span></span>
                <FeatureCardVideo kind={task.kind} paused={videosPaused || !!reducedMotion} />
              </div>
              <div className="sf-card-copy">
                <h3>{t(task.title)}</h3>
                <p>{t(task.description)}</p>
                <span className={`sf-state ${isSystemActive ? 'sf-state-active' : ''}`}>
                  {isSystemActive ? <CheckCircle2 size={13} /> : <span className="sf-state-dot" />}
                  {isSystemActive ? t(task.solution) : t('Noch manuell')}
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="sf-footer">
          {!reducedMotion && <AnimatedButton
            className="sf-video-control"
            aria-pressed={videosPaused}
            aria-label={t(videosPaused ? 'Animationen abspielen' : 'Animationen pausieren')}
            onClick={() => setVideosPaused(value => !value)}
          >
            {videosPaused ? <Play size={13} /> : <Pause size={13} />}
            {t(videosPaused ? 'Animationen abspielen' : 'Animationen pausieren')}
          </AnimatedButton>}
          <p>{t('Content, Gespräche und Verkäufe gehören zusammen. Du bleibst das Gesicht deiner Marke und entscheidest, wobei dich das System unterstützt.')}</p>
          <div className="sf-actions">
            <AnimatedButton onClick={onNext} className="rounded-full px-5 py-3 bg-[#20C997] text-[#080808] text-sm font-bold">{t('Mein System entdecken')}</AnimatedButton>
            <AnimatedButton onClick={() => setIsSystemActive(value => !value)} aria-pressed={isSystemActive} className="rounded-full px-5 py-3 border border-white/15 bg-white/5 text-white text-sm">{t(isSystemActive ? 'Manuelle Aufgaben ansehen' : 'System in der Demo ausprobieren')}</AnimatedButton>
          </div>
        </div>
      </div>
    </section>
  );
};
