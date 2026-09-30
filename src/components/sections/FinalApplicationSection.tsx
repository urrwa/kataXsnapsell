import { t, useLanguage } from '../../i18n';
import React from 'react';
import { FAQAccordion } from '../BriefAdditions';
import { ApplicationForm } from '../ApplicationForm';
import '../../application.css';

interface FinalApplicationSectionProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

// Unsplash botanical image — free to use, no attribution required for web use
const BOTANICAL_IMG = 'https://images.unsplash.com/photo-1490750967868-88df5691cc64?w=1800&q=80&auto=format&fit=crop';

export const FinalApplicationSection: React.FC<FinalApplicationSectionProps> = ({
  onOpenModal,
  onSuccessReturn
}) => {
  useLanguage();

  return (
    <section
      id="section-13"
      aria-label={t('Bewerbung für die Katharina Academy')}
    >
      {/* Botanical background */}
      <div className="app-bg" aria-hidden="true">
        <img
          src={BOTANICAL_IMG}
          alt=""
          className="app-bg-img"
          loading="lazy"
          decoding="async"
        />
        <div className="app-bg-overlay" />
      </div>

      {/* Centered form */}
      <div className="app-content">
        <ApplicationForm
          onOpenModal={onOpenModal}
          onSuccessReturn={onSuccessReturn}
        />
      </div>

      {/* FAQ below, on dark ground */}
      <div className="app-faq">
        <FAQAccordion />
      </div>
    </section>
  );
};
