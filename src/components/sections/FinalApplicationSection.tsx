import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { t, useLanguage } from '../../i18n';
import { ApplicationForm } from '../ApplicationForm';
import { FAQAccordion } from '../BriefAdditions';
import '../../final-cta.css';

interface FinalApplicationSectionProps {
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

// ─── Application Dialog ───────────────────────────────────────────────────────

interface DialogProps {
  open: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void;
  onSuccessReturn: () => void;
}

const ApplicationDialog: React.FC<DialogProps> = ({
  open,
  onClose,
  triggerRef,
  onOpenModal,
  onSuccessReturn,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Escape-to-close
  useEffect(() => {
    if (!open) return;

    // Focus the close button on open
    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab') return;

      const dialog = dialogRef.current;
      if (!dialog) return;

      const focusableSelector = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
      const nodeList = dialog.querySelectorAll(focusableSelector);
      const focusable: HTMLElement[] = [];
      nodeList.forEach((node) => {
        const el = node as HTMLElement;
        if (!el.closest('[hidden]') && el.offsetParent !== null) focusable.push(el);
      });

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Return focus to trigger
      triggerRef.current?.focus();
    };
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      className="fca-dialog-backdrop"
      role="presentation"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="fca-dialog"
      >
        {/* Dialog header */}
        <div className="fca-dialog-header">
          <h2 id="dialog-title" className="fca-dialog-title">
            {t('Für die Academy bewerben')}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="fca-dialog-close"
            onClick={onClose}
            aria-label={t('Dialog schließen')}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        {/* Scrollable form area */}
        <div className="fca-dialog-body">
          <ApplicationForm
            onOpenModal={onOpenModal}
            onSuccessReturn={() => {
              onSuccessReturn();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

export const FinalApplicationSection: React.FC<FinalApplicationSectionProps> = ({
  onOpenModal,
  onSuccessReturn,
}) => {
  useLanguage();
  const reducedMotion = useReducedMotion();
  const [dialogOpen, setDialogOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const openDialog = useCallback(() => setDialogOpen(true), []);
  const closeDialog = useCallback(() => setDialogOpen(false), []);

  const motionProps = reducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <>
      <section
        id="section-13"
        className="fca-section"
        aria-label={t('Bewerbung für die Katharina Academy')}
      >
        {/* Cinematic banner */}
        <motion.div className="fca-banner" {...motionProps}>
          {/* Background image */}
          <img
            src="/client-assets/final-cta.png"
            alt=""
            aria-hidden="true"
            className="fca-banner-img"
            loading="lazy"
            decoding="async"
          />

          {/* Gradient overlay — subtle, preserves photo */}
          <div className="fca-banner-gradient" aria-hidden="true" />

          {/* Copy */}
          <div className="fca-banner-copy">
            <h2 className="fca-banner-heading">
              {t('Your next chapter')}<br />
              {t('starts here.')}
            </h2>

            <button
              ref={triggerRef}
              type="button"
              className="fca-apply-btn"
              onClick={openDialog}
            >
              {t('Apply to the Academy')}
            </button>
          </div>
        </motion.div>

        {/* FAQ below banner */}
        <FAQAccordion />
      </section>

      {/* Application dialog */}
      <ApplicationDialog
        open={dialogOpen}
        onClose={closeDialog}
        triggerRef={triggerRef as React.RefObject<HTMLButtonElement | null>}
        onOpenModal={onOpenModal}
        onSuccessReturn={onSuccessReturn}
      />
    </>
  );
};
