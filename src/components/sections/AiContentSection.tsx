import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { ContentBranchingVisual } from '../ContentBranchingVisual';
import './AiContentSection.css';

export const AiContentSection: React.FC = () => (
  <section id="section-6" className="landing-section ai-content-section" aria-labelledby="ai-content-heading">
    <div className="ai-content-section__inner">
      <div className="ai-content-section__heading">
        <span className="ai-content-section__badge"><Sparkles size={14} /> PILLAR 02 · AI CONTENT CREATION</span>
        <h2 id="ai-content-heading">Create More<br /><span>Without Filming Every Day</span></h2>
        <p>Turn your approved identity, aesthetic and voice into lifestyle imagery, talking clips, reels and captions. You stay the face of your brand.</p>
      </div>
      <ContentBranchingVisual />
      <div className="ai-content-section__trust"><ShieldCheck size={17} /><span>Your identity. Your style. <strong>Your final approval.</strong></span></div>
    </div>
  </section>
);
