import { t, useLanguage } from '../../i18n';
import React from 'react';
import { ConnectedJourneyFlow } from '../ConnectedJourneyFlow';
import '../../connected-journey.css';

export const ConnectedJourneySection: React.FC = () => {
  useLanguage();
  return (
    <section id="section-8" className="landing-section connected-journey" aria-labelledby="journey-heading">
      <div className="journey-container">
        <header className="journey-heading">
          <div>
            <p className="journey-eyebrow"><span />{t('SO FUNKTIONIERT ES')}</p>
            <h2 id="journey-heading">{t('Von Content')}<br /><span>{t('zu Zahlung.')}</span></h2>
          </div>
          <p className="journey-intro">{t('Weniger einzelne Tools. Weniger verlorene Kontakte. Mehr Struktur.')}</p>
        </header>
        <ConnectedJourneyFlow />
      </div>
    </section>
  );
};
