import { AnimatedButton } from './AnimatedButton';
import { t, useLanguage, getLanguage } from '../i18n';
import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle2, Loader2 } from 'lucide-react';

interface Props { onOpenModal: (type: 'privacy' | 'terms' | 'legal') => void; onSuccessReturn: () => void }

const stages = ['Ich möchte gerade starten', 'Ich bin neue Creatorin', 'Ich bin bereits aktiv', 'Ich habe eine größere Community', 'Ich führe ein Creator-Team'];
const goals = ['Mehr und besseren Content erstellen', 'Gespräche automatisieren', 'Mehr direkte Verkäufe erzielen', 'Social Media ausbauen', 'Professionelle Unterstützung erhalten', 'Internationale Möglichkeiten entdecken'];
const initial = { firstName: '', email: '', socialHandle: '', creatorStage: '', mainGoal: '', age: false, privacy: false, updates: false, website: '' };
const privacyText = 'Ich habe die Datenschutzhinweise gelesen und stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Bewerbung zu.';
const updatesText = 'Ich möchte Informationen zur Academy und zum Onboarding erhalten. Ich kann mich jederzeit wieder abmelden.';

export const ApplicationForm: React.FC<Props> = ({ onOpenModal, onSuccessReturn }) => {
  useLanguage();
  const [data, setData] = useState(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const lock = useRef(false);
  const form = useRef<HTMLFormElement>(null);
  const success = useRef<HTMLDivElement>(null);
  const started = useRef(Date.now());

  const endpoint = (import.meta.env.VITE_APPLICATION_ENDPOINT || '').trim();
  const demo = !endpoint;

  useEffect(() => { if (status === 'success') success.current?.focus(); }, [status]);

  const change = (key: keyof typeof initial, value: string | boolean) => {
    setData(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: '' }));
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (lock.current) return;
    const next: Record<string, string> = {};
    if (!data.firstName.trim()) next.firstName = 'Bitte gib deinen Vornamen ein.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) next.email = 'Bitte gib eine gültige E-Mail-Adresse ein.';
    if (!data.socialHandle.trim()) next.socialHandle = 'Bitte gib dein Social-Media-Profil an.';
    if (!stages.includes(data.creatorStage)) next.creatorStage = 'Bitte wähle deinen aktuellen Stand.';
    if (!goals.includes(data.mainGoal)) next.mainGoal = 'Bitte wähle dein erstes Ziel.';
    if (!data.age) next.age = 'Bitte bestätige, dass du mindestens 18 Jahre alt bist.';
    if (!data.privacy) next.privacy = 'Bitte stimme der Verarbeitung deiner Bewerbung zu.';
    setErrors(next);
    if (Object.keys(next).length) {
      requestAnimationFrame(() => form.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
      return;
    }
    if (data.website) { setErrors({ general: 'Die Bewerbung konnte nicht gesendet werden.' }); return; }
    lock.current = true;
    setStatus('loading');
    try {
      if (demo) {
        await new Promise(resolve => setTimeout(resolve, 650));
      } else {
        const target = new URL(endpoint, window.location.origin);
        if (target.protocol !== 'https:') throw new Error('HTTPS required');
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 15000);
        const clean = (v: string) => v.trim().replace(/[\u0000-\u001f<>]/g, '');
        try {
          const response = await fetch(target.href, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'omit',
            signal: controller.signal,
            body: JSON.stringify({
              firstName: clean(data.firstName), email: clean(data.email), socialHandle: clean(data.socialHandle),
              creatorStage: data.creatorStage, mainGoal: data.mainGoal, confirmedAge: data.age,
              consent: { privacy: true, privacyText: t(privacyText), updates: data.updates, updatesText: t(updatesText), language: getLanguage(), timestamp: new Date().toISOString(), version: '2026-09-29' },
              spamProtection: { website: data.website, elapsedMs: Date.now() - started.current }
            })
          });
          if (!response.ok) throw new Error('Failed');
        } finally { clearTimeout(timeout); }
      }
      setData(initial);
      setStatus('success');
    } catch {
      setErrors({ general: 'Deine Bewerbung konnte gerade nicht gesendet werden. Bitte versuche es später erneut.' });
      setStatus('idle');
    } finally { lock.current = false; }
  };

  const errorMsg = (key: string) => errors[key]
    ? <p id={`error-${key}`} role="alert" className="af-error">{t(errors[key])}</p>
    : null;

  // ── Success state ──
  if (status === 'success') return (
    <div ref={success} tabIndex={-1} role="status" className="af-panel af-success">
      <CheckCircle2 className="af-success-icon" />
      <h3 className="af-success-heading">{t(demo ? 'Demo erfolgreich abgeschlossen.' : 'Deine Bewerbung ist angekommen.')}</h3>
      <p className="af-success-body">{t(demo ? 'Dies war eine Vorschau. Es wurden keine Daten gesendet oder gespeichert. Du erhältst keine E-Mail.' : 'Unser Team prüft deine Angaben und meldet sich mit dem passenden nächsten Schritt bei dir.')}</p>
      <div className="af-steps">
        <p className="af-steps-heading">{t(demo ? 'Nach einer echten Bewerbung:' : 'Deine nächsten Schritte:')}</p>
        <ol className="af-steps-list">
          <li>{t('Prüfe deine E-Mails.')}</li>
          <li>{t('Beantworte die kurze Creator-Analyse.')}</li>
          <li>{t('Erhalte deinen persönlichen nächsten Schritt.')}</li>
          <li>{t('Starte mit Katharina.')}</li>
        </ol>
      </div>
      <AnimatedButton onClick={() => { setStatus('idle'); onSuccessReturn(); }} className="af-submit-btn">
        {t('Zur Academy')}
      </AnimatedButton>
    </div>
  );

  // ── Form state ──
  return (
    <div className="af-panel">
      {/* Header */}
      <div className="af-header">
        <h3 className="af-heading">{t('Dein nächstes Kapitel.')}</h3>
        <p className="af-subheading">{t('Für die Katharina Academy bewerben')}</p>
      </div>

      {/* Demo notice */}
      {demo && (
        <p className="af-demo-notice">
          {t('Demo only — nothing is sent or saved.')}
        </p>
      )}

      {errors.general && <p role="alert" className="af-error af-error--general">{t(errors.general)}</p>}

      <form ref={form} onSubmit={submit} noValidate className="af-form" aria-busy={status === 'loading'}>

        {/* Row 1: First name + Email */}
        <div className="af-row-2">
          <div className="af-field">
            <label htmlFor="first-name-input" className="af-label">{t('Vorname')} *</label>
            <input
              id="first-name-input" name="firstName" type="text" autoComplete="given-name"
              required maxLength={120} placeholder={t('Dein Vorname')}
              value={data.firstName} onChange={e => change('firstName', e.target.value)}
              aria-invalid={!!errors.firstName} aria-describedby={errors.firstName ? 'error-firstName' : undefined}
              className="af-input"
            />
            {errorMsg('firstName')}
          </div>
          <div className="af-field">
            <label htmlFor="email-input" className="af-label">{t('E-Mail-Adresse')} *</label>
            <input
              id="email-input" name="email" type="email" autoComplete="email"
              required maxLength={254} placeholder={t('Deine beste E-Mail-Adresse')}
              value={data.email} onChange={e => change('email', e.target.value)}
              aria-invalid={!!errors.email} aria-describedby={errors.email ? 'error-email' : undefined}
              className="af-input"
            />
            {errorMsg('email')}
          </div>
        </div>

        {/* Row 2: Social handle — full width */}
        <div className="af-field">
          <label htmlFor="social-handle-input" className="af-label">{t('Social-Media-Profil')} *</label>
          <input
            id="social-handle-input" name="socialHandle" type="text" autoComplete="off"
            required maxLength={120} placeholder={t('@deinprofil')}
            value={data.socialHandle} onChange={e => change('socialHandle', e.target.value)}
            aria-invalid={!!errors.socialHandle} aria-describedby={errors.socialHandle ? 'error-socialHandle' : undefined}
            className="af-input"
          />
          {errorMsg('socialHandle')}
        </div>

        {/* Row 3: Stage + Goal */}
        <div className="af-row-2">
          <div className="af-field">
            <label htmlFor="creatorStage" className="af-label">{t('Wo stehst du aktuell?')} *</label>
            <select
              id="creatorStage" name="creatorStage" required
              value={data.creatorStage} onChange={e => change('creatorStage', e.target.value)}
              aria-invalid={!!errors.creatorStage} aria-describedby={errors.creatorStage ? 'error-creatorStage' : undefined}
              className="af-input af-select"
            >
              <option value="">{t('Bitte auswählen')}</option>
              {stages.map(o => <option key={o} value={o}>{t(o)}</option>)}
            </select>
            {errorMsg('creatorStage')}
          </div>
          <div className="af-field">
            <label htmlFor="mainGoal" className="af-label">{t('Was möchtest du zuerst verbessern?')} *</label>
            <select
              id="mainGoal" name="mainGoal" required
              value={data.mainGoal} onChange={e => change('mainGoal', e.target.value)}
              aria-invalid={!!errors.mainGoal} aria-describedby={errors.mainGoal ? 'error-mainGoal' : undefined}
              className="af-input af-select"
            >
              <option value="">{t('Bitte auswählen')}</option>
              {goals.map(o => <option key={o} value={o}>{t(o)}</option>)}
            </select>
            {errorMsg('mainGoal')}
          </div>
        </div>

        {/* Honeypot */}
        <div className="sr-only" aria-hidden="true">
          <label>{t('Website')}<input name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={e => change('website', e.target.value)} /></label>
        </div>

        {/* Consent */}
        <div className="af-consents">
          {([
            { key: 'age' as const, text: 'Ich bestätige, dass ich mindestens 18 Jahre alt bin.', required: true },
            { key: 'privacy' as const, text: privacyText, required: true },
            { key: 'updates' as const, text: updatesText, required: false },
          ]).map(f => (
            <div key={f.key} className="af-consent-row">
              <label className="af-consent-label">
                <input
                  type="checkbox" name={f.key} checked={data[f.key]} required={f.required}
                  onChange={e => change(f.key, e.target.checked)}
                  aria-invalid={!!errors[f.key]} aria-describedby={errors[f.key] ? `error-${f.key}` : undefined}
                  className="af-checkbox"
                />
                <span className="af-consent-text">
                  {t(f.text)} {t(f.required ? '*' : '(optional)')}
                </span>
              </label>
              {errorMsg(f.key)}
            </div>
          ))}

          <button type="button" onClick={() => onOpenModal('privacy')} className="af-privacy-link">
            {t('Datenschutzhinweise lesen')}
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit" disabled={status === 'loading'}
          className="af-submit-btn"
        >
          {status === 'loading'
            ? <><Loader2 className="af-spinner" />{t('Wird gesendet …')}</>
            : t('Bewerbung absenden')}
        </button>

        <p className="af-footnote">
          {t('Bewerbungen werden individuell geprüft. Academy-Zugang und zusätzliche Möglichkeiten hängen von Eignung, Verfügbarkeit und dem gewählten Programm ab.')}
        </p>
      </form>
    </div>
  );
};
